import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, UsersRound } from 'lucide-react';
import { SPEAKERS } from '../data/speakers';
import ScrollReveal from './ScrollReveal';

type SpeakersPageProps = {
  onNavigate: (path: string) => void;
  onOpenRegister: () => void;
};

export default function SpeakersPage({ onNavigate, onOpenRegister }: SpeakersPageProps) {
  return (
    <main className="relative isolate flex-1 overflow-hidden bg-[#06162a] pb-20 pt-28 text-white sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 cyber-grid opacity-50" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-28 -z-10 h-[34rem] w-[34rem] rounded-full bg-sky-600/15 blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-[42rem] -z-10 h-[32rem] w-[32rem] rounded-full bg-blue-700/10 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <header className="mx-auto max-w-4xl pb-14 text-center sm:pb-16">
            <button type="button" onClick={() => onNavigate('/')} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-sky-400/40 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to home
            </button>
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/25 bg-sky-400/10 text-sky-300"><UsersRound className="h-6 w-6" /></div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-400">Mentors &amp; speakers</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.05em] text-white sm:text-6xl">Meet all 46 industry experts.</h1>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              Meet the defence veterans, cybersecurity practitioners, forensic specialists, law-enforcement professionals, and educators bringing their experience to the program.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[#0a2038] px-4 py-2 text-xs font-semibold text-slate-300"><ShieldCheck className="h-4 w-4 text-emerald-400" /> 46 featured mentors and speakers</div>
          </header>
        </ScrollReveal>

        <ScrollReveal>
          <section aria-label="Mentors and speakers" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SPEAKERS.map((speaker, index) => (
              <article key={speaker.name} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0a2038] transition duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-[0_18px_50px_rgba(2,132,199,.12)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1727]">
                  <img src={speaker.image} alt={speaker.name} loading={index < 8 ? 'eager' : 'lazy'} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#071a30]/55 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-[#06162a]/80 px-2.5 py-1 font-mono text-[10px] text-slate-300 backdrop-blur">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h2 className="text-base font-bold leading-snug text-white">{speaker.name}</h2>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{speaker.bio}</p>
                </div>
              </article>
            ))}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-sky-500/20 bg-gradient-to-br from-[#0b2542] to-[#07172b] p-6 sm:mt-20 sm:flex-row sm:items-center sm:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">Learn with the experts</p>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Build practical cybersecurity skills.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Explore the internship program and its hands-on learning tracks.</p>
            </div>
            <button type="button" onClick={onOpenRegister} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500">Explore the program <ArrowRight className="h-4 w-4" /></button>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}
