const puppeteer = require('puppeteer-core');

async function testClosingBanner() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 900 });
  await page.goto('http://localhost:5173/?skipLoader=true', { waitUntil: 'networkidle0' });

  // Scroll to bottom
  await page.evaluate(async () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));

  const banner = await page.$('#contact');
  await banner.screenshot({ path: 'scratch/closing-banner-desktop.png' });

  // Mobile
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(async () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  const bannerMobile = await page.$('#contact');
  await bannerMobile.screenshot({ path: 'scratch/closing-banner-mobile.png' });

  await browser.close();
  console.log('Successfully captured banner screenshots!');
}

testClosingBanner().catch(console.error);
