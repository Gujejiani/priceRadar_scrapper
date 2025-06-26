import puppeteer from 'puppeteer';
import { Product } from '@/models/product';

export const scrapePsp = async (query: string): Promise<Product[]> => {
  const browser = await puppeteer.launch({ headless: false, devtools: false });
  const page = await browser.newPage();

  // Navigate directly to the search results page
  const searchUrl = `https://psp.ge/catalogsearch/result?q=${encodeURIComponent(query)}`;
  await page.goto(searchUrl);

  // Wait for the search results to load
  await page.waitForSelector('.product');

  // Scrape the product data
  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.product'));
    return items.map((item) => {
      const name = item.querySelector('.product__title')?.textContent?.trim() || '';
      const imageUrl = (item.querySelector('img') as HTMLImageElement)?.src || '';
      const price = item.querySelector('.product__price')?.textContent?.trim() || 'N/A';
      const link = (item.querySelector('a') as HTMLAnchorElement)?.href || '#';

      return {
        name,
        price,
        imageUrl,
        link,
        source: 'PSP',
      };
    });
  });

  await browser.close();
  return products;
};
