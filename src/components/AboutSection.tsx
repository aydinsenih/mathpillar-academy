import React from "react";
import Link from "next/link";
import { Sparkles, Compass, Lightbulb, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Top Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-100">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>About MathPillar Academy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Where Math Takes Shape.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            At MathPillar Academy, we believe mathematics is not a set of rigid rules to memorize,
            but a living language of structure, symmetry, and reason. We guide young minds to see
            the geometry of ideas and construct mathematical intuition that lasts a lifetime.
          </p>
        </div>

        {/* Narrative & Visual Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Our Educational Philosophy */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 space-y-5 flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Understanding Over Drilling</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Traditional education frequently rushes to worksheets and formula memorization. At
                MathPillar, students investigate the &quot;why&quot; before the
                &quot;how&quot;—dissecting Euclidean axioms, exploring algebraic symmetries, and
                proving statements from first principles.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/60 text-xs font-bold text-blue-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Rigorous proof-based foundations</span>
            </div>
          </div>

          {/* Card 2: 100% In-Person Synergy */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 space-y-5 flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">The Power of the Chalkboard</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Online split-screens cannot replicate the energy of face-to-face mathematical
                dialogue. In our physical academy classrooms capped at 6–10 students, children write
                their derivations on the whiteboard, receive live feedback, and inspire each other.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/60 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Strictly in-person (No screen fatigue)</span>
            </div>
          </div>

          {/* Card 3: Competition & Academic Bridge */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 space-y-5 flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">From School to Olympiads</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether strengthening high school Honors Algebra and Geometry grades or training for
                AMC 8, AMC 10/12, and AIME competitions, our curriculum adapts to bring each student
                to their highest level of intellectual confidence.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/60 text-xs font-bold text-rose-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <span>Mentored by Olympiad faculty & authors</span>
            </div>
          </div>
        </div>

        {/* Founder & Mission Highlight Box */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              Our Commitment to Parents
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              We nurture confident problem solvers who never fear a challenging question.
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Every parent wants their child to enjoy learning and build resilience. When a student
              understands how mathematical patterns emerge, anxiety transforms into excitement. That
              is why parents choose MathPillar Academy—we shape thinkers who can tackle any problem
              in STEM and beyond.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md"
              >
                <span>Explore Course Offerings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                <span>Apply to Course</span>
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 text-white/5 font-mono text-9xl font-black select-none pointer-events-none pr-8 pb-4">
            ∫dx
          </div>
        </div>
      </div>
    </section>
  );
}
