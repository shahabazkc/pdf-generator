const puppeteer = require('puppeteer');
const express = require('express');
var app = express(exports);


const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5501/index.html');

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      printBackground: true,
    
      
    };
  });
  console.log(dimensions);
  const pdf = await page.pdf(dimensions);
  return pdf;
}


app.get('/', async function (req, res) {
  res.send("hello world");
});

app.get('/custom', async function (req, res) {
  const pdf = await main();
  res.contentType("application/pdf");
  res.send(pdf);
})

app.listen(8000, function () { console.log('Listening on 3000') });