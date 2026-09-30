'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Button from './ui/Button';
import { NAV_LINKS } from './data';
import { openModal } from './openModal';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef(null);

  /* scroll shadow */
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 8);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  /* publish the real bar height as --nav-h (hero / upload sections use it).
     Measures only the bar, so the open mobile menu never inflates it. */
  useEffect(() => {
    if (!bar.current) return;
    const set = () => document.documentElement.style.setProperty('--nav-h', `${bar.current.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(bar.current);
    return () => ro.disconnect();
  }, []);

  /* close the mobile menu on Escape, and when the screen grows to desktop */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = (e) => e.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, []);

  return (
    <header
      // was mb-3 sm:mb-4 lg:mb-6 — the lg:mb-6 was adding unnecessary extra
      // space on top of Hero's own vertical-centering gap at 1440px.
      // Now a small, consistent gap at every breakpoint.
      className={`sticky top-0 z-50 mb-2 sm:mb-3 transition-all ${
        scrolled || open ? 'bg-white/90 shadow-soft backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div
        ref={bar}
        className="container-x flex h-[64px] items-center justify-between gap-4 sm:h-[72px] md:h-[76px] lg:grid lg:h-[80px] lg:grid-cols-[1fr_auto_1fr]"
      >
        <Link href="/" aria-label="CampusPe home" className="shrink-0 justify-self-start rounded-lg transition hover:opacity-80 active:scale-95">
          <img
            src="/images/logo.png"
            alt="CampusPe – Connecting Students, Institutions & Companies"
            className="h-[38px] w-auto max-w-[60vw] object-contain sm:h-[46px] lg:h-[50px]"
          />
        </Link>

        {/* desktop links — underline-on-hover removed, just a clean color shift now */}
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-10 2xl:gap-12">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="whitespace-nowrap py-1 text-[15px] font-medium text-ink transition-colors duration-200 hover:text-brand xl:text-[16px]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* desktop actions */}
        <div className="hidden items-center justify-end gap-3 lg:flex xl:gap-5">
          <button
            onClick={() => openModal({ type: 'signin' })}
            className="btn-signin whitespace-nowrap px-3 py-1.5 text-[15px] font-medium xl:text-[16px]"
          >
            Sign In
          </button>
          <Button size="nav" className="btn-signup whitespace-nowrap" onClick={() => openModal({ type: 'signup' })}>
            Sign Up
          </Button>
        </div>

        {/* hamburger (below lg) */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg transition hover:bg-slate-100 active:scale-90 lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* mobile / tablet menu */}
      {open && (
        <div
          id="mobile-menu"
          className="container-x max-h-[calc(100svh-var(--nav-h,64px))] animate-fadeUp overflow-y-auto border-t border-slate-100 bg-white pb-5 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center border-b border-slate-100 text-[16px] font-medium transition hover:text-brand active:bg-slate-50"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button variant="ghost" className="w-full sm:flex-1" onClick={() => { setOpen(false); openModal({ type: 'signin' }); }}>
              Sign In
            </Button>
            <Button className="btn-signup w-full sm:flex-1" onClick={() => { setOpen(false); openModal({ type: 'signup' }); }}>
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}