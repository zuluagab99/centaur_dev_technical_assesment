import { ScrapeForm } from '@/components/ScrapeForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-zinc-50 to-white p-6 dark:from-black dark:to-zinc-900">
      <div className="w-full max-w-2xl space-y-8 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Web Scraper
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Extract structured data from web pages with ease
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <ScrapeForm />
        </div>

        <section className="space-y-4 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Quick Start
          </h2>
          <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              1. Enter a URL (e.g.,{' '}
              <code className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                https://web-scraping.dev/products
              </code>
              )
            </li>
            <li>2. Click the &quot;Scrape&quot; button</li>
            <li>3. View results in the expandable section below</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
