import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, ShieldCheck, X } from 'lucide-react';
import { REGISTER_PATH, SPEAKERS_PATH, SUMMER_INTERNSHIP_PATH, WINTER_INTERNSHIP_PATH } from '../routes';

const internshipItems = [
  { label: 'Winter Internship 2026', detail: 'Current program', href: WINTER_INTERNSHIP_PATH },
  { label: '45-Day Summer Internship', detail: 'Our first program · Completed', href: SUMMER_INTERNSHIP_PATH }
];

export default function Navbar({ pathname, onNavigate }) {
  const [internshipOpen, setInternshipOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setInternshipOpen(false);
        setMobileOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setInternshipOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const goTo = (path) => {
    onNavigate(path);
    setInternshipOpen(false);
    setMobileOpen(false);
  };

  const isDarkHeader = ['/', '/register', '/about', '/contact', SPEAKERS_PATH].includes(pathname);
  const linkClass = (isActive = false) => `inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
    isDarkHeader ? (isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white') : (isActive ? 'text-cyan-800' : 'text-slate-600 hover:text-cyan-700')
  }`;
  const mobileLinkClass = `w-full rounded-md px-3 py-2.5 text-left text-sm transition-colors ${isDarkHeader ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-700 hover:text-cyan-800'}`;

  const internshipMenu = (
    <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-lg border border-slate-700 bg-[#0b1220] p-1.5 shadow-xl shadow-black/40">
      {internshipItems.map((item, index) => (
        <React.Fragment key={item.href}>
          {index === 1 && <div className="my-1.5 h-px bg-slate-800" />}
          <button
            type="button"
            onClick={() => goTo(item.href)}
            className="flex w-full items-start justify-between gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:text-cyan-800"
          >
            <span className="text-sm font-medium text-slate-100">{item.label}</span>
            <span className="shrink-0 pt-0.5 text-[11px] text-slate-500">{item.detail}</span>
          </button>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="relative mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3 border-b border-slate-800 bg-[#06162a]/95 px-4 py-3 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-8 lg:px-12"
      >
        <button
          type="button"
          onClick={() => goTo('/')}
          className="flex min-w-0 shrink-0 items-center gap-3 rounded-md text-left group"
          aria-label="Cyber Shakti Foundation home"
        >
          <img
            src="/logo.png"
            alt="Cyber Shakti Foundation"
            className="h-8 sm:h-10 md:h-11 w-auto max-w-[190px] sm:max-w-none object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span aria-hidden="true" className="h-8 w-px shrink-0 bg-white/80 sm:h-10 md:h-11" />
          <img
            src="/cybersecurity_council_logo.png"
            alt="Cybersecurity Council"
            className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </button>

        <div className="hidden items-center gap-1 md:flex">
          <button type="button" onClick={() => goTo('/')} className={linkClass(pathname === '/')}>Home</button>
          <div className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={internshipOpen}
              onClick={() => setInternshipOpen((open) => !open)}
              className={linkClass(pathname !== '/')}
            >
              Explore Internship
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${internshipOpen ? 'rotate-180' : ''}`} />
            </button>
            {internshipOpen && internshipMenu}
          </div>
          <button type="button" onClick={() => goTo(SPEAKERS_PATH)} className={linkClass(pathname === SPEAKERS_PATH)}>Speakers</button>
          <button type="button" onClick={() => goTo('/about')} className={linkClass(pathname === '/about')}>About us</button>
          <button type="button" onClick={() => goTo('/contact')} className={linkClass(pathname === '/contact')}>Contact us</button>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => goTo(REGISTER_PATH)} className="hidden items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 sm:inline-flex">
            Register now <ArrowUpRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors md:hidden ${isDarkHeader ? 'border-slate-600 text-slate-200 hover:text-white' : 'border-slate-300 text-slate-600 hover:text-cyan-800'}`}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-xl border border-slate-800 bg-[#090e1a] p-2 shadow-xl md:hidden">
            <button type="button" onClick={() => goTo('/')} className={mobileLinkClass}>Home</button>
            <button type="button" onClick={() => setInternshipOpen((open) => !open)} className={`flex items-center justify-between ${mobileLinkClass}`}>
              Explore Internship <ChevronDown className={`h-4 w-4 transition-transform ${internshipOpen ? 'rotate-180' : ''}`} />
            </button>
            {internshipOpen && (
              <div className="mb-1 ml-3 border-l border-slate-700 pl-2">
                {internshipItems.map((item) => (
                  <button key={item.href} type="button" onClick={() => goTo(item.href)} className={`block ${mobileLinkClass}`}>
                    <span className="block">{item.label}</span>
                    <span className="block text-xs text-slate-500">{item.detail}</span>
                  </button>
                ))}
              </div>
            )}
            <button type="button" onClick={() => goTo(SPEAKERS_PATH)} className={mobileLinkClass}>Speakers</button>
            <button type="button" onClick={() => goTo('/about')} className={mobileLinkClass}>About us</button>
            <button type="button" onClick={() => goTo('/contact')} className={mobileLinkClass}>Contact us</button>
            <button type="button" onClick={() => goTo(REGISTER_PATH)} className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-left text-sm font-bold text-white transition hover:bg-blue-500">Register now <ArrowUpRight className="h-4 w-4" /></button>
          </div>
        )}
      </nav>
    </header>
  );
}
