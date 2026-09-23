"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50 shadow-xs">
      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Slogan */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo.png"
            alt="MathPillar Academy"
            width={210}
            height={43}
            priority
            className="h-8 sm:h-9 md:h-10 w-auto group-hover:opacity-95 transition-opacity"
          />
          <div className="flex flex-col justify-center border-l border-slate-200 pl-2.5 sm:pl-3 py-0.5">
            <span className="text-[10px] sm:text-[11px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-600 text-white tracking-widest w-fit shadow-2xs">
              ACADEMY
            </span>
            <p className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-500 lowercase italic mt-0.5 whitespace-nowrap">
              where math takes shape
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            About
          </Link>
          <Link
            href="/courses"
            className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            All Courses
          </Link>
          <Link
            href="/#instructors"
            className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Our Instructors
          </Link>
          <Link
            href="/#location"
            className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Where We Are? / Location
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/courses"
            className="px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors"
          >
            View Courses
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-md shadow-rose-200 transition-all hover:scale-102"
          >
            <span>Apply to Course</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
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
        <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-blue-600"
          >
            About
          </Link>
          <Link
            href="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-blue-600"
          >
            All Courses
          </Link>
          <Link
            href="/#instructors"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-blue-600"
          >
            Our Instructors
          </Link>
          <Link
            href="/#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 hover:text-blue-600"
          >
            Where We Are? / Location
          </Link>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl font-bold text-white bg-rose-500 shadow-md shadow-rose-200"
            >
              Apply to Course
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
