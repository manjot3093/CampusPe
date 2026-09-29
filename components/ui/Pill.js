const tones = {
  blue: 'bg-brand text-white',
  blueSoft: 'bg-blue-50 text-blue-700 border border-blue-100',
  outline: 'bg-white text-brand border border-brand',
  green: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  greenOutline: 'bg-lime-50 text-lime-700 border border-lime-500',
  purple: 'bg-violet-50 text-violet-700 border border-violet-100',
  indigo: 'bg-indigo-50 text-indigo-600',
  gray: 'bg-slate-100 text-slate-600 border border-slate-200',
  red: 'bg-rose-50 text-rose-700 border border-rose-200',
};
export default function Pill({ tone = 'blueSoft', className = '', children }) {
  return <span className={`pill-tag ${tones[tone]} ${className}`}>{children}</span>;
}
