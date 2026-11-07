'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, LoaderCircle, Mail, Send, ShieldCheck } from 'lucide-react';

const initialForm = { name: '', email: '', subject: '', message: '', website: '' };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState('sending');
    setFeedback('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'We could not send your message. Please try again.');
      setState('sent');
      setFeedback('Thanks for contacting us. Your message has been sent to our team.');
      setForm(initialForm);
    } catch (error) {
      setState('error');
      setFeedback(error instanceof Error ? error.message : 'We could not send your message. Please try again.');
    }
  };

  const inputClass =
    'mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3.5 py-3 font-normal text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20';

  return (
    <main className="flex-1 bg-transparent px-4 pb-20 pt-32 text-slate-100 sm:px-6 sm:pt-40">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <section className="pt-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300">
            <ShieldCheck className="h-4 w-4" /> Contact the Foundation
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Let’s talk.</h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
            Questions about our internship programs, partnerships, or cybersecurity education? Send us a message and our team will get back to you.
          </p>
          <a
            href="mailto:info@cybershaktifoundation.org"
            className="mt-8 inline-flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/40 hover:text-cyan-300"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-cyan-400">
              <Mail className="h-4 w-4" />
            </span>
            info@cybershaktifoundation.org
          </a>
        </section>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-200">
              Your name *
              <input
                name="name"
                value={form.name}
                onChange={update}
                required
                maxLength={100}
                autoComplete="name"
                className={inputClass}
                placeholder="Full name"
              />
            </label>
            <label className="text-sm font-semibold text-slate-200">
              Email address *
              <input
                name="email"
                value={form.email}
                onChange={update}
                required
                maxLength={254}
                type="email"
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="mt-5 block text-sm font-semibold text-slate-200">
            Subject *
            <input
              name="subject"
              value={form.subject}
              onChange={update}
              required
              maxLength={160}
              className={inputClass}
              placeholder="How can we help?"
            />
          </label>
          <label className="mt-5 block text-sm font-semibold text-slate-200">
            Message *
            <textarea
              name="message"
              value={form.message}
              onChange={update}
              required
              minLength={10}
              maxLength={5000}
              rows={6}
              className={`${inputClass} resize-y`}
              placeholder="Write your message..."
            />
          </label>
          <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
            <label>
              Leave this field empty
              <input name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {feedback && (
            <div
              role={state === 'error' ? 'alert' : 'status'}
              className={`mt-5 flex items-start gap-2 rounded-lg px-3.5 py-3 text-sm ${
                state === 'error' ? 'bg-rose-950/50 text-rose-300 border border-rose-500/40' : 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {state === 'error' ? (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              {feedback}
            </div>
          )}
          <button
            type="submit"
            disabled={state === 'sending'}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-cyan-400 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
          >
            {state === 'sending' ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send message
              </>
            )}
          </button>
          <p className="mt-4 text-xs leading-5 text-slate-400">
            Your message will be sent to Cyber Shakti Foundation. Your email is used only so our team can reply.
          </p>
        </form>
      </div>
    </main>
  );
}