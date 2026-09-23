"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTerm, setActiveTerm] = useState("Spring");

  useEffect(() => {
    async function loadTerm() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data?.activeTerm) {
          setActiveTerm(data.activeTerm);
        }
      } catch {
        // fallback to default
      }
    }
    loadTerm();
  }, []);

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50 shadow-xs">
      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo.png"
            alt="Mathpillar"
            width={210}
            height={43}
            priority
            className="h-9 sm:h-10 w-auto group-hover:opacity-90 transition-opacity"
          />
          <div className="hidden sm:flex flex-col justify-center border-l border-slate-200 pl-3 py-0.5">
            <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 tracking-wider w-fit">
              ACADEMY
            </span>
            <p className="text-[9px] font-bold tracking-[0.16em] text-slate-400 uppercase mt-0.5 whitespace-nowrap">
              The Math Learning Place
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Courses
          </Link>
          <Link
            href="/courses"
            className="px-3.5 py-2 text-sm font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>{activeTerm} Term</span>
          </Link>
          <a
            href="#why-us"
            className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Why Us
          </a>
          <a
            href="#instructors"
            className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Instructors
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/courses"
            className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors"
          >
            View Courses
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-md shadow-rose-200 transition-all hover:scale-102"
          >
            <span>Register Now</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mathtopia Signature 4-Color Accent Stripe */}
      <div className="mathtopia-ribbon">
        <div className="stripe-red"></div>
        <div className="stripe-blue"></div>
        <div className="stripe-yellow"></div>
        <div className="stripe-green"></div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800"
          >
            Home
          </Link>
          <Link
            href="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800"
          >
            All Courses
          </Link>
          <Link
            href="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-bold text-rose-600 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>{activeTerm} Courses (Enrolling)</span>
          </Link>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800"
          >
            Why Us
          </a>
          <a
            href="#instructors"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800"
          >
            Instructors
          </a>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl font-bold text-white bg-rose-500 shadow-md shadow-rose-200"
            >
              Register Now
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
