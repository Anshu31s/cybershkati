import React from 'react';
import { 
  Zap, 
  UserCheck, 
  Cpu, 
  Scale, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { PROGRAM_DATA } from '../data/programData';
import { useRegistration } from '../context/RegistrationContext';

export default function WhyJoinSection({ onOpenRegister }) {
  const { currentPrice, currentTier, pricingLoading } = useRegistration();
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Scale': return <Scale className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  return (
    <section id="why-join" className="py-24 bg-[#050811] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            Competitive Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Why Join <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Cyber Shakti Foundation</span>?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We bridge the critical gap between academic theory and high-stakes operational cybersecurity defense.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PROGRAM_DATA.whyJoin.map((item, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] flex flex-col justify-between ${
                idx === 3 ? 'lg:col-span-1 border-amber-500/30 bg-gradient-to-b from-slate-900 via-[#101726] to-[#080d1a]' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500">
                    PILLAR 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-medium text-cyan-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Winter 2026 Curriculum</span>
              </div>
            </div>
          ))}

          {/* 6th Highlight Card: Early-Bird Registration CTA Card */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-indigo-950/70 to-slate-900 border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.25)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                {!pricingLoading && <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold uppercase">
                  Current Fee
                </span>}
                {!pricingLoading && <span className="text-xs font-mono text-cyan-300 font-bold">₹{currentPrice.toLocaleString('en-IN')}</span>}
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">
                Join the Winter Cohort
              </h3>
              {!pricingLoading && <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                Registration is open. The fee for registrations {currentTier?.min}–{currentTier?.max ?? '1000+'} is ₹{currentPrice.toLocaleString('en-IN')}.
              </p>}
            </div>

            <div>
              <button
                onClick={onOpenRegister}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center gap-2"
              >
                <span>Enroll at the Current Fee</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mentorship & Career Impact Stats */}
        <div className="rounded-2xl p-8 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono mb-1">
                100% Practical
              </div>
              <div className="text-sm font-semibold text-white mb-1">Zero Slides-Only Sessions</div>
              <div className="text-xs text-slate-400 max-w-xs mx-auto">
                Direct command line, autopsy tools, packet captures, and live attack vectors.
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              {!pricingLoading && <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono mb-1">
                ₹{currentPrice.toLocaleString('en-IN')}
              </div>}
              <div className="text-sm font-semibold text-white mb-1">Affordable Excellence</div>
              <div className="text-xs text-slate-400 max-w-xs mx-auto">
                The fee updates automatically by registration tier or follows the admin-selected manual rate.
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono mb-1">
                Verified Credential
              </div>
              <div className="text-sm font-semibold text-white mb-1">Verifiable Internship Certificate</div>
              <div className="text-xs text-slate-400 max-w-xs mx-auto">
                Equipped with QR code authentication for LinkedIn and employer validation.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
