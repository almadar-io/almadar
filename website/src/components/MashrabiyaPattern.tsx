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
                            @keyframes kf-flow {
                                from { stroke-dashoffset: 20; }
                                to { stroke-dashoffset: 0; }
                            }
                            .circuit-line {
                                stroke: var(--almadar-teal);
                                stroke-dasharray: 5 15;
                                animation: kf-flow 3s linear infinite;
                                animation: kf-flow 3s linear infinite;
                                opacity: 0.3;
                            }
                        `}
                    </style>
                    <g fill="none" stroke="currentColor" strokeWidth="0.8">
                        {/* 
                           Khatam (Eight-Pointed Star) Tessellation 
                           Unit Size: 60x60
                           Center: 30,30
                        */}

                        {/* Base Geometry (Static) */}
                        <path d="M 30 5 L 55 30 L 30 55 L 5 30 Z" opacity="0.3" />
                        <rect x="14" y="14" width="32" height="32" opacity="0.3" />

                        {/* Circuit Current Overlay (Animated) */}
                        <path
                            d="M 30 5 L 55 30 L 30 55 L 5 30 Z"
                            className="circuit-line"
                            strokeWidth="1"
                        />

                        {/* Connecting traces */}
                        <path d="M 0 30 L 5 30" />
                        <path d="M 55 30 L 60 30" />
                        <path d="M 30 0 L 30 5" />
                        <path d="M 30 55 L 30 60" />

                        {/* Diagonal connectors */}
                        <path d="M 0 0 L 14 14" />
                        <path d="M 60 0 L 46 14" />
                        <path d="M 0 60 L 14 46" />
                        <path d="M 60 60 L 46 46" />
                    </g>
                </pattern>
            </defs>

            {/* Render the pattern filling the area */}
            <rect width="100%" height="100%" fill="url(#khatamPattern)" className="text-teal-600 dark:text-teal-400" />

            {/* Optional: Add a second layer for depth/complexity if needed, but keeping it clean for now */}
        </svg>
    );
}
