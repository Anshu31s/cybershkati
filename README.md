# Cyber Shakti Foundation — Winter Internship Program 2026

An ultra-modern, responsive, high-performance React landing page for the **Winter Internship Program** organized by **Cyber Shakti Foundation**.

---

## 🛡️ Program Highlights

- **Organization:** Cyber Shakti Foundation
- **Program:** Winter Internship Program
- **Duration:** 28 Days
- **Registration Starts:** 08 November 2026
- **Mode:** Online, live and interactive
- **Website:** [https://internship.cybershaktifoundation.org](https://internship.cybershaktifoundation.org)
- **Pricing:** Database-backed registration tiers, configurable from the admin control center

---

## 🎯 7 Learning Tracks & Areas

1. **Digital Forensics & Evidence Analysis** — Disk acquisition, volatile memory triage (Volatility 3), file carving, FTK Imager, and legal chain of custody.
2. **Ethical Hacking & Penetration Testing** — OWASP Top 10 web vulnerabilities, Metasploit, Nmap reconnaissance, Burp Suite, and privilege escalation.
3. **OSINT & Cyber Intelligence** — Recon-ng, Maltego, Shodan, dark web exploration, and digital footprints.
4. **Network & Mobile Forensics** — Wireshark packet capture, Android logical extractions, C2 beaconing analysis, and mobile artifact parsing.
5. **SOC Monitoring & Threat Detection** — Splunk & Elastic SIEM, Wazuh telemetry, MITRE ATT&CK correlation, and incident triage playbooks.
6. **DPDP Act & Data Privacy Compliance [NEW]** — Digital Personal Data Protection Act 2023, consent architectures, DPIA, and fiduciary requirements.
7. **Cyber Law & Cybercrime Investigation [NEW]** — IT Act 2000, Section 65B electronic evidence certification, court admissibility, and police FIR procedures.

---

## 📊 Program Details Table

| Category | Details |
| :--- | :--- |
| **Duration** | 28 days |
| **Mode** | Online, live and interactive |
| **Eligibility** | Students and young professionals |
| **Eligible Courses** | B.Tech, M.Sc., BCA, MCA and related fields |
| **Outcome** | Professional Internship Certificate (Tamper-Proof QR Credential) |
| **Mentorship** | Expert mentorship with seasoned cybersecurity practitioners |
| **Training** | Live training and hands-on cyber labs |

---

## 💰 Pricing Control

The `/admin` control center supports six volume-based registration tiers, Auto Mode, and Manual Force. Current fees are fetched from the API and used by Razorpay order creation on the server.

---

## 📞 Contact Information

- **Phone:** `+91-8265826528`
- **Email:** `info@cybershaktifoundation.org`
- **Official Website:** `https://internship.cybershaktifoundation.org`
- **Social Media:** LinkedIn, Instagram, YouTube, and X (Twitter)
- **Payments:** Razorpay Standard Checkout with server-side order creation, signature verification, and payment capture before registration is confirmed.

---

## 🚀 Running the Project

### Razorpay payment setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to your database.
2. Generate Razorpay **Test Mode** API keys in the Razorpay Dashboard. Add them to the server environment as `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. Never expose the secret with a `NEXT_PUBLIC_` variable.
3. Set a long, private `ADMIN_ACCESS_KEY` in the server environment. Open `/admin` and use that key to configure fee tiers, choose Auto Mode or Manual Force, and review registrations and payment records.
4. Configure Resend in the server environment with `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. Create an API key in Resend and verify the sender domain before using that sender address. The API key must not use a `NEXT_PUBLIC_` prefix. A registration confirmation is sent to the applicant after payment is verified; email delivery problems do not invalidate a captured payment.
5. Sync the payment, pricing, and email fields and regenerate the Prisma client:

```bash
npm run prisma:push
npm run prisma:generate
```

The Prisma Client is generated into `src/generated/prisma` so Windows can update it without replacing a DLL loaded from `node_modules`.

6. Run the Next.js app with `npm run dev`. API endpoints are served by Next.js Route Handlers in the same application.

Fee tiers are stored in the database and editable in the admin panel; payment orders always use the server's saved fee configuration. Registrations store the Razorpay order/payment IDs, status, method, currency, provider fee/tax, and capture timestamp. Registration records are only available through the admin-key protected API. Test Razorpay checkout in Test Mode before switching to Live Mode keys.

### Start the app

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Run the Next.js app (pages and API routes)
npm run dev

# 3. Build for production
npm run build

# 4. Start the production server
npm run start
```

The Next.js App Router serves `/`, `/internships/winter-2026`, `/internships/summer-45-day`, `/register`, `/apply`, and `/admin`. API endpoints live under `app/api`.
