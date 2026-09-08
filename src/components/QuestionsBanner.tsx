import React from "react";
import Link from "next/link";
import { HelpCircle, Mail } from "lucide-react";

export default function QuestionsBanner() {
  return (
    <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>Need Guidance on Course Placement?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Do you still have questions?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Our academic advisors can assess your student&apos;s current mathematical background and
            recommend the optimal placement.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href="mailto:info@mathpillar.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-md transition-all hover:scale-102"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </a>
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
          >
            <span>Register Directly</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
