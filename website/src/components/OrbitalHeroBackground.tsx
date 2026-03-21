'use client';
/**
 * OrbitalHeroBackground
 *
 * Cycles through 5 distinct SVG animation variants every 8 seconds.
 * All use the p-orbital motif with different visual treatments.
 * Colors driven by --color-primary CSS variable.
 */

import React, { useState, useEffect } from 'react';

const C = 'var(--color-primary)';

const svgStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  overflow: 'hidden',
  transition: 'opacity 1.5s ease',
};

/* ── Variant 1: Breathing Orbitals ─────────────────────────────────────────── */
function BreathingOrbitals() {
  return (
    <svg viewBox="0 0 800 600" fill="none" style={svgStyle} aria-hidden="true">
      <defs>
        <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C} stopOpacity="0.7" />
          <stop offset="100%" stopColor={C} stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C} stopOpacity="0.3" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <filter id="blur1"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <style>{`
        @keyframes b1breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
        @keyframes b1rotate { to{transform:rotate(360deg)} }
        @keyframes b1pulse { 0%,100%{opacity:0.4;r:8} 50%{opacity:0.15;r:14} }
        .b1l1{animation:b1rotate 80s linear infinite,b1breathe 7s ease-in-out infinite;transform-origin:400px 300px;opacity:0.2}
        .b1l2{animation:b1rotate 110s linear infinite reverse,b1breathe 11s ease-in-out infinite;transform-origin:400px 300px;opacity:0.14}
        .b1l3{animation:b1rotate 140s linear infinite,b1breathe 5s ease-in-out infinite;transform-origin:400px 300px;opacity:0.08}
        .b1nuc{animation:b1pulse 4s ease-in-out infinite}
        .b1glow{animation:b1breathe 6s ease-in-out infinite;opacity:0.15}
      `}</style>
      <circle cx="400" cy="300" r="200" fill="url(#glow1)" className="b1glow" />
      <g className="b1l1">
        <ellipse cx="400" cy="180" rx="130" ry="170" stroke="url(#bg1)" strokeWidth="1.5" />
        <ellipse cx="400" cy="420" rx="130" ry="170" stroke="url(#bg1)" strokeWidth="1.5" />
      </g>
      <g className="b1l2">
        <g transform="rotate(60 400 300)">
          <ellipse cx="400" cy="190" rx="110" ry="150" stroke="url(#bg1)" strokeWidth="1" />
          <ellipse cx="400" cy="410" rx="110" ry="150" stroke="url(#bg1)" strokeWidth="1" />
        </g>
      </g>
      <g className="b1l3">
        <g transform="rotate(120 400 300)">
          <ellipse cx="400" cy="200" rx="90" ry="130" stroke="url(#bg1)" strokeWidth="0.7" />
          <ellipse cx="400" cy="400" rx="90" ry="130" stroke="url(#bg1)" strokeWidth="0.7" />
        </g>
      </g>
      <circle cx="400" cy="300" r="8" fill={C} opacity="0.4" className="b1nuc" filter="url(#blur1)" />
      <circle cx="400" cy="300" r="3" fill={C} opacity="0.7" />
    </svg>
  );
}

/* ── Variant 2: Energy Streams ─────────────────────────────────────────────── */
function EnergyStreams() {
  return (
    <svg viewBox="0 0 800 600" fill="none" style={svgStyle} aria-hidden="true">
      <defs>
        <linearGradient id="bg2a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C} stopOpacity="0.6" />
          <stop offset="100%" stopColor={C} stopOpacity="0.1" />
        </linearGradient>
        <filter id="blur2"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <style>{`
        @keyframes b2flow { to{stroke-dashoffset:0} }
        @keyframes b2flowR { to{stroke-dashoffset:600} }
        @keyframes b2drift { to{transform:rotate(360deg)} }
        @keyframes b2float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }
        .b2s1{stroke-dasharray:25 35;animation:b2flow 3s linear infinite;opacity:0.3}
        .b2s2{stroke-dasharray:15 45;animation:b2flowR 5s linear infinite;opacity:0.2}
        .b2s3{stroke-dasharray:10 50;animation:b2flow 7s linear infinite;opacity:0.15}
        .b2wrap{animation:b2drift 100s linear infinite;transform-origin:400px 300px}
        .b2p{animation:b2float 5s ease-in-out infinite;filter:url(#blur2)}
        .b2pd{animation:b2float 7s ease-in-out infinite;animation-delay:-2.5s;filter:url(#blur2)}
      `}</style>
      <g className="b2wrap">
        <ellipse cx="400" cy="170" rx="140" ry="180" stroke="url(#bg2a)" strokeWidth="2" className="b2s1" />
        <ellipse cx="400" cy="430" rx="140" ry="180" stroke="url(#bg2a)" strokeWidth="2" className="b2s1" />
        <ellipse cx="400" cy="170" rx="140" ry="180" stroke="url(#bg2a)" strokeWidth="1" className="b2s2" />
      </g>
      <g className="b2wrap" style={{ animationDirection: 'reverse', animationDuration: '130s' }}>
        <g transform="rotate(72 400 300)">
          <ellipse cx="400" cy="190" rx="120" ry="155" stroke="url(#bg2a)" strokeWidth="1.5" className="b2s2" />
          <ellipse cx="400" cy="410" rx="120" ry="155" stroke="url(#bg2a)" strokeWidth="1.5" className="b2s3" />
        </g>
      </g>
      <g className="b2wrap" style={{ animationDuration: '160s' }}>
        <g transform="rotate(144 400 300)">
          <ellipse cx="400" cy="210" rx="100" ry="130" stroke="url(#bg2a)" strokeWidth="1" className="b2s3" />
          <ellipse cx="400" cy="390" rx="100" ry="130" stroke="url(#bg2a)" strokeWidth="1" className="b2s2" />
        </g>
      </g>
      <circle cx="340" cy="200" r="3" fill={C} opacity="0.35" className="b2p" />
      <circle cx="460" cy="400" r="2.5" fill={C} opacity="0.3" className="b2pd" />
      <circle cx="500" cy="240" r="2" fill={C} opacity="0.25" className="b2p" />
      <circle cx="300" cy="380" r="1.5" fill={C} opacity="0.2" className="b2pd" />
      <circle cx="400" cy="300" r="4" fill={C} opacity="0.6" />
    </svg>
  );
}

