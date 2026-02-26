/**
 * Type definitions for web scraping services
 */

export interface ScraperConfig {
  baseUrl: string;
  headless?: boolean;
  timeoutMs?: number;
}

export interface Product {
  title: string | null;
  url: string | null;
  price: string | null;
  description: string | null;
  image: string | null;
}

export interface ScrapeResult<T = Product[]> {
  url: string;
  scrapedAt: Date;
  data: T;
  errors: string[];
}

/**
 * Core interface every site-specific scraper must satisfy.
 *
 * Lifecycle:
 *   initialize → navigateToPage → [extractData / paginate]* → teardown
 */
export interface WebScraper<TData = unknown> {
  /** Boot the browser/HTTP client and apply configuration. */
  initialize(config: ScraperConfig): Promise<void>;

  /** Navigate to a URL and wait until the page is ready. */
  navigateToPage(url: string): Promise<void>;

  /** Pull structured data from the currently loaded page. */
  extractData(): Promise<TData>;

  /**
   * Advance to the next page of results.
   * Resolves `true` if a next page exists, `false` when exhausted.
   */
  paginate(): Promise<boolean>;

  /** Release browser / connections; always call even on error. */
  teardown(): Promise<void>;
}
