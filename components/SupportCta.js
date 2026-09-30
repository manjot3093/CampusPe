'use client';
import { ArrowUpRight, PhoneCall } from 'lucide-react';
import { openModal } from './openModal';
import Reveal from './ui/Reveal';

export default function SupportCta() {
  return (
    <section className="container-x py-16 sm:py-[68px]">
      <Reveal>
        <div
          // Same soft top-left/top-right blue glow fading into white as the
          // screenshot, just toned down (.3/.25 alpha instead of solid hex
          // stops) so it reads as a gentle wash rather than a strong tint —
          // consistent with the .bg-aurora* reductions elsewhere on the site.
          className="relative mx-auto max-w-[1196px] overflow-hidden rounded-[32px] bg-[radial-gradient(ellipse_at_top_left,rgba(191,220,255,.55)_0%,transparent_45%),radial-gradient(ellipse_at_top_right,rgba(207,228,255,.45)_0%,transparent_40%),linear-gradient(#f6f9ff,#ffffff)] px-6 py-14 text-center shadow-[0_20px_44px_-26px_rgba(30,64,175,.22)] sm:py-[60px]"
        >
          <h2 className="font-display text-[28px] font-bold text-[#1f2430] sm:text-[34px]">Still have questions?</h2>
          <p className="mx-auto mt-5 max-w-[490px] text-[18px] leading-[27px] text-slate-700">
            Our support team is here to help you succeed. Get in touch anytime.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openModal({ type: 'contact' })}
              className="btn-signup group inline-flex h-[46px] items-center gap-4 rounded-full pl-6 pr-1.5 text-[14px] font-semibold transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.035] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 active:scale-95"
            >
              Contact Support
              <span className="grid h-[36px] w-[36px] place-items-center rounded-full bg-white text-brand transition-transform duration-300 group-hover:rotate-12">
                <ArrowUpRight size={18} />
              </span>
            </button>

            <button
              onClick={() => openModal({ type: 'call' })}
              className="group inline-flex h-[46px] items-center gap-4 rounded-full border border-brand bg-white/70 pl-6 pr-1.5 text-[14px] font-semibold text-brand transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.035] hover:bg-blue-50 hover:shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 active:scale-95"
            >
              Schedule a Call
              <span className="grid h-[36px] w-[36px] place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:rotate-12">
                <PhoneCall size={17} />
              </span>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}