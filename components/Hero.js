'use client';
import { useRef } from 'react';
import { Bell, Bot, Briefcase, Building2, Check, GraduationCap, MessageCircle, Sparkles, Zap, ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import { openModal, scrollToId } from './openModal';

const LIST_ICON = <span className="mt-[2px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-slate-200 text-slate-600"><Check size={10} strokeWidth={3} /></span>;
const LIST_ICON_RED = <span className="mt-[2px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-500"><Check size={10} strokeWidth={3} /></span>;

function IllusCollege() {
  return (
    <svg viewBox="0 0 250 120" className="absolute bottom-0 right-0 w-[230px] transition-transform duration-500 group-hover:scale-105 origin-bottom-right" aria-hidden>
      <path d="M0 120V45L125 0l125 45v75z" fill="#FFE9D2" opacity=".75" />
      <rect x="70" y="60" width="14" height="60" fill="#FFD9B5" opacity=".8" /><rect x="118" y="60" width="14" height="60" fill="#FFD9B5" opacity=".8" /><rect x="166" y="60" width="14" height="60" fill="#FFD9B5" opacity=".8" />
    </svg>
  );
}
function IllusResume() {
  return (
    <div className="absolute bottom-[80px] right-[18px] w-[84px] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-2" aria-hidden>
      <div className="h-[104px] rounded-lg border border-violet-200 bg-violet-50/80 p-2.5 pb-6">
        <div className="mb-1.5 h-1.5 w-8 rounded bg-orange-200" />
        {[0, 1, 2].map((i) => <div key={i} className="mb-1.5 h-1.5 rounded bg-emerald-200" />)}
        <div className="mb-1.5 h-1.5 w-10 rounded bg-violet-300" />
        <div className="mb-1.5 h-1.5 rounded bg-emerald-200" />
      </div>
      <div className="absolute -bottom-2 -right-3 grid h-10 w-10 place-items-center rounded-full border-[3px] border-orange-200 bg-white/90">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
      </div>
    </div>
  );
}
function IllusHiring() {
  return (
    <div className="absolute bottom-0 right-0 h-[150px] w-[170px] transition-transform duration-500 group-hover:scale-105 origin-bottom-right" aria-hidden>
      <div className="absolute bottom-0 right-0 h-[150px] w-[76px] rounded-t-lg bg-blue-100/80" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent 0 22px,rgba(255,255,255,.7) 22px 24px)' }} />
      <div className="absolute bottom-0 right-[62px] h-[115px] w-[80px] rounded-t-lg bg-blue-50" />
      <div className="absolute bottom-[58px] right-[88px] grid h-[36px] w-[56px] place-items-center rounded-lg bg-white/90 font-mono text-[14px] font-semibold text-orange-300 shadow-sm">&lt;/&gt;</div>
    </div>
  );
}

function ChoiceCard({ icon, status, title, desc, items, cta, ctaIcon, onClick, illus, checkIcon = LIST_ICON, delay = 0 }) {
  return (
    <article
      style={{ animationDelay: `${delay}ms` }}
      className="choice-card group relative flex flex-col rounded-3xl border-2 border-[#BFE6FF] bg-white/95 px-6 pb-5 pt-5 shadow-card animate-fadeUp transition-all duration-500 ease-out hover:-translate-y-2 hover:border-transparent hover:shadow-[0_24px_50px_-14px_rgba(0,149,255,.35)] focus-within:-translate-y-2 focus-within:border-transparent"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-blue-100 bg-blue-50 text-brand transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">{icon}</span>
        <span className="rounded-full border border-brand bg-white px-3 py-1 text-[12px] font-medium text-brand">{status}</span>
      </div>
      <h3 className="mt-[clamp(10px,2vh,20px)] font-serif text-[clamp(20px,3.2vh,24px)] font-semibold leading-tight text-ink">{title}</h3>
      <p className="mt-2 min-h-[40px] max-w-[330px] text-[14px] leading-5 text-slate-600">{desc}</p>
      <ul className="relative z-10 mt-[clamp(10px,2vh,20px)] space-y-[clamp(6px,1.3vh,12px)] text-[14px] text-slate-700">
        {items.map((t) => <li key={t} className="flex items-start gap-2.5">{checkIcon}<span>{t}</span></li>)}
      </ul>
      <div className="mt-auto pt-4" />
      {/* illustrations are clipped in their own wrapper so the animated border can sit outside the card */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]">{illus}</div>
      <Button onClick={onClick} className="relative z-10 h-[40px] w-full text-[14px]">
        {cta} {ctaIcon}
      </Button>
    </article>
  );
}

