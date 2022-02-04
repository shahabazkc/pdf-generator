const puppeteer = require('puppeteer')
const fs = require('fs')

const main = async () => {
  // launch a new chrome instance
  const browser = await puppeteer.launch({
    headless: true
  })

  // create a new page
  const page = await browser.newPage()

  // set your html as the pages content
  const html = fs.readFileSync(`${__dirname}/HTML_TEST.html`, 'utf8')
  await page.setContent(html, {
    waitUntil: 'load',

  })

  // create a pdf buffer
  const pdfBuffer = await page.pdf({
    format: 'A4'
  })

  // or a .pdf file
  await page.pdf({
    format: 'A4',
    path: `${__dirname}/pdf-generator.pdf`
  })

  // close the browser
  await browser.close()
}
main()