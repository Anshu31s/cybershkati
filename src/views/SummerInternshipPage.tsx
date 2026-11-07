import React from 'react';
import {
  ArrowLeft, BrainCircuit, BriefcaseBusiness, Check,
  ChevronRight, Globe2, Mail, MapPin, Network, Phone, ScrollText,
  ShieldCheck, Smartphone, Wrench,
} from 'lucide-react';

const benefits = [
  { icon: ScrollText, title: 'Internship Certificate', detail: 'with Hard Copy Delivery' },
  { icon: Wrench, title: 'Hands-on Training' },
  { icon: BriefcaseBusiness, title: 'Industry Exposure &', detail: 'Real-World Scenarios' },
  { icon: BrainCircuit, title: 'Project-Based Learning' },
  { icon: Check, title: 'Expert-led Sessions' },
];

const tracks = [
  { icon: BrainCircuit, title: 'AI in Cyber Security' },
  { icon: ShieldCheck, title: 'Ethical Hacking & Pentesting' },
  { icon: Network, title: 'Malware Analysis' },
  { icon: Network, title: 'Network Forensics' },
  { icon: Smartphone, title: 'Mobile Forensics' },
  { icon: ScrollText, title: 'Forensics & Digital Forensics' },
  { icon: Globe2, title: 'Cryptocurrency & Dark Web' },
  { icon: Globe2, title: 'Web Application Security' },
  { icon: Globe2, title: 'OSINT Investigation' },
  { icon: ShieldCheck, title: 'Security Operations Center' },
  { icon: ScrollText, title: 'Cyber Law & Investigation' },
];

const fees = [
  ['1 - 25 Students', '₹499'],
  ['26 - 100 Students', '₹999'],
  ['101 - 200 Students', '₹1499'],
  ['201 - 500 Students', '₹1999'],
  ['501 - 750 Students', '₹2499'],
  ['751 - 1000+ Students', '₹2999'],
];

