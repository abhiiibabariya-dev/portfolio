import { useState, type ReactNode } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, ShieldCheck, FileText, Menu, X, Phone, ExternalLink } from 'lucide-react';

type Project = {
  id:string; number:string; category:string; type:string; title:string; summary:string; stack:string[];
  github:string; problem:string[]; architecture:string[]; workflow:string[]; mitre:string[]; code:string; learnings:string[];
};

const projects:Project[]=[
  {id:'blueshell',number:'01',category:'Threat Intelligence',type:'Open-Source Project',title:'BlueShell',summary:'Threat intelligence and blue-team operations platform with detection content, automation utilities and security operations resources.',stack:['Python','MITRE ATT&CK','SIEM','SOAR','Detection Rules'],github:'https://github.com/abhiiibabariya-dev/threat-intelligence-blueteam',problem:['Centralize blue-team detection and operational resources.','Support repeatable threat-intelligence enrichment workflows.','Document multi-platform security content as open-source project work.'],architecture:['OSINT Feeds','IOC Processing','Rule Generation','Blue Team Content'],workflow:['IOC collection','Normalization','Rule or content generation','Analyst review and validation'],mitre:['Repository documents MITRE-mapped detection content.','Coverage and tuning require validation in the target platform.'],code:'python tools/threat-intel-fetcher.py --all --format json\npython tools/siem-rule-generator.py --input output/threat_intel.json --platforms all',learnings:['Threat intelligence is most useful when enrichment and validation are documented.','Detection content requires platform-specific testing and tuning.']},
  {id:'cybernest',number:'02',category:'Security Platform',type:'Open-Source / Self-Hosted',title:'CyberNest',summary:'Self-hosted SIEM and SOAR platform project combining telemetry collection, detection, alerting, case management and automation.',stack:['Python','FastAPI','React','TypeScript','Kafka','Elasticsearch','Docker'],github:'https://github.com/abhiiibabariya-dev/CyberNest',problem:['Explore a self-hosted architecture for centralized security telemetry.','Connect collection, correlation, alert lifecycle and response concepts.','Keep the platform positioned as project work, not client production infrastructure.'],architecture:['Endpoint / Syslog','Parser & Enrichment','Correlation','Alert & SOAR'],workflow:['Telemetry ingestion','Parsing and enrichment','Detection and correlation','Alert lifecycle','Case or response workflow'],mitre:['Repository documents Windows, Linux, network and cloud detection areas.','Production coverage should be independently tested and validated.'],code:'bash scripts/setup.sh\n# or\ndocker-compose up -d',learnings:['Reliable telemetry pipelines are the foundation of security platforms.','Detection and response services need clear lifecycle boundaries.']},
  {id:'sigma',number:'03',category:'Detection Engineering',type:'Detection Engineering Project',title:'Sigma Rule Converter',summary:'CLI utility that converts Sigma detection rules into query languages for multiple SIEM backends.',stack:['Python','Sigma','Splunk SPL','KQL','EQL','AQL','YARA-L'],github:'https://github.com/abhiiibabariya-dev/sigma-rule-converter',problem:['Detection logic often needs translation across SIEM platforms.','Preserve detection intent and MITRE metadata while targeting backend languages.'],architecture:['Sigma YAML','Parser','Backend Mapping','SIEM Query'],workflow:['Load Sigma rule','Parse conditions and modifiers','Map backend fields','Generate target query','Validate with tests'],mitre:['MITRE ATT&CK tags are preserved in supported output metadata.','Example repository rules include credential-access mappings.'],code:'python -m sigma_converter.cli rules/examples/proc_creation_win_mimikatz.yml -t splunk',learnings:['Detection portability still requires field and schema validation.','Generated detections must be tested in the destination SIEM.']},
  {id:'ioc',number:'04',category:'Threat Intelligence',type:'Personal SOC Tool',title:'IOC Scanner',summary:'Python CLI for extracting, classifying and enriching IOCs from reports, logs and threat-intelligence text.',stack:['Python','VirusTotal','AbuseIPDB','OTX'],github:'https://github.com/abhiiibabariya-dev/ioc-scanner',problem:['Indicators arrive in mixed and defanged formats.','Threat-intelligence enrichment needs repeatable classification and reporting.'],architecture:['Reports / Logs','IOC Extraction','Classification','Threat Intel Enrichment'],workflow:['Extract indicators','Normalize and classify','Query configured feeds','Generate report'],mitre:['MITRE mapping is not the primary focus of this repository.'],code:'python -m ioc_scanner.cli extract "Suspicious IP 185.220.101[.]34"',learnings:['IOC quality and context matter as much as feed reputation.','API-backed enrichment requires secure key handling and rate-limit awareness.']},
  {id:'phishing',number:'05',category:'Detection Engineering',type:'Personal SOC Tool',title:'Phishing Email Analyzer',summary:'CLI analysis utility for suspicious .eml files, phishing indicators, IOC extraction, scoring and structured reports.',stack:['Python','SPF','DKIM','DMARC','Email Headers','IOC Extraction'],github:'https://github.com/abhiiibabariya-dev/phishing-analyzer',problem:['Email triage requires consistent checks across headers, authentication, URLs and attachments.','Analysts need structured findings without replacing human review.'],architecture:['.eml Input','Parser','Indicator Checks','IOC Extraction'],workflow:['Parse message','Check authentication','Inspect sender and headers','Analyze URLs and attachments','Generate verdict and report'],mitre:['Repository focuses on phishing analysis rather than complete ATT&CK coverage.'],code:'python -m phishing_analyzer.cli samples/sample_phishing.eml --iocs-only',learnings:['Authentication failures are indicators, not standalone proof.','Automated verdicts should support analyst investigation and escalation.']},
  {id:'soc',number:'06',category:'Automation',type:'Personal SOC Tool',title:'SOC Automation Toolkit',summary:'Python toolkit for repetitive SOC workflows including log parsing, alert triage, hash checking and network analysis.',stack:['Python','Log Analysis','Alert Triage','Hashing','Network Analysis'],github:'https://github.com/abhiiibabariya-dev/soc-automation-toolkit',problem:['Repeated SOC tasks slow investigations and can create inconsistent handling.','Provide focused modules for common analyst workflows.'],architecture:['Security Logs','Parser','Analysis Modules','Analyst Output'],workflow:['Ingest data','Parse and normalize','Prioritize or analyze','Generate actionable output','Analyst validation'],mitre:['Alert triage examples include ATT&CK tactics and techniques where relevant.'],code:'python -m soc_toolkit.cli triage samples/sample_alerts.json',learnings:['Automation should reduce repetitive work, not remove analyst accountability.','Detection context improves prioritization more than severity labels alone.']},
  {id:'crowdstrike',number:'07',category:'Security Platform',type:'Presentation / POC Project',title:'CrowdStrike Falcon EDR POC Command Center',summary:'Interactive presentation toolkit for demonstrating Falcon EDR capabilities and endpoint response scenarios.',stack:['HTML','CSS','JavaScript','EDR'],github:'https://github.com/abhiiibabariya-dev/crowdstrike-poc',problem:['Security product demonstrations need a structured stakeholder-friendly flow.','Translate endpoint detection and response concepts into an interactive presentation.'],architecture:['POC Scenario','Interactive UI','Capability Walkthrough','Stakeholder Review'],workflow:['Select scenario','Review endpoint detection flow','Walk through response capability','Discuss evaluation outcomes'],mitre:['Repository does not claim formal ATT&CK coverage.'],code:'open index.html',learnings:['Security capability demonstrations should distinguish features from verified outcomes.']}
];

