import { Page } from 'puppeteer';
import { Product } from '@/models/product';
import { withBrowser } from './withBrowser';

const scrapePspPage = async (page: Page, query: string): Promise<Product[]> => {
  // Navigate directly to the search results page
  const searchUrl = `https://psp.ge/catalogsearch/result?q=${encodeURIComponent(query)}`;
  await page.goto(searchUrl);

  // Wait for the search results to load, but handle timeouts
  try {
    await page.waitForSelector('.product', { timeout: 2000 });
  } catch {
    console.log(`In Psp Selector ".product" not found for query : "${query}". Returning empty array.`);
    return [];
  }

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

  return products;
};

export const scrapePsp = withBrowser(scrapePspPage);
