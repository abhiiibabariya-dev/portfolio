import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, ExternalLink } from 'lucide-react';

const navLinks = [
  { to: '/about',          label: '/about' },
  { to: '/experience',     label: '/experience' },
  { to: '/projects',       label: '/projects' },
  { to: '/skills',         label: '/skills' },
  { to: '/certifications', label: '/certs' },
  { to: '/education',      label: '/education' },
  { to: '/contact',        label: '/contact' },
];

export const SiteNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 font-mono text-xs tracking-wider transition-colors cursor-pointer ${
      isActive ? 'text-[#c8a96b]' : 'text-[#8a8a96] hover:text-[#f0efea]'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0b]/95 backdrop-blur-md border-b border-[#1e1e22]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 border border-[#c8a96b]/50 flex items-center justify-center group-hover:border-[#c8a96b] transition-colors">
              <span className="text-[#c8a96b] font-mono text-[10px] font-bold">AS</span>
            </div>
            <span className="font-mono text-sm font-bold text-[#f0efea] tracking-widest group-hover:text-[#c8a96b] transition-colors hidden sm:block">
              ABHI_SEC
            </span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="font-mono text-[9px] text-[#4ade80] hidden md:block tracking-wider">ONLINE</span>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(l => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/abhiiibabariya-dev"
              target="_blank" rel="noreferrer"
              className="w-8 h-8 flex items-center justify-center text-[#8a8a96] hover:text-[#f0efea] transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/babariya-abhishek-0085691b4/"
              target="_blank" rel="noreferrer"
              className="w-8 h-8 flex items-center justify-center text-[#8a8a96] hover:text-[#f0efea] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="/portfolio/resume/resume.pdf"
              target="_blank" rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#c8a96b]/40 text-[#c8a96b] font-mono text-xs hover:bg-[#c8a96b]/10 transition-all"
            >
              <ExternalLink size={11} />
              <span>RESUME</span>
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-[#8a8a96] hover:text-[#f0efea] transition-colors"
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-[#0a0a0b]/97 backdrop-blur-xl" onClick={() => setOpen(false)} />
          <div className="relative z-10 flex flex-col pt-20 px-6 pb-8 h-full">
            <nav className="flex flex-col gap-1">
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-left py-3.5 border-b border-[#1e1e22] font-mono text-base tracking-wider transition-colors ${
                      isActive ? 'text-[#c8a96b]' : 'text-[#8a8a96] hover:text-[#c8a96b]'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <a
                href="/portfolio/resume/resume.pdf"
                target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 border border-[#c8a96b]/50 text-[#c8a96b] font-mono text-sm hover:bg-[#c8a96b]/10 transition-all"
              >
                <ExternalLink size={14} />
                DOWNLOAD RESUME
              </a>
              <div className="flex items-center gap-3 justify-center">
                <a href="https://github.com/abhiiibabariya-dev" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-[#8a8a96] hover:text-[#f0efea] font-mono text-xs transition-colors">
                  <Github size={15} /> GitHub
                </a>
                <span className="text-[#1e1e22]">|</span>
                <a href="https://www.linkedin.com/in/babariya-abhishek-0085691b4/" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-[#8a8a96] hover:text-[#f0efea] font-mono text-xs transition-colors">
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
