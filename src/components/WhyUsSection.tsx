import React from "react";
import { Target, Sparkles, Brain, CheckCircle2, MapPin } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    color: "bg-rose-500 text-white",
    title: "Understanding Over Memorization",
    desc: "Students learn where formulas originate, dissecting geometric proofs and algebraic invariants instead of blind rote drilling.",
  },
  {
    icon: Target,
    color: "bg-blue-600 text-white",
    title: "Contest & Olympiad Pedagogy",
    desc: "Preparation tailored for AMC 8/10/12, AIME, and MathCounts with structured heuristic approaches to non-routine problems.",
  },
  {
    icon: MapPin,
    color: "bg-amber-500 text-white",
    title: "100% In-Person Learning",
    desc: "All courses are held strictly in-person in physical classrooms capped at 6–10 students, maximizing face-to-face chalkboard discussion and individualized attention.",
  },
  {
    icon: Sparkles,
    color: "bg-emerald-500 text-white",
    title: "Curriculum-Aligned Support",
    desc: "Direct bridge between school honor courses (Algebra 1/2, Geometry) and advanced university-level mathematical thinking.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 px-4 sm:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>The MathPillar Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Learn With Us?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We don’t teach math as a checklist of procedures. We cultivate mathematicians who think
            critically, enjoy challenge, and thrive under rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-slate-900 text-lg">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