const skills=[
  ['Security Operations',['Security Monitoring','Alert Triage','Incident Workflows','RCA Documentation','SOC Playbooks','SOPs']],
  ['DFIR & Forensics',['FTK Imager','Autopsy','Volatility','Evidence Preservation','Timeline Analysis','Chain of Custody']],
  ['SIEM & Detection',['FortiSIEM','Wazuh','Splunk','Correlation Rules','Custom Decoders','Detection Tuning','Sigma']],
  ['Endpoint & Windows',['CrowdStrike Falcon','Sysmon','Windows Event Logs','Active Directory','Group Policy','Sysinternals']],
  ['Threat Analysis',['MITRE ATT&CK','IOC Extraction','VirusTotal','Hybrid Analysis','ANY.RUN','Joe Sandbox','YARA']],
  ['Network Security',['Wireshark','TCPDump','Nmap','Snort','Firewall','VPN','ACL','VLAN']],
  ['Automation & Scripting',['Python','PowerShell','Bash','API Integration','Security Automation','n8n / SOAR Context']],
  ['Cloud & Collaboration',['Microsoft 365 Security','GSuite Security','Cloud Log Monitoring','SaaS Security Monitoring']],
  ['Frameworks',['NIST CSF','ISO 27001','Cyber Kill Chain','OWASP Top 10','PICERL']]
];

