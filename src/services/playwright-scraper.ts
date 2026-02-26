import { chromium, Browser, Page } from 'playwright';
import { ScraperConfig, Product, WebScraper } from '@/types/scraper';

export class PlaywrightScraper implements WebScraper<Product[]> {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async initialize(config: ScraperConfig): Promise<void> {
    this.browser = await chromium.launch({
      headless: config.headless ?? true,
    });
  }

  async navigateToPage(url: string): Promise<void> {
    if (!this.browser) throw new Error('Scraper not initialized');

    const context = await this.browser.newContext({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    this.page = await context.newPage();

    await this.page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 60000,
    });
  }

  async extractData(): Promise<Product[]> {
    if (!this.page) throw new Error('Page not initialized');

    // Wait for product rows to appear (web-scraping.dev format)
    await this.page.waitForSelector('div.row.product', { timeout: 30000 });

    const products = await this.page.$$eval('div.row.product', (rows) => {
      return rows.map(row => {
        const titleEl = row.querySelector('h3.mb-0 > a');
        const priceEl = row.querySelector('.price-wrap .price');
        const descEl = row.querySelector('.short-description');
        const imgEl = row.querySelector('.thumbnail img');
        return {
          title: titleEl ? titleEl.textContent?.trim() ?? null : null,
          url: titleEl ? titleEl.getAttribute('href') : null,
          price: priceEl ? priceEl.textContent?.trim() ?? null : null,
          description: descEl ? descEl.textContent?.trim() ?? null : null,
          image: imgEl ? imgEl.getAttribute('src') : null,
        };
      });
    });

    return products;
  }

  async paginate(): Promise<boolean> {
    if (!this.page) throw new Error('Page not initialized');
    // TODO: Implement pagination logic
    return false;
  }

  async teardown(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}
