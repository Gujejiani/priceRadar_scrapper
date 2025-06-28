import { Page } from 'puppeteer';
import { Product } from '@/models/product';
import { withBrowser } from './withBrowser';

const scrapeGpcPage = async (page: Page, query: string): Promise<Product[]> => {
  const searchUrl = `https://gpc.ge/ka/search?keyword=${encodeURIComponent(query)}`;
  await page.goto(searchUrl);

  try {
    await page.waitForSelector('div[class*="flex flex-col"] a', { timeout: 10000 });
  } catch {
    console.log(`Selector "div[class*="flex flex-col"] a" not found for query: "${query}". Returning empty array.`);
    return [];
  }

 const products = await page.evaluate(() => {
  const items = Array.from(document.querySelectorAll('div[class*="flex flex-col"] a'));

  return items.map((item) => {
    const name =
      item.querySelector('div.text-md')?.textContent?.trim() || '';

    // const imageEl = item.querySelector('img');
    // const imageUrl = imageEl?.getAttribute('src') || '';

    const priceEl = item.querySelector('div[itemprop][content]');
    const price = priceEl?.getAttribute('content') || 'N/A';

    const link = item.getAttribute('href')
      ? `https://www.gpc.ge${item.getAttribute('href')}`
      : '#';

      const imgEl = item.querySelector('img');
        let realImageUrl = '';

if (imgEl) {
  const src = imgEl.getAttribute('src') || '';
  const match = src.match(/url=(.*?)&/);
  realImageUrl  =src;
  if (match && match[1]) {
    realImageUrl = decodeURIComponent(match[1]);
  }
}

    return {
      name,
      price,
      imageUrl: realImageUrl,
      link,
      source: 'GPC',
    };
  });
});

  return products;
};

export const scrapeGpc = withBrowser(scrapeGpcPage);
