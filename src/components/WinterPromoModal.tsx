"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Clock3, MonitorPlay, X } from "lucide-react";
import { WINTER_INTERNSHIP_PATH } from "../routes";
import { useRegistration } from "../context/RegistrationContext";

const DISMISSED_KEY = "winter-2026-promo-dismissed";

export default function WinterPromoModal({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const { currentPrice, loading } = useRegistration();

  useEffect(() => {
    if (sessionStorage.getItem(DISMISSED_KEY)) return;
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
    sessionStorage.setItem(DISMISSED_KEY, "true");
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
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-400/10 text-sky-300">
              <img src="/logo.png" alt="" className="h-10 w-10 object-contain" />
            </div>
            <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />
              Registration Open
            </span>
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Winter Internship · 2026</p>
          <h2 id="winter-promo-title" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Learn cybersecurity by doing.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
            Build practical skills across digital forensics, ethical hacking, SOC, OSINT, and more in the Cyber Shakti Foundation Winter Internship.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-y border-slate-700/70 py-4 text-xs font-medium text-slate-300 sm:grid-cols-3">
            <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 shrink-0 text-amber-300" />28 days</div>
            <div className="flex items-center gap-2"><MonitorPlay className="h-4 w-4 shrink-0 text-cyan-300" />Online · Live</div>
            <div className="col-span-2 flex items-center gap-2 sm:col-span-1"><CalendarDays className="h-4 w-4 shrink-0 text-violet-300" />2026 cohort</div>
          </div>

          {!loading && <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
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
            Explore Winter Internship <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
