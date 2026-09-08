import Link from "next/link";
import { ArrowRight, CheckCircle2, BookOpen, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white pt-16 pb-24 sm:pt-20 sm:pb-32">
      {/* Background Math Particle Grid & Glows */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl font-mono select-none">∑</div>
        <div className="absolute top-40 right-20 text-7xl font-mono select-none">∫</div>
        <div className="absolute bottom-20 left-1/4 text-5xl font-mono select-none">√x</div>
        <div className="absolute top-1/3 right-1/3 text-6xl font-mono select-none">π</div>
        <div className="absolute bottom-10 right-10 text-6xl font-mono select-none">Δy</div>
      </div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6 text-center flex flex-col items-center">
          {/* Headlines & CTAs */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold backdrop-blur-sm shadow-inner">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>100% In-Person Learning · On-Campus Classrooms</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            In-Person Math.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-pink-300">
              Real Engagement.
            </span>
            <br />
            Fulfill Your Potential.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            All MathPillar courses are strictly in-person with hands-on chalkboard problem
            solving. From foundational fluency to honors geometry proofs and AMC contest prep,
            students collaborate face-to-face with expert faculty.
          </p>

          {/* Value Checkpoints */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">In-Person Only (No Online)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Small Physical Cohorts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>PhD & Master Faculty</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-102"
            >
              <BookOpen className="w-5 h-5" />
              <span>View Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-lg shadow-rose-600/30 transition-all hover:scale-102"
            >
              <span>Register Now</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
