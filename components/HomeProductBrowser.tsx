"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductGrid from "@/components/ProductGrid";
export default function HomeProductBrowser({products}:{products:Product[]}){const [search,setSearch]=useState("");const [sort,setSort]=useState("default");const visible=useMemo(()=>{let list=products.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.categoryName.toLowerCase().includes(search.toLowerCase()));if(sort==="asc")list.sort((a,b)=>a.price-b.price);if(sort==="desc")list.sort((a,b)=>b.price-a.price);return list;},[products,search,sort]);return <><div className="filter-row"><label className="search-box"><Search size={18} color="#68756c"/><input aria-label="পণ্য খুঁজুন" placeholder="পণ্যের নাম দিয়ে খুঁজুন…" value={search} onChange={e=>setSearch(e.target.value)}/></label><select className="select-control" aria-label="পণ্য সাজান" value={sort} onChange={e=>setSort(e.target.value)}><option value="default">সাজান: ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select></div><ProductGrid products={visible}/></>;}
