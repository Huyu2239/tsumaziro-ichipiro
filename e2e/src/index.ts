describe("FAQ APP", () => {
  describe("top page", () => {
    beforeEach(async () => {
      await Promise.all([
        page.goto(FRONT_URL),
        page.waitForSelector("[data-test=search-input]"),
      ]);
    });

    test("title with no options", async () => {
      await page.type("[data-test=search-input]", "no options");
      const faqTitles = await page.$$eval("[data-test=question-title]", els =>
        els.map(el => el.textContent),
      );

      ["question with no options"].forEach(title => {
        expect(faqTitles).toContain(title);
      });
    });

    test("title with single options", async () => {
      await page.type("[data-test=search-input]", "single");
      const faqTitles = await page.$$eval("[data-test=question-title]", els =>
        els.map(el => el.textContent),
      );

      ["single1", "single2"].forEach(title => {
        expect(faqTitles).toContain(title);
      });
    });

    test("title with multiple options", async () => {
      await page.type("[data-test=search-input]", "multiple");
      const faqTitles = await page.$$eval("[data-test=question-title]", els =>
        els.map(el => el.textContent),
      );

      [
        "multiple1 multiple3",
        "multiple1 multiple4",
        "multiple2 multiple3",
        "multiple2 multiple4",
      ].forEach(title => {
        expect(faqTitles).toContain(title);
      });
    });
  });

  describe("answer page", () => {
    beforeEach(async () => {
      const pageName = "page1";
      await Promise.all([
        page.goto(`${FRONT_URL}/pages/${pageName}`),
        page.waitForSelector("[data-test=answer-title]"),
      ]);
    });

    test("title", async () => {
      const title = await page.$eval(
        "[data-test=answer-title]",
        el => el.textContent,
      );
      expect(title).toEqual("page1");
    });
  });
});
