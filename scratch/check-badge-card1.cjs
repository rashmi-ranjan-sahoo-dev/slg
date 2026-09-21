const sharp = require('sharp');

async function checkBadge() {
  const { data, info } = await sharp('scratch/template-card1.png').raw().toBuffer({ resolveWithObject: true });
  // Find orange pixels of badge in template-card1.png
  let minY = 999, maxY = 0, minX = 999, maxX = 0;
  for (let y = 50; y < 160; y++) {
    for (let x = 60; x < 140; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // Orange or white of badge
      if ((r > 190 && g > 80 && g < 160 && b < 60) || (r > 230 && g > 230 && b > 230 && y >= 90 && y <= 150)) {
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  console.log(`Badge in template-card1.png: X[${minX}, ${maxX}] Y[${minY}, ${maxY}]`);
  console.log(`Badge center: X=${(minX+maxX)/2}, Y=${(minY+maxY)/2}`);
  console.log(`Badge diameter: X=${maxX - minX}, Y=${maxY - minY}`);
}
checkBadge().catch(console.error);
