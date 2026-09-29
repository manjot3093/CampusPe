'use client';
import { useState } from 'react';
import { ArrowRight, BookOpen, MapPin, Monitor, Zap, CornerLeftUp, Laptop } from 'lucide-react';
import Button from './ui/Button';
import Pill from './ui/Pill';
import SectionBadge from './ui/SectionBadge';
import { FEED, FEED_TABS, PREF_STEPS } from './data';
import { scrollToId } from './openModal';
import Reveal from './ui/Reveal';

function Logo({ kind }) {
  const box = 'grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white';
  if (kind === 'google')
    return (<span className={box}><svg width="22" height="22" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 6.9-10.2 6.9-17.6z"/><path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg></span>);
  if (kind === 'notion')
    return (<span className={box}><span className="grid h-6 w-6 place-items-center rounded-[5px] border-2 border-black text-[13px] font-black leading-none">N</span></span>);
  return (<span className={box}><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-red-700 text-[8px] font-bold text-red-700">IIM</span></span>);
}

function FeedCard({ item }) {
  const icons = [BookOpen, MapPin, null];
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card animate-fadeUp">
      <div className="flex items-start gap-3">
        <Logo kind={item.logo} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h4 className="text-[15px] font-semibold text-ink">{item.title}</h4>
            <Pill tone={item.tagTone} className="!text-[10.5px]">{item.tag}</Pill>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-slate-500">
            {item.meta.map((m, i) => (<span key={m} className="inline-flex items-center gap-1">{i === 0 && item.cat === 'Colleges' ? <BookOpen size={12} /> : i === 1 ? <Monitor size={12} className={item.meta[0] === 'Remote' ? 'hidden' : ''} /> : i === 0 ? <MapPin size={12} /> : null}{m}</span>))}
          </div>
        </div>
        <Button size="sm" className="!h-7 !rounded-md !px-3 !text-[11px]">{item.cta}</Button>
      </div>
      <p className="mt-3 pl-14 text-[12.5px] text-slate-500">{item.desc}</p>
    </div>
  );
}

export default function Discovery() {
  const [tab, setTab] = useState('All');
  const list = (tab === 'All' ? FEED : FEED.filter((f) => f.cat === tab)).slice(0, 3);
  return (
    <section id="discovery" className="relative scroll-mt-20 bg-gradient-to-b from-white to-[#f6f9ff] pb-16 pt-10">
      <div className="container-x grid min-w-0 items-center gap-12 xl:grid-cols-[minmax(0,540px)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
        <Reveal className="min-w-0">
        <div>
          <SectionBadge>01 • Opportunity Discovery</SectionBadge>
          <h2 className="mt-8 font-display text-[clamp(28px,8.2vw,36px)] font-bold leading-[1.15] text-[#3f3f46] sm:text-[42px]">Stop searching.<br /><span className="text-brand">Start getting matched.</span></h2>
          <p className="mt-7 max-w-[500px] text-[18px] leading-[27px] text-slate-500">Tell CampusPe your skills, preferences and goals. We continuously monitor company career pages and job sources, find opportunities that match you, <br className="hidden sm:block" />and notify you when they appear.</p>
          <div className="mt-8 space-y-4">
            {PREF_STEPS.map((s, i) => (
              <div key={s.n} className={`group flex gap-4 rounded-xl border bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card ${i === 0 ? 'border-indigo-200 shadow-soft' : 'border-slate-200'}`}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[12px] font-semibold ${i === 0 ? 'border border-indigo-200 bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>{s.n}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3"><h3 className="text-[16px] font-semibold text-ink">{s.title}</h3><span className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-medium ${s.tone}`}>{s.tag}</span></div>
                  <p className="mt-1 max-w-[360px] text-[13.5px] leading-[19px] text-slate-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="primary" size="pill" className="mt-8" onClick={() => scrollToId('upload')}>Explore opportunities <ArrowRight size={16} /></Button>
        </div>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
        <div className="relative">
          <div className="rounded-[26px] border border-slate-100 bg-white p-6 shadow-[0_24px_60px_-20px_rgba(30,64,175,.25)] transition-shadow duration-300 hover:shadow-[0_30px_70px_-20px_rgba(0,149,255,.35)]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white"><Zap size={18} className="fill-white" /></span><div><h3 className="text-[16px] font-semibold text-ink sm:whitespace-nowrap">CampusPe Opportunity Feed</h3><p className="text-[12.5px] text-slate-500 sm:whitespace-nowrap">Colleges & opportunities matched to you</p></div></div>
              <span className="hidden shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[11.5px] font-medium text-emerald-600 sm:inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulseDot" />12 new matches today</span>
            </div>
            <div className="my-4 h-px bg-slate-100" />
            <div role="tablist" aria-label="Filter opportunities" className="flex flex-wrap gap-2">
              {FEED_TABS.map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 active:scale-95 ${tab === t ? 'bg-brand text-white shadow-btn' : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-brand'}`}>{t}</button>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {list.length ? list.map((f) => <FeedCard key={f.id + tab} item={f} />) : <p className="py-10 text-center text-sm text-slate-400">No matches yet — check back soon.</p>}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
              <a href="#upload" className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand transition hover:gap-2.5">View all matched opportunities <ArrowRight size={14} /></a>
              <span className="text-[12.5px] text-slate-400">Curated for you • Updated daily</span>
            </div>
          </div>
          <div className="mt-5 hidden items-start gap-3 pl-16 lg:flex">
            <svg width="34" height="28" viewBox="0 0 34 28" fill="none" stroke="#6D28D9" strokeWidth="1.6" strokeLinecap="round" className="mt-1 -ml-10"><path d="M30 24C12 26 3 18 6 6" /><path d="M1 10l5-5 5 5" /></svg>
            <p className="font-hand text-[24px] leading-[34px] text-violet-800">A mix of colleges, jobs,<br />internships and gigs — all in one place.</p>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}