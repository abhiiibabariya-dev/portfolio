import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex flex-col items-center text-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 8.5vw, 120px)' }}
        >
          Let&rsquo;s Build Something
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 8.5vw, 120px)' }}
        >
          Incredible Together.
        </h2>
      </FadeIn>

      <FadeIn delay={0.25} y={20}>
        <p
          className="font-light uppercase tracking-wide leading-snug max-w-md sm:max-w-lg mt-8 sm:mt-10"
          style={{ color: '#D7E2EA', opacity: 0.8, fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
        >
          Have an idea, product, website, or digital experience you want to bring to life?
        </p>
      </FadeIn>

      <FadeIn delay={0.4} y={20} className="mt-10 sm:mt-12">
        <ContactButton label="Get In Touch" href="mailto:heeding.ai@gmail.com" />
      </FadeIn>
    </section>
  );
}
