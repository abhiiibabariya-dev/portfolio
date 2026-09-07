import { useEffect, useState, type ReactNode } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Menu, X, Download, Terminal, ShieldCheck, ExternalLink } from 'lucide-react';

const BASE='/portfolio/';
const portrait=BASE+'images/hero/portrait.webp';

type Page='home'|'about'|'experience'|'projects'|'skills'|'certifications'|'education'|'contact'|'resume';

const projects=[
 {id:'CASE-001',name:'BlueShell',type:'OPEN-SOURCE PROJECT',desc:'Threat intelligence and blue-team operations resources for security monitoring and detection workflows.',tech:['Python','MITRE ATT&CK','SIEM','SOAR'],repo:'https://github.com/abhiiibabariya-dev/threat-intelligence-blueteam'},
 {id:'CASE-002',name:'SOC Automation Home Lab',type:'PERSONAL LAB',desc:'Security automation work focused on repeatable SOC workflows and investigation support.',tech:['n8n','Automation','SOC'],repo:'https://github.com/abhiiibabariya-dev'},
 {id:'CASE-003',name:'CrowdStrike Falcon EDR POC',type:'SECURITY PLATFORM POC',desc:'Endpoint security proof of concept and security operations exploration.',tech:['CrowdStrike','EDR','Endpoint Security'],repo:'https://github.com/abhiiibabariya-dev'}
];

const nav:Page[]=['home','about','experience','projects','skills','certifications','education','contact','resume'];

function App(){
 const [page,setPage]=useState<Page>('home');
 const [intro,setIntro]=useState(true);
 const [menu,setMenu]=useState(false);
 const [terminal,setTerminal]=useState(false);

 useEffect(()=>{const t=setTimeout(()=>setIntro(false),2200);return()=>clearTimeout(t)},[]);
 useEffect(()=>{const hash=location.hash.replace('#/','') as Page;if(nav.includes(hash))setPage(hash)},[]);
 const go=(p:Page)=>{setPage(p);setMenu(false);location.hash='/'+p;window.scrollTo({top:0,behavior:'smooth'})};

 if(intro) return <Intro skip={()=>setIntro(false)}/>;

 return <div className="app-shell">
  <Noise/>
  <header className="topbar">
   <button className="brand" onClick={()=>go('home')} aria-label="Home"><span className="dot"/>ABHI_SEC</button>
   <nav className="desktop-nav">{nav.filter(x=>x!=='home').slice(0,7).map(x=><button key={x} onClick={()=>go(x)} className={page===x?'active':''}>/{x}</button>)}</nav>
   <div className="nav-actions"><a href="https://github.com/abhiiibabariya-dev" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a><button className="menu-btn" onClick={()=>setMenu(true)} aria-label="Open navigation"><Menu/></button></div>
  </header>
  {menu&&<MobileNav page={page} go={go} close={()=>setMenu(false)}/>}
  <main>{page==='home'&&<Home go={go} openTerminal={()=>setTerminal(true)}/>}
  {page==='about'&&<About openTerminal={()=>setTerminal(true)}/>}
  {page==='experience'&&<Experience/>}
  {page==='projects'&&<Projects/>}
  {page==='skills'&&<Skills/>}
  {page==='certifications'&&<Certifications/>}
  {page==='education'&&<Education/>}
  {page==='contact'&&<Contact/>}
  {page==='resume'&&<Resume/>}</main>
  <footer>© 2026 ABHISHEK BABARIYA <span>•</span> CYBERSECURITY PORTFOLIO</footer>
  {terminal&&<TerminalPanel close={()=>setTerminal(false)} go={go}/>}
 </div>
}

function Intro({skip}:{skip:()=>void}){return <div className="intro"><button onClick={skip}>SKIP INTRO</button><div className="intro-copy"><span>INITIALIZING PORTFOLIO</span><span>SYSTEM CHECK <b>PASS</b></span><span>IDENTITY VERIFIED</span><strong>ACCESS GRANTED</strong></div></div>}
function Noise(){return <div className="noise" aria-hidden/>}

