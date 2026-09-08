"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

const emptySubscribe = () => () => {};

/**
 * Parses a datetime string strictly in Pacific Daylight Time (PDT / UTC-7).
 */
export function parsePDTTimestamp(dateStr?: string): number {
  if (!dateStr) return Number.NaN;
  const trimmed = dateStr.trim().replace(" ", "T");
  // If explicitly has timezone offset or Z
  if (/[+-]\d{2}(:\d{2})?$|Z$/i.test(trimmed)) {
    return new Date(trimmed).getTime();
  }
  // If date only (YYYY-MM-DD): default to 12:00 AM PDT (00:00:00)
  if (trimmed.length === 10) {
    return new Date(`${trimmed}T00:00:00-07:00`).getTime();
  }
  // Otherwise affix Pacific Daylight Time (-07:00)
  const iso = trimmed.length === 16 ? `${trimmed}:00-07:00` : `${trimmed}-07:00`;
  return new Date(iso).getTime();
}

export default function CoursesCountdown({
  targetDate = "2026-09-08T00:00:00",
  tag = "Upcoming Term",
  title = "FALL COURSES",
  subtitle = "STARTING SEPTEMBER 8, 2026",
}: {
  targetDate?: string;
  tag?: string;
  title?: string;
  subtitle?: string;
}) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    function calculateTime() {
      const parsedTime = parsePDTTimestamp(targetDate);
      if (Number.isNaN(parsedTime)) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      const now = Date.now();
      const difference = parsedTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    }

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-white border-b border-slate-200 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Title and Subtitle */}
        <div className="text-center md:text-left space-y-1">
          {tag && (
            <div className="inline-block px-2.5 py-0.5 rounded-sm bg-rose-100 text-rose-700 text-xs font-black tracking-widest uppercase">
              {tag}
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">{title}</h2>
          <p className="text-sm font-bold text-slate-500 tracking-wider">{subtitle}</p>
        </div>

        {/* Countdown Timer Boxes (PDT: Days, Hours, Minutes) */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-slate-900 text-white rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-center min-w-[72px] sm:min-w-[80px] shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                {isClient ? String(timeLeft.days).padStart(2, "0") : "00"}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-400">
                Days
              </span>
            </div>

            <span className="text-xl font-bold text-slate-400">:</span>

            <div className="bg-slate-900 text-white rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-center min-w-[72px] sm:min-w-[80px] shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                {isClient ? String(timeLeft.hours).padStart(2, "0") : "00"}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-400">
                Hours
              </span>
            </div>

            <span className="text-xl font-bold text-slate-400">:</span>

            <div className="bg-slate-900 text-white rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-center min-w-[72px] sm:min-w-[80px] shadow-sm border-2 border-amber-400">
              <span className="block text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-400">
                {isClient ? String(timeLeft.minutes).padStart(2, "0") : "00"}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-amber-300">
                Minutes
              </span>
            </div>
          </div>

          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            All times in PDT
          </span>
        </div>
      </div>
    </div>
  );
}
