import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import PriceTicker from "@/components/PriceTicker";
import AuthNav from "@/components/AuthNav";
import CategoryNav from "@/components/CategoryNav";

export default async function Navbar() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const date = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link className="brand" href="/">
          <span className="brand-icon">🛒</span>
          <span>বাজার দর<small>{date}</small></span>
        </Link>
        <AuthNav />
      </div>
      <CategoryNav categories={categories} />
      <PriceTicker products={products} />
    </header>
  );
}