/* ── Variant 3: Wave Interference ──────────────────────────────────────────── */
function WaveInterference() {
  return (
    <svg viewBox="0 0 800 600" fill="none" style={svgStyle} aria-hidden="true">
      <defs>
        <radialGradient id="glow3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C} stopOpacity="0.25" />
          <stop offset="70%" stopColor={C} stopOpacity="0.05" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <style>{`
        @keyframes b3expand { 0%{r:20;opacity:0.25;stroke-width:2} 100%{r:250;opacity:0;stroke-width:0.5} }
        @keyframes b3spin { to{transform:rotate(360deg)} }
        @keyframes b3breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        .b3ring{animation:b3expand 6s ease-out infinite;transform-origin:400px 300px}
        .b3r2{animation-delay:1.5s}
        .b3r3{animation-delay:3s}
        .b3r4{animation-delay:4.5s}
        .b3orb{animation:b3spin 60s linear infinite,b3breathe 8s ease-in-out infinite;transform-origin:400px 300px;opacity:0.15}
        .b3orbR{animation:b3spin 90s linear infinite reverse,b3breathe 12s ease-in-out infinite;transform-origin:400px 300px;opacity:0.1}
      `}</style>
      <circle cx="400" cy="300" r="200" fill="url(#glow3)" />
      <circle cx="400" cy="300" r="20" fill="none" stroke={C} strokeWidth="2" opacity="0.2" className="b3ring" />
      <circle cx="400" cy="300" r="20" fill="none" stroke={C} strokeWidth="2" opacity="0.2" className="b3ring b3r2" />
      <circle cx="400" cy="300" r="20" fill="none" stroke={C} strokeWidth="2" opacity="0.2" className="b3ring b3r3" />
      <circle cx="400" cy="300" r="20" fill="none" stroke={C} strokeWidth="2" opacity="0.2" className="b3ring b3r4" />
      <g className="b3orb">
        <ellipse cx="400" cy="180" rx="100" ry="160" stroke={C} strokeWidth="1" />
        <ellipse cx="400" cy="420" rx="100" ry="160" stroke={C} strokeWidth="1" />
      </g>
      <g className="b3orbR">
        <g transform="rotate(90 400 300)">
          <ellipse cx="400" cy="190" rx="90" ry="145" stroke={C} strokeWidth="0.8" />
          <ellipse cx="400" cy="410" rx="90" ry="145" stroke={C} strokeWidth="0.8" />
        </g>
      </g>
      <circle cx="400" cy="300" r="5" fill={C} opacity="0.5" />
    </svg>
  );
}

