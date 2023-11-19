import puppeteer, { Browser, Page } from "puppeteer";

let browser: Browser | null = null;
let page: Page | null = null;

describe("main-page-test", () => {
  beforeEach(async () => {
    browser = await puppeteer.launch({
      //   headless: true,
      //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();

    await page.evaluateOnNewDocument((token) => {
      localStorage.clear();
      localStorage.setItem("jwt", token);
    }, "eyJh...9_8cw");

    await page.goto("http://localhost:3000/");
  });

  afterEach(async () => {
    await browser?.close();
  });
  it("open-recomendation-sub-tab", async () => {
    // page?.on("request", (request) => {
    //   if (request.url().endsWith("/api/some/endpoint/?with=params")) {
    //     request.respond({
    //       status: 200,
    //       contentType: "application/json",
    //       body: JSON.stringify("https://example.com/returned/redirect/url/"),
    //     });
    //   } else {
    //     request.continue();
    //   }
    // });
    // page?.setRequestInterception(true);

    console.log(page?.url());

    await new Promise((resolve) => setTimeout(resolve, 100));

    page?.click("[datatype='swiper-show-all-Рекомендации дня']");

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(page?.url()).toEqual("https://example.com/returned/redirect/url/");
  });
});
