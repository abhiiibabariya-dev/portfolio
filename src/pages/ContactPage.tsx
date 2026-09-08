import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Linkedin, Github, Send, MapPin } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
      `From: ${form.name} <${form.email}>\n\n${form.message}`
    )}`;
    window.open(mailto, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] text-[#4a4a54] hover:text-[#c8a96b] transition-colors mb-12 tracking-widest">
          <ArrowLeft size={11} /> HOME / CONTACT
        </Link>

        <div className="mb-16">
          <div className="font-mono text-[11px] text-[#c8a96b] tracking-widest mb-3">09 / CONTACT</div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#f0efea] uppercase leading-tight">
            Open<br />Channel
          </h1>
          <div className="h-px w-24 bg-[#c8a96b]/40 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left — info */}
          <div className="space-y-4">
            <div className="border border-[#1e1e22] bg-[#0f0f10] p-6">
              <div className="font-mono text-[9px] text-[#c8a96b] tracking-widest mb-4">STATUS</div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                <span className="font-mono text-sm text-[#f0efea]">Available for opportunities</span>
              </div>
              <p className="text-[#8a8a96] text-sm leading-relaxed">
                Open to cybersecurity roles, DFIR consulting engagements, and security research collaborations.
                Response time: typically within 24 hours.
              </p>
            </div>

            {/* Contact channels */}
            <div className="border border-[#1e1e22] bg-[#0f0f10] p-6 space-y-4">
              <div className="font-mono text-[9px] text-[#c8a96b] tracking-widest mb-2">DIRECT CHANNELS</div>
              {[
                { icon: Mail, label: 'Email', val: PROFILE.email, href: `mailto:${PROFILE.email}` },
                { icon: Phone, label: 'Phone', val: PROFILE.phone, href: `tel:${PROFILE.phone}` },
                { icon: MapPin, label: 'Location', val: PROFILE.location, href: null },
              ].map(({ icon: Icon, label, val, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 border border-[#1e1e22] flex items-center justify-center shrink-0">
                    <Icon size={12} className="text-[#c8a96b]" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="font-mono text-[11px] text-[#8a8a96] hover:text-[#c8a96b] transition-colors">{val}</a>
                    ) : (
                      <span className="font-mono text-[11px] text-[#8a8a96]">{val}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="border border-[#1e1e22] bg-[#0f0f10] p-6">
              <div className="font-mono text-[9px] text-[#c8a96b] tracking-widest mb-4">SOCIAL PRESENCE</div>
              <div className="space-y-3">
                <a
                  href={PROFILE.linkedin}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 border border-[#1e1e22] group-hover:border-[#c8a96b]/40 flex items-center justify-center transition-colors">
                    <Linkedin size={12} className="text-[#4a4a54] group-hover:text-[#c8a96b] transition-colors" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest">LINKEDIN</div>
                    <div className="font-mono text-[10px] text-[#8a8a96] group-hover:text-[#c8a96b] transition-colors">babariya-abhishek</div>
                  </div>
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 border border-[#1e1e22] group-hover:border-[#c8a96b]/40 flex items-center justify-center transition-colors">
                    <Github size={12} className="text-[#4a4a54] group-hover:text-[#c8a96b] transition-colors" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest">GITHUB</div>
                    <div className="font-mono text-[10px] text-[#8a8a96] group-hover:text-[#c8a96b] transition-colors">abhiiibabariya-dev</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="border border-[#1e1e22] bg-[#0f0f10] p-6 sm:p-8">
            <div className="font-mono text-[9px] text-[#c8a96b] tracking-widest mb-6">SECURE MESSAGE</div>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="w-12 h-12 border border-[#4ade80]/40 flex items-center justify-center">
                  <Send size={18} className="text-[#4ade80]" />
                </div>
                <div className="font-mono text-sm text-[#4ade80] text-center">MESSAGE DISPATCHED</div>
                <div className="font-mono text-[10px] text-[#4a4a54] text-center">Your mail client should have opened. I'll respond shortly.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[9px] text-[#4a4a54] tracking-widest block mb-1.5">NAME</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-[#080808] border border-[#1e1e22] px-3 py-2.5 font-mono text-xs text-[#f0efea] placeholder:text-[#4a4a54] focus:border-[#c8a96b]/40 outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-[#4a4a54] tracking-widest block mb-1.5">EMAIL</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-[#080808] border border-[#1e1e22] px-3 py-2.5 font-mono text-xs text-[#f0efea] placeholder:text-[#4a4a54] focus:border-[#c8a96b]/40 outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[9px] text-[#4a4a54] tracking-widest block mb-1.5">SUBJECT</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full bg-[#080808] border border-[#1e1e22] px-3 py-2.5 font-mono text-xs text-[#f0efea] placeholder:text-[#4a4a54] focus:border-[#c8a96b]/40 outline-none transition-colors"
                    placeholder="Cybersecurity Consultation / Opportunity"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] text-[#4a4a54] tracking-widest block mb-1.5">MESSAGE</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-[#080808] border border-[#1e1e22] px-3 py-2.5 font-mono text-xs text-[#f0efea] placeholder:text-[#4a4a54] focus:border-[#c8a96b]/40 outline-none transition-colors resize-none"
                    placeholder="Describe your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#c8a96b] text-[#0a0a0b] font-mono text-xs font-bold tracking-wider hover:bg-[#d4b87a] transition-all"
                >
                  <Send size={12} />
                  TRANSMIT MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
