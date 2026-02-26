'use client';

import { FormEvent, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrapeResult } from '@/types/scraper';

interface ScrapeFormProps {
  onScrapeComplete?: (result: ScrapeResult) => void;
}

export function ScrapeForm({ onScrapeComplete }: ScrapeFormProps) {
  const [url, setUrl] = useState('https://web-scraping.dev/products');
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      onScrapeComplete?.(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Request failed';
      setError(message);
      console.error('Scrape error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <form className="flex flex-row items-center gap-2" onSubmit={handleSubmit}>
        <Input
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
          placeholder="https://web-scraping.dev/products"
          disabled={true}
          required
        />
        <Button type="submit" variant="destructive" disabled={loading}>
          {loading ? 'Scraping...' : 'Scrape'}
        </Button>
      </form>

      {error && (
        <div className="rounded bg-red-50 p-3 text-sm text-red-700">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="space-y-2">
          <div className="rounded bg-green-50 p-3 text-sm text-green-700">
            ✓ Scraped {result.data?.length || 0} items at{' '}
          </div>
          <details className="rounded border border-gray-200 p-3">
            <summary className="cursor-pointer font-semibold">
              View Results ({result.data?.length || 0} items)
            </summary>
            <pre className="mt-3 max-h-96 overflow-auto rounded bg-gray-50 p-2 text-xs">
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
