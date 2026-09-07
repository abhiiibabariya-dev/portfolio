import { useState } from 'react';
import FadeIn from '../components/FadeIn';
import ProjectButton from '../components/ProjectButton';

type Project = {
  number: string;
  name: string;
  category: string;
  summary: string;
  technologies: string[];
  sections: { title: string; text: string }[];
};

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'CyberGuard — Threat Detection System',
    category: 'Detection Engineering · Personal Lab',
    summary: 'A practical detection engineering case study focused on behavioral and command-line telemetry for identifying suspicious PowerShell, WMI and living-off-the-land activity.',
    technologies: ['Sysmon', 'Windows Event Logs', 'Sigma', 'YARA', 'MITRE ATT&CK'],
    sections: [
      { title: 'Executive Summary', text: 'Built a structured detection workflow to move from suspicious telemetry to validated detection logic and repeatable testing.' },
      { title: 'Problem Statement', text: 'Signature-only detection can miss obfuscated or modified attacker behavior and can generate noisy alerts without context.' },
      { title: 'Detection Logic', text: 'Detection logic combines command-line indicators, parent-child process relationships and Windows telemetry instead of relying on a single IOC.' },
      { title: 'Investigation Workflow', text: 'Triage alert → validate process tree → review command line → correlate host and user activity → enrich indicators → document findings.' },
      { title: 'MITRE ATT&CK Mapping', text: 'The case study maps detections to relevant techniques and records the telemetry required to validate each behavior.' },
      { title: 'Results & Learnings', text: 'The main outcome is a repeatable detection-testing process that makes rule tuning, validation and future regression testing easier.' },
    ],
  },
  {
    number: '02',
    name: 'SOC Automation Lab',
    category: 'Security Automation · Incident Response',
    summary: 'A lab environment exploring alert enrichment and incident-response workflow automation across SIEM and security operations tooling.',
    technologies: ['Wazuh', 'TheHive', 'Shuffle', 'VirusTotal', 'Webhooks'],
    sections: [
      { title: 'Executive Summary', text: 'Designed a workflow that demonstrates how repetitive SOC investigation steps can be standardized and automated.' },
      { title: 'Problem Statement', text: 'Analysts lose valuable investigation time switching between tools for enrichment, IOC checks and incident documentation.' },
      { title: 'Lab Architecture', text: 'Security alerts are routed through an integration workflow where relevant fields are normalized, enriched and passed to the investigation process.' },
      { title: 'Investigation Workflow', text: 'Alert intake → IOC extraction → enrichment → severity/context review → case creation → analyst validation.' },
      { title: 'Screenshots & Evidence', text: 'The portfolio case study is structured to hold workflow screenshots, alert evidence and investigation records as they are added.' },
      { title: 'Key Learnings', text: 'Automation should reduce repetitive work while keeping analysts in control of final validation and response decisions.' },
    ],
  },
  {
    number: '03',
    name: 'Mobile & Cloud Forensics Investigation',
    category: 'Digital Forensics · Investigation Lab',
    summary: 'A DFIR case-study structure for documenting evidence acquisition, artifact analysis, timeline building and investigation reporting across mobile and cloud sources.',
    technologies: ['Digital Forensics', 'Artifact Analysis', 'Timeline Analysis', 'IOC Extraction', 'Evidence Handling'],
    sections: [
      { title: 'Executive Summary', text: 'Focused on building a defensible investigation workflow from acquisition through artifact analysis and reporting.' },
      { title: 'Problem Statement', text: 'Evidence from mobile devices and cloud services can be distributed across multiple sources and requires careful correlation.' },
      { title: 'Investigation Workflow', text: 'Preserve evidence → identify data sources → extract artifacts → normalize timestamps → build timeline → correlate activity → document findings.' },
      { title: 'Screenshots & Evidence', text: 'The project layout supports adding redacted screenshots, artifact tables, timelines and investigation notes without exposing sensitive data.' },
      { title: 'Results & Metrics', text: 'The emphasis is on investigation completeness, evidence traceability and a clear reporting structure rather than inflated metrics.' },
      { title: 'Key Learnings', text: 'Timestamp normalization, source validation and chain-of-custody documentation are essential for reliable forensic conclusions.' },
    ],
  },
];

export default function ProjectsSection() {
  const [openProject, setOpenProject] = useState<string | null>(PROJECTS[0].number);

  return (
    <section id="projects" className="relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32" style={{ backgroundColor: '#0C0C0C' }}>
      <FadeIn delay={0} y={40}>
        <p className="uppercase tracking-[0.35em] text-xs text-center mb-5" style={{ color: '#00FF41', opacity: 0.8 }}>Security Case Studies</p>
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-8 sm:mb-12" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
          Selected Work
        </h2>
        <p className="max-w-3xl mx-auto text-center font-light leading-relaxed mb-14" style={{ color: '#D7E2EA', opacity: 0.62 }}>
          Every project is presented as a professional security case study with investigation context, methodology, evidence and lessons learned.
        </p>
      </FadeIn>

      <div className="max-w-6xl mx-auto space-y-5">
        {PROJECTS.map((project, index) => {
          const isOpen = openProject === project.number;
          return (
            <FadeIn key={project.number} delay={0.08 * index}>
              <article className="rounded-3xl border border-[#D7E2EA]/15 overflow-hidden" style={{ backgroundColor: '#080808' }}>
                <div className="grid lg:grid-cols-[auto_1fr_auto] gap-5 lg:gap-8 p-6 sm:p-8 items-start">
                  <div className="hero-heading font-black leading-none text-5xl sm:text-6xl">{project.number}</div>
                  <div>
                    <p className="uppercase tracking-widest text-[0.65rem] mb-3" style={{ color: '#00FF41', opacity: 0.85 }}>{project.category}</p>
                    <h3 className="font-medium leading-tight" style={{ color: '#D7E2EA', fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}>{project.name}</h3>
                    <p className="mt-4 font-light leading-relaxed max-w-3xl" style={{ color: '#D7E2EA', opacity: 0.65 }}>{project.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-[#D7E2EA]/15 px-3 py-1.5 text-xs" style={{ color: '#D7E2EA', opacity: 0.75 }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:pt-1">
                    <ProjectButton
                      label={isOpen ? 'Close Case Study' : 'View Case Study'}
                      onClick={() => setOpenProject(isOpen ? null : project.number)}
                    />
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-[#D7E2EA]/10 px-6 sm:px-8 pb-8 pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {project.sections.map((section) => (
                        <div key={section.title} className="rounded-2xl border border-[#D7E2EA]/10 p-5">
                          <h4 className="font-medium text-base mb-2" style={{ color: '#D7E2EA' }}>{section.title}</h4>
                          <p className="font-light text-sm leading-relaxed" style={{ color: '#D7E2EA', opacity: 0.62 }}>{section.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href="#contact" className="text-sm uppercase tracking-widest hover:text-[#00FF41] transition-colors" style={{ color: '#D7E2EA', opacity: 0.8 }}>Request Documentation →</a>
                      <a href="#contact" className="text-sm uppercase tracking-widest hover:text-[#00FF41] transition-colors" style={{ color: '#D7E2EA', opacity: 0.8 }}>GitHub / Evidence →</a>
                    </div>
                  </div>
                )}
              </article>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
