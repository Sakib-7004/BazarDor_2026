"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Github, Mail } from "lucide-react";

type ProviderStatus = { google: boolean; github: boolean };

export default function AuthForm({
  mode,
  callbackUrl = "/",
}: {
  mode: "signin" | "signup";
  callbackUrl?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isSignup = mode === "signup";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (isSignup && !name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setLoading(true);
    try {
      if (isSignup) {
        const { error } = await authClient.signUp.email({
          name: name.trim(),
          email: normalizedEmail,
          password,
          callbackURL: callbackUrl,
        });
        if (error) throw new Error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
        router.push("/signin");
        router.refresh();
        return;
      }

      const { error } = await authClient.signIn.email({
        email: normalizedEmail,
        password,
        callbackURL: callbackUrl,
      });
      if (error) throw new Error(error.message || "সাইন ইন করা যায়নি");

      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.replace(callbackUrl);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "অনুরোধ সম্পন্ন হয়নি");
    } finally {
      setLoading(false);
    }
  }

  async function social(provider: "google" | "github") {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch("/api/auth/providers", { cache: "no-store" });
      if (!response.ok) throw new Error("সোশ্যাল লগইন সেটিংস যাচাই করা যায়নি");
      const providers = (await response.json()) as ProviderStatus;
      if (!providers[provider]) {
        const label = provider === "google" ? "Google" : "GitHub";
        throw new Error(
          `${label} লগইন চালু করতে সার্ভারে ${provider.toUpperCase()}_CLIENT_ID এবং ${provider.toUpperCase()}_CLIENT_SECRET সেট করুন।`,
        );
      }

      const safeCallback =
        callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
          ? callbackUrl
          : "/";
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: safeCallback,
        errorCallbackURL: "/signin?error=oauth",
        newUserCallbackURL: "/",
      });
      if (error) throw new Error(error.message || "সোশ্যাল লগইন শুরু করা যায়নি");
      // Better Auth redirects the browser to the provider after a successful request.
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "সোশ্যাল লগইন শুরু করা যায়নি");
      setLoading(false);
    }
  }

  return (
    <div className="container auth-layout">
      <aside className="auth-art">
        <div>
          <span className="eyebrow">🛒 BazarDor</span>
          <h2>প্রতিদিনের বাজার,<br />আরও সহজ হোক।</h2>
          <p>আপনার অ্যাকাউন্টে প্রবেশ করে পণ্যের বিস্তারিত ও বাজারভিত্তিক দামের তুলনা দেখুন।</p>
        </div>
        <div className="auth-art-emoji">🥬 🧅 🍚</div>
        <p>সহজ তথ্য। সচেতন সিদ্ধান্ত।</p>
      </aside>

      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit}>
          <h1>{isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "আবার স্বাগতম"}</h1>
          <p>{isSignup ? "বাজারদর দেখতে আপনার তথ্য দিয়ে নিবন্ধন করুন।" : "আপনার অ্যাকাউন্টে সাইন ইন করুন।"}</p>

          {isSignup && (
            <div className="form-field">
              <label htmlFor="name">আপনার নাম</label>
              <input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="যেমন: সাকিব আহমেদ" autoComplete="name" required />
            </div>
          )}

          <div className="form-field">
            <label htmlFor="email">ইমেইল ঠিকানা</label>
            <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
          </div>

          <div className="form-field">
            <label htmlFor="password">পাসওয়ার্ড</label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="কমপক্ষে ৮ অক্ষর" autoComplete={isSignup ? "new-password" : "current-password"} minLength={8} required />
          </div>

          <button className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? "অপেক্ষা করুন…" : isSignup ? "সাইন আপ করুন" : "সাইন ইন করুন"}
          </button>

          <div className="or-divider">অথবা সোশ্যাল অ্যাকাউন্ট দিয়ে</div>
          <div className="social-row">
            <button type="button" className="social-btn" onClick={() => social("google")} disabled={loading}>
              <Mail size={17} /> Google
            </button>
            <button type="button" className="social-btn" onClick={() => social("github")} disabled={loading}>
              <Github size={17} /> GitHub
            </button>
          </div>

          <div className="notice">
            Google/GitHub OAuth চালাতে সার্ভারের environment variables এবং provider console-এ সঠিক callback URL সেট করা আবশ্যক।
          </div>

          <div className="form-foot">
            {isSignup ? (
              <>আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin">সাইন ইন করুন</Link></>
            ) : (
              <>নতুন ব্যবহারকারী? <Link href="/signup">অ্যাকাউন্ট তৈরি করুন</Link></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
