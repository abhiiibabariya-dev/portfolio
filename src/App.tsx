import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SiteNavbar } from './components/SiteNavbar';
import { RainingBackground } from './components/RainingBackground';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { SkillsPage } from './pages/SkillsPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { EducationPage } from './pages/EducationPage';
import { ContactPage } from './pages/ContactPage';
import { Footer } from './sections/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f0efea] overflow-x-hidden">
      <RainingBackground />
      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <ScrollToTop />
      <SiteNavbar />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<CaseStudyPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
