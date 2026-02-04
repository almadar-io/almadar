import React from 'react';
import styles from './OrbitalVisualization.module.css';

const OrbitalVisualization: React.FC = () => {
    return (
        <div className={styles.container}>
            <svg className={styles.canvas} viewBox="0 0 400 350" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <radialGradient id="entityGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="var(--almadar-cyan)" stopOpacity="0.9" />
                        <stop offset="70%" stopColor="var(--almadar-teal)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Page Context (Outer Frame) */}
                <g className={styles.pageFrame}>
                    <rect x="40" y="20" width="320" height="310" rx="16" fill="none" stroke="var(--almadar-midnight-light)" strokeWidth="1.5" strokeDasharray="6 4" />
                    <text x="55" y="45" fill="var(--almadar-parchment-dark)" fontSize="10" fontWeight="600" letterSpacing="1">PAGE CONTEXT</text>
                </g>

                {/* Central Core System */}
                <g transform="translate(200, 175)">

                    {/* Trait Rings (Gyroscope) */}
                    <g className={styles.gyroContainer}>
                        {/* Ring 1 */}
                        <ellipse rx="90" ry="25" fill="none" stroke="var(--almadar-sand-gold)" strokeWidth="2" className={styles.ring1} />
                        <circle r="4" fill="var(--almadar-sand-gold)" className={styles.electron1}>
                            <animateMotion dur="4s" repeatCount="indefinite" path="M -90 0 A 90 25 0 1 1 90 0 A 90 25 0 1 1 -90 0" />
                        </circle>

                        {/* Ring 2 */}
                        <ellipse rx="90" ry="25" fill="none" stroke="var(--almadar-sand-gold)" strokeWidth="2" className={styles.ring2} />
                        <circle r="4" fill="var(--almadar-sand-gold)" className={styles.electron2}>
                            <animateMotion dur="5s" repeatCount="indefinite" path="M -90 0 A 90 25 0 1 1 90 0 A 90 25 0 1 1 -90 0" />
                        </circle>

                        {/* Ring 3 */}
                        <ellipse rx="90" ry="25" fill="none" stroke="var(--almadar-sand-gold)" strokeWidth="2" className={styles.ring3} />
                    </g>

                    {/* Entity Nucleus */}
                    <g className={styles.nucleusGroup}>
                        <circle r="35" fill="url(#entityGrad)" filter="url(#coreGlow)" className={styles.core} />
                        <circle r="35" fill="none" stroke="var(--almadar-teal)" strokeWidth="1" opacity="0.5" />

                        {/* Internal Geometry (Rub el Hizb simplified) */}
                        <rect x="-12" y="-12" width="24" height="24" fill="none" stroke="white" strokeWidth="1" transform="rotate(45)" opacity="0.8" />
                        <rect x="-12" y="-12" width="24" height="24" fill="none" stroke="white" strokeWidth="1" opacity="0.8" />
                    </g>

                    {/* Labels */}
                    <g className={styles.labelGroup}>
                        <text y="55" textAnchor="middle" fill="var(--almadar-teal)" fontSize="12" fontWeight="700" letterSpacing="1">ENTITY</text>

                        {/* Connecting lines for Trait */}
                        <line x1="80" y1="-30" x2="110" y2="-50" stroke="var(--almadar-sand-gold)" strokeWidth="1" />
                        <text x="115" y="-55" fill="var(--almadar-sand-gold)" fontSize="12" fontWeight="700">TRAITS</text>
                        <text x="115" y="-40" fill="var(--almadar-parchment-dark)" fontSize="10">Behaviors</text>
                    </g>

                </g>
            </svg>
        </div>
    );
};

export default OrbitalVisualization;
