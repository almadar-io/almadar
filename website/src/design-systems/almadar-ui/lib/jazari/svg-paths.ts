/**
 * SVG path generators for the Al-Jazari state machine visualization.
 * Pure TypeScript — zero React/DOM dependencies.
 *
 * Generates paths for gear teeth, arabesque borders, pipe shapes, and lock icons.
 */

// ---------------------------------------------------------------------------
// Gear teeth path
// ---------------------------------------------------------------------------

/**
 * Generate an SVG path for gear teeth around a circle.
 *
 * @param cx - Center X
 * @param cy - Center Y
 * @param innerRadius - Inner radius (base circle)
 * @param outerRadius - Outer radius (tip of teeth)
 * @param numTeeth - Number of teeth around the gear
 * @returns SVG path d attribute string
 */
export function gearTeethPath(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  numTeeth: number,
): string {
  const parts: string[] = [];
  const angleStep = (Math.PI * 2) / numTeeth;
  const halfTooth = angleStep * 0.25;

  for (let i = 0; i < numTeeth; i++) {
    const baseAngle = i * angleStep;

    const x0 = cx + innerRadius * Math.cos(baseAngle - halfTooth);
    const y0 = cy + innerRadius * Math.sin(baseAngle - halfTooth);
    const x1 = cx + outerRadius * Math.cos(baseAngle - halfTooth * 0.4);
    const y1 = cy + outerRadius * Math.sin(baseAngle - halfTooth * 0.4);
    const x2 = cx + outerRadius * Math.cos(baseAngle + halfTooth * 0.4);
    const y2 = cy + outerRadius * Math.sin(baseAngle + halfTooth * 0.4);
    const x3 = cx + innerRadius * Math.cos(baseAngle + halfTooth);
    const y3 = cy + innerRadius * Math.sin(baseAngle + halfTooth);

    if (i === 0) {
      parts.push(`M ${x0.toFixed(1)} ${y0.toFixed(1)}`);
    } else {
      parts.push(`L ${x0.toFixed(1)} ${y0.toFixed(1)}`);
    }
    parts.push(`L ${x1.toFixed(1)} ${y1.toFixed(1)}`);
    parts.push(`L ${x2.toFixed(1)} ${y2.toFixed(1)}`);
    parts.push(`L ${x3.toFixed(1)} ${y3.toFixed(1)}`);
  }

  parts.push('Z');
  return parts.join(' ');
}

// ---------------------------------------------------------------------------
// Lock icon path (gear-lock for deterministic guards)
// ---------------------------------------------------------------------------

/**
 * Generate an SVG path for a small gear-shaped lock icon.
 *
 * @param cx - Center X
 * @param cy - Center Y
 * @param size - Overall size of the lock icon
 * @returns SVG path d attribute for the lock body + shackle
 */
export function lockIconPath(cx: number, cy: number, size: number): string {
  const half = size / 2;
  const bodyW = size * 0.7;
  const bodyH = size * 0.5;
  const bodyX = cx - bodyW / 2;
  const bodyY = cy - bodyH / 4;

  // Body rectangle
  const body = `M ${bodyX.toFixed(1)} ${bodyY.toFixed(1)} ` +
    `h ${bodyW.toFixed(1)} v ${bodyH.toFixed(1)} h ${(-bodyW).toFixed(1)} Z`;

  // Shackle arc
  const shR = size * 0.28;
  const shY = bodyY;
  const shackle = `M ${(cx - shR).toFixed(1)} ${shY.toFixed(1)} ` +
    `A ${shR.toFixed(1)} ${(shR * 1.2).toFixed(1)} 0 1 1 ${(cx + shR).toFixed(1)} ${shY.toFixed(1)}`;

  // Keyhole
  const kR = size * 0.08;
  const kY = bodyY + bodyH * 0.35;
  const keyhole = `M ${cx.toFixed(1)} ${(kY - kR).toFixed(1)} ` +
    `a ${kR.toFixed(1)} ${kR.toFixed(1)} 0 1 1 0 ${(kR * 2).toFixed(1)} ` +
    `a ${kR.toFixed(1)} ${kR.toFixed(1)} 0 1 1 0 ${(-kR * 2).toFixed(1)} Z`;

  void half;
  return `${body} ${shackle} ${keyhole}`;
}

