import React from 'react';
import { Award, ShieldCheck, CheckCircle2, QrCode, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { PROGRAM_DATA } from '../data/programData';

export default function CertificateShowcase({ onOpenRegister }) {
  return (
    <section className="py-20 bg-[#070b14] relative cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Description & Perks */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              Verified Outcome
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Earn a Verifiable <br />
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Professional Internship Certificate
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Upon successful completion of the 28-day curriculum and practical capstone assignment, you receive the official <strong>Cyber Shakti Foundation Winter Internship Credential</strong>.
            </p>

            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                  <strong className="text-white">Tamper-Proof QR Verification:</strong> Instant online authenticity check for recruiters and background verification teams.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                  <strong className="text-white">Transcript of Competencies:</strong> Details your practical hours in Digital Forensics, Pentesting, SOC, and DPDP Act compliance.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                  <strong className="text-white">LinkedIn & Resume Ready:</strong> Easily embed your license credential and add verified project experience.
                </div>
              </div>
            </div>

            <button
              onClick={onOpenRegister}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg flex items-center gap-2"
            >
              <span>Enroll to Claim Certificate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Visual Certificate Mockup */}
          <div className="lg:col-span-7">
            <div className="relative p-2 sm:p-4 rounded-3xl bg-gradient-to-b from-cyan-500/20 via-slate-800/40 to-indigo-500/20 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)]">
              
              {/* The Certificate Canvas Card */}
              <div className="bg-[#0b1324] border-2 border-cyan-500/30 rounded-2xl p-6 sm:p-10 relative overflow-hidden text-center shadow-2xl">
                
                {/* Guilloche border accents */}
                <div className="absolute inset-2 border border-cyan-500/15 pointer-events-none rounded-xl" />
                <div className="absolute inset-3 border border-dashed border-cyan-500/20 pointer-events-none rounded-lg" />
                
                {/* Top Badge & Foundation Header */}
                <div className="relative z-10 mb-6">
                  <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase font-bold mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    Cyber Shakti Foundation
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-wider font-serif">
                    Certificate of Internship
                  </h3>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    Winter Internship Program • 2026
                  </div>
                </div>

                {/* Recipient body */}
                <div className="relative z-10 my-6">
                  <p className="text-xs text-slate-400 font-serif italic mb-1">
                    This is proudly presented to
                  </p>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 border-b border-cyan-500/30 pb-2 inline-block px-8 font-sans">
                    [ Candidate Full Name ]
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-4 leading-relaxed">
                    for successfully completing the <strong>28-Day Winter Internship Program</strong> in 
                    <strong> Cybersecurity, Digital Forensics, Ethical Hacking, SOC, and DPDP Act Compliance</strong> with distinction.
                  </p>
                </div>

                {/* Bottom verification, QR, and signatures */}
                <div className="relative z-10 pt-6 mt-6 border-t border-slate-800/80 grid grid-cols-3 items-center gap-4 text-left">
                  
                  {/* Issue Date & ID */}
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-500">Credential ID</div>
                    <div className="text-xs font-mono font-bold text-slate-200">CSF-WIP26-8942</div>
                    <div className="text-[10px] text-slate-400 mt-1">Duration: 28 Days</div>
                  </div>

                  {/* Foundation Gold Seal */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-[2px] shadow-lg">
                      <div className="w-full h-full rounded-full bg-[#070e1e] flex flex-col items-center justify-center text-center p-1">
                        <Award className="w-6 h-6 text-amber-400" />
                        <span className="text-[7px] font-black uppercase text-amber-300 tracking-tighter">OFFICIAL SEAL</span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Validation */}
                  <div className="flex flex-col items-end">
                    <div className="w-12 h-12 bg-white p-1 rounded-lg shadow-sm flex items-center justify-center">
                      <QrCode className="w-10 h-10 text-black" />
                    </div>
                    <span className="text-[9px] font-mono text-cyan-400 mt-1">Scan to Verify</span>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
