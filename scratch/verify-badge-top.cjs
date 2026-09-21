const sharp = require('sharp');

async function verifyBadgeTop() {
  for (let i = 1; i <= 3; i++) {
    const { data, info } = await sharp(`scratch/service${i}-raw.png`).raw().toBuffer({ resolveWithObject: true });
    
    // Find the topmost pixel of the COLORED CIRCLE (not white, which could be collar/reflection)
    // Orange for 1, Blue for 2, Green for 3
    let topColorY = 110;
    let topWhiteBorderY = 110;

    for (let y = 80; y < 110; y++) {
      for (let x = 80; x < 120; x++) {
        const idx = (y * info.width + x) * info.channels;
        const r = data[idx], g = data[idx+1], b = data[idx+2];

        let isColor = false;
        if (i === 1 && r > 200 && g > 80 && g < 150 && b < 50) isColor = true;
        if (i === 2 && b > 160 && r < 50) isColor = true;
        if (i === 3 && g > 130 && r < 50 && b < 100) isColor = true;

        if (isColor && y < topColorY) {
          topColorY = y;
        }

        if (r > 225 && g > 225 && b > 225 && y < topWhiteBorderY && y >= 88) {
          topWhiteBorderY = y;
        }
      }
    }

    console.log(`Image ${i}: Colored circle starts at y=${topColorY}, White border starts at y=${topWhiteBorderY}`);
  }
}

verifyBadgeTop().catch(console.error);
