import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const ABOUT_PARAGRAPHS = [
  'I’m Abhishek Babariya, a SOC Analyst with hands-on experience in monitoring, investigation, incident triage, SIEM administration and security engineering.',
  'My work spans SIEM and EDR operations, Windows and Active Directory event analysis, malware and phishing investigation, threat hunting, detection tuning and root-cause analysis.',
  'I also work across digital forensics, including evidence acquisition, artifact analysis, timeline reconstruction, memory and endpoint investigations, with a strong focus on practical incident response.',
  'I build security tools that turn repetitive analyst work into faster, repeatable investigations.',
];

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20" style={{ backgroundColor: '#050505' }}>
      <div className="relative z-10 flex flex-col items-center gap-14 sm:gap-20 md:gap-24 max-w-6xl mx-auto">
        <FadeIn delay={0} y={40}>
          <p className="uppercase tracking-[0.4em] text-xs md:text-sm text-center mb-5" style={{ color: '#00FF41', opacity: 0.8 }}>Profile</p>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            About Me
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 w-full">
          <div className="rounded-[32px] border border-[#D7E2EA]/15 p-7 md:p-10">
            <p className="uppercase tracking-widest text-xs mb-5" style={{ color: '#00FF41' }}>Security Operations</p>
            {ABOUT_PARAGRAPHS.slice(0, 2).map((paragraph, i) => (
              <AnimatedText key={i} text={paragraph} className="font-medium leading-relaxed mb-5" style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 1.7vw, 1.25rem)' }} />
            ))}
          </div>
          <div className="rounded-[32px] border border-[#D7E2EA]/15 p-7 md:p-10">
            <p className="uppercase tracking-widest text-xs mb-5" style={{ color: '#00FF41' }}>DFIR & Security Engineering</p>
            {ABOUT_PARAGRAPHS.slice(2).map((paragraph, i) => (
              <AnimatedText key={i} text={paragraph} className="font-medium leading-relaxed mb-5" style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 1.7vw, 1.25rem)' }} />
            ))}
            <div className="flex flex-wrap gap-2 mt-6">
              {['SIEM', 'EDR', 'DFIR', 'Threat Hunting', 'Malware Analysis', 'Incident Response', 'Detection Engineering', 'MITRE ATT&CK'].map((tag) => (
                <span key={tag} className="px-3 py-2 rounded-full border border-[#D7E2EA]/20 uppercase text-[0.62rem] tracking-wider" style={{ color: '#D7E2EA', opacity: 0.75 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <FadeIn delay={0.1} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
