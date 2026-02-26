import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web Scraper',
  description: 'A professional web scraping application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
