import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] text-[#4a4a54] hover:text-[#c8a96b] transition-colors mb-12 tracking-widest">
          <ArrowLeft size={11} /> HOME / EXPERIENCE
        </Link>

        <div className="mb-16">
          <div className="font-mono text-[11px] text-[#c8a96b] tracking-widest mb-3">02 / EXPERIENCE</div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#f0efea] uppercase leading-tight">
            Field<br />Record
          </h1>
          <div className="h-px w-24 bg-[#c8a96b]/40 mt-6" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[#1e1e22] hidden sm:block" />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="relative sm:pl-12">
                {/* Timeline dot */}
                <div className={`absolute left-2.5 top-6 w-3 h-3 border-2 hidden sm:block ${
                  exp.status === 'CURRENT'
                    ? 'border-[#c8a96b] bg-[#c8a96b]/20'
                    : 'border-[#2a2a30] bg-[#0a0a0b]'
                }`} />

                <div className={`border bg-[#0f0f10] p-6 sm:p-8 ${
                  exp.status === 'CURRENT' ? 'border-[#c8a96b]/25' : 'border-[#1e1e22]'
                }`}>
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {exp.status === 'CURRENT' && (
                          <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#4ade80] tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                            CURRENT
                          </span>
                        )}
                        <span className="font-mono text-[9px] text-[#4a4a54] tracking-widest">{exp.period}</span>
                      </div>
                      <h2 className="text-xl font-bold text-[#f0efea] mb-1">{exp.role}</h2>
                      <div className="font-mono text-sm text-[#c8a96b]">{exp.company}</div>
                      <div className="font-mono text-[10px] text-[#4a4a54] mt-0.5">{exp.department}</div>
                    </div>
                    <div className="font-mono text-[10px] text-[#4a4a54] shrink-0">{exp.location}</div>
                  </div>

                  {/* Summary */}
                  <p className="text-[#8a8a96] text-sm leading-relaxed mb-6 pb-6 border-b border-[#1e1e22]">
                    {exp.summary}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="font-mono text-[9px] text-[#c8a96b] tracking-widest mb-3">KEY RESPONSIBILITIES</div>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="font-mono text-[#c8a96b] text-xs mt-0.5 shrink-0">›</span>
                          <span className="text-[#8a8a96] text-sm leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest mb-3">TECHNOLOGIES</div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map(t => (
                        <span key={t} className="font-mono text-[9px] text-[#4a4a54] border border-[#1e1e22] px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
