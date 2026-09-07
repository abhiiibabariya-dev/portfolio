import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'DFIR', href: '#dfir' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const PORTRAIT_URL = '/images/hero/portrait.webp';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-between"
      style={{ overflowX: 'clip', backgroundColor: '#050505' }}
    >
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20">
        <div className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-medium uppercase tracking-wider text-sm md:text-lg hover:opacity-70 transition-opacity duration-200"
              style={{ color: '#D7E2EA' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </FadeIn>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-5">
        <FadeIn delay={0.15} y={40}>
          <p className="uppercase tracking-[0.45em] text-xs md:text-sm mb-6 text-center" style={{ color: '#00FF41', opacity: 0.9 }}>
            DFIR • SOC • Threat Detection • Incident Response
          </p>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.9] text-center text-[17vw] sm:text-[15vw] md:text-[12.5vw]">
            Abhi Babariya
          </h1>
          <p className="max-w-3xl mx-auto mt-7 text-center font-light leading-relaxed" style={{ color: '#D7E2EA', opacity: 0.72, fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
            Security Analyst focused on SOC operations, SIEM engineering, detection engineering,
            malware investigation and digital forensics. Building practical blue-team tooling for real investigations.
          </p>
        </FadeIn>
      </div>

      <div className="relative z-20 flex flex-col sm:flex-row justify-between items-center gap-5 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="font-light uppercase tracking-wide" style={{ color: '#D7E2EA', opacity: 0.55 }}>
            SOC Analyst · DFIR · Detection Engineering
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 z-0 bottom-[-6%] sm:bottom-[-4%] w-[250px] sm:w-[330px] md:w-[420px] lg:w-[500px] opacity-95">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img src={PORTRAIT_URL} alt="Abhi Babariya" className="w-full h-auto select-none pointer-events-none" draggable={false} />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
