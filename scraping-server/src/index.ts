import express, { Request, Response } from 'express';
import cors from 'cors';
import { scrapePsp } from './puppeteer/pspScraper';
import { scrapeAversi } from './puppeteer/aversiScraper';
import { scrapeGpc } from './puppeteer/gpcScraper';
import { scrapePharmadepot } from './puppeteer/pharmadepotScraper';
import { filterAndSortProducts } from './string-utils';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/scrape', async (req: Request, res: Response) => {
  const query = req.query['query'] as string;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const [pspProducts, aversiProducts, gpcProducts, pharmadepotProducts] = await Promise.all([
      scrapePsp(query),
      scrapeAversi(query),
      scrapeGpc(query),
      scrapePharmadepot(query),
    ]);

    const allProducts = [...pspProducts, ...aversiProducts, ...gpcProducts, ...pharmadepotProducts];
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
