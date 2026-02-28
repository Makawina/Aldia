export default function ManchaLandscape() {
  return (
    <svg
      width="100%"
      height="52"
      viewBox="0 0 400 52"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.12 }}
      aria-hidden="true"
    >
      {/* Rolling hills */}
      <path d="M0 42 Q50 28 100 36 Q150 44 200 32 Q250 20 300 34 Q350 46 400 30 L400 52 L0 52Z" fill="var(--color-olive)" />
      <path d="M0 48 Q80 38 160 44 Q240 50 320 40 Q360 36 400 42 L400 52 L0 52Z" fill="var(--color-earth)" />
      {/* Windmill */}
      <g transform="translate(320, 18)">
        <rect x="-1.5" y="0" width="3" height="16" fill="var(--color-olive)" rx="1" />
        <line x1="0" y1="2" x2="-10" y2="-4" stroke="var(--color-olive)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="0" y1="2" x2="10" y2="-4" stroke="var(--color-olive)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="0" y1="2" x2="-4" y2="-10" stroke="var(--color-olive)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="0" y1="2" x2="4" y2="10" stroke="var(--color-olive)" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      {/* Vineyard rows */}
      {[40, 80, 120, 160, 200].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${38 + (i % 2) * 3})`}>
          <circle cx="0" cy="0" r="2.5" fill="var(--color-olive)" />
          <circle cx="10" cy="-1" r="2" fill="var(--color-olive)" />
          <circle cx="20" cy="0.5" r="2.5" fill="var(--color-olive)" />
        </g>
      ))}
    </svg>
  );
}