function MobileNav({page,go,close}:{page:Page;go:(p:Page)=>void;close:()=>void}){return <div className="mobile-menu"><div><span>ACCESS MENU</span><button onClick={close}><X/></button></div>{nav.map((x,i)=><button key={x} className={page===x?'active':''} onClick={()=>go(x)}><small>{String(i+1).padStart(2,'0')}</small> {x.toUpperCase()}</button>)}</div>}

function Home({go,openTerminal}:{go:(p:Page)=>void;openTerminal:()=>void}){return <>
 <section className="hero">
  <div className="hero-meta left"><span>SYSTEM STATUS</span><b><i/> ONLINE</b></div><div className="hero-meta right"><span>CASE FILE</span><b>ABHI-SEC-2026</b></div>
  <div className="hero-portrait"><div className="portrait-frame"><img src={portrait} alt="Abhishek Babariya"/></div><div className="evidence-line"/></div>
  <div className="hero-content"><p className="eyebrow">IDENTITY VERIFIED / INDIA</p><h1>ABHISHEK<br/><em>BABARIYA</em></h1><div className="hero-roles">CYBERSECURITY OPERATIONS <span>✦</span> DIGITAL FORENSICS <span>✦</span> INCIDENT RESPONSE</div><p className="summary">Cybersecurity professional focused on security operations, DFIR, incident response, detection, monitoring and investigation workflows.</p><div className="hero-buttons"><button className="primary" onClick={()=>go('projects')}>ENTER PORTFOLIO <ArrowRight size={17}/></button><button className="ghost" onClick={()=>go('resume')}>VIEW RESUME</button></div></div>
  <div className="hero-data"><div><small>SPECIALIZATION</small><b>DFIR / SOC</b></div><div><small>FOCUS</small><b>DETECTION + RESPONSE</b></div><button onClick={openTerminal}><Terminal size={15}/> OPEN TERMINAL</button></div>
 </section>
 <section className="quick container"><SectionLabel n="01" title="IDENTITY"/><div className="identity-grid"><h2>INVESTIGATE.<br/>DETECT.<br/><span>RESPOND.</span></h2><div><p>My work sits across security monitoring, digital forensics, incident response and the telemetry that connects them.</p><div className="focus-list">{['DFIR','INCIDENT RESPONSE','SOC MONITORING','THREAT DETECTION','SIEM ENGINEERING','SECURITY AUTOMATION'].map(x=><span key={x}>{x}</span>)}</div></div></div></section>
 <section className="focus-band"><div className="container"><p>ACTIVE FOCUS</p><div>DFIR <span>/</span> INCIDENT RESPONSE <span>/</span> SOC <span>/</span> THREAT DETECTION</div></div></section>
 <section className="container snapshot"><SectionLabel n="02" title="CAREER SNAPSHOT"/><div className="snapshot-grid"><article><small>CURRENT ROLE</small><h3>DEPUTY MANAGER 2</h3><p>DFIR & Risk Analyst</p><b>ICICI BANK</b></article><article><small>PREVIOUS EXPERIENCE</small><h3>SECURITY OPERATIONS</h3><p>Security monitoring, SIEM implementation, integrations and log analysis.</p><b>TECHOWL INFOSEC</b></article></div></section>
 <section className="container featured"><SectionLabel n="03" title="SELECTED CASE FILES"/><div className="case-list">{projects.map(p=><article key={p.id} onClick={()=>go('projects')}><div><small>{p.id}</small><h3>{p.name}</h3><p>{p.type}</p></div><ArrowRight/></article>)}</div></section>
 <section className="contact-cta"><div className="container"><p>SECURE CHANNEL READY</p><h2>LET'S INVESTIGATE<br/><span>WHAT'S NEXT.</span></h2><button className="primary" onClick={()=>go('contact')}>CONTACT ME <ArrowRight size={17}/></button></div></section>
 </>}

