'use client';
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone, Twitter, Youtube } from 'lucide-react';
import Button from './ui/Button';
import { FOOTER_COLS, LEGAL } from './data';
import { openModal, scrollToId } from './openModal';

const SOCIAL = [[Linkedin, 'LinkedIn', 'https://www.linkedin.com'], [Instagram, 'Instagram', 'https://www.instagram.com'], [Twitter, 'Twitter', 'https://twitter.com'], [Facebook, 'Facebook', 'https://www.facebook.com'], [MessageCircle, 'WhatsApp', 'https://wa.me/916362606464'], [Youtube, 'YouTube', 'https://www.youtube.com']];
const link = 'text-[14px] text-slate-700 transition-colors hover:text-brand hover:underline underline-offset-4';

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-gradient-to-b from-[#fbfbfd] to-[#e6f0ff]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[320px] bg-[radial-gradient(ellipse_at_10%_100%,rgba(59,130,246,.45),transparent_55%),radial-gradient(ellipse_at_90%_100%,rgba(99,102,241,.35),transparent_55%)]" />
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

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[250px_repeat(5,auto)] xl:justify-between xl:gap-x-8">
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
            <img src="/images/logo.png" alt="CampusPe" className="h-[62px] w-auto" />
            <p className="mt-6 text-[19px] leading-[27px] text-slate-700">From choosing a college to finding your next opportunity.</p>
            <p className="mt-5 text-[18px] leading-[27px] text-slate-700">CampusPe connects students, colleges and employers in one place.</p>
          </div>
          {FOOTER_COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h4 className="text-[19px] font-semibold text-ink">{c.title}</h4>
              <ul className="mt-4 space-y-3">{c.links.map((l) => <li key={l}><a href="#" onClick={(e) => e.preventDefault()} className={link}>{l}</a></li>)}</ul>
            </nav>
          ))}
          <nav aria-label="Legal & Policies" className="">
            <h4 className="text-[19px] font-semibold text-ink">Legal & Policies</h4>
            <ul className="mt-4 space-y-3">{LEGAL.map((l) => <li key={l}><a href="#" onClick={(e) => e.preventDefault()} className={link}>{l}</a></li>)}</ul>
            <a href="#" onClick={(e) => e.preventDefault()} className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-medium text-brand hover:gap-2 transition-all">View all policies <ArrowRight size={12} /></a>
            <p className="mt-5 max-w-[205px] rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-[13px] leading-[19px] text-slate-700">Separate user, institution and employer terms can live inside the full Policies page.</p>
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-600/70 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[14px] text-slate-700">
            <div className="flex flex-wrap items-center gap-6">
              <a href="mailto:contactus@campuspe.com" className="group inline-flex items-center gap-2.5 transition hover:text-brand"><span className="grid h-6 w-6 place-items-center rounded-md border border-slate-700 bg-white"><Mail size={13} className="text-brand" /></span>contactus@campuspe.com</a>
              <a href="tel:+916362606464" className="group inline-flex items-center gap-2.5 transition hover:text-brand"><span className="grid h-6 w-6 place-items-center rounded-md border border-slate-700 bg-white"><Phone size={13} className="text-brand" /></span>+91 6362606464</a>
            </div>
            <p className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Students · Colleges · Employers</p>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-600/70 pt-6 text-[19px] text-[#0B1F4B]">
            <p>2026 CampusPe Technologies Pvt. Ltd. <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Privacy</a> <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Terms</a> <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Grievance</a></p>
            <div className="flex items-center gap-5">{SOCIAL.map(([I, n, h]) => <a key={n} href={h} target="_blank" rel="noopener noreferrer" aria-label={n} className="text-[#0B1F4B] transition duration-200 hover:-translate-y-1 hover:text-brand active:scale-90"><I size={22} fill={n === 'Facebook' || n === 'LinkedIn' || n === 'YouTube' ? 'currentColor' : 'none'} /></a>)}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
