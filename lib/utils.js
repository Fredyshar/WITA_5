module.exports = {
    chooseDay: async function (page, selector, day) {
        try {
          await page.waitForSelector(selector);
          const elements = await page.$$(selector);

          for (const element of elements) {
            const text = await element.evaluate((el) => el.textContent);
            if (text.includes(day)) {
              await element.click();
              break;
            }
          }
        } catch (error) {
          throw new Error("day: " + day + " not found. Please choose another day");
        }
      },

    chooseSeat: async function(array) {
        const randomSeat = Math.floor(Math.random() * array.length);
        array[randomSeat].click()

    }
};
