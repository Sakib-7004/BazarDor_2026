import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/UpdateProfileForm";
export const dynamic="force-dynamic";
export default async function UpdateProfilePage(){const session=await auth.api.getSession({headers:await headers()});if(!session)redirect("/signin?callbackUrl=/profile/update");return <div className="container profile-layout"><div className="page-heading"><h1>প্রোফাইল আপডেট</h1><p>আপনার অ্যাকাউন্টে প্রদর্শিত নাম পরিবর্তন করুন।</p></div><section className="profile-card"><UpdateProfileForm currentName={session.user.name||""}/></section></div>}
