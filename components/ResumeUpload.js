'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUp, Check, FileText, Loader2, Lock, X, Zap } from 'lucide-react';

import Button from './ui/Button';
import { PIPELINE } from './data';

const ICON_TONE = {
  green: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  indigo: 'border-indigo-200 bg-indigo-50 text-indigo-600',
  violet: 'border-violet-200 bg-violet-50 text-violet-600',
  blue: 'border-blue-200 bg-blue-50 text-brand',
};

const OK = ['pdf', 'doc', 'docx'];
const EASE = [0.22, 1, 0.36, 1];

// label shown under the progress bar while each pipeline step runs
const STEP_LABELS = [
  'Reading your resume…',
  'Matching your skills…',
  'Weighing your experience…',
  'Searching 1,000+ sources…',
];

/* soft coloured wash: sky-blue bottom-left, lavender right, faint indigo glow behind the heading */
const WASH = {
  background: [
    'radial-gradient(ellipse 34% 42% at 10% 72%, rgba(125,211,252,.30), transparent 70%)',
    'radial-gradient(ellipse 34% 42% at 90% 58%, rgba(196,181,253,.30), transparent 70%)',
    'radial-gradient(ellipse 40% 26% at 50% 6%, rgba(199,210,254,.32), transparent 70%)',
  ].join(','),
};

