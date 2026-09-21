const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const execPath = fs.existsSync(chromePath) ? chromePath : edgePath;

  const browser = await puppeteer.launch({
    executablePath: execPath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({ width: 1280, height: 950, deviceScaleFactor: 2 });

  await page.goto('http://localhost:5173/?v=' + Date.now(), { waitUntil: 'networkidle2' });

  // Wait 3.5s for initial loader
  await new Promise(r => setTimeout(r, 3500));

  // Scroll to services
  await page.evaluate(() => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });

  // Wait 3.5 seconds for GSAP animations to fully settle
  await new Promise(r => setTimeout(r, 3500));

  const serviceSection = await page.$('#services');
  if (serviceSection) {
    await serviceSection.screenshot({
      path: 'C:/Users/rinku/.gemini/antigravity-ide/brain/e5ceb0ba-9695-488a-aab1-03283f194736/services-perfect-final.png'
    });
    console.log('Saved services-perfect-final.png');
  }

  await browser.close();
})();
