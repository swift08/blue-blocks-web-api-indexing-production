This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Google Indexing API

Google’s [Indexing API](https://developers.google.com/search/apis/indexing-api/v3/quickstart) asks Google to crawl URLs you publish (for example after a deploy). It uses a **service account JSON key** and Search Console access—not a simple “API key” string.

### One-time Google Cloud & Search Console setup

1. In [Google Cloud Console](https://console.cloud.google.com/), create or pick a project, then enable **Indexing API**.
2. Create a **service account**, then add a **JSON key** and download the file.
3. In [Google Search Console](https://search.google.com/search-console), open your property → **Settings** → **Users and permissions** → add the service account’s **email** as an **Owner** (required for the Indexing API).

### Run locally

1. Save your Google Cloud **service account JSON key** as **`indexing-service.json.json`** in the **project root** (same folder as `package.json`). That path is the default and the file is **gitignored**—do not commit it.
2. Optional: copy `.env.example` to `.env.local` for `NEXT_PUBLIC_SITE_URL` or overrides.
3. If you do not use the default filename, point Node at your key file:

   ```bash
   set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\your-key.json
   ```

   Or put the full JSON in `GOOGLE_SERVICE_ACCOUNT_JSON` (single line), as in `.env.example`.

4. Build so `public/sitemap.xml` exists, then notify Google:

   ```bash
   npm run build
   npm run index-google
   ```

**Quotas:** Google enforces daily limits per property; avoid running `index-google` on every local build. Use it after meaningful production deploys.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