function SectionTitle({index,kicker,children}:{index:string;kicker:string;children:ReactNode}){return <div className="section-title"><p>{index} / {kicker}</p><h2>{children}</h2></div>}
function Badge({children}:{children:ReactNode}){return <span className="badge">{children}</span>}

export default function App(){
  const [menu,setMenu]=useState(false); const [filter,setFilter]=useState('All'); const [selected,setSelected]=useState<Project|null>(null);
  const filtered=filter==='All'?projects:projects.filter(p=>p.category===filter);
  const categories=['All',...Array.from(new Set(projects.map(p=>p.category)))];
  const go=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)};

  return <div className="app-shell">
    <header className="nav-wrap">
      <nav className="navbar">
        <button className="brand" onClick={()=>go('home')} aria-label="Go to home"><span className="brand-box">AB</span><span><b>ABHISHEK BABARIYA</b><small>CYBERSECURITY PORTFOLIO</small></span></button>
        <button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation" aria-expanded={menu}>{menu?<X/>:<Menu/>}</button>
        <div className={menu?'nav-links open':'nav-links'}>
          {['home','about','experience','projects','skills','certifications','resume','contact'].map(id=><button key={id} onClick={()=>go(id)}>{id==='certifications'?'Credentials':id[0].toUpperCase()+id.slice(1)}</button>)}
          <button className="resume-nav" onClick={()=>go('resume')}>Resume ↗</button>
        </div>
      </nav>
    </header>

    <main>
      <section id="home" className="hero container">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot"/> CURRENT FOCUS · DFIR & RISK ANALYSIS</p>
          <p className="intro">Hello, I'm</p>
          <h1>Abhishek<br/><span>Babariya</span></h1>
          <p className="role">Deputy Manager 2 · DFIR & Risk Analyst</p>
          <p className="summary">Cybersecurity professional working across security operations, incident response, digital forensics, threat detection and security engineering. My background combines enterprise telemetry, SIEM operations, endpoint investigation and forensic analysis.</p>
          <div className="badges"><Badge>SOC</Badge><Badge>DFIR</Badge><Badge>Incident Response</Badge><Badge>Detection Engineering</Badge><Badge>SIEM</Badge><Badge>Threat Hunting</Badge></div>
          <div className="actions">
            <button className="btn primary" onClick={()=>go('projects')}>Explore Projects</button>
            <button className="btn" onClick={()=>go('experience')}>View Experience</button>
            <a className="btn icon" href="https://github.com/abhiiibabariya-dev" target="_blank" rel="noreferrer"><Github/>GitHub</a>
            <a className="btn icon" href="https://www.linkedin.com/in/babariya-abhishek-0085691b4/" target="_blank" rel="noreferrer"><Linkedin/>LinkedIn</a>
          </div>
        </div>
        <div className="hero-art" aria-label="Professional profile">
          <div className="cyber-grid"/>
          <div className="portrait"><img src="https://raw.githubusercontent.com/abhiiibabariya-dev/portfolio/legacy-portfolio-backup-2026-09-07/public/images/hero/portrait.webp" alt="Professional portrait of Abhishek Babariya" onError={(e)=>{e.currentTarget.style.display="none"}}/></div>
          <div className="signal-card"><span>PROFESSIONAL DOMAIN</span><b>DFIR · SOC · Detection</b><small>Evidence → Analysis → Response</small></div>
        </div>
      </section>

      <section className="metrics container">
        <article><b>100+</b><span>Daily security alerts handled in prior SOC operations</span></article>
        <article><b>9.00</b><span>M.Sc. CGPA in Digital Forensics & Information Security</span></article>
        <article><b>80%</b><span>Manual triage reduction documented for a SOC automation project</span></article>
        <article><b>200+</b><span>Network endpoints supported in prior infrastructure work</span></article>
      </section>

      <section id="about" className="container section">
        <SectionTitle index="01" kicker="PROFESSIONAL OVERVIEW">Security work built around <em>telemetry, evidence and response.</em></SectionTitle>
        <div className="about-grid">
          <article className="copy-panel"><p>My professional path moved from enterprise networking into SOC operations and then toward DFIR and risk analysis. That progression shaped a practical approach to security: understand the environment, collect the right telemetry, validate evidence and document decisions clearly.</p><p>My hands-on work includes SIEM onboarding and troubleshooting, endpoint and Windows telemetry investigation, phishing and malware analysis, Active Directory monitoring, detection tuning, forensic acquisition and security documentation.</p></article>
          <div className="strength-grid">
            {[['01','Investigate','Windows, Active Directory, endpoint, email and network evidence.'],['02','Detect','Log sources, correlation logic, Sigma concepts and rule validation.'],['03','Respond','Incident triage, containment support, RCA and forensic reporting.'],['04','Document','Playbooks, SOPs, investigation timelines and evidence-based findings.']].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}
          </div>
        </div>
      </section>

      <section id="experience" className="container section">
        <SectionTitle index="02" kicker="EXPERIENCE">Professional progression across <em>security operations and infrastructure.</em></SectionTitle>
        <div className="timeline">
          <Experience date="Current" current company="ICICI Bank" title="Deputy Manager 2" subtitle="DFIR & Risk Analyst" label="CURRENT ROLE" bullets={['Current professional role focused on DFIR and risk analysis. Public portfolio details are intentionally limited to the role information provided.']} tech={['DFIR','Risk Analysis','Incident Response','Security Analysis']}/>
          <Experience date="Jan 2025 – 2026" company="TechOwl" title="SOC Analyst" subtitle="Security Operations & SIEM Engineering" label="PROFESSIONAL" bullets={['Led enterprise SIEM onboarding, log-source identification and integration planning across firewalls, servers, endpoints, Active Directory, cloud platforms and security tools.','Monitored and triaged security alerts from CrowdStrike Falcon EDR, Sysmon, Windows Event Logs, NxLog and cloud security telemetry.','Investigated malware and phishing using process analysis, reputation checks, sandboxing, email authentication validation and MITRE ATT&CK mapping.','Troubleshot ingestion, parsing, timestamp and collector issues and supported correlation-rule tuning and false-positive reduction.','Produced SOC playbooks, SOPs and RCA documentation covering timelines, IOCs, attack flow, impact and remediation.']} tech={['FortiSIEM','CrowdStrike','Sysmon','Windows Logs','Active Directory','MITRE ATT&CK']}/>
          <Experience date="2024" company="Macrotech Global" title="Network Engineer" subtitle="Enterprise Network & Security Infrastructure" label="PROFESSIONAL" bullets={['Designed and supported enterprise routing, switching, DNS, proxy and DHCP infrastructure across segmented network environments.','Applied network hardening through ACLs, VLAN segmentation, port security and routing optimization.','Performed packet and traffic analysis using Wireshark, Nmap and baseline monitoring to investigate anomalies.','Supported firewall optimization, VPN configuration, NAC and network device patch management.']} tech={['Cisco','Wireshark','Nmap','VPN','ACL','VLAN']}/>
        </div>
      </section>

      <section id="projects" className="container section">
        <SectionTitle index="03" kicker="SELECTED WORK">Projects built around <em>security operations and automation.</em></SectionTitle>
        <div className="section-row"><div className="filters">{categories.map(c=><button className={filter===c?'active':''} key={c} onClick={()=>setFilter(c)}>{c}</button>)}</div><a className="text-action" href="https://github.com/abhiiibabariya-dev?tab=repositories" target="_blank" rel="noreferrer">View all repositories <ArrowUpRight/></a></div>
        <div className="project-grid">{filtered.map(p=><ProjectCard key={p.id} p={p} onCase={()=>{setSelected(p);setTimeout(()=>go('case-study'),0)}}/>)}</div>
      </section>

      <section id="case-study" className="case-section">
        <div className="container section">
          <SectionTitle index="PROJECT DOCUMENTATION" kicker={selected?selected.type:'CASE STUDY'}>{selected?<>{selected.title}<br/><em>Technical case study.</em></>:<>Select a project to review the <em>technical documentation.</em></>}</SectionTitle>
          {selected?<CaseStudy p={selected}/>:<div className="empty-state">Choose “View Case Study” on a project card. Each project is labeled according to its repository or resume context and personal labs are never presented as client production work.</div>}
        </div>
      </section>

      <section id="skills" className="container section">
        <SectionTitle index="04" kicker="SKILLS & EXPERTISE">Organized by <em>security workflow, not arbitrary percentages.</em></SectionTitle>
        <div className="skill-grid">{skills.map(([title,items])=><article key={title}><h3>{title}</h3><div className="badges">{items.map(x=><Badge key={x}>{x}</Badge>)}</div></article>)}</div>
      </section>

      <section id="certifications" className="container section">
        <SectionTitle index="05" kicker="CREDENTIALS">Academic and professional <em>security foundations.</em></SectionTitle>
        <div className="education-grid">
          <article><span>EDUCATION</span><h3>M.Sc. Digital Forensics & Information Security</h3><p>National Forensic Sciences University (NFSU)</p><b>CGPA 9.00 · 2022–2024</b></article>
          <article><span>EDUCATION</span><h3>B.Sc. Information Technology</h3><p>J.P. Dawar Institute of IT (VNSGU)</p><b>CGPA 6.60 · 2018–2022</b></article>
        </div>
        <div className="cert-grid">{[['Cisco','Cybersecurity Essentials'],['SkillFront','ISO/IEC 27001 Information Security Associate'],['EC-Council','Ethical Hacking Essentials'],['EC-Council','Digital Forensic Essentials'],['C3SA','Certified Cyber Security Analyst (CWL)']].map(([org,name])=><article key={name}><span>{org}</span><b>{name}</b></article>)}</div>
      </section>

      <section id="resume" className="container section">
        <SectionTitle index="06" kicker="ONLINE RESUME">A concise view for <em>recruiters and security leaders.</em></SectionTitle>
        <div className="resume-grid">
          <article><FileText/><h3>Professional Profile</h3><p>Cybersecurity professional with experience in SOC operations, SIEM and log-source integration, endpoint and Windows investigation, phishing and malware analysis, network security and forensic workflows.</p><button className="btn primary" onClick={()=>go('contact')}>Request Resume Copy</button><small>The published PDF can be updated when the current resume file reflecting the latest role is provided.</small></article>
          <article><ShieldCheck/><h3>Core Areas</h3><ul><li>Security Operations & Incident Triage</li><li>Digital Forensics & Evidence Handling</li><li>SIEM Engineering & Detection Tuning</li><li>Threat Detection & Threat Hunting</li><li>Endpoint & Windows Security</li><li>Network Security & Traffic Analysis</li><li>Security Automation & Documentation</li></ul></article>
        </div>
      </section>

      <section id="contact" className="container section contact-section">
        <div><p className="eyebrow">07 / CONTACT</p><h2>Let's discuss<br/><em>security work.</em></h2><p>For professional opportunities, cybersecurity collaboration or technical discussions, reach out through LinkedIn, GitHub or email.</p></div>
        <div className="contact-list">
          <a href="mailto:abhibabariya007@gmail.com"><span>EMAIL</span><Mail/>abhibabariya007@gmail.com<ArrowUpRight/></a>
          <a href="tel:+917096293699"><span>PHONE</span><Phone/>+91 7096293699<ArrowUpRight/></a>
          <a href="https://www.linkedin.com/in/babariya-abhishek-0085691b4/" target="_blank" rel="noreferrer"><span>LINKEDIN</span><Linkedin/>Professional Profile<ArrowUpRight/></a>
          <a href="https://github.com/abhiiibabariya-dev" target="_blank" rel="noreferrer"><span>GITHUB</span><Github/>abhiiibabariya-dev<ArrowUpRight/></a>
        </div>
      </section>
    </main>

    <footer className="container"><div><b>ABHISHEK BABARIYA</b><p>Cybersecurity Operations · DFIR · Incident Response · Threat Detection</p></div><p>© {new Date().getFullYear()} Abhishek Babariya</p></footer>
  </div>
}

