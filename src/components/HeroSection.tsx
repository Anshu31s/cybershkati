import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Cpu, 
  Users, 
  Award, 
  Flame,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { PROGRAM_DATA } from '../data/programData';
import { useRegistration } from '../context/RegistrationContext';

export default function HeroSection({ onOpenRegister }) {
  const { seatsRemaining, totalSeats, justDecremented, currentPrice, currentTier } = useRegistration();

  // Countdown to 08 November 2026 (Registration date)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 9,
    minutes: 58,
    seconds: 40
  });

  useEffect(() => {
    // Target date: Nov 8, 2026 00:00:00
    const target = new Date('2026-11-08T00:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-20 pb-16 sm:pt-28 md:pt-32 sm:pb-20 overflow-hidden cyber-grid">
      {/* Radiant Cyber Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating security grid elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tag & Organization Announcement */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6 px-1 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-[11px] sm:text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.25)] max-w-full">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <span className="font-bold tracking-wide uppercase">{PROGRAM_DATA.organization}</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300 font-semibold">{PROGRAM_DATA.programName} 2026</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] sm:text-xs font-mono font-medium">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>28 Days Live Cohort</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-[1.15] mb-4 sm:mb-6">
            Start Your Career in{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent cyber-glow-cyan">
              Cybersecurity & Defense
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 px-1">
            A comprehensive <span className="text-cyan-300 font-semibold">28-day live & interactive</span> winter internship by <span className="text-white font-semibold">Cyber Shakti Foundation</span>. Master Digital Forensics, Ethical Hacking, SOC, OSINT, and newly added tracks on India's <span className="text-amber-300 font-semibold underline decoration-amber-500/50 underline-offset-4">DPDP Act 2023</span> & <span className="text-cyan-300 font-semibold underline decoration-cyan-500/50 underline-offset-4">Cyber Law</span>.
          </p>

          {/* Registration Starts & Countdown Ticker */}
          <div className="mb-8 sm:mb-10 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#070b14]/90 border border-cyan-500/30 max-w-2xl mx-auto shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400">Official Opening</div>
                  <div className="text-xs sm:text-base font-bold text-white">
                    Registration Starts: <span className="text-cyan-400">{PROGRAM_DATA.registrationStarts}</span>
                  </div>
                </div>
              </div>

              {/* Live Countdown Clock */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex flex-col items-center bg-slate-950/80 border border-slate-800 rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 min-w-[44px] sm:min-w-[50px]">
                  <span className="text-base sm:text-lg font-bold font-mono text-cyan-400">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-400">Days</span>
                </div>
                <span className="text-cyan-500 font-bold text-xs sm:text-base">:</span>
                <div className="flex flex-col items-center bg-slate-950/80 border border-slate-800 rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 min-w-[44px] sm:min-w-[50px]">
                  <span className="text-base sm:text-lg font-bold font-mono text-cyan-400">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-400">Hours</span>
                </div>
                <span className="text-cyan-500 font-bold text-xs sm:text-base">:</span>
                <div className="flex flex-col items-center bg-slate-950/80 border border-slate-800 rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 min-w-[44px] sm:min-w-[50px]">
                  <span className="text-base sm:text-lg font-bold font-mono text-cyan-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-400">Mins</span>
                </div>
                <span className="text-cyan-500 font-bold text-xs sm:text-base">:</span>
                <div className="flex flex-col items-center bg-slate-950/80 border border-slate-800 rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 min-w-[44px] sm:min-w-[50px]">
                  <span className="text-base sm:text-lg font-bold font-mono text-emerald-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono text-slate-400">Secs</span>
                </div>
              </div>

            </div>

            {/* Micro alert for 50 early bird seats */}
            <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-300 text-center sm:text-left">
              <span className="flex items-center gap-1.5 text-amber-300 font-medium text-[11px] sm:text-xs">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
                <span>Current fee: ₹{currentPrice.toLocaleString('en-IN')} · Tier {currentTier?.min}–{currentTier?.max ?? '1000+'}</span>
              </span>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                <span className={`font-mono transition-all duration-300 ${
                  justDecremented ? 'text-amber-300 font-extrabold scale-105' : 'text-slate-400'
                }`}>
                  {seatsRemaining == null ? (
                    <span className="text-slate-400">No registration cap for this fee tier</span>
                  ) : seatsRemaining > 0 ? (
                    <>
                      <strong className="text-cyan-400 font-bold">{seatsRemaining}</strong> registrations until next fee tier
                    </>
                  ) : (
                    <span className="text-rose-400 font-bold">Current tier is filled</span>
                  )}
                </span>
                {justDecremented && (
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded font-mono animate-bounce">
                    -1 Booked!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Primary Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 max-w-md sm:max-w-none mx-auto">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 group"
            >
              <span>Register Now · ₹{currentPrice.toLocaleString('en-IN')}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </button>

            <a
              href="#tracks"
              className="w-full sm:w-auto px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore 7 Tracks</span>
              <ChevronDown className="w-4 h-4 shrink-0" />
            </a>

            <a
              href={PROGRAM_DATA.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-800/60 transition-all flex items-center justify-center gap-2 font-mono truncate"
            >
              <span className="truncate">{PROGRAM_DATA.displayUrl}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          {/* Key Program Pillars Highlights Bar */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto text-left">
            
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-white font-mono">28 Days</div>
              </div>
              <div className="text-xs text-slate-400 font-medium">Daily Live Sessions & Hands-on Cyber Labs</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-white font-mono">7 Tracks</div>
              </div>
              <div className="text-xs text-slate-400 font-medium">Forensics, Pentest, SOC + 2 NEW Legal Areas</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">Verified</div>
              </div>
              <div className="text-xs text-slate-400 font-medium">Professional Internship Certificate & Credential</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">₹{currentPrice.toLocaleString('en-IN')}</div>
              </div>
              <div className="text-xs text-slate-400 font-medium">Current fee for the {currentTier?.min}–{currentTier?.max ?? '1000+'} registration tier</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
