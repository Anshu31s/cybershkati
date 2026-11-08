import React from 'react';
import {
  Activity, ArrowRight, ArrowUpRight, Award, BadgeCheck, BrainCircuit,
  BriefcaseBusiness, CalendarDays, CheckCircle2, Clock3, Cpu, Fingerprint,
  GraduationCap, Monitor, Network, ShieldCheck, Target, TerminalSquare,
  UsersRound, Wifi,
} from 'lucide-react';
import { WINTER_INTERNSHIP_PATH, SPEAKERS_PATH } from '../routes';
import ScrollReveal from '../components/ScrollReveal';
import MatrixRain from '../components/MatrixRain';
import WinterPromoModal from '../components/WinterPromoModal';

const learningAreas = [
  { title: 'Cybersecurity Researchers', detail: 'Build practical skills in security analysis, threat intelligence, and investigation.', icon: BrainCircuit },
  { title: 'Ethical Hacking Practitioners', detail: 'Explore ethical testing methods through guided, hands-on labs.', icon: TerminalSquare },
  { title: 'Digital Forensics', detail: 'Learn evidence handling, forensic workflows, and cyber law in practice.', icon: Fingerprint },
];

const journeySteps = [
  ['01', 'Learn through', 'practical scenarios'],
  ['02', 'Explore specialist', 'learning tracks'],
  ['03', 'Build job-relevant', 'skills'],
  ['04', 'Work towards a', 'verifiable credential'],
];

const impactMetrics = [
  { value: '25,000+', label: 'Law enforcement & cybersecurity professionals trained', icon: ShieldCheck, tone: 'text-sky-400' },
  { value: '500+', label: 'Awareness programs, technical workshops & sessions', icon: TerminalSquare, tone: 'text-sky-400' },
  { value: '350+', label: 'National & international speakers and subject experts', icon: UsersRound, tone: 'text-violet-400' },
  { value: '94%', label: 'Satisfaction rate of learners and course participants', icon: Award, tone: 'text-emerald-400' },
  { value: '100%', label: 'CSA practical impact and outcomes delivered', icon: Activity, tone: 'text-sky-300' },
];

const mouBenefits = [
  { text: 'Establishment of a Cybersecurity Centre of Excellence (CoE)', icon: ShieldCheck },
  { text: 'Expert-Led Training Programs', icon: Monitor },
  { text: 'Industry Certification Courses', icon: BadgeCheck },
  { text: 'Internship & Live Project Opportunities', icon: BriefcaseBusiness },
  { text: 'Research & Innovation Collaboration', icon: Cpu },
  { text: 'Faculty Development Programs (FDPs)', icon: GraduationCap },
  { text: 'Placement & Career Readiness Support', icon: Award },
  { text: 'Hands-on Learning in Cybersecurity, Forensics & AI Security', icon: TerminalSquare },
];

const partners = [
  { name: 'Cyber Security Council', url: 'https://cybersecuritycouncil.in/', image: '/partners/pt-cyber-security-council.png' },
  { name: 'Cyber Frat', url: 'https://cyberfrat.com/', image: '/partners/pt-cyber-frat.png' },
  { name: 'CSAI Association of India', url: 'https://www.ncsai.in/', image: '/partners/pt-csai-association-of-india.png' },
  { name: 'Virtual Cyber Labs', url: 'https://virtualcyberlabs.com/', image: '/partners/pt-virtual-cyber-labs.png' },
  { name: 'Future Crime / FCRF', url: 'https://futurecrime.org/', image: '/partners/pt-future-crime-fcrf.webp' },
  { name: 'TEMA Telecom Association', url: 'https://www.tematelecom.in/', image: '/partners/pt-tema-telecom-association.png' },
  { name: 'CMAI Association', url: 'https://www.cmai.asia/', image: '/partners/pt-cmai-association.jpg' },
  { name: 'M Cyber Academy', url: 'https://mcyberacademy.in/', image: '/partners/pt-m-cyber-academy.png' },
  { name: 'Unique Infosolution', url: 'https://uniqueinfosolution.com/', image: '/partners/pt-unique-infosolution.png' },
  { name: 'BSides Noida', url: 'https://bsidesnoida.in/', image: '/partners/pt-bsides-noida.jpeg' },
  { name: 'BSides Jaipur', url: 'https://bsidesjaipur.in/', image: '/partners/pt-bsides-jaipur.png' },
  { name: 'CRACCON', url: 'https://craccon.com/', image: '/partners/pt-craccon.png' },
  { name: 'Pirates', url: 'https://0x0pirates.com/', image: '/partners/pirates-DuHydTHF.png' },
];

