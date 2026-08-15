import FadeIn from '../components/FadeIn';

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {/* Experience entry */}
        <FadeIn delay={0.1}>
          <div
            className="py-8 sm:py-10 md:py-12"
            style={{
              borderTop: '1px solid rgba(215, 226, 234, 0.15)',
              borderBottom: '1px solid rgba(215, 226, 234, 0.15)',
            }}
          >
            <p
              className="font-light uppercase tracking-widest text-xs sm:text-sm"
              style={{ color: '#D7E2EA', opacity: 0.6 }}
            >
              Product Designer / Product Marketing &amp; UX Consultant
            </p>
            <h3
              className="font-medium uppercase mt-2 sm:mt-3"
              style={{ color: '#D7E2EA', fontSize: 'clamp(1.4rem, 3.2vw, 2.6rem)' }}
            >
              Heeding Climate Solutions
            </h3>
            <p
              className="font-light leading-relaxed max-w-2xl mt-3 sm:mt-4"
              style={{ color: '#D7E2EA', opacity: 0.6, fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
            >
              Designing and shaping digital experiences for a climate-tech platform focused on
              sustainable fuels, marketplace workflows, supply-chain visibility, and CO&#8322;
              reduction.
            </p>
            <p
              className="uppercase tracking-widest mt-5 sm:mt-6 text-[0.65rem] sm:text-xs leading-relaxed"
              style={{ color: '#D7E2EA', opacity: 0.45 }}
            >
              Product Design &middot; UX/UI &middot; Product Marketing &middot; Marketplace Design
              &middot; Supply Chain &middot; Climate-Tech &middot; Data Visualization &middot;
              Product Strategy
            </p>
          </div>
        </FadeIn>

        {/* Education — intentionally secondary */}
        <FadeIn delay={0.2}>
          <div
            className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-6"
            style={{ borderBottom: '1px solid rgba(215, 226, 234, 0.15)' }}
          >
            <div>
              <p
                className="uppercase tracking-widest text-[0.65rem] sm:text-xs"
                style={{ color: '#D7E2EA', opacity: 0.4 }}
              >
                Education
              </p>
              <p
                className="font-medium uppercase mt-1 text-sm sm:text-base"
                style={{ color: '#D7E2EA', opacity: 0.85 }}
              >
                Montpellier Business School
              </p>
            </div>
            <p className="font-light text-xs sm:text-sm" style={{ color: '#D7E2EA', opacity: 0.5 }}>
              Master of Science &mdash; International Business &middot; Supply Chain Management
              &middot; France
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
