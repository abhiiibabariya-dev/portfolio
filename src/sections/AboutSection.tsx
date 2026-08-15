import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const DECOR_BASE = '/images/decor';

const ABOUT_PARAGRAPHS = [
  'I’m Gireesh, a Product Designer and Product Marketing & UX Consultant focused on creating digital products that are useful, intuitive, visually strong, and aligned with real business goals.',
  'My work sits at the intersection of product design, UX/UI, technology, AI, marketing, and business. I enjoy turning complex ideas into simple and engaging digital experiences — from early product concepts and UX systems to polished interfaces and interactive websites.',
  'I’ve worked across climate-tech, AI, supply chain, digital products, marketing, and interactive web experiences, combining design thinking with technology, data, and automation.',
  'Let’s build something incredible together.',
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      {/* Decorative 3D corner images */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none select-none"
      >
        <img src={`${DECOR_BASE}/moon.png`} alt="" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none select-none"
      >
        <img src={`${DECOR_BASE}/object.png`} alt="" className="w-[100px] sm:w-[140px] md:w-[180px]" />
      </FadeIn>
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none select-none"
      >
        <img src={`${DECOR_BASE}/lego.png`} alt="" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none select-none"
      >
        <img src={`${DECOR_BASE}/group.png`} alt="" className="w-[130px] sm:w-[170px] md:w-[220px]" />
      </FadeIn>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About Me
            </h2>
          </FadeIn>

          <div className="flex flex-col items-center gap-5 sm:gap-6">
            {ABOUT_PARAGRAPHS.map((paragraph, i) => (
              <AnimatedText
                key={i}
                text={paragraph}
                className="font-medium text-center leading-relaxed max-w-[560px]"
                style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
              />
            ))}
          </div>
        </div>

        <FadeIn delay={0.1} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
