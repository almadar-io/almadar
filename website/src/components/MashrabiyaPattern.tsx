import React from "react";
import clsx from "clsx";

interface MashrabiyaPatternProps {
    className?: string;
    opacity?: number;
    scale?: number;
}

export default function MashrabiyaPattern({
    className,
    opacity = 0.1,
    scale = 1,
}: MashrabiyaPatternProps) {
    return (
        <svg
            className={clsx("mashrabiya-pattern", className)}
            width="100%"
            height="100%"
            style={{ opacity }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="khatamPattern"
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                    patternTransform={`scale(${scale})`}
                >
                    <style>
                        {`
                            @keyframes kf-orbit {
                                from { transform: rotate(0deg); }
                                to { transform: rotate(360deg); }
                            }
                            @keyframes kf-pulse {
                                0%, 100% { opacity: 0.2; }
                                50% { opacity: 0.5; }
                            }
                            .circuit-line {
                                stroke: var(--almadar-teal);
                                stroke-dasharray: 2 4;
                                opacity: 0.4;
                            }
                            .orbit-ring {
                                stroke: var(--ifm-color-emphasis-300);
                                fill: none;
                                stroke-width: 0.5;
                                opacity: 0.2;
                            }
                            [data-theme='dark'] .orbit-ring {
                                stroke: var(--ifm-color-emphasis-200);
                                opacity: 0.1;
                            }
                            .planet {
                                fill: var(--almadar-sand-gold);
                                opacity: 0.6;
                            }
                            .star-core {
                                stroke: var(--almadar-teal);
                                fill: none;
                                opacity: 0.3;
                            }
                        `}
                    </style>
                    <g fill="none">
                        {/* 
                           Celestial Arabesque (Orbit + Star)
                           Center: 30,30
                        */}

                        {/* 1. Orbit Rings (The "Almadar" Concept) */}
                        <circle cx="30" cy="30" r="18" className="orbit-ring" />
                        <circle cx="30" cy="30" r="28" className="orbit-ring" strokeDasharray="4 4" />

                        {/* 2. The Star Core (Rub el Hizb Geometry) */}
                        <g className="star-core">
                            {/* Static Star Base */}
                            <rect x="15" y="15" width="30" height="30" strokeWidth="0.5" />
                            <g transform="rotate(45, 30, 30)">
                                <rect x="15" y="15" width="30" height="30" strokeWidth="0.5" />
                            </g>
                        </g>

                        {/* 3. Orbiting Elements (Animation) */}
                        <g style={{ transformOrigin: '30px 30px', animation: 'kf-orbit 20s linear infinite' }}>
                            {/* Planet on Outer Ring */}
                            <circle cx="30" cy="2" r="1.5" className="planet" />
                            {/* Planet on Inner Ring (Opposite) */}
                            <circle cx="30" cy="48" r="1" className="planet" opacity="0.4" />
                        </g>

                        {/* Counter-Rotating Ring for complexity */}
                        <g style={{ transformOrigin: '30px 30px', animation: 'kf-orbit 30s linear infinite reverse' }}>
                            <circle cx="48" cy="30" r="1" className="planet" fill="var(--almadar-teal)" />
                        </g>

                        {/* 4. Central Pulse */}
                        <circle cx="30" cy="30" r="2" fill="var(--almadar-sand-gold)" style={{ animation: 'kf-pulse 4s infinite' }} />

                        {/* 5. Inter-Pattern Connectors (Lattice Grid) */}
                        <g className="orbit-ring" style={{ strokeWidth: 0.3, opacity: 0.15 }}>
                            {/* Horizontal Connectors */}
                            <path d="M 0 30 L 2 30" />
                            <path d="M 58 30 L 60 30" />

                            {/* Vertical Connectors */}
                            <path d="M 30 0 L 30 2" />
                            <path d="M 30 58 L 30 60" />

                            {/* Diagonal Lattice (X Grid) */}
                            <path d="M 0 0 L 10 10" />
                            <path d="M 60 0 L 50 10" />
                            <path d="M 0 60 L 10 50" />
                            <path d="M 60 60 L 50 50" />
                        </g>
                    </g>
                </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#khatamPattern)" />
        </svg>
    );
}
