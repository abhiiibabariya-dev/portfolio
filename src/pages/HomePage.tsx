import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Download } from 'lucide-react';
import { PROFILE, CASE_STUDIES } from '../data/portfolioData';

const sevColor: Record<string, string> = {
  CRITICAL: '#ef4444',
  HIGH: '#f97316',
  MEDIUM: '#eab308',
  LOW: '#4ade80',
};

export const HomePage: React.FC = () => {
  return (
    <div>
      <section className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-56px)]">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <div className="font-mono text-[11px] text-[#c8a96b] tracking-widest mb-5">
                CYBERSECURITY · DFIR · SECURITY OPERATIONS
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
                <span className="font-mono text-[11px] text-[#8a8a96] tracking-widest">{PROFILE.currentOrg.toUpperCase()}</span>
                <span className="font-mono text-[11px] text-[#4a4a54]">/</span>
                <span className="font-mono text-[11px] text-[#8a8a96] tracking-widest">{PROFILE.location.toUpperCase()}</span>
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
                and security operations. Currently working in DFIR and risk at{' '}
                <span className="text-[#f0efea] font-semibold">ICICI Bank</span>.
                M.Sc. in Digital Forensics from{' '}
                <span className="text-[#f0efea] font-semibold">NFSU</span> (CGPA 9.00).
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  to="/projects"
                  className="flex items-center gap-2 px-6 py-3 bg-[#c8a96b] text-[#0a0a0b] font-mono text-xs font-bold tracking-wider hover:bg-[#d4b87a] transition-all group"
                >
                  VIEW SELECTED WORK
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

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 font-mono text-xs text-[#8a8a96] hover:text-[#c8a96b] transition-colors">
                  <Linkedin size={14} /><span>LinkedIn</span>
                </a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 font-mono text-xs text-[#8a8a96] hover:text-[#c8a96b] transition-colors">
                  <Github size={14} /><span>GitHub</span>
                </a>
                <a href={`mailto:${PROFILE.email}`} className="font-mono text-xs text-[#4a4a54] hover:text-[#c8a96b] transition-colors">
                  {PROFILE.email}
                </a>
              </div>
            </div>

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
                      const image = e.currentTarget;
                      image.style.display = 'none';
                      const parent = image.parentElement;
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

                <div className="border-x border-b border-[#1e1e22] bg-[#0f0f10] px-4 py-3 max-w-[320px] mx-auto">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest">CURRENT ROLE</div>
                      <div className="font-mono text-[11px] text-[#c8a96b] font-bold mt-0.5">DFIR &amp; RISK ANALYST</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest">ORGANIZATION</div>
                      <div className="font-mono text-[11px] text-[#f0efea] font-bold mt-0.5">ICICI BANK</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 max-w-[320px] mx-auto">
                  {[
                    { v: '100+', l: 'Alerts Triaged' },
                    { v: '9.00', l: 'M.Sc. CGPA' },
                    { v: '80%', l: 'Triage Reduction' },
                  ].map(stat => (
                    <div key={stat.l} className="border border-[#1e1e22] bg-[#0f0f10] p-2.5 text-center">
                      <div className="font-mono text-base font-bold text-[#c8a96b]">{stat.v}</div>
                      <div className="font-mono text-[9px] text-[#4a4a54] mt-0.5 leading-tight">{stat.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1e1e22]" />
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="font-mono text-[11px] text-[#c8a96b] tracking-widest mb-3">SELECTED WORK</div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#f0efea] uppercase leading-tight">
                Investigation<br />Highlights
              </h2>
            </div>
            <Link to="/projects" className="flex items-center gap-2 font-mono text-xs text-[#8a8a96] hover:text-[#c8a96b] transition-colors group">
              VIEW ALL CASE STUDIES
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CASE_STUDIES.map(caseStudy => (
              <Link
                key={caseStudy.id}
                to={`/projects/${caseStudy.id}`}
                className="border border-[#1e1e22] bg-[#0f0f10] p-6 hover:border-[#c8a96b]/30 transition-all group block"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest mb-1">{caseStudy.caseNumber}</div>
                    <span
                      className="font-mono text-[9px] px-2 py-0.5 border"
                      style={{ color: sevColor[caseStudy.severity], borderColor: `${sevColor[caseStudy.severity]}40` }}
                    >
                      {caseStudy.severity}
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-[#4a4a54] group-hover:text-[#c8a96b] group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                </div>

                <h3 className="text-base font-semibold text-[#f0efea] mb-2 group-hover:text-[#c8a96b] transition-colors leading-snug">
                  {caseStudy.title}
                </h3>
                <p className="font-mono text-[10px] text-[#4a4a54] mb-4 leading-relaxed">{caseStudy.tagline}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {caseStudy.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="font-mono text-[9px] text-[#4a4a54] border border-[#1e1e22] px-1.5 py-0.5">{tag}</span>
                  ))}
                  {caseStudy.tags.length > 3 && (
                    <span className="font-mono text-[9px] text-[#4a4a54]">+{caseStudy.tags.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#1e1e22]">
                  <span className="font-mono text-[9px] text-[#4a4a54]">{caseStudy.role}</span>
                  <span className="font-mono text-[9px] text-[#c8a96b]">{caseStudy.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
