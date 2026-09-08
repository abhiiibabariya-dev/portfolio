import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Download, Shield, Search, Zap, Lock } from 'lucide-react';
import { PROFILE, CASE_STUDIES, LIVE_THREAT_FEED } from '../data/portfolioData';

const sevColor: Record<string, string> = {
  CRITICAL: '#ef4444',
  HIGH: '#f97316',
  MEDIUM: '#eab308',
  LOW: '#4ade80',
};

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-56px)]">

            {/* LEFT */}
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 border border-[#1e1e22] bg-[#0f0f10]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                  <span className="font-mono text-[10px] text-[#4ade80] tracking-widest">SYSTEM STATUS: ONLINE</span>
                </div>
                <div className="hidden sm:block h-px flex-1 bg-[#1e1e22]" />
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
                <span className="font-mono text-[11px] text-[#8a8a96] tracking-widest">IDENTITY: ABHI_SEC</span>
                <span className="font-mono text-[11px] text-[#4a4a54]">/</span>
                <span className="font-mono text-[11px] text-[#c8a96b] tracking-widest">ICICI BANK · DFIR &amp; RISK</span>
                <span className="font-mono text-[11px] text-[#4a4a54]">/</span>
                <span className="font-mono text-[11px] text-[#8a8a96] tracking-widest">INDIA</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight mb-6 uppercase">
                <span className="text-[#f0efea]">Abhishek</span>
                <br />
                <span className="text-[#c8a96b]">Babariya</span>
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {['DFIR ANALYST', 'SOC OPERATIONS', 'INCIDENT RESPONSE', 'THREAT DETECTION'].map(tag => (
                  <span key={tag} className="font-mono text-[10px] tracking-widest text-[#8a8a96] border border-[#1e1e22] px-2.5 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[#8a8a96] text-base leading-relaxed max-w-xl mb-10">
                Cybersecurity professional specializing in digital forensics, incident response,
                and security operations. Currently driving DFIR investigations at{' '}
                <span className="text-[#f0efea] font-semibold">ICICI Bank</span>.
                M.Sc. Digital Forensics from{' '}
                <span className="text-[#f0efea] font-semibold">NFSU</span> (CGPA 9.00).
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  to="/projects"
                  className="flex items-center gap-2 px-6 py-3 bg-[#c8a96b] text-[#0a0a0b] font-mono text-xs font-bold tracking-wider hover:bg-[#d4b87a] transition-all group"
                >
                  EXPLORE CASES
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="/portfolio/resume/resume.pdf"
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-[#2a2a30] text-[#f0efea] font-mono text-xs font-bold tracking-wider hover:border-[#c8a96b]/50 hover:text-[#c8a96b] transition-all"
                >
                  <Download size={13} />
                  RESUME
                </a>
              </div>

              <div className="flex items-center gap-4">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 font-mono text-xs text-[#8a8a96] hover:text-[#c8a96b] transition-colors">
                  <Linkedin size={14} /><span>LinkedIn</span>
                </a>
                <span className="text-[#1e1e22]">·</span>
                <a href={PROFILE.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 font-mono text-xs text-[#8a8a96] hover:text-[#c8a96b] transition-colors">
                  <Github size={14} /><span>GitHub</span>
                </a>
                <span className="text-[#1e1e22]">·</span>
                <span className="font-mono text-xs text-[#4a4a54]">{PROFILE.email}</span>
              </div>
            </div>

            {/* RIGHT — photo + dossier */}
            <div className="flex justify-center items-center order-1 lg:order-2">
              <div className="relative w-full max-w-sm lg:max-w-md">
                <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#c8a96b]/40" />
                <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-[#c8a96b]/40" />
                <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-[#c8a96b]/40" />
                <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#c8a96b]/40" />

                <div className="border border-[#1e1e22] bg-[#0f0f10] overflow-hidden aspect-[4/5] w-full max-w-[320px] mx-auto">
                  <img
                    src="/portfolio/images/hero/portrait.png"
                    alt="Abhishek Babariya"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = 'none';
                      const parent = t.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex flex-col items-center justify-center gap-3">
                            <div class="w-20 h-20 rounded-full border-2 border-[#c8a96b]/40 flex items-center justify-center">
                              <span class="font-mono text-2xl font-bold text-[#c8a96b]">AB</span>
                            </div>
                            <span class="font-mono text-xs text-[#4a4a54]">ABHISHEK BABARIYA</span>
                          </div>`;
                      }
                    }}
                  />
                </div>

                <div className="mt-0 border-x border-b border-[#1e1e22] bg-[#0f0f10] px-4 py-3 max-w-[320px] mx-auto">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest">CASE FILE</div>
                      <div className="font-mono text-[11px] text-[#c8a96b] font-bold mt-0.5">ABHI-SEC-2026</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest">CLEARANCE</div>
                      <div className="font-mono text-[11px] text-[#4ade80] font-bold mt-0.5">VERIFIED</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 max-w-[320px] mx-auto">
                  {[
                    { v: '100+', l: 'Daily Alerts' },
                    { v: '9.00', l: 'CGPA NFSU' },
                    { v: '80%', l: 'MTTR Reduction' },
                  ].map(s => (
                    <div key={s.l} className="border border-[#1e1e22] bg-[#0f0f10] p-2.5 text-center">
                      <div className="font-mono text-base font-bold text-[#c8a96b]">{s.v}</div>
                      <div className="font-mono text-[9px] text-[#4a4a54] mt-0.5 leading-tight">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1e1e22]" />
      </section>

      {/* ── FOCUS STRIP ── */}
      <section className="border-b border-[#1e1e22] py-5 overflow-hidden bg-[#0a0a0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-x-8 gap-y-3 items-center justify-center sm:justify-between">
            {[
              { icon: Shield, label: 'DFIR & Forensics', sub: 'FTK · Autopsy · Volatility' },
              { icon: Search, label: 'Threat Hunting', sub: 'KQL · MITRE ATT&CK · TI' },
              { icon: Zap, label: 'SOC Operations', sub: 'CrowdStrike · Wazuh · FortiSIEM' },
              { icon: Lock, label: 'Incident Response', sub: 'NIST · PICERL · Chain of Custody' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon size={14} className="text-[#c8a96b]" />
                <div>
                  <div className="font-mono text-[11px] text-[#f0efea] tracking-wider">{label}</div>
                  <div className="font-mono text-[9px] text-[#4a4a54]">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE THREAT FEED ── */}
      <section className="py-16 border-b border-[#1e1e22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
              <span className="font-mono text-xs text-[#f0efea] tracking-widest">LIVE THREAT FEED</span>
            </div>
            <span className="font-mono text-[9px] text-[#4a4a54]">SIMULATED · FOR DEMONSTRATION</span>
          </div>
          <div className="border border-[#1e1e22] bg-[#0a0a0b] overflow-hidden">
            <div className="border-b border-[#1e1e22] px-4 py-2 flex items-center gap-3 bg-[#0f0f10]">
              <span className="font-mono text-[9px] text-[#4a4a54] tracking-widest">EVENT_ID</span>
              <span className="font-mono text-[9px] text-[#4a4a54] tracking-widest ml-auto hidden sm:block">TIME</span>
              <span className="font-mono text-[9px] text-[#4a4a54] tracking-widest w-20 text-right">SEV</span>
              <span className="font-mono text-[9px] text-[#4a4a54] tracking-widest w-24 text-right hidden md:block">TECHNIQUE</span>
              <span className="font-mono text-[9px] text-[#4a4a54] tracking-widest flex-1 ml-4">DESCRIPTION</span>
              <span className="font-mono text-[9px] text-[#4a4a54] tracking-widest w-24 text-right hidden lg:block">STATUS</span>
            </div>
            {LIVE_THREAT_FEED.map((evt, i) => (
              <div
                key={evt.id}
                className={`flex items-start gap-3 px-4 py-2.5 border-b border-[#1e1e22] hover:bg-[#0f0f10] transition-colors ${i % 2 === 0 ? '' : 'bg-[#0d0d0e]'}`}
              >
                <span className="font-mono text-[10px] text-[#4a4a54] shrink-0 w-20">{evt.id}</span>
                <span className="font-mono text-[10px] text-[#4a4a54] shrink-0 hidden sm:block">{evt.time}</span>
                <span className="font-mono text-[10px] font-bold w-20 text-right shrink-0" style={{ color: sevColor[evt.sev] }}>{evt.sev}</span>
                <span className="font-mono text-[10px] text-[#8a8a96] w-24 text-right shrink-0 hidden md:block">{evt.tech}</span>
                <span className="font-mono text-[10px] text-[#8a8a96] flex-1 ml-4 leading-relaxed">{evt.desc}</span>
                <span className="font-mono text-[9px] text-[#4ade80] w-24 text-right shrink-0 hidden lg:block">{evt.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE PREVIEWS ── */}
      <section className="py-20 border-b border-[#1e1e22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="font-mono text-[11px] text-[#c8a96b] tracking-widest mb-3">ACTIVE INVESTIGATIONS</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#f0efea] uppercase leading-tight">
                Case<br />Files
              </h2>
            </div>
            <Link to="/projects" className="flex items-center gap-2 font-mono text-xs text-[#8a8a96] hover:text-[#c8a96b] transition-colors group">
              VIEW ALL CASES
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CASE_STUDIES.slice(0, 4).map(cs => (
              <Link
                key={cs.id}
                to={`/projects/${cs.id}`}
                className="border border-[#1e1e22] bg-[#0f0f10] p-6 hover:border-[#c8a96b]/30 transition-all group block"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest mb-1">{cs.caseNumber}</div>
                    <span
                      className="font-mono text-[9px] px-2 py-0.5 border"
                      style={{ color: sevColor[cs.severity], borderColor: `${sevColor[cs.severity]}40` }}
                    >
                      {cs.severity}
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-[#4a4a54] group-hover:text-[#c8a96b] group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                </div>

                <h3 className="text-base font-semibold text-[#f0efea] mb-2 group-hover:text-[#c8a96b] transition-colors leading-snug">
                  {cs.title}
                </h3>
                <p className="font-mono text-[10px] text-[#4a4a54] mb-4 leading-relaxed line-clamp-2">{cs.tagline}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cs.tags.slice(0, 3).map(t => (
                    <span key={t} className="font-mono text-[9px] text-[#4a4a54] border border-[#1e1e22] px-1.5 py-0.5">{t}</span>
                  ))}
                  {cs.tags.length > 3 && (
                    <span className="font-mono text-[9px] text-[#4a4a54]">+{cs.tags.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#1e1e22]">
                  <span className="font-mono text-[9px] text-[#4a4a54]">{cs.role}</span>
                  <span className="font-mono text-[9px] text-[#c8a96b]">{cs.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK NAV CARDS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="font-mono text-[11px] text-[#c8a96b] tracking-widest mb-8">NAVIGATE</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { to: '/about', label: 'Identity', sub: 'Profile & Background' },
              { to: '/experience', label: 'Experience', sub: 'ICICI Bank · TechOwl' },
              { to: '/skills', label: 'Arsenal', sub: '6 Domains · 30+ Tools' },
              { to: '/certifications', label: 'Credentials', sub: '15 Verified Certs' },
              { to: '/education', label: 'Education', sub: 'NFSU · VNSGU' },
              { to: '/contact', label: 'Contact', sub: 'Get In Touch' },
            ].map(card => (
              <Link
                key={card.to}
                to={card.to}
                className="border border-[#1e1e22] bg-[#0f0f10] p-4 hover:border-[#c8a96b]/30 hover:bg-[#111113] transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#f0efea] group-hover:text-[#c8a96b] transition-colors">{card.label}</span>
                  <ArrowRight size={11} className="text-[#4a4a54] group-hover:text-[#c8a96b] group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="font-mono text-[9px] text-[#4a4a54]">{card.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
