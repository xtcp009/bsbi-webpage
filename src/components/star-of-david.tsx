export function StarOfDavid({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <polygon fill="currentColor" points="32,4 54,42 10,42" />
      <polygon fill="currentColor" points="32,60 10,22 54,22" />
    </svg>
  );
}
