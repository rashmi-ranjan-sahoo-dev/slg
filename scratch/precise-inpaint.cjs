const sharp = require('sharp');

async function inpaintPrecise(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  const cx = 99;
  const cy = 110;
  const radius = 32.5;

  const mask = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dist = Math.hypot(x - cx, y - cy);
      if (dist <= radius) {
        mask[y * width + x] = 1;
      }
    }
  }

  // Find boundary pixels (mask === 0, within dist <= radius + 3)
  const boundaryPixels = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dist = Math.hypot(x - cx, y - cy);
      if (dist > radius && dist <= radius + 4) {
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

  console.log(`Boundary points: ${boundaryPixels.length}`);

  const outputData = Buffer.from(data);

  // Inpaint with IDW
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (mask[y * width + x] === 1) {
        let totalW = 0;
        let sumR = 0, sumG = 0, sumB = 0;

        for (const bp of boundaryPixels) {
          const dx = x - bp.x;
          const dy = y - bp.y;
          // Weight with vertical priority so vertical folds continue naturally
          const d = Math.sqrt(dx * dx * 2 + dy * dy) + 0.001;
          const w = 1 / Math.pow(d, 2.5);

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
    .sharpen({ sigma: 1.0, m1: 1.0, m2: 2.0 })
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log(`Saved ${outputPath}`);
}

async function run() {
  await inpaintPrecise('scratch/service1-raw.png', 'scratch/precise-s1.jpg');
  await inpaintPrecise('scratch/service2-raw.png', 'scratch/precise-s2.jpg');
  await inpaintPrecise('scratch/service3-raw.png', 'scratch/precise-s3.jpg');
}

run().catch(console.error);
