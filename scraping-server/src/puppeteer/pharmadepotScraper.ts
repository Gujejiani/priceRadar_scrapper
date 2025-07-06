import { Page } from 'puppeteer';
import { Product } from '@/models/product';
import { withBrowser } from './withBrowser';

const scrapePharmadepotPage = async (page: Page, query: string): Promise<Product[]> => {
  const searchUrl = `https://pharmadepot.ge/ka/search?keyword=${encodeURIComponent(query)}`;
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

  try {
    await page.waitForSelector('a[hreflang="ka"]', { timeout: 5000 });
  } catch {
    console.log(`In Pharmadepot: Selector not found for query: "${query}". Returning empty array.`);
    return [];
  }

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('a[hreflang="ka"]'));

    return items.map((item) => {
      const name = item.querySelector('div.text-md')?.textContent?.trim() || '';
      const priceText = item.querySelector('div[itemprop="content"]')?.textContent?.trim() ||
                        item.querySelector('div[itemprop]')?.textContent?.trim() || 'N/A';
      const price = priceText.replace(/[^\d.,]/g, '');
      const relativeLink = (item as HTMLAnchorElement).getAttribute('href') || '#';
      const link = `https://pharmadepot.ge${relativeLink}`;
      const image = item.querySelector('img') as HTMLImageElement;
      const imageUrl = image?.src || '';

      return {
        name,
        price,
        imageUrl,
        link,
        source: 'Pharmadepo',
      };
    });
  });

  return products;
};


export const scrapePharmadepot = withBrowser(scrapePharmadepotPage);
