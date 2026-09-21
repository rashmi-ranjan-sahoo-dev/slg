const sharp = require('sharp');

async function check() {
  for (let i = 1; i <= 3; i++) {
    const { data, info } = await sharp(`scratch/service${i}-raw.png`).raw().toBuffer({ resolveWithObject: true });
    // Find the topmost pixel of the white border around x=99
    let topY = 110;
    for (let y = 60; y < 110; y++) {
      for (let x = 90; x <= 108; x++) {
        const idx = (y * info.width + x) * info.channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        // White border is very bright
        if (r > 210 && g > 210 && b > 210) {
          if (y < topY) {
            topY = y;
            console.log(`Image ${i}: found white border at x=${x}, y=${y}, RGB(${r},${g},${b})`);
            break;
          }
        }
      }
      if (topY < 110) break;
    }
    console.log(`Image ${i}: Top of badge border is at y=${topY}. Badge height in photo = ${110 - topY}px`);
  }
}

check().catch(console.error);