// ---------------------------------------------------------------------------
// Brain icon path (for AI/call-service guards)
// ---------------------------------------------------------------------------

/**
 * Generate a simple brain-like icon path.
 *
 * @param cx - Center X
 * @param cy - Center Y
 * @param size - Overall size
 * @returns SVG path d attribute
 */
export function brainIconPath(cx: number, cy: number, size: number): string {
  const s = size / 2;
  // Simplified brain: two hemispheres
  return [
    `M ${cx.toFixed(1)} ${(cy - s).toFixed(1)}`,
    `C ${(cx - s * 1.2).toFixed(1)} ${(cy - s).toFixed(1)}, ${(cx - s * 1.3).toFixed(1)} ${(cy + s * 0.3).toFixed(1)}, ${cx.toFixed(1)} ${(cy + s).toFixed(1)}`,
    `C ${(cx + s * 1.3).toFixed(1)} ${(cy + s * 0.3).toFixed(1)}, ${(cx + s * 1.2).toFixed(1)} ${(cy - s).toFixed(1)}, ${cx.toFixed(1)} ${(cy - s).toFixed(1)}`,
    'Z',
    // Dividing line
    `M ${cx.toFixed(1)} ${(cy - s * 0.8).toFixed(1)}`,
    `C ${(cx - s * 0.2).toFixed(1)} ${(cy - s * 0.2).toFixed(1)}, ${(cx + s * 0.2).toFixed(1)} ${(cy + s * 0.2).toFixed(1)}, ${cx.toFixed(1)} ${(cy + s * 0.8).toFixed(1)}`,
  ].join(' ');
}

// ---------------------------------------------------------------------------
// Pipe icon path (for effects)
// ---------------------------------------------------------------------------

/**
 * Generate a simple pipe/tube icon path.
 *
 * @param cx - Center X
 * @param cy - Center Y
 * @param size - Overall size
 * @returns SVG path d attribute
 */
export function pipeIconPath(cx: number, cy: number, size: number): string {
  const w = size * 0.6;
  const h = size * 0.3;
  const flangeW = size * 0.8;
  const flangeH = size * 0.1;

  // Main tube
  const tube = `M ${(cx - w / 2).toFixed(1)} ${(cy - h / 2).toFixed(1)} ` +
    `h ${w.toFixed(1)} v ${h.toFixed(1)} h ${(-w).toFixed(1)} Z`;

  // Left flange
  const lf = `M ${(cx - flangeW / 2).toFixed(1)} ${(cy - h / 2 - flangeH).toFixed(1)} ` +
    `h ${flangeH.toFixed(1)} v ${(h + flangeH * 2).toFixed(1)} h ${(-flangeH).toFixed(1)} Z`;

  // Right flange
  const rf = `M ${(cx + flangeW / 2 - flangeH).toFixed(1)} ${(cy - h / 2 - flangeH).toFixed(1)} ` +
    `h ${flangeH.toFixed(1)} v ${(h + flangeH * 2).toFixed(1)} h ${(-flangeH).toFixed(1)} Z`;

  return `${tube} ${lf} ${rf}`;
}

// ---------------------------------------------------------------------------
// Arabesque border pattern (8-pointed star)
// ---------------------------------------------------------------------------

/**
 * Generate a single 8-pointed star path for the arabesque border pattern.
 *
 * @param cx - Center X
 * @param cy - Center Y
 * @param outerR - Outer radius (star tips)
 * @param innerR - Inner radius (star valleys)
 * @returns SVG path d attribute
 */
export function eightPointedStarPath(cx: number, cy: number, outerR: number, innerR: number): string {
  const points: string[] = [];
  const numPoints = 8;
  const angleStep = Math.PI / numPoints;

  for (let i = 0; i < numPoints * 2; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  points.push('Z');
  return points.join(' ');
}

// ---------------------------------------------------------------------------
// Arrowhead marker path
// ---------------------------------------------------------------------------

/**
 * Generate a simple arrowhead path for transition arm endpoints.
 *
 * @param size - Arrow size
 * @returns SVG path d attribute
 */
export function arrowheadPath(size: number): string {
  return `M 0 0 L ${size} ${size / 2} L 0 ${size} Z`;
}
