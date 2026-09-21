const sharp = require('sharp');
const fs = require('fs');

async function inpaintImage(inputPath, outputPath, badgeType) {
  // Load raw pixels
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Create a mask for badge pixels: 1 = in badge, 0 = background photo
  const mask = new Uint8Array(width * height);

  // Badge is located around bottom-center: cx ~ width / 2, cy ~ height
  const cx = width / 2;
  const cy = height;

  // Find all badge pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only check pixels within plausible badge radius (~48px)
      if (dist <= 46 && y >= 55) {
        let isBadge = false;

        // White border / icon
        if (r > 205 && g > 205 && b > 205) {
          isBadge = true;
        }

        // Colored badge interior
        if (badgeType === 'orange') {
          // Orange: high red, moderate green, low blue
          if (r > 160 && g > 60 && g < 180 && b < 80) isBadge = true;
          // lighter orange or antialiased orange
          if (r > 190 && g > 90 && b < 110) isBadge = true;
        } else if (badgeType === 'blue') {
          // Blue: high blue, low red
          if (b > 140 && r < 100) isBadge = true;
          if (b > 180 && r < 140) isBadge = true;
        } else if (badgeType === 'green') {
          // Green: high green, lower red and blue
          if (g > 110 && r < 100 && b < 120) isBadge = true;
          if (g > 140 && r < 120 && b < 140) isBadge = true;
        }

        if (isBadge) {
          mask[y * width + x] = 1;
        }
      }
    }
  }

  // Dilate mask by 3 pixels to eliminate any antialiasing fringe/rings
  const dilatedMask = new Uint8Array(width * height);
  const dilateRadius = 3;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (mask[y * width + x] === 1) {
        for (let dy = -dilateRadius; dy <= dilateRadius; dy++) {
          for (let dx = -dilateRadius; dx <= dilateRadius; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
              if (dx * dx + dy * dy <= dilateRadius * dilateRadius) {
                dilatedMask[ny * width + nx] = 1;
              }
            }
          }
        }
      }
    }
  }

  // Also include anything inside the convex hull / beneath the top of the badge down to the bottom
  // So there's no hollow center or stray artifacts
  for (let x = 0; x < width; x++) {
    let topY = -1;
    for (let y = 50; y < height; y++) {
      if (dilatedMask[y * width + x] === 1) {
        topY = y;
        break;
      }
    }
    if (topY !== -1) {
      for (let y = topY; y < height; y++) {
        dilatedMask[y * width + x] = 1;
      }
    }
  }

  // Now, collect known boundary pixels surrounding the mask
  // Boundary pixels have dilatedMask === 0, but touch dilatedMask === 1
  const boundaryPixels = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (dilatedMask[y * width + x] === 0) {
        // Check 4 neighbors
        let isBoundary = false;
        const neighbors = [[x+1, y], [x-1, y], [x, y+1], [x, y-1]];
        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            if (dilatedMask[ny * width + nx] === 1) {
              isBoundary = true;
              break;
            }
          }
        }
        if (isBoundary) {
          const idx = (y * width + x) * channels;
          boundaryPixels.push({
            x,
            y,
            r: data[idx],
            g: data[idx + 1],
            b: data[idx + 2],
          });
        }
      }
    }
  }

  console.log(`${badgeType}: masked ${dilatedMask.filter(v => v === 1).length} pixels, boundary has ${boundaryPixels.length} points.`);

  // Inpaint every masked pixel using Inverse Distance Weighting (IDW) interpolation
  // with vertical bias (matching column colors from top fabric/textures)
  const outputData = Buffer.from(data);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (dilatedMask[y * width + x] === 1) {
        let totalWeight = 0;
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;

        // Weight boundary pixels
        // Give higher weight to points directly above (dx small) to continue vertical folds/lines
        for (const bp of boundaryPixels) {
          const dx = (x - bp.x);
          const dy = (y - bp.y);
          // Vertical distance matters less than horizontal distance to preserve vertical texture/columns
          const distSq = dx * dx * 2.5 + dy * dy;
          const dist = Math.sqrt(distSq) + 0.001;
          const weight = 1 / Math.pow(dist, 2.5);

          totalWeight += weight;
          sumR += bp.r * weight;
          sumG += bp.g * weight;
          sumB += bp.b * weight;
        }

        const idx = (y * width + x) * channels;
        outputData[idx] = Math.round(sumR / totalWeight);
        outputData[idx + 1] = Math.round(sumG / totalWeight);
        outputData[idx + 2] = Math.round(sumB / totalWeight);
      }
    }
  }

  // Save the result, upscaled cleanly to high-res 800x444 with subtle sharpening
  await sharp(outputData, { raw: { width, height, channels } })
    .resize(800, 444, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.0, m1: 1.0, m2: 2.0 })
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log(`Saved clean inpaint to ${outputPath}`);
}

async function run() {
  await inpaintImage('scratch/service1-raw.png', 'scratch/inpaint-s1.jpg', 'orange');
  await inpaintImage('scratch/service2-raw.png', 'scratch/inpaint-s2.jpg', 'blue');
  await inpaintImage('scratch/service3-raw.png', 'scratch/inpaint-s3.jpg', 'green');
}

run().catch(console.error);
