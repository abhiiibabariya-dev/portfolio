import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) return;

    const pointerEl = pointerRef.current;
    const shadowEl = shadowRef.current;

    const mouseActions = (e: MouseEvent) => {
      if (e.type === 'mouseout') {
        setIsVisible(false);
      } else if (e.type === 'mousemove') {
        setIsVisible(true);
        if (
          e.target instanceof HTMLElement &&
          (e.target.closest('button') ||
            e.target.closest('a') ||
            e.target.closest('input') ||
            e.target.closest('textarea') ||
            e.target.closest('select') ||
            getComputedStyle(e.target).cursor === 'pointer' ||
            getComputedStyle(e.target).cursor === 'text' ||
            getComputedStyle(e.target).cursor === 'grab')
        ) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      } else if (e.type === 'mousedown') {
        setIsActive(true);
      } else if (e.type === 'mouseup') {
        setIsActive(false);
      }

      if (pointerEl) {
        pointerEl.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
      }
      if (shadowEl) {
        shadowEl.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
      }
    };

    document.addEventListener('mousemove', mouseActions);
    document.addEventListener('mousedown', mouseActions);
    document.addEventListener('mouseup', mouseActions);
    document.addEventListener('mouseout', mouseActions);

    return () => {
      document.removeEventListener('mousemove', mouseActions);
      document.removeEventListener('mousedown', mouseActions);
      document.removeEventListener('mouseup', mouseActions);
      document.removeEventListener('mouseout', mouseActions);
    };
  }, []);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] select-none"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        ref={pointerRef}
        className={`cursor__pointer fixed w-[20px] h-[20px] rounded-full border-2 border-white transition-transform duration-100 ease-out ${
          isHovering ? 'cursor__pointer--hover bg-white scale-150' : 'bg-transparent'
        } ${isActive ? 'cursor__pointer--active scale-75' : ''}`}
        style={{
          transformOrigin: 'center center',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={shadowRef}
        className="cursor__shadow fixed w-[40px] h-[40px] rounded-full bg-white/20 transition-transform duration-300 ease-out"
        style={{
          transformOrigin: 'center center',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}