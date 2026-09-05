import { useEffect, useRef } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  smooth?: number;
  centerPoint?: 'top' | 'center' | 'bottom';
}

interface ParallaxItemProps {
  children: React.ReactNode;
  className?: string;
  axis?: 'v' | 'h';
  direction?: 1 | -1;
  coefficient?: number;
  additionalProperties?: string;
}

export function ParallaxProvider({
  children,
  className = '',
  smooth = 15,
  centerPoint = 'center',
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll('[data-parallax]')) as HTMLElement[];

    let animationId: number;
    let currentValue = 0;

    const animate = () => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const heightWindow = window.innerHeight;
      const heightParent = container.offsetHeight;
      const topToWindow = rect.top;

      const positionParent = {
        top: topToWindow - heightWindow,
        bottom: topToWindow + heightParent,
      };

      let offset = 0;

      if (positionParent.top < 30 && positionParent.bottom > -30) {
        switch (centerPoint) {
          case 'top':
            offset = -topToWindow;
            break;
          case 'center':
            offset = heightWindow / 2 - (topToWindow + heightParent / 2);
            break;
          case 'bottom':
            offset = heightWindow - (topToWindow + heightParent);
            break;
        }
      }

      currentValue += (offset - currentValue) / smooth;

      items.forEach((el) => {
        const axis = el.dataset.axis || 'v';
        const direction = parseInt(el.dataset.direction || '-1', 10);
        const coefficient = parseFloat(el.dataset.coefficient || '5');
        const additional = el.dataset.additionalProperties || '';

        if (axis === 'v') {
          el.style.transform = `translate3D(0, ${(
            direction * (currentValue / coefficient)
          ).toFixed(2)}px, 0) ${additional}`;
        } else if (axis === 'h') {
          el.style.transform = `translate3D(${(
            direction * (currentValue / coefficient)
          ).toFixed(2)}px, 0, 0) ${additional}`;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [smooth, centerPoint]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      data-parallax-parent
    >
      {children}
    </div>
  );
}

export function ParallaxItem({
  children,
  className = '',
  axis = 'v',
  direction = -1,
  coefficient = 5,
  additionalProperties = '',
}: ParallaxItemProps) {
  return (
    <div
      className={className}
      data-parallax
      data-axis={axis}
      data-direction={direction}
      data-coefficient={coefficient}
      data-additional-properties={additionalProperties}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
}