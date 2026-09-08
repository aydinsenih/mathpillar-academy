"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CoursesCountdown, { parsePDTTimestamp } from "@/components/CoursesCountdown";
import type { Course, Registration, AppSettings } from "@/lib/courses-db";
import {
  BookOpen,
  Users,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Search,
  Eye,
  X,
  AlertCircle,
  Timer,
  Calendar,
  Sparkles,
  RotateCcw,
  Save,
} from "lucide-react";

interface CourseFormData {
  title: string;
  subtitle: string;
  term: string;
  grade: string;
  startDate: string;
  schedule: string;
  hours: number;
  price: number;
  featured: boolean;
  active: boolean;
  image: string;
  description: string;
}

function matchesCourseFilter(course: Course, termFilter: string, search: string): boolean {
  if (termFilter !== "All" && course.term.toLowerCase() !== termFilter.toLowerCase()) {
    return false;
  }
  const q = search.trim().toLowerCase();
  if (!q) return true;
  return (
    course.title.toLowerCase().includes(q) ||
    course.subtitle.toLowerCase().includes(q) ||
    course.grade.toLowerCase().includes(q)
  );
}

const DEFAULT_ADMIN_SETTINGS: AppSettings = {
  activeTerm: "Fall",
  countdownTag: "Upcoming Term",
  countdownTitle: "FALL COURSES",
  countdownSubtitle: "STARTING SEPTEMBER 8, 2026",
  countdownTargetDate: "2026-09-08T00:00:00",
};

function useAdminSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_ADMIN_SETTINGS);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState("");
  const [settingsErrorMsg, setSettingsErrorMsg] = useState("");

  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data) {
        setSettings({
          activeTerm: data.activeTerm || "Fall",
          countdownTag: data.countdownTag || "Upcoming Term",
          countdownTitle: data.countdownTitle || "FALL COURSES",
          countdownSubtitle: data.countdownSubtitle || "STARTING SEPTEMBER 8, 2026",
          countdownTargetDate: data.countdownTargetDate || "2026-09-08T00:00:00",
        });
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    }
  }, []);

  const handleUpdateSettings = async (updates: Partial<AppSettings>): Promise<boolean> => {
    setSavingSettings(true);
    setSettingsSuccessMsg("");
    setSettingsErrorMsg("");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (res.ok && data.settings) {
        setSettings(data.settings);
        setSettingsSuccessMsg("Settings updated successfully!");
        setTimeout(() => setSettingsSuccessMsg(""), 5000);
        return true;
      } else {
        setSettingsErrorMsg(data.error || "Failed to update settings");
        setTimeout(() => setSettingsErrorMsg(""), 5000);
        return false;
      }
    } catch (err) {
      console.error("Failed to update settings:", err);
      setSettingsErrorMsg("An unexpected error occurred while saving settings.");
      setTimeout(() => setSettingsErrorMsg(""), 5000);
      return false;
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUpdateActiveTerm = async (newTerm: string) => {
    const success = await handleUpdateSettings({ activeTerm: newTerm });
    if (success) {
      setSettingsSuccessMsg(
        `Active Term switched to ${newTerm}! Only ${newTerm} courses are visible to public visitors.`,
      );
      setTimeout(() => setSettingsSuccessMsg(""), 5000);
    }
  };

  return {
    settings,
    setSettings,
    activeTerm: settings.activeTerm,
    savingTerm: savingSettings,
    termSuccessMsg: settingsSuccessMsg,
    settingsSuccessMsg,
    settingsErrorMsg,
    loadSettings,
    handleUpdateSettings,
    handleUpdateActiveTerm,
  };
}

function useAdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseTermFilter, setCourseTermFilter] = useState("All");
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [courseForm, setCourseForm] = useState<CourseFormData>({
    title: "",
    subtitle: "",
    term: "Spring",
    grade: "Grade 7-8",
    startDate: "February 3, 2026",
    schedule: "Wednesdays 6:00 - 7:30 PM (CT)",
    hours: 18,
    price: 480,
    featured: false,
    active: true,
    image: "",
    description: "",
  });

  const loadCourses = useCallback(async () => {
    setLoadingCourses(true);
    try {
      const res = await fetch("/api/courses?all=true");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCourses(data);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
    } finally {
      setLoadingCourses(false);
    }
  }, []);

  const openEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      subtitle: course.subtitle,
      term: course.term,
      grade: course.grade,
      startDate: course.startDate,
      schedule: course.schedule,
      hours: course.hours,
      price: course.price,
      featured: !!course.featured,
      active: course.active,
      image: course.image || "",
      description: course.description,
    });
  };

  const openCreateCourse = () => {
    setIsCreatingCourse(true);
    setCourseForm({
      title: "",
      subtitle: "",
      term: "Spring",
      grade: "Grade 7-9",
      startDate: "February 3, 2026",
      schedule: "Wednesdays 6:00 - 7:30 PM (CT)",
      hours: 18,
      price: 480,
      featured: false,
      active: true,
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
      description: "",
    });
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        const res = await fetch(`/api/courses/${editingCourse.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseForm),
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        const res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseForm),
        });
        if (!res.ok) throw new Error("Create failed");
      }

      setEditingCourse(null);
      setIsCreatingCourse(false);
      await loadCourses();
    } catch (err: any) {
      alert(err.message || "Action failed");
    }
  };

  const toggleActive = async (course: Course) => {
    try {
      const res = await fetch(`/api/courses/${course.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !course.active }),
      });
      if (res.ok) {
        await loadCourses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleteConfirmId(null);
        await loadCourses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    courses,
    loadingCourses,
    courseSearch,
    setCourseSearch,
    courseTermFilter,
    setCourseTermFilter,
    editingCourse,
    setEditingCourse,
    isCreatingCourse,
    setIsCreatingCourse,
    deleteConfirmId,
    setDeleteConfirmId,
    courseForm,
    setCourseForm,
    loadCourses,
    openEditCourse,
    openCreateCourse,
    handleSaveCourse,
    toggleActive,
    handleDeleteCourse,
  };
}

function useAdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingRegs, setLoadingRegs] = useState(true);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  const loadRegistrations = useCallback(async () => {
    setLoadingRegs(true);
    try {
      const res = await fetch("/api/admin/registrations");
      const data = await res.json();
      if (Array.isArray(data)) {
        setRegistrations(data);
      }
    } catch (err) {
      console.error("Failed to load registrations:", err);
    } finally {
      setLoadingRegs(false);
    }
  }, []);

  const handleUpdateRegStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        await loadRegistrations();
        if (selectedReg && selectedReg.id === id) {
          setSelectedReg({ ...selectedReg, status: status as any });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    registrations,
    loadingRegs,
    selectedReg,
    setSelectedReg,
    loadRegistrations,
    handleUpdateRegStatus,
  };
}

function AdminTopHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl">
            π
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                MATHPILLAR ADMIN
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase">
                Management
              </span>
            </div>
            <p className="text-[10px] text-slate-400">admin@mathpillar.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function AdminMetricsCards({
  courses,
  registrations,
  totalTuitionSum,
  activeTerm,
}: {
  courses: Course[];
  registrations: Registration[];
  totalTuitionSum: number;
  activeTerm: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400">
          <span>Total Courses</span>
          <BookOpen className="w-4 h-4 text-blue-500" />
        </div>
        <div className="text-2xl font-black text-slate-900">{courses.length}</div>
        <p className="text-xs text-slate-500">
          {courses.filter((c) => c.active).length} currently active on website
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400">
          <span>Student Registrations</span>
          <Users className="w-4 h-4 text-rose-500" />
        </div>
        <div className="text-2xl font-black text-slate-900">{registrations.length}</div>
        <p className="text-xs text-slate-500">
          {registrations.filter((r) => r.status === "Confirmed").length} confirmed enrollments
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400">
          <span>Recorded Tuition</span>
          <DollarSign className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="text-2xl font-black text-slate-900">${totalTuitionSum}</div>
        <p className="text-xs text-slate-500">From registered applicants</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400">
          <span>Active Public Term</span>
          <Clock className="w-4 h-4 text-amber-500" />
        </div>
        <div className="text-2xl font-black text-slate-900">{activeTerm} Term</div>
        <p className="text-xs text-emerald-600 font-bold">Only {activeTerm} courses are public</p>
      </div>
    </div>
  );
}

