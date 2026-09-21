const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const templatePath = 'file:///C:/Users/rinku/OneDrive/Desktop/KVM/slg/reference/template.png';
  
  await page.goto(templatePath);
  
  const clip = { x: 25, y: 340, width: 640, height: 230 };
  await page.screenshot({
    path: 'C:/Users/rinku/.gemini/antigravity-ide/brain/e5ceb0ba-9695-488a-aab1-03283f194736/template-service-cards-zoom.png',
    clip: clip
  });
  console.log('Saved template-service-cards-zoom.png');
  await browser.close();
})();
