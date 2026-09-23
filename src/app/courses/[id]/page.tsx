import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { getCourseById, getCourses, type Course, type CurriculumItem } from "@/lib/courses-db";
import { CourseDetailAudioTrigger } from "@/components/CourseDetailAudioTrigger";
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
  CheckCircle2,
  HelpCircle,
  Compass,
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
    description: `Complete course curriculum and parent guide for ${course.title}. 100% in-person physical classroom cohort at MathPillar Academy.`,
    keywords: [
      course.title,
      course.grade,
      "competition math",
      "in-person math classes",
      "MathPillar Academy",
      "where math takes shape",
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
          We couldn&apos;t find a course matching ID &quot;{id}&quot;. It may have been updated or
          concluded.
        </p>
        <div className="pt-2">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to All Courses</span>
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
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-slate-950 to-indigo-950/75 pointer-events-none" />
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
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 flex-wrap"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/courses" className="hover:text-white transition-colors">
            All Courses
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 truncate max-w-xs sm:max-w-md">{course.title}</span>
        </nav>

        {/* Badges */}
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
            <span>100% In-Person Physical Academy Cohort</span>
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            6–10 Students Max
          </span>
        </div>

        {/* Course Titles */}
        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {course.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
            {course.subtitle}
          </p>
        </div>

        {/* Key Metrics Banner */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl text-xs sm:text-sm">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>Start Date</span>
            </div>
            <div className="text-white font-black">{course.startDate}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[11px]">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Schedule</span>
            </div>
            <div className="text-white font-bold truncate">{course.schedule}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[11px]">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Instruction</span>
            </div>
            <div className="text-white font-black">{course.hours} Hours Total</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Format</span>
            </div>
            <div className="text-emerald-300 font-bold">In-Person Classrooms</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoursePedagogyOverview({ course }: { course: Course }) {
  const paragraphs = (course.detailedDescription || course.description).split("\n\n");

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
      <div className="flex items-center gap-2.5 text-blue-700 font-black text-xs uppercase tracking-wider">
        <Compass className="w-4 h-4 text-blue-600" />
        <span>Course Vision & Pedagogical Depth</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
        Why This Course Matters For Your Student
      </h2>

      <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-slate-700 font-normal leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {/* Core Educational Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-black uppercase text-blue-900 tracking-wide">
            Conceptual Proofs
          </h3>
          <p className="text-xs text-blue-800 leading-relaxed">
            Move past mechanical formulas into logical deduction, understanding how mathematical
            truths are constructed.
          </p>
        </div>

        <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-4 space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-black uppercase text-amber-900 tracking-wide">
            Chalkboard Problem Labs
          </h3>
          <p className="text-xs text-amber-800 leading-relaxed">
            Students solve questions on the board, articulating their ideas and receiving real-time
            critique from faculty.
          </p>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 space-y-1.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-black uppercase text-emerald-900 tracking-wide">
            Contest & School Synergy
          </h3>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Builds an unshakable academic advantage for school honors classes, AMC 8/10, and
            Olympiad competitions.
          </p>
        </div>
      </div>
    </div>
  );
}

function CourseStudentGains() {
  const competencies = [
    {
      title: "Deep Conceptual Fluency",
      desc: "Knowing not just what rule to apply, but the algebraic or geometric proof behind it.",
    },
    {
      title: "Olympiad & Non-Routine Heuristics",
      desc: "Structured frameworks for breaking down unexpected, multi-step math competition problems.",
    },
    {
      title: "Chalkboard Articulation",
      desc: "Gaining the confidence to explain proofs out loud in front of teachers and peers.",
    },
    {
      title: "Rigorous Precision & Syntax",
      desc: "Writing clean mathematical arguments that avoid common algebraic and arithmetic traps.",
    },
    {
      title: "Intellectual Curiosity & Stamina",
      desc: "Learning to enjoy complex challenges without getting frustrated or seeking easy answers.",
    },
    {
      title: "School Honors Grade Boost",
      desc: "Effortlessly outperforming standard curriculum benchmarks through superior mathematical depth.",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Core Student Gains & Outcomes</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          What Your Child Will Master in This Cohort
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Our parent-tested methodology ensures measurable growth in both cognitive ability and
          mathematical confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {competencies.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 hover:bg-slate-100/70 transition-colors"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
            </div>
            <p className="text-xs text-slate-600 pl-6 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseStudentProfile({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-black uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
          <span>Candidate Suitability</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Who Is This Course Designed For?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
        <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
          <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            Recommended Student Profile
          </h3>
          <ul className="space-y-2 list-disc list-inside text-slate-600 leading-relaxed text-xs">
            <li>Students currently in {course.grade} or gifted younger students.</li>
            <li>Enthusiastic learners seeking challenge beyond repetitive school worksheets.</li>
            <li>
              Students aiming for high placement in AMC 8/10, MathCounts, or high school honors
              tracks.
            </li>
            <li>
              Children who want to understand the foundational &quot;why&quot; of mathematics.
            </li>
          </ul>
        </div>

        <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
          <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            Classroom Readiness & Support
          </h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            No Olympiad medals are required to join. We place primary importance on curiosity and
            readiness to engage. If your student is motivated to learn, our faculty provides
            individualized guidance within the small 6–10 student cohort so no child gets left
            behind.
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
      className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Syllabus & Progression</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Week-by-Week Curriculum Breakdown
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{curriculum.length} Sequential Modules</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        Every class combines conceptual explanation, active student whiteboard solving, and mentor
        coaching. Review the complete weekly roadmap below:
      </p>

      {curriculum.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
          Detailed module schedule is finalized upon cohort enrollment. Please email
          info@mathpillar.com for specific syllabus inquiries.
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
                  Core Concepts & In-Class Problem Lab
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

function CourseClassroomStandard() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl border border-slate-800">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            The MathPillar Physical Classroom Standard
          </h3>
          <p className="text-xs text-emerald-300">
            Why our students excel through active face-to-face instruction
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 text-xs sm:text-sm text-slate-300">
        <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
          <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">Active Boardwork Participation</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every student stands at the whiteboard to solve problems, developing poise, logical
              rigor, and real-time verbal precision.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
          <Users className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">Strict 6–10 Student Cap</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never a crowded lecture hall. Instructors know each student&apos;s cognitive style,
              strengths, and areas needing support.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
          <FileText className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">Comprehensive Materials Included</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              All textbooks, curated problem folders, Olympiad practice packets, and solutions
              included with registration.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
          <Award className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">Weekly Parent Progress Notes</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transparent instructor updates keep parents fully informed about topic mastery and
              recommended practice focus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



function CourseParentFAQ() {
  const faqs = [
    {
      q: "How many students are in each class?",
      a: "Cohorts are strictly limited to 6–10 students. This guarantees that every child receives individualized attention and frequent turns at the whiteboard.",
    },
    {
      q: "What if my student misses a scheduled class?",
      a: "We provide comprehensive written course notes and dedicated faculty office hours before the next session to ensure the student catches up seamlessly.",
    },
    {
      q: "Are all materials and books included?",
      a: "Yes. Tuition covers all course binders, printed worksheets, contest mock tests, and solution guides. There are no additional book fees.",
    },
    {
      q: "What is the tuition refund policy?",
      a: "We want every parent and student to be thrilled with their experience. A full prorated refund (minus standard administrative costs) is provided prior to the second class session.",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Parent Guide & Questions
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="font-black text-slate-900 text-sm flex items-start gap-2">
              <span className="text-blue-600 font-bold shrink-0">Q:</span>
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-5">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Bottom Dedicated Apply Section leading directly to Application & Payment
 */
function CourseBottomApplySection({ course }: { course: Course }) {
  return (
    <section
      id="apply-section"
      className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-blue-800/80 space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950">
            {course.term} 2026 Enrollment Open
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Ready to Enroll Your Student in {course.title}?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Reserve your student&apos;s physical classroom seat now. Cohorts are capped at 6–10
            students to maintain our high academic standard.
          </p>
        </div>

        <div className="bg-white/10 border border-white/15 rounded-2xl p-6 text-center md:text-right shrink-0 backdrop-blur-xs">
          <span className="text-[11px] uppercase font-bold text-slate-300 block mb-1">
            Total Semester Tuition
          </span>
          <div className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight">
            ${course.price}
          </div>
          <span className="text-xs text-slate-300 block mt-1">
            Includes all {course.hours} hours & materials
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>100% In-Person Academy Classrooms</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>All Course Workbooks & Notes Included</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Full Refund Prior to Class 2</span>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-xs text-slate-400 max-w-md">
          Clicking below directs you to our secure enrollment form where you will provide student
          details and complete manual tuition payment (Zelle, Venmo, Direct Wire / ACH, or Check).
        </div>

        <Link
          href={`/register?course=${course.id}`}
          id="proceed-to-apply-button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 shadow-xl shadow-amber-400/20 transition-all hover:scale-102 cursor-pointer"
        >
          <span>Apply to Course & Proceed to Payment</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

function CourseQuickSnapshotSidebar({ course }: { course: Course }) {
  return (
    <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
      <div className="space-y-2 pb-4 border-b border-slate-100">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
          Course Snapshot
        </span>
        <h3 className="text-xl font-black text-slate-900 leading-snug">{course.title}</h3>
        <p className="text-xs text-slate-500">{course.subtitle}</p>
      </div>

      <div className="space-y-3 text-xs text-slate-600">
        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Target Grade</span>
          <span className="font-bold text-slate-900">{course.grade}</span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Cohort Term</span>
          <span className="font-bold text-slate-900">{course.term} 2026</span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Instruction</span>
          <span className="font-bold text-slate-900">{course.hours} Hours Total</span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Schedule</span>
          <span className="font-bold text-slate-900 text-right">{course.schedule}</span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-slate-50">
          <span className="font-semibold text-slate-500">Starts</span>
          <span className="font-bold text-slate-900">{course.startDate}</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="font-semibold text-slate-500">Format</span>
          <span className="font-bold text-emerald-700 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            100% In-Person
          </span>
        </div>
      </div>

      <div className="pt-2 space-y-3">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-baseline justify-between">
          <span className="text-xs font-semibold text-slate-500">Tuition</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">${course.price}</span>
            <span className="text-[10px] text-slate-400">/ semester</span>
          </div>
        </div>

        <a
          href="#apply-section"
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-102 cursor-pointer"
        >
          <span>Jump to Course Application</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        <a
          href="#curriculum"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-bold text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Review Weekly Syllabus</span>
        </a>
      </div>

      <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <span>First-come, first-served enrollment. Prorated refund before class 2.</span>
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
      <CourseDetailAudioTrigger />
      <Header />

      <main className="flex-1">
        <CourseHero course={course} />

        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 Cols: Rich Parent-Focused Content */}
            <div className="lg:col-span-8 space-y-10">
              <CoursePedagogyOverview course={course} />
              <CourseStudentGains />
              <CourseStudentProfile course={course} />
              <CourseCurriculumTable curriculum={curriculum} />
              <CourseClassroomStandard />
              <CourseParentFAQ />
            </div>

            {/* Right 4 Cols: Quick Info Snapshot */}
            <div className="lg:col-span-4 space-y-6">
              <CourseQuickSnapshotSidebar course={course} />
            </div>
          </div>

          {/* Bottom Section: Dedicated Apply to Course & Payment Direction */}
          <CourseBottomApplySection course={course} />

          {/* Related Course Offerings */}
          {relatedCourses.length > 0 && (
            <div className="pt-12 border-t border-slate-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Explore Other {course.term} Cohorts
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Additional physical classroom cohorts for your student&apos;s level
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
