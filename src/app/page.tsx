import { ScrapeForm } from '@/components/ScrapeForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-zinc-50 to-white p-6 dark:from-black dark:to-zinc-900">
      <div className="w-full max-w-2xl space-y-8 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Web Scraper
          </h1>

        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <ScrapeForm />
        </div>

      </div>
    </main>
  );
}