export default function ProgramsHomePage({ onNavigate, onOpenRegister }) {
  return (
    <>
    <WinterPromoModal onNavigate={onNavigate} />
    <main className="flex-1 overflow-hidden bg-[#06162a] text-slate-100">
      <ScrollReveal>
        <section className="relative isolate overflow-hidden border-b border-sky-950 bg-[#06162a] pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pt-40">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 cyber-grid opacity-50" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full bg-sky-700/15 blur-[110px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-blue-700/10 blur-[100px]" />
          <MatrixRain />

          <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-12">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-sky-400/25 bg-sky-500/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-sky-300 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
                Winter Internship Program · 2026
              </div>
              <h1 className="text-5xl font-extrabold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.4rem]">
                Build skills.
                <span className="mt-2 block text-sky-400">that Defend the digital world.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Cyber Shakti Winter Internship Program
              </p>
              <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate(WINTER_INTERNSHIP_PATH)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-sky-400/30 bg-sky-500/10 px-4 py-3.5 text-center text-sm font-bold text-sky-300 transition hover:border-sky-400/60 hover:bg-sky-500/20 active:scale-95"
                >
                  Explore Internship
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(WINTER_INTERNSHIP_PATH, 'agenda')}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3.5 text-center text-sm font-bold text-white transition hover:bg-blue-500 active:scale-95"
                >
                  Agenda
                </button>
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3.5 text-center text-sm font-extrabold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 active:scale-95"
                >
                  Register Now <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(SPEAKERS_PATH)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-600 bg-white/[0.02] px-4 py-3.5 text-center text-sm font-bold text-slate-100 transition hover:border-sky-400/60 hover:bg-sky-400/5 active:scale-95"
                >
                  Speakers
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-slate-700/70 pt-6">
                <div className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-sky-400" /><span><span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">Registration closes</span><span className="mt-1 block text-xs font-bold text-white">10 December 2026</span></span></div>
                <div className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-sky-400" /><span><span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">Learning format</span><span className="mt-1 block text-xs font-bold text-white">Online · Live sessions</span></span></div>
                <div className="flex items-center gap-3"><Activity className="h-5 w-5 text-sky-400" /><span><span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">Program focus</span><span className="mt-1 block text-xs font-bold text-white">Hands-on learning</span></span></div>
              </div>
            </div>

            <div className="relative mx-auto flex min-h-[390px] w-full max-w-[620px] items-center justify-center sm:min-h-[480px]">
              <div aria-hidden="true" className="forensic-wave forensic-wave-one absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-500/15" />
              <div aria-hidden="true" className="forensic-wave forensic-wave-two absolute left-1/2 top-1/2 aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/[0.08]" />
              <div aria-hidden="true" className="forensic-orbit absolute left-1/2 top-1/2 aspect-square w-[61%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky-400/15" />
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl sm:h-72 sm:w-72" />
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 600 500" fill="none">
                <path className="forensic-network-lines" d="M24 174 146 112 253 171 370 88 569 145M55 376l129-65 112 60 119-88 132 68M253 171l31 200M370 88l45 195M146 112l38 199" stroke="#1677b9" strokeOpacity=".42" />
                <g fill="#38bdf8"><circle className="forensic-network-node" cx="24" cy="174" r="3"/><circle className="forensic-network-node" cx="146" cy="112" r="3"/><circle className="forensic-network-node" cx="253" cy="171" r="3"/><circle className="forensic-network-node" cx="370" cy="88" r="3"/><circle className="forensic-network-node" cx="569" cy="145" r="3"/><circle className="forensic-network-node" cx="55" cy="376" r="3"/><circle className="forensic-network-node" cx="184" cy="311" r="3"/><circle className="forensic-network-node" cx="296" cy="371" r="3"/><circle className="forensic-network-node" cx="415" cy="283" r="3"/><circle className="forensic-network-node" cx="547" cy="351" r="3"/></g>
              </svg>

              <div className="forensic-panel absolute left-0 top-[13%] z-10 w-52 -rotate-6 overflow-hidden rounded-xl border border-sky-400/25 bg-[#061327]/95 p-4 shadow-2xl shadow-black/40 sm:left-2 sm:w-60">
                <div aria-hidden="true" className="forensic-scanline pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-sky-400/10 to-transparent" />
                <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-sky-400"/><span className="h-1.5 w-1.5 rounded-full bg-sky-400/70"/><span className="h-1.5 w-1.5 rounded-full bg-sky-400/40"/><span className="ml-2 text-[8px] font-bold uppercase tracking-[0.15em] text-slate-500">Threat monitor</span></div>
                <div className="relative mt-4 space-y-2 font-mono text-[9px] text-slate-400"><p className="forensic-log-line">&gt; initialising security scan</p><p className="forensic-log-line">&gt; analysing network traffic</p><p className="forensic-log-line forensic-status-line text-emerald-400">&gt; status: monitoring</p></div>
                <div className="mt-3 flex h-7 items-end gap-1">{[8, 15, 10, 23, 13, 19, 27, 14, 21].map((height, index) => <span key={index} style={{ height, animationDelay: `${index * -0.12}s` }} className="forensic-signal-bar w-2 rounded-t-sm bg-sky-500" />)}</div>
              </div>

              <div className="relative z-[1] flex h-64 w-56 flex-col items-center justify-center text-center sm:h-72 sm:w-64" style={{ clipPath: 'polygon(50% 0%, 95% 17%, 90% 74%, 50% 100%, 10% 74%, 5% 17%)', background: 'linear-gradient(145deg, rgba(14,116,194,.75), rgba(7,35,70,.95))', boxShadow: '0 0 80px rgba(14,165,233,.22)' }}>
                <div className="absolute inset-[2px] flex flex-col items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 95% 17%, 90% 74%, 50% 100%, 10% 74%, 5% 17%)', background: 'linear-gradient(145deg, rgba(9,75,133,.96), rgba(4,25,52,.98))' }}>
                  <ShieldCheck className="forensic-shield h-12 w-12 text-sky-300 drop-shadow-[0_0_18px_rgba(56,189,248,.55)]" />
                  <strong className="mt-1 text-3xl font-black tracking-wide text-sky-200">CSF</strong>
                  <span className="mt-3 text-sm font-extrabold uppercase tracking-[0.18em] text-white">Cyber defence</span>
                  <span className="mt-2 text-[7px] font-bold uppercase tracking-[0.23em] text-sky-300/80">Learn · Investigate · Secure</span>
                </div>
              </div>

              <div className="forensic-panel-secondary absolute bottom-[16%] right-0 z-10 w-48 rotate-6 rounded-xl border border-sky-400/25 bg-[#061327]/95 p-4 shadow-2xl shadow-black/40 sm:right-1 sm:w-52">
                <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-slate-500"><Wifi className="h-3.5 w-3.5 text-sky-400"/>Network activity</div>
                <div className="mt-2 font-mono text-sm font-bold text-slate-100">192.168.1.24</div>
                <p className="mt-1 text-[8px] uppercase tracking-wider text-slate-500">Packets <span className="font-bold text-emerald-400">secure</span></p>
              </div>
              <p className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.22em] text-sky-300/70">Cybersecurity · Digital forensics</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section aria-label="Program journey" className="border-b border-sky-900/60 bg-[#0a2038]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 px-5 py-7 sm:px-8 md:grid-cols-4 lg:px-12">
          {journeySteps.map(([number, first, second], index) => <div key={number} className={`flex items-center gap-4 py-3 md:px-5 ${index > 0 ? 'md:border-l md:border-slate-700' : ''}`}>
            <span className="text-3xl font-extrabold tracking-tight text-sky-400 sm:text-4xl">{number}</span><span className="text-xs leading-5 text-slate-300">{first}<br/>{second}</span>
          </div>)}
        </div>
      </section>

      <ScrollReveal>
        <section className="border-b border-slate-800 bg-[#071a30] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mx-auto mb-12 max-w-3xl text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-400">Mentorship & practice</p><h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Learn from practitioners. Build real skills.</h2><p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">The Winter Internship combines guided expertise with practical sessions across investigation, offensive security, and cyber defense.</p></div>
            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
              {learningAreas.map(({ title, detail, icon: Icon }) => <article key={title} className="rounded-2xl border border-slate-700 bg-[#0a2038] p-6 transition hover:border-sky-500/50"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300"><Icon className="h-5 w-5"/></span><h3 className="mt-5 text-lg font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p></article>)}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section aria-labelledby="national-impact-heading" className="relative isolate overflow-hidden border-b border-slate-800 bg-[#080c16] py-16 sm:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 cyber-grid opacity-25" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,165,233,.08),transparent_46%)]" />
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <header className="mx-auto mb-12 max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/[.08] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-sky-300"><ShieldCheck className="h-3.5 w-3.5" /> National training &amp; defense impact</p>
              <h2 id="national-impact-heading" className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Demonstrated Impact Across India</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Trusted by law enforcement, defense veterans, academic institutions &amp; enterprise teams.</p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {impactMetrics.map(({ value, label, icon: Icon, tone }) => <article key={value} className="rounded-2xl border border-slate-800 bg-[#0b111e]/90 p-5 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-sky-400/25">
                <Icon aria-hidden="true" className={`h-6 w-6 ${tone}`} />
                <p className={`mt-5 text-3xl font-black tracking-tight ${tone}`}>{value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">{label}</p>
              </article>)}
            </div>

            <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1.2fr_.9fr] lg:gap-10">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/[.08] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-sky-300"><GraduationCap className="h-3.5 w-3.5" /> Academic-industry partnership</p>
                <h3 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">MoU Between <span className="text-sky-400">Noida International University</span> &amp; Cyber Shakti Foundation</h3>
                <div className="mt-5 rounded-xl border border-slate-800 border-l-4 border-l-sky-500 bg-[#0b111e] p-5">
                  <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.14em] text-sky-300"><Target className="h-4 w-4" /> Objective</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">To bridge the gap between academic learning and industry requirements through practical cybersecurity education, research, and innovation.</p>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {mouBenefits.map(({ text, icon: Icon }) => <div key={text} className="flex min-h-14 items-center gap-3 rounded-lg border border-slate-800/80 bg-[#0a0f19] px-3.5 py-3 text-sm font-semibold leading-5 text-slate-300"><Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-400" />{text}</div>)}
                </div>
              </div>

              <figure className="overflow-hidden rounded-2xl border border-sky-400/20 bg-[#0b111e] shadow-[0_18px_60px_rgba(0,0,0,.35)]">
                <img src="/mou-niu-cybershakti.png" alt="Representatives at the official MoU signing ceremony between Noida International University and Cyber Shakti Foundation" loading="lazy" className="aspect-[4/3] w-full object-cover object-center" />
                <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-4 text-sm font-bold text-white sm:px-5"><span className="inline-flex items-center gap-2"><Award className="h-4 w-4 text-amber-400" />Official MoU Signing Ceremony</span><span className="text-sky-400">Noida International University</span></figcaption>
              </figure>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section aria-labelledby="partners-heading" className="relative isolate overflow-hidden border-b border-slate-800 bg-[#030811] py-16 sm:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 cyber-grid opacity-30" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(14,116,194,.13),transparent_55%),linear-gradient(180deg,rgba(3,8,17,.08),#030811)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-12 -z-10 h-72 w-72 rounded-full bg-indigo-600/10 blur-[100px]" />
          <div className="mx-auto mb-10 max-w-3xl px-5 text-center sm:mb-12">
            <p className="inline-flex rounded-full border border-cyan-400/35 bg-cyan-400/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300">Trusted collaborations</p>
            <h2 id="partners-heading" className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">Our <span className="text-cyan-400">partners</span></h2>
          </div>
          <div className="partners-marquee" aria-label="Partner organizations">
            <div className="partners-marquee-track">
              <div className="partners-marquee-group">
                {partners.map((partner) => <a key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer" className="partners-logo-item group">
                  <span className="partners-logo-surface"><img src={partner.image} alt={`${partner.name} logo`} loading="lazy" /></span>
                  <span className="partners-logo-name">{partner.name}</span>
                </a>)}
              </div>
              <div className="partners-marquee-group" aria-hidden="true" data-marquee-duplicate="true">
                {partners.map((partner) => <div key={partner.name} className="partners-logo-item">
                  <span className="partners-logo-surface"><img src={partner.image} alt="" loading="lazy" /></span>
                  <span className="partners-logo-name">{partner.name}</span>
                </div>)}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="bg-[#06162a] py-16 sm:py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-2xl border border-sky-500/20 bg-gradient-to-br from-[#0b2542] to-[#07172b] px-6 py-8 text-center sm:px-10 md:flex-row md:text-left">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">Current cohort · Winter 2026</p><h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Start building your cyber career.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Explore the program, review all seven learning tracks, and register online.</p></div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3"><button type="button" onClick={onOpenRegister} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500">Register now <ArrowRight className="h-4 w-4"/></button><button type="button" onClick={() => onNavigate(WINTER_INTERNSHIP_PATH)} className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-5 py-3 text-sm font-bold text-slate-100 transition hover:border-sky-400/50">Program details <ArrowUpRight className="h-4 w-4"/></button></div>
          </div>
          <div className="mx-auto mt-8 flex max-w-6xl flex-wrap justify-center gap-5 text-xs text-slate-500"><span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/>28-day live cohort</span><span className="inline-flex items-center gap-2"><Monitor className="h-4 w-4 text-sky-400"/>Online learning</span><span className="inline-flex items-center gap-2"><Award className="h-4 w-4 text-sky-400"/>QR-verifiable certificate</span><span className="inline-flex items-center gap-2"><UsersRound className="h-4 w-4 text-sky-400"/>Mentor-led sessions</span><span className="inline-flex items-center gap-2"><Network className="h-4 w-4 text-sky-400"/>Practical labs</span></div>
        </section>
      </ScrollReveal>
      <div className="sr-only"><span>seven learning tracks include cyber law</span></div>
    </main>
    </>
  );
}
