import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Flame,
  ArrowRight,
  QrCode,
  Phone,
  Mail,
  ExternalLink,
  Database,
  Loader2,
  AlertCircle,
  User,
  Calendar,
  Layers,
  GraduationCap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { QRCodeSVG } from "qrcode.react";
import { PROGRAM_DATA } from "../data/programData";
import { submitRegistration } from "../lib/api";
import { useRegistration } from "../context/RegistrationContext";

export default function RegistrationModal({ isOpen, onClose }) {
  const {
    notifyNewRegistration,
    seatsRemaining,
    totalSeats,
    isEarlyBirdAvailable,
  } = useRegistration();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    altPhone: "",
    gender: "",
    dob: "",
    category: "",
    experienceLevel: "",
    hasPriorInternship: "No",
    priorInternshipDetails: "",
    currentRole: "Student (B.Tech / BCA / MCA / M.Sc)",
    college: "",
    preferredTrack: "All 7 Tracks (Complete Curriculum)",
    attendanceReason: "",
    hearAboutEvent: "LinkedIn",
    agreeTerms: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [syncMode, setSyncMode] = useState("cloud");

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

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

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

    const randomId = "CSF-WIP26-" + Math.floor(1000 + Math.random() * 9000);
    setAppId(randomId);

    const payload = {
      applicationId: randomId,
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
      attendanceReason: (formData.attendanceReason || "").trim(),
      hearAboutEvent: formData.hearAboutEvent,
      amount: 999,
    };

    const result = await submitRegistration(payload);

    setIsSubmitting(false);

    if (result.error) {
      console.error("Registration submission failed:", result.error);
      setSubmitError(
        result.error.message ||
          "Database error occurred. Please check your network and server connection.",
      );
      return;
    }

    setSyncMode(result.mode || "cloud");
    setIsSubmitted(true);

    // Notify context to decrement seatsRemaining dynamically and refresh count
    notifyNewRegistration();

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative bg-[#090e1a] border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-0 float-right z-20 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900 border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold uppercase">
                  <Flame className="w-3.5 h-3.5" />
                  Early-Bird Registration: ₹999 Only
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px]">
                  <Database className="w-3 h-3" />
                  <span>Verified Database Sync</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Winter Internship Program 2026
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Organization: <strong>Cyber Shakti Foundation</strong> •
                Duration: <strong>28 Days</strong> • Starts:{" "}
                <strong>{PROGRAM_DATA.registrationStarts}</strong>
              </p>
            </div>

            {/* Price Snapshot */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white">
                  Internship Fee:
                </span>
                <span className="text-xl font-bold font-mono text-cyan-400">
                  ₹999
                </span>
                <span className="text-xs text-slate-500 line-through font-mono">
                  ₹2,499
                </span>
                <span className="hidden sm:inline text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  First 50 Subsidy Applied
                </span>
              </div>
              <a
                href="/register"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  window.history.pushState({}, "", "/register");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Full-page form</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Error banner if submit failed */}
            {submitError && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <div>
                  <div className="font-bold">Submission Notice:</div>
                  <div className="text-[11px] text-rose-200 mt-0.5">
                    {submitError}
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Full Name */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  1. Full Name (As per Official ID) *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {/* 2. Official Email Address */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  2. Official Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {/* 3 & 4. Primary Contact Number & Alternative Contact Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center justify-between">
                    <span>3. Primary Contact Number *</span>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      WhatsApp
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    4. Alternative Contact Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="altPhone"
                    placeholder="Secondary contact"
                    value={formData.altPhone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* 5, 6, 7. Gender, Date of Birth, Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    5. Gender *
                  </label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
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

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    6. Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    required
                    max="2015-12-31"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    7. Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
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

              {/* 8. Current level of experience */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  8. What is your current level of experience? *
                </label>
                <select
                  name="experienceLevel"
                  required
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="" disabled className="text-slate-500">
                    Select Experience Level
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

              {/* 9. Prior Internship (Yes / No) */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  9. Have you previously participated in any internship program?
                  *
                </label>
                <div className="flex items-center gap-3">
                  <label
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                      formData.hasPriorInternship === "No"
                        ? "bg-slate-800 border-cyan-400 text-cyan-300"
                        : "bg-black/60 border-slate-800 text-slate-400"
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
                    <span>No</span>
                  </label>

                  <label
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                      formData.hasPriorInternship === "Yes"
                        ? "bg-slate-800 border-cyan-400 text-cyan-300"
                        : "bg-black/60 border-slate-800 text-slate-400"
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
                    <span>Yes</span>
                  </label>
                </div>

                {/* 10. Prior Internship Details */}
                {formData.hasPriorInternship === "Yes" && (
                  <div className="mt-3 pt-3 border-t border-slate-800 animate-fadeIn">
                    <label className="block text-xs font-mono text-cyan-300 mb-1">
                      10. Previous Internship Details *
                    </label>
                    <textarea
                      name="priorInternshipDetails"
                      required={formData.hasPriorInternship === "Yes"}
                      rows={2}
                      placeholder="Organization name, duration, role and key responsibilities..."
                      value={formData.priorInternshipDetails}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-black/80 border border-cyan-500/40 text-white text-xs focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Current Role & College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Your Current Role *
                  </label>
                  <select
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="Student (B.Tech / BCA / MCA / M.Sc)">
                      Student (B.Tech / BCA / MCA / M.Sc)
                    </option>
                    <option value="Working Cybersecurity Professional">
                      Working Cybersecurity Professional
                    </option>
                    <option value="IT / Software Engineer">
                      IT / Software Engineer
                    </option>
                    <option value="Law / Forensic Examiner">
                      Law / Forensic Examiner
                    </option>
                    <option value="Faculty / Academic Researcher">
                      Faculty / Academic Researcher
                    </option>
                    <option value="Career Transitioner / Tech Enthusiast">
                      Career Transitioner / Tech Enthusiast
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    College / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    name="college"
                    placeholder="e.g. Delhi University"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Why do you want to attend this session? *
                </label>
                <textarea
                  name="attendanceReason"
                  required
                  rows={2}
                  placeholder="Share your goals or specific topics you're eager to learn..."
                  value={formData.attendanceReason}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    How did you hear about this? *
                  </label>
                  <select
                    name="hearAboutEvent"
                    value={formData.hearAboutEvent}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="WhatsApp / Telegram Community">
                      WhatsApp / Telegram Community
                    </option>
                    <option value="College / University Notice">
                      College / University Notice
                    </option>
                    <option value="Friend / Peer Recommendation">
                      Friend / Peer Recommendation
                    </option>
                    <option value="Instagram">Instagram</option>
                    <option value="Cyber Shakti Foundation Website">
                      Cyber Shakti Foundation Website
                    </option>
                    <option value="YouTube">YouTube</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Primary Learning Track
                  </label>
                  <select
                    name="preferredTrack"
                    value={formData.preferredTrack}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="All 7 Tracks (Complete Curriculum)">
                      All 7 Tracks (Recommended - Full Access)
                    </option>
                    <option value="Track 1: Digital Forensics & Evidence Analysis">
                      Track 1: Digital Forensics & Evidence Analysis
                    </option>
                    <option value="Track 2: Ethical Hacking & Penetration Testing">
                      Track 2: Ethical Hacking & Penetration Testing
                    </option>
                    <option value="Track 3: OSINT & Cyber Intelligence">
                      Track 3: OSINT & Cyber Intelligence
                    </option>
                    <option value="Track 4: Network & Mobile Forensics">
                      Track 4: Network & Mobile Forensics
                    </option>
                    <option value="Track 5: SOC Monitoring & Threat Detection">
                      Track 5: SOC Monitoring & Threat Detection
                    </option>
                    <option value="Track 6: DPDP Act & Data Privacy Compliance (NEW)">
                      Track 6: DPDP Act & Data Privacy Compliance (NEW)
                    </option>
                    <option value="Track 7: Cyber Law & Cybercrime Investigation (NEW)">
                      Track 7: Cyber Law & Cybercrime Investigation (NEW)
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <label htmlFor="agreeTerms" className="text-xs text-slate-400">
                  I agree to abide by Cyber Shakti Foundation live cohort ethics
                  and receive orientation updates.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.agreeTerms}
                className="w-full py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration (₹999)</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-500">
                Official portal gateway:{" "}
                <a
                  href={PROGRAM_DATA.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 underline"
                >
                  {PROGRAM_DATA.displayUrl}
                </a>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold uppercase mb-2">
              <Database className="w-3.5 h-3.5" />
              {syncMode === "prisma"
                ? "Prisma ORM Synced"
                : "Registration Provisioned"}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Welcome to the Winter Internship!
            </h3>

            <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
              Congratulations, <strong>{formData.fullName}</strong>. Your
              early-bird registration record has been saved and your seat is
              provisioned under the <strong>Cyber Shakti Foundation</strong>.
            </p>

            {/* Application ID Card */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 max-w-sm mx-auto mb-6 text-left">
              <div className="flex items-center justify-between text-[10px] uppercase font-mono text-slate-400">
                <span>Application Reference ID</span>
                <span className="text-emerald-400 font-bold">
                  STATUS: CONFIRMED
                </span>
              </div>
              <div className="text-xl font-mono font-bold text-cyan-400 mt-1">
                {appId}
              </div>
              <div className="text-xs text-slate-400 mt-2">
                Program: Winter Internship Program 2026 (28 Days)
              </div>
              <div className="text-xs text-slate-400">
                Fee Provisioned:{" "}
                <strong className="text-emerald-400">₹999 (Early Bird)</strong>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 max-w-md mx-auto text-left space-y-2 mb-6">
              <div className="font-bold text-white flex items-center gap-1.5">
                Next Onboarding Steps:
              </div>
              <div>
                • Lab login credentials & student portal access sent to{" "}
                <strong>{formData.email}</strong>.
              </div>
              <div>
                • Orientation details will be messaged to WhatsApp:{" "}
                <strong>{formData.phone}</strong>.
              </div>
              <div>
                • Foundation helpline:{" "}
                <strong>{PROGRAM_DATA.contact.phone}</strong>.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={PROGRAM_DATA.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
