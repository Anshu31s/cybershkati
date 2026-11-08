import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Globe, 
  Linkedin, 
  Instagram, 
  Youtube, 
  QrCode, 
  Check, 
  Copy, 
  ExternalLink, 
  Flame, 
  ShieldCheck, 
  Clock, 
  Users, 
  ArrowRight,
  Share2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { PROGRAM_DATA } from '../data/programData';
import { useRegistration } from '../context/RegistrationContext';
import XLogo from './XLogo';

export default function PricingSection({ onOpenRegister }) {
  const { totalSeats, totalEnrolled, seatsRemaining, percentageFilled, currentPrice, currentTier, justDecremented, loading } = useRegistration();
  const [copiedType, setCopiedType] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const socialIcons = {
    LinkedIn: <Linkedin className="w-5 h-5" />,
    Instagram: <Instagram className="w-5 h-5" />,
    YouTube: <Youtube className="w-5 h-5" />,
    "X (Twitter)": <XLogo className="w-5 h-5" />
  };

  return (
    <section id="pricing" className="py-24 bg-[#050811] relative cyber-grid">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Current Registration Fee
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Transparent Pricing & <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Official Enrollment</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Invest in your cybersecurity career with heavily subsidized non-profit community pricing by Cyber Shakti Foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Main Pricing Box (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0c1424] to-[#070b14] border-2 border-cyan-500/40 p-5 sm:p-8 md:p-10 shadow-2xl relative flex flex-col justify-between">
            
            {/* Top Corner Ribbon */}
            {!loading && <div className="absolute -top-3 right-3 sm:right-6 px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 animate-pulse">
              <Flame className="w-3.5 h-3.5" />
              Tier {currentTier?.min}–{currentTier?.max ?? '1000+'} Students
            </div>}

            <div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                <span>Winter Internship Program 2026</span>
                <span>•</span>
                <span>28 Days Complete Access</span>
              </div>

              {!loading && <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 mb-4">
                <span className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-mono tracking-tight">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 font-bold text-xs font-mono">
                  {currentTier?.min}–{currentTier?.max ?? '1000+'} STUDENTS
                </span>
              </div>}

              {/* Urgency Progress Bar */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-1 sm:gap-2 mb-2">
                  <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {totalSeats ? 'Registrations in Current Tier' : 'Current registrations'}
                  </span>
                  <span className={`font-mono text-[11px] sm:text-xs transition-all duration-300 ${
                    justDecremented ? 'text-amber-300 scale-105 font-black' : 'text-cyan-300 font-bold'
                  }`}>
                    {totalSeats ? `${totalEnrolled} / ${totalSeats} Enrolled (${seatsRemaining} until next tier)` : `${totalEnrolled} enrolled · no tier cap`}
                  </span>
                </div>
                {totalSeats && <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-amber-400 h-full rounded-full transition-all duration-700" 
                    style={{ width: `${percentageFilled}%` }}
                  ></div>
                </div>}
                <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                  <span>
                    Current tier price applies to the next applicant. The next fee tier begins after this registration range.
                  </span>
                  <span className="font-mono text-cyan-400 font-semibold hidden sm:inline">
                    {totalSeats ? `${percentageFilled}% Full` : 'Open tier'}
                  </span>
                </div>
              </div>

              {/* What's included checklist */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-bold uppercase text-slate-300 font-mono tracking-wider">
                  Included in the current program fee:
                </div>
                
                {[
                  "Full 28 Days of live interactive training & practical lab guidance",
                  "Access to all 7 Learning Tracks (including NEW DPDP Act & Cyber Law)",
                  "Official Cyber Shakti Foundation Professional Internship Certificate",
                  "Tamper-proof verifiable credential ID & LinkedIn skill endorsement",
                  "Direct live mentorship sessions with cybersecurity practitioners",
                  "24/7 Cloud cyber lab sandbox access and pre-configured VMs",
                  "Daily session recordings & comprehensive forensic toolkit downloads",
                  "Assistance with resume building, mock interviews & police FIR case templates"
                ].map((perk, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div>
              <button
                onClick={onOpenRegister}
                className="w-full py-4 rounded-xl font-extrabold text-base text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Register for Winter Internship{loading ? '' : ` (₹${currentPrice.toLocaleString('en-IN')})`}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
              
              <div className="text-center text-[11px] text-slate-400 mt-3 font-mono">
                🔒 Safe & Verified Registration • Instant Receipt & Portal Credentials
              </div>
            </div>

          </div>

          {/* QR Code & Direct Registration Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl">
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  Mobile Registration
                </span>
                <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
                  <QrCode className="w-4 h-4" />
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Scan QR Code to Register
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Scan with any mobile camera, Google Lens, or UPI app to access the official enrollment gateway.
              </p>

              {/* Scannable QR Code Box */}
              <div className="bg-white p-5 rounded-2xl max-w-[240px] mx-auto shadow-[0_0_40px_rgba(255,255,255,0.15)] flex flex-col items-center justify-center mb-6">
                <QRCodeSVG
                  value={PROGRAM_DATA.websiteUrl}
                  size={190}
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306b6d4' stroke='%2306b6d4'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/></svg>",
                    x: undefined,
                    y: undefined,
                    height: 32,
                    width: 32,
                    excavate: true,
                  }}
                />
                {!loading && <span className="text-[10px] font-mono font-bold text-slate-800 mt-2 uppercase tracking-wider">
                  Scan to Register • ₹{currentPrice.toLocaleString('en-IN')}
                </span>}
              </div>

              {/* Official URL display */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-2 mb-4">
                <div className="truncate text-xs font-mono text-cyan-300">
                  {PROGRAM_DATA.displayUrl}
                </div>
                <a
                  href={PROGRAM_DATA.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Open Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={onOpenRegister}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Or Fill Registration Form Directly</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Contact Information Card */}
        <div id="contact" className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-10">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">Get In Touch</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Official Foundation Contact Information
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Have questions regarding the syllabus, eligibility, or corporate sponsorship? Reach our coordinators directly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* Phone */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-mono text-slate-400">Helpline / WhatsApp</span>
                    <div className="text-sm font-bold text-white font-mono">
                      {PROGRAM_DATA.contact.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                  <a
                    href={`tel:${PROGRAM_DATA.contact.phone}`}
                    className="flex-1 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs text-center font-semibold transition-colors"
                  >
                    Call Now
                  </a>
                  <button
                    onClick={() => copyToClipboard(PROGRAM_DATA.contact.phone, 'phone')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                    title="Copy Phone Number"
                  >
                    {copiedType === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-mono text-slate-400">Official Support</span>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono break-all">
                      {PROGRAM_DATA.contact.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                  <a
                    href={`mailto:${PROGRAM_DATA.contact.email}`}
                    className="flex-1 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs text-center font-semibold transition-colors"
                  >
                    Send Email
                  </a>
                  <button
                    onClick={() => copyToClipboard(PROGRAM_DATA.contact.email, 'email')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                    title="Copy Email Address"
                  >
                    {copiedType === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Website */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-mono text-slate-400">Registration Portal</span>
                    <div className="text-xs font-bold text-white font-mono truncate max-w-[180px]">
                      {PROGRAM_DATA.contact.displayWebsite}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                  <a
                    href={PROGRAM_DATA.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs text-center font-semibold transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Social Media Links */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-mono">
                Connect with Cyber Shakti Foundation on Social Media:
              </span>

              <div className="flex items-center gap-3">
                {PROGRAM_DATA.contact.socials.map((social, sIdx) => (
                  <a
                    key={sIdx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-400 border border-slate-700/80 text-slate-300 text-xs font-medium transition-all"
                  >
                    {socialIcons[social.name]}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
