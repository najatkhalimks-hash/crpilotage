// components/UI.jsx
// All props match exact usage in pages/index.js — verified by audit.
import { getInterp } from '../lib/data';

// ── ScoreRing ─────────────────────────────────────────────────────────────────
// Props: score (number), size (number, default 80), stroke (number, default 7),
//        label (string, optional), sub (string, optional)
export function ScoreRing({ score, size = 80, stroke = 7, label, sub }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(score, 1));
  const interp = getInterp(score);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ transform: 'rotate(-90deg)', display: 'block' }}
        >
          {/* Track */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke="#1a2a3a"
            strokeWidth={stroke}
          />
          {/* Fill */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={interp.color}
            strokeWidth={stroke}
            strokeDasharray={`${circ}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        {/* Centre value */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: size * 0.195,
            color: interp.color,
            lineHeight: 1,
          }}>
            {score.toFixed(3)}
          </span>
        </div>
      </div>
      {label && (
        <span style={{
          fontSize: 11, fontWeight: 600, color: '#D1D5DB',
          textAlign: 'center', lineHeight: 1.3,
        }}>
          {label}
        </span>
      )}
      {sub && (
        <span style={{ fontSize: 10, color: '#6B7280', textAlign: 'center' }}>
          {sub}
        </span>
      )}
    </div>
  );
}

// ── KpiCard ───────────────────────────────────────────────────────────────────
// Props: label, value, unit (optional), sub (optional), color (optional), alert (bool)
export function KpiCard({ label, value, unit = '', sub, color = '#BF9000', alert = false }) {
  return (
    <div
      className="rounded-xl p-4 card-glow flex flex-col gap-1"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: alert ? '1px solid rgba(192,0,0,0.35)' : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#9CA3AF' }}>
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span
          className="mono font-bold"
          style={{ fontSize: 22, color, lineHeight: 1.1 }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm" style={{ color: '#9CA3AF' }}>{unit}</span>
        )}
      </div>
      {sub && (
        <span className="text-xs" style={{ color: '#6B7280' }}>{sub}</span>
      )}
    </div>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────
// Props: icon (string), title (string), subtitle (string, optional), color (optional)
export function SectionHeader({ icon, title, subtitle, color = '#BF9000' }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        {icon && <span style={{ fontSize: 24 }}>{icon}</span>}
        <h2 className="font-bold tracking-tight" style={{ fontSize: 20, color }}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-sm" style={{ color: '#9CA3AF', marginLeft: 36 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
// Props: label, color, bg (optional)
export function Badge({ label, color, bg }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{
        color,
        background: bg || (color + '22'),
        border: `1px solid ${color}44`,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

// ── HorizonBadge ──────────────────────────────────────────────────────────────
// Props: horizon ("CT" | "LT")
export function HorizonBadge({ horizon }) {
  return horizon === 'CT'
    ? <Badge label="⏱ Court Terme" color="#005757" bg="rgba(0,87,87,0.18)" />
    : <Badge label="📈 Long Terme"  color="#4B0082" bg="rgba(75,0,130,0.18)" />;
}

// ── ProgressBar ───────────────────────────────────────────────────────────────
// Props: value (0–max), max (default 1), color (optional), height (px, default 6)
export function ProgressBar({ value, max = 1, color, height = 6 }) {
  const pct = Math.min(value / max, 1) * 100;
  const interp = getInterp(max === 1 ? value : value / max);
  const fill = color || interp.color;
  return (
    <div
      style={{
        width: '100%', height, borderRadius: height / 2,
        background: '#1a2a3a', overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${pct}%`, height: '100%',
          borderRadius: height / 2, background: fill,
          transition: 'width 0.7s ease-out',
        }}
      />
    </div>
  );
}

// ── StatusDot ─────────────────────────────────────────────────────────────────
// Props: status ("✅" | "✔" | "⚠️" | "🔴")
export function StatusDot({ status }) {
  const palette = {
    '✅': '#2E7D32',
    '✔':  '#BF9000',
    '⚠️': '#843C0C',
    '🔴': '#C00000',
  };
  const c = palette[status] || '#6B7280';
  return (
    <span
      className="pulse-dot inline-block rounded-full flex-shrink-0"
      style={{ width: 8, height: 8, background: c }}
    />
  );
}

// ── MatrixCell ────────────────────────────────────────────────────────────────
// Props: val, isDiag (bool), isHeader (bool), hd (colour string)
// Used two ways in index.js:
//   <MatrixCell val={l}   isHeader hd={m.hd} />   — header cell (th)
//   <MatrixCell val={v}   isDiag={i===j} />         — data cell (td)
export function MatrixCell({ val, isDiag = false, isHeader = false, hd = '#1F3864' }) {
  const cellStyle = {
    padding: '4px 8px',
    textAlign: 'center',
    fontSize: 11,
    fontFamily: "'JetBrains Mono', monospace",
    border: '1px solid rgba(255,255,255,0.07)',
  };

  if (isHeader) {
    return (
      <th
        style={{
          ...cellStyle,
          background: hd,
          color: 'rgba(255,255,255,0.82)',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        {val}
      </th>
    );
  }

  // Determine background and colour for numeric data cells
  let bg = 'transparent';
  let fc = '#D1D5DB';
  if (isDiag) {
    bg = '#1a2a3a';
    fc = '#6B7280';
  } else if (typeof val === 'number') {
    if (val > 1) { bg = 'rgba(46,125,50,0.12)';  fc = '#4CAF50'; }
    if (val < 1) { bg = 'rgba(192,0,0,0.10)';    fc = '#EF9A9A'; }
    if (val === 1) { bg = 'transparent';           fc = '#D1D5DB'; }
  }

  // Format fractions as "1/n"
  let display = val;
  if (typeof val === 'number' && !isDiag) {
    if (val > 0 && val < 1) {
      const inv = Math.round(1 / val);
      display = `1/${inv}`;
    } else {
      display = Number.isInteger(val) ? val : val.toFixed(3);
    }
  }

  return (
    <td style={{ ...cellStyle, background: bg, color: fc }}>
      {display}
    </td>
  );
}

// ── InfoBox ───────────────────────────────────────────────────────────────────
// Props: children, color (optional), icon (optional)
export function InfoBox({ children, color = '#BF9000', icon = 'ℹ️' }) {
  return (
    <div
      className="rounded-lg p-4 text-sm leading-relaxed"
      style={{
        background: color + '12',
        border: `1px solid ${color}33`,
        color: '#D1D5DB',
      }}
    >
      {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
      {children}
    </div>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────
// Props: headers (string[]), rows (any[][]), compact (bool)
export function Table({ headers, rows, compact = false }) {
  const cellPx = compact ? '6px 8px' : '10px 12px';
  return (
    <div
      className="overflow-x-auto rounded-xl"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#1a2a3a' }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: cellPx,
                  textAlign: 'left',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#9CA3AF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{ padding: cellPx, color: '#D1D5DB', verticalAlign: 'middle' }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
