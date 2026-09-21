const sharp = require('sharp');

async function perfectInpaint(inputPath, outputPath, badgeType) {
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  const cx = 99;
  const cy = 110;
  // Exact radius of the white border: 22.5 pixels
  const radius = 22.5;

  const mask = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dist = Math.hypot(x - cx, y - cy);
      if (dist <= radius) {
        mask[y * width + x] = 1;
      }
    }
  }

  // Boundary pixels: exactly just outside the 22.5px radius (22.5 < dist <= 26)
  const boundaryPixels = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dist = Math.hypot(x - cx, y - cy);
      if (dist > radius && dist <= radius + 3.5) {
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

  console.log(`${badgeType}: boundary has ${boundaryPixels.length} points.`);

  const outputData = Buffer.from(data);

  // Inpaint with inverse distance weighting
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (mask[y * width + x] === 1) {
        let totalW = 0;
        let sumR = 0, sumG = 0, sumB = 0;

        for (const bp of boundaryPixels) {
          const dx = x - bp.x;
          const dy = y - bp.y;
          // Slight vertical bias to extend the natural fabric/textures downwards
          const d = Math.sqrt(dx * dx * 1.5 + dy * dy) + 0.001;
          const w = 1 / Math.pow(d, 2.2);

          totalW += w;
          sumR += bp.r * w;
          sumG += bp.g * w;
          sumB += bp.b * w;
        }

        const idx = (y * width + x) * channels;
        outputData[idx] = Math.round(sumR / totalW);
        outputData[idx + 1] = Math.round(sumG / totalW);
        outputData[idx + 2] = Math.round(sumB / totalW);
      }
    }
  }

  await sharp(outputData, { raw: { width, height, channels } })
    .resize(800, 444, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.0, m1: 0.8, m2: 1.5 })
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log(`Saved ${outputPath}`);
}

async function run() {
  await perfectInpaint('scratch/service1-raw.png', 'scratch/perfect-s1.jpg', 'orange');
  await perfectInpaint('scratch/service2-raw.png', 'scratch/perfect-s2.jpg', 'blue');
  await perfectInpaint('scratch/service3-raw.png', 'scratch/perfect-s3.jpg', 'green');
}

run().catch(console.error);
