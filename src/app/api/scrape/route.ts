import { NextRequest, NextResponse } from 'next/server';
import { PlaywrightScraper } from '@/services/playwright-scraper';
import type { ScrapeResult } from '@/types/scraper';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid URL provided' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed URL' },
        { status: 400 }
      );
    }

    // Initialize scraper
    const scraper = new PlaywrightScraper();

    try {
      await scraper.initialize({ headless: true });
      await scraper.navigateToPage(url);
      const data = await scraper.extractData();

      const result: ScrapeResult = {
        url,
        scrapedAt: new Date(),
        data,
        errors: [],
      };

      return NextResponse.json({ success: true, ...result });
    } finally {
      await scraper.teardown();
    }
  } catch (err: any) {
    console.error('Scrape error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Scraping failed',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Web Scraper API',
    endpoint: 'POST /api/scrape',
    body: { url: 'string' },
  });
}
