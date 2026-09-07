import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import DFIRSection from './sections/DFIRSection';
import ExperienceSection from './sections/ExperienceSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

export default function App() {
  return (
    <div style={{ backgroundColor: '#050505', overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <DFIRSection />
      <ExperienceSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
