import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  Shield,
  ShieldCheck,
  Users,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function AboutPage({ onOpenRegister, onNavigate }) {
  const organizations = [
    {
      name: 'Cyber Shakti Foundation',
      description:
        'Cyber Shakti is a leading technology education center dedicated to empowering individuals and organizations with advanced digital skills in cybersecurity, programming, data science, cloud computing, and IT infrastructure.',
      details:
        'Offering a wide range of hands-on courses for beginners, professionals, and enterprises, Cyber Shakti focuses on practical training, industry-recognized certifications, and real-world applications.',
      icon: Shield,
    },
  
    {
      name: 'Cybersecurity Council of India',
      description:
        "Cybersecurity Council (CSC) is India's foremost authority in safeguarding digital assets. Our esteemed members, hailing from prestigious institutions and diverse sectors, collaborate to tackle emerging cyber threats. With a focus on knowledge exchange and advocacy, we empower professionals to make a lasting impact on cybersecurity while fulfilling their organizational duties.",
      details:
        'Committed to excellence, CSC members bring a wealth of experience from technology, finance, healthcare, government, and education fields. Together, we strive to advance cybersecurity measures, ensuring individuals and organizations are equipped to navigate the ever-evolving landscape of digital threats. Join us in our mission to secure critical infrastructure and promote a safer digital environment for all.',
      icon: Users,
    },
  ];

  return (
    <div
      className="relative pt-24 pb-20 overflow-hidden"
      style={{ background: '#03040a', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(59,130,246,0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(168,85,247,0.05) 0%, transparent 50%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#00b4ff] hover:text-[#00b4ff] transition-colors group px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#00b4ff]/40"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Internship Overview</span>
          </button>
        </div>

        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00b4ff]/10 border border-[#00b4ff]/30 text-[#00b4ff] text-xs sm:text-sm font-mono mb-6">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold tracking-wide uppercase">ABOUT OUR ECOSYSTEM</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              About Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent cyber-glow-cyan">
                Ecosystem
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We are a collaborative network of organizations dedicated to securing the digital frontier through education, investigation, and advocacy.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {organizations.map((org) => {
              const Icon = org.icon;
              return (
                <div
                  key={org.name}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#00b4ff]/40 transition-all shadow-xl flex flex-col"
                >
                  <div className="p-3 w-fit rounded-xl bg-[#00b4ff]/10 text-[#00b4ff] border border-[#00b4ff]/30 mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{org.name}</h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">{org.description}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{org.details}</p>

                  <div className="mt-auto space-y-2 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00b4ff] shrink-0" />
                      <span>Excellence in Service</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00b4ff] shrink-0" />
                      <span>Nationwide Presence</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-20 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00b4ff]/10 text-[#00b4ff] font-mono text-xs uppercase tracking-wider mb-4">
                <Building2 className="w-3.5 h-3.5" />
                Building a Safer Digital India
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Building a Safer Digital India
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Through the combined efforts of Cyber Shakti Foundation, CrimeX Intelligence, and the Cybersecurity Council, we are creating a resilient ecosystem that empowers the next generation of cybersecurity leaders.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-20 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#00b4ff]" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-[#00b4ff]" />
                <a href="mailto:info@cybershaktifoundation.org" className="hover:text-[#00b4ff] transition-colors">
                  info@cybershaktifoundation.org
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-[#00b4ff]" />
                <span>internship.cybershaktifoundation.org</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-[#00b4ff]/40 text-center shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Ready to Experience Practical Cybersecurity?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Join Cyber Shakti Foundation and take the next step in your cybersecurity journey.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onOpenRegister}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Claim Early-Bird Seat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('home', 'tracks')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  <span>Explore Learning Tracks</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}