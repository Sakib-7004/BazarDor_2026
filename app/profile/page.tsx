import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import ProfileActions from "@/components/ProfileActions";
export const dynamic="force-dynamic";
export default async function ProfilePage(){const session=await auth.api.getSession({headers:await headers()});if(!session)redirect("/signin?callbackUrl=/profile");const user=session.user;return <div className="container profile-layout"><div className="profile-head"><div className="avatar">{(user.name||user.email||"U").slice(0,1).toUpperCase()}</div><div className="profile-meta"><h1>আমার প্রোফাইল</h1><p>আপনার অ্যাকাউন্টের তথ্য দেখুন ও আপডেট করুন।</p></div></div><section className="profile-card"><div className="profile-row"><span>নাম</span><strong>{user.name||"নাম দেওয়া হয়নি"}</strong></div><div className="profile-row"><span>ইমেইল</span><strong>{user.email}</strong></div><div className="profile-row"><span>ইমেইল যাচাইকৃত</span><strong>{user.emailVerified?"হ্যাঁ":"না"}</strong></div><div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:22}}><Link className="btn btn-primary" href="/profile/update">তথ্য আপডেট করুন</Link><ProfileActions/></div></section></div>}
