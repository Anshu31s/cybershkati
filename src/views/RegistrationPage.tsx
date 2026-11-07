import React, { useState } from "react";
import {
  ShieldCheck,
  Flame,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Briefcase,
  HelpCircle,
  MessageSquare,
  Lock,
  AlertCircle,
  Loader2,
  Clock,
  Award,
  BookOpen,
  Share2,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Layers,
  GraduationCap,
  History,
  FileText,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PROGRAM_DATA } from "../data/programData";
import { createRazorpayOrder, verifyRazorpayPayment } from "../lib/api";
import { useRegistration } from "../context/RegistrationContext";
import ScrollReveal from "../components/ScrollReveal";
import { useRegistrationFormStore } from "../store/registration-form";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      on: (event: string, handler: (response: any) => void) => void;
      open: () => void;
    };
  }
}

let razorpayCheckoutScript;

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

export default function RegistrationPage({ onNavigate }) {
  const formData = useRegistrationFormStore((state) => state.formData);
  const updateFormData = useRegistrationFormStore((state) => state.updateFormData);
  const resetFormData = useRegistrationFormStore((state) => state.resetFormData);
  const {
    notifyNewRegistration,
    seatsRemaining,
    totalSeats,
    currentPrice,
    currentTier,
  } = useRegistration();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
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

  const categoryOptions = [
    "General",
    "OBC (Other Backward Classes)",
    "SC (Scheduled Castes)",
    "ST (Scheduled Tribes)",
    "EWS (Economically Weaker Section)",
    "Other / Prefer not to say",
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

  const trackOptions = [
    "All 7 Tracks (Complete Curriculum - Recommended)",
    "1. Digital Forensics & Evidence Analysis",
    "2. Ethical Hacking & Penetration Testing",
    "3. OSINT & Cyber Threat Intelligence",
    "4. Network & Mobile Forensics",
    "5. SOC Monitoring & SIEM Triage",
    "6. DPDP Act 2023 & Privacy Compliance",
    "7. Cyber Law & Electronic Evidence",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormData(name, type === "checkbox" ? checked : value);
  };

  const handleCopyAppId = () => {
    navigator.clipboard.writeText(appId);
    setCopiedAppId(true);
    setTimeout(() => setCopiedAppId(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Validation check for conditional field
    if (
      formData.hasPriorInternship === "Yes" &&
      !formData.priorInternshipDetails.trim()
    ) {
      setSubmitError(
        "Please provide details of your previous internship in field 10.",
      );
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
      category: formData.category,
      experienceLevel: formData.experienceLevel,
      hasPriorInternship: formData.hasPriorInternship,
      priorInternshipDetails: (formData.priorInternshipDetails || "").trim(),
      currentRole: formData.currentRole,
      college: (formData.college || "N/A").trim(),
      course: formData.currentRole,
      year: "2026",
      preferredTrack: formData.preferredTrack,
      attendanceReason: formData.attendanceReason.trim(),
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
        handler: async (paymentResponse) => {
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
            window.scrollTo({ top: 0, behavior: "smooth" });
          } catch (verificationError) {
            setSubmitError(`${verificationError.message} If your account was charged, do not retry yet; contact the foundation with payment ID ${paymentResponse.razorpay_payment_id}.`);
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setIsSubmitting(false),
        },
      });

      checkout.on("payment.failed", (failure) => {
        setSubmitError(failure.error?.description || "Payment failed. Please try again.");
        setIsSubmitting(false);
      });
      checkout.open();
    } catch (err) {
      console.error("Submission caught error:", err);
      setSubmitError(
        err.message || "An unexpected error occurred. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#040711] text-slate-100 relative pt-24 pb-20 cyber-grid overflow-hidden">
      {/* Background neon ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Navigation Bar */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate("/")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors group px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
        </div>

        {isSubmitted ? (
          /* ================= SUCCESS CONFIRMATION SCREEN ================= */
          <ScrollReveal>
            <div className="max-w-2xl mx-auto bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Application Received!
                </h1>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you,{" "}
                  <strong className="text-white">{confirmedName}</strong>.
                  Your Razorpay payment is verified and your registration for
                  the Winter Internship Program 2026 is confirmed.
                </p>
              </div>

              {/* Application ID Card */}
              <div className="p-4 rounded-2xl bg-black/50 border border-slate-800 flex items-center justify-between gap-3 mb-8">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Your Application ID
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-cyan-300">
                    {appId}
                  </div>
                </div>
                <button
                  onClick={handleCopyAppId}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copiedAppId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedAppId ? "Copied" : "Copy ID"}</span>
                </button>
              </div>

              <div className="mb-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center text-sm text-emerald-700">
                Payment captured and verified securely by Razorpay.
                <p className="mt-1">{confirmationEmailSent
                  ? `A confirmation email was sent to ${confirmedEmail}.`
                  : `Your payment is confirmed. We could not send the confirmation email yet; please save your application ID.`}</p>
              </div>

              {/* Action Buttons */}
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
          /* ================= MAIN DEDICATED REGISTRATION FORM ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Program Summary & Urgency Card (5 cols) */}
            <ScrollReveal className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#070b14]/90 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-4 border border-cyan-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Official Registration
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
                  Winter Internship Program 2026
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Join Cyber Shakti Foundation's premier 28-day live
                  cybersecurity cohort. Learn Digital Forensics, Ethical
                  Hacking, OSINT, SOC Defense, and India's DPDP Act 2023.
                </p>

                {/* Live Seat Status Box */}
                <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                      Current Fee · Tier {currentTier?.min}–{currentTier?.max ?? '1000+'}:
                    </span>
                    <strong className="text-amber-300 font-mono font-bold text-sm">
                      ₹{currentPrice.toLocaleString('en-IN')}
                    </strong>
                  </div>

                  {totalSeats != null && <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(15, ((totalSeats - seatsRemaining) / totalSeats) * 100))}%`,
                      }}
                    />
                  </div>}

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{seatsRemaining == null ? 'No cap in current tier' : `${seatsRemaining} registrations until next tier`}</span>
                    <span className="text-slate-500">{totalSeats == null ? `${currentTier?.min}+ tier` : `Up to ${totalSeats}`}</span>
                  </div>
                </div>

                {/* Key Program Highlights */}
                <div className="space-y-3 text-xs text-slate-300 mb-6">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Duration:</strong> 28 Days live & interactive
                      cohort
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Registration Starts:</strong> 08 November 2026
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Certification:</strong> Official QR-authenticated
                      credential
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Eligibility:</strong> Students, researchers &
                      young professionals
                    </span>
                  </div>
                </div>

                {/* Contact Helpline */}
                <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      WhatsApp Helpline: <strong>+91-8265826528</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>info@cybershaktifoundation.org</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Full Registration Form (7 cols) */}
            <ScrollReveal className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
                <div className="mb-8">
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    Candidate Registration Form
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Please provide accurate information for background
                    evaluation, cohort allotment, and official certification
                    issuance.
                  </p>
                </div>

                {submitError && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                    <div>
                      <strong className="block font-semibold">
                        Registration Notice
                      </strong>
                      {submitError}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* ================= SECTION 1: IDENTITY & CONTACT ================= */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      <User className="w-3.5 h-3.5" />
                      <span>1. Identity & Contact Details</span>
                    </div>

                    {/* 1. Full Name (As per Official ID) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
                        <span>1. Full Name (As per Official ID) *</span>
                        <span className="text-[10px] text-slate-500">
                          Short Answer
                        </span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma (matching Aadhaar / Govt ID)"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* 2. Official Email Address */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
                        <span>2. Official Email Address *</span>
                        <span className="text-[10px] text-slate-500">
                          Email
                        </span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="official.email@example.com / college email"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* 3 & 4. Primary Contact Number & Alternative Contact Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 3. Primary Contact Number */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
                          <span>3. Primary Contact Number *</span>
                          <span className="text-[10px] text-emerald-400 font-bold">
                            WhatsApp Active
                          </span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                          />
                        </div>
                      </div>

                      {/* 4. Alternative Contact Number (Optional) */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
                          <span>4. Alternative Contact Number</span>
                          <span className="text-[10px] text-slate-500">
                            Optional
                          </span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            name="altPhone"
                            value={formData.altPhone}
                            onChange={handleChange}
                            placeholder="Secondary / Emergency contact"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ================= SECTION 2: DEMOGRAPHICS & PROFILE ================= */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      <Layers className="w-3.5 h-3.5" />
                      <span>2. Demographic Information</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* 5. Gender */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                          5. Gender *
                        </label>
                        <select
                          name="gender"
                          required
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full px-3.5 py-3 rounded-xl bg-[#070b14] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        >
                          <option value="" disabled className="text-slate-500">
                            Select Gender
                          </option>
                          {genderOptions.map((opt) => (
                            <option
                              key={opt}
                              value={opt}
                              className="bg-slate-900 text-white"
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 6. Date of Birth */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
                          <span>6. Date of Birth *</span>
                          <span className="text-[10px] text-slate-500">
                            Date
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="dob"
                            required
                            max="2015-12-31"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full px-3.5 py-3 rounded-xl bg-black/60 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors [color-scheme:dark]"
                          />
                        </div>
                      </div>

                      {/* 7. Category */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                          7. Category *
                        </label>
                        <select
                          name="category"
                          required
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-3.5 py-3 rounded-xl bg-[#070b14] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        >
                          <option value="" disabled className="text-slate-500">
                            Select Category
                          </option>
                          {categoryOptions.map((cat) => (
                            <option
                              key={cat}
                              value={cat}
                              className="bg-slate-900 text-white"
                            >
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* ================= SECTION 3: EXPERIENCE & BACKGROUND ================= */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>3. Experience & Internship History</span>
                    </div>

                    {/* 8. What is your current level of experience? */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                        8. What is your current level of experience? *
                      </label>
                      <select
                        name="experienceLevel"
                        required
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#070b14] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      >
                        <option value="" disabled className="text-slate-500">
                          Select Current Level of Experience
                        </option>
                        {experienceOptions.map((exp) => (
                          <option
                            key={exp}
                            value={exp}
                            className="bg-slate-900 text-white"
                          >
                            {exp}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Current Role & College / Organization */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                          Your Current Role / Status *
                        </label>
                        <select
                          name="currentRole"
                          value={formData.currentRole}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-[#070b14] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        >
                          {roleOptions.map((role) => (
                            <option
                              key={role}
                              value={role}
                              className="bg-slate-900 text-white"
                            >
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                          College / Organization (Optional)
                        </label>
                        <input
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleChange}
                          placeholder="e.g. Delhi University / Freelancer"
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* 9. Have you previously participated in any internship program? */}
                    <div className="p-4 rounded-2xl bg-black/40 border border-slate-800">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 font-mono flex items-center justify-between">
                        <span>
                          9. Have you previously participated in any internship
                          program? *
                        </span>
                        <span className="text-[10px] text-cyan-400 font-bold">
                          Yes / No
                        </span>
                      </label>
                      <div className="flex items-center gap-4">
                        <label
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                            formData.hasPriorInternship === "No"
                              ? "bg-slate-800 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                              : "bg-black/60 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="hasPriorInternship"
                            value="No"
                            checked={formData.hasPriorInternship === "No"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span>No, This is my first internship</span>
                        </label>

                        <label
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                            formData.hasPriorInternship === "Yes"
                              ? "bg-slate-800 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                              : "bg-black/60 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="hasPriorInternship"
                            value="Yes"
                            checked={formData.hasPriorInternship === "Yes"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span>Yes, I have prior experience</span>
                        </label>
                      </div>

                      {/* 10. If yes, please provide details of your previous internship */}
                      {formData.hasPriorInternship === "Yes" && (
                        <div className="mt-4 pt-4 border-t border-slate-800/80 animate-fadeIn">
                          <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
                            <span>10. Previous Internship Details *</span>
                            <span className="text-[10px] text-slate-400">
                              Long Answer
                            </span>
                          </label>
                          <textarea
                            name="priorInternshipDetails"
                            required={formData.hasPriorInternship === "Yes"}
                            rows={3}
                            value={formData.priorInternshipDetails}
                            onChange={handleChange}
                            placeholder="Please provide details of your previous internship, including organization name, duration, role and key responsibilities..."
                            className="w-full px-4 py-3 rounded-xl bg-black/80 border border-cyan-500/40 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ================= SECTION 4: PROGRAM PREFERENCE & GOALS ================= */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>4. Program Preferences & Interest</span>
                    </div>

                    {/* Preferred Track */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                        Preferred Track
                      </label>
                      <select
                        name="preferredTrack"
                        value={formData.preferredTrack}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#070b14] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      >
                        {trackOptions.map((trk) => (
                          <option
                            key={trk}
                            value={trk}
                            className="bg-slate-900 text-white"
                          >
                            {trk}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Why do you want to attend this session? */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
                        <span>Why do you want to attend this session? *</span>
                        <span className="text-[10px] text-slate-500">
                          Statement of Interest
                        </span>
                      </label>
                      <textarea
                        name="attendanceReason"
                        required
                        rows={3}
                        value={formData.attendanceReason}
                        onChange={handleChange}
                        placeholder="Share what you hope to achieve, specific skills you want to master (e.g. Digital Forensics, Ethical Hacking, DPDP Act), or your career objectives..."
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                      />
                    </div>

                    {/* How did you hear about this? */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                        How did you hear about this? *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <select
                          name="hearAboutEvent"
                          value={formData.hearAboutEvent}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070b14] border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        >
                          {hearAboutOptions.map((opt) => (
                            <option
                              key={opt}
                              value={opt}
                              className="bg-slate-900 text-white"
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions Agreement */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-slate-900 bg-black/60"
                      />
                      <span className="text-xs text-slate-400 leading-relaxed">
                        I agree to abide by the program rules, ethical hacking
                        guidelines. The server applies the current admin-configured
                        fee and confirms the payable amount in Razorpay Checkout.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.agreeTerms}
                      className="w-full py-4 rounded-xl font-bold text-sm text-black bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2 active:scale-98"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Submitting Registration...</span>
                        </>
                      ) : (
                        <>
                          <span>Continue</span>
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
