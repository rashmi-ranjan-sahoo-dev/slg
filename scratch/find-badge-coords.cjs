const sharp = require('sharp');

async function analyze() {
  for (let i = 1; i <= 3; i++) {
    const { data, info } = await sharp(`scratch/service${i}-raw.png`)
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    console.log(`\n=== Image ${i} (${info.width}x${info.height}) ===`);
    
    // Check center bottom region: x around 99, y from 75 to 110
    // Find where the white border of the badge begins!
    // The white border has high RGB (e.g. R > 230, G > 230, B > 230)
    let minBadgeY = 110;
    let badgePixels = [];
    
    for (let y = 60; y < info.height; y++) {
      for (let x = 60; x < 140; x++) {
        const idx = (y * info.width + x) * info.channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        
        // Badge color or white border detection
        let isBadge = false;
        if (i === 1) {
          // Orange badge (R > 200, G: 80-160, B < 60) or white border (R>220, G>220, B>220)
          if ((r > 200 && g > 70 && g < 170 && b < 70) || (r > 220 && g > 220 && b > 220)) {
            isBadge = true;
          }
        } else if (i === 2) {
          // Blue badge (R < 60, G: 60-150, B > 180) or white border
          if ((b > 160 && r < 80) || (r > 220 && g > 220 && b > 220)) {
            isBadge = true;
          }
        } else if (i === 3) {
          // Green badge (G > 140, R < 60, B < 100) or white border
          if ((g > 130 && r < 80 && b < 110) || (r > 220 && g > 220 && b > 220)) {
            isBadge = true;
          }
        }
        
        if (isBadge) {
          if (y < minBadgeY) minBadgeY = y;
          badgePixels.push({ x, y, r, g, b });
        }
      }
    }
    
    const xs = badgePixels.map(p => p.x);
    const ys = badgePixels.map(p => p.y);
    console.log(`Badge bounding box: x: [${Math.min(...xs)}, ${Math.max(...xs)}], y: [${Math.min(...ys)}, ${Math.max(...ys)}]`);
    console.log(`Badge starts at y = ${minBadgeY}`);
  }
}

analyze().catch(console.error);
