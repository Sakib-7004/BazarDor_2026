import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
export default function ProductGrid({products}:{products:Product[]}){if(!products.length)return <div className="empty-state"><div className="big-emoji">🧺</div><h2>কোনো পণ্য পাওয়া যায়নি</h2><p>অন্য ক্যাটাগরি বা সার্চ দিয়ে চেষ্টা করুন।</p></div>;return <div className="product-grid">{products.map(p=><ProductCard product={p} key={p.id}/>)}</div>;}
