require('dotenv').config()

const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

const MinmaxPlugin = require('puppeteer-extra-plugin-minmax')();
puppeteer.use(MinmaxPlugin);

const AnonymizeuaPlugin = require('puppeteer-extra-plugin-anonymize-ua')();
puppeteer.use(AnonymizeuaPlugin);

const proxies = {
  'useragent1': 'http://user:pass@85.237.57.198:44959',
  'useragent2': 'http://user:pass@116.0.2.94:43379',
  'useragent3': 'http://user:pass@186.86.247.169:39168',
};

(async() => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });

  await page.minimize();
  await page.maximize();

  await page.goto('https://instagram.com/');

  await page.waitForSelector('#loginForm > div > div:nth-child(1) > div > label > input');

  await page.click('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.bIiDR')
  await page.type('#loginForm > div > div:nth-child(1) > div > label > input', process.env.USERNAME);
  await page.type('#loginForm > div > div:nth-child(2) > div > label > input', process.env.PASSWORD);
  await page.click('#loginForm > div > div:nth-child(3) > button')
  await page.waitForNavigation();

  await page.goto('https://www.instagram.com/explore/people/suggested/');
  await page.waitForSelector('#react-root > section > main > div > div.DPiy6.Igw0E.IwRSH.eGOV_._4EzTm.HVWg4 > div > div > div:nth-child(1) > div.Igw0E.rBNOH.YBx95.ybXk5._4EzTm.soMvl');

  let i;
  let selector='';
  for(i=1;i<=5;i++){
      selector=`#react-root > section > main > div > div.DPiy6.Igw0E.IwRSH.eGOV_._4EzTm.HVWg4 > div > div > div:nth-child(${i}) > div.Igw0E.rBNOH.YBx95.ybXk5._4EzTm.soMvl`
      await page.click(selector);
  }

  await browser.close();
})();