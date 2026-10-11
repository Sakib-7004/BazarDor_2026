import Link from "next/link";
export default function NotFound(){return <div className="container page-heading"><div className="error-state"><div className="big-emoji">🔎</div><h1>পেজটি খুঁজে পাওয়া যায়নি</h1><p>লিংকটি ভুল হতে পারে অথবা পেজটি আর নেই।</p><Link className="btn btn-primary" href="/">হোম পেজে ফিরে যান</Link></div></div>}
