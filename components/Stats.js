import { Users, Building2, Briefcase, ShieldCheck } from 'lucide-react';
import { STATS } from './data';

const ICONS = { users: Users, building: Building2, briefcase: Briefcase, shield: ShieldCheck };

export default function Stats() {
  return (
    <section aria-label="CampusPe in numbers" className="container-x pb-10 pt-6">
      <ul className="mx-auto grid max-w-[1100px] grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-0">
        {STATS.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <li key={s.label} className={`group flex items-center justify-center gap-4 lg:justify-start ${i > 0 ? 'lg:border-l lg:border-slate-300 lg:pl-8' : ''}`}>
              <span className={`grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${s.tone}`}><Icon size={26} strokeWidth={1.6} /></span>
              <div><p className="text-[28px] font-semibold leading-none text-ink sm:text-[32px]">{s.value}</p><p className="mt-1.5 text-[15px] text-ink sm:text-[17px]">{s.label}</p></div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
