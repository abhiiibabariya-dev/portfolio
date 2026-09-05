import { useEffect, useRef, useState } from 'react';

interface MarqueeItem {
  src: string;
  alt: string;
  href?: string;
}

interface EnhancedMarqueeProps {
  items: MarqueeItem[];
  className?: string;
  speed?: number; // pixels per second
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  gap?: number;
  itemWidth?: number;
  itemHeight?: number;
  borderRadius?: string;
}

export default function EnhancedMarquee({
  items,
  className = '',
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  gap = 24,
  itemWidth = 420,
  itemHeight = 270,
  borderRadius = '24px',
}: EnhancedMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [animationId, setAnimationId] = useState<number | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    // Create tripled items for seamless looping
    const createTrack = () => {
      track.innerHTML = '';
      const tripledItems = [...items, ...items, ...items];

      tripledItems.forEach((item) => {
        const link = item.href ? document.createElement('a') : document.createElement('div');
        if (item.href) {
          (link as HTMLAnchorElement).href = item.href;
        }
        link.className = 'flex-shrink-0';
        link.style.width = `${itemWidth}px`;
        link.style.height = `${itemHeight}px`;

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.loading = 'lazy';
        img.className = `w-full h-full object-cover rounded-[${borderRadius}] flex-shrink-0`;
        img.style.width = `${itemWidth}px`;
        img.style.height = `${itemHeight}px`;

        link.appendChild(img);
        track.appendChild(link);
      });
    };

    createTrack();

    // Wait for layout to calculate width
    requestAnimationFrame(() => {
      const firstItem = track.children[0] as HTMLElement;
      if (firstItem) {
        const itemStyle = getComputedStyle(firstItem);
        const itemMargin = parseFloat(itemStyle.marginRight) || 0;
        const singleItemWidth = itemWidth + gap + itemMargin;
        const totalWidth = singleItemWidth * items.length;
        setTrackWidth(totalWidth);
      }
    });

    let lastTime = 0;
    let currentPosition = 0;

    const animate = (timestamp: number) => {
      if (!isPaused) {
        const deltaTime = (timestamp - lastTime) / 1000; // seconds
        lastTime = timestamp;

        const distance = speed * deltaTime;
        currentPosition += direction === 'left' ? distance : -distance;

        // Reset when we've scrolled one full set
        if (direction === 'left' && currentPosition >= trackWidth) {
          currentPosition -= trackWidth;
        } else if (direction === 'right' && Math.abs(currentPosition) >= trackWidth) {
          currentPosition += trackWidth;
        }

        track.style.transform = `translateX(${currentPosition}px)`;
      } else {
        lastTime = timestamp;
      }

      const id = requestAnimationFrame(animate);
      setAnimationId(id);
    };

    const id = requestAnimationFrame(animate);
    setAnimationId(id);

    // Pause on hover
    if (pauseOnHover && wrapper) {
      wrapper.addEventListener('mouseenter', () => setIsPaused(true));
      wrapper.addEventListener('mouseleave', () => setIsPaused(false));
    }

    // Handle resize
    const handleResize = () => {
      const firstItem = track.children[0] as HTMLElement;
      if (firstItem) {
        const itemStyle = getComputedStyle(firstItem);
        const itemMargin = parseFloat(itemStyle.marginRight) || 0;
        const singleItemWidth = itemWidth + gap + itemMargin;
        const totalWidth = singleItemWidth * items.length;
        setTrackWidth(totalWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (wrapper) {
        wrapper.removeEventListener('mouseenter', () => setIsPaused(true));
        wrapper.removeEventListener('mouseleave', () => setIsPaused(false));
      }
    };
  }, [items, speed, direction, pauseOnHover, gap, itemWidth, itemHeight, borderRadius, isPaused]);

  return (
    <div
      ref={wrapperRef}
      className={`overflow-hidden ${className}`}
      style={{ width: '100%' }}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{
          willChange: 'transform',
          display: 'flex',
          gap: `${gap}px`,
        }}
      />
    </div>
  );
}