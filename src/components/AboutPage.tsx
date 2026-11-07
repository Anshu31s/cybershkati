import React from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  BookOpenCheck,
  Building2,
  Crosshair,
  Globe2,
  Mail,
  MapPin,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const partners = [
  {
    number: '01',
    name: 'Cyber Shakti Foundation',
    role: 'Education · Skills · Opportunity',
    description:
      'A technology education center helping learners build practical skills in cybersecurity, programming, data science, cloud computing, and IT infrastructure.',
    icon: BookOpenCheck,
    tone: 'cyan',
  },
  {
    number: '02',
    name: 'Cybersecurity Council of India',
    role: 'Knowledge · Collaboration · Advocacy',
    description:
      'A community of cybersecurity professionals from technology, finance, healthcare, government, and education working to strengthen digital safety.',
    icon: UsersRound,
    tone: 'violet',
  },
  {
    number: '03',
    name: 'CrimeX Intelligence',
    role: 'Investigation · Insight · Resilience',
    description:
      'An intelligence partner contributing to a stronger response to emerging cyber threats and a more resilient digital ecosystem.',
    icon: Crosshair,
    tone: 'amber',
  },
];

const principles = [
  {
    number: '01',
    title: 'Learn by doing',
    copy: 'Build confidence with practical learning, real-world applications, and skills you can put to work.',
    icon: BookOpenCheck,
  },
  {
    number: '02',
    title: 'Work together',
    copy: 'Bring people and perspectives together to make cybersecurity knowledge more accessible.',
    icon: UsersRound,
  },
  {
    number: '03',
    title: 'Stay curious',
    copy: 'Keep learning as technology changes and new challenges emerge across the digital world.',
    icon: Globe2,
  },
];