/* ── Variant 4: Constellation Grid ─────────────────────────────────────────── */
function ConstellationGrid() {
  const nodes = [
    [200,150],[350,120],[500,160],[650,140],
    [150,300],[300,280],[400,300],[500,320],[680,290],
    [220,450],[380,470],[550,440],[660,460],
  ];
  const edges = [
    [0,1],[1,2],[2,3],[0,4],[1,5],[2,7],[3,8],[4,5],[5,6],[6,7],[7,8],[4,9],[5,10],[7,11],[8,12],[9,10],[10,11],[11,12],
  ];
  return (
    <svg viewBox="0 0 800 600" fill="none" style={svgStyle} aria-hidden="true">
      <style>{`
        @keyframes b4pulse { 0%,100%{opacity:0.15} 50%{opacity:0.35} }
        @keyframes b4dash { to{stroke-dashoffset:0} }
        @keyframes b4glow { 0%,100%{r:3;opacity:0.4} 50%{r:5;opacity:0.2} }
        .b4edge{stroke-dasharray:8 12;animation:b4dash 3s linear infinite;opacity:0.12}
        .b4node{animation:b4glow 4s ease-in-out infinite}
        .b4n2{animation-delay:0.7s}
        .b4n3{animation-delay:1.4s}
        .b4n4{animation-delay:2.1s}
        .b4bg{animation:b4pulse 8s ease-in-out infinite}
      `}</style>
      {edges.map(([a,b],i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={C} strokeWidth="0.8" className="b4edge"
          style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
      {nodes.map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={C}
          className={`b4node ${i % 4 === 1 ? 'b4n2' : i % 4 === 2 ? 'b4n3' : i % 4 === 3 ? 'b4n4' : ''}`} />
      ))}
      <circle cx="400" cy="300" r="6" fill={C} opacity="0.5" className="b4node" />
    </svg>
  );
}

/* ── Variant 5: Morphing Lobe Field ────────────────────────────────────────── */
function MorphingLobeField() {
  return (
    <svg viewBox="0 0 800 600" fill="none" style={svgStyle} aria-hidden="true">
      <defs>
        <radialGradient id="glow5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C} stopOpacity="0.2" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </radialGradient>
        <filter id="turb5">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="5">
            <animate attributeName="seed" values="1;10;1" dur="20s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="18" />
        </filter>
      </defs>
      <style>{`
        @keyframes b5morph { 0%,100%{transform:scale(1) rotate(0deg)} 33%{transform:scale(1.08) rotate(3deg)} 66%{transform:scale(0.95) rotate(-2deg)} }
        @keyframes b5spin { to{transform:rotate(360deg)} }
        @keyframes b5pulse { 0%,100%{opacity:0.12} 50%{opacity:0.22} }
        .b5field{animation:b5morph 15s ease-in-out infinite;transform-origin:400px 300px;opacity:0.18}
        .b5f2{animation:b5morph 20s ease-in-out infinite;animation-delay:-5s;transform-origin:400px 300px;opacity:0.12}
        .b5spin{animation:b5spin 70s linear infinite;transform-origin:400px 300px}
        .b5bg{animation:b5pulse 6s ease-in-out infinite}
      `}</style>
      <circle cx="400" cy="300" r="220" fill="url(#glow5)" className="b5bg" />
      <g className="b5field" filter="url(#turb5)">
        <ellipse cx="400" cy="180" rx="130" ry="170" stroke={C} strokeWidth="1.5" />
        <ellipse cx="400" cy="420" rx="130" ry="170" stroke={C} strokeWidth="1.5" />
        <ellipse cx="400" cy="210" rx="80" ry="110" stroke={C} strokeWidth="1" opacity="0.6" />
        <ellipse cx="400" cy="390" rx="80" ry="110" stroke={C} strokeWidth="1" opacity="0.6" />
      </g>
      <g className="b5f2">
        <g transform="rotate(45 400 300)">
          <ellipse cx="400" cy="190" rx="110" ry="150" stroke={C} strokeWidth="0.8" />
          <ellipse cx="400" cy="410" rx="110" ry="150" stroke={C} strokeWidth="0.8" />
        </g>
      </g>
      <g className="b5spin" style={{ opacity: 0.08 }}>
        <g transform="rotate(90 400 300)">
          <ellipse cx="400" cy="200" rx="90" ry="130" stroke={C} strokeWidth="0.6" />
          <ellipse cx="400" cy="400" rx="90" ry="130" stroke={C} strokeWidth="0.6" />
        </g>
      </g>
      <circle cx="400" cy="300" r="4" fill={C} opacity="0.5" />
    </svg>
  );
}

/* ── Carousel ──────────────────────────────────────────────────────────────── */

const VARIANTS = [BreathingOrbitals, EnergyStreams, WaveInterference, ConstellationGrid, MorphingLobeField];
const LABELS = ['Breathing Orbitals', 'Energy Streams', 'Wave Interference', 'Constellation Grid', 'Morphing Lobe Field'];
const CYCLE_MS = 8000;

export const OrbitalHeroBackground: React.FC<{ className?: string }> = ({ className }) => {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % VARIANTS.length);
        setFading(false);
      }, 800);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  const ActiveVariant = VARIANTS[active];

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: fading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
      <ActiveVariant />
      {/* Label for preview - remove in production */}
      <div style={{
        position: 'absolute', bottom: 12, right: 16, fontSize: '0.7rem',
        color: 'var(--color-muted-foreground)', opacity: 0.5, fontFamily: 'monospace',
      }}>
        {active + 1}/5: {LABELS[active]}
      </div>
    </div>
  );
};

OrbitalHeroBackground.displayName = 'OrbitalHeroBackground';
