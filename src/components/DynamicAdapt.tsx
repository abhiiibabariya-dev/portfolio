import { useEffect, useRef } from 'react';

interface DynamicAdaptProps {
  children: React.ReactNode;
}

interface DynamicItemProps {
  children: React.ReactNode;
  className?: string;
  /** Selector for destination element (e.g., ".sidebar", "#main-content") */
  destination: string;
  /** Breakpoint in pixels (e.g., 768) */
  breakpoint?: number;
  /** Place in destination: 'first', 'last', or index number */
  place?: 'first' | 'last' | number;
  /** Selector for parent to find destination (optional) */
  destinationParent?: string;
}

interface DynamicObject {
  element: HTMLElement;
  parent: Node | null;
  destinationParent: Document | Element;
  destination: HTMLElement | null;
  breakpoint: number;
  place: 'first' | 'last' | number;
  index: number;
}

export function DynamicAdapt({ children }: DynamicAdaptProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const nodes = Array.from(container.querySelectorAll('[data-dynamic]')) as HTMLElement[];

    if (!nodes.length) return;

    const objects: DynamicObject[] = nodes.map((node) => {
      const data = node.dataset.dynamic || '';
      const dataArray = data.split(',').map((s) => s.trim());

      const destinationSelector = dataArray[0];
      const destinationParentSelector = dataArray[3];
      let destinationElement: HTMLElement | null = null;
      let destinationParentElement: Document | Element = document;

      if (destinationSelector) {
        if (destinationParentSelector) {
          const parent = node.closest(destinationParentSelector) || document;
          destinationParentElement = parent;
          const dest = parent.querySelector(destinationSelector);
          destinationElement = dest as HTMLElement | null;
        } else {
          const dest = document.querySelector(destinationSelector);
          destinationElement = dest as HTMLElement | null;
        }
      }

      return {
        element: node,
        parent: node.parentNode,
        destinationParent: destinationParentElement,
        destination: destinationElement,
        breakpoint: dataArray[1] ? parseInt(dataArray[1], 10) : 768,
        place: dataArray[2] ? (dataArray[2] === 'first' || dataArray[2] === 'last' ? dataArray[2] : parseInt(dataArray[2], 10)) : 'last',
        index: Array.from((node.parentNode as HTMLElement).children).indexOf(node),
      };
    });

    // Sort by breakpoint descending (max-width first)
    objects.sort((a, b) => b.breakpoint - a.breakpoint);

    // Create media queries
    const mediaQueries = objects
      .map(({ breakpoint }) => `(${breakpoint / 16}em),${breakpoint}`)
      .filter((item, index, self) => self.indexOf(item) === index);

    const handlers: Array<{ mql: MediaQueryList; handler: (e: MediaQueryListEvent) => void }> = [];

    const mediaHandler = (matchMedia: MediaQueryList, filteredObjects: typeof objects) => {
      if (matchMedia.matches) {
        filteredObjects.forEach((object) => {
          if (object.destination) {
            moveTo(object.place, object.element, object.destination);
          }
        });
      } else {
        filteredObjects.forEach(({ parent, element, index }) => {
          if (element.classList.contains('--dynamic')) {
            moveBack(parent as HTMLElement, element, index);
          }
        });
      }
    };

    const moveTo = (place: 'first' | 'last' | number, element: HTMLElement, destination: HTMLElement) => {
      element.classList.add('--dynamic');

      let index = place === 'last' || place === 'first' ? place : place;

      if (index === 'last' || (typeof index === 'number' && index >= destination.children.length)) {
        destination.append(element);
      } else if (index === 'first') {
        destination.prepend(element);
      } else if (typeof index === 'number') {
        destination.children[index].before(element);
      }
    };

    const moveBack = (parent: HTMLElement, element: HTMLElement, index: number) => {
      element.classList.remove('--dynamic');
      if (parent.children[index] !== undefined) {
        parent.children[index].before(element);
      } else {
        parent.append(element);
      }
    };

    mediaQueries.forEach((media) => {
      const [query, breakpointStr] = media.split(',');
      const breakpoint = parseInt(breakpointStr, 10);
      const matchMedia = window.matchMedia(query);

      const filteredObjects = objects.filter((obj) => obj.breakpoint === breakpoint);

      const handler = () => mediaHandler(matchMedia, filteredObjects);
      matchMedia.addEventListener('change', handler);
      handler(); // Initial check

      handlers.push({ mql: matchMedia, handler });
    });

    return () => {
      handlers.forEach(({ mql, handler }) => {
        mql.removeEventListener('change', handler);
      });
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

export function DynamicItem({
  children,
  className = '',
  destination,
  breakpoint = 768,
  place = 'last',
  destinationParent,
}: DynamicItemProps) {
  const dataValue = [
    destination,
    String(breakpoint),
    place === 'first' || place === 'last' ? place : String(place),
    destinationParent || '',
  ].join(',');

  return (
    <div className={className} data-dynamic={dataValue}>
      {children}
    </div>
  );
}