function Experience({date,current,company,title,subtitle,label,bullets,tech}:{date:string;current?:boolean;company:string;title:string;subtitle:string;label:string;bullets:string[];tech:string[]}){return <article className={'timeline-item '+(current?'current':'')}><div className="timeline-date">{current&&<span className="status-dot"/>}{date}</div><div className="experience-card"><div className="experience-top"><div><p>{company}</p><h3>{title}</h3><h4>{subtitle}</h4></div><span>{label}</span></div><ul>{bullets.map(b=><li key={b}>{b}</li>)}</ul><div className="badges">{tech.map(t=><Badge key={t}>{t}</Badge>)}</div></div></article>}

function ProjectCard({p,onCase}:{p:Project;onCase:()=>void}){return <article className="project-card"><div><p className="project-meta">PROJECT {p.number}<span>{p.type}</span></p><h3>{p.title}</h3><p>{p.summary}</p><div className="badges">{p.stack.slice(0,5).map(x=><Badge key={x}>{x}</Badge>)}</div></div><div className="project-actions"><button onClick={onCase}>View Case Study →</button><a href={p.github} target="_blank" rel="noreferrer">GitHub <ExternalLink/></a></div></article>}

function CaseStudy({p}:{p:Project}){return <div className="case-doc">
  <article className="case-hero"><p className="eyebrow">PROJECT {p.number} · {p.type.toUpperCase()}</p><h3>{p.title}</h3><p>{p.summary}</p><div className="badges"><Badge>Status: Repository documented</Badge><Badge>Role: Project author / contributor</Badge><Badge>Environment: Project or lab context</Badge>{p.stack.map(x=><Badge key={x}>{x}</Badge>)}</div><a className="text-action" href={p.github} target="_blank" rel="noreferrer">Open GitHub Repository <ArrowUpRight/></a></article>
  <div className="case-grid">
    <article><h3>1. Executive Summary</h3><p>This case study summarizes the repository scope and documents the project as {p.type.toLowerCase()}. It is not presented as client production work.</p><h3>2. Problem Statement</h3><ul>{p.problem.map(x=><li key={x}>{x}</li>)}</ul></article>
    <article><h3>3. Lab / Project Architecture</h3><div className="architecture">{p.architecture.map((x,i)=><div key={x}><span>{i+1}</span>{x}</div>)}</div><h3>4. Investigation / Engineering Workflow</h3><ol>{p.workflow.map(x=><li key={x}>{x}</li>)}</ol></article>
    <article><h3>5. Detection Logic / Implementation</h3><pre><code>{p.code}</code></pre><p>Repository commands and examples are shown only as documented project context. Review and test before use in any environment.</p></article>
    <article><h3>6. MITRE ATT&CK Mapping</h3><ul>{p.mitre.map(x=><li key={x}>{x}</li>)}</ul><a className="text-action" href="https://attack.mitre.org/" target="_blank" rel="noreferrer">Official MITRE ATT&CK <ArrowUpRight/></a><h3>7. Results & Metrics</h3><p>Only repository or resume-supported metrics should be reported. No additional performance claims are added here.</p></article>
    <article><h3>8. Key Learnings</h3><ul>{p.learnings.map(x=><li key={x}>{x}</li>)}</ul></article>
    <article><h3>9. Resources</h3><a className="text-action" href={p.github} target="_blank" rel="noreferrer">GitHub Repository <ArrowUpRight/></a><p>Documentation, screenshots and evidence can be added when verified project artifacts are available.</p></article>
  </div>
</div>}