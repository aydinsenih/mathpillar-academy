import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { getCourseById, getCourses, type Course, type CurriculumItem } from "@/lib/courses-db";
import {
  Calendar,
  Clock,
  ArrowRight,
  MapPin,
  Sparkles,
  BookOpen,
  Award,
  ShieldCheck,
  Users,
  Layers,
  ChevronRight,
  GraduationCap,
  FileText,
} from "lucide-react";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params;
  const course = await getCourseById(id);

  if (!course) {
    return {
      title: "Course Not Found | MathPillar Academy",
      description: "The requested mathematics course could not be located.",
    };
  }

  return {
    title: `${course.title} - ${course.subtitle} | MathPillar Academy`,
    description: course.description,
    keywords: [
      course.title,
      course.grade,
      "competition math",
      "in-person math classes",
      "MathPillar Academy",
      course.term,
    ],
  };
}

function CourseNotFound({ id }: { id: string }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Course Not Found</h1>
        <p className="text-base text-slate-600 max-w-md mx-auto">
          We couldn&apos;t find a course matching ID &quot;{id}&quot;. It may have been relocated or
          concluded.
        </p>
        <div className="pt-2">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Course Catalog</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CourseHero({ course }: { course: Course }) {
  const termBadgeColor =
    course.term.toLowerCase() === "spring"
      ? "bg-rose-500 text-white"
      : course.term.toLowerCase() === "fall"
        ? "bg-amber-500 text-white"
        : "bg-emerald-500 text-white";

  return (
    <section className="relative bg-slate-950 text-white py-12 lg:py-16 overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-950 to-indigo-950/70 pointer-events-none" />
      {course.image && (
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <Image
            src={course.image}
            alt={course.title}
            fill
            priority
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 flex-wrap"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/courses" className="hover:text-white transition-colors">
            Courses
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 truncate max-w-xs sm:max-w-md">{course.title}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${termBadgeColor} shadow-xs`}
          >
            {course.term} {course.startDate.includes("2026") ? "2026" : ""}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white backdrop-blur-xs border border-white/15">
            {course.grade}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>100% In-Person Academy Cohort</span>
          </span>
        </div>

        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {course.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
            {course.subtitle}
          </p>
        </div>

        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl text-xs sm:text-sm">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>Start Date</span>
            </div>
            <div className="text-white font-black">{course.startDate}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[11px]">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Schedule</span>
            </div>
            <div className="text-white font-bold truncate">{course.schedule}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[11px]">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Instruction</span>
            </div>
            <div className="text-white font-black">{course.hours} Hours Total</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Format</span>
            </div>
            <div className="text-emerald-300 font-bold">Physical Classroom</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseOverview({ course }: { course: Course }) {
  const paragraphs = (course.detailedDescription || course.description).split("\n\n");

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
      <div className="flex items-center gap-2.5 text-blue-600 font-black text-xs uppercase tracking-wider">
        <BookOpen className="w-4 h-4" />
        <span>Comprehensive Course Overview</span>
      </div>

      <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-slate-700 font-normal">
            {para}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-black uppercase text-blue-900 tracking-wide">
            Proof-Based Mastery
          </h3>
          <p className="text-xs text-blue-800 leading-relaxed">
            Move beyond rote memorization to rigorous logical justification and deep understanding.
          </p>
        </div>

        <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-4 space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-black uppercase text-amber-900 tracking-wide">
            Small Cohort Focus
          </h3>
          <p className="text-xs text-amber-800 leading-relaxed">
            Limited class sizes ensure boardwork time and personal feedback for every student.
          </p>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-black uppercase text-emerald-900 tracking-wide">
            Contest & School Edge
          </h3>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Equips students with problem-solving shortcuts and tactics for AMC, MathCounts and
            Honors exams.
          </p>
        </div>
      </div>
    </div>
  );
}

function CourseCurriculumTable({ curriculum }: { curriculum: CurriculumItem[] }) {
  return (
    <div
      id="curriculum"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Syllabus & Schedule</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Course Curriculum Breakdown
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{curriculum.length} Sequential Modules / Weeks</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        The curriculum below outlines the progression of core mathematical concepts, classroom
        whiteboard deductions, and problem-solving labs conducted in our academy.
      </p>

      {curriculum.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
          Curriculum schedule is currently being finalized for this cohort. Please contact the
          academy for syllabus inquiries.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
          <table
            id="course-curriculum-table"
            className="w-full text-left border-collapse min-w-[620px]"
          >
            <thead>
              <tr className="bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider">
                <th scope="col" className="py-3.5 px-4 w-28 rounded-tl-2xl">
                  Session
                </th>
                <th scope="col" className="py-3.5 px-4 w-60">
                  Topic & Focus
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Core Concepts & Learning Objectives
                </th>
                <th scope="col" className="py-3.5 px-4 w-24 text-right rounded-tr-2xl">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {curriculum.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-4 px-4 align-top">
                    <span className="inline-block px-2.5 py-1 rounded-lg font-black text-[11px] bg-slate-100 text-slate-800 border border-slate-200 whitespace-nowrap">
                      {item.unit || `Week ${index + 1}`}
                    </span>
                  </td>
                  <td className="py-4 px-4 align-top">
                    <div className="font-bold text-slate-900 text-sm leading-snug">
                      {item.topic}
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top text-slate-600 leading-relaxed">
                    {item.objectives}
                  </td>
                  <td className="py-4 px-4 align-top text-right whitespace-nowrap font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {item.hours || "2.5 hrs"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CourseClassroomBanner() {
  return (
    <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-black tracking-tight">
            MathPillar In-Person Classroom Standard
          </h3>
          <p className="text-xs text-emerald-200">
            Why our students excel through physical academy instruction
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-emerald-100">
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Physical Boardwork:</strong> Students actively solve proofs on class
            whiteboards, receiving real-time syntax and logical critique.
          </span>
        </div>
        <div className="flex items-start gap-2.5">
          <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Distraction-Free Environment:</strong> No split screens or virtual fatigue;
            focused peer synergy in small groups.
          </span>
        </div>
        <div className="flex items-start gap-2.5">
          <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>All Materials Provided:</strong> Comprehensive course folders, practice tests,
            and contest booklets included with tuition.
          </span>
        </div>
        <div className="flex items-start gap-2.5">
          <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Direct Instructor Mentorship:</strong> Taught by experienced competition coaches
            with USAMO/AIME mentoring pedigrees.
          </span>
        </div>
      </div>
    </div>
  );
}

function CourseEnrollmentSidebar({ course }: { course: Course }) {
  return (
    <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-600/30 shadow-xl space-y-6">
      <div className="pb-5 border-b border-slate-100 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Tuition Fee
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
            Registration Open
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-slate-600">$</span>
          <span className="text-4xl sm:text-5xl font-black text-slate-900">{course.price}</span>
          <span className="text-xs font-semibold text-slate-400">/ full semester</span>
        </div>
        <p className="text-xs text-slate-500">
          Includes all {course.hours} hours of instruction, class notes, and materials.
        </p>
      </div>

      <div className="space-y-3 text-xs text-slate-600">
        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Term</span>
          <span className="font-bold text-slate-900">{course.term} 2026</span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Target Grade</span>
          <span className="font-bold text-slate-900">{course.grade}</span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Total Hours</span>
          <span className="font-bold text-slate-900">{course.hours} Hours</span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Class Schedule</span>
          <span className="font-bold text-slate-900 text-right">{course.schedule}</span>
        </div>
        <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Starts</span>
          <span className="font-bold text-slate-900">{course.startDate}</span>
        </div>
        <div className="flex items-center justify-between py-1.5">
          <span className="font-semibold text-slate-500">Campus Format</span>
          <span className="font-bold text-emerald-700 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            100% In-Person
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Link
          href={`/register?course=${course.id}`}
          id="enroll-cta-button"
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all hover:scale-102 cursor-pointer"
        >
          <span>Enroll In This Course</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <a
          href="#curriculum"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-bold text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>View Curriculum Schedule</span>
        </a>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-500 leading-normal">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <span>
          Seats are reserved on a first-come, first-served basis. Full prorated refund available
          prior to the second scheduled class session.
        </span>
      </div>
    </div>
  );
}

export default async function CourseDetailPage(props: PageProps) {
  const { id } = await props.params;
  const [course, allCourses] = await Promise.all([getCourseById(id), getCourses()]);

  if (!course) {
    return <CourseNotFound id={id} />;
  }

  const relatedCourses = allCourses
    .filter(
      (c) => c.id !== course.id && c.active && c.term.toLowerCase() === course.term.toLowerCase(),
    )
    .slice(0, 3);

  const curriculum = course.curriculum && course.curriculum.length > 0 ? course.curriculum : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        <CourseHero course={course} />

        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
              <CourseOverview course={course} />
              <CourseCurriculumTable curriculum={curriculum} />
              <CourseClassroomBanner />
            </div>

            <div className="lg:col-span-4 space-y-6">
              <CourseEnrollmentSidebar course={course} />
            </div>
          </div>

          {relatedCourses.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Other {course.term} Offerings
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Explore additional cohorts matching your student&apos;s level
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  <span>View Full Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedCourses.map((rel) => (
                  <CourseCard key={rel.id} course={rel} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
