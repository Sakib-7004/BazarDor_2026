import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getProduct, formatTaka } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProduct(decodeURIComponent(slug));
  if (!product) notFound();

  const prices = product.markets.map((market) => market.price);
  const min = prices.length ? Math.min(...prices) : product.price;
  const max = prices.length ? Math.max(...prices) : product.price;
  const average = prices.length
    ? prices.reduce((sum, price) => sum + price, 0) / prices.length
    : product.price;
  const fallbackMarket =
    product.markets.length === 1 &&
    product.markets[0].market === "স্থানীয় বাজার";

  return (
    <div className="container">
      <section className="page-heading">
        <div className="breadcrumbs">
          <Link href="/">হোম</Link> /{" "}
          <Link href={`/category/${product.category}`}>{product.categoryName}</Link> /{" "}
          {product.name}
        </div>
      </section>

      <div className="detail-layout">
        <section className="detail-main">
          <div className="detail-emoji">{product.emoji}</div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="tag-row">
            <span className="tag">{product.categoryName}</span>
            <span className="tag">{product.unit}</span>
          </div>
          <div className="price-row">
            <div>
              <span className="price-label">আজকের সম্ভাব্য দাম</span>
              <div className="price-value">
                {formatTaka(product.price)} <span className="price-currency">টাকা</span>
              </div>
            </div>
            <span
              className={`change-badge ${
                product.changePercent > 0
                  ? "change-up"
                  : product.changePercent < 0
                    ? "change-down"
                    : "change-flat"
              }`}
              title="API-তে আগের দামের তথ্য না থাকলে ০% প্রকৃত পরিবর্তন নিশ্চিত করে না"
            >
              {product.changePercent > 0
                ? "▲"
                : product.changePercent < 0
                  ? "▼"
                  : "—"}{" "}
              {Math.abs(product.changePercent).toLocaleString("bn-BD", {
                maximumFractionDigits: 1,
              })}
              %
            </span>
          </div>
          <div className="notice">
            দামের পরিবর্তন API-তে না থাকলে ০% মানে প্রকৃতপক্ষে দাম অপরিবর্তিত ছিল—এটি নিশ্চিত নয়।
            API-তে আগের দিনের দামের তথ্য আছে কি না যাচাই করুন।
          </div>
        </section>

        <section className="detail-summary">
          <h2 style={{ marginTop: 0 }}>দামের সারাংশ</h2>
          <p style={{ color: "#68756c", lineHeight: 1.7 }}>
            বিভিন্ন বাজারে পাওয়া দামের সংক্ষিপ্ত তুলনা।
          </p>
          <div className="summary-grid">
            <div className="summary-stat">
              <span>সর্বনিম্ন</span>
              <strong>{formatTaka(min)} ৳</strong>
            </div>
            <div className="summary-stat">
              <span>সর্বোচ্চ</span>
              <strong>{formatTaka(max)} ৳</strong>
            </div>
            <div className="summary-stat">
              <span>গড় দাম</span>
              <strong>{formatTaka(average)} ৳</strong>
            </div>
          </div>
          <div className="notice">
            {fallbackMarket
              ? "API-তে বাজারভিত্তিক দাম পাওয়া যায়নি। এখানে দেখানো স্থানীয় বাজারের সারিটি পণ্যের সাধারণ দামের fallback, যাচাই করা বাজারভিত্তিক quotation নয়।"
              : "এই দামগুলো নির্দেশক। কেনার আগে স্থানীয় বাজারে যাচাই করুন। API-তে বাজারভিত্তিক তথ্য না থাকলে এটি fallback তথ্য হতে পারে।"}
          </div>
        </section>

        <section className="market-table-wrap">
          <h2>বাজারভিত্তিক আজকের দাম</h2>
          <table className="market-table">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>সর্বনিম্ন</th>
                <th>আজকের দাম</th>
                <th>সর্বোচ্চ</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((market, index) => (
                <tr key={`${market.market}-${index}`}>
                  <td>{market.market}</td>
                  <td>{formatTaka(market.minPrice)} ৳</td>
                  <td>
                    <strong>{formatTaka(market.price)} ৳</strong>
                  </td>
                  <td>{formatTaka(market.maxPrice)} ৳</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
