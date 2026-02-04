import React, { useEffect, useRef } from 'react';
import styles from './OrbitalVisualization.module.css';

const OrbitalVisualization: React.FC = () => {
    return (
        <div className={styles.container}>
            <svg className={styles.canvas} viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="nucleusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--almadar-teal)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="var(--almadar-cyan)" stopOpacity="0.8" />
                    </linearGradient>
                    <radialGradient id="orbitGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="var(--almadar-sand-gold)" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Page / Domain Context (Outer Frame) */}
                <g className={styles.pageLayer}>
                    <rect x="50" y="50" width="700" height="400" rx="20"
                        fill="none" stroke="var(--almadar-midnight-light)" strokeWidth="2" strokeDasharray="10 5" />
                    <text x="80" y="90" fill="var(--almadar-parchment-muted)" fontSize="14" fontWeight="600">PAGE / ROUTE CONTEXT</text>
                </g>

                {/* Central System */}
                <g transform="translate(400, 250)">

                    {/* Orbits */}
                    <ellipse rx="150" ry="80" fill="none" stroke="var(--almadar-teal)" strokeOpacity="0.2" strokeWidth="1" className={styles.orbit1} />
                    <ellipse rx="150" ry="80" fill="none" stroke="var(--almadar-sand-gold)" strokeOpacity="0.2" strokeWidth="1" transform="rotate(60)" className={styles.orbit2} />
                    <ellipse rx="150" ry="80" fill="none" stroke="var(--almadar-cyan)" strokeOpacity="0.2" strokeWidth="1" transform="rotate(-60)" className={styles.orbit3} />

                    {/* Traits (Orbiting Electrons) */}
                    <g className={styles.electron1}>
                        <circle r="8" fill="var(--almadar-teal)" filter="url(#glow)" />
                        <text y="20" textAnchor="middle" fill="var(--almadar-teal)" fontSize="12" fontWeight="bold">UI Effect</text>
                    </g>
                    <g className={styles.electron2} transform="rotate(60)">
                        <circle r="8" fill="var(--almadar-sand-gold)" filter="url(#glow)" />
                        <text y="-15" textAnchor="middle" fill="var(--almadar-sand-gold)" fontSize="12" fontWeight="bold">State Machine</text>
                    </g>
                    <g className={styles.electron3} transform="rotate(-60)">
                        <circle r="8" fill="var(--almadar-cyan)" filter="url(#glow)" />
                        <text y="20" textAnchor="middle" fill="var(--almadar-cyan)" fontSize="12" fontWeight="bold">Data Logic</text>
                    </g>

                    {/* Nucleus (Entity) */}
                    <circle r="40" fill="url(#nucleusGrad)" filter="url(#glow)" className={styles.nucleus} />
                    <text y="5" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800">ENTITY</text>
                    <text y="25" textAnchor="middle" fill="#fff" fontSize="10" opacity="0.8">Data Model</text>

                </g>

                {/* Connecting Lines (Labeling) */}
                <g>
                    {/* Entity Label */}
                    <line x1="400" y1="290" x2="400" y2="400" stroke="var(--almadar-parchment-muted)" strokeWidth="1" opacity="0.5" />
                    <text x="400" y="420" textAnchor="middle" fill="var(--almadar-parchment-muted)" fontSize="12">
                        The core data structure
                    </text>

                    {/* Trait Label */}
                    <line x1="550" y1="200" x2="650" y2="150" stroke="var(--almadar-parchment-muted)" strokeWidth="1" opacity="0.5" />
                    <text x="650" y="140" textAnchor="end" fill="var(--almadar-parchment-muted)" fontSize="12">
                        <tspan x="650" dy="0" fontWeight="bold">TRAITS</tspan>
                        <tspan x="650" dy="15">Reusable behaviors & effects</tspan>
                    </text>
                </g>
            </svg>
        </div>
    );
};

export default OrbitalVisualization;
