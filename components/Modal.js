'use client';
import { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';

const COPY = {
  waitlist: (who) => ({ title: `Join the ${who} waitlist`, sub: "We'll notify you the moment it goes live.", cta: 'Join Waitlist', ok: "You're on the list! We'll be in touch soon." }),
  signin: () => ({ title: 'Welcome back', sub: 'Sign in to continue with CampusPe.', cta: 'Sign In', ok: 'Signed in (demo). Redirecting…' }),
  signup: () => ({ title: 'Create your account', sub: 'Join 800+ students already on CampusPe.', cta: 'Sign Up', ok: 'Account created (demo). Welcome aboard!' }),
  contact: () => ({ title: 'Contact support', sub: 'Leave your email and our team will reach out.', cta: 'Send', ok: 'Thanks! Our team will get back to you shortly.' }),
  call: () => ({ title: 'Schedule a call', sub: 'Share your number and pick a time that works for you.', cta: 'Request a Call', ok: "Request received. We'll call you back!" }),
};

export default function Modal() {
  const [state, setState] = useState(null); // {type, who}
  const [done, setDone] = useState(false);
  const [val, setVal] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const h = (e) => { setState(e.detail); setDone(false); setVal(''); };
    window.addEventListener('campuspe:modal', h);
    return () => window.removeEventListener('campuspe:modal', h);
  }, []);
  useEffect(() => {
    if (!state) return;
    const esc = (e) => e.key === 'Escape' && setState(null);
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    setTimeout(() => inputRef.current?.focus(), 50);
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [state]);

  if (!state) return null;
  const c = COPY[state.type](state.who || 'CampusPe');
  const isCall = state.type === 'call';
  const submit = (e) => { e.preventDefault(); if (val.trim()) setDone(true); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={c.title}>
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fadeUp" onClick={() => setState(null)} />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl animate-fadeUp">
        <button aria-label="Close" onClick={() => setState(null)} className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:scale-90">
          <X size={18} />
        </button>
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto mb-3 text-emerald-500" size={44} />
            <p className="font-semibold text-ink">{c.ok}</p>
            <Button className="mt-6" onClick={() => setState(null)}>Close</Button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h3 className="font-display text-2xl font-bold text-ink">{c.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{c.sub}</p>
            <input
              ref={inputRef}
              type={isCall ? 'tel' : 'email'}
              required
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder={isCall ? '+91 98765 43210' : 'you@example.com'}
              className="mt-5 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
            />
            <Button className="mt-4 w-full" size="md" onClick={submit}>{c.cta}</Button>
          </form>
        )}
      </div>
    </div>
  );
}