function About({openTerminal}:{openTerminal:()=>void}){return <PageHero n="01" title="DIGITAL IDENTITY" subtitle="ABOUT THE INVESTIGATOR"><section className="about-grid container"><div className="about-photo"><img src={portrait} alt="Abhishek Babariya"/></div><div><h2>WHO I AM</h2><p>I work across cybersecurity operations with a focus on understanding security events, collecting evidence, analysing telemetry and supporting investigation and response workflows.</p><p>My experience includes SIEM operations, log integration and analysis, endpoint security and security automation. My current direction is centered on DFIR and risk analysis.</p><div className="method"><span>01 EVIDENCE</span><span>02 TELEMETRY</span><span>03 DETECTION</span><span>04 INVESTIGATION</span><span>05 RESPONSE</span></div><button className="terminal-link" onClick={openTerminal}><Terminal size={16}/> INTERACT WITH TERMINAL</button></div></section></PageHero>}

function Experience(){return <PageHero n="02" title="CAREER TIMELINE" subtitle="SECURITY OPERATIONS TO DFIR"><section className="timeline container"><article><div className="year">2025 → 2026</div><div><small>CURRENT</small><h2>DEPUTY MANAGER 2</h2><h3>DFIR & RISK ANALYST · ICICI BANK</h3><p>Current professional focus in digital forensics, incident response and risk analysis.</p><div className="tags"><span>DFIR</span><span>INCIDENT RESPONSE</span><span>RISK</span></div></div></article><article><div className="year">2025 → 2026</div><div><small>PREVIOUS ROLE</small><h2>SECURITY ANALYST</h2><h3>TECHOWL INFOSEC</h3><p>Worked on SIEM implementation, log forwarding, integrations, detection tuning, analytics and security monitoring workflows.</p><div className="tags"><span>FORTISIEM</span><span>LOG ANALYSIS</span><span>EDR/XDR</span><span>SIEM</span></div></div></article></section></PageHero>}

function Projects(){return <PageHero n="03" title="SECURITY CASE FILES" subtitle="PROJECT ARCHIVE"><section className="project-grid container">{projects.map(p=><article className="case-card" key={p.id}><div className="case-head"><small>{p.id}</small><span>STATUS: ACTIVE</span></div><h2>{p.name}</h2><p className="classification">{p.type}</p><p>{p.desc}</p><div className="tags">{p.tech.map(x=><span key={x}>{x}</span>)}</div><a href={p.repo} target="_blank" rel="noreferrer">OPEN CASE FILE <ArrowRight size={16}/></a></article>)}</section><section className="container architecture"><SectionLabel n="04" title="INVESTIGATION MODEL"/><div className="flow">{['ENDPOINT','TELEMETRY','SIEM','DETECTION','ALERT','INVESTIGATION','RESPONSE'].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span>{x}</div>)}</div></section></PageHero>}

function Skills(){const groups=[['DFIR','Digital Evidence','Artifact Analysis','Incident Response'],['SOC','Security Monitoring','Log Analysis','Alert Triage'],['SIEM','FortiSIEM','FortiCollector','Detection Rules'],['ENDPOINT','CrowdStrike','EDR/XDR','Windows Security'],['AUTOMATION','n8n','SOAR','Workflow Automation'],['SYSTEMS','Windows','Linux','Network Security']];return <PageHero n="04" title="TECHNICAL ARSENAL" subtitle="SKILLS & TECHNOLOGY"><section className="skill-matrix container">{groups.map(([title,...items])=><article key={title}><small>{title}</small>{items.map(x=><span key={x}>{x}<i>↗</i></span>)}</article>)}</section></PageHero>}

