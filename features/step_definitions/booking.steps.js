const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { clickElement, getText } = require("../../lib/commands.js");
const { chooseDay, chooseSeat } = require("../../lib/utils.js");
var { setDefaultTimeout } = require("@cucumber/cucumber");
var now = new Date();
let today = now.getDate();
let tomorrow = today + 1;
setDefaultTimeout(60 * 1000);

Before({ timeout: 60000 }, async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 60000,
  });
});

When(
  "user chooses by {string}",
  {
    timeout: 60 * 1000,
  },
  async function (string) {
    await chooseDay(this.page, string, tomorrow);
    // await clickElement(this.page, string);
  }
);

When("user chooses movie {string}", async function (string) {
  return await clickElement(this.page, string);
});

When("user chooses seat {string}", async function (string) {
  return await clickElement(this.page, string);
});

When("user click {string}", async function (string) {
  return await clickElement(this.page, string);
});

Then("user sees text {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user sees the header {string}", async function (string) {
  const actual = await getText(this.page, "h2");
  const expected = await string;
  expect(actual).contains(expected);
});

Then(
  "user sees {string} is gray",
  {
    timeout: 60 * 1000,
  },
  async function (string) {
    await clickElement(this.page, string);
    await this.page.waitForNavigation(30000);
    const isDisabled = await page.$eval("button", (button) => button.disabled);
    await this.page.waitForNavigation(30000);

    await expect(isDisabled).to.equal(true);
  }
);
