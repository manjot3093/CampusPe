import { Users, Building2, Briefcase, ShieldCheck } from 'lucide-react';
import { STATS } from './data';

const ICONS = { users: Users, building: Building2, briefcase: Briefcase, shield: ShieldCheck };

export default function Stats() {
  return (
    <section aria-label="CampusPe in numbers" className="container-x pb-10 pt-6">
      {/* Mobile/tablet: 2 x 2 grid, every item left-aligned so both columns start at the same x.
          Desktop (lg+): original 4-column row with dividers. */}
      <ul className="mx-auto grid max-w-[1100px] grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-4 lg:gap-0">
        {STATS.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <li
              key={s.label}
              className={`group flex min-h-[64px] min-w-0 items-center justify-start gap-3 sm:gap-4 lg:gap-3 xl:gap-4 ${
                i > 0 ? 'lg:border-l lg:border-slate-300 lg:pl-6 xl:pl-8' : ''
              }`}
            >
              {/* fixed icon circle: 36px mobile, 48px tablet, 52px laptop, 62px wide desktop */}
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 sm:h-12 sm:w-12 lg:h-[52px] lg:w-[52px] xl:h-[62px] xl:w-[62px] ${s.tone}`}>
                <Icon aria-hidden strokeWidth={1.6} className="h-[42%] w-[42%]" />
              </span>
              <div className="min-w-0">
                <p className="whitespace-nowrap text-[22px] font-semibold leading-none text-ink sm:text-[28px] xl:text-[32px]">{s.value}</p>
                <p className="mt-1.5 text-[12.5px] leading-[1.3] text-ink [text-wrap:balance] sm:mt-2 sm:text-[15px] xl:text-[17px]">{s.label}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}