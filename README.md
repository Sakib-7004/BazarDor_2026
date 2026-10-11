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

### 5. Create a production build

```bash
npm run build
npm start
```

## API endpoints
The app tries these base URLs in order:

- `https://openapi.programming-hero.com/api/bazardor`
- `https://api.api-store.workers.dev/api/bazardor`
- `https://api.abcz.workers.dev/api/bazardor`

It uses `/products`, `/products?category=SLUG`, `/products/ID`, and `/categories`. API data formats sometimes differ; the normalizer accepts common field names. If all APIs are temporarily unavailable, sample data is shown so the layout remains usable. Sample prices are illustrative, not official market quotations.

## Authentication and deployment notes
- Product detail, profile and profile update routes check the Better Auth session on the server.
- SQLite is convenient for local learning. Many serverless hosting platforms (including typical Vercel deployments) do not provide persistent local disk storage. For production, configure Better Auth with a persistent supported database and update the database adapter before deployment.
- Set `BETTER_AUTH_URL` and `BETTER_AUTH_SECRET` to production values. Configure social OAuth credentials and provider callback URLs. A social button cannot complete authentication until valid credentials are provided.
- The app uses Next.js App Router dynamic routes; product and category pages resolve from the API at request/build time. Unknown routes show a friendly 404.

## Suggested 8 meaningful Git commits
Make commits as you complete each step in your own repository:

```bash
git add package.json tsconfig.json next.config.ts postcss.config.mjs && git commit -m "chore: set up Next.js project"
git add app/globals.css app/layout.tsx && git commit -m "style: add responsive BazarDor layout"
git add lib/types.ts lib/api.ts && git commit -m "feat: fetch and normalize BazarDor API data"
git add components/Navbar.tsx components/PriceTicker.tsx components/Footer.tsx && git commit -m "feat: build navigation and price ticker"
git add app/page.tsx components/ProductCard.tsx components/ProductGrid.tsx components/HomeProductBrowser.tsx && git commit -m "feat: build home page and product cards"
git add app/category components/CategoryBrowser.tsx && git commit -m "feat: add category browsing and price sorting"
git add lib/auth.ts lib/auth-client.ts app/api/auth components/AuthForm.tsx app/signin app/signup && git commit -m "feat: add Better Auth sign in and sign up"
git add app/product app/profile components/ProfileActions.tsx components/UpdateProfileForm.tsx app/not-found.tsx app/loading.tsx README.md .env.example && git commit -m "feat: add protected details and user profile"
```

## Assignment references
- Assignment: https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor
- API: https://openapi.programming-hero.com/api/bazardor
- Better Auth user update docs: https://better-auth.com/docs/concepts/users-accounts#update-user
