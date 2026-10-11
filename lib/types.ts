export type MarketPrice = { market: string; minPrice: number; maxPrice: number; price: number };
export type Product = { id: string; slug: string; name: string; category: string; categoryName: string; unit: string; price: number; previousPrice: number; changePercent: number; emoji: string; description: string; image?: string; markets: MarketPrice[] };
export type Category = { id: string; slug: string; name: string; emoji: string };
