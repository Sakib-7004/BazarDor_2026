# 🛒 বাজার দর — BazarDor

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক জায়গায় দেখা, তুলনা করা এবং বাজারের পরিবর্তন বোঝার জন্য তৈরি একটি responsive Next.js অ্যাপ। এটি Programming Hero B14-A7 Bazar Dor assignment-এর API ও প্রয়োজনীয়তা অনুসরণ করে।

## Technologies
- Next.js 15 App Router and React
- TypeScript and beginner-friendly React components
- Tailwind CSS v4 + custom responsive CSS
- Better Auth (email/password, Google and GitHub OAuth)
- React Hot Toast and Lucide icons
- BazarDor products/categories REST API
- SQLite local database via better-sqlite3

## Features
1. Home page with price increases, price decreases, ticker and all products.
2. Product/category data fetched from the provided API with fallback endpoints and friendly fallback sample data.
3. Category filters and numeric price sorting (low-to-high / high-to-low).
4. Dynamic product details with minimum, maximum, average and market-wise prices.
5. Protected product details, profile pages and profile update form.
6. Better Auth email/password sign-up and sign-in; Google/GitHub OAuth configuration support.
7. Toast notifications, loading skeletons, empty states and a friendly 404 page.
8. Responsive layout for mobile, tablet and desktop.
9. Navbar highlights the current category and the home link based on the active route.

## Beginner setup

### 1. Install Node.js
Install the current Node.js LTS version from https://nodejs.org/.

### 2. Install dependencies
Open this folder in VS Code. In the terminal run:

```bash
npm install
```

### 3. Add environment variables
Copy `.env.example` to `.env.local` and set a long random `BETTER_AUTH_SECRET`. Local defaults allow the app to start for development. Do not publish `.env.local` or secrets.

```env
BETTER_AUTH_SECRET=put-a-long-random-secret-here
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=./bazardor.db
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

For Google and GitHub login, create OAuth apps in the respective developer consoles and add their credentials. Set the callback URL to `http://localhost:3000/api/auth/callback/google` or `http://localhost:3000/api/auth/callback/github` as applicable. For production, set the production domain and callback URLs too. Never commit credentials.

### 4. Start the website

```bash
npm run dev
```

Open http://localhost:3000.

### 5. Verify the production build

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

These commands should be run locally after pulling the latest changes. A successful GitHub file update is not proof that the app builds or that authentication works end to end.

## API endpoints
The app tries these base URLs in order:

- `https://openapi.programming-hero.com/api/bazardor`
- `https://api.api-store.workers.dev/api/bazardor`
- `https://api.abcz.workers.dev/api/bazardor`

It uses `/products`, `/products?category=SLUG`, `/products/ID`, and `/categories`. API data formats sometimes differ; the normalizer accepts common field names. If all APIs are temporarily unavailable, sample data is shown so the layout remains usable. Sample prices are illustrative, not official market quotations.

## Known limitations and deployment checklist

### Active category highlighting
The navbar uses the current route to highlight “সব পণ্য” on the home page and the matching category while browsing a category page.

### Google and GitHub login
Social-login buttons only work after valid OAuth client IDs and secrets have been added to `.env.local` (local) or the hosting provider's environment settings (production). Register the exact callback URLs with Google/GitHub. OAuth cannot be fully verified without provider credentials.

### Production authentication and database
The local setup uses `better-sqlite3` and a local database file. Local SQLite files are not a reliable persistent database for typical serverless deployments such as Vercel. Before production, move Better Auth to a persistent supported database and configure the appropriate adapter. Production startup now requires `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`; set both in the hosting environment. Never use the local development secret in production.

### Market-by-market prices
The detail page displays market prices when the API provides them. If the API has no market breakdown, the normalizer currently supplies a single “স্থানীয় বাজার” fallback row based on the available product price. This fallback is not an independently collected market quote and must not be presented as verified market-specific data.

### Price changes and sample data
Price movement is calculated from the current and previous prices when those fields are available. If the API omits previous-price and percentage-change data, the normalizer may display a zero change, which means “no change data available from the API” rather than proof that the market price stayed the same. When all API endpoints fail, sample products and prices are shown. Do not treat these sample values as live market quotations.

### Build and end-to-end verification
The repository source has been updated, but the full application build and end-to-end behaviour have not been independently verified in this editing session. After pulling changes, run the verification commands above and test:
- Home, category links, active category styling and sorting.
- Product details after direct URL navigation and page refresh.
- Email/password sign-up, sign-in, sign-out and profile update.
- Google/GitHub OAuth using configured credentials.
- API failure handling and the visible disclaimer for fallback/sample data.
- Production database persistence and authentication on the chosen hosting platform.

## Suggested 8 meaningful Git commits
Make commits as you complete each step in your own repository:

```bash
git add package.json tsconfig.json next.config.ts postcss.config.mjs && git commit -m "chore: set up Next.js project"
git add app/globals.css app/layout.tsx && git commit -m "style: add responsive BazarDor layout"
git add lib/types.ts lib/api.ts && git commit -m "feat: fetch and normalize BazarDor API data"
git add components/Navbar.tsx components/CategoryNav.tsx components/PriceTicker.tsx components/Footer.tsx && git commit -m "feat: build navigation and price ticker"
git add app/page.tsx components/ProductCard.tsx components/ProductGrid.tsx components/HomeProductBrowser.tsx && git commit -m "feat: build home page and product cards"
git add app/category components/CategoryBrowser.tsx && git commit -m "feat: add category browsing and price sorting"
git add lib/auth.ts lib/auth-client.ts app/api/auth components/AuthForm.tsx app/signin app/signup && git commit -m "feat: add Better Auth sign in and sign up"
git add app/product app/profile components/ProfileActions.tsx components/UpdateProfileForm.tsx app/not-found.tsx app/loading.tsx README.md .env.example && git commit -m "feat: add protected details and user profile"
```

## Assignment references
- Assignment: https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor
- API: https://openapi.programming-hero.com/api/bazardor
- Better Auth user update docs: https://better-auth.com/docs/concepts/users-accounts#update-user
