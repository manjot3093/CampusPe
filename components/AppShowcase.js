'use client';
import { useEffect, useRef, useState } from 'react';
import { PHONES } from './data';
import Reveal from './ui/Reveal';

const POS = {
  '-2': { s: 0.67, x: -178, z: 1 },
  '-1': { s: 0.79, x: -95, z: 2 },
  0: { s: 1, x: 0, z: 3 },
  1: { s: 0.79, x: 95, z: 2 },
  2: { s: 0.67, x: 178, z: 1 },
};

const BLUR = [0, 1.5, 2.5];
const SCREEN_CLIP = 'inset(1.5% 3.6% 1.7% 3.6% round 11% / 5.2%)';
const PHONE_W = 'clamp(150px, 26vw, 275px)';
const AUTOPLAY_MS = 3000;

export default function AppShowcase() {
  const [active, setActive] = useState(2);
  const touch = useRef(null);
  const go = (i) => setActive(Math.max(0, Math.min(PHONES.length - 1, i)));

  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(active + 1);
    if (e.key === 'ArrowLeft') go(active - 1);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % PHONES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section id="app" className="relative overflow-hidden bg-white pb-16 pt-10">
      <div aria-hidden className="bg-aurora-soft pointer-events-none absolute inset-x-0 top-20 -z-0 mx-auto h-[420px] max-w-[1100px] rounded-full" />

      <div className="container-x relative text-center">
        <Reveal>
          <h2 className="font-display text-[30px] font-bold text-brand sm:text-[36px]">Checkout Our App Interface Look</h2>
          <p className="mx-auto mt-5 max-w-[780px] text-[15px] leading-[22px] text-slate-500 sm:text-[16px]">
            Experience the power of a unified campus ecosystem right in your pocket. <b className="font-semibold text-black">CampusPe</b> offers a tailored interface for every user: students can explore trending courses, colleges can showcase their campus life, and companies can post job vacancies directly to a pool of qualified candidates.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div
            role="group"
            aria-label="App screens carousel"
            tabIndex={0}
            onKeyDown={onKey}
            className="relative mx-auto mt-10 w-full max-w-[1100px] touch-pan-y select-none outline-none"
            style={{ height: `calc(${PHONE_W} * 2.2)` }}
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touch.current == null) return;
              const d = e.changedTouches[0].clientX - touch.current;
              touch.current = null;
              if (Math.abs(d) > 40) go(active + (d < 0 ? 1 : -1));
            }}
          >
            {PHONES.map((src, i) => {
              const off = i - active;
              const dist = Math.abs(off);
              const p = POS[Math.max(-2, Math.min(2, off))];
              const hiddenFar = dist > 2;
              const blur = BLUR[Math.min(dist, 2)];

              return (
                <button
                  key={src}
                  onClick={() => go(i)}
                  aria-label={`Show screen ${i + 1}`}
                  aria-current={off === 0}
                  className={`group absolute left-1/2 top-1/2 origin-center rounded-[2rem] transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform focus-visible:ring-2 focus-visible:ring-brand hover:[--hoverY:-10px] hover:[--hoverS:1.05] focus-visible:[--hoverY:-10px] focus-visible:[--hoverS:1.05] active:[--hoverS:0.97] ${
                    dist === 2 ? 'max-xl:hidden' : ''
                  } ${hiddenFar ? 'pointer-events-none opacity-0' : ''}`}
                  style={{
                    width: PHONE_W,
                    // base carousel position/scale composed with hover-only CSS vars
                    // (--hoverY / --hoverS), which the Tailwind classes above set on
                    // hover/focus — gives each phone a real "lift + zoom" on hover
                    // instead of the previous static, non-interactive state.
                    transform: `translate(-50%,-50%) translateX(${p.x}%) scale(${p.s}) translateY(var(--hoverY,0px)) scale(var(--hoverS,1))`,
                    zIndex: p.z,
                    opacity: hiddenFar ? 0 : dist === 2 ? 0.9 : 1,
                    '--b': `${blur}px`,
                  }}
                >
                  <img
                    src={src}
                    alt={`CampusPe app screen ${i + 1}`}
                    draggable={false}
                    className="block w-full drop-shadow-[0_20px_30px_rgba(15,23,42,.25)]"
                  />
                  <img
                    src={src}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="pointer-events-none absolute inset-0 block h-full w-full transition-[filter,opacity] duration-500 ease-out will-change-[filter] group-hover:[--b:0.6px]"
                    style={{
                      clipPath: SCREEN_CLIP,
                      WebkitClipPath: SCREEN_CLIP,
                      filter: 'blur(var(--b))',
                      opacity: dist === 0 ? 0 : 1,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-2 flex items-center justify-center gap-1" role="tablist" aria-label="App screens">
          {PHONES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to screen ${i + 1}`}
              onClick={() => setActive(i)}
              className="group grid place-items-center p-1.5"
            >
              <span
                className={`block rounded-full bg-[#0A6FE0] transition-all duration-300 group-hover:scale-125 group-active:scale-90 ${
                  i === active ? 'h-[18px] w-[18px]' : 'h-[14px] w-[14px] opacity-70'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}