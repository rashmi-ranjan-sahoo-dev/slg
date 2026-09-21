const sharp = require('sharp');

async function check() {
  const { data, info } = await sharp('scratch/template-card1.png').raw().toBuffer({ resolveWithObject: true });
  for (let y = 100; y < 125; y++) {
    const idx = (y * info.width + 20) * info.channels;
    console.log(`y=${y}: RGB(${data[idx]}, ${data[idx+1]}, ${data[idx+2]})`);
  }
}
check().catch(console.error);
