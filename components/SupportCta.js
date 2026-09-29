'use client';
import { ArrowUpRight, PhoneCall } from 'lucide-react';
import { openModal } from './openModal';

export default function SupportCta() {
  return (
    <section className="container-x py-16 sm:py-[68px]">
      <div className="relative mx-auto max-w-[1196px] overflow-hidden rounded-[32px] bg-[radial-gradient(ellipse_at_top_left,#bfdcff_0%,transparent_45%),radial-gradient(ellipse_at_top_right,#cfe4ff_0%,transparent_40%),linear-gradient(#f1f7ff,#fff)] px-6 py-14 text-center shadow-[0_30px_60px_-30px_rgba(30,64,175,.3)] sm:py-[60px]">
        <h2 className="font-display text-[28px] font-bold text-[#1f2430] sm:text-[34px]">Still have questions?</h2>
        <p className="mx-auto mt-5 max-w-[490px] text-[18px] leading-[27px] text-slate-700">Our support team is here to help you succeed. Get in touch anytime.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => openModal({ type: 'contact' })} className="group inline-flex h-[46px] items-center gap-4 rounded-full bg-brand pl-6 pr-1.5 text-[14px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-btn focus-visible:ring-4 focus-visible:ring-brand/30 active:scale-95">
            Contact Support <span className="grid h-[36px] w-[36px] place-items-center rounded-full bg-white text-brand transition-transform group-hover:rotate-12"><ArrowUpRight size={18} /></span>
          </button>
          <button onClick={() => openModal({ type: 'call' })} className="group inline-flex h-[46px] items-center gap-4 rounded-full border border-brand bg-white/70 pl-6 pr-1.5 text-[14px] font-semibold text-brand transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-soft focus-visible:ring-4 focus-visible:ring-brand/30 active:scale-95">
            Schedule a Call <span className="grid h-[36px] w-[36px] place-items-center rounded-full bg-brand text-white transition-transform group-hover:rotate-12"><PhoneCall size={17} /></span>
          </button>
        </div>
      </div>
    </section>
  );
}
