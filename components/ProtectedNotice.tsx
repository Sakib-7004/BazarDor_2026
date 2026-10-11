"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ProtectedNotice(){const router=useRouter();useEffect(()=>{toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন");router.replace("/signin?callbackUrl=/");},[router]);return <div className="container page-loading"><div className="skeleton"/></div>;}
