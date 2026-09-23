"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, MapPin, Sparkles, BookOpen } from "lucide-react";
import type { Course } from "@/lib/courses-db";
import { playPositiveChime } from "@/lib/sound";

export default function CourseCard({ course }: { course: Course }) {
  const termBadgeColor =
    course.term.toLowerCase() === "spring"
      ? "bg-rose-500 text-white"
      : course.term.toLowerCase() === "fall"
        ? "bg-amber-500 text-white"
        : "bg-emerald-500 text-white";

  const handleLinkClick = () => {
    playPositiveChime();
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ring-1 ring-slate-100 hover:ring-blue-500/30">
      {/* Stretched clickable overlay for the whole card */}
      <Link
        href={`/courses/${course.id}`}
        onClick={handleLinkClick}
        aria-label={`View details and curriculum for ${course.title}`}
        className="absolute inset-0 z-10 rounded-3xl"
      />

      {/* Card Header & Media */}
      <div className="relative h-48 w-full bg-slate-900 overflow-hidden pointer-events-none">
        {course.image ? (
          <Image
            src={course.image}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-80"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center">
            <span className="text-4xl font-mono text-white/30">f(x)</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${termBadgeColor} shadow-xs`}
          >
            {course.term}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-900/85 text-slate-200 backdrop-blur-xs border border-white/10">
            {course.grade}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>In-Person</span>
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-3.5 left-4 right-4 space-y-0.5">
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors flex items-center justify-between">
            <span>{course.title}</span>
            <Sparkles className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </h3>
          <p className="text-xs text-slate-300 line-clamp-1 font-medium">{course.subtitle}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
          {course.description}
        </p>

        {/* Schedule & In-Person Format Meta */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-emerald-900 font-bold bg-emerald-50/80 px-2.5 py-1.5 rounded-xl border border-emerald-200/60">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>100% In-Person Physical Classroom</span>
          </div>
          <div className="flex items-center justify-between text-slate-600 pt-0.5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="font-semibold text-slate-700">Starts:</span>
              <span>{course.startDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>{course.hours} hrs total</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] truncate">
            <span className="font-semibold text-slate-700">Schedule:</span>
            <span className="truncate">{course.schedule}</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 relative z-20">
          <div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xs font-bold text-slate-400">$</span>
              <span className="text-2xl font-black text-slate-900">{course.price}</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
              Full Term Tuition
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/courses/${course.id}`}
              onClick={handleLinkClick}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Course Details</span>
            </Link>

            <Link
              href={`/register?course=${course.id}`}
              onClick={handleLinkClick}
              className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl text-xs font-black text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all"
            >
              <span>Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
