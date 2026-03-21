'use client';
/**
 * OrbitalHeroBackground
 *
 * Sophisticated SVG animation for hero sections.
 * Multiple p-orbital layers with independent breathing animations,
 * flowing energy paths, and a pulsing central nucleus.
 *
 * The animation is purely CSS-driven (no JS requestAnimationFrame)
 * for maximum performance and SSR compatibility.
 */

import React from 'react';

interface OrbitalHeroBackgroundProps {
  /** Primary color - defaults to theme's primary */
  color?: string;
  /** Animation intensity: subtle for sub-pages, full for homepage */
  intensity?: 'subtle' | 'full';
  className?: string;
}

export const OrbitalHeroBackground: React.FC<OrbitalHeroBackgroundProps> = ({
  color,
  intensity = 'full',
  className,
}) => {
  const isFull = intensity === 'full';
  const baseOpacity = isFull ? 0.12 : 0.06;

  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Gradient using theme primary or explicit color */}
        <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color || 'var(--color-primary)'} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color || 'var(--color-primary)'} stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="heroGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color || 'var(--color-primary)'} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color || 'var(--color-primary)'} stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color || 'var(--color-primary)'} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color || 'var(--color-primary)'} stopOpacity="0" />
        </radialGradient>

        {/* Blur filter for glow effects */}
        <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>

      <style>{`
        /* Breathing animation - lobes expand and contract */
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes breatheSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Rotation - entire orbital slowly rotates */
        @keyframes driftRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes driftRotateReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        /* Pulse - nucleus throbs */
        @keyframes nucleusPulse {
          0%, 100% { r: 6; opacity: 0.6; }
          50% { r: 10; opacity: 0.3; }
        }

        /* Dash flow - energy flowing along orbital paths */
        @keyframes dashFlow {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes dashFlowReverse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 300; }
        }

        /* Fade in/out for layered depth */
        @keyframes fadeBreath {
          0%, 100% { opacity: ${baseOpacity}; }
          50% { opacity: ${baseOpacity * 2.5}; }
        }

        /* Vertical float */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .orbital-layer-1 {
          animation: driftRotate 90s linear infinite, breathe 8s ease-in-out infinite;
          transform-origin: 400px 300px;
          opacity: ${baseOpacity * 2};
        }
        .orbital-layer-2 {
          animation: driftRotateReverse 120s linear infinite, breatheSlow 12s ease-in-out infinite;
          transform-origin: 400px 300px;
          opacity: ${baseOpacity * 1.5};
        }
        .orbital-layer-3 {
          animation: driftRotate 150s linear infinite, breathe 6s ease-in-out infinite;
          transform-origin: 400px 300px;
          opacity: ${baseOpacity};
        }
        .energy-flow-1 {
          stroke-dasharray: 20 30;
          animation: dashFlow 4s linear infinite;
          opacity: ${baseOpacity * 3};
        }
        .energy-flow-2 {
          stroke-dasharray: 15 40;
          animation: dashFlowReverse 6s linear infinite;
          opacity: ${baseOpacity * 2};
        }
        .nucleus-outer {
          animation: nucleusPulse 4s ease-in-out infinite;
        }
        .nucleus-glow {
          animation: fadeBreath 4s ease-in-out infinite;
        }
        .floating-particle {
          animation: float 6s ease-in-out infinite;
        }
        .floating-particle-delay {
          animation: float 8s ease-in-out infinite;
          animation-delay: -3s;
        }
      `}</style>

      {/* Background glow wash */}
      <circle cx="400" cy="300" r="250" fill="url(#nucleusGlow)" className="nucleus-glow" />

      {/* Layer 1: Large outer orbital (vertical) */}
      <g className="orbital-layer-1">
        <ellipse cx="400" cy="200" rx="120" ry="160" stroke="url(#heroGrad1)" strokeWidth="1.5" />
        <ellipse cx="400" cy="400" rx="120" ry="160" stroke="url(#heroGrad1)" strokeWidth="1.5" />
        {/* Energy flow along outer orbital */}
        <ellipse cx="400" cy="200" rx="120" ry="160" stroke="url(#heroGrad1)" strokeWidth="2" className="energy-flow-1" />
      </g>

      {/* Layer 2: Rotated orbital (60 degrees) */}
      <g className="orbital-layer-2">
        <g transform="rotate(60 400 300)">
          <ellipse cx="400" cy="210" rx="100" ry="140" stroke="url(#heroGrad2)" strokeWidth="1" />
          <ellipse cx="400" cy="390" rx="100" ry="140" stroke="url(#heroGrad2)" strokeWidth="1" />
          <ellipse cx="400" cy="210" rx="100" ry="140" stroke="url(#heroGrad2)" strokeWidth="1.5" className="energy-flow-2" />
        </g>
      </g>

      {/* Layer 3: Another rotated orbital (120 degrees) */}
      <g className="orbital-layer-3">
        <g transform="rotate(120 400 300)">
          <ellipse cx="400" cy="220" rx="80" ry="120" stroke="url(#heroGrad1)" strokeWidth="0.8" />
          <ellipse cx="400" cy="380" rx="80" ry="120" stroke="url(#heroGrad1)" strokeWidth="0.8" />
        </g>
      </g>

      {isFull && (
        <>
          {/* Inner concentric lobes with breathing */}
          <g className="orbital-layer-1" style={{ animationDuration: '70s' }}>
            <ellipse cx="400" cy="240" rx="60" ry="80" stroke="url(#heroGrad2)" strokeWidth="0.8" opacity={baseOpacity * 2} />
            <ellipse cx="400" cy="360" rx="60" ry="80" stroke="url(#heroGrad2)" strokeWidth="0.8" opacity={baseOpacity * 2} />
          </g>

          {/* Floating particles - small circles drifting */}
          <circle cx="320" cy="180" r="3" fill={color || 'var(--color-primary)'} opacity={baseOpacity * 3} className="floating-particle" filter="url(#heroGlow)" />
          <circle cx="480" cy="380" r="2.5" fill={color || 'var(--color-primary)'} opacity={baseOpacity * 2.5} className="floating-particle-delay" filter="url(#heroGlow)" />
          <circle cx="520" cy="220" r="2" fill={color || 'var(--color-primary)'} opacity={baseOpacity * 2} className="floating-particle" filter="url(#heroGlow)" />
          <circle cx="280" cy="400" r="1.5" fill={color || 'var(--color-primary)'} opacity={baseOpacity * 2} className="floating-particle-delay" filter="url(#heroGlow)" />
        </>
      )}

      {/* Central nucleus with glow */}
      <circle cx="400" cy="300" r="60" fill="url(#nucleusGlow)" filter="url(#softGlow)" opacity={baseOpacity * 2} />
      <circle cx="400" cy="300" r="6" fill={color || 'var(--color-primary)'} opacity="0.5" className="nucleus-outer" filter="url(#heroGlow)" />
      <circle cx="400" cy="300" r="3" fill={color || 'var(--color-primary)'} opacity="0.8" />
    </svg>
  );
};

OrbitalHeroBackground.displayName = 'OrbitalHeroBackground';
