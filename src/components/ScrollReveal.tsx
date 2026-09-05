import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  delay = 0,
  direction = 'up',
  distance = 40,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
              if (triggerOnce) {
                setHasAnimated(true);
                observer.unobserve(element);
              }
            }, delay);
          } else if (!triggerOnce && !hasAnimated) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated]);

  const transformStyles = {
    up: `translateY(${isVisible ? 0 : distance}px)`,
    down: `translateY(${isVisible ? 0 : -distance}px)`,
    left: `translateX(${isVisible ? 0 : distance}px)`,
    right: `translateX(${isVisible ? 0 : -distance}px)`,
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: transformStyles[direction],
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}