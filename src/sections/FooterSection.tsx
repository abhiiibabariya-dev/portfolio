import { ArrowUp } from 'lucide-react';

export default function FooterSection() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-10 py-8 md:py-10"
      style={{ backgroundColor: '#0C0C0C', borderTop: '1px solid rgba(215, 226, 234, 0.12)' }}
    >
      <span
        className="font-black uppercase tracking-wider text-lg md:text-xl"
        style={{ color: '#D7E2EA' }}
      >
        Gireesh
      </span>
      <span
        className="font-light uppercase tracking-widest text-center text-[0.65rem] md:text-xs"
        style={{ color: '#D7E2EA', opacity: 0.55 }}
      >
        Product Design &middot; UX/UI &middot; AI &middot; Digital Experiences
      </span>
      <button
        onClick={scrollToTop}
        className="flex items-center gap-2 font-medium uppercase tracking-widest text-xs md:text-sm hover:opacity-70 transition-opacity duration-200"
        style={{ color: '#D7E2EA' }}
      >
        Back to Top
        <ArrowUp size={16} />
      </button>
    </footer>
  );
}
