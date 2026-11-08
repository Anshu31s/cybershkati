import React, { useState } from 'react';
import { Flame, Clock, ArrowRight, X } from 'lucide-react';
import { PROGRAM_DATA } from '../data/programData';
import { useRegistration } from '../context/RegistrationContext';

export default function EarlyBirdBanner({ onOpenRegister }) {
  const { seatsRemaining, currentPrice, currentTier, pricingLoading } = useRegistration();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-cyan-950/90 via-indigo-950/95 to-blue-950/90 border-b border-cyan-500/30 text-white text-xs sm:text-sm py-2 px-3 sm:px-4 overflow-hidden">
      {/* Background neon sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full animate-[scanline_6s_linear_infinite]" />
      
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 relative z-10">
        
        {/* Left message with badge */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs uppercase tracking-wide animate-pulse">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Current Fee
          </span>
          
          <div className="text-slate-200">
            {!pricingLoading && <><span className="font-semibold text-white">{currentTier?.min}–{currentTier?.max ?? '1000+'} students: </span>
            <span className="text-cyan-300 font-bold font-mono text-sm sm:text-base">₹{currentPrice.toLocaleString('en-IN')}</span></>}
            <span className="hidden md:inline text-slate-300 ml-2">
              • {seatsRemaining == null ? (
                <>No registration cap for this tier.</>
              ) : seatsRemaining > 0 ? (
                <><strong className="text-cyan-300 font-mono">{seatsRemaining}</strong> registrations until this tier ends.</>
              ) : (
                <>Current tier reached. Next fee tier applies.</>
              )}
            </span>
          </div>
        </div>

        {/* Right date, action button & dismiss */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Registration closes: <strong className="text-white">{PROGRAM_DATA.registrationCloses}</strong></span>
          </div>
          
          <button
            onClick={onOpenRegister}
            className="flex items-center gap-1 font-semibold text-xs text-black bg-cyan-400 hover:bg-cyan-300 px-2.5 sm:px-3 py-1 rounded-md transition-all shadow-sm hover:shadow-[0_0_12px_rgba(34,211,238,0.5)] active:scale-95 whitespace-nowrap"
          >
            <span>Register{pricingLoading ? '' : ` · ₹${currentPrice.toLocaleString('en-IN')}`}</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors"
            title="Dismiss announcement"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
