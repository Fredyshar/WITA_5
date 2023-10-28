const { chooseDay, chooseSeat } = require("./lib/utils.js");
const { clickElement, getText, putText } = require("./lib/commands.js");

let page;
var now = new Date();
let today = now.getDate();
let tomorrow = today + 1;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(async () => {
  page.close();
});

describe("Booking seats in Cinema", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await chooseDay(page, ".page-nav__day-number", tomorrow);
  });

  //First and second path test
  test("Booking 1 standart seat'", async () => {
    await clickElement(page, ".movie-seances__time[data-seance-id='177']");
    const standartSeats = await page.$$(".buying-scheme__chair_standart");
    await chooseSeat(standartSeats);
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Booking 1 vip seat'", async () => {
    await clickElement(page, ".movie-seances__time[data-seance-id='177']");
    const vipSeats = await page.$$(".buying-scheme__chair_vip");
    await chooseSeat(vipSeats);
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  //third test - bad path
  test("Don't booking seat", async () => {
    if (now.getHours() > 10) {
      await chooseDay(page, ".page-nav__day-number", today);
      const element = await page.$('[data-seance-id="177"]');
      const classList = await page.evaluate(
        (element) => Array.from(element.classList),
        element
      );
      const hasClass =
        classList.includes("movie-seances__time") &&
        classList.includes("acceptin-button-disabled");
      expect(hasClass).toBe(true);
    } else {
      await clickElement(page, "[data-seance-id='177']");
      const isDisabled = await page.$eval(
        "button",
        (button) => button.disabled
      );
      expect(isDisabled).toBe(true);
    }
  });
});
