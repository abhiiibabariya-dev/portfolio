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

const PORTRAIT_URL = '/portfolio/images/hero/portrait.webp';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-between"
      style={{ overflow: 'hidden', backgroundColor: '#050505' }}
    >
      <FadeIn as="nav" delay={0} y={-20} className="relative z-20">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 px-5 pt-6 md:justify-between md:px-10 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-medium uppercase tracking-wider text-[11px] sm:text-xs md:text-base hover:text-[#00FF41] transition-colors duration-200"
              style={{ color: '#D7E2EA' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </FadeIn>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-5 pb-28 sm:pb-36">
        <FadeIn delay={0.15} y={40}>
          <p className="uppercase tracking-[0.25em] sm:tracking-[0.45em] text-[10px] sm:text-xs md:text-sm mb-5 text-center" style={{ color: '#00FF41', opacity: 0.9 }}>
            DFIR • SOC • Threat Detection • Incident Response
          </p>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.9] text-center text-[16vw] sm:text-[13vw] md:text-[10vw]">
            Abhi Babariya
          </h1>
          <p className="max-w-3xl mx-auto mt-6 text-center font-light leading-relaxed px-1" style={{ color: '#D7E2EA', opacity: 0.72, fontSize: 'clamp(0.95rem, 2vw, 1.25rem)' }}>
            DFIR and cybersecurity professional focused on incident investigation, security operations,
            detection engineering and evidence-driven response.
          </p>
        </FadeIn>
      </div>

      <div className="relative z-20 flex flex-col sm:flex-row justify-between items-center gap-5 px-5 md:px-10 pb-7 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="text-center sm:text-left font-light uppercase tracking-wide text-xs sm:text-sm" style={{ color: '#D7E2EA', opacity: 0.55 }}>
            DFIR · SOC · Detection Engineering
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 z-0 bottom-[-3%] sm:bottom-[-6%] w-[190px] sm:w-[300px] md:w-[420px] lg:w-[500px] opacity-80 pointer-events-none">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            <img src={PORTRAIT_URL} alt="Professional portrait of Abhishek Babariya" className="w-full h-auto select-none" draggable={false} />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
