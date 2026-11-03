import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');

  // Click AI Matching Engine on Sidebar
  await page.click('text=AI Matching Engine');
  await page.waitForTimeout(1000);

  // Click Evaluate Match
  await page.click('button:has-text("Evaluate Match")');
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: 'C:/Users/Ashwini/.gemini/antigravity/brain/9acde93f-03c5-4f6d-8531-c4ab1da11bf7/humannet_recommendations_running.png',
    fullPage: false
  });

  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Match section snippet:', bodyText.substring(bodyText.indexOf('Ranked Mentor Recommendations'), bodyText.indexOf('Ranked Mentor Recommendations') + 400));

  await browser.close();
})();
