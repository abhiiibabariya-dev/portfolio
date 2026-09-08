import React, { useState } from 'react';
import { CyberCanvasBackground } from './components/cyber/CyberCanvasBackground';
import { CyberNavbar } from './components/cyber/CyberNavbar';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CyberVisualizationsHub } from './components/cyber/visualizations/CyberVisualizationsHub';
import { DFIRSection } from './sections/DFIRSection';
import { SkillsSection } from './sections/SkillsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { CertificationsVaultSection } from './sections/CertificationsVaultSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';
import { InteractiveSOCTerminal } from './components/cyber/InteractiveSOCTerminal';

export const App: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    const target = document.querySelector(`#${sectionId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030604] text-zinc-100 selection:bg-[#00ff88]/30 selection:text-[#00ff88] relative overflow-x-hidden">
      {/* 1. Dynamic Cyber Background Canvas (Radar, Grid, Nodes) */}
      <CyberCanvasBackground />

      {/* 2. Fixed Top Navigation Matrix */}
      <CyberNavbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* 3. Main Architectural Sections */}
      <main className="relative z-10">
        {/* Section 01: Cinematic Hero & SOC Threat Feed */}
        <section id="hero">
          <HeroSection
            onNavigate={scrollToSection}
            onOpenTerminal={() => setTerminalOpen(true)}
          />
        </section>

        {/* Section 02: Classified Case Files Dossiers */}
        <ProjectsSection />

        {/* Section 03: 4 Technical Cyber Visualizations */}
        <CyberVisualizationsHub />

        {/* Section 04: Digital Forensics & Incident Response Lab */}
        <DFIRSection />

        {/* Section 05: Technical Arsenal Matrix */}
        <SkillsSection />

        {/* Section 06: Career Timeline & Education */}
        <ExperienceSection />

        {/* Section 07: Cryptographic Credential Vault */}
        <CertificationsVaultSection />

        {/* Section 08: Operator Bio & Methodology */}
        <AboutSection onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Section 09: Secure Transmission Vector */}
        <ContactSection />
      </main>

      {/* 4. Attested Footer */}
      <FooterSection />

      {/* 5. Interactive SOC Command Terminal Modal */}
      <InteractiveSOCTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onNavigate={scrollToSection}
      />
    </div>
  );
};

export default App;
