import { Page } from 'puppeteer';
import { Product } from '@/models/product';
import { withBrowser } from './withBrowser';

const scrapeAversiPage = async (page: Page, query: string): Promise<Product[]> => {
  // Navigate directly to the search results page
  const searchUrl = `https://www.aversi.ge/ka/aversi/act/searchMedicine/?kw_ka=${encodeURIComponent(query)}&ka_search=on`;
  await page.goto(searchUrl);

  // Wait for the search results to load
  await page.waitForSelector('.product');

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
