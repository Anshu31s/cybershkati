import React from 'react';
import { 
  Clock, 
  MonitorPlay, 
  GraduationCap, 
  BookOpen, 
  Award, 
  UserCheck, 
  Terminal, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar,
  ArrowRight
} from 'lucide-react';
import { PROGRAM_DATA } from '../data/programData';
import { useRegistration } from '../context/RegistrationContext';

export default function ProgramDetailsSection({ onOpenRegister }) {
  const { currentPrice } = useRegistration();
  const getDetailIcon = (iconName) => {
    switch(iconName) {
      case 'Clock': return <Clock className="w-5 h-5" />;
      case 'MonitorPlay': return <MonitorPlay className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'UsersCheck':
      case 'UserCheck': return <UserCheck className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      default: return <ShieldCheck className="w-5 h-5" />;
    }
  };

  const weeklyMilestones = [
    {
      week: "Week 01",
      title: "Foundations, Recon & Digital Forensics",
      focus: "Hardware & Disk Acquisition, FTK Imager, File Carving & Evidence Preservation.",
      badge: "Days 1 - 7"
    },
    {
      week: "Week 02",
      title: "Offensive Security, Ethical Hacking & OSINT",
      focus: "Network packet sniffing, Metasploit exploitation, Burp Suite & dark web intelligence.",
      badge: "Days 8 - 14"
    },
    {
      week: "Week 03",
      title: "SOC Defense, Threat Hunting & Mobile Forensics",
      focus: "Splunk SIEM, Wazuh telemetry, MITRE ATT&CK mapping & Android extractions.",
      badge: "Days 15 - 21"
    },
    {
      week: "Week 04",
      title: "DPDP Act 2023, Cyber Law & Capstone Project",
      focus: "Data privacy compliance audit, Section 65B certification & final internship evaluation.",
      badge: "Days 22 - 28"
    }
  ];

  return (
    <section id="details" className="py-24 bg-[#070b14] relative cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Program Specifications
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Official Program <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Details</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Everything you need to know about eligibility, modality, duration, and learning outcomes for the Cyber Shakti Foundation Winter Internship.
          </p>
        </div>

        {/* Official Category Table Card Grid */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl mb-16">
          <div className="p-6 sm:p-8 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/60">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">Cohort Overview</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Winter Internship Program Matrix
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                Registration: {PROGRAM_DATA.registrationStarts}
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                Current fee: ₹{currentPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-800/80">
            {PROGRAM_DATA.detailsTable.map((item, index) => (
              <div 
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 hover:bg-slate-850/50 transition-colors items-center gap-4"
              >
                {/* Category column */}
                <div className="md:col-span-3 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    {getDetailIcon(item.icon)}
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-mono uppercase">Category</span>
                    <h4 className="text-sm sm:text-base font-bold text-white">{item.category}</h4>
                  </div>
                </div>

                {/* Details Value column */}
                <div className="md:col-span-4">
                  <div className="inline-block px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 font-semibold text-sm sm:text-base">
                    {item.value}
                  </div>
                </div>

                {/* Operational context column */}
                <div className="md:col-span-5 text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 28-Day Milestone Roadmap */}
        <div className="mt-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              Your 28-Day Learning Journey
            </h3>
            <p className="text-slate-400 text-sm">
              Structured progressive curriculum taking you from fundamental concepts to live forensic defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {weeklyMilestones.map((m, idx) => (
              <div
                key={idx}
                className="relative rounded-xl p-5 bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all group flex flex-col justify-between"
              >
                <div className="absolute -top-3 left-5 px-2.5 py-0.5 rounded-full bg-cyan-500 text-black font-mono font-bold text-[11px] shadow-sm">
                  {m.week}
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-mono text-cyan-400 block mb-1">
                    {m.badge}
                  </span>
                  <h4 className="font-bold text-white text-base mb-2 group-hover:text-cyan-300 transition-colors">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.focus}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Hands-on Lab</span>
                  <span className="text-emerald-400">Live Feedback</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner inside details */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all"
          >
            <span>Reserve Your Winter Internship Seat (₹{currentPrice.toLocaleString('en-IN')})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
