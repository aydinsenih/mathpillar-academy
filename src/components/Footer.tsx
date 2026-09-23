import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-auto">
      {/* Decorative colored bar */}
      <div className="mathtopia-ribbon">
        <div className="stripe-red"></div>
        <div className="stripe-blue"></div>
        <div className="stripe-yellow"></div>
        <div className="stripe-green"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo-white.png"
                alt="Mathpillar"
                width={190}
                height={38}
                className="h-8 sm:h-9 w-auto group-hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="text-xs uppercase font-bold tracking-widest text-slate-500">
              The Math Learning Place
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering young mathematicians with deep conceptual understanding, creative problem
              solving, and competition excellence.
            </p>
          </div>
          <div className="space-y-4 md:col-span-1"></div>

          {/* Col 4: Payment & Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Format & Enrollment
            </h4>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs text-emerald-400">
              <MapPin className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <span className="font-bold text-white block">100% In-Person Only</span>
                <span className="text-slate-400">
                  No online or remote classes. All cohorts meet at our campus.
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We accept Zelle, Venmo (@MathPillar), Check / Cash, and direct bank wire transfers.
              Registrations are confirmed upon tuition payment.
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 MathPillar Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/register" className="hover:text-slate-300">
              Terms & Conditions
            </Link>
            <Link href="/register" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <span className="flex items-center gap-1 text-slate-600">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for young
              mathematicians
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
