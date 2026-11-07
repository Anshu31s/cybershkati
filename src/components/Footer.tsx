import React from 'react';
import { 
  Shield, 
  Phone, 
  Mail, 
  Globe, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Heart, 
  ArrowUp,
  Lock,
  ExternalLink
} from 'lucide-react';
import { PROGRAM_DATA } from '../data/programData';
import XLogo from './XLogo';
import { useRegistration } from '../context/RegistrationContext';

export default function Footer({ onOpenRegister, actionLabel, programContext = 'general' }) {
  const { currentPrice } = useRegistration();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const socialIcons = {
    LinkedIn: <Linkedin className="w-4 h-4" />,
    Instagram: <Instagram className="w-4 h-4" />,
    YouTube: <Youtube className="w-4 h-4" />,
    "X (Twitter)": <XLogo className="w-4 h-4" />
  };
  const programLabel = programContext === 'winter'
    ? 'Winter Internship Program 2026'
    : programContext === 'summer'
      ? 'First Summer Internship · Completed'
      : 'Cybersecurity Internship Programs';
  const description = programContext === 'winter'
    ? 'Empowering India’s cybersecurity talent through 28 days of practical learning across digital forensics, ethical hacking, threat intelligence, and data privacy.'
    : programContext === 'summer'
      ? 'Explore the completed first internship offered by Cyber Shakti Foundation, featuring hands-on training, project-based learning, and expert-led sessions.'
      : 'Empowering cybersecurity talent through hands-on learning, practical labs, and real-world projects.';

  return (
    <footer className="bg-[#03060d] border-t border-slate-800 text-slate-400 text-xs sm:text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 justify-between">
          
          {/* Brand info */}
          <div className="space-y-4 max-w-md">
            <div className="space-y-3">
              <a href="/" className="inline-block group" aria-label="Cyber Shakti Foundation Home">
                <img
                  src="/logo.png"
                  alt="Cyber Shakti Foundation Logo"
                  className="h-10 sm:h-14 w-auto max-w-[220px] sm:max-w-none object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </a>
              <span className="block text-[11px] text-cyan-400 font-mono uppercase tracking-wider">
                {programLabel}
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              {description}
            </p>

            <div className="flex items-center gap-2 pt-2">
              {PROGRAM_DATA.contact.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                  aria-label={social.name}
                >
                  {socialIcons[social.name]}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:ml-auto max-w-xs w-full">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">
              Contact Foundation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href={`tel:${PROGRAM_DATA.contact.phone}`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors font-mono">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{PROGRAM_DATA.contact.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${PROGRAM_DATA.contact.email}`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors font-mono">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{PROGRAM_DATA.contact.email}</span>
                </a>
              </li>
              <li>
                <a href={PROGRAM_DATA.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors font-mono">
                  <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{PROGRAM_DATA.contact.displayWebsite}</span>
                </a>
              </li>
              {onOpenRegister && <li className="pt-2">
                <button
                  onClick={onOpenRegister}
                  className="w-full py-2 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold font-mono transition-colors"
                >
                  {actionLabel || `Register Now (₹${currentPrice.toLocaleString('en-IN')})`}
                </button>
              </li>}
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Cyber Shakti Foundation. All rights reserved. Registered Not-For-Profit Cyber Initiative.
          </div>

          <div className="flex items-center gap-6">
            <a 
              href={PROGRAM_DATA.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-300 transition-colors"
            >
              {PROGRAM_DATA.displayUrl}
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
