"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LogOut, UserRound } from "lucide-react";

type Session = NonNullable<
  Awaited<ReturnType<typeof authClient.getSession>>["data"]
>;

export default function AuthNav() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    authClient
      .getSession()
      .then(({ data }) => setSession(data))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  async function logout() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি");
      return;
    }

    setSession(null);
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    window.location.href = "/";
  }

  if (!ready) {
    return (
      <div className="auth-actions">
        <span style={{ color: "#68756c", fontSize: 12 }}>
          লোড হচ্ছে…
        </span>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="auth-actions">
        <Link className="btn btn-soft" href="/profile">
          <UserRound size={16} />
          <span className="hidden sm:inline">
            {session.user.name || "আমার প্রোফাইল"}
          </span>
          <span className="sm:hidden">প্রোফাইল</span>
        </Link>

        <button className="btn btn-outline" onClick={logout}>
          <LogOut size={15} /> বের হন
        </button>
      </div>
    );
  }

  return (
    <div className="auth-actions">
      <Link className="btn btn-outline" href="/signin">
        সাইন ইন
      </Link>
      <Link className="btn btn-primary" href="/signup">
        সাইন আপ
      </Link>
    </div>
  );
}