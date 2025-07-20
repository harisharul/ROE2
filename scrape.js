const { chromium } = require('playwright');

(async () => {
  const seeds = Array.from({ length: 10 }, (_, i) => 85 + i);
  let total = 0;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);
    await page.waitForSelector("table");

    const numbers = await page.$$eval('td', tds =>
      tds.map(td => parseInt(td.textContent.trim()))
         .filter(n => !isNaN(n))
    );

    total += numbers.reduce((sum, num) => sum + num, 0);
  }

  console.log("✅ 23f2004940@ds.study.iitm.ac.in");
  console.log("Total sum:", total);

  await browser.close();
})();