function ActiveTermBanner({
  activeTerm,
  savingTerm,
  termSuccessMsg,
  onUpdateActiveTerm,
  onOpenCountdownSettings,
}: {
  activeTerm: string;
  savingTerm: boolean;
  termSuccessMsg: string;
  onUpdateActiveTerm: (term: string) => void;
  onOpenCountdownSettings?: () => void;
}) {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-blue-800 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Public Visibility Controller
            </span>
            <span className="text-xs text-slate-300">
              · Only active term courses are visible on the public site
            </span>
          </div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <span>Active Term:</span>
            <span className="text-amber-400 font-mono underline decoration-amber-400/60 underline-offset-4">
              {activeTerm} Term
            </span>
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Select which term is currently open for enrollment. Courses matching other terms are
            automatically hidden from the public home page, course catalog, and registration form.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/15">
            <label
              htmlFor="select-active-term"
              className="text-xs font-bold uppercase tracking-wider text-slate-200"
            >
              Switch Active:
            </label>
            <select
              id="select-active-term"
              value={activeTerm}
              disabled={savingTerm}
              onChange={(e) => onUpdateActiveTerm(e.target.value)}
              className="bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 focus:ring-2 focus:ring-amber-400 outline-none cursor-pointer"
            >
              <option value="Spring">Spring</option>
              <option value="Fall">Fall</option>
              <option value="Summer">Summer</option>
            </select>
            {savingTerm && (
              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>

          {onOpenCountdownSettings && (
            <button
              type="button"
              onClick={onOpenCountdownSettings}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-2.5 rounded-xl font-black text-xs shadow-sm transition-all cursor-pointer"
            >
              <Timer className="w-4 h-4" />
              <span>Configure Countdown &amp; Text</span>
            </button>
          )}
        </div>
      </div>

      {termSuccessMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{termSuccessMsg}</span>
        </div>
      )}
    </div>
  );
}

function CoursesTable({
  courses,
  loadingCourses,
  activeTerm,
  onToggleActive,
  onEditCourse,
  onDeleteCourse,
}: {
  courses: Course[];
  loadingCourses: boolean;
  activeTerm: string;
  onToggleActive: (course: Course) => void;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th scope="col" className="py-3.5 px-4">
                Course Info
              </th>
              <th scope="col" className="py-3.5 px-4">
                Term & Grade
              </th>
              <th scope="col" className="py-3.5 px-4">
                Schedule & Start
              </th>
              <th scope="col" className="py-3.5 px-4">
                Hours
              </th>
              <th scope="col" className="py-3.5 px-4">
                Price
              </th>
              <th scope="col" className="py-3.5 px-4">
                Status
              </th>
              <th scope="col" className="py-3.5 px-4 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loadingCourses ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  Loading courses...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  No courses matching filters.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                      {course.image && (
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={40}
                          height={40}
                          unoptimized
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                        />
                      )}
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <span>{course.title}</span>
                          {course.featured && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                              Spotlight
                            </span>
                          )}
                        </div>
                        <div className="text-slate-500 text-[11px] line-clamp-1">
                          {course.subtitle}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4" aria-label="Term and Grade">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            course.term.toLowerCase() === "spring"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {course.term}
                        </span>
                        {course.term.toLowerCase() === activeTerm.toLowerCase() ? (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
                            Live
                          </span>
                        ) : (
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                            Hidden
                          </span>
                        )}
                      </div>
                      <div className="text-slate-600 font-medium text-xs">{course.grade}</div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-slate-600">
                    <div>{course.startDate}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{course.schedule}</div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-slate-700">{course.hours} hrs</td>

                  <td className="py-4 px-4 font-black text-slate-900 text-sm">${course.price}</td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => onToggleActive(course)}
                      aria-label={`Toggle active state for ${course.title}`}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                        course.active
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {course.active ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-slate-500" />
                          <span>Inactive</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => onEditCourse(course)}
                        aria-label={`Edit ${course.title}`}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteCourse(course.id)}
                        aria-label={`Delete ${course.title}`}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const COUNTDOWN_PRESETS = [
  {
    name: "Fall 2026",
    term: "Fall",
    tag: "Upcoming Term",
    title: "FALL COURSES",
    subtitle: "STARTING SEPTEMBER 8, 2026",
    targetDate: "2026-09-08T00:00:00",
  },
  {
    name: "Spring 2027",
    term: "Spring",
    tag: "Upcoming Term",
    title: "SPRING COURSES",
    subtitle: "STARTING FEBRUARY 3, 2027",
    targetDate: "2027-02-03T00:00:00",
  },
  {
    name: "Summer 2027",
    term: "Summer",
    tag: "Upcoming Term",
    title: "SUMMER COHORTS",
    subtitle: "STARTING JUNE 15, 2027",
    targetDate: "2027-06-15T00:00:00",
  },
];

function formatDisplayDate(dateStr: string): string {
  try {
    const timestamp = parsePDTTimestamp(dateStr);
    if (Number.isNaN(timestamp)) return dateStr;
    const d = new Date(timestamp);
    return (
      d.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }) + " (PDT)"
    );
  } catch {
    return dateStr;
  }
}

