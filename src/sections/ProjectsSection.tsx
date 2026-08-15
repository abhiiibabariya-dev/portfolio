import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import ProjectButton from '../components/ProjectButton';

interface Project {
  number: string;
  name: string;
  category: string;
  description: string;
  tags: string;
  href: string;
  col1Images: [string, string];
  col2Image: string;
}

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'Heeding Climate Solutions',
    category: 'Client · Climate-Tech',
    description:
      'A digital ecosystem for sustainable fuels, marketplace discovery, supply-chain visibility, and CO₂ reduction.',
    tags: 'Product Design · UX/UI · Climate-Tech · Marketplace · Supply Chain',
    href: '#',
    col1Images: ['/images/projects/heeding-1.webp', '/images/projects/heeding-2.webp'],
    col2Image: '/images/projects/heeding-3.webp',
  },
  {
    number: '02',
    name: 'Lock.AI',
    category: 'Product · AI',
    description:
      'An offline-first AI product concept focused on privacy, local intelligence, and accessible AI experiences where cloud connectivity cannot always be assumed.',
    tags: 'Product Design · AI · UX/UI · Offline AI · Product Strategy',
    href: '#',
    col1Images: ['/images/projects/lockai-1.webp', '/images/projects/lockai-2.webp'],
    col2Image: '/images/projects/lockai-3.webp',
  },
  {
    number: '03',
    name: 'Freight Matrix',
    category: 'Product · Supply Chain',
    description:
      'A real-time freight analysis and price comparison experience designed to simplify complex logistics decisions and make transportation data easier to understand.',
    tags: 'Product Design · Data · Supply Chain · UX/UI · Analytics',
    href: '#',
    col1Images: ['/images/projects/freight-1.webp', '/images/projects/freight-2.webp'],
    col2Image: '/images/projects/freight-3.webp',
  },
];

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    // The sticky element itself is the h-[85vh] flow block, a direct child of the
    // cards container — so each card pins at top-24/32 until the container ends,
    // letting later cards stack over it.
    <div className="sticky top-24 md:top-32 h-[85vh]">
      <motion.div
          className="relative rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8"
          style={{
            scale,
            top: `${index * 28}px`,
            transformOrigin: 'top center',
            backgroundColor: '#0C0C0C',
          }}
        >
          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 px-2 sm:px-4 pb-5 sm:pb-6 md:pb-8">
            <div className="flex items-start gap-4 sm:gap-6 md:gap-10">
              <span
                className="hero-heading font-black leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {project.number}
              </span>
              <div className="pt-1 sm:pt-2 md:pt-3 flex flex-col gap-1.5 sm:gap-2">
                <p
                  className="uppercase tracking-widest text-[0.65rem] sm:text-xs"
                  style={{ color: '#D7E2EA', opacity: 0.6 }}
                >
                  {project.category}
                </p>
                <h3
                  className="font-medium uppercase"
                  style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {project.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-xl"
                  style={{
                    color: '#D7E2EA',
                    opacity: 0.6,
                    fontSize: 'clamp(0.8rem, 1.3vw, 1.05rem)',
                  }}
                >
                  {project.description}
                </p>
                <p
                  className="uppercase tracking-widest text-[0.6rem] sm:text-[0.7rem]"
                  style={{ color: '#D7E2EA', opacity: 0.4 }}
                >
                  {project.tags}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 px-1 pb-1">
              <ProjectButton href={project.href} />
            </div>
          </div>

          {/* Image grid */}
          <div className="flex gap-3 sm:gap-4">
            <div className="w-[40%] flex flex-col gap-3 sm:gap-4">
              <img
                src={project.col1Images[0]}
                alt={`${project.name} visual 1`}
                loading="lazy"
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              />
              <img
                src={project.col1Images[1]}
                alt={`${project.name} visual 2`}
                loading="lazy"
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              />
            </div>
            <div className="w-[60%]">
              <img
                src={project.col2Image}
                alt={`${project.name} visual 3`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              />
            </div>
          </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative z-10 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Selected Work
        </h2>
      </FadeIn>

      <div ref={containerRef} className="relative max-w-7xl mx-auto">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
