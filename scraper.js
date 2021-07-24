const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="logo"]/img');
    const src = await el.getProperty('src');
    const srcTxt = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="Content"]/div/div/div/div[1]/div/div[2]/div/div/div/p[4]/strong');
    const title = await el2.getProperty('textContent');
    const titleTxt = await title.jsonValue();

    const [el3] = await page.$x('//*[@id="menu-item-4359"]/a/span');
    const linkTxt = await el3.getProperty('textContent');
    const linkTxtRaw = await linkTxt.jsonValue();

    console.log({ srcTxt, titleTxt, linkTxtRaw });

    browser.close();
}

const url = 'https://melaniemowinski.com/calendars/';
scrapeProduct(url)