export default function SummerInternshipPage({ onBackHome }) {
  return (
    <main className="relative flex-1 overflow-hidden bg-[#080916] pb-24 pt-28 text-white sm:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,.24),transparent_55%),radial-gradient(ellipse_at_5%_38%,rgba(14,165,233,.12),transparent_38%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={onBackHome} className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-violet-300/50 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to internship programs
        </button>

        <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-12 text-center sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_18%_22%,rgba(139,92,246,.8)_1px,transparent_2px),radial-gradient(circle_at_74%_8%,rgba(59,130,246,.5)_1px,transparent_2px),linear-gradient(65deg,transparent_49.8%,rgba(59,130,246,.12)_50%,transparent_50.2%),linear-gradient(130deg,transparent_49.8%,rgba(139,92,246,.1)_50%,transparent_50.2%)] [background-size:360px_220px,440px_260px,270px_220px,330px_240px]" />
          <div className="relative">
            <p className="text-5xl font-black uppercase leading-none tracking-tight text-white sm:text-7xl md:text-8xl">45 Day&apos;s</p>
            <h1 className="mt-1 text-4xl font-black uppercase leading-none tracking-[-.045em] text-violet-300 [text-shadow:0_0_8px_rgba(192,132,252,.95),0_0_24px_rgba(168,85,247,.85),0_0_44px_rgba(147,51,234,.55)] sm:text-7xl md:text-8xl">Cyber Shakti</h1>
            <p className="mt-4 text-lg font-black uppercase tracking-[.14em] text-blue-500 [text-shadow:0_0_18px_rgba(59,130,246,.42)] sm:text-3xl sm:tracking-[.2em]">Internship Program 2.0</p>
            <p className="mt-5 text-sm font-semibold tracking-[.18em] text-slate-300 sm:text-xl sm:tracking-[.24em]">Learn. Hack. Defend. Lead.</p>
          </div>
          <p className="mx-auto mt-8 max-w-6xl rounded-[28px] border border-violet-400/30 bg-[#090914]/90 px-6 py-7 text-base font-semibold leading-relaxed text-slate-100 shadow-[0_18px_55px_rgba(0,0,0,.28)] sm:px-12 sm:py-9 sm:text-xl sm:leading-[1.9]">
            Kickstart your cybersecurity journey with our 45-Day Advanced Cybersecurity Internship Program, designed to equip you with real-world skills, hands-on experience, and industry exposure. Whether you&apos;re a beginner or an aspiring security professional, this program bridges the gap between theory and practice.
          </p>
        </section>

        <section aria-label="Internship benefits" className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map(({ icon: Icon, title, detail }) => (
            <article key={title} className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-violet-300/20 bg-slate-900/70 p-6 text-center shadow-[0_16px_50px_rgba(0,0,0,.18)] backdrop-blur transition hover:-translate-y-1 hover:border-violet-300/50">
              <Icon aria-hidden="true" className="mb-4 h-8 w-8 text-violet-300" strokeWidth={1.7} />
              <h2 className="text-sm font-bold leading-relaxed text-white">{title}{detail && <><br />{detail}</>}</h2>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-24 max-w-6xl" aria-labelledby="program-highlights">
          <div className="mb-9 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-violet-300">Learn by doing</p>
            <h2 id="program-highlights" className="text-3xl font-black uppercase tracking-tight sm:text-4xl">Program Highlights</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map(({ icon: Icon, title }, index) => (
              <article key={title} className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[.04] p-4 transition hover:border-violet-300/40 hover:bg-violet-400/[.08]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                <h3 className="flex-1 font-semibold text-slate-100">{title}</h3>
                <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, '0')}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-900/65 p-6 sm:p-9">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-violet-300">Program pricing</p>
            <h2 className="mb-7 text-2xl font-black uppercase sm:text-3xl">Registration Fee Structure</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-2 bg-violet-400/15 px-5 py-4 text-sm font-bold text-violet-100"><span>Participants</span><span className="text-right">Price (₹)</span></div>
              {fees.map(([students, price]) => <div key={students} className="grid grid-cols-2 border-t border-white/[.07] px-5 py-4 text-sm text-slate-200"><span>{students}</span><span className="text-right font-bold text-white">{price}</span></div>)}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/15 to-slate-900/80 p-6 sm:p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-violet-200">📅 &nbsp;Application period</p>
              <h2 className="text-2xl font-black sm:text-3xl">1 May – 03 June, 2026</h2>
              <div className="mt-7 inline-flex items-center gap-2 rounded-lg border border-rose-300/30 bg-rose-400/10 px-5 py-3 font-bold uppercase tracking-[.12em] text-rose-200">
                Registration Closed
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-400">The application period has ended. Contact Cyber Shakti for upcoming program information.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/65 p-6 sm:p-8">
              <h2 className="mb-5 text-lg font-extrabold uppercase tracking-wide">Get in touch</h2>
              <div className="space-y-4 text-sm text-slate-300">
                <a className="flex items-center gap-3 hover:text-white" href="tel:+918265826529"><Phone className="h-4 w-4 text-violet-300" /> +91 8265826529</a>
                <a className="flex items-center gap-3 hover:text-white" href="tel:+918265826528"><Phone className="h-4 w-4 text-violet-300" /> +91 8265826528</a>
                <a className="flex items-center gap-3 hover:text-white" href="mailto:info@cybershaktifoundation.org"><Mail className="h-4 w-4 text-violet-300" /> info@cybershaktifoundation.org</a>
                <a className="flex items-center gap-3 hover:text-white" href="mailto:info@crimexintelligence.com"><Mail className="h-4 w-4 text-violet-300" /> info@crimexintelligence.com</a>
                <a className="flex items-center gap-3 hover:text-white" href="https://cybershaktifoundation.org" target="_blank" rel="noreferrer"><Globe2 className="h-4 w-4 text-violet-300" /> cybershaktifoundation.org <ChevronRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </section>

        <p className="mx-auto mt-14 flex max-w-3xl items-center justify-center gap-2 text-center text-sm leading-7 text-slate-400"><MapPin className="h-4 w-4 shrink-0 text-violet-300" /> Empowering the next generation of cybersecurity experts through hands-on internships and real-world projects. Join us in securing the digital frontier.</p>
      </div>
    </main>
  );
}
