import FadeIn from '../components/FadeIn';

const EXPERIENCE = [
  {
    role: 'Deputy Manager 2 — DFIR & Risk Analyst',
    company: 'ICICI Bank',
    period: '2024 — Present',
    description:
      'Leading Digital Forensics & Incident Response (DFIR) operations and risk analysis for India\'s leading private sector bank. Managing security incidents, threat hunting, forensic investigations, and building resilient security architectures. Driving automation in incident response workflows and enhancing the bank\'s cyber defense posture.',
    tags:
      'DFIR · Incident Response · Threat Hunting · Digital Forensics · Risk Analysis · SIEM · SOAR · Malware Analysis · Cyber Defense · Security Architecture · Automation',
  },
  {
    role: 'Product Designer / Product Marketing & UX Consultant',
    company: 'Heeding Climate Solutions',
    period: '2022 — 2024',
    description:
      'Designing and shaping digital experiences for a climate-tech platform focused on sustainable fuels, marketplace workflows, supply-chain visibility, and CO₂ reduction.',
    tags:
      'Product Design · UX/UI · Product Marketing · Marketplace Design · Supply Chain · Climate-Tech · Data Visualization · Product Strategy',
  },
];

const EDUCATION = {
  school: 'Montpellier Business School',
  degree: 'Master of Science — International Business · Supply Chain Management · France',
};

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {EXPERIENCE.map((exp, index) => (
          <FadeIn key={exp.company} delay={0.1 + index * 0.1}>
            <div
              className="py-8 sm:py-10 md:py-12"
              style={{
                borderTop: index === 0 ? '1px solid rgba(215, 226, 234, 0.15)' : 'none',
                borderBottom: '1px solid rgba(215, 226, 234, 0.15)',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-6 mb-4">
                <p
                  className="font-light uppercase tracking-widest text-xs sm:text-sm"
                  style={{ color: '#D7E2EA', opacity: 0.6 }}
                >
                  {exp.role}
                </p>
                <p
                  className="font-medium text-xs sm:text-sm"
                  style={{ color: '#D7E2EA', opacity: 0.5 }}
                >
                  {exp.period}
                </p>
              </div>
              <h3
                className="font-medium uppercase mb-3 sm:mb-4"
                style={{ color: '#D7E2EA', fontSize: 'clamp(1.4rem, 3.2vw, 2.6rem)' }}
              >
                {exp.company}
              </h3>
              <p
                className="font-light leading-relaxed max-w-3xl mb-4 sm:mb-5"
                style={{ color: '#D7E2EA', opacity: 0.7, fontSize: 'clamp(0.9rem, 1.7vw, 1.25rem)' }}
              >
                {exp.description}
              </p>
              <p
                className="uppercase tracking-widest text-[0.6rem] sm:text-[0.7rem] leading-relaxed"
                style={{ color: '#D7E2EA', opacity: 0.45 }}
              >
                {exp.tags}
              </p>
            </div>
          </FadeIn>
        ))}

        {/* Education — intentionally secondary */}
        <FadeIn delay={0.3}>
          <div
            className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-6"
            style={{ borderBottom: '1px solid rgba(215, 226, 234, 0.15)' }}
          >
            <div>
              <p
                className="uppercase tracking-widest text-[0.65rem] sm:text-xs"
                style={{ color: '#D7E2EA', opacity: 0.4 }}
              >
                Education
              </p>
              <p
                className="font-medium uppercase mt-1 text-sm sm:text-base"
                style={{ color: '#D7E2EA', opacity: 0.85 }}
              >
                {EDUCATION.school}
              </p>
            </div>
            <p className="font-light text-xs sm:text-sm" style={{ color: '#D7E2EA', opacity: 0.5 }}>
              {EDUCATION.degree}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}