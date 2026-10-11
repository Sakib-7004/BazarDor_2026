"use client";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
export default function ProfileActions(){async function logout(){const {error}=await authClient.signOut();if(error){toast.error(error.message||"সাইন আউট করা যায়নি");return;}toast.success("সাইন আউট সম্পন্ন");window.location.href="/";}return <button className="btn btn-outline" onClick={logout}>সাইন আউট</button>}
