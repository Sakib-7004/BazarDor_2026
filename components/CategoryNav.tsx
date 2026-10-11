"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav className="category-nav container" aria-label="পণ্যের ক্যাটাগরি">
      <Link
        className={`nav-link${isActive("/") ? " active" : ""}`}
        href="/"
        aria-current={isActive("/") ? "page" : undefined}
      >
        সব পণ্য
      </Link>
      {categories.slice(0, 7).map((category) => {
        const href = `/category/${encodeURIComponent(category.slug)}`;
        const active = isActive(href);
        return (
          <Link
            className={`nav-link${active ? " active" : ""}`}
            href={href}
            key={category.slug}
            aria-current={active ? "page" : undefined}
          >
            {category.emoji} {category.name}
          </Link>
        );
      })}
    </nav>
  );
}
