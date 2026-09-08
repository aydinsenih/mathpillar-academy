import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, GraduationCap, CheckCircle, User } from "lucide-react";
import type { Instructor } from "@/lib/courses-db";

const DEFAULT_FACULTY: Instructor[] = [
  {
    id: "default-1",
    name: "Dr. Sinan Kanbir",
    role: "Lead Mathematics Instructor & Founder",
    credentials: "Ph.D. in Mathematics Education",
    bio: "Author of prominent competition math curricula and problem-solving books. Over 20 years of experience mentoring USAMO and AIME qualifiers with proof-centered instruction.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    tags: ["AMC 8/10/12", "Olympiad Geometry", "Curriculum Author"],
    active: true,
    displayOrder: 1,
  },
  {
    id: "default-2",
    name: "Dr. Mansuri",
    role: "Senior Faculty & Algebra Specialist",
    credentials: "Ph.D. in Applied Mathematics",
    bio: "Specialist in algebraic foundations, polynomial theory, and high school honors math curricula. Passionate about guiding middle schoolers through transition-to-algebra.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    tags: ["Algebra 1 & 2", "Integrated Math", "MathCounts Coach"],
    active: true,
    displayOrder: 2,
  },
  {
    id: "default-3",
    name: "Prof. Elena Vance",
    role: "Elementary Math Specialist",
    credentials: "M.Ed. in STEM Curriculum & Instruction",
    bio: "Dedicated to sparking curiosity in grades 4–6 through visual geometry, pattern recognition, and building unshakable number sense early.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    tags: ["Grades 4-5", "Number Fluency", "Visual Math"],
    active: true,
    displayOrder: 3,
  },
];

export default function InstructorsSection({ instructors }: { instructors?: Instructor[] }) {
  const displayFaculty = instructors && instructors.length > 0 ? instructors : DEFAULT_FACULTY;

  return (
    <section id="instructors" className="py-20 px-4 sm:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-100">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Expert Faculty</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Get to Know Our Instructors
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Courses are taught by published curriculum authors, university faculty, and Olympiad
              medalists dedicated to active pedagogical engagement.
            </p>
          </div>

          <div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse All Classes</span>
            </Link>
          </div>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayFaculty.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-5 hover:shadow-lg transition-all hover:bg-white flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-slate-200 flex items-center justify-center">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="64px"
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">{member.name}</h3>
                    <p className="text-xs font-bold text-rose-600">{member.role}</p>
                    {member.credentials && (
                      <p className="text-[11px] text-slate-500">{member.credentials}</p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
              </div>

              {member.tags && member.tags.length > 0 && (
                <div className="pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  {member.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
