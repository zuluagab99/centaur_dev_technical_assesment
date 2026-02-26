This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

   ```bash
    pnpm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


#### Q&A

1. A scraper that worked reliably suddenly starts failing. How do you debug and stabilize it?

The first thinng I would do is to isolate the failure type (network, parsing or bot detection), inspect for site structure changes, add verbose logging and screenshots, then stabilize with explicit waits and retry logic.

2. Playwright tests pass locally but fail in CI. What do you investigate?

It's always nice to check the depencies, if it's dockerized, check the dockerfile, if it's not, check the absent env vars, network egress restrictions, or viewport differences

3. How do you approach bot detection ethically and technically?

Always is important to check the terms of service of the website to be scrapped, there are a lot of things like the data ownership and the usage for this

4. What would you refactor/improve if you had more time?

Nice to have:
- Database to store the scraped data
- Queue to handle the scraping jobs
- Dashboard to monitor the scraping process

5. How would you scale this to scraper 100+ sites?

Change the script to use a queue to handle the scraping jobs, maybe improve the selectors, move the service to a separate infrastructure so it's independent from the frontend, and a dashboard/instrumentation to monitor the scraping process.

