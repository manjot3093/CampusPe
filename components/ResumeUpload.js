'use client';

import { useEffect, useRef, useState } from 'react';
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
      className="section-frame relative flex scroll-mt-[var(--nav-h,80px)] flex-col justify-center overflow-x-clip bg-gradient-to-br from-[#f4f6ff] via-[#f8faff] to-[#f6efff] py-[clamp(16px,3vh,40px)] lg:min-h-[calc(100svh-var(--nav-h,80px))]"
    >
      {/* background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_55%,rgba(186,230,253,.45),transparent_32%),radial-gradient(circle_at_84%_55%,rgba(233,213,255,.5),transparent_34%)]"
      />

      <div className="container-x relative mx-auto flex w-full flex-col">
        {/* ───────── header ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="shrink-0 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-[10px] shadow-soft sm:px-4 sm:text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-70" />
              <span className="relative h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            <b className="font-semibold uppercase tracking-wide text-brand">Try it live</b>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">v2.4 AI Engine</span>
          </span>

          <h2 className="mx-auto mt-[clamp(8px,1.8vh,18px)] max-w-[760px] font-display text-[clamp(28px,5.4vh,49px)] font-bold leading-[1.04] tracking-tight text-[#0B1020]">
            Upload your resume.
            <br />
            <span className="bg-gradient-to-r from-[#0095FF] to-[#06B79C] bg-clip-text text-transparent">Find jobs that fit.</span>
          </h2>

          <p className="mx-auto mt-[clamp(6px,1.4vh,14px)] max-w-[700px] text-[clamp(13px,2.1vh,17px)] leading-[1.45] text-slate-600">
            Upload once. CampusPe reads your skills, experience, and preferences — then finds relevant jobs across 1,000+ sources.
          </p>
        </motion.div>

        {/* ───────── upload area ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.06, ease: EASE }}
          className="relative mx-auto mt-[clamp(10px,2.2vh,24px)] w-full max-w-[680px]"
        >
          {/* match-rate card (count-up) */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.06 }}
            className="absolute left-2 top-3 z-20 hidden cursor-default items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 text-left shadow-soft sm:flex md:-left-8 lg:-left-10"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-lime-200 bg-lime-50 text-lime-600">
              <Zap size={13} />
            </span>
            <div>
              <p className="text-[11px] font-semibold leading-tight tabular-nums">{match}% Match Rate</p>
              <p className="mt-0.5 text-[9px] text-slate-500">AI semantic rank</p>
            </div>
          </motion.div>

          {/* ATS card */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.06 }}
            className="absolute bottom-5 right-2 z-20 hidden cursor-default items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 text-left shadow-soft sm:flex md:-right-8 lg:-right-10"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-orange-200 bg-orange-50 text-orange-500">
              <Lock size={12} />
            </span>
            <div>
              <p className="text-[11px] font-semibold leading-tight">ATS Compliant</p>
              <p className="mt-0.5 text-[9px] text-slate-500">Standardized parser</p>
            </div>
          </motion.div>

          {/* main card */}
          <div className="rounded-[26px] bg-white/90 p-[clamp(8px,1.4vh,16px)] shadow-[0_20px_55px_-20px_rgba(30,64,175,.25)] backdrop-blur-xl sm:rounded-[28px]">
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
              className={`group relative overflow-hidden rounded-[20px] border-2 border-dashed px-4 py-[clamp(12px,2.2vh,24px)] text-center transition-all duration-300 sm:px-6 ${
                drag
                  ? 'scale-[1.015] border-brand bg-blue-50 shadow-[0_0_0_6px_rgba(0,149,255,.12)]'
                  : 'border-indigo-200 bg-[#fafbff] hover:border-brand/60'
              }`}
            >
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
                  className="mx-auto grid h-[clamp(36px,5.2vh,46px)] w-[clamp(36px,5.2vh,46px)] place-items-center rounded-xl border border-blue-100 bg-blue-50 text-brand"
                >
                  <FileText size={20} />
                </motion.div>

                <h3 className="mt-[clamp(6px,1.2vh,12px)] text-[clamp(19px,3vh,24px)] font-bold leading-tight text-[#0B1020]">
                  {drag ? 'Drop it here!' : 'Upload your resume'}
                </h3>

                <p className="mx-auto mt-1.5 max-w-[600px] text-[12px] leading-[18px] text-slate-500 sm:text-[13px]">
                  PDF, DOC, or DOCX · Up to 10MB · We&apos;ll use it to understand your skills and experience.
                </p>

                <input ref={input} type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />

                <Button
                  size="pill"
                  onClick={() => input.current?.click()}
                  className="btn-signup mt-[clamp(8px,1.6vh,16px)] !h-[40px] px-7 text-[12px]"
                >
                  {file ? 'Choose another' : 'Upload resume'}
                  <ArrowUp size={13} />
                </Button>

                {/* status slot (fixed min-height so the layout never jumps) */}
                <div className="mx-auto mt-[clamp(6px,1.2vh,12px)] flex min-h-[60px] w-full max-w-[400px] flex-col items-center justify-center">
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

        {/* ───────── pipeline ───────── */}
        <div className="mx-auto mt-[clamp(10px,2.2vh,24px)] grid w-full max-w-[1050px] shrink-0 grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-4 lg:gap-3">
          {PIPELINE.map((item, i) => {
            const s = cardState(i);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className={`flex min-h-[60px] items-center gap-2.5 rounded-2xl border bg-white/90 px-3 py-2 text-left shadow-soft transition-[box-shadow,border-color,opacity] duration-300 hover:shadow-[0_12px_30px_rgba(30,64,175,.10)] ${
                  s === 'active' ? 'border-brand shadow-[0_0_0_4px_rgba(0,149,255,.12)]' : s === 'done' ? 'border-emerald-200' : 'border-slate-100'
                } ${s === 'pending' ? 'opacity-55' : 'opacity-100'}`}
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${s === 'pending' ? 'border-slate-200 bg-slate-50 text-slate-400' : ICON_TONE[item.icon]}`}>
                  <motion.span
                    key={s}
                    initial={s === 'done' ? { scale: 0, rotate: -90 } : false}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                    className="grid place-items-center"
                  >
                    {s === 'active' ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                  </motion.span>
                </span>

                <div className="min-w-0">
                  <p className="text-[11.5px] font-semibold leading-tight text-ink">{item.title}</p>
                  <p className={`mt-0.5 text-[9px] leading-tight ${item.subTone}`}>{item.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}