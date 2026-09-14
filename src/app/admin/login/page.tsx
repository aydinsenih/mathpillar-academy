"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-indigo-600 to-amber-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-500/30">
            π
          </div>
        </Link>
        <h2 className="text-3xl font-black text-white tracking-tight">Admin Portal</h2>
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
          MathPillar Course Management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Login Form Box */}
        <div className="bg-slate-800/50 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-700/60 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="text-xs font-black uppercase tracking-wider text-slate-300"
              >
                Admin Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mathpillar.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="login-password"
                className="text-xs font-black uppercase tracking-wider text-slate-300"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Log In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