function CountdownPresetsBar({
  onApplyPreset,
}: {
  onApplyPreset: (p: (typeof COUNTDOWN_PRESETS)[0]) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Quick Term Presets</span>
        </div>
        <span className="text-[11px] text-slate-400">Click to autofill</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {COUNTDOWN_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => onApplyPreset(preset)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-all cursor-pointer space-y-1 hover:border-slate-300 shadow-2xs"
          >
            <div className="text-xs font-black text-slate-900">{preset.name}</div>
            <div className="text-[10px] text-slate-500 font-mono truncate">{preset.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CountdownPreviewCard({
  term,
  tag,
  title,
  subtitle,
  targetDate,
}: {
  term: string;
  tag: string;
  title: string;
  subtitle: string;
  targetDate: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-black text-slate-900">Live Preview</h3>
          <p className="text-xs text-slate-500">
            Real-time preview of how this banner renders on the homepage
          </p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
          Interactive
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <CoursesCountdown tag={tag} title={title} subtitle={subtitle} targetDate={targetDate} />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400 block">
            Configured Term
          </span>
          <span className="text-sm font-black text-slate-800 block">{term} Term</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-black uppercase text-slate-400 block">
            Timezone Locked
          </span>
          <span className="text-sm font-black text-emerald-600 block">PDT (Pacific Time)</span>
        </div>
      </div>
    </div>
  );
}

function CountdownFormFields({
  formTerm,
  setFormTerm,
  formTag,
  setFormTag,
  formTitle,
  setFormTitle,
  formSubtitle,
  setFormSubtitle,
  formTargetDate,
  setFormTargetDate,
  onReset,
  saving,
}: {
  formTerm: string;
  setFormTerm: (val: string) => void;
  formTag: string;
  setFormTag: (val: string) => void;
  formTitle: string;
  setFormTitle: (val: string) => void;
  formSubtitle: string;
  setFormSubtitle: (val: string) => void;
  formTargetDate: string;
  setFormTargetDate: (val: string) => void;
  onReset: () => void;
  saving: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-base font-black text-slate-900">Banner Details &amp; Timing</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Customize text labels and the countdown expiration timestamp.
        </p>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="cfg-active-term"
          className="block text-xs font-bold uppercase tracking-wider text-slate-700"
        >
          Active Public Term
        </label>
        <select
          id="cfg-active-term"
          value={formTerm}
          onChange={(e) => setFormTerm(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
        >
          <option value="Fall">Fall (Only Fall courses displayed on public site)</option>
          <option value="Spring">Spring (Only Spring courses displayed on public site)</option>
          <option value="Summer">Summer (Only Summer courses displayed on public site)</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="cfg-tag"
          className="block text-xs font-bold uppercase tracking-wider text-slate-700"
        >
          Badge / Tag Text
        </label>
        <input
          id="cfg-tag"
          type="text"
          value={formTag}
          onChange={(e) => setFormTag(e.target.value)}
          placeholder="Upcoming Term"
          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-[11px] text-slate-400">
          Small highlighted tag shown above the title (e.g., &quot;Upcoming Term&quot; or &quot;Next
          Cohort&quot;).
        </p>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="cfg-title"
          className="block text-xs font-bold uppercase tracking-wider text-slate-700"
        >
          Course Headline / Title
        </label>
        <input
          id="cfg-title"
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="FALL COURSES"
          className="w-full px-3.5 py-2.5 text-sm font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-[11px] text-slate-400">
          The primary headline in bold capital letters (e.g., &quot;FALL COURSES&quot;).
        </p>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="cfg-subtitle"
          className="block text-xs font-bold uppercase tracking-wider text-slate-700"
        >
          Schedule Subtitle
        </label>
        <input
          id="cfg-subtitle"
          type="text"
          value={formSubtitle}
          onChange={(e) => setFormSubtitle(e.target.value)}
          placeholder="STARTING SEPTEMBER 8, 2026"
          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-[11px] text-slate-400">
          Informational line under the title (e.g., &quot;STARTING SEPTEMBER 8, 2026&quot;).
        </p>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="cfg-target-date"
          className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between"
        >
          <span>Countdown Target Date (12:00 AM PDT)</span>
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
        </label>
        <input
          id="cfg-target-date"
          type="date"
          value={formTargetDate ? formTargetDate.slice(0, 10) : ""}
          onChange={(e) => setFormTargetDate(e.target.value ? `${e.target.value}T00:00:00` : "")}
          className="w-full px-3.5 py-2.5 text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-[11px] text-slate-400">
          Fixed to 12:00 AM (midnight) PDT on the selected date.
        </p>
        {formTargetDate && (
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>
              <strong>Target:</strong> {formatDisplayDate(formTargetDate)}
            </span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
        <button
          type="button"
          onClick={onReset}
          disabled={saving}
          className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Saved</span>
        </button>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Countdown &amp; Term</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function CountdownConfigTab({
  settings,
  savingSettings,
  settingsSuccessMsg,
  settingsErrorMsg,
  onSaveSettings,
}: {
  settings: AppSettings;
  savingSettings: boolean;
  settingsSuccessMsg: string;
  settingsErrorMsg: string;
  onSaveSettings: (updates: Partial<AppSettings>) => Promise<boolean>;
}) {
  const [formTerm, setFormTerm] = useState(settings.activeTerm);
  const [formTag, setFormTag] = useState(settings.countdownTag);
  const [formTitle, setFormTitle] = useState(settings.countdownTitle);
  const [formSubtitle, setFormSubtitle] = useState(settings.countdownSubtitle);
  const [formTargetDate, setFormTargetDate] = useState(settings.countdownTargetDate);

  const handleApplyPreset = (preset: (typeof COUNTDOWN_PRESETS)[0]) => {
    setFormTerm(preset.term);
    setFormTag(preset.tag);
    setFormTitle(preset.title);
    setFormSubtitle(preset.subtitle);
    setFormTargetDate(preset.targetDate);
  };

  const handleReset = () => {
    setFormTerm(settings.activeTerm);
    setFormTag(settings.countdownTag);
    setFormTitle(settings.countdownTitle);
    setFormSubtitle(settings.countdownSubtitle);
    setFormTargetDate(settings.countdownTargetDate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveSettings({
      activeTerm: formTerm,
      countdownTag: formTag,
      countdownTitle: formTitle,
      countdownSubtitle: formSubtitle,
      countdownTargetDate: formTargetDate,
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              Homepage Announcement Banner
            </span>
            <span className="text-xs text-slate-300">· Live on MathPillar Home</span>
          </div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Timer className="w-6 h-6 text-amber-400" />
            <span>Upcoming Term Countdown Configuration</span>
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Configure the countdown badge text, headline title, schedule subtitle, and target
            date/time. Changes take effect on the homepage immediately upon saving.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all cursor-pointer self-start md:self-auto shrink-0"
        >
          <span>View Live Homepage</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
        </Link>
      </div>

      {settingsSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-3 shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{settingsSuccessMsg}</span>
        </div>
      )}

      {settingsErrorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-bold flex items-center gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{settingsErrorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 space-y-6">
          <CountdownPresetsBar onApplyPreset={handleApplyPreset} />

          <CountdownFormFields
            formTerm={formTerm}
            setFormTerm={setFormTerm}
            formTag={formTag}
            setFormTag={setFormTag}
            formTitle={formTitle}
            setFormTitle={setFormTitle}
            formSubtitle={formSubtitle}
            setFormSubtitle={setFormSubtitle}
            formTargetDate={formTargetDate}
            setFormTargetDate={setFormTargetDate}
            onReset={handleReset}
            saving={savingSettings}
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <CountdownPreviewCard
            term={formTerm}
            tag={formTag}
            title={formTitle}
            subtitle={formSubtitle}
            targetDate={formTargetDate}
          />
        </div>
      </form>
    </div>
  );
}

function CoursesTabSection({
  activeTerm,
  savingTerm,
  termSuccessMsg,
  handleUpdateActiveTerm,
  onOpenCountdownSettings,
  courseSearch,
  setCourseSearch,
  courseTermFilter,
  setCourseTermFilter,
  openCreateCourse,
  filteredCourses,
  loadingCourses,
  toggleActive,
  openEditCourse,
  setDeleteConfirmId,
}: {
  activeTerm: string;
  savingTerm: boolean;
  termSuccessMsg: string;
  handleUpdateActiveTerm: (term: string) => void;
  onOpenCountdownSettings: () => void;
  courseSearch: string;
  setCourseSearch: (val: string) => void;
  courseTermFilter: string;
  setCourseTermFilter: (val: string) => void;
  openCreateCourse: () => void;
  filteredCourses: Course[];
  loadingCourses: boolean;
  toggleActive: (c: Course) => void;
  openEditCourse: (c: Course) => void;
  setDeleteConfirmId: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <ActiveTermBanner
        activeTerm={activeTerm}
        savingTerm={savingTerm}
        termSuccessMsg={termSuccessMsg}
        onUpdateActiveTerm={handleUpdateActiveTerm}
        onOpenCountdownSettings={onOpenCountdownSettings}
      />

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              aria-label="Filter courses by name or grade"
              placeholder="Filter courses..."
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            aria-label="Filter courses by term"
            value={courseTermFilter}
            onChange={(e) => setCourseTermFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="All">All Terms</option>
            <option value="Spring">Spring</option>
            <option value="Fall">Fall</option>
          </select>
        </div>

        <button
          onClick={openCreateCourse}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      <CoursesTable
        courses={filteredCourses}
        loadingCourses={loadingCourses}
        activeTerm={activeTerm}
        onToggleActive={toggleActive}
        onEditCourse={openEditCourse}
        onDeleteCourse={(id) => setDeleteConfirmId(id)}
      />
    </div>
  );
}

function RegistrationsTable({
  registrations,
  loadingRegs,
  onUpdateRegStatus,
  onSelectReg,
}: {
  registrations: Registration[];
  loadingRegs: boolean;
  onUpdateRegStatus: (id: string, status: string) => void;
  onSelectReg: (reg: Registration) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th scope="col" className="py-3.5 px-4">
                Ref ID & Date
              </th>
              <th scope="col" className="py-3.5 px-4">
                Student
              </th>
              <th scope="col" className="py-3.5 px-4">
                Parent Contact
              </th>
              <th scope="col" className="py-3.5 px-4">
                Enrolled Courses
              </th>
              <th scope="col" className="py-3.5 px-4">
                Tuition
              </th>
              <th scope="col" className="py-3.5 px-4">
                Payment Method
              </th>
              <th scope="col" className="py-3.5 px-4">
                Status
              </th>
              <th scope="col" className="py-3.5 px-4 text-right">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loadingRegs ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  Loading registrations...
                </td>
              </tr>
            ) : registrations.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  No student registrations received yet.
                </td>
              </tr>
            ) : (
              registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-900">
                    <div>{reg.id}</div>
                    <div className="text-[10px] text-slate-400 font-sans">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-900 text-sm">
                      {reg.student.firstname} {reg.student.lastname}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      {reg.student.grade} · {reg.student.school}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-800">
                      {reg.parent.firstname} {reg.parent.lastname}
                    </div>
                    <div className="text-[11px] text-slate-500">{reg.parent.email}</div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      {reg.courses.map((c) => (
                        <span
                          key={c.id}
                          className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold mr-1"
                        >
                          {c.title}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4 font-black text-slate-900 text-sm">${reg.totalPrice}</td>

                  <td className="py-4 px-4 text-slate-600 text-[11px] max-w-[180px] truncate">
                    {reg.paymentMethod}
                  </td>

                  <td className="py-4 px-4">
                    <select
                      aria-label={`Update registration status for ${reg.student.firstname} ${reg.student.lastname}`}
                      value={reg.status}
                      onChange={(e) => onUpdateRegStatus(reg.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border transition-colors cursor-pointer ${
                        reg.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : reg.status === "Paid"
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : "bg-amber-100 text-amber-800 border-amber-300"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onSelectReg(reg)}
                      aria-label={`View application details for ${reg.student.firstname} ${reg.student.lastname}`}
                      className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CourseFormModal({
  editingCourse,
  courseForm,
  setCourseForm,
  onClose,
  onSaveCourse,
}: {
  editingCourse: Course | null;
  courseForm: CourseFormData;
  setCourseForm: React.Dispatch<React.SetStateAction<CourseFormData>>;
  onClose: () => void;
  onSaveCourse: (e: React.FormEvent) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-xl font-black text-slate-900">
            {editingCourse ? "Edit Course Details" : "Add New Math Course"}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSaveCourse} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="modal-title" className="font-bold text-slate-700 uppercase">
                Course Title *
              </label>
              <input
                id="modal-title"
                type="text"
                required
                value={courseForm.title}
                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                placeholder="e.g. GEOTOPIA 0.5"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="modal-subtitle" className="font-bold text-slate-700 uppercase">
                Subtitle / Focus
              </label>
              <input
                id="modal-subtitle"
                type="text"
                value={courseForm.subtitle}
                onChange={(e) => setCourseForm({ ...courseForm, subtitle: e.target.value })}
                placeholder="e.g. High School Geometry Foundations"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label htmlFor="modal-term" className="font-bold text-slate-700 uppercase">
                Term *
              </label>
              <select
                id="modal-term"
                value={courseForm.term}
                onChange={(e) => setCourseForm({ ...courseForm, term: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
                <option value="Summer">Summer</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="modal-grade" className="font-bold text-slate-700 uppercase">
                Target Grade *
              </label>
              <input
                id="modal-grade"
                type="text"
                required
                value={courseForm.grade}
                onChange={(e) => setCourseForm({ ...courseForm, grade: e.target.value })}
                placeholder="e.g. Grade 8-10"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="modal-price" className="font-bold text-slate-700 uppercase">
                Tuition Price ($) *
              </label>
              <input
                id="modal-price"
                type="number"
                required
                value={courseForm.price}
                onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label htmlFor="modal-start" className="font-bold text-slate-700 uppercase">
                Start Date *
              </label>
              <input
                id="modal-start"
                type="text"
                required
                value={courseForm.startDate}
                onChange={(e) => setCourseForm({ ...courseForm, startDate: e.target.value })}
                placeholder="e.g. February 3, 2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="modal-schedule" className="font-bold text-slate-700 uppercase">
                Schedule Timing *
              </label>
              <input
                id="modal-schedule"
                type="text"
                required
                value={courseForm.schedule}
                onChange={(e) => setCourseForm({ ...courseForm, schedule: e.target.value })}
                placeholder="e.g. Thursdays 6:30 - 7:55 PM (CT)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="modal-hours" className="font-bold text-slate-700 uppercase">
                Hours Total
              </label>
              <input
                id="modal-hours"
                type="number"
                value={courseForm.hours}
                onChange={(e) => setCourseForm({ ...courseForm, hours: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="modal-image" className="font-bold text-slate-700 uppercase">
              Banner Image URL
            </label>
            <input
              id="modal-image"
              type="url"
              value={courseForm.image}
              onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="modal-desc" className="font-bold text-slate-700 uppercase">
              Description / Syllabus
            </label>
            <textarea
              id="modal-desc"
              rows={3}
              value={courseForm.description}
              onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
              placeholder="Course overview, syllabus highlights, and preparation goals..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6 pt-2">
            <label
              htmlFor="modal-active"
              className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer"
            >
              <input
                id="modal-active"
                type="checkbox"
                checked={courseForm.active}
                onChange={(e) => setCourseForm({ ...courseForm, active: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span>Active on Public Website</span>
            </label>

            <label
              htmlFor="modal-featured"
              className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer"
            >
              <input
                id="modal-featured"
                type="checkbox"
                checked={courseForm.featured}
                onChange={(e) => setCourseForm({ ...courseForm, featured: e.target.checked })}
                className="w-4 h-4 text-amber-500 rounded"
              />
              <span>Spotlight Course Banner</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md cursor-pointer"
            >
              Save Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RegistrationDetailsModal({
  selectedReg,
  onClose,
}: {
  selectedReg: Registration;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400">{selectedReg.id}</span>
            <h3 className="text-xl font-black text-slate-900">Registration Application</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close application details"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl space-y-1">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
              Student Information
            </span>
            <p className="font-bold text-sm text-slate-900">
              {selectedReg.student.firstname} {selectedReg.student.lastname} (
              {selectedReg.student.gender})
            </p>
            <p className="text-slate-600">Email: {selectedReg.student.email || "N/A"}</p>
            <p className="text-slate-600">Phone: {selectedReg.student.phone || "N/A"}</p>
            <p className="text-slate-600">
              School: {selectedReg.student.school || "N/A"} · GPA:{" "}
              {selectedReg.student.gpa || "N/A"} · Grade: {selectedReg.student.grade || "N/A"}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl space-y-1">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
              Parent / Guardian Information
            </span>
            <p className="font-bold text-sm text-slate-900">
              {selectedReg.parent.firstname} {selectedReg.parent.lastname}
            </p>
            <p className="text-slate-600">Email: {selectedReg.parent.email}</p>
            <p className="text-slate-600">Phone: {selectedReg.parent.phone}</p>
            {selectedReg.address?.street && (
              <p className="text-slate-600">
                Address: {selectedReg.address.street}, {selectedReg.address.city},{" "}
                {selectedReg.address.state} {selectedReg.address.zip}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
              Enrolled Courses & Tuition
            </span>
            <div className="border border-slate-200 rounded-xl divide-y divide-slate-100">
              {selectedReg.courses.map((c) => (
                <div key={c.id} className="p-3 flex items-center justify-between">
                  <span className="font-bold text-slate-800">{c.title}</span>
                  <span className="font-bold text-slate-900">${c.price}</span>
                </div>
              ))}
              <div className="p-3 bg-slate-50 flex items-center justify-between font-black text-slate-900">
                <span>Total Due:</span>
                <span className="text-blue-600 text-sm">${selectedReg.totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 space-y-1">
            <span className="font-bold uppercase tracking-wider text-amber-900 text-[10px]">
              Payment Method
            </span>
            <p className="text-amber-800 font-medium">{selectedReg.paymentMethod}</p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({
  deleteConfirmId,
  onCancel,
  onConfirmDelete,
}: {
  deleteConfirmId: string;
  onCancel: () => void;
  onConfirmDelete: (id: string) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h4 className="text-base font-black text-slate-900">Delete Course?</h4>
        <p className="text-xs text-slate-500">
          Are you sure you want to delete this course? It will be permanently removed from the
          website catalog and registration form.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirmDelete(deleteConfirmId)}
            className="px-4 py-2 rounded-xl bg-rose-600 text-xs font-bold text-white hover:bg-rose-700 shadow-md cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"courses" | "registrations" | "countdown">("courses");

  const {
    settings,
    activeTerm,
    savingTerm,
    termSuccessMsg,
    settingsSuccessMsg,
    settingsErrorMsg,
    loadSettings,
    handleUpdateSettings,
    handleUpdateActiveTerm,
  } = useAdminSettings();

  const {
    courses,
    loadingCourses,
    courseSearch,
    setCourseSearch,
    courseTermFilter,
    setCourseTermFilter,
    editingCourse,
    setEditingCourse,
    isCreatingCourse,
    setIsCreatingCourse,
    deleteConfirmId,
    setDeleteConfirmId,
    courseForm,
    setCourseForm,
    loadCourses,
    openEditCourse,
    openCreateCourse,
    handleSaveCourse,
    toggleActive,
    handleDeleteCourse,
  } = useAdminCourses();

  const {
    registrations,
    loadingRegs,
    selectedReg,
    setSelectedReg,
    loadRegistrations,
    handleUpdateRegStatus,
  } = useAdminRegistrations();

  // Verify Admin Session on mount and fetch initial data
  useEffect(() => {
    async function init() {
      try {
        const res = await fetch("/api/admin/check");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        setAuthenticated(true);
        loadSettings();
        loadCourses();
        loadRegistrations();
      } catch {
        router.push("/admin/login");
      }
    }
    init();
  }, [router, loadSettings, loadCourses, loadRegistrations]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">
        Verifying administrator session...
      </div>
    );
  }

  const filteredCourses = courses.filter((c) =>
    matchesCourseFilter(c, courseTermFilter, courseSearch),
  );

  const totalTuitionSum = registrations.reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
      <AdminTopHeader onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 space-y-8 w-full">
        <AdminMetricsCards
          courses={courses}
          registrations={registrations}
          totalTuitionSum={totalTuitionSum}
          activeTerm={activeTerm}
        />

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 flex items-center gap-4 flex-wrap">
          <button
            onClick={() => setActiveTab("courses")}
            className={`pb-3 text-sm font-black transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === "courses"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course Management ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("registrations")}
            className={`pb-3 text-sm font-black transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === "registrations"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Registrations ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("countdown")}
            className={`pb-3 text-sm font-black transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === "countdown"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>Upcoming Term &amp; Countdown</span>
          </button>
        </div>

        {/* TAB 1: COURSES MANAGEMENT */}
        {activeTab === "courses" && (
          <CoursesTabSection
            activeTerm={activeTerm}
            savingTerm={savingTerm}
            termSuccessMsg={termSuccessMsg}
            handleUpdateActiveTerm={handleUpdateActiveTerm}
            onOpenCountdownSettings={() => setActiveTab("countdown")}
            courseSearch={courseSearch}
            setCourseSearch={setCourseSearch}
            courseTermFilter={courseTermFilter}
            setCourseTermFilter={setCourseTermFilter}
            openCreateCourse={openCreateCourse}
            filteredCourses={filteredCourses}
            loadingCourses={loadingCourses}
            toggleActive={toggleActive}
            openEditCourse={openEditCourse}
            setDeleteConfirmId={(id) => setDeleteConfirmId(id)}
          />
        )}

        {/* TAB 2: STUDENT REGISTRATIONS */}
        {activeTab === "registrations" && (
          <div className="space-y-6">
            <RegistrationsTable
              registrations={registrations}
              loadingRegs={loadingRegs}
              onUpdateRegStatus={handleUpdateRegStatus}
              onSelectReg={(reg) => setSelectedReg(reg)}
            />
          </div>
        )}

        {/* TAB 3: UPCOMING TERM & COUNTDOWN CONFIGURATION */}
        {activeTab === "countdown" && (
          <CountdownConfigTab
            settings={settings}
            savingSettings={savingTerm}
            settingsSuccessMsg={settingsSuccessMsg}
            settingsErrorMsg={settingsErrorMsg}
            onSaveSettings={handleUpdateSettings}
          />
        )}
      </main>

      {/* COURSE CREATE / EDIT MODAL */}
      {(editingCourse || isCreatingCourse) && (
        <CourseFormModal
          editingCourse={editingCourse}
          courseForm={courseForm}
          setCourseForm={setCourseForm}
          onClose={() => {
            setEditingCourse(null);
            setIsCreatingCourse(false);
          }}
          onSaveCourse={handleSaveCourse}
        />
      )}

      {/* REGISTRATION DETAILS MODAL */}
      {selectedReg && (
        <RegistrationDetailsModal selectedReg={selectedReg} onClose={() => setSelectedReg(null)} />
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <DeleteConfirmModal
          deleteConfirmId={deleteConfirmId}
          onCancel={() => setDeleteConfirmId(null)}
          onConfirmDelete={handleDeleteCourse}
        />
      )}
    </div>
  );
}
