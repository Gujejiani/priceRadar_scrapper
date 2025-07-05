import puppeteer, { Browser, Page, LaunchOptions } from 'puppeteer';

type ScraperFunction<T> = (page: Page, query: string) => Promise<T>;

type WithBrowserOptions = LaunchOptions & { headless?: boolean };

export const withBrowser = <T>(scraper: ScraperFunction<T>, options: WithBrowserOptions = { headless: true }) => {
  return async (query: string): Promise<T> => {
    let browser: Browser | null = null;
    try {
      browser = await puppeteer.launch({ headless: options.headless ?? true, devtools: false });
      const page = await browser.newPage();

      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36');
      await page.setViewport({ width: 1920, height: 1080 });
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
          get: () => false,
        });
      });

      return await scraper(page, query);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  };
};
