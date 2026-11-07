import React from 'react';
import { ArrowRight, ArrowUpRight, Award, BrainCircuit, CheckCircle2, Clock3, Fingerprint, ShieldCheck, TerminalSquare, UsersRound, Wrench } from 'lucide-react';
import { SUMMER_INTERNSHIP_PATH, WINTER_INTERNSHIP_PATH } from '../routes';
import ScrollReveal from '../components/ScrollReveal';

const speakerAreas = [
  { title: 'Cybersecurity Researchers', detail: 'Learn security concepts, threat intelligence, and practical investigation methods.', icon: BrainCircuit },
  { title: 'Ethical Hacking Practitioners', detail: 'Explore offensive security techniques through guided, hands-on learning.', icon: TerminalSquare },
  { title: 'Cybercrime Investigation Advisors', detail: 'Understand digital evidence, investigation workflows, and cyber law in practice.', icon: Fingerprint }
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">{eyebrow}</p>
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>
    </div>
  );
}

export default function ProgramsHomePage({ onNavigate, onOpenRegister }) {
  return (
    <main className="flex-1 overflow-hidden bg-white text-slate-900">
      <ScrollReveal>
        <section className="relative overflow-hidden bg-white pb-20 pt-36 sm:pb-28 sm:pt-44">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 cyber-grid opacity-40" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-16 h-96 w-96 rounded-full bg-cyan-100/70 blur-[100px]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
            <div className="lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold tracking-wide text-emerald-800 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Current program · Winter Internship 2026
              </div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-800">Cyber Shakti Foundation</p>
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
                Build a career in
                <span className="mt-1 block text-cyan-700">cybersecurity.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Learn to investigate, defend, and secure digital systems through practical training designed for aspiring cybersecurity professionals.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => onNavigate(WINTER_INTERNSHIP_PATH)} className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-cyan-800">
                  Explore current internship <ArrowRight className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => onNavigate(WINTER_INTERNSHIP_PATH, 'details')} className="rounded-lg border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50">
                  View learning agenda
                </button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-cyan-700" /> 28 days</span>
                <span className="inline-flex items-center gap-2"><Wrench className="h-4 w-4 text-cyan-700" /> Hands-on labs</span>
                <span className="inline-flex items-center gap-2"><Award className="h-4 w-4 text-cyan-700" /> Certificate</span>
              </div>
            </div>

            <aside className="relative lg:col-span-5">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-100 to-blue-50 blur-2xl" />
              <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,.12)] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-800">Now running</p>
                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Winter Internship</h2>
                    <p className="mt-1 text-sm font-medium text-slate-500">2026 · 28-day program</p>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-800"><ShieldCheck className="h-6 w-6" /></span>
                </div>
                <div className="my-6 h-px bg-slate-200" />
                <p className="text-sm font-semibold text-slate-700">A practical path through:</p>
                <ul className="mt-4 space-y-3">
                  {['Digital forensics & investigation', 'Ethical hacking & OSINT', 'SOC defense & threat hunting', 'Cyber law, privacy & capstone'].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{item}</li>
                  ))}
                </ul>
                <button type="button" onClick={() => onOpenRegister()} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-700 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-cyan-800">
                  Register now <ArrowRight className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => onNavigate(SUMMER_INTERNSHIP_PATH)} className="mt-3 inline-flex w-full items-center justify-center gap-1 py-2 text-sm font-semibold text-slate-500 transition-colors hover:text-cyan-800">
                  View our first Summer Internship <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </aside>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="speakers" className="scroll-mt-28 border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Speakers & Mentors"
              title="Learn from cybersecurity practitioners"
              description="The internship includes expert guidance and practical sessions across investigation, offensive security, and cyber defense."
            />
            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
              {speakerAreas.map(({ title, detail, icon: Icon }) => (
                <article key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{detail}</p>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-center text-xs text-slate-500">Expert sessions support the internship’s practical labs, threat investigations, and capstone work.</p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="register" className="scroll-mt-28 bg-[#040711] py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-7 text-center shadow-sm sm:p-12">
              <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-mono uppercase tracking-wider text-cyan-200"><CheckCircle2 className="h-3.5 w-3.5" /> Current Winter Internship</span>
                <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">Ready to start your cyber career?</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">Explore the current 28-day program or begin your registration for the Winter Internship 2026.</p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => onOpenRegister()} className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-300">Register Now <ArrowRight className="h-4 w-4" /></button>
                  <button type="button" onClick={() => onNavigate(WINTER_INTERNSHIP_PATH)} className="rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-300 hover:bg-slate-800/70">Explore full internship</button>
                </div>
                <p className="mt-5 inline-flex items-center gap-2 text-xs text-slate-500"><UsersRound className="h-4 w-4" /> Guided learning, practical labs, and a capstone project</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
