import React, { useState } from 'react';
import { 
  HardDrive, 
  ShieldAlert, 
  Search, 
  Radio, 
  ShieldCheck, 
  FileCheck2, 
  Scale, 
  Check, 
  ExternalLink, 
  Layers, 
  ArrowRight,
  Terminal,
  Cpu
} from 'lucide-react';
import { PROGRAM_DATA } from '../data/programData';
import { motion } from 'motion/react';
import { useRegistration } from '../context/RegistrationContext';

export default function TracksSection({ onOpenRegister }) {
  const { currentPrice, pricingLoading } = useRegistration();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTrack, setSelectedTrack] = useState(null);

  // Map icon strings to Lucide components
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'HardDrive': return <HardDrive className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'Search': return <Search className="w-6 h-6" />;
      case 'Radio': return <Radio className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'FileCheck2': return <FileCheck2 className="w-6 h-6" />;
      case 'Scale': return <Scale className="w-6 h-6" />;
      default: return <Cpu className="w-6 h-6" />;
    }
  };

  const filteredTracks = PROGRAM_DATA.tracks.filter(track => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'new') return track.isNew;
    if (activeFilter === 'technical') return !track.isNew;
    return true;
  });

  return (
    <section id="tracks" className="py-24 bg-[#050811] relative">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            Curriculum Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            7 Comprehensive <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Learning Tracks</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Designed for 2026 industry requirements, from deep forensic disk analysis to newly enacted Indian data privacy laws.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              All 7 Tracks
            </button>
            <button
              onClick={() => setActiveFilter('new')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'new'
                  ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              NEW: DPDP Act & Cyber Law
            </button>
            <button
              onClick={() => setActiveFilter('technical')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === 'technical'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              Hands-on Technical Tracks (5)
            </button>
          </div>
        </div>

        {/* Tracks Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
        >
          {filteredTracks.map((track) => {
            const isHighlight = track.isNew;
            return (
              <motion.div
                key={track.id}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                className={`group relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isHighlight
                    ? 'bg-gradient-to-b from-slate-900 via-[#0d1424] to-[#070b14] border-2 border-amber-500/50 hover:border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:shadow-[0_0_35px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]'
                }`}
              >
                {/* Top Badge & Number */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-slate-500 font-bold">
                      TRACK 0{track.id}
                    </span>

                    {track.isNew ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold uppercase tracking-wider animate-pulse">
                        NEW Track
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-400 text-xs font-mono">
                        {track.tag}
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isHighlight
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:bg-amber-500/20'
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500/20'
                    }`}>
                      {getIcon(track.icon)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {track.title}
                      </h3>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-5">
                    {track.shortDesc}
                  </p>

                  {/* Key Syllabus Bullet Points */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                      Core Modules Included:
                    </div>
                    {track.keyTopics.slice(0, 3).map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isHighlight ? 'text-amber-400' : 'text-cyan-400'}`} />
                        <span>{topic}</span>
                      </div>
                    ))}
                    {track.keyTopics.length > 3 && (
                      <div className="text-[11px] text-slate-400 pl-5 italic font-mono">
                        + {track.keyTopics.length - 3} more advanced practical modules
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Tools & Action */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {track.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedTrack(track)}
                    className="w-full py-2.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800/60 hover:bg-cyan-500/10 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Track Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Banner callout for 28-day certificate */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-cyan-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0 mt-1 sm:mt-0">
              <Terminal className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                All 7 Tracks are covered in the 28-Day Winter Internship Program
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                You don't have to choose just one track — students gain multi-disciplinary exposure with hands-on labs and capstone case studies.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRegister}
            className="w-full lg:w-auto shrink-0 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <span>Register for All 7 Tracks{pricingLoading ? '' : ` (₹${currentPrice.toLocaleString('en-IN')})`}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

      </div>

      {/* Track Syllabus Modal */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
          <div className="bg-[#0b1220] border border-cyan-500/40 rounded-2xl max-w-xl w-full p-5 sm:p-8 relative shadow-2xl my-3 sm:my-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {getIcon(selectedTrack.icon)}
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400">
                    Track 0{selectedTrack.id} • {selectedTrack.tag}
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedTrack.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedTrack(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              {selectedTrack.shortDesc}
            </p>

            <div className="space-y-4 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                Full Curriculum Breakdown:
              </div>
              <div className="space-y-2.5">
                {selectedTrack.keyTopics.map((topic, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
                Industry Tools & Platforms Practiced:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTrack.tools.map((tool, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedTrack(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedTrack(null);
                  onOpenRegister();
                }}
                className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md"
              >
                Register for this Track
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