/* count-up number, starts when `run` becomes true */
function useCountUp(target, run, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    let t0;
    const tick = (t) => {
      if (t0 == null) t0 = t;
      const p = Math.min((t - t0) / ms, 1);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return v;
}

export default function ResumeUpload() {
  const sectionRef = useRef(null);
  const input = useRef(null);

  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState('');
  const [step, setStep] = useState(0); // 0..3 = running that step, 4 = all done

  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const match = useCountUp(98, inView);

  /* --nav-h is now set by Navbar.jsx (it measures only the bar, not the open mobile menu). */

  /* Demo analysis: walks the 4 pipeline cards one by one after a file is chosen.
     Replace the interval with your real API progress when it's ready. */
  useEffect(() => {
    setStep(0);
    if (!file) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= 4) {
          clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, 1100);
    return () => clearInterval(id);
  }, [file]);

  const pick = (f) => {
    setErr('');
    if (!f) return;
    const ext = f.name.split('.').pop().toLowerCase();
    if (!OK.includes(ext)) return setErr('Please upload a PDF, DOC or DOCX file.');
    if (f.size > 10 * 1024 * 1024) return setErr('File is larger than 10MB.');
    setFile(f);
  };

  const clearFile = () => {
    setFile(null);
    if (input.current) input.current.value = '';
  };

  const onSpot = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const done = step >= 4;
  const pct = file ? Math.max(6, (step / 4) * 100) : 0;

  const cardState = (i) => {
    if (!file) return 'idle';
    if (i < step) return 'done';
    if (i === step) return 'active';
    return 'pending';
  };

  return (
    <section
      ref={sectionRef}
      id="upload"
      className="section-frame relative flex scroll-mt-[var(--nav-h,80px)] flex-col justify-center overflow-x-clip bg-gradient-to-b from-[#f6f8ff] to-[#f8f6ff] py-[clamp(16px,3vh,40px)] lg:min-h-[calc(100svh-var(--nav-h,80px))]"
    >
      {/* background glow layers */}
      <div aria-hidden="true" className="bg-aurora pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={WASH} />
      {/* faint ring behind the heading */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-160px] hidden h-[420px] w-[min(1000px,110%)] -translate-x-1/2 rounded-[100%] border border-indigo-100/70 sm:block" />

      <div className="container-x relative mx-auto flex w-full flex-col">
        {/* ───────── header ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="shrink-0 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-[#f4f2ff] px-3.5 py-1 text-[10px] shadow-soft sm:px-4 sm:text-[11px]">
            <span className="relative grid h-3 w-3 place-items-center rounded-full bg-indigo-100">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-300 opacity-60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-indigo-500" />
            </span>
            <b className="font-medium uppercase tracking-wide text-brand">Try it live</b>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400">v2.4 AI Engine</span>
          </span>

          <h2 className="mx-auto mt-[clamp(8px,1.8vh,16px)] max-w-[760px] font-display text-[clamp(26px,5vh,40px)] font-bold leading-[1.12] tracking-tight text-[#0B1020]">
            Upload your resume.
            <br />
            <span className="text-brand">Find jobs that fit.</span>
          </h2>

          <p className="mx-auto mt-[clamp(6px,1.4vh,12px)] max-w-[560px] text-[clamp(13px,2vh,16px)] leading-[1.5] text-slate-600">
            Upload once. CampusPe reads your skills, experience, and preferences — then finds relevant jobs across 1,000+ sources.
          </p>
        </motion.div>

        {/* ───────── upload area ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.06, ease: EASE }}
          className="relative mx-auto mt-[clamp(14px,2.8vh,28px)] w-full max-w-[420px]"
        >
          {/* match-rate card (count-up) */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.06 }}
            className="absolute top-8 z-20 hidden cursor-default items-center gap-2 rounded-xl border border-slate-100 bg-white px-2.5 py-1.5 text-left shadow-soft sm:-left-10 sm:flex"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-lime-200 bg-lime-50 text-lime-600">
              <Zap size={12} />
            </span>
            <div>
              <p className="text-[10.5px] font-semibold leading-tight tabular-nums">{match}% Match Rate</p>
              <p className="mt-0.5 text-[8.5px] text-slate-500">AI semantic rank</p>
            </div>
          </motion.div>

          {/* ATS card */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.06 }}
            className="absolute bottom-10 z-20 hidden cursor-default items-center gap-2 rounded-xl border border-slate-100 bg-white px-2.5 py-1.5 text-left shadow-soft sm:-right-9 sm:flex"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-orange-200 bg-orange-50 text-orange-500">
              <Lock size={11} />
            </span>
            <div>
              <p className="text-[10.5px] font-semibold leading-tight">ATS Compliant</p>
              <p className="mt-0.5 text-[8.5px] text-slate-500">Standardized parser</p>
            </div>
          </motion.div>

          {/* main card */}
          <div className="rounded-[26px] bg-white/80 p-[clamp(8px,1.4vh,14px)] shadow-[0_20px_55px_-20px_rgba(30,64,175,.25)] backdrop-blur-xl">
            {/* drop zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                pick(e.dataTransfer.files?.[0]);
              }}
              onMouseMove={onSpot}
              className={`group relative overflow-hidden rounded-[20px] border border-dashed px-4 py-[clamp(14px,2.6vh,26px)] text-center transition-all duration-300 sm:px-6 ${
                drag
                  ? 'scale-[1.015] border-brand bg-blue-50 shadow-[0_0_0_6px_rgba(0,149,255,.12)]'
                  : 'border-indigo-200 bg-[#f8f9ff] hover:border-brand/60'
              }`}
            >
              {/* corner brackets */}
              <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-4 w-4 rounded-tl-[20px] border-l-2 border-t-2 border-indigo-300" />
              <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-4 w-4 rounded-tr-[20px] border-r-2 border-t-2 border-indigo-300" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 rounded-bl-[20px] border-b-2 border-l-2 border-indigo-300" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 rounded-br-[20px] border-b-2 border-r-2 border-indigo-300" />

              {/* cursor spotlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(0,149,255,.10), transparent 70%)' }}
              />

              <div className="relative">
                {/* icon */}
                <motion.div
                  animate={drag ? { y: -6, scale: 1.18, rotate: -6 } : { y: [0, -3, 0], scale: 1, rotate: 0 }}
                  transition={drag ? { type: 'spring', stiffness: 300, damping: 14 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="mx-auto grid h-[clamp(32px,4.6vh,40px)] w-[clamp(32px,4.6vh,40px)] place-items-center rounded-xl border border-blue-100 bg-blue-50 text-brand"
                >
                  <FileText size={18} />
                </motion.div>

                <h3 className="mt-[clamp(6px,1.2vh,12px)] text-[clamp(18px,2.8vh,22px)] font-bold leading-tight text-[#0B1020]">
                  {drag ? 'Drop it here!' : 'Upload your resume'}
                </h3>

                <p className="mx-auto mt-1.5 max-w-[340px] text-[11.5px] leading-[17px] text-slate-500 sm:text-[12px]">
                  PDF, DOC, or DOCX · Up to 10MB · We&apos;ll use it to understand your skills and experience.
                </p>

                <input ref={input} type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />

                <Button
                  size="pill"
                  onClick={() => input.current?.click()}
                  className="btn-signup mt-[clamp(10px,1.8vh,16px)] !h-[36px] px-6 text-[12px]"
                >
                  {file ? 'Choose another' : 'Upload resume'}
                  <ArrowUp size={13} />
                </Button>

                {/* status slot (fixed min-height so the layout never jumps) */}
                <div className="mx-auto mt-[clamp(8px,1.4vh,12px)] flex min-h-[56px] w-full max-w-[300px] flex-col items-center justify-center">
                  <AnimatePresence mode="wait" initial={false}>
                    {file ? (
                      <motion.div
                        key="file"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="w-full"
                      >
                        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-left text-[11px] text-emerald-800">
                          <FileText size={14} />
                          <span className="flex-1 truncate">{file.name}</span>
                          {done && <Check size={14} />}
                          <button type="button" aria-label="Remove file" onClick={clearFile} className="rounded p-0.5 transition-all hover:rotate-90 hover:bg-emerald-100">
                            <X size={13} />
                          </button>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[#0095FF] to-[#06B79C]"
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                          />
                        </div>
                        <p className={`mt-1 text-[10.5px] ${done ? 'font-medium text-emerald-600' : 'text-slate-500'}`}>
                          {done ? '✓ Analysis complete — your matches are ready' : STEP_LABELS[step]}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col items-center"
                      >
                        <p className="text-[10.5px] text-slate-500">{drag ? 'Release to upload' : 'or drag and drop your file here'}</p>
                        <div className="mt-2 flex justify-center gap-2">
                          {['PDF', 'DOC', 'DOCX'].map((t) => (
                            <span key={t} className="rounded-md border border-brand px-2.5 py-0.5 text-[9px] font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand hover:text-white">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {err && (
                    <motion.p key={err} role="alert" initial={{ x: 0 }} animate={{ x: [0, -6, 6, -4, 4, 0] }} transition={{ duration: 0.4 }} className="mt-1 text-[11px] text-rose-600">
                      {err}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ───────── pipeline (cards joined by short connector lines on lg+) ───────── */}
        <div className="mx-auto mt-[clamp(14px,2.8vh,28px)] grid w-full max-w-[640px] shrink-0 grid-cols-2 gap-2.5 lg:flex lg:items-stretch lg:gap-0">
          {PIPELINE.map((item, i) => {
            const s = cardState(i);
            return (
              <Fragment key={item.title}>
                {i > 0 && <span aria-hidden="true" className="hidden h-px w-2.5 shrink-0 self-center bg-indigo-200/80 lg:block" />}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className={`flex min-h-[54px] min-w-0 items-center gap-2 rounded-xl border bg-white/90 px-2.5 py-2 text-left shadow-soft transition-[box-shadow,border-color,opacity] duration-300 hover:shadow-[0_12px_30px_rgba(30,64,175,.10)] lg:flex-1 ${
                    s === 'active' ? 'border-brand shadow-[0_0_0_4px_rgba(0,149,255,.12)]' : s === 'done' ? 'border-emerald-200' : 'border-slate-100'
                  } ${s === 'pending' ? 'opacity-55' : 'opacity-100'}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border ${s === 'pending' ? 'border-slate-200 bg-slate-50 text-slate-400' : ICON_TONE[item.icon]}`}>
                    <motion.span
                      key={s}
                      initial={s === 'done' ? { scale: 0, rotate: -90 } : false}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                      className="grid place-items-center"
                    >
                      {s === 'active' ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                    </motion.span>
                  </span>

                  <div className="min-w-0">
                    <p className="text-[10.5px] font-semibold leading-tight text-ink">{item.title}</p>
                    <p className={`mt-0.5 flex items-center gap-1 text-[8.5px] leading-tight ${item.subTone}`}>
                      {i === 0 && <span className="h-1 w-1 rounded-full bg-emerald-500" />}
                      {item.sub}
                    </p>
                  </div>
                </motion.div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}