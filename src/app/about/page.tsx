import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import QuestionsBanner from "@/components/QuestionsBanner";

export const metadata: Metadata = {
  title: "About Us | MathPillar Academy · Where Math Takes Shape",
  description:
    "Learn about MathPillar Academy, our proof-based mathematics philosophy, expert competition faculty, and 100% in-person chalkboard learning environment.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <AboutSection />
        <WhyUsSection />
        <QuestionsBanner />
      </main>
      <Footer />
    </div>
  );
}
