/** Fire a global event that <Modal /> listens to. */
export function openModal(detail) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('campuspe:modal', { detail }));
}
export function scrollToId(id) {
  const el = typeof document !== 'undefined' && document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
