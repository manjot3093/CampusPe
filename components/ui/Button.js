import Link from 'next/link';

const base =
  'group relative inline-flex items-center justify-center gap-2 font-semibold select-none whitespace-nowrap ' +
  'transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out ' +
  '[&_svg]:transition-transform [&_svg]:duration-300 ' +
  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25 ' +
  'active:scale-[.96] disabled:opacity-60 disabled:pointer-events-none';

const variants = {
  primary:
    'bg-brand text-white shadow-[0_4px_14px_-4px_rgba(0,149,255,.55)] ' +
    'hover:bg-brand-dark hover:-translate-y-[2px] hover:shadow-[0_12px_26px_-8px_rgba(0,149,255,.6)] ' +
    'group-hover:[&_svg]:translate-x-[3px] active:bg-brand-darker active:shadow-[0_4px_10px_-4px_rgba(0,149,255,.5)]',
  outline:
    'bg-white text-brand border border-brand/70 ' +
    'hover:bg-brand hover:text-white hover:border-brand hover:-translate-y-[2px] hover:shadow-[0_10px_24px_-10px_rgba(0,149,255,.55)] ' +
    'group-hover:[&_svg]:translate-x-[3px]',
  ghost:
    'bg-white text-ink border border-slate-200 ' +
    'hover:border-brand/60 hover:text-brand hover:-translate-y-[2px] hover:shadow-soft ' +
    'group-hover:[&_svg]:translate-x-[3px]',
  text: 'text-ink hover:text-brand group-hover:[&_svg]:translate-x-[3px]',
};
const sizes = {
  sm: 'h-9 px-4 text-[13px] rounded-lg',
  md: 'h-11 px-5 text-[14.5px] rounded-xl',
  pill: 'h-[46px] px-7 text-[15px] rounded-full tracking-[.01em]',
  nav: 'h-[38px] px-5 text-[15px] rounded-full font-medium',
};

/** Reusable CTA — renders <a>/<Link> when href is given, otherwise <button>. */
export default function Button({ href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${sizes[size] || ''} ${className}`;
  if (href) {
    const external = /^https?:/.test(href);
    return external ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
    ) : (
      <Link href={href} className={cls} {...rest}>{children}</Link>
    );
  }
  return <button type="button" className={cls} {...rest}>{children}</button>;
}