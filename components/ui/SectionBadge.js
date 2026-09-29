export default function SectionBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[12px] font-medium uppercase tracking-wide text-brand shadow-soft">
      <span className="h-2 w-2 rounded-full bg-brand ring-4 ring-brand/15 animate-pulseDot" />
      {children}
    </span>
  );
}