export default function AboutPage({ onOpenRegister, onNavigate }) {
  return (
    <main className="relative isolate overflow-hidden bg-[#07111c] pb-20 pt-24 text-white sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-48 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-500/[0.09] blur-[110px]" />
        <div className="absolute -left-56 top-[42rem] h-[32rem] w-[32rem] rounded-full bg-violet-500/[0.08] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <section className="grid min-h-[590px] items-center gap-14 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28">
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                About our ecosystem
              </div>
              <h1 className="max-w-3xl text-[clamp(3.4rem,8vw,6.8rem)] font-semibold leading-[0.96] tracking-[-0.07em]">
                A safer digital future <span className="font-serif font-normal italic text-cyan-300">starts with people.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                We bring education, investigation, and advocacy together to help people and organizations navigate the digital world with confidence.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onNavigate('home', 'tracks')}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
                >
                  Explore learning tracks <ArrowRight className="h-4 w-4" />
                </button>
                <a href="#our-story" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.04]">
                  Our story <ArrowDownRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-14 flex items-center gap-4 border-t border-white/10 pt-6 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-cyan-300" />
                <span>Rooted in Hyderabad, Telangana</span>
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                <span>Working toward a safer digital India</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]" aria-label="Illustration of a connected cybersecurity ecosystem" role="img">
              <div className="absolute inset-8 rounded-full border border-cyan-300/10" />
              <div className="absolute inset-16 rounded-full border border-dashed border-white/10" />
              <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b1a28]/80 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.12),transparent_43%)]" />
                <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
                  <circle cx="250" cy="250" r="162" stroke="rgba(148,163,184,.16)" strokeDasharray="3 8" />
                  <circle cx="250" cy="250" r="112" stroke="rgba(34,211,238,.18)" />
                  <path d="M250 250 126 157M250 250l135-82M250 250l58 151M250 250 94 333" stroke="rgba(103,232,249,.35)" strokeWidth="1.5" />
                  <circle cx="126" cy="157" r="5" fill="#67e8f9" /><circle cx="385" cy="168" r="5" fill="#c4b5fd" />
                  <circle cx="308" cy="401" r="5" fill="#fcd34d" /><circle cx="94" cy="333" r="5" fill="#67e8f9" />
                  <circle cx="250" cy="250" r="73" fill="rgba(8,23,37,.9)" stroke="rgba(103,232,249,.45)" />
                </svg>
                <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-200/30 bg-[#0a1e2c] shadow-[0_0_55px_rgba(34,211,238,.18)] sm:h-32 sm:w-32">
                  <ShieldCheck className="h-9 w-9 text-cyan-200" strokeWidth={1.4} />
                  <span className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">Digital trust</span>
                </div>
                <div className="absolute left-[5%] top-[22%] rounded-2xl border border-cyan-200/15 bg-[#0b1a28]/90 px-3 py-2.5 shadow-xl sm:left-[8%] sm:px-4">
                  <BookOpenCheck className="mb-2 h-4 w-4 text-cyan-200" /><span className="block text-[10px] font-semibold text-slate-200 sm:text-xs">Education</span>
                </div>
                <div className="absolute right-[3%] top-[24%] rounded-2xl border border-violet-200/15 bg-[#0b1a28]/90 px-3 py-2.5 shadow-xl sm:right-[7%] sm:px-4">
                  <UsersRound className="mb-2 h-4 w-4 text-violet-200" /><span className="block text-[10px] font-semibold text-slate-200 sm:text-xs">Community</span>
                </div>
                <div className="absolute bottom-[12%] right-[17%] rounded-2xl border border-amber-200/15 bg-[#0b1a28]/90 px-3 py-2.5 shadow-xl sm:px-4">
                  <Crosshair className="mb-2 h-4 w-4 text-amber-200" /><span className="block text-[10px] font-semibold text-slate-200 sm:text-xs">Investigation</span>
                </div>
                <div className="absolute bottom-[22%] left-[5%] rounded-2xl border border-cyan-200/15 bg-[#0b1a28]/90 px-3 py-2.5 shadow-xl sm:left-[8%] sm:px-4">
                  <Globe2 className="mb-2 h-4 w-4 text-cyan-200" /><span className="block text-[10px] font-semibold text-slate-200 sm:text-xs">Advocacy</span>
                </div>
                <div className="absolute left-7 top-7 font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500 sm:left-10 sm:top-10">Connected for impact <span className="text-cyan-300">/ 01</span></div>
                <div className="absolute bottom-7 right-7 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:bottom-10 sm:right-10">CSF · India</div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="our-story" className="scroll-mt-28 border-y border-white/10 py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Our purpose</p>
                <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">Make cybersecurity knowledge useful to everyone.</h2>
              </div>
              <div className="grid gap-6 text-slate-300 sm:grid-cols-2 sm:gap-10">
                <p className="text-base leading-8">Digital safety is a shared responsibility. It takes informed people, practical skills, and communities that are ready to learn from one another.</p>
                <p className="text-base leading-8">Our ecosystem connects hands-on education with professional insight and public advocacy, helping more people take part in building a resilient digital India.</p>
              </div>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {principles.map(({ number, title, copy, icon: Icon }) => (
                <div key={number} className="bg-[#091724] p-6 sm:p-7">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500"><span>{number}</span><Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.6} /></div>
                  <h3 className="mt-7 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="py-20 sm:py-28">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">The ecosystem</p>
                <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Different strengths. One shared direction.</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-slate-400">Three complementary organizations working across learning, investigation, and cybersecurity advocacy.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {partners.map(({ number, name, role, description, icon: Icon, tone }) => {
                const iconTone = tone === 'violet' ? 'text-violet-200 bg-violet-300/10 border-violet-200/15' : tone === 'amber' ? 'text-amber-200 bg-amber-300/10 border-amber-200/15' : 'text-cyan-200 bg-cyan-300/10 border-cyan-200/15';
                return (
                  <article key={name} className="group flex min-h-[330px] flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045] sm:p-8">
                    <div className="flex items-start justify-between"><span className="font-mono text-xs text-slate-500">{number} / 03</span><div className={`rounded-xl border p-3 ${iconTone}`}><Icon className="h-5 w-5" strokeWidth={1.7} /></div></div>
                    <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{role}</p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em]">{name}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-400">{description}</p>
                    <div className="mt-auto pt-7"><span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">Part of the ecosystem <ArrowRight className="h-3.5 w-3.5 text-cyan-300 transition-transform group-hover:translate-x-1" /></span></div>
                  </article>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="relative overflow-hidden rounded-[2rem] border border-cyan-200/15 bg-[#0b1b29] px-6 py-12 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="absolute -right-24 -top-36 h-96 w-96 rounded-full border border-cyan-200/10" />
            <div aria-hidden="true" className="absolute -right-10 -top-24 h-72 w-72 rounded-full border border-cyan-200/10" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200"><Building2 className="h-4 w-4" /> Based in Hyderabad, India</div>
                <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Build a safer digital future with us.</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">Start with a learning track, explore our programs, or get in touch with the foundation.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button type="button" onClick={onOpenRegister} className="inline-flex items-center justify-center gap-3 rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">Explore our programs <ArrowRight className="h-4 w-4" /></button>
                <a href="mailto:info@cybershaktifoundation.org" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.04]"><Mail className="h-4 w-4" /> Get in touch</a>
              </div>
            </div>
            <div className="relative mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:gap-6">
              <span>Cyber Shakti Foundation</span><span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" /><span>info@cybershaktifoundation.org</span><span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" /><span>Hyderabad, Telangana, India</span>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}
