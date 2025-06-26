import { NextRequest, NextResponse } from 'next/server';
import { scrapePsp } from '@/core/puppeteer/pspScraper';
import { scrapeAversi } from '@/core/puppeteer/aversiScraper';

export async function GET(req: NextRequest) {
  console.log('Received request to /api/scrape');
  const { searchParams } = new URL(req.url, `http://${req.headers.get('host')}`);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  console.log(`Scraping for query: "${query}"`);

  try {
    const [pspProducts, aversiProducts] = await Promise.all([
      scrapePsp(query),
      scrapeAversi(query),
    ]);

    const allProducts = [...pspProducts, ...aversiProducts];
    return NextResponse.json(allProducts);
  } catch (error) {
    console.error('Scraping failed:', error);
    return NextResponse.json({ error: 'Failed to scrape data' }, { status: 500 });
  }
}
