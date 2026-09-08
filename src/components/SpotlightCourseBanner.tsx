import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, Clock, ArrowRight, MapPin } from "lucide-react";
import type { Course } from "@/lib/courses-db";

export default function SpotlightCourseBanner({ course }: { course?: Course }) {
  if (!course) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 my-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-8 sm:p-12 shadow-xl border border-blue-800/60">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>Spotlight Course · {course.grade}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {course.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>In-Person Only</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rose-400" />
                <span>Starts {course.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{course.schedule}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <div className="text-left md:text-right">
              <div className="text-3xl sm:text-4xl font-black text-amber-300">${course.price}</div>
              <p className="text-xs text-slate-300 font-medium">
                {course.hours} hours total instruction
              </p>
            </div>

            <Link
              href={`/register?course=${course.id}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all hover:scale-102"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
