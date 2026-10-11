"use client";
import { useMemo,useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/lib/types";
export default function CategoryBrowser({products}:{products:Product[]}){const [sort,setSort]=useState("default");const list=useMemo(()=>{const copy=[...products];if(sort==="asc")copy.sort((a,b)=>a.price-b.price);if(sort==="desc")copy.sort((a,b)=>b.price-a.price);return copy;},[products,sort]);return <section className="section"><div className="filter-row"><span style={{color:"#68756c"}}>{products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে</span><select className="select-control" value={sort} onChange={e=>setSort(e.target.value)} aria-label="দাম অনুযায়ী সাজান"><option value="default">⌄ সাজান: ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select></div><ProductGrid products={list}/></section>}
