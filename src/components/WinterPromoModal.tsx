"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Clock3, MonitorPlay, X } from "lucide-react";
import { WINTER_INTERNSHIP_PATH } from "../routes";
import { useRegistration } from "../context/RegistrationContext";

export default function WinterPromoModal({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const { currentPrice, pricingLoading } = useRegistration();

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-[#020611]/80 px-4 py-8 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="winter-promo-title"
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-[28px] border border-sky-400/30 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,.16),transparent_48%),linear-gradient(145deg,#101d32_0%,#08101f_70%,#070c17_100%)] p-6 text-white shadow-[0_24px_100px_rgba(0,0,0,.65),0_0_60px_rgba(14,165,233,.14)] sm:p-8"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
        <button
          type="button"
          onClick={close}
          aria-label="Close winter internship announcement"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 bg-slate-800/80 text-slate-300 transition hover:border-sky-400/60 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <div className="flex items-start justify-between gap-4 pr-10">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-sky-300/25 bg-sky-400/10 p-1 text-sky-300 shadow-md shadow-sky-950/40">
              <img
                src="/cyber-shakti-emblem.png"
                alt="Cyber Shakti Foundation"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />
              Registration Open
            </span>
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Winter Internship · 2026</p>
          <h2 id="winter-promo-title" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Learn Cybersecurity by Doing – Not Just Watching!</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
            Join the Cyber Shakti Foundation 28-Day Winter Internship Program 2026 and gain practical experience in Digital Forensics, Ethical Hacking, SOC Operations, OSINT, Cyber Law, and the DPDP Act.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-y border-slate-700/70 py-4 text-xs font-medium text-slate-300 sm:grid-cols-3">
            <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 shrink-0 text-amber-300" />28 days</div>
            <div className="flex items-center gap-2"><MonitorPlay className="h-4 w-4 shrink-0 text-cyan-300" />Online · Live</div>
            <div className="col-span-2 flex items-center gap-2 sm:col-span-1"><CalendarDays className="h-4 w-4 shrink-0 text-violet-300" />2026 cohort</div>
          </div>

          {!pricingLoading && <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-sm text-slate-400">Current fee</span>
            <span className="text-3xl font-extrabold tracking-tight text-white">₹{Number(currentPrice).toLocaleString("en-IN")}</span>
            <span className="text-xs text-slate-500">Fee may change by registration tier</span>
          </div>}

          <button
            type="button"
            onClick={() => {
              close();
              onNavigate(WINTER_INTERNSHIP_PATH);
            }}
            className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3 text-base font-extrabold text-slate-950 shadow-lg shadow-sky-950/40 transition hover:brightness-110 active:scale-[.99]"
          >
             SECURE YOUR SEAT <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
