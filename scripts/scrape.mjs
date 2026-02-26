#!/usr/bin/env node

/**
 * Standalone web scraper script
 * Usage: node scripts/scrape.mjs <url>
 * 
 * Example:
 *   node scripts/scrape.mjs "https://web-scraping.dev/products"
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function scrapeWebsite(url) {
  console.log(`Scraping: ${url}`);

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });

    const page = await context.newPage();

    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    console.log('✓ Page loaded');

    // Wait for product rows to appear
    await page.waitForSelector('div.row.product', { timeout: 30000 });
    console.log('✓ Products found');

    const products = await page.$$eval('div.row.product', (rows) => {
      return rows.map((row) => {
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

    // Save results
    const resultsDir = 'scrape-results';
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = path.join(resultsDir, `${timestamp}.json`);

    const result = {
      url,
      scrapedAt: new Date().toISOString(),
      itemCount: products.length,
      products,
    };

    fs.writeFileSync(filename, JSON.stringify(result, null, 2));

    console.log(`✓ Scraped ${products.length} items`);
    console.log(`✓ Results saved to ${filename}`);
    console.log('\nProducts:');
    console.log(JSON.stringify(products, null, 2));

    return result;
  } finally {
    await browser.close();
  }
}

// Main execution
const url = process.argv[2];

if (!url) {
  console.error('Usage: node scripts/scrape.mjs <url>');
  console.error('');
  console.error('Example:');
  console.error('  node scripts/scrape.mjs "https://web-scraping.dev/products"');
  process.exit(1);
}

scrapeWebsite(url).catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
