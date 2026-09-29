'use client';
import { ArrowRight, Check, MessageSquare, Building2, Scale, Zap, CircleDot } from 'lucide-react';
import Button from './ui/Button';
import Pill from './ui/Pill';
import SectionBadge from './ui/SectionBadge';
import { COLLEGE_STEPS, EMPLOYER_STEPS } from './data';
import { openModal } from './openModal';

const ICONS = { check: Check, chat: MessageSquare, building: Building2, scale: Scale, bolt: Zap, circle: CircleDot };

function Tags({ tags, foot }) {
  return (
    <div className="flex shrink-0 flex-row flex-wrap items-end gap-2 sm:flex-col sm:items-end">
      {tags.map((t) => {
        const I = t.icon && ICONS[t.icon];
        return (
          <Pill key={t.label} tone={t.t} className="!px-3 !py-1.5 !text-[11.5px] !rounded-md whitespace-nowrap">
            {t.dot && <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${t.dot === 'red' ? 'bg-rose-500' : 'bg-emerald-500'}`} />}
            {I && <I size={12} className="mr-1.5" />}
            {t.label}
          </Pill>
        );
      })}
      {foot && <span className="text-[10.5px] text-slate-400">{foot}</span>}
    </div>
  );
}

function StepCard({ s, employer }) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card sm:flex-row sm:justify-between">
      <div className="flex gap-4">
        <span className={`grid shrink-0 place-items-center font-semibold text-indigo-600 transition-colors group-hover:bg-brand group-hover:text-white ${employer ? 'h-10 w-10 rounded-xl bg-indigo-50 text-[13px]' : 'h-6 w-8 rounded-md bg-indigo-50 text-[11px]'}`}>{s.n}</span>
        <div className="max-w-[440px]">
          {!employer && <p className="-mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">{s.kicker}</p>}
          <h3 className={`${employer ? '' : 'mt-2'} flex flex-wrap items-center gap-2 text-[19px] font-semibold text-ink`}>{s.title}{employer && <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[9.5px] font-semibold uppercase text-indigo-600">Instant Setup</span>}</h3>
          <p className="mt-2 text-[14px] leading-[22px] text-slate-500">{s.desc}</p>
        </div>
      </div>
      <Tags tags={s.tags} foot={s.foot} />
    </div>
  );
}

export function CollegesSection() {
  return (
    <section id="colleges" className="scroll-mt-16 bg-[#f6f8fe] py-20">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,470px)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:pt-0">
          <SectionBadge>02 • For Colleges</SectionBadge>
          <h2 className="mt-9 font-display text-[36px] font-bold leading-[1.2] text-[#3f3f46] sm:text-[44px]">Get Discovered<br />by <span className="text-brand">Students and Recruiters.</span></h2>
          <p className="mt-7 max-w-[440px] text-[18px] leading-[27px] text-slate-500">Put your college in front of students searching for the right course and recruiters looking for the right talent. CampusPe helps you build your presence, attract enquiries and connect with opportunities.</p>
          <Button size="pill" className="mt-8" onClick={() => openModal({ type: 'waitlist', who: 'College' })}>List Your College <ArrowRight size={16} /></Button>
        </div>
        <div className="space-y-5">{COLLEGE_STEPS.map((s) => <StepCard key={s.n} s={s} />)}</div>
      </div>
    </section>
  );
}

export function EmployersSection() {
  return (
    <section id="employers" className="scroll-mt-16 bg-gradient-to-br from-[#eef0ff] via-[#f5f6ff] to-[#f8f9ff] py-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionBadge>03 • For Employers</SectionBadge>
          <h2 className="mt-9 font-display text-[36px] font-bold leading-[1.2] text-[#3f3f46] sm:text-[44px]">Stop running campus drives. <span className="text-brand">Start hiring the right people.</span></h2>
          <p className="mt-8 max-w-[420px] text-[18px] leading-[27px] text-slate-500">Post a role in minutes and reach relevant candidates without the time, travel and coordination of traditional hiring. CampusPe helps you discover, match and connect with talent from colleges and beyond.</p>
          <Button size="pill" className="mt-9" onClick={() => openModal({ type: 'waitlist', who: 'Hiring' })}>Post a Job <ArrowRight size={16} /></Button>
        </div>
        <div className="space-y-4">{EMPLOYER_STEPS.map((s) => <StepCard key={s.n} s={s} employer />)}</div>
      </div>
    </section>
  );
}
