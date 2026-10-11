import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import PriceTicker from "@/components/PriceTicker";
import AuthNav from "@/components/AuthNav";
export default async function Navbar() { const [categories,products]=await Promise.all([getCategories(),getProducts()]); const date=new Intl.DateTimeFormat("bn-BD",{day:"numeric",month:"long",year:"numeric"}).format(new Date()); return <header className="topbar"><div className="container topbar-inner"><Link className="brand" href="/"><span className="brand-icon">🛒</span><span>বাজার দর<small>{date}</small></span></Link><AuthNav /></div><nav className="category-nav container" aria-label="পণ্যের ক্যাটাগরি"><Link className="nav-link" href="/">সব পণ্য</Link>{categories.slice(0,7).map(c=><Link className="nav-link" href={`/category/${encodeURIComponent(c.slug)}`} key={c.slug}>{c.emoji} {c.name}</Link>)}</nav><PriceTicker products={products}/></header>; }
