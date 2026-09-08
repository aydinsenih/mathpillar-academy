import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CoursesCountdown from "@/components/CoursesCountdown";
import CourseCard from "@/components/CourseCard";
import SpotlightCourseBanner from "@/components/SpotlightCourseBanner";
import WhyUsSection from "@/components/WhyUsSection";
import InstructorsSection from "@/components/InstructorsSection";
import QuestionsBanner from "@/components/QuestionsBanner";
import { getCourses, getSettings } from "@/lib/courses-db";
import { ArrowRight, BookOpen } from "lucide-react";

export const revalidate = 0; // Fresh dynamic data on every request

export default async function HomePage() {
  const allCourses = await getCourses();
  const settings = await getSettings();
  const activeTerm = settings.activeTerm;
  const activeCourses = allCourses.filter(
    (c) => c.active && c.term.toLowerCase() === activeTerm.toLowerCase(),
  );
  const spotlightCourse = activeCourses.find((c) => c.featured) || activeCourses[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 3. Upcoming Term Countdown */}
        <CoursesCountdown
          tag={settings.countdownTag}
          title={settings.countdownTitle}
          subtitle={settings.countdownSubtitle}
          targetDate={settings.countdownTargetDate}
        />

        {/* 4. Featured Courses Grid */}
        <section className="py-16 px-4 sm:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-wider mb-2">
                  100% In-Person Cohorts
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Featured {activeTerm} Courses
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Small in-person group sessions with top competition instructors. All cohorts meet
                  strictly in person at our physical classrooms.
                </p>
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 group"
              >
                <span>
                  Browse All {activeCourses.length} {activeTerm} Courses
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeCourses.slice(0, 6).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            <div className="text-center pt-6">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/10 transition-all hover:scale-102"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore Full Course Catalog</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Spotlight Single Course Banner */}
        {spotlightCourse && <SpotlightCourseBanner course={spotlightCourse} />}

        {/* 6. Why Us / Methodology */}
        <WhyUsSection />

        {/* 7. Instructors Section */}
        <InstructorsSection />

        {/* 9. Contact / Questions Banner */}
        <QuestionsBanner />
      </main>

      <Footer />
    </div>
  );
}
