const { chromium } = require("playwright");
const { sendEmail } = require("./email");
const cron = require("node-cron");

const main = async () => {
  const browser = await chromium.launch({
    slowMo: 50,
    chromiumSandbox: false,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://distribuidorasayan.com/?s=acepet&search_id=product&post_type=product"
  );

  const productsContainer = await page.$(".products");
  const products = await productsContainer.$$("li");

  let areProductsInStock = false;

  for (const product of products) {
    const isOutOfStock = await product.$(".ast-shop-product-out-of-stock");
    if (isOutOfStock) {
      console.log("out of stock");
    } else {
      areProductsInStock = true;
      console.log("in stock");
    }
  }
  browser.close();

  if (areProductsInStock) {
    await sendEmail();
  }
};

// schedule every hours
cron.schedule("0 */1 * * *", main);

console.log("started");
