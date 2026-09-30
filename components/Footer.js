'use client';
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone, Twitter, Youtube } from 'lucide-react';
import Button from './ui/Button';
import { FOOTER_COLS, LEGAL } from './data';
import { openModal, scrollToId } from './openModal';

const SOCIAL = [[Linkedin, 'LinkedIn', 'https://www.linkedin.com'], [Instagram, 'Instagram', 'https://www.instagram.com'], [Twitter, 'Twitter', 'https://twitter.com'], [Facebook, 'Facebook', 'https://www.facebook.com'], [MessageCircle, 'WhatsApp', 'https://wa.me/916362606464'], [Youtube, 'YouTube', 'https://www.youtube.com']];
const link = 'text-[12px] leading-[18px] text-slate-600 transition-colors hover:text-brand hover:underline underline-offset-4';

/* Blue glows rising from the bottom of the footer: strong blue bottom-left,
   periwinkle bottom-right, soft light-blue in between. Raise/lower alpha to tune. */
const FOOTER_WASH = {
  background: [
    'radial-gradient(ellipse 30% 60% at 8% 100%, rgba(59,130,246,.42), transparent 72%)',
    'radial-gradient(ellipse 26% 45% at 30% 100%, rgba(147,197,253,.32), transparent 72%)',
    'radial-gradient(ellipse 30% 40% at 58% 100%, rgba(191,219,254,.38), transparent 72%)',
    'radial-gradient(ellipse 30% 60% at 94% 100%, rgba(129,140,248,.42), transparent 72%)',
  ].join(','),
};

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#eef4ff]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[440px]" style={FOOTER_WASH} />
      <div className="container-x relative py-10">
        <div className="mx-auto flex flex-col items-start justify-between gap-6 rounded-[36px] border border-slate-200 bg-white/80 px-8 py-9 shadow-soft lg:px-[46px] lg:py-[30px] xl:flex-row xl:items-center">
          <div className="max-w-[340px] lg:shrink-0"><h3 className="font-display text-[28px] font-bold text-[#0B1730]">Ready for what’s next?</h3><p className="mt-3 text-[15px] leading-5 text-slate-500">Discover colleges, find opportunities, list your institution, or start hiring with CampusPe.</p></div>
          <div className="flex flex-wrap gap-3 xl:flex-nowrap xl:gap-3.5">
            <Button size="md" onClick={() => openModal({ type: 'waitlist', who: 'College' })} className="!h-10 !text-[13px]">Explore Colleges <ArrowRight size={12} /></Button>
            <Button size="md" onClick={() => scrollToId('upload')} className="!h-10 !text-[13px]">Find Opportunities <ArrowRight size={12} /></Button>
            <Button variant="ghost" onClick={() => openModal({ type: 'waitlist', who: 'College' })} className="!h-10 !text-[13px]">List Your College <ArrowRight size={12} /></Button>
            <Button variant="ghost" onClick={() => openModal({ type: 'waitlist', who: 'Hiring' })} className="!h-10 !text-[13px]">Post a Job <ArrowRight size={12} /></Button>
          </div>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[270px_repeat(5,auto)] xl:justify-between xl:gap-x-8">
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
            <img src="/images/logo.png" alt="CampusPe" className="h-[44px] w-auto" />
            <p className="mt-5 max-w-[260px] text-[15px] leading-[22px] text-slate-700">From choosing a college to finding your next opportunity.</p>
            <p className="mt-4 max-w-[260px] text-[15px] leading-[22px] text-slate-600">CampusPe connects students, colleges and employers in one place.</p>
          </div>
          {FOOTER_COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h4 className="text-[16px] font-semibold text-ink">{c.title}</h4>
              <ul className="mt-3 space-y-2.5">{c.links.map((l) => <li key={l}><a href="#" onClick={(e) => e.preventDefault()} className={link}>{l}</a></li>)}</ul>
            </nav>
          ))}
          <nav aria-label="Legal & Policies" className="">
            <h4 className="text-[16px] font-semibold text-ink">Legal & Policies</h4>
            <ul className="mt-3 space-y-2.5">{LEGAL.map((l) => <li key={l}><a href="#" onClick={(e) => e.preventDefault()} className={link}>{l}</a></li>)}</ul>
            <a href="#" onClick={(e) => e.preventDefault()} className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-brand hover:gap-2 transition-all">View all policies <ArrowRight size={11} /></a>
            <p className="mt-4 max-w-[150px] rounded-xl border border-blue-200 bg-blue-50/80 p-3 text-[11px] leading-[16px] text-slate-700">Separate user, institution and employer terms can live inside the full Policies page.</p>
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-300/80 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[11.5px] text-slate-600">
            <div className="flex flex-wrap items-center gap-5">
              <a href="mailto:contactus@campuspe.com" className="group inline-flex items-center gap-2 transition hover:text-brand"><span className="grid h-5 w-5 place-items-center rounded-md border border-slate-600 bg-white"><Mail size={11} className="text-brand" /></span>contactus@campuspe.com</a>
              <a href="tel:+916362606464" className="group inline-flex items-center gap-2 transition hover:text-brand"><span className="grid h-5 w-5 place-items-center rounded-md border border-slate-600 bg-white"><Phone size={11} className="text-brand" /></span>+91 6362606464</a>
            </div>
            <p className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Students · Colleges · Employers</p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-300/80 pt-5 text-[15px] text-[#0B1F4B]">
            <p>2026 CampusPe Technologies Pvt. Ltd. <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Privacy</a> <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Terms</a> <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Grievance</a></p>
            <div className="flex items-center gap-4">{SOCIAL.map(([I, n, h]) => <a key={n} href={h} target="_blank" rel="noopener noreferrer" aria-label={n} className="text-[#0B1F4B] transition duration-200 hover:-translate-y-1 hover:text-brand active:scale-90"><I size={18} fill={n === 'Facebook' || n === 'LinkedIn' || n === 'YouTube' ? 'currentColor' : 'none'} /></a>)}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}