"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductGrid from "@/components/ProductGrid";

export default function HomeProductBrowser({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const visible = useMemo(() => {
    const list = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "asc") {
      return [...list].sort((a, b) => a.price - b.price);
    }

    if (sort === "desc") {
      return [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, search, sort]);

  return (
    <>
      <div className="filter-row">
        <label className="search-box">
          <Search size={18} color="#68756c" />
          <input
            aria-label="পণ্য খুঁজুন"
            placeholder="পণ্যের নাম দিয়ে খুঁজুন…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <select
          className="select-control"
          aria-label="পণ্য সাজান"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="default">সাজান: ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <ProductGrid products={visible} />
    </>
  );
}