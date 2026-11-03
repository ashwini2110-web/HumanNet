import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');

  // Click evaluate button
  const button = page.locator('button:has-text("Evaluate Match")');
  await button.click();

  // Wait for results
  await page.waitForSelector('text=Ranked Mentor Recommendations');
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: 'C:/Users/Ashwini/.gemini/antigravity/brain/9acde93f-03c5-4f6d-8531-c4ab1da11bf7/humannet_recommendations_running.png',
    fullPage: false
  });

  await browser.close();
  console.log('Recommendation screenshot captured successfully');
})();
