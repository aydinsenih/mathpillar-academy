import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, MapPin } from "lucide-react";
import type { Course } from "@/lib/courses-db";

export default function CourseCard({ course }: { course: Course }) {
  const termBadgeColor =
    course.term.toLowerCase() === "spring"
      ? "bg-rose-500 text-white"
      : course.term.toLowerCase() === "fall"
        ? "bg-amber-500 text-white"
        : "bg-emerald-500 text-white";

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      {/* Card Header & Media */}
      <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
        {course.image ? (
          <Image
            src={course.image}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center">
            <span className="text-4xl font-mono text-white/30">f(x)</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${termBadgeColor} shadow-xs`}
          >
            {course.term}
          </span>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 text-slate-200 backdrop-blur-xs border border-white/10">
            {course.grade}
          </span>
          <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>In-Person</span>
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <Link href={`/courses/${course.id}`} className="block group/title">
            <h3 className="text-lg font-black text-white tracking-tight leading-snug group-hover/title:text-amber-300 transition-colors">
              {course.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-300 line-clamp-1">{course.subtitle}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{course.description}</p>

        {/* Schedule & Starting Meta */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/80">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Format: In-Person Classroom Only</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="font-medium text-slate-700">Starts:</span>
            <span>{course.startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="font-medium text-slate-700">Schedule:</span>
            <span className="truncate">{course.schedule}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-slate-500">$</span>
              <span className="text-2xl font-black text-slate-900">{course.price}</span>
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              {course.hours} hours total
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span>Details</span>
            </Link>

            <Link
              href={`/register?course=${course.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
            >
              <span>Enroll</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
