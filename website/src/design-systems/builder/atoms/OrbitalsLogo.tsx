/**
 * Orbitals Logo
 *
 * SVG logo representing a p orbital with curved lines emanating from center.
 * Lines leave the center and curve back to form the orbital lobes.
 * Features a teal-to-cyan gradient background with white orbital curves.
 */

import React from 'react';

export interface OrbitalsLogoProps {
  /** Size of the logo */
  size?: number | string;
  /** CSS class name */
  className?: string;
  /** Border radius for the background (0-50, where 50 is fully round) */
  borderRadius?: number;
}

export const OrbitalsLogo: React.FC<OrbitalsLogoProps> = ({
  size = 40,
  className = '',
  borderRadius = 12,
}) => {
  const cornerRadius = borderRadius;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="orbitalsBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="100" height="100" rx={cornerRadius} ry={cornerRadius} fill="url(#orbitalsBgGradient)" />

      {/* Top lobe */}
      <path d="M 50 50 Q 30 35, 35 15 Q 40 5, 50 8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 50 50 Q 70 35, 65 15 Q 60 5, 50 8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Bottom lobe */}
      <path d="M 50 50 Q 30 65, 35 85 Q 40 95, 50 92" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 50 50 Q 70 65, 65 85 Q 60 95, 50 92" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Inner curves for depth */}
      <path d="M 50 50 Q 38 40, 42 22 Q 45 12, 50 14" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 50 50 Q 62 40, 58 22 Q 55 12, 50 14" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 50 50 Q 38 60, 42 78 Q 45 88, 50 86" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 50 50 Q 62 60, 58 78 Q 55 88, 50 86" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />

      {/* Central node */}
      <circle cx="50" cy="50" r="4" fill="white" />
    </svg>
  );
};

OrbitalsLogo.displayName = 'OrbitalsLogo';
export default OrbitalsLogo;
