import express, { Request, Response } from 'express';
import cors from 'cors';
import { scrapePsp } from './puppeteer/pspScraper';
import { scrapeAversi } from './puppeteer/aversiScraper';
import { scrapeGpc } from './puppeteer/gpcScraper';
import { filterAndSortProducts } from './string-utils';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Easily enable/disable pharmacies here
const enabledPharmacies = [
  { name: 'psp', scraper: scrapePsp },
  // { name: 'aversi', scraper: scrapeAversi },
  { name: 'gpc', scraper: scrapeGpc },
  // { name: 'pharmadepot', scraper: scrapePharmadepot },
  // To exclude a pharmacy, just comment it out or remove it from this array
];

app.get('/scrape', async (req: Request, res: Response) => {
  const query = req.query['query'] as string;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // Run only enabled pharmacies
    const results = await Promise.all(
      enabledPharmacies.map(({ scraper }) => scraper(query))
    );
    const allProducts = results.flat();
    const filteredProducts = filterAndSortProducts(query, allProducts);
    res.json(filteredProducts);
  } catch (error) {
    console.error('Scraping failed:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

app.listen(port, () => {
  console.log(`Scraping server listening at http://localhost:${port}`);
});
