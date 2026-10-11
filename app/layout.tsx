import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata: Metadata = { title: "বাজার দর | BazarDor", description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে দেখুন।" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="bn"><body><Navbar /><main>{children}</main><Footer /><Toaster position="top-right" toastOptions={{ duration: 3500 }} /></body></html>; }
