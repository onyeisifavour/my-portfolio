export function LogoLoader({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      className={`logo-loader ${className}`.trim()}
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      role="img"
      aria-label="Loading"
    >
      <path
        id="hex"
        pathLength="100"
        d="M100 10 L175 70 L175 190 L100 250 L25 190 L25 70 Z"
      />
      <line id="spine" pathLength="100" x1="100" y1="10" x2="100" y2="130" />
      <line id="ray-ul" pathLength="100" x1="100" y1="130" x2="25" y2="70" />
      <line id="ray-ur" pathLength="100" x1="100" y1="130" x2="175" y2="70" />
      <line id="ray-lr" pathLength="100" x1="100" y1="130" x2="175" y2="190" />
      <line id="ray-ll" pathLength="100" x1="100" y1="130" x2="25" y2="190" />
      <circle id="node" cx="100" cy="130" r="0" />
    </svg>
  );
}