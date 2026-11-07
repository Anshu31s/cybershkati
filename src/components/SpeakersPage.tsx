import React, { useState, useMemo } from 'react';
import { ArrowRight, ShieldCheck, UsersRound, Search } from 'lucide-react';
import { SPEAKERS } from '../data/speakers';
import ScrollReveal from './ScrollReveal';

type SpeakersPageProps = {
  onOpenRegister: () => void;
};

export default function SpeakersPage({ onOpenRegister }: SpeakersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpeakers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SPEAKERS;
    return SPEAKERS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.bio.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <main className="relative isolate flex-1 overflow-hidden bg-[#03060d] pb-20 pt-28 text-white sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 cyber-grid opacity-25" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-28 -z-10 h-[34rem] w-[34rem] rounded-full bg-sky-600/10 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <header className="mx-auto max-w-4xl pb-8 text-center sm:pb-10">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-white/[0.035] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-sky-300">
              <UsersRound className="h-4 w-4" /> Global knowledge share
            </div>
            <h1 className="mt-6 text-4xl font-black uppercase leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl">
              Distinguished <span className="text-sky-400">Speakers</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-sm font-medium leading-7 text-slate-300 sm:text-base sm:leading-8">
              Meet the {SPEAKERS.length} visionaries, defence leaders, cyber crime investigators, and industry practitioners empowering our internship cohorts.
            </p>

            {/* Quick search input */}
            <div className="relative mx-auto mt-6 max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, role, or domain..."
                aria-label="Search speakers"
                className="w-full rounded-full border border-slate-800 bg-[#0c1017]/90 py-2.5 pl-10 pr-14 text-xs font-medium text-white placeholder-slate-500 shadow-inner backdrop-blur focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 transition hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </header>
        </ScrollReveal>

        {/* Speaker cards render immediately with zero hydration delay */}
        <section aria-label="Distinguished speakers" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSpeakers.map((speaker, index) => (
            <article
              key={speaker.name}
              className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-slate-800/90 bg-[#101116] p-3.5 transition duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-[0_18px_50px_rgba(2,132,199,.12)] sm:p-4"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-[#0b1019]">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  width={550}
                  height={412}
                  decoding="async"
                  loading={index < 6 ? 'eager' : 'lazy'}
                  fetchPriority={index < 4 ? 'high' : 'auto'}
                  className="h-full w-full object-cover object-[center_62%] transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                <h2 className="text-lg font-extrabold leading-snug text-white">{speaker.name}</h2>
                <p className="mt-2 text-[11px] font-semibold uppercase leading-[1.65] tracking-[0.035em] text-sky-400">
                  {speaker.bio}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-sky-400" /> Expert Speaker
                </div>
              </div>
            </article>
          ))}
        </section>

        {filteredSpeakers.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            <p className="text-base font-medium">No speakers found matching &quot;{searchQuery}&quot;</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs font-semibold text-sky-400 hover:underline"
            >
              Show all {SPEAKERS.length} speakers
            </button>
          </div>
        )}

        <ScrollReveal>
          <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-sky-500/20 bg-gradient-to-br from-[#0b2542] to-[#07172b] p-6 sm:mt-20 sm:flex-row sm:items-center sm:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">Learn with the experts</p>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Join the next expert session.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Explore the internship program and its hands-on learning tracks.</p>
            </div>
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Enroll now <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}
