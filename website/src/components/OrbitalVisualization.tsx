import React, { useState } from 'react';
import styles from './OrbitalVisualization.module.css';

const OrbitalVisualization: React.FC = () => {
    const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

    // Layer configuration
    const layers = [
        {
            id: 'page',
            label: 'PAGE',
            sublabel: 'Route Context & Composition',
            color: 'var(--almadar-teal)',
            y: 60,
            icon: (
                <g transform="translate(370, 70)">
                    <rect x="0" y="0" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                    <line x1="0" y1="10" x2="60" y2="10" stroke="currentColor" strokeWidth="1" />
                    <rect x="5" y="15" width="20" height="20" fill="currentColor" opacity="0.3" />
                    <rect x="30" y="15" width="25" height="4" fill="currentColor" opacity="0.3" />
                    <rect x="30" y="23" width="20" height="4" fill="currentColor" opacity="0.3" />
                </g>
            )
        },
        {
            id: 'trait',
            label: 'TRAIT',
            sublabel: 'State Machine & Behavior',
            color: 'var(--almadar-sand-gold)',
            y: 180,
            icon: (
                <g transform="translate(370, 190)">
                    <circle cx="30" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                    <circle cx="30" cy="20" r="6" fill="currentColor" />
                    <path d="M 30 5 L 30 10 M 30 30 L 30 35 M 15 20 L 10 20 M 45 20 L 50 20" stroke="currentColor" strokeWidth="2" />
                </g>
            )
        },
        {
            id: 'entity',
            label: 'ENTITY',
            sublabel: 'Data Model & Persistence',
            color: 'var(--almadar-cyan)',
            y: 300,
            icon: (
                <g transform="translate(370, 310)">
                    <path d="M 10 10 L 50 10 L 50 30 L 10 30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <ellipse cx="30" cy="10" rx="20" ry="6" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" />
                    <path d="M 10 10 Q 30 22 50 10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    <line x1="10" y1="10" x2="10" y2="30" stroke="currentColor" strokeWidth="2" />
                    <line x1="50" y1="10" x2="50" y2="30" stroke="currentColor" strokeWidth="2" />
                    <path d="M 10 30 Q 30 42 50 30" fill="none" stroke="currentColor" strokeWidth="2" />
                </g>
            )
        }
    ];

    return (
        <div className={styles.container}>
            <svg
                className={styles.canvas}
                viewBox="0 0 800 500"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="fadeLine" x1="0" y1="0" x2="0" y2="100%">
                        <stop offset="0%" stopColor="var(--almadar-parchment-muted)" stopOpacity="0" />
                        <stop offset="20%" stopColor="var(--almadar-parchment-muted)" stopOpacity="0.4" />
                        <stop offset="80%" stopColor="var(--almadar-parchment-muted)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--almadar-parchment-muted)" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Central Axis Line */}
                <line x1="400" y1="80" x2="400" y2="360" stroke="url(#fadeLine)" strokeWidth="2" strokeDasharray="4 4" />

                {/* Layers */}
                {layers.map((layer, index) => {
                    const isHovered = hoveredLayer === layer.id;
                    const isDimmed = hoveredLayer && hoveredLayer !== layer.id;

                    return (
                        <g
                            key={layer.id}
                            className={styles.layerGroup}
                            onMouseEnter={() => setHoveredLayer(layer.id)}
                            onMouseLeave={() => setHoveredLayer(null)}
                            style={{ opacity: isDimmed ? 0.4 : 1, transition: 'opacity 0.3s ease' }}
                        >

                            {/* Connection Lines (Vertical) */}
                            {index < layers.length - 1 && (
                                <path
                                    d={`M 400 ${layer.y + 40} L 400 ${layers[index + 1].y}`}
                                    stroke={layer.color}
                                    strokeWidth="2"
                                    opacity={isHovered ? 1 : 0.2}
                                    className={styles.connectionLine}
                                />
                            )}

                            {/* Layer Plane (Isometric-ish Rect) */}
                            <g transform={`translate(200, ${layer.y})`}>
                                <path
                                    d="M 50 20 L 200 0 L 350 20 L 200 40 Z"
                                    fill={layer.color}
                                    fillOpacity={isHovered ? 0.15 : 0.05}
                                    stroke={layer.color}
                                    strokeWidth="2"
                                    className={styles.layerPlane}
                                />

                                {/* Side Label */}
                                <g transform="translate(-180, 20)" className={styles.labelGroup}>
                                    <text
                                        x="160"
                                        y="0"
                                        textAnchor="end"
                                        fill={layer.color}
                                        fontSize="18"
                                        fontWeight="800"
                                        letterSpacing="2"
                                    >
                                        {layer.label}
                                    </text>
                                    <text
                                        x="160"
                                        y="20"
                                        textAnchor="end"
                                        fill="var(--almadar-parchment-muted)"
                                        fontSize="12"
                                    >
                                        {layer.sublabel}
                                    </text>
                                    {/* Pointer Line */}
                                    <line x1="170" y1="-5" x2="220" y2="-5" stroke={layer.color} strokeWidth="1" opacity="0.5" />
                                </g>

                                {/* Icon Wrapper centered on plane */}
                                <g style={{ color: layer.color }} transform="translate(0,-160)">
                                    {/* Note: Icon SVG hardcoded coordinates need offset adjustment, 
                      easier to transform group here closer to 0,0 relative to parent */}
                                    {/* Actually keeping icon self-contained in definitions above is better 
                       but coordinates are global. Let's fix icon transform in definition or translate back. */}
                                    <g transform="translate(-370, -180)">
                                        {/* Re-centering icon logic: 
                           Icons were defined at ~370,190. 
                           Plane center is at 200, 20 (relative to group translate).
                           Need to center icon at 200, 20.
                           
                           Use cloned element approach? No, just render.
                           Let's re-define icons to be centered at 0,0 and translate them.
                        */}
                                    </g>
                                </g>
                            </g>

                            {/* Icon (Absolute Positioned for simplicity) */}
                            <g transform={`translate(0, ${layer.y - 190})`} style={{ color: layer.color }}>
                                {layer.icon}
                            </g>

                        </g>
                    );
                })}

                {/* Dynamic Data Flow Particles */}
                <circle r="4" fill="white" className={styles.particle}>
                    <animateMotion
                        path="M 400 320 L 400 200"
                        dur="2s"
                        repeatCount="indefinite"
                        begin="0s"
                    />
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="4" fill="white" className={styles.particle}>
                    <animateMotion
                        path="M 400 200 L 400 80"
                        dur="2s"
                        repeatCount="indefinite"
                        begin="1s"
                    />
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </circle>

            </svg>
        </div>
    );
};

export default OrbitalVisualization;
