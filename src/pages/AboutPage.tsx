import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Phone, Linkedin, Github } from 'lucide-react';
import { PROFILE, SKILL_CATEGORIES } from '../data/portfolioData';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] text-[#4a4a54] hover:text-[#c8a96b] transition-colors mb-12 tracking-widest">
          <ArrowLeft size={11} /> HOME / ABOUT
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="font-mono text-[11px] text-[#c8a96b] tracking-widest mb-3">01 / IDENTITY</div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#f0efea] uppercase leading-tight mb-4">
            Operator<br />Profile
          </h1>
          <div className="h-px w-24 bg-[#c8a96b]/40 mb-6" />
          <p className="text-[#8a8a96] text-base leading-relaxed max-w-2xl">
            Cybersecurity professional with a specialization in Digital Forensics and Incident Response,
            currently serving as Deputy Manager 2 at ICICI Bank's Information Security Group.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

          {/* Photo + contact card */}
          <div className="lg:col-span-1">
            <div className="border border-[#1e1e22] bg-[#0f0f10] overflow-hidden mb-4">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/portfolio/images/hero/portrait.png"
                  alt="Abhishek Babariya"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const t = e.currentTarget; t.style.display = 'none';
                    const p = t.parentElement;
                    if (p) p.innerHTML = `<div class="w-full h-full flex items-center justify-center"><span class="font-mono text-3xl font-bold text-[#c8a96b]">AB</span></div>`;
                  }}
                />
              </div>
              <div className="p-4 border-t border-[#1e1e22]">
                <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest mb-1">OPERATOR</div>
                <div className="font-mono text-sm font-bold text-[#f0efea]">{PROFILE.name}</div>
                <div className="font-mono text-[10px] text-[#c8a96b] mt-0.5">{PROFILE.currentRole}</div>
                <div className="font-mono text-[10px] text-[#8a8a96]">{PROFILE.currentOrg}</div>
              </div>
            </div>

            {/* Contact info */}
            <div className="border border-[#1e1e22] bg-[#0f0f10] p-4 space-y-3">
              <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest mb-3">CONTACT CHANNELS</div>
              {[
                { icon: MapPin, val: PROFILE.location },
                { icon: Mail, val: PROFILE.email },
                { icon: Phone, val: PROFILE.phone },
              ].map(({ icon: Icon, val }) => (
                <div key={val} className="flex items-center gap-2.5">
                  <Icon size={11} className="text-[#c8a96b] shrink-0" />
                  <span className="font-mono text-[10px] text-[#8a8a96] break-all">{val}</span>
                </div>
              ))}
              <div className="pt-2 flex gap-3">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[10px] text-[#4a4a54] hover:text-[#c8a96b] transition-colors">
                  <Linkedin size={11} /> LinkedIn
                </a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[10px] text-[#4a4a54] hover:text-[#c8a96b] transition-colors">
                  <Github size={11} /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Bio + stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mission statement */}
            <div className="border border-[#1e1e22] bg-[#0f0f10] p-6">
              <div className="font-mono text-[9px] text-[#c8a96b] tracking-widest mb-4">OPERATOR BRIEF</div>
              <div className="space-y-4 text-[#8a8a96] text-sm leading-relaxed">
                <p>
                  I am a cybersecurity practitioner with a deep focus on Digital Forensics &amp; Incident Response (DFIR),
                  Security Operations, and Threat Intelligence. My professional journey spans enterprise banking security
                  at <span className="text-[#f0efea]">ICICI Bank</span>, SOC operations at <span className="text-[#f0efea]">TechOwl Infosec</span>,
                  and network infrastructure engineering at <span className="text-[#f0efea]">Macrotech Global</span>.
                </p>
                <p>
                  I hold an M.Sc. in Digital Forensics &amp; Information Security from the{' '}
                  <span className="text-[#f0efea]">National Forensic Sciences University (NFSU)</span>, graduating with a
                  distinction CGPA of 9.00/10.00. My investigations blend rigorous forensic methodology with modern
                  cloud-native telemetry, enabling defensible verdicts backed by legal-grade chain-of-custody documentation.
                </p>
                <p>
                  My work is anchored in the MITRE ATT&amp;CK framework — I map every detection rule, investigation finding,
                  and threat hypothesis to specific adversary techniques to ensure reproducible, auditable security outcomes.
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PROFILE.stats.map(s => (
                <div key={s.label} className="border border-[#1e1e22] bg-[#0f0f10] p-4">
                  <div className="font-mono text-2xl font-bold text-[#c8a96b] mb-1">{s.value}</div>
                  <div className="font-mono text-[10px] text-[#f0efea] mb-1 leading-tight">{s.label}</div>
                  <div className="font-mono text-[9px] text-[#4a4a54]">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Core competencies */}
            <div className="border border-[#1e1e22] bg-[#0f0f10] p-6">
              <div className="font-mono text-[9px] text-[#c8a96b] tracking-widest mb-4">CORE COMPETENCIES</div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Digital Forensics', 'Incident Response', 'SIEM Operations', 'Threat Hunting',
                  'KQL Querying', 'MITRE ATT&CK', 'Chain of Custody', 'Malware Analysis',
                  'Detection Engineering', 'SOAR Automation', 'Cloud Security', 'SOC Operations',
                  'Penetration Testing Basics', 'Risk Assessment', 'Compliance & ISMS'
                ].map(skill => (
                  <span key={skill} className="font-mono text-[9px] text-[#8a8a96] border border-[#1e1e22] px-2 py-1">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skill overview bars */}
        <div className="border-t border-[#1e1e22] pt-12">
          <div className="font-mono text-[11px] text-[#c8a96b] tracking-widest mb-8">PROFICIENCY OVERVIEW</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map(cat => (
              <div key={cat.code} className="border border-[#1e1e22] bg-[#0f0f10] p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-[#f0efea] tracking-wider">{cat.title}</span>
                  <span className="font-mono text-[9px] text-[#4a4a54]">{cat.code}</span>
                </div>
                <div className="space-y-2.5">
                  {cat.skills.slice(0, 3).map(sk => (
                    <div key={sk.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-mono text-[9px] text-[#8a8a96]">{sk.name}</span>
                        <span className="font-mono text-[9px] text-[#c8a96b]">{sk.level}%</span>
                      </div>
                      <div className="h-px bg-[#1e1e22] relative overflow-hidden">
                        <div
                          className="h-full bg-[#c8a96b] absolute left-0 top-0"
                          style={{ width: `${sk.level}%`, opacity: 0.6 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/skills" className="inline-flex items-center gap-2 font-mono text-xs text-[#8a8a96] hover:text-[#c8a96b] transition-colors">
              VIEW FULL ARSENAL →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
