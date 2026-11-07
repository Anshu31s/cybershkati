import React from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  Crosshair,
  Globe2,
  Landmark,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const organizations = [
  {
    name: 'Cyber Shakti Foundation',
    image: '/about/cyber-shakti-foundation.png',
    icon: ShieldCheck,
    accent: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    description:
      'Cyber Shakti is a technology education center dedicated to empowering individuals and organizations with advanced digital skills in cybersecurity, programming, data science, cloud computing, and IT infrastructure.',
    detail:
      'Through hands-on courses for learners, professionals, and enterprises, the Foundation focuses on practical training, industry-recognized certifications, and real-world applications.',
  },
  {
    name: 'Cybersecurity Council of India',
    image: '/about/cybersecurity-council.png',
    icon: Landmark,
    accent: 'from-sky-500/20 via-indigo-500/10 to-transparent',
    description:
      'The Cybersecurity Council brings professionals from technology, finance, healthcare, government, and education together to exchange knowledge and respond to emerging cyber threats.',
    detail:
      'Its members work to strengthen security practices, support professionals, and help individuals and organizations navigate a changing digital landscape.',
  },
];

const pillars = [
  { title: 'Advanced training', icon: BookOpenCheck },
  { title: 'Expert investigation', icon: Crosshair },
  { title: 'Strategic advocacy', icon: UsersRound },
];

function NetworkBackdrop() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[980px] w-full opacity-40" viewBox="0 0 1440 980" preserveAspectRatio="xMidYMin slice" fill="none">
      <defs>
        <linearGradient id="network-line" x1="0" y1="0" x2="1440" y2="980" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563eb" stopOpacity=".02" />
          <stop offset=".48" stopColor="#7c3aed" stopOpacity=".45" />
          <stop offset="1" stopColor="#06b6d4" stopOpacity=".04" />
        </linearGradient>
        <radialGradient id="network-glow">
          <stop stopColor="#4338ca" stopOpacity=".5" />
          <stop offset="1" stopColor="#4338ca" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="720" cy="310" rx="650" ry="380" fill="url(#network-glow)" opacity=".18" />
      <g stroke="url(#network-line)" strokeWidth="1">
        <path d="m0 115 145 74 145-105 115 180 160-91 133 143 131-180 154 91 147-135 160 127 150-77" />
        <path d="m-35 398 180-209 135 228 126-153 159 144 135-92 131 163 154-220 147 126 178-130" />
        <path d="m-28 693 173-276 135 242 126-195 159 186 135-234 131 256 154-265 147 240 178-235" />
        <path d="m145 189 0 228m145-333v357m241-338v338m133-195v333m131-513v375m154-284v422m147-557v419" />
      </g>
      <g fill="#818cf8">
        <circle cx="145" cy="189" r="3" /><circle cx="290" cy="84" r="3" /><circle cx="405" cy="264" r="3" />
        <circle cx="565" cy="173" r="3" /><circle cx="698" cy="316" r="3" /><circle cx="829" cy="136" r="3" />
        <circle cx="983" cy="227" r="3" /><circle cx="1130" cy="92" r="3" /><circle cx="1290" cy="219" r="3" />
        <circle cx="145" cy="417" r="2.5" /><circle cx="425" cy="264" r="2.5" /><circle cx="964" cy="390" r="2.5" />
        <circle cx="1284" cy="465" r="2.5" /><circle cx="565" cy="659" r="2.5" /><circle cx="1090" cy="655" r="2.5" />
      </g>
    </svg>
  );
}

export default function AboutPage({ onOpenRegister, onNavigate }) {
  return (
    <main className="relative isolate flex-1 overflow-hidden bg-[#05070d] pb-20 pt-24 text-white sm:pt-28">
      <NetworkBackdrop />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_0%,rgba(30,64,175,.12),transparent_55%),linear-gradient(180deg,#070a13_0%,#05070d_58%,#070a12_100%)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <header className="mx-auto max-w-5xl pb-16 pt-7 text-center sm:pb-20 sm:pt-10">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
              <ShieldCheck className="h-4 w-4" /> Who we are
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              About Our <span className="text-cyan-300">Ecosystem</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              We are a collaborative network of organizations dedicated to securing the digital frontier through education, investigation, and advocacy.
            </p>
          </header>
        </ScrollReveal>

        <div className="space-y-16 sm:space-y-20">
          {organizations.map(({ name, image, icon: Icon, accent, description, detail }, index) => (
            <ScrollReveal key={name} delay={index * 0.06}>
              <section aria-labelledby={`organization-${index}`} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                <div className={`relative flex min-h-[270px] items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1020] p-8 shadow-[0_20px_70px_rgba(0,0,0,.3)] sm:min-h-[350px] sm:p-12 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
                  <div aria-hidden="true" className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full border border-white/[0.06]" />
                  <div aria-hidden="true" className="absolute -bottom-16 -right-8 h-44 w-44 rounded-full border border-white/[0.06]" />
                  <img src={image} alt={name} loading="lazy" className="relative z-10 max-h-48 w-full max-w-[500px] object-contain drop-shadow-[0_0_28px_rgba(56,189,248,.16)] sm:max-h-56" />
                  <div className="absolute bottom-5 left-6 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:bottom-7 sm:left-8">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> Organization {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">
                    <Icon className="h-3.5 w-3.5" /> Organization
                  </div>
                  <h2 id={`organization-${index}`} className="mt-5 text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-4xl">{name}</h2>
                  <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">{description}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{detail}</p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Mission</p>
                      <p className="mt-2 text-sm font-bold text-cyan-200">Excellence in service</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Impact</p>
                      <p className="mt-2 text-sm font-bold text-cyan-200">Nationwide presence</p>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <section className="relative mt-20 overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[#09111e] px-6 py-10 sm:mt-28 sm:px-12 sm:py-14">
            <div aria-hidden="true" className="absolute -right-20 -top-36 h-80 w-80 rounded-full bg-blue-500/10 blur-[80px]" />
            <div className="relative mx-auto max-w-4xl text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200"><Globe2 className="h-6 w-6" /></div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">One shared purpose</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">Building a Safer Digital India</h2>
              <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                Through the combined efforts of Cyber Shakti Foundation, CrimeX Intelligence, and the Cybersecurity Council, we are building an ecosystem that helps the next generation develop the skills and confidence to secure the digital world.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {pillars.map(({ title, icon: Icon }) => <div key={title} className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-200"><Icon className="h-4 w-4 text-cyan-300" />{title}</div>)}
              </div>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={onOpenRegister} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300">Explore the internship <ArrowRight className="h-4 w-4" /></button>
                <button type="button" onClick={() => onNavigate('home', 'tracks')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/5">Explore learning tracks</button>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}
