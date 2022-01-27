const puppeteer = require('puppeteer');
const express = require('express');
var app = express(exports);


const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://stackoverflow.com/questions/53170541/generate-pdf-with-puppeteer-without-save-it/53171202');

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  const pdf = await page.pdf(dimensions);
  return pdf;
}


app.get('/', async function (req, res) {
  const pdf = await main();
  res.contentType("application/pdf");
  res.send(pdf);
});

app.get('/custom')

app.listen(3000, function () { console.log('Listening on 3000') });