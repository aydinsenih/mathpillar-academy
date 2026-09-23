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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logo-white.png"
                alt="MathPillar Academy"
                width={190}
                height={38}
                className="h-8 sm:h-9 w-auto group-hover:opacity-90 transition-opacity"
              />
              <div className="flex flex-col justify-center border-l border-slate-700 pl-2.5 py-0.5">
                <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-600 text-white tracking-widest w-fit">
                  ACADEMY
                </span>
                <p className="text-[9px] font-bold tracking-wider text-slate-400 lowercase italic mt-0.5 whitespace-nowrap">
                  where math takes shape
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Empowering young mathematicians with deep conceptual understanding, creative problem
              solving, and competition excellence through rigorous 100% in-person academy
              instruction.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/#instructors" className="hover:text-white transition-colors">
                  Our Instructors
                </Link>
              </li>
              <li>
                <Link href="/#location" className="hover:text-white transition-colors">
                  Where We Are? / Location
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-rose-400 transition-colors font-bold">
                  Apply to Course
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Format & Campus Policy */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">
              Campus Learning
            </h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs text-emerald-400">
              <MapPin className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <span className="font-bold text-white block">100% In-Person Only</span>
                <span className="text-slate-400 text-[11px]">
                  No online or remote classes. All cohorts meet at our physical classrooms.
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We accept Zelle, Venmo (@MathPillar), Check / Cash, and direct bank wire transfers.
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 MathPillar Academy. All rights reserved. Slogan: Where math takes shape.</p>
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
