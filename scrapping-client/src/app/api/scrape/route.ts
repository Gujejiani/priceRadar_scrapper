import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log('Received request to /api/scrape');
  const { searchParams } = new URL(req.url, `http://${req.headers.get('host')}`);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  console.log(`Scraping for query: "${query}"`);

  try {
    // Call the scraping-server endpoint
    const apiRes = await fetch(`http://localhost:8080/scrape?query=${encodeURIComponent(query)}`);
    if (!apiRes.ok) {
      let errorBody;
      try {
        errorBody = await apiRes.json();
      } catch {
        errorBody = { error: await apiRes.text() };
      }
      return NextResponse.json(errorBody, { status: apiRes.status });
    }
    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy to scraping-server failed:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
