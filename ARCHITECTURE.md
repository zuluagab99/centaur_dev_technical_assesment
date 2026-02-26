## 🏗️ Project Structure

```
web-scraper/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   └── scrape/
│   │   │       └── route.ts    # POST /api/scrape endpoint
│   │   ├── globals.css         # Global Tailwind CSS
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   │
│   ├── components/             # React Components
│   │   ├── ScrapeForm.tsx      # Main scraping form
│   │   └── ui/                 # UI Primitives
│   │       ├── button.tsx
│   │       └── input.tsx
│   │
│   ├── lib/                    # Utilities & Constants
│   │   ├── constants.ts        # App constants
│   │   └── utils.ts            # Helper functions
│   │
│   ├── services/               # Business Logic
│   │   └── playwright-scraper.ts  # Scraper implementation
│   │
│   └── types/                  # TypeScript Definitions
│       └── scraper.ts          # Type definitions
│
├── scripts/                    # CLI Scripts
│   └── scrape.mjs              # Standalone scraper
│
├── public/                     # Static assets
│
├── .env.example                # Environment variables
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies & scripts
└── README.md                   # Documentation
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install
```

### Start Development Server

```bash
# Run on http://localhost:3000
pnpm dev
```

### Build for Production

```bash
pnpm build
pnpm start
```

## 📝 Usage

### Web UI

1. Open [http://localhost:3000](http://localhost:3000)
2. Enter a URL (e.g., `https://web-scraping.dev/products`)
3. Click "Scrape"
4. View results in the expandable result panel

### API Endpoint

**POST** `/api/scrape`

**Request:**
```bash
curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://web-scraping.dev/products"}'
```

**Response:**
```json
{
  "success": true,
  "url": "https://web-scraping.dev/products",
  "scrapedAt": "2026-02-25T20:00:00.000Z",
  "data": [
    {
      "title": "Product Name",
      "url": "https://...",
      "price": "$19.99",
      "description": "...",
      "image": "https://..."
    }
  ],
  "errors": []
}
```

### CLI Script

```bash
# Scrape and save results
pnpm scrape "https://web-scraping.dev/products"

# Results saved to: scrape-results/YYYY-MM-DDTHH-MM-SS-mmmmZ.json
```

## 🏛️ Architecture Principles

### Separation of Concerns

- **Components** (`src/components/`): UI presentation only
- **Services** (`src/services/`): Business logic (scraping)
- **API Routes** (`src/app/api/`): HTTP endpoints
- **Types** (`src/types/`): Shared type definitions
- **Utils** (`src/lib/`): Reusable utilities

### Type Safety

All code is written in TypeScript with strict mode enabled:

```typescript
// Strongly typed interfaces
interface Product {
  title: string | null;
  url: string | null;
  price: string | null;
  description: string | null;
  image: string | null;
}

// Extensible service pattern
interface WebScraper<TData = unknown> {
  initialize(config: ScraperConfig): Promise<void>;
  navigateToPage(url: string): Promise<void>;
  extractData(): Promise<TData>;
  paginate(): Promise<boolean>;
  teardown(): Promise<void>;
}
```

### Scalability

Adding a new scraper:

1. **Create a service** (`src/services/new-scraper.ts`):
```typescript
export class NewScraper implements WebScraper<NewData> {
  // Implement interface methods
}
```

2. **Define types** (`src/types/new-data.ts`):
```typescript
export interface NewData {
  // Your data structure
}
```

3. **Create API route** (`src/app/api/new-scrape/route.ts`):
```typescript
// Use new scraper
```

## 🔧 Development Workflow

### Code Organization

- **One component per file** (e.g., `Button.tsx`, `ScrapeForm.tsx`)
- **Clear export/import paths** using `@/` alias
- **Consistent naming**: Components `PascalCase`, files `camelCase`
- **Collocate styles** with components (Tailwind)

### Error Handling

All errors are caught and returned with meaningful messages:

```typescript
try {
  const result = await scraper.extractData();
  return NextResponse.json({ success: true, data: result });
} catch (err) {
  return NextResponse.json(
    { success: false, error: err.message },
    { status: 500 }
  );
}
```

### Configuration

Edit `src/lib/constants.ts`:

```typescript
export const SCRAPER_CONFIG = {
  DEFAULT_TIMEOUT_MS: 60000,
  HEADLESS: true,
} as const;
```

## 📦 Dependencies

### Core

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript 5**: Type safety

### Scraping

- **Playwright 1.58+**: Browser automation

### Styling

- **Tailwind CSS 4**: Utility-first CSS
- **shadcn**: Accessible component library
- **clsx** & **tailwind-merge**: Class utilities

## 🧪 Testing

### Manual Testing

```bash
# Test API endpoint
curl http://localhost:3000/api/scrape -X POST \
  -H "Content-Type: application/json" \
  -d '{"url":"https://web-scraping.dev/products"}'

# Test CLI
pnpm scrape "https://web-scraping.dev/products"
```

### Browser Testing

1. Open app in development mode
2. Enter test URL
3. Check console for any errors
4. Verify results in UI

## 📚 Key Files

| File | Purpose |
|------|---------|
| `src/types/scraper.ts` | Core type definitions |
| `src/services/playwright-scraper.ts` | Scraper implementation |
| `src/app/api/scrape/route.ts` | API endpoint logic |
| `src/components/ScrapeForm.tsx` | Main UI component |
| `scripts/scrape.mjs` | CLI entry point |

## 🚢 Deployment

### Vercel

```bash
# Connect to Vercel
npm i -g vercel
vercel

# Deploy
vercel --prod
```

### Self-Hosted (Node)

```bash
# Build
pnpm build

# Run
pnpm start
```

## 📋 Best Practices Followed

✅ **Clean Architecture** - Clear separation of concerns  
✅ **Type Safety** - Full TypeScript with strict mode  
✅ **Error Handling** - Comprehensive error catching  
✅ **Code Organization** - Logical file structure  
✅ **Scalability** - Easy to add new scrapers  
✅ **Documentation** - Code comments and README  
✅ **Development Experience** - Hot reload, proper tooling  
✅ **Production Ready** - Error boundaries, logging  

## 🤝 Contributing

1. Follow existing code style
2. Maintain type safety
3. Add proper error handling
4. Update documentation

## 📝 License

MIT
