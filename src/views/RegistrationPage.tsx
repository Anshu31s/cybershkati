import React, { useState } from "react";
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Briefcase,
  HelpCircle,
  MessageSquare,
  AlertCircle,
  Loader2,
  Clock,
  Award,
  Copy,
  Check,
  Calendar,
  GraduationCap,
  FileText,
  Monitor,
  BarChart3,
  Send,
  Search,
  Wifi,
  Scale,
  Target,
  Terminal,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PROGRAM_DATA } from "../data/programData";
import { createRazorpayOrder, verifyRazorpayPayment } from "../lib/api";
import { useRegistration } from "../context/RegistrationContext";
import ScrollReveal from "../components/ScrollReveal";
import { useRegistrationFormStore } from "../store/registration-form";
import { WINTER_INTERNSHIP_PATH } from "../routes";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      on: (event: string, handler: (response: any) => void) => void;
      open: () => void;
    };
  }
}

let razorpayCheckoutScript: Promise<any> | null = null;

function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve(window.Razorpay);
  if (razorpayCheckoutScript) return razorpayCheckoutScript;

  razorpayCheckoutScript = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      if (window.Razorpay) resolve(window.Razorpay);
      else {
        razorpayCheckoutScript = null;
        reject(new Error("Razorpay Checkout could not be loaded."));
      }
    };
    script.onerror = () => {
      razorpayCheckoutScript = null;
      reject(new Error("Could not load Razorpay Checkout. Check your connection and try again."));
    };
    document.body.appendChild(script);
  });

  return razorpayCheckoutScript;
}

