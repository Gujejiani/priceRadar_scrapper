import { Page } from 'puppeteer';
import { Product } from '@/models/product';
import { withBrowser } from './withBrowser';

const scrapeAversiPage = async (page: Page, query: string): Promise<Product[]> => {
  // Navigate directly to the search results page
  const searchUrl = `https://www.aversi.ge/ka/search?q=${encodeURIComponent(query)}`;
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Wait for the search results to load, but handle timeouts
  try {
    await page.waitForSelector('.product', { timeout: 2000 });
  } catch {
    console.log(`in Aversi Selector ".product" not found for query: "${query}". Returning empty array.`);
    return [];
  }

  // Scrape the product data
  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.product'));
    return items.map((item) => {
      const name = item.querySelector('.product-title')?.textContent?.trim() || '';
      const imageUrl = (item.querySelector('img') as HTMLImageElement)?.src || '';
      const price = item.querySelector('.amount')?.textContent?.trim() || 'N/A';
      const link = (item.querySelector('a') as HTMLAnchorElement)?.href || '#';

      return {
        name,
        price,
        imageUrl,
        link,
        source: 'Aversi',
      };
    });
  });

  return products;
};

export const scrapeAversi = withBrowser(scrapeAversiPage);
