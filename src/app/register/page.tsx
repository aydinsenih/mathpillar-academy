"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Course, Registration } from "@/lib/courses-db";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  CreditCard,
  Building,
  FileCheck,
  User,
  Check,
  Printer,
  ArrowRight,
  MapPin,
} from "lucide-react";

interface StudentState {
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  phone: string;
  school: string;
  gpa: string;
  grade: string;
}

interface ParentState {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

function RegistrationReceiptView({ receipt }: { receipt: Registration }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 sm:p-12 space-y-8">
        <div className="text-center space-y-3 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            Registration Received
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Welcome to MathPillar Academy!
          </h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            We are thrilled to welcome{" "}
            <span className="font-bold text-slate-900">
              {receipt.student.firstname} {receipt.student.lastname}
            </span>
            .
          </p>
        </div>

        {/* Registration Code Badge */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 text-center space-y-1">
          <span className="text-xs uppercase font-bold text-slate-400">
            Registration Reference Code
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-black text-amber-400 tracking-wider">
            {receipt.id}
          </div>
          <p className="text-xs text-slate-400">
            Keep this reference for payment note and confirmation correspondence.
          </p>
        </div>

        {/* Details Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              Student Details
            </h4>
            <p className="text-slate-700 font-medium">
              {receipt.student.firstname} {receipt.student.lastname}
            </p>
            <p className="text-slate-500 text-xs">
              Email: {receipt.student.email || "None provided"}
            </p>
            <p className="text-slate-500 text-xs">
              Phone: {receipt.student.phone || "None provided"}
            </p>
            <p className="text-slate-500 text-xs">
              Grade: {receipt.student.grade || "N/A"} · School: {receipt.student.school || "N/A"}
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-600" />
              Parent / Guardian Contact
            </h4>
            <p className="text-slate-700 font-medium">
              {receipt.parent.firstname} {receipt.parent.lastname}
            </p>
            <p className="text-slate-500 text-xs">Email: {receipt.parent.email}</p>
            <p className="text-slate-500 text-xs">Phone: {receipt.parent.phone || "N/A"}</p>
            {receipt.address?.city && (
              <p className="text-slate-500 text-xs">
                {receipt.address.city}, {receipt.address.state} {receipt.address.zip}
              </p>
            )}
          </div>
        </div>

        {/* Enrolled Courses Breakdown */}
        <div className="space-y-3">
          <h4 className="font-black text-slate-900 text-base">Selected Courses</h4>
          <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden">
            {receipt.courses.map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between bg-white text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{c.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" />
                    In-Person Classroom
                  </span>
                </div>
                <span className="font-bold text-slate-900">${c.price}</span>
              </div>
            ))}
            <div className="p-4 bg-slate-50 flex items-center justify-between text-base font-black text-slate-900">
              <span>Total Tuition:</span>
              <span className="text-xl text-blue-600">${receipt.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Payment Instructions Card */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm space-y-3">
          <h4 className="font-black text-amber-900 flex items-center gap-2 text-base">
            <CreditCard className="w-5 h-5 text-amber-600" />
            Tuition Manual Payment Instructions
          </h4>
          <p className="text-amber-900 text-xs leading-relaxed">
            Please transfer{" "}
            <span className="font-black text-sm text-slate-900">${receipt.totalPrice}</span> using
            any of the manual payment methods below. In the memo / notes section, kindly include:{" "}
            <span className="font-bold underline">
              {receipt.id} - {receipt.student.lastname}
            </span>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200">
              <span className="font-bold text-slate-900 block mb-1">Zelle / Check / Cash</span>
              <span className="text-slate-700 font-mono select-all">payment@mathpillar.com</span>
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200">
              <span className="font-bold text-slate-900 block mb-1">Venmo</span>
              <span className="text-slate-700 font-mono select-all">@MathPillar</span>
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200">
              <span className="font-bold text-slate-900 block mb-1">Wire / ACH</span>
              <span className="text-slate-700 font-mono">Acct: 625910010</span>
              <span className="text-slate-700 font-mono block">Routing: 075000019</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-600/20"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StudentInfoSection({
  student,
  setStudent,
}: {
  student: StudentState;
  setStudent: React.Dispatch<React.SetStateAction<StudentState>>;
}) {
  return (
    <div className="form-card">
      <div className="form-header-red px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-black tracking-wide uppercase flex items-center gap-2">
          <User className="w-5 h-5" />
          Student Info
        </h2>
        <span className="text-xs uppercase tracking-widest font-bold opacity-80">
          Section 1 of 5
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
          <div className="sm:col-span-4 space-y-1.5">
            <label
              htmlFor="student-firstname"
              className="text-xs font-black uppercase tracking-wider text-slate-600"
            >
              First Name *
            </label>
            <input
              id="student-firstname"
              type="text"
              required
              value={student.firstname}
              onChange={(e) => setStudent({ ...student, firstname: e.target.value })}
              placeholder="Student's first name"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="sm:col-span-4 space-y-1.5">
            <label
              htmlFor="student-lastname"
              className="text-xs font-black uppercase tracking-wider text-slate-600"
            >
              Last Name *
            </label>
            <input
              id="student-lastname"
              type="text"
              required
              value={student.lastname}
              onChange={(e) => setStudent({ ...student, lastname: e.target.value })}
              placeholder="Student's last name"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="sm:col-span-4 space-y-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-slate-600 block">
              Gender *
            </span>
            <div className="flex items-center gap-4 pt-2">
              <label
                htmlFor="gender-female"
                className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
              >
                <input
                  id="gender-female"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={student.gender === "female"}
                  onChange={() => setStudent({ ...student, gender: "female" })}
                  className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                />
                <span>Female</span>
              </label>
              <label
                htmlFor="gender-male"
                className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
              >
                <input
                  id="gender-male"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={student.gender === "male"}
                  onChange={() => setStudent({ ...student, gender: "male" })}
                  className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                />
                <span>Male</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label
              htmlFor="student-email"
              className="text-xs font-black uppercase tracking-wider text-slate-600"
            >
              Student Email
            </label>
            <input
              id="student-email"
              type="email"
              value={student.email}
              onChange={(e) => setStudent({ ...student, email: e.target.value })}
              placeholder="student@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="student-phone"
              className="text-xs font-black uppercase tracking-wider text-slate-600"
            >
              Student Phone
            </label>
            <input
              id="student-phone"
              type="tel"
              value={student.phone}
              onChange={(e) => setStudent({ ...student, phone: e.target.value })}
              placeholder="(555) 000-0000"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label
              htmlFor="student-school"
              className="text-xs font-black uppercase tracking-wider text-slate-600"
            >
              School Name
            </label>
            <input
              id="student-school"
              type="text"
              value={student.school}
              onChange={(e) => setStudent({ ...student, school: e.target.value })}
              placeholder="e.g. Lincoln High School"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="student-gpa"
              className="text-xs font-black uppercase tracking-wider text-slate-600"
            >
              Current GPA
            </label>
            <input
              id="student-gpa"
              type="text"
              value={student.gpa}
              onChange={(e) => setStudent({ ...student, gpa: e.target.value })}
              placeholder="e.g. 3.9"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="student-grade"
              className="text-xs font-black uppercase tracking-wider text-slate-600"
            >
              Grade Entering
            </label>
            <input
              id="student-grade"
              type="text"
              value={student.grade}
              onChange={(e) => setStudent({ ...student, grade: e.target.value })}
              placeholder="e.g. 8th Grade"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseSelectionSection({
  activeTerm,
  loadingCourses,
  courses,
  selectedCourseIds,
  toggleCourse,
  selectedCourses,
  totalTuition,
}: {
  activeTerm: string;
  loadingCourses: boolean;
  courses: Course[];
  selectedCourseIds: string[];
  toggleCourse: (id: string) => void;
  selectedCourses: Course[];
  totalTuition: number;
}) {
  return (
    <div className="form-card">
      <div className="form-header-blue px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-black tracking-wide uppercase flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          Select {activeTerm} Courses
        </h2>
        <span className="text-xs uppercase tracking-widest font-bold opacity-80">
          Section 2 of 5
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* In-Person Attendance Requirement Reminder */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-900 leading-relaxed">
            <span className="font-bold">In-Person Classroom Learning Only:</span> All MathPillar
            cohorts meet face-to-face at our physical academy facility. There are{" "}
            <span className="font-bold">no online, virtual, or hybrid sessions</span>. Please review
            class times to confirm your student can attend in person.
          </div>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          Select one or more {activeTerm} courses below. Tuition is automatically tallied.
        </p>

        {loadingCourses ? (
          <div className="py-12 text-center text-sm text-slate-500">
            Loading available courses...
          </div>
        ) : (
          <div className="space-y-3">
            {courses.map((course) => {
              const isSelected = selectedCourseIds.includes(course.id);
              const inputId = `course-checkbox-${course.id}`;
              return (
                <label
                  htmlFor={inputId}
                  key={course.id}
                  aria-label={`${course.title} - ${course.subtitle}, ${course.price} dollars`}
                  className={`course-checkbox-card block border-2 rounded-2xl p-4 sm:p-5 cursor-pointer select-none transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/60 shadow-xs"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCourse(course.id)}
                        className="sr-only"
                      />
                      <div
                        className={`mt-1 w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                          isSelected
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-rose-500 text-white">
                            {course.term}
                          </span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {course.grade}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />
                            In-Person Only
                          </span>
                          <span className="font-black text-slate-900 text-sm sm:text-base">
                            {course.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">{course.subtitle}</p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-500" />
                            {course.schedule}
                          </span>
                          <span>•</span>
                          <span>{course.hours} hours</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">Physical Classroom</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-lg sm:text-xl font-black text-slate-900">
                        ${course.price}
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {/* Live Tuition Summary Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-lg">
              {selectedCourses.length}
            </div>
            <div>
              <h4 className="font-bold text-sm">
                {selectedCourses.length === 1
                  ? "1 Course Selected"
                  : `${selectedCourses.length} Courses Selected`}
              </h4>
              <p className="text-xs text-slate-400">
                {selectedCourses.map((c) => c.title).join(", ") || "No courses selected yet"}
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
              Total Tuition Due
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-amber-400">
              ${totalTuition}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParentInfoSection({
  parent,
  setParent,
}: {
  parent: ParentState;
  setParent: React.Dispatch<React.SetStateAction<ParentState>>;
}) {
  return (
    <div className="form-card">
      <div className="form-header-yellow px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-black tracking-wide uppercase flex items-center gap-2">
          <User className="w-5 h-5" />
          Parent Info
        </h2>
        <span className="text-xs uppercase tracking-widest font-bold opacity-80">
          Section 3 of 5
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label
              htmlFor="parent-firstname"
              className="text-xs font-black uppercase tracking-wider text-slate-600"
            >
              Parent First Name *
            </label>
            <input
              id="parent-firstname"
              type="text"
              required
              value={parent.firstname}
              onChange={(e) => setParent({ ...parent, firstname: e.target.value })}
              placeholder="Parent's first name"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="parent-lastname"
              className="text-xs font-black uppercase tracking-wider text-slate-600"
            >
              Parent Last Name *
            </label>
            <input
              id="parent-lastname"
              type="text"
              required
              value={parent.lastname}
              onChange={(e) => setParent({ ...parent, lastname: e.target.value })}
              placeholder="Parent's last name"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label
              htmlFor="parent-email"
              className="text-xs font-black uppercase tracking-wider text-slate-600"
            >
              Parent Email *
            </label>
            <input
              id="parent-email"
              type="email"
              required
              value={parent.email}
              onChange={(e) => setParent({ ...parent, email: e.target.value })}
              placeholder="parent@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="parent-phone"
              className="text-xs font-black uppercase tracking-wider text-slate-600"
            >
              Parent Phone *
            </label>
            <input
              id="parent-phone"
              type="tel"
              required
              value={parent.phone}
              onChange={(e) => setParent({ ...parent, phone: e.target.value })}
              placeholder="(555) 000-0000"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentSection() {
  return (
    <div className="form-card">
      <div className="form-header-blue px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-black tracking-wide uppercase flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-amber-300" />
          Payment
        </h2>
        <span className="text-xs uppercase tracking-widest font-bold opacity-80">
          Section 4 of 5
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Payment Selection
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Manual Payment (Default)
          </span>
        </div>

        <div className="border border-blue-200 bg-blue-50/40 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">Manual Payment</h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Tuition is completed via manual transfer. We accept Zelle, Venmo, Direct Bank Wire /
                ACH, and Check / Cash. No processing surcharge is applied.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* Method 1: Zelle / Check / Cash */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-purple-700 tracking-wider">
                  Zelle / Check / Cash
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                  Free
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900 break-all select-all">
                payment@mathpillar.com
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                In the Zelle note, include the student name and enrolled course(s).
              </p>
            </div>

            {/* Method 2: Venmo */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-sky-600 tracking-wider">
                  Venmo
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700">
                  Verified
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900 select-all">@MathPillar</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Send to verified handle with student name in the note.
              </p>
            </div>

            {/* Method 3: Wire / ACH */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-700 tracking-wider">
                  Wire / ACH
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  Bank Transfer
                </span>
              </div>
              <div className="text-xs text-slate-700 space-y-0.5 font-mono">
                <p>
                  <span className="font-bold font-sans">Acct:</span> 625910010
                </p>
                <p>
                  <span className="font-bold font-sans">ACH Routing:</span> 075000019
                </p>
                <p>
                  <span className="font-bold font-sans">Wire Routing:</span> 021000021
                </p>
              </div>
              <p className="text-[11px] text-slate-500 font-sans">
                Beneficiary: MathPillar Academy
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-white/90 rounded-xl p-3 border border-blue-100 flex items-center gap-2">
            <span className="font-bold text-blue-700">Note:</span>
            <span>
              You will receive an instant confirmation receipt upon submitting this form with your
              registration code.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TermsSection({
  agreedEnrollment,
  setAgreedEnrollment,
  agreedTerms,
  setAgreedTerms,
}: {
  agreedEnrollment: boolean;
  setAgreedEnrollment: (val: boolean) => void;
  agreedTerms: boolean;
  setAgreedTerms: (val: boolean) => void;
}) {
  return (
    <div className="form-card">
      <div className="form-header-red px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-black tracking-wide uppercase flex items-center gap-2">
          <FileCheck className="w-5 h-5" />
          Terms & Conditions
        </h2>
        <span className="text-xs uppercase tracking-widest font-bold opacity-80">
          Section 5 of 5
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-600 space-y-3 max-h-56 overflow-y-auto">
          <h4 className="font-black text-slate-900 text-sm">
            Please Read Before Completing Registration
          </h4>
          <div>
            <h5 className="font-bold text-slate-800">Refunds:</h5>
            <p className="leading-relaxed">
              Students may submit a written application for a refund of the registered course no
              later than the date following the commencement of the second class of the course.
              MathPillar will process a prorated refund of a course, subject to deductions from paid
              monies equivalent to the sum of (I) a $50 registration fee; and (II) $50 multiplied by
              the number of classes attended by the student (if applicable). Following the second
              class of the course, no refund or course credit transfer will be provided for the
              termination of the course.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-slate-800">Vacation Notice:</h5>
            <p className="leading-relaxed">
              The student should provide MathPillar with a 7-day notice of any vacation plans in
              order for MathPillar to set aside course materials for that student.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-slate-800">Behavior & Integrity:</h5>
            <p className="leading-relaxed">
              MathPillar reserves the right to accept, decline to accept, or remove any student
              participating in the program at any point in the term due to his/her behavior problem
              in this learning environment. If this occurs, tuition for all remaining classes will
              be wholly refunded.
            </p>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-2">
          <label
            htmlFor="agree-enroll"
            className="flex items-start gap-3 cursor-pointer text-sm text-slate-700 select-none"
          >
            <input
              id="agree-enroll"
              type="checkbox"
              required
              checked={agreedEnrollment}
              onChange={(e) => setAgreedEnrollment(e.target.checked)}
              className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
            />
            <span>I would like my child to be enrolled in the MathPillar Academy program.</span>
          </label>

          <label
            htmlFor="agree-terms"
            className="flex items-start gap-3 cursor-pointer text-sm text-slate-700 select-none"
          >
            <input
              id="agree-terms"
              type="checkbox"
              required
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
            />
            <span>
              I have read and agree with the <u>Terms and Conditions</u> that are listed above this
              acceptance.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const preSelectedCourse = searchParams.get("course");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // Form states
  const [student, setStudent] = useState<StudentState>({
    firstname: "",
    lastname: "",
    gender: "female",
    email: "",
    phone: "",
    school: "",
    gpa: "",
    grade: "",
  });

  const [parent, setParent] = useState<ParentState>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [paymentMethod] = useState("Manual Payment (Zelle, Venmo, Wire, Check/Cash)");

  const [agreedEnrollment, setAgreedEnrollment] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationReceipt, setRegistrationReceipt] = useState<Registration | null>(null);

  const [activeTerm, setActiveTerm] = useState("Spring");

  // Fetch active courses
  useEffect(() => {
    async function loadCourses() {
      try {
        const [coursesRes, settingsRes] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/settings"),
        ]);
        const data = await coursesRes.json();
        const settingsData = await settingsRes.json();
        if (settingsData?.activeTerm) {
          setActiveTerm(settingsData.activeTerm);
        }
        if (Array.isArray(data)) {
          setCourses(data);
          if (preSelectedCourse) {
            const exists = data.some((c: Course) => c.id === preSelectedCourse);
            if (exists) {
              setSelectedCourseIds([preSelectedCourse]);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoadingCourses(false);
      }
    }
    loadCourses();
  }, [preSelectedCourse]);

  // Toggle course selection
  const toggleCourse = (id: string) => {
    setSelectedCourseIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Calculate order totals
  const { selectedCourses, totalTuition } = useMemo(() => {
    const list = courses.filter((c) => selectedCourseIds.includes(c.id));
    const total = list.reduce((acc, curr) => acc + curr.price, 0);
    return { selectedCourses: list, totalTuition: total };
  }, [courses, selectedCourseIds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (selectedCourseIds.length === 0) {
      setErrorMessage("Please select at least one course to enroll in.");
      window.scrollTo({ top: 400, behavior: "smooth" });
      return;
    }

    if (!agreedEnrollment || !agreedTerms) {
      setErrorMessage("Please accept the enrollment terms and conditions to proceed.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student,
          parent,
          courseIds: selectedCourseIds,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration submission failed.");
      }

      setRegistrationReceipt(data.registration);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred during registration.");
    } finally {
      setSubmitting(false);
    }
  };

  // If successfully registered, display the receipt modal / screen
  if (registrationReceipt) {
    return <RegistrationReceiptView receipt={registrationReceipt} />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
      {/* Title & Slogan */}
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Register</h1>
        <p className="text-sm sm:text-base font-bold text-slate-600 max-w-xl mx-auto">
          We&apos;re Excited To Have You!
        </p>
      </div>

      {/* Error Announcement */}
      {errorMessage && (
        <div className="mb-8 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-3 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <StudentInfoSection student={student} setStudent={setStudent} />
        <CourseSelectionSection
          activeTerm={activeTerm}
          loadingCourses={loadingCourses}
          courses={courses}
          selectedCourseIds={selectedCourseIds}
          toggleCourse={toggleCourse}
          selectedCourses={selectedCourses}
          totalTuition={totalTuition}
        />
        <ParentInfoSection parent={parent} setParent={setParent} />
        <PaymentSection />
        <TermsSection
          agreedEnrollment={agreedEnrollment}
          setAgreedEnrollment={setAgreedEnrollment}
          agreedTerms={agreedTerms}
          setAgreedTerms={setAgreedTerms}
        />

        {/* Submit Action */}
        <div className="pt-4 text-center">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-600 shadow-xl shadow-rose-600/30 transition-all hover:scale-102 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting Registration...</span>
              </>
            ) : (
              <>
                <span>Complete Your Registration (${totalTuition})</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={<div className="py-20 text-center text-slate-500">Loading form...</div>}
        >
          <RegisterForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
