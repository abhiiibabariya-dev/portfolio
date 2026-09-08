import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] text-[#4a4a54] hover:text-[#c8a96b] transition-colors mb-12 tracking-widest">
          <ArrowLeft size={11} /> HOME / ARSENAL
        </Link>

        <div className="mb-16">
          <div className="font-mono text-[11px] text-[#c8a96b] tracking-widest mb-3">05 / TECHNICAL ARSENAL</div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#f0efea] uppercase leading-tight">
            Skill<br />Matrix
          </h1>
          <div className="h-px w-24 bg-[#c8a96b]/40 mt-6 mb-4" />
          <p className="text-[#8a8a96] text-sm max-w-xl leading-relaxed">
            Tools, platforms, and frameworks across six security domains — all battle-tested in live SOC and DFIR environments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map(cat => (
            <div key={cat.code} className="border border-[#1e1e22] bg-[#0f0f10] p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1e1e22]">
                <div>
                  <div className="font-mono text-[9px] text-[#4a4a54] tracking-widest mb-1">{cat.code}</div>
                  <div className="font-mono text-sm font-bold text-[#f0efea]">{cat.title}</div>
                </div>
                <span className="font-mono text-[10px] text-[#c8a96b]">
                  {cat.skills.length} TOOLS
                </span>
              </div>

              <div className="space-y-4">
                {cat.skills.map(sk => (
                  <div key={sk.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-[#f0efea]">{sk.name}</span>
                        {sk.tag && (
                          <span className="font-mono text-[8px] text-[#4a4a54] border border-[#1e1e22] px-1.5 py-0.5">
                            {sk.tag}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[10px] text-[#c8a96b] font-bold">{sk.level}%</span>
                    </div>
                    <div className="h-1 bg-[#1e1e22] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#c8a96b] to-[#d4b87a]"
                        style={{ width: `${sk.level}%`, opacity: 0.7 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Platform tags */}
        <div className="mt-12 border border-[#1e1e22] bg-[#0f0f10] p-6">
          <div className="font-mono text-[9px] text-[#c8a96b] tracking-widest mb-4">ALL PLATFORMS & TECHNOLOGIES</div>
          <div className="flex flex-wrap gap-2">
            {SKILL_CATEGORIES.flatMap(c => c.skills).map(sk => (
              <span key={sk.name} className="font-mono text-[9px] text-[#8a8a96] border border-[#1e1e22] px-2 py-1">
                {sk.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
