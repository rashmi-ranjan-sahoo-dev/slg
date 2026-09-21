const sharp = require('sharp');

async function findCardsInTemplate() {
  const meta = await sharp('reference/template.png').metadata();
  console.log(`Template size: ${meta.width}x${meta.height}`);

  // In template.png, let's look at the service cards
  // Cards are positioned side-by-side in "Our Services" section
  // Let's find the card borders and photo bounds for all 3 cards in template.png!
  const { data, info } = await sharp('reference/template.png').raw().toBuffer({ resolveWithObject: true });

  function getPixel(x, y) {
    const idx = (y * info.width + x) * info.channels;
    return [data[idx], data[idx+1], data[idx+2]];
  }

  // Find the 3 white card boxes:
  // Around y = 480, where is the card white background (R>240, G>240, B>240)?
  let whiteRanges = [];
  let inWhite = false;
  let startX = 0;
  for (let x = 0; x < info.width; x++) {
    const [r, g, b] = getPixel(x, 480);
    const isWhite = (r > 240 && g > 240 && b > 240);
    if (isWhite && !inWhite) {
      inWhite = true;
      startX = x;
    } else if (!isWhite && inWhite) {
      inWhite = false;
      whiteRanges.push({ startX, endX: x - 1, width: x - startX });
    }
  }
  if (inWhite) whiteRanges.push({ startX, endX: info.width - 1, width: info.width - startX });

  console.log('Cards detected in template at y=480:', whiteRanges);

  // Now for each card, find photo top, photo bottom, badge center
  for (let i = 0; i < whiteRanges.length; i++) {
    const card = whiteRanges[i];
    const midX = Math.round((card.startX + card.endX) / 2);

    // Scan vertically at card.startX + 10 (inside card, away from badge)
    // Find where the card starts (top) and where the white area starts (photo bottom)
    let cardTop = -1;
    let photoBottom = -1;
    let cardBottom = -1;

    for (let y = 340; y < 600; y++) {
      const [r, g, b] = getPixel(card.startX + 10, y);
      const isWhite = (r > 240 && g > 240 && b > 240);
      const isDarkNavy = (r < 30 && g < 50 && b < 100);

      if (cardTop === -1 && !isDarkNavy) {
        cardTop = y;
      }
      if (cardTop !== -1 && photoBottom === -1 && isWhite) {
        photoBottom = y;
      }
      if (photoBottom !== -1 && cardBottom === -1 && isDarkNavy) {
        cardBottom = y - 1;
      }
    }

    console.log(`Card ${i+1}: X[${card.startX}, ${card.endX}] Width=${card.width}`);
    console.log(`  CardTop=${cardTop}, PhotoBottom=${photoBottom}, CardBottom=${cardBottom}`);
    console.log(`  Photo Height = ${photoBottom - cardTop}, Card Height = ${cardBottom - cardTop}`);
  }
}

findCardsInTemplate().catch(console.error);
