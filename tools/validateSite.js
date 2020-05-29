const findChrome = require("chrome-finder");
const puppeteer = require("puppeteer-core");
const htmlValidator = require("html-validator");

async function validate(html, url) {
  try {
    return [url].concat(
      await htmlValidator({
        format: "text",
        data: html,
      })
    );
  } catch (error) {
    return error;
  }
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: findChrome(),
  });

  const results = [];
  const pageLinks = [
    "http://0.0.0.0:1234/",
    "http://0.0.0.0:1234/students",
    "http://0.0.0.0:1234/ethnicity",
  ];

  for (const pageURL of pageLinks) {
    const page = await browser.newPage();
    await page.goto(pageURL);

    const documentHTML = await page.evaluate(() =>
      new XMLSerializer().serializeToString(document)
    );

    results.push(await validate(documentHTML, pageURL));

    await page.close();
  }

  results.forEach((result) => console.log(result.join("\n")));

  await browser.close();
})();
