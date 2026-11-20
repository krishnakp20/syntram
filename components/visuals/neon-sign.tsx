/**
 * Neon sign for the homepage hero: an orbit "AI core" icon and the words
 * "Grow with AI" drawn as glowing glass tubes on a dark wall, with mounting
 * clips and wires. Pure SVG + CSS (no images, no client JS). It flickers on at
 * load and hums gently; reduced-motion visitors see it steadily lit.
 * Decorative: the same message is in the page heading.
 */

const TUBE_GLOW = "#22b8ff";
const TUBE = "#8fe3ff";
const TUBE_CORE = "#f2fcff";

/** Mounting clips (x positions in the viewBox), each with a wire down. */
const clips = [214, 395, 560, 742, 905];

function Tubes({ href }: { href: string }) {
  return (
    <>
      {/* Wide soft glow on the wall */}
      <use href={href} stroke={TUBE_GLOW} strokeWidth={14} strokeOpacity={0.35} filter="url(#neon-wall)" />
      {/* Tight glow around the glass */}
      <use href={href} stroke={TUBE_GLOW} strokeWidth={7} strokeOpacity={0.85} filter="url(#neon-glass)" />
      {/* The glass tube and its hot core */}
      <use href={href} stroke={TUBE} strokeWidth={3.6} />
      <use href={href} stroke={TUBE_CORE} strokeWidth={1.3} />
    </>
  );
}

export function NeonSign({ className }: { className?: string }) {
  return (
    <svg
      viewBox="20 0 1018 340"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="neon-wall" x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="neon-glass" x="-10%" y="-40%" width="120%" height="180%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <radialGradient id="neon-spill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={TUBE_GLOW} stopOpacity="0.32" />
          <stop offset="100%" stopColor={TUBE_GLOW} stopOpacity="0" />
        </radialGradient>

        {/* Icon: an "AI core" orb with an orbit ring and a satellite */}
        <g id="neon-icon" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="150" cy="170" r="34" />
          <ellipse cx="150" cy="170" rx="82" ry="30" transform="rotate(-24 150 170)" />
          <circle cx="222" cy="134" r="7" />
        </g>
        <text
          id="neon-text"
          x="270"
          y="214"
          fill="none"
          fontFamily="var(--font-inter-tight), var(--font-inter), ui-sans-serif, system-ui, sans-serif"
          fontSize="132"
          fontWeight="400"
          letterSpacing="-1"
          strokeLinejoin="round"
        >
          Grow with AI
        </text>
      </defs>

      {/* Light spilling onto the wall */}
      <ellipse cx="529" cy="170" rx="540" ry="165" fill="url(#neon-spill)" className="motion-safe:animate-neon-on" />

      {/* Wires and clips (unlit hardware) */}
      <g stroke="#2a3346" strokeWidth="2" fill="none">
        {clips.map((x, i) => (
          <path key={x} d={`M${x} 236 C ${x + (i % 2 ? 14 : -14)} 280, ${x} 300, ${x + (i % 2 ? -6 : 6)} 340`} />
        ))}
        <path d="M118 236 C 112 280, 120 300, 114 340" />
      </g>
      <g fill="#323c52">
        {[118, ...clips].map((x) => (
          <rect key={x} x={x - 6} y={226} width={12} height={14} rx={2} />
        ))}
      </g>

      {/* Lit tubes */}
      <g className="motion-safe:animate-neon-on">
        <g className="motion-safe:animate-neon-hum">
          <Tubes href="#neon-icon" />
        </g>
        <Tubes href="#neon-text" />
      </g>
    </svg>
  );
}
