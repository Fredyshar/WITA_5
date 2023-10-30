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

When("the current time is later than {int} AM", async function (int) {
  if (now.getHours() > int) {
    await chooseDay(this.page, ".page-nav__day-number", today);
  }
});

Then('the {string} class should contain elements', async function (string) {
  const elements = await this.page.$$(string);
  expect(elements.length).to.be.greaterThan(0);
});

When("if the current time is later than {int} AM and earlier than 23 AM", async function (int) {
  if (now.getHours() > int && now.getHours() < 23) {
    await chooseDay(this.page, ".page-nav__day-number", tomorrow);
  }
});

Then("user sees {string} is gray", {
  timeout: 60 * 1000
}, async function (string) {

  await this.page.waitForNavigation(30000);
  const isDisabled = await this.page.$eval(string, (button) => button.disabled);

  await expect(isDisabled).to.equal(true);
});