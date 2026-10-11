export type MarketPrice = { market: string; minPrice: number; maxPrice: number; price: number };
export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  unit: string;
  /** Display weight or package size, e.g. 1 kg or 500 g. */
  weight?: string;
  /** Illustrative discount percentage for demo products or API-provided promotions. */
  discountPercent?: number;
  price: number;
  previousPrice: number;
  changePercent: number;
  emoji: string;
  description: string;
  image?: string;
  markets: MarketPrice[];
  /** False when the API does not provide a previous price or percentage change. */
  changePercentAvailable?: boolean;
  /** False when the API does not provide a market-by-market breakdown. */
  marketDataAvailable?: boolean;
  /** True when this product came from local sample data after API failure. */
  isSampleData?: boolean;
};
export type Category = { id: string; slug: string; name: string; emoji: string };
