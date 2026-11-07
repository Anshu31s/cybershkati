import React from 'react';
import { 
  Shield, 
  Target, 
  Eye, 
  Award, 
  Users, 
  Terminal, 
  Scale, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Cpu, 
  Zap, 
  UserCheck, 
  Briefcase, 
  BookOpen, 
  FileCheck2,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { PROGRAM_DATA } from '../data/programData';

export default function AboutPage({ onOpenRegister, onNavigate }) {
  const getPillarIcon = (iconName) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Scale': return <Scale className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      default: return <Shield className="w-6 h-6" />;
    }
  };

  return (
    <div className="relative pt-24 pb-20 overflow-hidden cyber-grid">
      {/* Radiant Cyber Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb Navigation Back to Home */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors group px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Internship Overview</span>
          </button>
        </div>

        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono mb-6">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold tracking-wide uppercase">ABOUT CYBER SHAKTI FOUNDATION</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-semibold">Registered Non-Profit</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              Empowering India's{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent cyber-glow-cyan">
                Digital Defense Ecosystem
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
              Cyber Shakti Foundation is a pioneering non-profit dedicated to closing India's cybersecurity talent gap through practical hands-on training, forensic research, legal compliance literacy, and student-first empowerment.
            </p>

            {/* Quick Impact Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">10,000+</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Students Reached</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">100%</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Hands-On Labs</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">DPDP Act</div>
                <div className="text-xs text-slate-400 font-mono mt-1">2023 Specialized</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">QR Verifiable</div>
                <div className="text-xs text-slate-400 font-mono mt-1">Certifications</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Mission, Vision & Core Purpose Dual Cards */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b14]/90 border border-cyan-500/30 relative overflow-hidden group hover:border-cyan-500/60 transition-all shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />
              <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                To democratize high-stakes cybersecurity and digital forensics education for college students and young professionals across India. We believe world-class technical skills, practical cloud cyber labs, and cyber law comprehension should be accessible to everyone—regardless of financial barriers.
              </p>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Real incident response over passive slides</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Subsidized early-bird pricing (₹999 fee for 28 days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Aligned with Indian Evidence Act & DPDP Act 2023</span>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b14]/90 border border-indigo-500/30 relative overflow-hidden group hover:border-indigo-500/60 transition-all shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
              <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                A digitally secure, self-reliant India capable of safeguarding critical infrastructure, personal data, and national sovereignty. We envision an army of skilled, ethical cyber guardians, forensics investigators, and data protection fiduciaries leading cybersecurity worldwide.
              </p>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Fostering homegrown ethical hacking & investigative talent</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Strengthening law enforcement & institutional resilience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Bridging university academia with active industry demands</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 5 Core Pillars of Cyber Shakti Foundation */}
        <ScrollReveal>
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-3">
                FOUNDATION PILLARS
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                What Sets Cyber Shakti Apart
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Our pedagogical approach is built upon five foundational pillars designed to transform passionate learners into confident cybersecurity operators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROGRAM_DATA.whyJoin.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                        {getPillarIcon(pillar.icon)}
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-500">
                        PILLAR 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-medium text-cyan-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Operational Curriculum Benchmark</span>
                  </div>
                </div>
              ))}

              {/* 6th Highlight Card: Non-Profit Mandate Card */}
              <div className="p-7 rounded-2xl bg-gradient-to-br from-cyan-950/70 via-indigo-950/70 to-slate-900 border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.25)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold uppercase">
                      Non-Profit Mandate
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">Student-First</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-2">
                    Committed to Social Impact
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    Unlike commercial bootcamps charging tens of thousands of rupees, our subsidized programs ensure high-grade practical cybersecurity is within reach for any dedicated student.
                  </p>
                </div>

                <div>
                  <button
                    onClick={onOpenRegister}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Claim ₹999 Early-Bird Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Areas of Focus / Specialized Initiatives */}
        <ScrollReveal>
          <div className="mb-20 rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12">
            <div className="max-w-3xl mb-10">
              <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider block mb-2">
                NATIONAL SCOPE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Key Initiatives & Focus Areas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-3 w-fit rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">Digital Forensics & Law</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Educating students on court-admissible electronic evidence (IT Act Sec 65B), disk imaging, memory forensics, mobile triage, and chain of custody.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">DPDP Act & Privacy</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pioneering data protection education in line with the Digital Personal Data Protection Act 2023, data fiduciary obligations, and consent architectures.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">Offensive & Defensive Ops</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cultivating red-team ethical hacking skills and blue-team SOC monitoring, SIEM detection engineering, and incident containment protocols.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Action Call to Action Banner */}
        <ScrollReveal>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-cyan-500/40 text-center shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs uppercase font-bold mb-4">
                WINTER COHORT 2026
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Ready to Experience Practical Cybersecurity?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Join Cyber Shakti Foundation's 28-day winter internship. Learn Digital Forensics, Ethical Hacking, OSINT, SOC, DPDP Act & Cyber Law. Registration starts 08 November 2026.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onOpenRegister}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Claim Early-Bird Seat (₹999)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('home', 'tracks')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  <span>Explore 7 Learning Tracks</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}

