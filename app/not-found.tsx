import Link from 'next/link';
import { ArrowLeft, ArrowRight, House, ShieldAlert } from 'lucide-react';
import { WINTER_INTERNSHIP_PATH } from '../src/routes';

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#040711] px-5 pb-16 pt-32 text-slate-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 cyber-grid opacity-40" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.08] blur-[120px]" />

      <section className="w-full max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300 shadow-[0_0_32px_rgba(34,211,238,.12)]">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <p className="mt-8 font-mono text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">Page not found</p>
        <h1 className="mt-3 text-7xl font-black tracking-[-0.08em] text-white sm:text-9xl">404</h1>
        <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">Looks like this page went off the grid.</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
          The address may be outdated or the page may have moved. Head back to the foundation website or explore the Winter Internship Program.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300">
            <House className="h-4 w-4" /> Go to homepage
          </Link>
          <Link href={WINTER_INTERNSHIP_PATH} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-white/[0.03] px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-400/50 hover:bg-cyan-400/[0.06] hover:text-white">
            Explore Winter Internship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Link href="/" className="mt-8 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-cyan-300">
          <ArrowLeft className="h-3.5 w-3.5" /> Return to Cyber Shakti Foundation
        </Link>
      </section>
    </main>
  );
}
