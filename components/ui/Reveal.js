'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Wraps children and fades/slides them into view once they scroll into the viewport.
 * Purely presentational — does not alter layout, content or functionality of children.
 */
export default function Reveal({ children, className = '', delay = 0, y = 18, once = true }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return setShown(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.unobserve(el);
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(.22,.61,.36,1)',
        transitionDelay: `${delay}ms`,
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}