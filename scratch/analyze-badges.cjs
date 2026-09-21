const sharp = require('sharp');

async function main() {
  for (let i = 1; i <= 3; i++) {
    const raw = sharp(`scratch/service${i}-raw.png`);
    const meta = await raw.metadata();
    console.log(`Raw ${i}: ${meta.width}x${meta.height}`);
  }
}

main().catch(console.error);