function Certifications(){const certs=['Cybersecurity Essentials · Cisco','Digital Forensics · CodeRed','Ethical Hacking Essentials · CodeRed','Introduction to Cybersecurity · Cisco','ISO/IEC 27001 Information Security Associate · SkillFront'];return <PageHero n="05" title="CREDENTIAL VAULT" subtitle="CERTIFICATIONS DATABASE"><section className="vault container"><div className="vault-head"><span>TOTAL RECORDS</span><b>{certs.length}</b><span>VERIFICATION DETAILS FROM SOURCE RECORDS</span></div>{certs.map((x,i)=><article key={x}><small>{String(i+1).padStart(3,'0')}</small><h2>{x}</h2><ShieldCheck/><button>OPEN RECORD <ExternalLink size={14}/></button></article>)}</section></PageHero>}

function Education(){return <PageHero n="06" title="EDUCATION" subtitle="ACADEMIC RECORD"><section className="container todo-record"><p>EDUCATION RECORD</p><h2>Resume-based education details should be rendered here from the latest uploaded CV.</h2><small>TODO: Keep this section synchronized with the current resume source of truth.</small></section></PageHero>}

function Resume(){return <PageHero n="07" title="RESUME ACCESS" subtitle="PROFESSIONAL RECORD"><section className="container resume-access"><h2>VIEW THE COMPLETE PROFESSIONAL RECORD.</h2><p>The resume file should remain in the repository public assets and be linked here using a verified GitHub Pages path.</p><a className="primary" href={BASE+'resume.pdf'} target="_blank" rel="noreferrer"><Download size={17}/> DOWNLOAD PDF</a><p className="todo">TODO: Add the latest resume PDF as <code>public/resume.pdf</code>.</p></section></PageHero>}

function Contact(){return <PageHero n="08" title="SECURE CHANNEL" subtitle="ESTABLISHED"><section className="contact-page container"><h2>LET'S INVESTIGATE<br/><span>WHAT'S NEXT.</span></h2><div className="contact-links"><a href="mailto:TODO"><Mail/> EMAIL <ArrowRight/></a><a href="https://www.linkedin.com/in/babariya-abhishek-0085691b4" target="_blank" rel="noreferrer"><Linkedin/> LINKEDIN <ArrowRight/></a><a href="https://github.com/abhiiibabariya-dev" target="_blank" rel="noreferrer"><Github/> GITHUB <ArrowRight/></a></div><div className="form-todo"><small>CONTACT FORM</small><p>TODO: Connect Formspree or EmailJS before publishing a message form. No fake send button has been added.</p></div></section></PageHero>}

function PageHero({n,title,subtitle,children}:{n:string;title:string;subtitle:string;children:ReactNode}){return <div className="page"><section className="page-title container"><p>{n} / {subtitle}</p><h1>{title}</h1></section>{children}</div>}
function SectionLabel({n,title}:{n:string;title:string}){return <div className="section-label"><span>{n}</span><b>{title}</b><i/></div>}

function TerminalPanel({close,go}:{close:()=>void;go:(p:Page)=>void}){const [out,setOut]=useState('Type help to see available commands.');const [cmd,setCmd]=useState('');const run=()=>{const c=cmd.trim().toLowerCase();const map:Record<string,Page>={about:'about',skills:'skills',experience:'experience',projects:'projects',certifications:'certifications',contact:'contact'};if(c==='help')setOut('help, about, skills, experience, projects, certifications, contact, clear');else if(c==='clear')setOut('');else if(map[c]){setOut('Navigating to /'+c+' ...');setTimeout(()=>{go(map[c]);close()},450)}else setOut('Command not recognized. Type help.');setCmd('')};return <div className="terminal-modal"><div className="terminal-box"><header><span><i/> SECURE INTERACTIVE TERMINAL</span><button onClick={close}><X/></button></header><pre>{out}</pre><div><span>visitor@portfolio:~$</span><input autoFocus value={cmd} onChange={e=>setCmd(e.target.value)} onKeyDown={e=>e.key==='Enter'&&run()}/></div></div></div>}

export default App;