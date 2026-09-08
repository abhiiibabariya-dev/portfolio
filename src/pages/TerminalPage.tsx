import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CASE_STUDIES, PROFILE, SKILL_CATEGORIES } from '../data/portfolioData';

const welcome = ['ABHI_SEC TERMINAL // PORTFOLIO INTERFACE', 'Type "help" to view supported commands.', ''];

export const TerminalPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(welcome);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { inputRef.current?.focus(); bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const go = (path: string) => { navigate(path); };
  const run = (event: React.FormEvent) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    const output = [...history, `visitor@abhi-sec:~$ ${input}`];
    const navigation: Record<string, string> = { about: '/about', skills: '/skills', experience: '/experience', resume: '/resume', contact: '/contact', schedule: '/schedule', verify: '/verify', projects: '/projects' };
    if (command in navigation) {
      output.push(`Opening ${command}...`);
      setHistory(output);
      setInput('');
      window.setTimeout(() => go(navigation[command]), 150);
      return;
    }
    if (command === 'help') output.push('COMMANDS: help, about, skills, experience, projects, resume, contact, schedule, verify, github, linkedin, clear');
    else if (command === 'projects') output.push(...CASE_STUDIES.map(study => `${study.caseNumber} · ${study.title} · /projects/${study.slug}`));
    else if (command === 'skills') output.push(...SKILL_CATEGORIES.map(category => `${category.title}: ${category.skills.map(skill => skill.name).join(', ')}`));
    else if (command === 'github') { output.push('Opening GitHub profile...'); window.open(PROFILE.github, '_blank', 'noopener,noreferrer'); }
    else if (command === 'linkedin') { output.push('Opening LinkedIn profile...'); window.open(PROFILE.linkedin, '_blank', 'noopener,noreferrer'); }
    else if (command === 'clear') { setHistory([]); setInput(''); return; }
    else output.push(`Unknown command: ${command}. Type "help" for supported commands.`);
    setHistory(output);
    setInput('');
  };

  return <div className="min-h-screen pt-14"><div className="max-w-5xl mx-auto px-4 sm:px-6 py-16"><header className="mb-8"><div className="font-mono text-[11px] text-[#c8a96b] tracking-widest mb-3">09 / PORTFOLIO TERMINAL</div><h1 className="font-display text-4xl sm:text-5xl font-bold uppercase">Command<br />Interface</h1></header><section aria-label="Interactive portfolio terminal" className="border border-[#24503a] bg-[#050806] shadow-[0_0_50px_rgba(74,222,128,0.06)]"><div className="flex items-center justify-between px-4 py-3 border-b border-[#1c2a23] font-mono text-[10px]"><span className="text-[#4ade80]">visitor@abhi-sec:~$ secure-session</span><button onClick={() => setHistory(welcome)} className="text-[#8a8a96] hover:text-[#f0efea]" aria-label="Reset terminal">RESET</button></div><div className="h-[55vh] min-h-[360px] overflow-y-auto p-4 sm:p-6 font-mono text-xs leading-relaxed text-[#8a8a96]">{history.map((line, index) => <p key={`${line}-${index}`} className={line.startsWith('visitor@') ? 'text-[#c8a96b] mt-3' : line.includes('COMMANDS:') ? 'text-[#4ade80]' : ''}>{line || '\u00a0'}</p>)}<div ref={bottomRef} /></div><form onSubmit={run} className="border-t border-[#1c2a23] p-4 flex items-center gap-2"><span className="font-mono text-xs text-[#4ade80] shrink-0">visitor@abhi-sec:~$</span><input ref={inputRef} value={input} onChange={event => setInput(event.target.value)} className="flex-1 min-w-0 bg-transparent text-[#f0efea] font-mono text-xs outline-none" aria-label="Terminal command" placeholder="help" /><button className="font-mono text-xs text-[#c8a96b] hover:text-[#f0efea]">RUN</button></form></section><p className="font-mono text-[10px] text-[#4a4a54] mt-4">Visual portfolio interface only. It cannot access a system or execute shell commands.</p></div></div>;
};
