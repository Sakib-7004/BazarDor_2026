import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatTaka } from "@/lib/api";

export default function ProductCard({ product }: { product: Product }) {
  const change = product.changePercent;
  const changeAvailable = product.changePercentAvailable !== false;

  return (
    <Link
      href={`/product/${encodeURIComponent(product.slug || product.id)}`}
      className="product-card"
    >
      <div className="product-top">
        <div className="product-emoji">{product.emoji}</div>
        <span
          className={`change-badge ${
            !changeAvailable || change === 0
              ? "change-flat"
              : change > 0
                ? "change-up"
                : "change-down"
          }`}
          title="দামের পরিবর্তন API-তে না থাকলে ০% নিশ্চিত পরিবর্তন বোঝায় না"
        >
          {!changeAvailable
            ? "তথ্য নেই"
            : change > 0
              ? `▲ ${Math.abs(change).toLocaleString("bn-BD", { maximumFractionDigits: 1 })}%`
              : change < 0
                ? `▼ ${Math.abs(change).toLocaleString("bn-BD", { maximumFractionDigits: 1 })}%`
                : "০%*"}
        </span>
      </div>
      <h3>{product.name}</h3>
      <div className="product-unit">{product.unit}</div>
      <div className="price-row">
        <div>
          <span className="price-label">আজকের দাম</span>
          <div className="price-value">
            {formatTaka(product.price)} <span className="price-currency">টাকা</span>
          </div>
        </div>
        <span style={{ fontSize: 18, color: "#8a988b" }}>↗</span>
      </div>
    </Link>
  );
}
