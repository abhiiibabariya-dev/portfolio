import FadeIn from '../components/FadeIn';

const experiences = [
  {
    role: 'SOC Analyst',
    company: 'TechOwl',
    period: 'Jan 2025 – Present',
    description: 'Enterprise SOC operations, SIEM administration and client onboarding across firewalls, servers, endpoints, Active Directory, cloud platforms and security tooling.',
    points: [
      'Monitor and triage 100+ daily security alerts from CrowdStrike Falcon, Sysmon, Windows Event Logs, NXLog and cloud security sources.',
      'Perform malware and phishing investigations using process trees, command-line analysis, reputation checks, sandboxing, email-header analysis and IOC enrichment.',
      'Analyze Windows and Active Directory events including 4624, 4625, 4688, 4672, 4720 and Sysmon telemetry for brute force, lateral movement, privilege escalation and persistence.',
      'Troubleshoot SIEM ingestion, parsing, timestamp, collector and correlation issues; build RCA reports with timelines, IOCs, attack flow, impact and remediation.',
      'Tune detection rules, manage whitelists, maintain playbooks/SOPs and support enterprise incident response.'
    ],
    tags: 'SIEM · EDR · Incident Response · Threat Hunting · Windows · Active Directory · Malware Analysis'
  },
  {
    role: 'Network Engineer',
    company: 'Macrotech Global',
    period: 'May 2024 – Sep 2024',
    description: 'Designed and supported enterprise network infrastructure with a strong security focus across routing, switching and access control.',
    points: [
      'Configured Cisco routers, Layer 2/3 switches, DNS, proxy and DHCP services supporting 200+ endpoints across multiple VLANs.',
      'Implemented OSPF/EIGRP optimization, granular ACLs, port security and VLAN segmentation to isolate critical systems.',
      'Used Wireshark and Nmap for protocol analysis, network discovery, vulnerability scanning and anomalous traffic investigation.',
      'Supported firewall rule optimization, VPN configuration, NAC and network-device security patching.'
    ],
    tags: 'Cisco · Routing · Switching · ACL · VLAN · Wireshark · Nmap · Firewall · VPN · NAC'
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32" style={{ backgroundColor: '#050505' }}>
      <FadeIn delay={0} y={40}>
        <p className="uppercase tracking-[0.4em] text-xs md:text-sm text-center mb-5" style={{ color: '#00FF41', opacity: 0.8 }}>Career Timeline</p>
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-24" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Experience
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto">
        {experiences.map((item, index) => (
          <FadeIn key={item.company} delay={0.08 * index}>
            <article className="py-10 md:py-14 border-t border-[#D7E2EA]/15">
              <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
                <div>
                  <p className="uppercase tracking-widest text-xs" style={{ color: '#00FF41', opacity: 0.85 }}>{item.period}</p>
                  <h3 className="font-medium uppercase mt-3" style={{ color: '#D7E2EA', fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}>{item.company}</h3>
                  <p className="uppercase tracking-widest mt-2 text-xs" style={{ color: '#D7E2EA', opacity: 0.55 }}>{item.role}</p>
                </div>
                <div>
                  <p className="font-light leading-relaxed mb-6" style={{ color: '#D7E2EA', opacity: 0.7, fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}>{item.description}</p>
                  <div className="space-y-3">
                    {item.points.map((point) => (
                      <div key={point} className="flex gap-4">
                        <span style={{ color: '#00FF41' }}>▹</span>
                        <p className="font-light leading-relaxed" style={{ color: '#D7E2EA', opacity: 0.65 }}>{point}</p>
                      </div>
                    ))}
                  </div>
                  <p className="uppercase tracking-widest mt-7 text-[0.65rem] leading-relaxed" style={{ color: '#D7E2EA', opacity: 0.4 }}>{item.tags}</p>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}

        <FadeIn delay={0.2}>
          <div className="py-10 border-y border-[#D7E2EA]/15">
            <p className="uppercase tracking-widest text-xs" style={{ color: '#00FF41', opacity: 0.8 }}>Education</p>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium uppercase" style={{ color: '#D7E2EA', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>National Forensic Sciences University</h3>
                <p style={{ color: '#D7E2EA', opacity: 0.5 }}>M.Sc. Digital Forensics & Information Security (Cyber Security) · CGPA 9.00 · 2022–24</p>
              </div>
              <div>
                <h3 className="font-medium uppercase" style={{ color: '#D7E2EA', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>J.P. Dawar Institute of IT (VNSGU)</h3>
                <p style={{ color: '#D7E2EA', opacity: 0.5 }}>B.Sc. Information Technology · CGPA 6.60 · 2018–22</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
