import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    number: '01',
    name: 'Product Design',
    description:
      'Designing digital products from early concepts to polished interfaces, balancing user needs, business goals, and visual quality.',
  },
  {
    number: '02',
    name: 'UX/UI Design',
    description:
      'Creating intuitive user journeys, wireframes, design systems, responsive interfaces, and high-fidelity digital experiences.',
  },
  {
    number: '03',
    name: 'AI & Digital Products',
    description:
      'Designing experiences around AI-powered products, intelligent workflows, automation, and emerging technologies.',
  },
  {
    number: '04',
    name: 'Interactive Web Experiences',
    description:
      'Creating immersive websites that combine strong visual direction, motion, storytelling, interaction, and modern technology.',
  },
  {
    number: '05',
    name: 'Product Marketing & Strategy',
    description:
      'Connecting product design with positioning, user needs, market understanding, marketing, and business objectives.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div
              className="flex items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
              }}
            >
              <span
                className="font-black leading-none flex-shrink-0"
                style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="pt-2 sm:pt-3 md:pt-4 flex flex-col gap-2 sm:gap-3">
                <h3
                  className="font-medium uppercase"
                  style={{ color: '#0C0C0C', fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: '#0C0C0C',
                    opacity: 0.6,
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
