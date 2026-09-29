import { PARTNERS } from './data';

export default function Partners() {
  const row = [...PARTNERS, ...PARTNERS];
  return (
    <section aria-label="Partners" className="pb-16 pt-4">
      <p className="text-center text-[18px] text-slate-500">Trusted by partners across India</p>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="marquee-track flex w-max animate-marquee items-center gap-[72px] pr-[72px]">
          {row.map((p, i) => (
            <img key={i} src={p.src} alt={p.name} style={{ width: p.w * 0.85 }} className="h-auto max-h-[90px] shrink-0 object-contain grayscale-0 opacity-90 transition duration-300 hover:scale-105 hover:opacity-100" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