function Notify({ className = '', style, children }) {
  return <div style={style} className={`rounded-2xl border border-indigo-300/70 bg-white/95 p-4 shadow-soft backdrop-blur ${className}`}>{children}</div>;
}

export default function Hero() {
  const ref = useRef(null);
  // subtle pointer parallax: each [data-depth] element drifts with the cursor
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.querySelectorAll('[data-depth]').forEach((el) => {
      const d = parseFloat(el.dataset.depth);
      el.style.transform = `translate3d(${x * d}px, ${y * d}px, 0)`;
    });
  };
  const onLeave = () => ref.current?.querySelectorAll('[data-depth]').forEach((el) => (el.style.transform = ''));

  return (
    // md+: section fills exactly the space under the navbar (set --nav-h in globals.css), content is centred and scales with viewport height
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex items-center pb-4 pt-1 md:min-h-[calc(100svh-var(--nav-h,72px))]"
    >
      <div className="container-x relative w-full text-center">
        {/* ── header block (floating notifications are anchored to it) ── */}
        <div className="relative">
          <div data-depth="-18" className="absolute left-1/2 top-[6px] ml-[-560px] hidden transition-transform duration-300 ease-out xl:block">
            <Notify className="w-[196px] animate-float-slow text-left transition-transform hover:scale-105">
              <div className="flex items-center gap-1.5 text-[13px] font-medium text-orange-600"><MessageCircle size={15} className="fill-emerald-500 text-emerald-500" /> WhatsApp Alert</div>
              <p className="mt-2 text-[12.5px] font-semibold text-ink">Get notified on whatsapp</p>
              <p className="mt-1 text-[10.5px] leading-snug text-slate-500">You’ll get all important updates on your whatsapp</p>
            </Notify>
          </div>
          <div data-depth="18" className="absolute left-1/2 top-0 ml-[319px] hidden transition-transform duration-300 ease-out xl:block">
            <Notify className="w-[218px] animate-float text-left transition-transform hover:scale-105">
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-violet-600"><Zap size={15} className="fill-violet-500" /> Resume Builder</div>
              <p className="mt-2 text-[12.5px] font-semibold text-ink">Build Your Resume</p>
              <p className="mt-1.5 text-[10.5px] leading-snug text-slate-500">Our resume builder gives you dynamic options to build better & faster resume that got you hired</p>
            </Notify>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF3E7] px-5 py-2 text-[14px] font-medium text-brand shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
            <Bot size={18} className="text-brand" /> AI-Powered Campus Assistant
          </div>
          <h1 className="mt-[clamp(10px,2.4vh,24px)] font-display text-[clamp(32px,6vh,52px)] font-bold leading-[1.1] tracking-tight text-[#0B1020]">
            Connect <span className="bg-gradient-to-r from-[#0095FF] to-[#06B79C] bg-clip-text text-transparent transition-all hover:tracking-normal">10X Faster.</span>
          </h1>
          <p className="mx-auto mt-[clamp(6px,1.5vh,16px)] max-w-[680px] text-[clamp(15px,2.4vh,20px)] leading-snug text-slate-600">One platform connecting students, colleges & employers — faster.</p>
        </div>

        {/* ── "What are you looking for?" row (chips are anchored to it) ── */}
        <div className="relative mt-[clamp(10px,2.2vh,24px)] flex items-center justify-center gap-6 text-brand">
          <Sparkles className="hidden animate-pulseDot sm:block" size={22} />
          <h2 className="text-[clamp(20px,3.4vh,28px)] font-medium">What are you looking for?</h2>
          <Sparkles className="hidden animate-pulseDot sm:block" size={18} />

          <div className="absolute left-1/2 top-1/2 ml-[-555px] hidden -translate-y-1/2 xl:block">
            <div data-depth="-10" className="transition-transform duration-300">
              <div className="flex animate-float items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-2 text-left shadow-soft">
                <div className="flex -space-x-2.5">{[['AK', 'bg-blue-500'], ['PR', 'bg-indigo-500'], ['SN', 'bg-cyan-500']].map(([t, c]) => <span key={t} className={`grid h-[26px] w-[26px] place-items-center rounded-full border-2 border-white text-[9px] font-bold text-white ${c}`}>{t}</span>)}</div>
                <div><p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 🔥 142 students matched today</p><p className="text-[10.5px] text-slate-400">Just now • IIT, BITS, VIT</p></div>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 ml-[255px] hidden -translate-y-1/2 xl:block">
            <div data-depth="10" className="transition-transform duration-300">
              <div className="flex animate-float-slow items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3 py-2 text-left shadow-soft">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100">💼</span>
                <div><p className="text-[12.5px] text-ink"><b className="font-semibold text-brand">Radiant Info</b> shortlisted 8 interns</p><p className="flex items-center gap-1 text-[10.5px] font-medium text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Verified recruiter • 2 days ago</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* compact versions below xl */}
        <div className="mt-4 flex flex-wrap justify-center gap-3 xl:hidden">
          <span className="rounded-full border border-slate-100 bg-white px-4 py-2 text-[12.5px] font-medium shadow-soft transition-transform duration-200 hover:-translate-y-0.5">🔥 142 students matched today</span>
          <span className="rounded-full border border-slate-100 bg-white px-4 py-2 text-[12.5px] font-medium shadow-soft transition-transform duration-200 hover:-translate-y-0.5">💼 Radiant Info shortlisted 8 interns</span>
        </div>
        <div className="mx-auto mt-3 grid max-w-[420px] grid-cols-2 gap-3 text-left sm:max-w-[480px] xl:hidden">
          <div className="flex items-start gap-2.5 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600"><MessageCircle size={15} className="fill-emerald-500 text-emerald-500" /></span>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold leading-tight text-ink">WhatsApp Alerts</p>
              <p className="mt-1 text-[10.5px] leading-snug text-slate-500">Get notified instantly</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-soft transition-transform duration-200 hover:-translate-y-0.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-600"><Zap size={14} className="fill-violet-500" /></span>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold leading-tight text-ink">Resume Builder</p>
              <p className="mt-1 text-[10.5px] leading-snug text-slate-500">Build a faster resume</p>
            </div>
          </div>
        </div>

        {/* ── cards ── */}
        <div className="mx-auto mt-[clamp(16px,3.4vh,40px)] grid max-w-[1112px] gap-6 text-left md:grid-cols-3">
          <ChoiceCard delay={0} icon={<Building2 size={18} />} status="Coming Soon" title="College" desc="Explore colleges, courses, fees, placements & more" items={['Search by course, location, fees', 'Connect directly with colleges', 'Improve student placements']} cta="Join Waitlist" ctaIcon={<Bell size={14} />} onClick={() => openModal({ type: 'waitlist', who: 'College' })} illus={<IllusCollege />} />
          <ChoiceCard delay={100} icon={<GraduationCap size={18} />} status="Available Now" title="I'm Looking for a Job" desc="Upload your resume. We'll find jobs that fit you." items={['Jobs from 1000+ sources', 'AI powered matching', 'WhatsApp & email alerts']} checkIcon={LIST_ICON_RED} cta="Explore Jobs" ctaIcon={<ArrowRight size={15} />} onClick={() => scrollToId('upload')} illus={<IllusResume />} />
          <ChoiceCard delay={200} icon={<Briefcase size={18} />} status="Coming Soon" title="I'm Hiring" desc="Connect with colleges and find candidates — from students to graduates." items={['Connect directly with colleges', 'Find the right candidates', 'Simplify your hiring']} cta="Join Waitlist" ctaIcon={<Bell size={14} />} onClick={() => openModal({ type: 'waitlist', who: 'Hiring' })} illus={<IllusHiring />} />
        </div>
      </div>
    </section>
  );
}