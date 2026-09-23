import React from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Car,
  ShieldCheck,
  Building2,
  CalendarCheck,
} from "lucide-react";

export default function LocationSection() {
  return (
    <section id="location" className="py-20 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Our Campus & Classrooms</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Where We Are? / Academy Location
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            All MathPillar Academy courses are held 100% in-person at our physical learning
            facility. Designed purposefully for distraction-free focus, lively chalkboard problem
            solving, and small cohort collaboration.
          </p>
        </div>

        {/* Main Location Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Campus Details & Facilities */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    MathPillar Academy Main Campus
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    Physical Classroom Learning Hub
                  </p>
                </div>
              </div>

              {/* Key Campus Standards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="bg-slate-50 rounded-2xl p-4 space-y-1.5 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-900 font-black">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Dedicated Boardwork Rooms</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    Spacious whiteboards and chalkboards for active problem deduction and peer
                    presentations.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 space-y-1.5 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-900 font-black">
                    <Car className="w-4 h-4 text-blue-600" />
                    <span>Parent Parking & Drop-Off</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    Convenient private parking lot with dedicated, secure curbside drop-off and
                    pick-up lane.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 space-y-1.5 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-900 font-black">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Academy Cohort Hours</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    Weekday evenings (5:00 PM – 8:30 PM CT) and Saturday intensives (9:00 AM – 3:00
                    PM CT).
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 space-y-1.5 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-900 font-black">
                    <CalendarCheck className="w-4 h-4 text-rose-600" />
                    <span>Campus Visit by Appointment</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    Parents and prospective students are welcome to tour the classrooms and meet
                    instructors.
                  </p>
                </div>
              </div>

              {/* Direct In-Person Notice */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-black text-emerald-900 block mb-0.5">
                    100% In-Person Learning Commitment:
                  </span>
                  To preserve the maximum educational benefit of teacher-student whiteboard
                  interaction, MathPillar does not host remote or Zoom sessions. All enrolled
                  students attend on campus.
                </div>
              </div>
            </div>

            {/* Quick Contact Line */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4 text-slate-600">
                <a
                  href="mailto:info@mathpillar.com"
                  className="flex items-center gap-1.5 hover:text-blue-600 font-semibold"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>info@mathpillar.com</span>
                </a>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Direct Advisor Inquiries</span>
                </span>
              </div>

              <Link
                href="/register"
                className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
              >
                Apply to Course
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Location & Campus Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden border border-slate-800">
            <div className="space-y-4 relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/40">
                Physical Campus Visit
              </div>

              <h3 className="text-2xl font-black tracking-tight text-white">Visit Our Academy</h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Step inside our classrooms to see where mathematical concepts come alive. We are
                conveniently situated in a safe, parent-friendly commercial campus with ample
                parking.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Campus Location</span>
                    <span className="text-slate-300">
                      MathPillar Academy Classrooms & Learning Labs
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Office & Diagnostic Hours</span>
                    <span className="text-slate-300">
                      Monday – Saturday, by appointment for parent consultations
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Safety Protocol</span>
                    <span className="text-slate-300">
                      Supervised entry & secure pickup for all student cohorts
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 relative z-10 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="mailto:info@mathpillar.com?subject=MathPillar%20Academy%20Location%20and%20Campus%20Visit"
                className="w-full text-center py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md"
              >
                Schedule a Campus Visit
              </a>
              <Link
                href="/courses"
                className="w-full text-center py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
              >
                View In-Person Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
