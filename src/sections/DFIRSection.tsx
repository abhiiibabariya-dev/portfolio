import FadeIn from '../components/FadeIn';

const domains = [
  ['01', 'Disk Forensics', 'Forensic imaging, timeline analysis, deleted-file recovery, keyword search and artifact examination using FTK Imager and Autopsy.'],
  ['02', 'Memory Forensics', 'Process analysis, suspicious-memory investigation and malware-oriented triage using Volatility workflows.'],
  ['03', 'Mobile Forensics', 'Logical extraction and artifact analysis covering SMS/MMS, calls, application data, location history and deleted data.'],
  ['04', 'Cloud Forensics', 'Investigation of synchronized cloud data, authentication artifacts, metadata, revision history and deleted cloud items.'],
];

export default function DFIRSection() {
  return (
    <section id="dfir" className="relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32" style={{ backgroundColor: '#050505' }}>
      <FadeIn delay={0} y={40}>
        <p className="uppercase tracking-[0.4em] text-xs md:text-sm text-center mb-5" style={{ color: '#00FF41', opacity: 0.8 }}>Digital Forensics & Incident Response</p>
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-14 md:mb-20" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          DFIR Lab
        </h2>
      </FadeIn>
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto">
        {domains.map(([number, title, description]) => (
          <FadeIn key={number} delay={Number(number) * 0.04} y={30}>
            <article className="h-full rounded-[30px] md:rounded-[40px] border border-[#D7E2EA]/15 p-6 md:p-9 hover:border-[#00FF41]/50 transition-colors duration-300">
              <div className="flex items-start justify-between gap-4">
                <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(2.7rem, 6vw, 6rem)' }}>{number}</span>
                <span className="uppercase tracking-widest text-[0.62rem] mt-2" style={{ color: '#00FF41', opacity: 0.85 }}>Forensic Domain</span>
              </div>
              <h3 className="font-medium uppercase mt-5" style={{ color: '#D7E2EA', fontSize: 'clamp(1.25rem, 2.4vw, 2rem)' }}>{title}</h3>
              <p className="font-light leading-relaxed mt-4" style={{ color: '#D7E2EA', opacity: 0.62, fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>{description}</p>
            </article>
          </FadeIn>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-6 rounded-[30px] md:rounded-[40px] border border-[#D7E2EA]/10 p-6 md:p-9">
        <p className="uppercase tracking-widest text-xs mb-4" style={{ color: '#00FF41', opacity: 0.8 }}>Investigation Discipline</p>
        <p className="font-light leading-relaxed" style={{ color: '#D7E2EA', opacity: 0.68 }}>
          Evidence acquisition → preservation → artifact analysis → timeline reconstruction → IOC extraction → findings → forensic reporting and chain of custody.
        </p>
      </div>
    </section>
  );
}
