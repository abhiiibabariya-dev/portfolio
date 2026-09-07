import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

export default function ContactSection() {
  return (
    <section id="contact" className="relative flex flex-col items-center text-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40" style={{backgroundColor:'#050505'}}>
      <FadeIn delay={0} y={40}><p className="uppercase tracking-[0.4em] text-xs md:text-sm mb-5" style={{color:'#00FF41',opacity:.8}}>Open for Security Opportunities</p><h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{fontSize:'clamp(2.6rem,8.5vw,120px)'}}>Let’s Investigate</h2></FadeIn>
      <FadeIn delay={0.1} y={40}><h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{fontSize:'clamp(2.6rem,8.5vw,120px)'}}>Something Together.</h2></FadeIn>
      <FadeIn delay={0.25} y={20}><p className="font-light uppercase tracking-wide leading-snug max-w-2xl mt-8 sm:mt-10" style={{color:'#D7E2EA',opacity:.72,fontSize:'clamp(.85rem,1.6vw,1.2rem)'}}>SOC operations, DFIR, detection engineering, threat hunting and security automation.</p></FadeIn>
      <FadeIn delay={0.4} y={20} className="mt-10 sm:mt-12"><ContactButton label="Get In Touch" href="mailto:abhibabariya007@gmail.com" /></FadeIn>
      <div className="mt-8 flex flex-wrap justify-center gap-5 text-xs uppercase tracking-widest" style={{color:'#D7E2EA',opacity:.5}}><a href="https://github.com/abhiiibabariya-dev" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/babariya-abhishek/" target="_blank" rel="noreferrer">LinkedIn</a></div>
    </section>
  );
}
