"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function UpdateProfileForm({currentName}:{currentName:string}){const [name,setName]=useState(currentName);const [loading,setLoading]=useState(false);const router=useRouter();async function submit(e:React.FormEvent){e.preventDefault();if(!name.trim()){toast.error("নাম লিখুন");return;}setLoading(true);try{const {error}=await authClient.updateUser({name:name.trim()});if(error)throw new Error(error.message);toast.success("প্রোফাইল আপডেট হয়েছে");router.push("/profile");router.refresh();}catch(error){toast.error(error instanceof Error?error.message:"আপডেট করা যায়নি");}finally{setLoading(false);}}return <form onSubmit={submit}><div className="form-field"><label htmlFor="profile-name">নাম</label><input id="profile-name" value={name} onChange={e=>setName(e.target.value)} required maxLength={80}/></div><button className="btn btn-primary" disabled={loading}>{loading?"আপডেট হচ্ছে…":"তথ্য আপডেট করুন"}</button></form>}
