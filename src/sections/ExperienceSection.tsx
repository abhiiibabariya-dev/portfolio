import FadeIn from '../components/FadeIn';

const experiences = [
  {
    role: 'Deputy Manager 2 · DFIR & Risk',
    company: 'ICICI Bank',
    period: '2026 – Present',
    description: 'Focused on digital forensics, incident response, risk analysis and security operations in an enterprise banking environment.',
    points: [
      'Support evidence-driven investigation workflows and security incident analysis.',
      'Analyze security events, attack paths, indicators and incident timelines to support investigation and response.',
      'Apply DFIR, SOC and risk-analysis experience to improve investigation quality, documentation and security decision-making.',
    ],
    tags: 'DFIR · Incident Response · Risk Analysis · Security Operations'
  },
  {
    role: 'SOC Analyst',
    company: 'TechOwl Infosec',
    period: 'Jan 2025 – Aug 2026',
    description: 'Enterprise SOC operations, SIEM administration, security monitoring and client onboarding across firewalls, servers, endpoints, Active Directory, cloud platforms and security tooling.',
    points: [
      'Monitored and triaged security alerts from endpoint, Windows, network and cloud telemetry sources.',
      'Performed malware and phishing investigations using process trees, command-line analysis, reputation checks, sandboxing, email-header analysis and IOC enrichment.',
      'Analyzed Windows and Active Directory events for authentication abuse, lateral movement, privilege escalation and persistence.',
      'Troubleshot SIEM ingestion, parsing, timestamps, collectors and correlation issues and supported RCA documentation.',
      'Supported detection tuning, whitelisting, playbooks, SOPs and incident-response workflows.'
    ],
    tags: 'SIEM · EDR · Incident Response · Threat Hunting · Windows · Active Directory · Malware Analysis'
  },
  {
    role: 'Network Engineer',
    company: 'Macrotech Global',
    period: 'Apr 2024 – Sep 2024',
    description: 'Supported network infrastructure and security controls across routing, switching, access control and endpoint connectivity.',
    points: [
      'Worked with routing, switching, VLANs, ACLs and network segmentation.',
      'Used Wireshark and Nmap for protocol analysis, network discovery and traffic investigation.',
      'Supported firewall, VPN and network-device security activities.'
    ],
    tags: 'Cisco · Routing · Switching · ACL · VLAN · Wireshark · Nmap · Firewall · VPN'
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32" style={{ backgroundColor: '#050505' }}>
      <FadeIn delay={0} y={40}>
        <p className="uppercase tracking-[0.4em] text-xs md:text-sm text-center mb-5" style={{ color: '#00FF41', opacity: 0.8 }}>Career Timeline</p>
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-24" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
          Experience
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto">
        {experiences.map((item, index) => (
          <FadeIn key={item.company} delay={0.08 * index}>
            <article className="py-9 md:py-12 border-t border-[#D7E2EA]/15">
              <div className="grid lg:grid-cols-[0.85fr_2fr] gap-7 lg:gap-16">
                <div>
                  <p className="uppercase tracking-widest text-xs" style={{ color: '#00FF41', opacity: 0.85 }}>{item.period}</p>
                  <h3 className="font-medium mt-3 leading-tight" style={{ color: '#D7E2EA', fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}>{item.company}</h3>
                  <p className="uppercase tracking-widest mt-2 text-xs leading-relaxed" style={{ color: '#D7E2EA', opacity: 0.55 }}>{item.role}</p>
                </div>
                <div>
                  <p className="font-light leading-relaxed mb-6" style={{ color: '#D7E2EA', opacity: 0.7, fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}>{item.description}</p>
                  <div className="space-y-3">
                    {item.points.map((point) => (
                      <div key={point} className="flex gap-3">
                        <span className="mt-0.5 flex-shrink-0" style={{ color: '#00FF41' }}>▹</span>
                        <p className="font-light leading-relaxed" style={{ color: '#D7E2EA', opacity: 0.65 }}>{point}</p>
                      </div>
                    ))}
                  </div>
                  <p className="uppercase tracking-widest mt-7 text-[0.65rem] leading-relaxed" style={{ color: '#D7E2EA', opacity: 0.45 }}>{item.tags}</p>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}

        <FadeIn delay={0.2}>
          <div className="py-10 border-y border-[#D7E2EA]/15">
            <p className="uppercase tracking-widest text-xs" style={{ color: '#00FF41', opacity: 0.8 }}>Education</p>
            <div className="mt-4 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium" style={{ color: '#D7E2EA', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>National Forensic Sciences University</h3>
                <p className="mt-1 leading-relaxed" style={{ color: '#D7E2EA', opacity: 0.5 }}>M.Sc. Digital Forensics & Information Security · CGPA 9.00 · 2022–24</p>
              </div>
              <div>
                <h3 className="font-medium" style={{ color: '#D7E2EA', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>Veer Narmad South Gujarat University</h3>
                <p className="mt-1 leading-relaxed" style={{ color: '#D7E2EA', opacity: 0.5 }}>B.Sc. Information Technology · 2018–22</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
