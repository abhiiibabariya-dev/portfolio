import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '../data/portfolioData';

const sevColor: Record<string, string> = {
  CRITICAL: '#ef4444',
  HIGH: '#f97316',
  MEDIUM: '#eab308',
  LOW: '#4ade80',
};

export const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] text-[#4a4a54] hover:text-[#c8a96b] transition-colors mb-12 tracking-widest">
          <ArrowLeft size={11} /> HOME / INVESTIGATIONS
        </Link>

        <div className="mb-16">
          <div className="font-mono text-[11px] text-[#c8a96b] tracking-widest mb-3">04 / INVESTIGATIONS</div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#f0efea] uppercase leading-tight">
            Case<br />Archive
          </h1>
          <div className="h-px w-24 bg-[#c8a96b]/40 mt-6 mb-4" />
          <p className="text-[#8a8a96] text-sm max-w-2xl leading-relaxed">
            Documented forensic investigations, SOC automation builds, detection engineering projects,
            and adversary simulation exercises — each with full methodology, findings, and outcomes.
          </p>
        </div>

        <div className="space-y-4">
          {CASE_STUDIES.map((cs, i) => (
            <Link
              key={cs.id}
              to={`/projects/${cs.id}`}
              className="border border-[#1e1e22] bg-[#0f0f10] p-6 sm:p-8 hover:border-[#c8a96b]/30 transition-all group block"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                {/* Case number */}
                <div className="shrink-0">
                  <div className="font-mono text-4xl font-bold text-[#1e1e22] group-hover:text-[#c8a96b]/20 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <span className="font-mono text-[9px] text-[#4a4a54] tracking-widest">{cs.caseNumber}</span>
                    <span
                      className="font-mono text-[9px] px-2 py-0.5 border self-start"
                      style={{ color: sevColor[cs.severity], borderColor: `${sevColor[cs.severity]}40` }}
                    >
                      {cs.severity}
                    </span>
                    <span className="font-mono text-[9px] text-[#4a4a54]">{cs.category}</span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-[#f0efea] group-hover:text-[#c8a96b] transition-colors mb-2 leading-snug">
                    {cs.title}
                  </h2>
                  <p className="font-mono text-[11px] text-[#4a4a54] mb-4 leading-relaxed max-w-2xl">
                    {cs.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cs.tags.slice(0, 5).map(t => (
                      <span key={t} className="font-mono text-[9px] text-[#4a4a54] border border-[#1e1e22] px-1.5 py-0.5">{t}</span>
                    ))}
                    {cs.tags.length > 5 && (
                      <span className="font-mono text-[9px] text-[#4a4a54]">+{cs.tags.length - 5}</span>
                    )}
                  </div>

                  {/* Outcomes row */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-[#1e1e22]">
                    {cs.outcomes.slice(0, 4).map(o => (
                      <div key={o.k}>
                        <div className="font-mono text-sm font-bold text-[#c8a96b]">{o.k}</div>
                        <div className="font-mono text-[9px] text-[#4a4a54]">{o.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="shrink-0 self-center">
                  <ArrowRight size={18} className="text-[#2a2a30] group-hover:text-[#c8a96b] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
