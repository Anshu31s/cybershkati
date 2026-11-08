import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BarChart3, CalendarDays, Check, ChevronRight, CreditCard, Download, GraduationCap, KeyRound,
  LayoutDashboard, LoaderCircle, LogOut, RefreshCw, Settings2, ShieldCheck, Users,
} from 'lucide-react';
import * as XLSX from 'xlsx';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'inquiries', label: 'Inquiries', icon: Users },
  { id: 'internships', label: 'Internships', icon: GraduationCap },
  { id: 'payments', label: 'Razorpay Payments', icon: CreditCard },
  { id: 'pricing', label: 'Fee Structure', icon: Settings2 },
];

async function adminRequest(path, key, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', 'x-admin-key': key, ...(options.headers as Record<string, string> | undefined) },
  });
  const result = await response.json();
  if (!response.ok || !result.success) throw new Error(result.error || 'Admin request failed.');
  return result;
}

function money(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);
}

function rangeLabel(tier) {
  return `${tier.min.toLocaleString('en-IN')} – ${tier.max == null ? '1000+' : tier.max.toLocaleString('en-IN')} Students`;
}

export default function AdminPage() {
  // Keep server and first client render identical; restore browser-only state after hydration.
  const [key, setKey] = useState('');
  const [draftKey, setDraftKey] = useState('');
  const [page, setPage] = useState('pricing');
  const [config, setConfig] = useState(null);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const loadDashboard = useCallback(async (adminKey) => {
    setLoading(true);
    setError('');
    try {
      const [pricing, applicationData] = await Promise.all([
        adminRequest('/api/admin/pricing', adminKey),
        adminRequest('/api/admin/registrations', adminKey),
      ]);
      setConfig(pricing.config);
      setRegistrationCount(pricing.registrationCount);
      setRegistrations(applicationData.registrations || []);
      setKey(adminKey);
      sessionStorage.setItem('cyber-shakti-admin-key', adminKey);
    } catch (err) {
      setError(err.message);
      if (/invalid|not configured/i.test(err.message)) {
        setKey('');
        sessionStorage.removeItem('cyber-shakti-admin-key');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedKey = sessionStorage.getItem('cyber-shakti-admin-key');
    if (savedKey) loadDashboard(savedKey);
  }, [loadDashboard]);

  const paidRegistrations = useMemo(() => registrations.filter((registration) => registration.paymentStatus === 'captured' || registration.status === 'registered'), [registrations]);
  const pendingRegistrations = useMemo(() => registrations.filter((registration) => registration.paymentStatus !== 'captured' && registration.status !== 'registered'), [registrations]);
  const activeTier = useMemo(() => {
    if (!config?.tiers?.length) return null;
    if (config.mode === 'manual') return config.tiers.find((tier) => tier.id === config.manualTierId) || config.tiers[0];
    return config.tiers.find((tier) => registrationCount + 1 >= tier.min && (tier.max == null || registrationCount + 1 <= tier.max)) || config.tiers.at(-1);
  }, [config, registrationCount]);

  const updateTierAmount = (tierId, amount) => {
    setSaved(false);
    setConfig((current) => ({
      ...current,
      tiers: current.tiers.map((tier) => tier.id === tierId ? { ...tier, amount: Number(amount) } : tier),
    }));
  };

  const saveConfiguration = async () => {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      const result = await adminRequest('/api/admin/pricing', key, {
        method: 'PUT',
        body: JSON.stringify({ mode: config.mode, manualTierId: config.manualTierId, tiers: config.tiers }),
      });
      setConfig(result.config);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const downloadRegistrations = (records = registrations) => {
    const rows = records.map((record) => ({
      'Database ID': record.id,
      'Application ID': record.applicationId,
      'Full Name': record.fullName,
      Email: record.email,
      Phone: record.phone,
      'Alternative Phone': record.altPhone,
      WhatsApp: record.whatsappNumber,
      Gender: record.gender,
      'Date of Birth': record.dob,
      'Experience Level': record.experienceLevel,
      'Has Prior Internship': record.hasPriorInternship,
      'Prior Internship Details': record.priorInternshipDetails,
      'Current Role': record.currentRole,
      College: record.college,
      Course: record.course,
      'Year of Study': record.yearOfStudy,
      'Heard About Event': record.hearAboutEvent,
      'Registration Status': record.status,
      'Payment Status': record.paymentStatus,
      'Payment Amount (INR)': record.amount,
      'Pricing Tier': record.pricingTierId,
      'Payment Method': record.paymentMethod,
      Currency: record.paymentCurrency,
      'Razorpay Order ID': record.razorpayOrderId,
      'Razorpay Payment ID': record.razorpayPaymentId,
      'Payment Fee (INR)': record.paymentFee == null ? '' : record.paymentFee / 100,
      'Payment Tax (INR)': record.paymentTax == null ? '' : record.paymentTax / 100,
      'Payment Captured At': record.paymentCapturedAt ? new Date(record.paymentCapturedAt).toISOString() : '',
      'Confirmation Email Sent At': record.confirmationEmailSentAt ? new Date(record.confirmationEmailSentAt).toISOString() : '',
      'Created At': record.createdAt ? new Date(record.createdAt).toISOString() : '',
      'Updated At': record.updatedAt ? new Date(record.updatedAt).toISOString() : '',
    }));
    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet['!cols'] = Object.keys(rows[0] || {}).map((header) => ({ wch: Math.min(Math.max(header.length + 3, 16), 38) }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    XLSX.writeFile(workbook, `cyber-shakti-registrations-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  if (!key) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#070b14] px-4 py-16 text-white">
        <form onSubmit={(event) => { event.preventDefault(); loadDashboard(draftKey.trim()); }} className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0b111d] p-8 shadow-2xl">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300"><ShieldCheck /></div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Cyber Shakti Command Center</p>
          <h1 className="mt-2 text-2xl font-bold">Admin sign in</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">Enter the admin access key configured on the server.</p>
          <label htmlFor="admin-key" className="mt-6 block text-sm font-medium text-slate-300">Admin access key</label>
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-[#070b14] px-3 focus-within:border-cyan-400">
            <KeyRound className="h-4 w-4 text-slate-500" />
            <input id="admin-key" autoComplete="current-password" type="password" value={draftKey} onChange={(event) => setDraftKey(event.target.value)} className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Enter access key" />
          </div>
          {error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}
          <button disabled={loading || !draftKey.trim()} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />} Unlock admin panel
          </button>
        </form>
      </main>
    );
  }

  const title = NAV_ITEMS.find((item) => item.id === page)?.label || 'Overview';

  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1500px] border-x border-slate-800/70">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-800 bg-[#080d17] p-5 md:flex">
          <div className="mb-9 flex items-center gap-3 px-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500 text-slate-950"><ShieldCheck className="h-5 w-5" /></span>
            <div><div className="text-sm font-bold tracking-[0.12em]">ADMIN</div><div className="text-[11px] text-slate-500">Cyber Shakti Command Center</div></div>
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setPage(id)} className={`flex w-full items-center gap-3 rounded-lg border-l-2 px-3 py-3 text-left text-sm transition ${page === id ? 'border-cyan-400 bg-cyan-400/10 text-cyan-200' : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-xl border border-slate-800 bg-[#0d1522] p-3"><div className="text-sm font-medium">Admin session</div><div className="mt-1 flex items-center gap-2 text-xs text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Secure connection</div></div>
        </aside>

        <section className="min-w-0 flex-1 p-4 sm:p-7 lg:p-9">
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-800 pb-5 md:hidden">
            <span className="font-bold">CYBER SHAKTI · ADMIN</span>
            <select aria-label="Admin section" value={page} onChange={(event) => setPage(event.target.value)} className="rounded-lg border border-slate-700 bg-[#0b111d] px-3 py-2 text-sm">{NAV_ITEMS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select>
          </div>
          <header className="mb-7 flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-300">Winter Internship Program 2026</p><h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{page === 'pricing' ? 'Pricing Control Center' : title}</h1><p className="mt-2 max-w-2xl text-sm text-slate-400">{page === 'pricing' ? 'Configure the automatic registration fee tiers or manually choose the active fee.' : page === 'inquiries' ? 'Review every registration, applicant response, and payment record.' : 'Review program activity and registration records.'}</p></div>
            <div className="flex gap-2">
              <button onClick={() => loadDashboard(key)} disabled={loading} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
              <button onClick={() => { sessionStorage.removeItem('cyber-shakti-admin-key'); setKey(''); setConfig(null); }} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Log out</span></button>
            </div>
          </header>

          {error && <div role="alert" className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
          {loading && !config ? <div className="flex min-h-64 items-center justify-center text-slate-400"><LoaderCircle className="mr-2 h-5 w-5 animate-spin" />Loading control center…</div> : null}

          {page === 'pricing' && config && <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#0b111d] p-4">
              <div><div className="text-sm font-medium">Pricing behavior</div><div className="mt-1 text-xs text-slate-500">Auto advances by paid registration count. Manual keeps the selected tier active.</div></div>
              <div className="flex rounded-lg border border-slate-700 bg-[#070b14] p-1">
                {[['auto', 'Auto Mode'], ['manual', 'Manual Force']].map(([value, label]) => <button key={value} onClick={() => { setSaved(false); setConfig((current) => ({ ...current, mode: value, manualTierId: current.manualTierId || current.tiers[0].id })); }} className={`rounded-md px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${config.mode === value ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}>{label}</button>)}
              </div>
            </div>
            {config.mode === 'manual' && <div className="mb-5 rounded-lg border border-amber-400/25 bg-amber-400/5 px-4 py-3 text-sm text-amber-100">Manual Force is on. Select a tier below; every new registration will use that fee until Auto Mode is restored.</div>}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {config.tiers.map((tier, index) => {
                const selected = config.mode === 'manual' ? config.manualTierId === tier.id : activeTier?.id === tier.id;
                return <article key={tier.id} className={`relative rounded-2xl border bg-[#0b111d] p-5 transition ${selected ? 'border-cyan-400/80 shadow-[0_0_24px_rgba(34,211,238,0.09)]' : 'border-slate-800 hover:border-slate-700'}`}>
                  <div className="mb-5 flex items-start justify-between gap-3"><div><div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Tier {index + 1}</div><h2 className="mt-2 text-base font-bold">{rangeLabel(tier)}</h2></div>{selected && <span className="rounded-full bg-cyan-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-300">{config.mode === 'manual' ? 'Manual Active' : 'System Active'}</span>}</div>
                  <label className="flex items-baseline gap-2 text-slate-400" htmlFor={`amount-${tier.id}`}><span className="text-2xl font-semibold text-cyan-300">₹</span><input id={`amount-${tier.id}`} type="number" min="1" step="1" value={tier.amount} onChange={(event) => updateTierAmount(tier.id, event.target.value)} className="w-36 border-b border-slate-700 bg-transparent text-3xl font-bold text-white outline-none focus:border-cyan-400" /><span className="text-xs">per student</span></label>
                  <div className="my-5 border-t border-slate-800" />
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-500"><span>Registration count: {tier.min.toLocaleString('en-IN')}–{tier.max == null ? 'unlimited' : tier.max.toLocaleString('en-IN')}</span>{config.mode === 'manual' && <button onClick={() => { setSaved(false); setConfig((current) => ({ ...current, manualTierId: tier.id })); }} className="font-semibold text-cyan-300 hover:text-cyan-200">Use this fee <ChevronRight className="inline h-3.5 w-3.5" /></button>}</div>
                </article>;
              })}
            </div>
            <div className="mt-5 flex flex-col justify-between gap-4 rounded-xl border border-slate-800 bg-[#0b111d] p-4 sm:flex-row sm:items-center sm:px-5"><p className="text-sm text-slate-400">{config.mode === 'auto' ? <>Auto pricing will use <strong className="text-white">{money(activeTier?.amount)}</strong> for the next registration ({(registrationCount + 1).toLocaleString('en-IN')} total).</> : <>Manual pricing will use <strong className="text-white">{money(activeTier?.amount)}</strong> for every new registration.</>}</p><button onClick={saveConfiguration} disabled={saving || config.tiers.some((tier) => !Number.isSafeInteger(tier.amount) || tier.amount < 1)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50">{saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : <Settings2 className="h-4 w-4" />}{saved ? 'Configuration Saved' : 'Save Configuration'}</button></div>
          </>}

          {page === 'overview' && <div className="grid gap-4 sm:grid-cols-3"><Metric icon={Users} label="Applications" value={registrations.length} /><Metric icon={Check} label="Paid registrations" value={paidRegistrations.length} /><Metric icon={CreditCard} label="Awaiting payment" value={pendingRegistrations.length} /></div>}
          {page === 'inquiries' && <RegistrationTable registrations={registrations} onExport={downloadRegistrations} empty="No registrations found." />}
          {page === 'payments' && <RegistrationTable registrations={registrations} onExport={downloadRegistrations} />}
          {page === 'internships' && <div className="grid gap-4 lg:grid-cols-2"><ProgramCard title="Winter Internship Program 2026" detail="Current program · 28 days · Registration fees controlled above" status="Current" /><ProgramCard title="45-Day Summer Internship" detail="Completed first internship program · Archive" status="Completed" /></div>}
        </section>
      </div>
    </main>
  );
}

function Metric({ icon: Icon, label, value }) {
  return <div className="rounded-xl border border-slate-800 bg-[#0b111d] p-5"><div className="flex items-center justify-between text-sm text-slate-400"><span>{label}</span><Icon className="h-4 w-4 text-cyan-300" /></div><div className="mt-3 text-3xl font-bold">{value}</div></div>;
}

function ProgramCard({ title, detail, status }) {
  return <article className="rounded-xl border border-slate-800 bg-[#0b111d] p-5"><span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-200">{status}</span><h2 className="mt-4 text-xl font-bold">{title}</h2><p className="mt-2 text-sm text-slate-400">{detail}</p></article>;
}

function RegistrationTable({ registrations, onExport, empty = 'No registration records found.' }) {
  const [fromDate, setFromDate] = useState('');
  const filteredRegistrations = useMemo(() => {
    if (!fromDate) return registrations;
    return registrations.filter((record) => {
      if (!record.createdAt) return false;
      const created = new Date(record.createdAt);
      if (Number.isNaN(created.getTime())) return false;
      const createdDate = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}-${String(created.getDate()).padStart(2, '0')}`;
      return createdDate >= fromDate;
    });
  }, [fromDate, registrations]);

  const display = (value) => value == null || value === '' ? '—' : String(value);
  const date = (value) => value ? new Date(value).toLocaleString() : '—';
  const groups = [
    { title: 'Applicant details', fields: [['Full name', 'fullName'], ['Email', 'email'], ['Phone', 'phone'], ['Alternative phone', 'altPhone'], ['WhatsApp', 'whatsappNumber'], ['Gender', 'gender'], ['Date of birth', 'dob']] },
    { title: 'Program details', fields: [['Current role', 'currentRole'], ['College / organization', 'college'], ['Course', 'course'], ['Year of study', 'yearOfStudy'], ['Experience level', 'experienceLevel'], ['Prior internship', 'hasPriorInternship'], ['Prior internship details', 'priorInternshipDetails'], ['Heard about event', 'hearAboutEvent']] },
    { title: 'Payment details', fields: [['Registration status', 'status'], ['Payment status', 'paymentStatus'], ['Amount', 'amount'], ['Pricing tier', 'pricingTierId'], ['Payment method', 'paymentMethod'], ['Currency', 'paymentCurrency'], ['Razorpay order ID', 'razorpayOrderId'], ['Razorpay payment ID', 'razorpayPaymentId'], ['Provider fee', 'paymentFee'], ['Payment tax', 'paymentTax'], ['Captured at', 'paymentCapturedAt'], ['Confirmation email sent', 'confirmationEmailSentAt']] },
  ];

  return <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#0b111d] px-4 py-3">
      <p className="text-sm text-slate-400"><span className="font-semibold text-white">{filteredRegistrations.length}</span>{fromDate ? ` of ${registrations.length}` : ''} registration records · applicant and payment details</p>
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="registration-from-date" className="sr-only">Show registrations from date</label>
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#070b14] px-3 text-slate-400 focus-within:border-cyan-400">
          <CalendarDays className="h-4 w-4" />
          <span className="whitespace-nowrap text-xs">From date</span>
          <input id="registration-from-date" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} className="min-h-10 bg-transparent text-sm text-slate-200 outline-none [color-scheme:dark]" />
        </div>
        {fromDate && <button type="button" onClick={() => setFromDate('')} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5">Clear</button>}
        <button onClick={() => onExport(filteredRegistrations)} disabled={!filteredRegistrations.length} className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"><Download className="h-4 w-4" />Download Excel</button>
      </div>
    </div>
    {!filteredRegistrations.length ? <div className="rounded-xl border border-slate-800 bg-[#0b111d] p-8 text-center text-sm text-slate-400">{registrations.length ? 'No registrations found from this date.' : empty}</div> : filteredRegistrations.map((record) => <article key={record.id} className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b111d]">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 px-5 py-4">
        <div><h2 className="text-lg font-semibold text-white">{display(record.fullName)}</h2><p className="mt-1 font-mono text-xs text-cyan-300">{display(record.applicationId)}</p></div>
        <div className="flex flex-wrap gap-2"><span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">{display(record.status)}</span><span className={`rounded-full border px-3 py-1 text-xs ${record.paymentStatus === 'captured' ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200' : 'border-amber-400/20 bg-amber-400/10 text-amber-200'}`}>{display(record.paymentStatus)}</span></div>
      </div>
      <div className="grid gap-5 p-5 xl:grid-cols-3">
        {groups.map((group) => <section key={group.title} className="min-w-0"><h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{group.title}</h3><dl className="space-y-3">{group.fields.map(([label, field]) => {
          let value = record[field];
          if (field === 'amount' && value != null) value = money(value);
          if (field === 'paymentFee' || field === 'paymentTax') value = value == null ? '—' : money(value / 100);
          if (field === 'paymentCapturedAt' || field === 'confirmationEmailSentAt') value = date(value);
          return <div key={field} className="grid grid-cols-[minmax(105px,0.8fr)_minmax(0,1.2fr)] gap-2 text-sm"><dt className="text-slate-500">{label}</dt><dd className="break-words text-slate-200">{display(value)}</dd></div>;
        })}</dl></section>)}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-800 px-5 py-3 text-xs text-slate-500"><span>Created: {date(record.createdAt)}</span><span>Updated: {date(record.updatedAt)}</span><span>Confirmation: {record.confirmationEmailSentAt ? 'Email sent' : 'Not sent'}</span></div>
    </article>)}
  </div>;
}
