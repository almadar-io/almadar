'use client';
/**
 * AmbientGlows
 *
 * Three soft radial gradient spots that act as ambient lighting behind
 * key content sections: hero (teal), stats (gold), and CTA (teal).
 *
 * Uses CSS variables so colors adapt to both light and dark modes.
 * Pure decorative overlay with pointer-events disabled.
 */

import React from 'react';

const AmbientGlows: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={className}
        style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
        }}
        aria-hidden="true"
    >
        <defs>
            {/* Hero glow: teal, upper-right */}
            <radialGradient id="ag-hero" cx="65%" cy="20%" r="25%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.10" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
            {/* Stats glow: sand gold, center-left */}
            <radialGradient id="ag-stats" cx="30%" cy="70%" r="20%">
                <stop offset="0%" stopColor="var(--color-gold, #c9a227)" stopOpacity="0.05" />
                <stop offset="100%" stopColor="var(--color-gold, #c9a227)" stopOpacity="0" />
            </radialGradient>
            {/* CTA glow: teal, bottom-center */}
            <radialGradient id="ag-cta" cx="50%" cy="90%" r="18%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.06" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#ag-hero)" />
        <rect width="100" height="100" fill="url(#ag-stats)" />
        <rect width="100" height="100" fill="url(#ag-cta)" />
    </svg>
);

AmbientGlows.displayName = 'AmbientGlows';

export default AmbientGlows;
