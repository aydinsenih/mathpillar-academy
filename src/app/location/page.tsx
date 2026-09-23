import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationSection from "@/components/LocationSection";
import QuestionsBanner from "@/components/QuestionsBanner";

export const metadata: Metadata = {
  title: "Where We Are? / Campus Location | MathPillar Academy",
  description:
    "Explore our physical classrooms and campus facilities. MathPillar Academy operates 100% in-person with small chalkboard cohorts.",
};

export default function LocationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <LocationSection />
        <QuestionsBanner />
      </main>
      <Footer />
    </div>
  );
}
