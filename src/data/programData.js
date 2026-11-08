export const PROGRAM_DATA = {
  organization: "Cyber Shakti Foundation",
  programName: "Winter Internship Program",
  year: "2026",
  duration: "28 Days",
  registrationStarts: "08 November 2026",
  registrationCloses: "10 December 2026",
  websiteUrl: "https://internship.cybershaktifoundation.org",
  displayUrl: "internship.cybershaktifoundation.org",
  
  contact: {
    phone: "+91-8265826528",
    email: "info@cybershaktifoundation.org",
    website: "https://internship.cybershaktifoundation.org",
    displayWebsite: "internship.cybershaktifoundation.org",
    socials: [
      { name: "LinkedIn", url: "https://linkedin.com/company/cybershaktifoundation", icon: "Linkedin" },
      { name: "Instagram", url: "https://instagram.com/cybershaktifoundation", icon: "Instagram" },
      { name: "YouTube", url: "https://youtube.com/@cybershaktifoundation", icon: "Youtube" },
      { name: "X (Twitter)", url: "https://x.com/cybershaktifdn", icon: "Twitter" }
    ]
  },

  detailsTable: [
    {
      category: "Duration",
      value: "28 days",
      icon: "Clock",
      description: "Structured 4-week cohort curriculum with daily live labs and weekend case workshops."
    },
    {
      category: "Mode",
      value: "Online, live and interactive",
      icon: "MonitorPlay",
      description: "Interactive live webinars, cloud lab access, Q&A sessions, and recorded archives."
    },
    {
      category: "Eligibility",
      value: "Students and young professionals",
      icon: "GraduationCap",
      description: "Open to passionate learners looking to break into or advance in cyber defense."
    },
    {
      category: "Eligible Courses",
      value: "B.Tech, M.Sc., BCA, MCA & related fields",
      icon: "BookOpen",
      description: "Computer Science, IT, Cybersecurity, BCA, MCA, Forensics, and allied domains."
    },
    {
      category: "Outcome",
      value: "Professional Internship Certificate",
      icon: "Award",
      description: "Industry-recognized credential with verifiable QR authentication and project credit."
    },
    {
      category: "Mentorship",
      value: "Expert mentorship",
      icon: "UsersCheck",
      description: "1-on-1 and group mentorship sessions guided by seasoned industry practitioners."
    },
    {
      category: "Training",
      value: "Live training & hands-on cyber labs",
      icon: "Terminal",
      description: "Practice real incident response, exploit analysis, chain of custody, and regulatory audits."
    }
  ],

  tracks: [
    {
      id: 1,
      title: "Digital Forensics & Evidence Analysis",
      isNew: false,
      tag: "Forensics Core",
      color: "from-blue-500 to-cyan-500",
      accent: "cyan",
      icon: "HardDrive",
      shortDesc: "Master disk forensics, file carving, memory acquisition, artifact extraction, and legally admissible chain of custody.",
      keyTopics: [
        "Disk Image Acquisition (FTK Imager, dd)",
        "Windows Registry & Event Log Forensics",
        "RAM Dump Analysis with Volatility 3",
        "Hash Verification & Chain of Custody Protocols",
        "Evidence Reporting for Law Enforcement"
      ],
      tools: ["FTK Imager", "Autopsy", "Volatility", "Wireshark"]
    },
    {
      id: 2,
      title: "Ethical Hacking & Penetration Testing",
      isNew: false,
      tag: "Offensive Security",
      color: "from-red-500 to-amber-500",
      accent: "amber",
      icon: "ShieldAlert",
      shortDesc: "Learn red-teaming fundamentals, web application vulnerability assessment (OWASP Top 10), and vulnerability exploitation.",
      keyTopics: [
        "Reconnaissance & Port Scanning (Nmap, Masscan)",
        "OWASP Top 10 Vulnerabilities Exploitation",
        "Metasploit Framework & Payload Crafting",
        "Privilege Escalation Techniques (Linux/Windows)",
        "Executive Penetration Test Reporting"
      ],
      tools: ["Kali Linux", "Burp Suite", "Nmap", "Metasploit"]
    },
    {
      id: 3,
      title: "OSINT & Cyber Intelligence",
      isNew: false,
      tag: "Threat Intel",
      color: "from-emerald-500 to-teal-500",
      accent: "emerald",
      icon: "Search",
      shortDesc: "Gather threat intelligence through open-source investigative tools, dark web exploration, and digital footprints.",
      keyTopics: [
        "Google Dorking & Advanced Search Operators",
        "Social Media Intelligence (SOCMINT)",
        "Domain & IP Footprinting (Shodan, Censys)",
        "Dark Web & Tor Network Reconnaissance",
        "Geospatial & Metadata Intelligence"
      ],
      tools: ["Maltego", "Spiderfoot", "Shodan", "theHarvester"]
    },
    {
      id: 4,
      title: "Network & Mobile Forensics",
      isNew: false,
      tag: "Traffic & Device Analysis",
      color: "from-purple-500 to-indigo-500",
      accent: "purple",
      icon: "Radio",
      shortDesc: "Deconstruct malicious packet flows, intercept anomalous communications, and inspect mobile file systems.",
      keyTopics: [
        "Deep Packet Inspection (Wireshark, TCPDump)",
        "C2 Beaconing Detection & DNS Tunneling",
        "Android/iOS Logical & Physical Extractions",
        "WhatsApp, Telegram, and Call Artifact Extraction",
        "Network Breach Replay & Timeline Construction"
      ],
      tools: ["Wireshark", "NetworkMiner", "MOBILedit", "Andriller"]
    },
    {
      id: 5,
      title: "SOC Monitoring & Threat Detection",
      isNew: false,
      tag: "Blue Team Defense",
      color: "from-blue-600 to-indigo-600",
      accent: "blue",
      icon: "ShieldCheck",
      shortDesc: "Operate modern SIEM dashboards, detect live adversary movements, and execute incident containment procedures.",
      keyTopics: [
        "SIEM Architecture & Syslog Ingestion",
        "Detection Rule Authoring (Sigma, Yara)",
        "MITRE ATT&CK Framework Mapping",
        "Incident Triage, Alert Prioritization & Playbooks",
        "Endpoint Detection & Response (EDR) Telemetry"
      ],
      tools: ["Splunk", "Wazuh", "Elastic Security", "Suricata"]
    },
    {
      id: 6,
      title: "DPDP Act & Data Privacy Compliance",
      isNew: true,
      tag: "NEW • High Demand",
      color: "from-amber-500 to-orange-500",
      accent: "orange",
      icon: "FileCheck2",
      shortDesc: "Understand India's Digital Personal Data Protection Act 2023, data fiduciary obligations, consent architectures, and audits.",
      keyTopics: [
        "DPDP Act 2023 Principles & Scope",
        "Data Fiduciary, Principal, and Processor Roles",
        "Notice, Consent Architecture & Grievance Redressal",
        "Data Protection Impact Assessments (DPIA)",
        "Cross-Border Transfer Norms & Penalty Mitigations"
      ],
      tools: ["OneTrust Concepts", "Consent Frameworks", "DPIA Templates"]
    },
    {
      id: 7,
      title: "Cyber Law & Cybercrime Investigation",
      isNew: true,
      tag: "NEW • High Demand",
      color: "from-teal-500 to-cyan-500",
      accent: "cyan",
      icon: "Scale",
      shortDesc: "Explore IT Act 2000/2008 amendments, legal FIR procedures, 65B electronic evidence certification, and courtroom trial prep.",
      keyTopics: [
        "IT Act 2000 (Sections 43, 66, 66C, 66D, 67)",
        "Indian Evidence Act / BSA Section 65B Certificate",
        "Cyber Fraud Modus Operandi (UPI, SIM Swap, Phishing)",
        "Police Complaint / FIR Filing & Evidence Handover",
        "Cyber Expert Witness Testimony Preparation"
      ],
      tools: ["Legal Templates", "Sec 65B Kit", "Case Study Datasets"]
    }
  ],

  whyJoin: [
    {
      icon: "Zap",
      title: "Industry-Relevant Practical Learning",
      description: "No boring slide marathons. Learn by actually executing simulated attacks, forensic investigations, and security telemetry analysis in purpose-built cloud cyber labs."
    },
    {
      icon: "UserCheck",
      title: "Guidance from Cybersecurity Experts",
      description: "Direct mentorship and weekly AMA sessions with seasoned cybersecurity researchers, certified ethical hackers, and active cybercrime investigative advisors."
    },
    {
      icon: "Cpu",
      title: "Real-World Tools and Investigations",
      description: "Hands-on mastery of premier industry platforms: Kali, Autopsy, Volatility, Wireshark, Splunk, Maltego, Burp Suite, and official legal evidence kits."
    },
    {
      icon: "Scale",
      title: "Latest Legal & Regulatory Frameworks",
      description: "Stay ahead with newly added specialized tracks covering India's DPDP Act 2023 compliance, digital privacy governance, and electronic evidence legal requirements."
    },
    {
      icon: "Briefcase",
      title: "Career Development Through Internship",
      description: "Receive a verified Cyber Shakti Foundation Internship Certificate, resume building guidance, portfolio-ready project work, and LinkedIn endorsements."
    }
  ],

  faqs: [
    {
      q: "What is the start date and duration of this program?",
      a: "Registration opens on 08 November 2026 and closes on 10 December 2026. The Winter Internship Program spans 28 days of comprehensive live interactive training, weekend masterclasses, and hands-on lab assignments."
    },
    {
      q: "Are the sessions recorded if I miss a live class?",
      a: "Yes! While live attendance is highly encouraged for interactive Q&A and lab guidance, high-definition session recordings and presentation slides will be uploaded to the student portal within 24 hours."
    },
    {
      q: "Who is eligible to participate?",
      a: "The program is specifically designed for college students (B.Tech, M.Sc., BCA, MCA, Forensics, Law, and related streams) as well as young professionals seeking to launch or transition their career in cybersecurity."
    },
    {
      q: "How is the registration fee set?",
      a: "The fee is set by the current registration tier and confirmed in Razorpay Checkout before payment."
    },
    {
      q: "Will I receive a verified certificate upon completion?",
      a: "Yes. Upon completing the 28-day program and submitting the capstone investigation report, you will receive an official Cyber Shakti Foundation Professional Internship Certificate featuring a verifiable QR code and unique credential ID."
    },
    {
      q: "Do I need prior hacking experience or advanced prerequisites?",
      a: "No prior experience is necessary! The curriculum starts from foundational principles and systematically builds up to advanced hands-on lab exercises and real-world investigation scenarios."
    }
  ]
};
