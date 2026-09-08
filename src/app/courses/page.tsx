"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import type { Course } from "@/lib/courses-db";
import { Search, Sparkles, Filter, BookOpen, MapPin } from "lucide-react";

function matchesElementary(grade: string): boolean {
  return grade.includes("4") || grade.includes("5");
}

function matchesMiddle(grade: string): boolean {
  return grade.includes("6") || grade.includes("7") || grade.includes("8");
}

function matchesHigh(grade: string): boolean {
  return (
    grade.includes("8-10") ||
    grade.includes("9") ||
    grade.includes("10") ||
    grade.includes("11") ||
    grade.includes("12") ||
    grade.includes("high")
  );
}

function matchesContest(course: Course): boolean {
  return (
    course.title.includes("AMC") ||
    course.subtitle.includes("AMC") ||
    course.description.includes("AMC")
  );
}

function matchesGradeFilter(course: Course, selectedGrade: string): boolean {
  if (selectedGrade === "All") return true;
  const g = course.grade.toLowerCase();
  if (selectedGrade === "Elementary") return matchesElementary(g);
  if (selectedGrade === "Middle") return matchesMiddle(g);
  if (selectedGrade === "High") return matchesHigh(g);
  if (selectedGrade === "Contest") return matchesContest(course);
  return true;
}

function matchesSearchQuery(course: Course, query: string): boolean {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;
  return (
    course.title.toLowerCase().includes(trimmed) ||
    course.subtitle.toLowerCase().includes(trimmed) ||
    course.description.toLowerCase().includes(trimmed)
  );
}

function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTerm, setActiveTerm] = useState("Spring");
  const [loading, setLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [coursesRes, settingsRes] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/settings"),
        ]);
        const coursesData = await coursesRes.json();
        const settingsData = await settingsRes.json();
        if (Array.isArray(coursesData)) {
          setCourses(coursesData);
        }
        if (settingsData?.activeTerm) {
          setActiveTerm(settingsData.activeTerm);
        }
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        matchesGradeFilter(course, selectedGrade) && matchesSearchQuery(course, searchQuery),
    );
  }, [courses, selectedGrade, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>{activeTerm} 2026 Curriculum & Cohorts</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          MathPillar Course Catalog
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Explore our small in-person cohorts for the {activeTerm} semester. All courses are held
          strictly in our physical classrooms—no online or remote sessions. Master foundational math
          fluency, geometry proofs, integrated algebra, and AMC contest preparation face-to-face
          with expert faculty.
        </p>
      </div>

      {/* In-Person Learning Notice Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-emerald-950 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="space-y-0.5 flex-1">
          <h3 className="text-sm font-black uppercase tracking-wide text-emerald-900 flex items-center gap-2">
            <span>100% In-Person Learning Only</span>
            <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-800 text-[11px] font-bold">
              No Online Classes
            </span>
          </h3>
          <p className="text-xs text-emerald-800 leading-relaxed">
            All MathPillar courses, labs, and contest preparation cohorts take place strictly in
            physical academy classrooms. We do not offer virtual, Zoom, or hybrid options so
            students gain the full benefit of boardwork and personal instructor mentorship.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by topic, grade, or contest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-slate-400"
            />
          </div>

          {/* Active Term Pill */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{activeTerm} Term</span>
            </span>
          </div>
        </div>

        {/* Grade Category Pills */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Grade Level:
          </span>
          {[
            { label: "All Grades", val: "All" },
            { label: "Elementary (4–5)", val: "Elementary" },
            { label: "Middle School (6–8)", val: "Middle" },
            { label: "High School (9–12)", val: "High" },
            { label: "AMC Contest Prep", val: "Contest" },
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => setSelectedGrade(item.val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedGrade === item.val
                  ? "bg-blue-600 text-white"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-600">Loading course offerings...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900">No matching courses found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search criteria or resetting filters to see all available cohorts.
          </p>
          <button
            onClick={() => {
              setSelectedGrade("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={<div className="py-20 text-center text-slate-500">Loading courses...</div>}
        >
          <CoursesContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
