import React from 'react';
import { ArrowLeft, Brain, BriefcaseBusiness, Layers3, ScrollText, Wrench } from 'lucide-react';

const highlights = [
  { icon: ScrollText, label: 'Internship certificate with hard copy delivery' },
  { icon: Wrench, label: 'Hands-on training' },
  { icon: BriefcaseBusiness, label: 'Industry exposure and real-world scenarios' },
  { icon: Brain, label: 'Project-based learning' },
  { icon: Layers3, label: 'Expert-led sessions' }
];

export default function SummerInternshipPage({ onBackHome }) {
  return (
    <main className="relative min-h-[75vh] flex-1 overflow-hidden bg-[#050711] pb-24 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,rgba(99,102,241,.35)_1px,transparent_1px),linear-gradient(120deg,transparent_48%,rgba(59,130,246,.12)_49%,transparent_50%)] [background-size:42px_42px,220px_220px]" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-64 w-[min(80vw,48rem)] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={onBackHome} className="mb-12 inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-300 transition-colors hover:border-slate-500 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to internship programs
        </button>

        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
            Cyber Shakti's First Internship · Completed
          </span>
          <h1 className="mt-7 text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
            45-Day Summer
            <span className="mt-2 block bg-gradient-to-r from-fuchsia-300 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              Internship
            </span>
          </h1>
          <p className="mt-4 text-lg font-bold uppercase tracking-[0.2em] text-blue-400 sm:text-2xl">Cyber Shakti Foundation · First Program</p>
          <p className="mt-5 text-sm tracking-[0.18em] text-slate-300 sm:text-base">Learn. Hack. Defend. Lead.</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {highlights.map(({ icon: Icon, label }) => (
            <article key={label} className="flex min-h-40 flex-col items-center justify-center gap-4 rounded-xl border border-violet-400/25 bg-slate-900/80 p-5 text-center shadow-[0_12px_35px_rgba(0,0,0,.2)] transition-colors hover:border-violet-300/50 hover:bg-slate-900">
              <Icon aria-hidden="true" className="h-7 w-7 text-violet-300" strokeWidth={1.8} />
              <h2 className="text-sm font-semibold leading-relaxed text-slate-100">{label}</h2>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
          This 45-day Summer Internship is a completed program. Explore the current Winter Internship from the Internship menu.
        </p>
      </div>
    </main>
  );
}