function SelectChevron() {
  return (
    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

export default function RegistrationPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const formData = useRegistrationFormStore((state) => state.formData);
  const updateFormData = useRegistrationFormStore((state) => state.updateFormData);
  const resetFormData = useRegistrationFormStore((state) => state.resetFormData);
  const { notifyNewRegistration } = useRegistration();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStage, setSubmissionStage] = useState<'checkout' | 'verification'>('checkout');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(false);
  const [appId, setAppId] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [confirmedName, setConfirmedName] = useState("");
  const [copiedAppId, setCopiedAppId] = useState(false);

  const genderOptions = [
    "Male",
    "Female",
    "Non-Binary / Third Gender",
    "Prefer not to say",
  ];

  const experienceOptions = [
    "Beginner (No prior cybersecurity background)",
    "Intermediate (Knowledge of networking/Linux/basic security)",
    "Advanced (Hands-on lab / CTF / project experience)",
    "Professional (Currently working in IT/Cybersecurity)",
  ];

  const roleOptions = [
    "Student (B.Tech / BCA / MCA / M.Sc)",
    "Working Cybersecurity Professional",
    "IT / Software Engineer",
    "Law / Forensic Examiner",
    "Faculty / Academic Researcher",
    "Career Transitioner / Tech Enthusiast",
    "Other",
  ];

  const hearAboutOptions = [
    "LinkedIn",
    "WhatsApp / Telegram Community",
    "College / University Notice",
    "Friend / Peer Recommendation",
    "Instagram",
    "Cyber Shakti Foundation Website",
    "YouTube",
    "Other",
  ];

  const programFacts = [
    { icon: Calendar, label: "Registration Starts", value: "08 November 2026" },
    { icon: Clock, label: "Duration", value: "45 Days (Online)" },
    { icon: Monitor, label: "Mode", value: "Live Sessions" },
    { icon: Award, label: "Certificate", value: "Physical + e-Certificate" },
  ];

  const programHighlights = [
    { icon: Search, title: "Digital Forensics & Evidence Analysis" },
    { icon: Terminal, title: "Ethical Hacking & Penetration Testing" },
    { icon: Wifi, title: "OSINT & Cyber Intelligence Investigation" },
    { icon: Monitor, title: "Network & Mobile Forensics" },
    { icon: BarChart3, title: "SOC Monitoring & Threat Analysis" },
    { icon: Scale, title: "Cyber Law & Cybercrime Investigation" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    updateFormData(name as any, type === "checkbox" ? target.checked : value);
  };

  const handleCopyAppId = () => {
    navigator.clipboard.writeText(appId);
    setCopiedAppId(true);
    setTimeout(() => setCopiedAppId(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmissionStage('checkout');
    setSubmitError(null);

    if (
      formData.hasPriorInternship === "Yes" &&
      !formData.priorInternshipDetails.trim()
    ) {
      setSubmitError("Please provide details of your previous internship.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      altPhone: (formData.altPhone || "").trim(),
      whatsappNumber: formData.phone.trim(),
      gender: formData.gender,
      dob: formData.dob,
      experienceLevel: formData.experienceLevel,
      hasPriorInternship: formData.hasPriorInternship,
      priorInternshipDetails: (formData.priorInternshipDetails || "").trim(),
      currentRole: formData.currentRole,
      college: (formData.college || "N/A").trim(),
      course: formData.currentRole,
      year: "2026",
      hearAboutEvent: formData.hearAboutEvent,
    };

    try {
      const order = await createRazorpayOrder(payload);
      setAppId(order.applicationId);
      const Razorpay = await loadRazorpayCheckout();
      const checkout = new Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: PROGRAM_DATA.organization,
        description: "Winter Internship Program 2026",
        order_id: order.orderId,
        prefill: {
          name: payload.fullName,
          email: payload.email,
          contact: payload.phone,
        },
        notes: { applicationId: order.applicationId },
        theme: { color: "#0e7490" },
        handler: async (paymentResponse: any) => {
          setSubmissionStage('verification');
          setIsSubmitting(true);
          try {
            const verification = await verifyRazorpayPayment({
              ...paymentResponse,
              registrationToken: order.registrationToken,
            });
            setConfirmedName(payload.fullName);
            setConfirmedEmail(payload.email);
            setConfirmationEmailSent(Boolean(verification.emailSent));
            setIsSubmitted(true);
            resetFormData();
            notifyNewRegistration();
            confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
            window.scrollTo({ top: 0, behavior: "auto" });
          } catch (verificationError: any) {
            setSubmitError(
              `${verificationError.message} If your account was charged, do not retry yet; contact the foundation with payment ID ${paymentResponse.razorpay_payment_id}.`
            );
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setIsSubmitting(false),
        },
      });

      checkout.on("payment.failed", (failure: any) => {
        setSubmitError(failure.error?.description || "Payment failed. Please try again.");
        setIsSubmitting(false);
      });
      setIsSubmitting(false);
      checkout.open();
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  /* Shared Tailwind classes for the form */
  const inputBase =
    "w-full py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all";
  const inputWithIcon = `${inputBase} pl-10 pr-3.5`;
  const selectWithIcon = `${inputBase} pl-10 pr-10 appearance-none cursor-pointer`;
  const labelBase = "block text-[13px] font-semibold text-slate-700 mb-1.5";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07172c]">
      {isSubmitting && (
        <div role="status" aria-live="assertive" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020817]/80 px-5 backdrop-blur-md">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-cyan-400/30 bg-[#07172c]/95 p-8 text-center shadow-[0_0_70px_rgba(6,182,212,.18)]">
            <div aria-hidden="true" className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-cyan-300">
              <span aria-hidden="true" className="absolute inset-0 rounded-full border border-cyan-300/50 animate-ping opacity-30" />
              <ShieldCheck className="h-9 w-9 animate-pulse" />
            </div>
            <Loader2 aria-hidden="true" className="relative mx-auto mt-5 h-5 w-5 animate-spin text-sky-300" />
            <h2 className="relative mt-4 text-lg font-extrabold text-white">
              {submissionStage === 'verification' ? 'Verifying your payment' : 'Preparing secure checkout'}
            </h2>
            <p className="relative mt-2 text-sm leading-6 text-slate-400">Please wait while we securely process your registration.</p>
          </div>
        </div>
      )}
      {/* ===================== HERO BANNER ===================== */}
      {!isSubmitted && (
        <section className="relative overflow-hidden pt-20 pb-10 bg-gradient-to-r from-[#06162a] via-[#092244] to-[#071a32]">
          {/* Cyber grid background */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 cyber-grid opacity-20" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
            {/* Top row: Back link separated */}
            <div className="mb-4">
              <button
                onClick={() => onNavigate("/")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to home
              </button>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-12">
              {/* Left Column (7 cols): Titles, facts, buttons */}
              <div className="lg:col-span-7">
                <div className="mb-3">
                  <span className="inline-flex items-center rounded-full bg-blue-600 px-3.5 py-1 text-xs font-bold text-white shadow-md shadow-blue-600/30">
                    Winter 2026
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold leading-[1.18] tracking-tight text-white">
                  Cyber Shakti<br />Winter Internship Program
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base max-w-xl">
                  A Hands-on, Industry-Oriented Cybersecurity &amp; Digital Forensics Internship
                </p>

                {/* Program facts */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {programFacts.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 border border-blue-400/25 text-sky-400">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="leading-tight">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
                        <span className="block text-xs font-bold text-white mt-0.5">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => document.getElementById("registration-form")?.scrollIntoView({ behavior: "auto", block: "start" })}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-extrabold text-slate-900 shadow-xl transition hover:bg-sky-50 active:scale-95"
                  >
                    Register for Internship <ArrowRight className="h-4 w-4 text-blue-700" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(WINTER_INTERNSHIP_PATH)}
                    className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10 active:scale-95"
                  >
                    View Program Details
                  </button>
                </div>
              </div>

              {/* Right Column (5 cols): Hacker with CSF Hoodie Image */}
              <div className="lg:col-span-5 hidden lg:flex justify-end items-center">
                <div className="relative rounded-2xl overflow-hidden border border-sky-400/25 shadow-2xl shadow-sky-950/60 bg-[#040e1e]">
                  <img
                    src="/hero-hacker.png"
                    alt="Cyber Shakti Foundation"
                    className="w-full h-auto max-h-[250px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#06162a]/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================== MAIN CONTENT ===================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20 pt-8">
        {isSubmitted ? (
          /* ================= SUCCESS CONFIRMATION ================= */
          <ScrollReveal>
            <div className="max-w-2xl mx-auto bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Application Received!</h1>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you, <strong className="text-white">{confirmedName}</strong>. Your Razorpay payment is verified and your registration for the Winter Internship Program 2026 is confirmed.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 flex items-center justify-between gap-3 mb-8">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Your Application ID</div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-cyan-300">{appId}</div>
                </div>
                <button
                  onClick={handleCopyAppId}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copiedAppId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAppId ? "Copied" : "Copy ID"}</span>
                </button>
              </div>

              <div className="mb-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-sm text-emerald-700">
                Payment captured and verified securely by Razorpay.
                <p className="mt-1">
                  {confirmationEmailSent
                    ? `A confirmation email was sent to ${confirmedEmail}.`
                    : `Your payment is confirmed. We could not send the confirmation email yet; please save your application ID.`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/918265826528?text=Hello%20Cyber%20Shakti%20Foundation,%20I%20have%20registered%20for%20the%20Winter%20Internship%20Program%202026.%20Application%20ID:%20${appId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-black bg-[#25D366] hover:bg-[#20ba59] shadow-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Share Receipt on WhatsApp</span>
                </a>
                <button
                  onClick={() => onNavigate("/")}
                  className="py-3 px-6 rounded-xl font-semibold text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          /* ================= TWO-COLUMN LAYOUT ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ===== LEFT SIDEBAR: Program Highlights ===== */}
            <ScrollReveal className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-sky-500/20 bg-[#071a33]">
                <div className="p-5 sm:p-6 pb-4">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-400/30 text-sky-400">
                      <Target className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-extrabold text-white">Program Highlights</h2>
                  </div>

                  <div className="space-y-1.5">
                    {programHighlights.map(({ icon: Icon, title }) => (
                      <div key={title} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 border border-sky-400/25 text-sky-300 shadow-sm">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-[13px] font-semibold text-slate-100 leading-snug">{title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Winter Mountain Asset at bottom of sidebar */}
                <div className="relative overflow-hidden mt-2 border-t border-sky-500/20">
                  <img
                    src="/winter-mountain.png"
                    alt="Winter Internship Program"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* ===== RIGHT COLUMN: Registration Form Card ===== */}
            <ScrollReveal className="lg:col-span-8">
              <div
                id="registration-form"
                className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-2xl sm:p-8 lg:p-9 border border-slate-200"
                style={{ colorScheme: "light" }}
              >
                {/* Form Header */}
                <div className="flex items-start gap-3.5 mb-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">Internship Registration Form</h2>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                      Please provide your personal and professional details to register for the Cyber Shakti Winter Internship Program.
                    </p>
                  </div>
                </div>

                {submitError && (
                  <div role="alert" className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                    <div>
                      <strong className="block font-semibold">Registration Notice</strong>
                      {submitError}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Full Name + Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelBase}>
                        Full Name (As per Official ID) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className={inputWithIcon}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelBase}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className={inputWithIcon}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Primary Contact + Alternative Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelBase}>
                        Primary Contact Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter 10-digit mobile number"
                          className={inputWithIcon}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelBase}>Alternative Contact Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          name="altPhone"
                          value={formData.altPhone}
                          onChange={handleChange}
                          placeholder="Enter alternative number (optional)"
                          className={inputWithIcon}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Gender + Date of Birth */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelBase}>
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <select name="gender" required value={formData.gender} onChange={handleChange} className={selectWithIcon}>
                          <option value="" disabled>Select Gender</option>
                          {genderOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <SelectChevron />
                      </div>
                    </div>
                    <div>
                      <label className={labelBase}>
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <input
                          type="date"
                          name="dob"
                          required
                          max="2015-12-31"
                          value={formData.dob}
                          onChange={handleChange}
                          className={`${inputWithIcon} [color-scheme:light]`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Experience Level + Prior Internship */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelBase}>
                        Experience Level <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                        <select name="experienceLevel" required value={formData.experienceLevel} onChange={handleChange} className={selectWithIcon}>
                          <option value="" disabled>Select Experience Level</option>
                          {experienceOptions.map((exp) => (
                            <option key={exp} value={exp}>{exp}</option>
                          ))}
                        </select>
                        <SelectChevron />
                      </div>
                    </div>
                    <div>
                      <label className={labelBase}>
                        Have you previously participated in any internship program? <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-6 h-[42px]">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="hasPriorInternship"
                            value="Yes"
                            checked={formData.hasPriorInternship === "Yes"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-700 font-medium">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="hasPriorInternship"
                            value="No"
                            checked={formData.hasPriorInternship === "No"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-700 font-medium">No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Conditional: Prior Internship Details */}
                  {formData.hasPriorInternship === "Yes" && (
                    <div>
                      <label className={labelBase}>
                        If yes, please provide details of your previous internship, including organization name, duration, role and key responsibilities.
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none text-slate-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <textarea
                          name="priorInternshipDetails"
                          required={formData.hasPriorInternship === "Yes"}
                          rows={3}
                          value={formData.priorInternshipDetails}
                          onChange={handleChange}
                          placeholder="e.g., Organization: ABC Pvt. Ltd., Duration: Jan 2025 – Mar 2025, Role: Cybersecurity Intern, Responsibilities: ..."
                          className={`${inputBase} pl-10 pr-4 resize-none bg-slate-50`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Row 5: Role + College */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelBase}>
                        Your Current Role / Status <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <select name="currentRole" value={formData.currentRole} onChange={handleChange} className={selectWithIcon}>
                          {roleOptions.map((role) => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                        <SelectChevron />
                      </div>
                    </div>
                    <div>
                      <label className={labelBase}>College / Organization</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleChange}
                          placeholder="e.g. Delhi University / Freelancer"
                          className={inputWithIcon}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 6: How did you hear */}
                  <div>
                    <label className={labelBase}>
                      How did you hear about this? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <select name="hearAboutEvent" value={formData.hearAboutEvent} onChange={handleChange} className={selectWithIcon}>
                        {hearAboutOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <SelectChevron />
                    </div>
                  </div>

                  {/* Terms confirmation checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        I hereby confirm that the information provided above is accurate and complete to the best of my knowledge. <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.agreeTerms}
                      className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Registration...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Registration</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </main>
  );
}
