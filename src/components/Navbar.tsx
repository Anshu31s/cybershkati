import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { SUMMER_INTERNSHIP_PATH, WINTER_INTERNSHIP_PATH } from '../routes';

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

  const linkClass = (isActive = false) => `inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? 'text-cyan-800' : 'text-slate-600 hover:text-cyan-700'
  }`;

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
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#090e1a]/95 px-3 py-2.5 shadow-lg shadow-black/20 backdrop-blur-xl sm:px-4"
      >
        <button
          type="button"
          onClick={() => goTo('/')}
          className="flex shrink-0 items-center gap-2.5 rounded-md text-left group"
          aria-label="Cyber Shakti Foundation home"
        >
          <img
            src="/logo.png"
            alt="Cyber Shakti Foundation"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
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
          <button type="button" onClick={() => goTo('/about')} className={linkClass(pathname === '/about')}>About us</button>
          <button type="button" onClick={() => goTo('/contact')} className={linkClass(pathname === '/contact')}>Contact us</button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition-colors hover:text-cyan-800 md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-xl border border-slate-800 bg-[#090e1a] p-2 shadow-xl md:hidden">
            <button type="button" onClick={() => goTo('/')} className="w-full rounded-md px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:text-cyan-800">Home</button>
            <button type="button" onClick={() => setInternshipOpen((open) => !open)} className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:text-cyan-800">
              Explore Internship <ChevronDown className={`h-4 w-4 transition-transform ${internshipOpen ? 'rotate-180' : ''}`} />
            </button>
            {internshipOpen && (
              <div className="mb-1 ml-3 border-l border-slate-700 pl-2">
                {internshipItems.map((item) => (
                  <button key={item.href} type="button" onClick={() => goTo(item.href)} className="block w-full rounded-md px-3 py-2 text-left text-sm text-slate-600 transition-colors hover:text-cyan-800">
                    <span className="block">{item.label}</span>
                    <span className="block text-xs text-slate-500">{item.detail}</span>
                  </button>
                ))}
              </div>
            )}
            <button type="button" onClick={() => goTo('/about')} className="w-full rounded-md px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:text-cyan-800">About us</button>
            <button type="button" onClick={() => goTo('/contact')} className="w-full rounded-md px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:text-cyan-800">Contact us</button>
          </div>
        )}
      </nav>
    </header>
  );
}
