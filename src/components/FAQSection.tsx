import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { PROGRAM_DATA } from '../data/programData';
import { useRegistration } from '../context/RegistrationContext';

export default function FAQSection({ onOpenRegister }) {
  const { currentPrice } = useRegistration();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faqs" className="py-24 bg-[#050811] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Got Questions? <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">We've Got Answers</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about the Cyber Shakti Foundation Winter Internship Program 2026.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {PROGRAM_DATA.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-bold text-white text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-800 text-cyan-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-cyan-500/20 text-cyan-300' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4 animate-fadeIn">
                    {faq.q === 'How is the registration fee set?'
                      ? `The current registration fee is ₹${currentPrice.toLocaleString('en-IN')}. Fees are assigned by registration tier and shown again in Razorpay Checkout before payment.`
                      : faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-bold text-white text-sm">Have more questions or need group registration?</div>
            <div className="text-xs text-slate-400">Call us directly at {PROGRAM_DATA.contact.phone} or email {PROGRAM_DATA.contact.email}</div>
          </div>
          <button
            onClick={onOpenRegister}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shrink-0 flex items-center gap-1.5 transition-colors"
          >
            <span>Register Now (₹{currentPrice.toLocaleString('en-IN')})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
