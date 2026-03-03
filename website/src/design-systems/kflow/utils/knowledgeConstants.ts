/**
 * Knowledge System Constants
 *
 * Shared color maps for domain badges, progress dots, and depth indicators.
 * Canvas hex colors mirror the Tailwind classes for use in <canvas> rendering.
 */

import type { KnowledgeDomainType, LearningStatus } from "../types/knowledge";

export interface DomainColorSet {
  bg: string;
  text: string;
  border: string;
  dot: string;
  /** Raw hex for canvas rendering (matches dot color) */
  hex: string;
  /** Light hex for canvas hover state */
  hexLight: string;
}

export const DOMAIN_COLORS: Record<KnowledgeDomainType, DomainColorSet> = {
  formal: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    border: "border-indigo-300",
    dot: "bg-indigo-500",
    hex: "#6366f1",
    hexLight: "#e0e7ff",
  },
  natural: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-300",
    dot: "bg-emerald-500",
    hex: "#10b981",
    hexLight: "#d1fae5",
  },
  social: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-300",
    dot: "bg-amber-500",
    hex: "#f59e0b",
    hexLight: "#fef3c7",
  },
} as const;

export const PROGRESS_STATUS_COLORS: Record<LearningStatus, string> = {
  unexplored: "bg-gray-300",
  curious: "bg-sky-400",
  studying: "bg-indigo-500",
  understood: "bg-emerald-500",
  teaching: "bg-amber-500",
} as const;

export const PROGRESS_STATUS_LABELS: Record<LearningStatus, string> = {
  unexplored: "Unexplored",
  curious: "Curious",
  studying: "Studying",
  understood: "Understood",
  teaching: "Teaching",
} as const;

export const DOMAIN_LABELS: Record<KnowledgeDomainType, string> = {
  formal: "Formal",
  natural: "Natural",
  social: "Social",
} as const;

/** Canvas text color — matches --color-foreground in dark theme context */
export const CANVAS_TEXT_COLOR = "#9ca3af";

/** Canvas link default color */
export const CANVAS_LINK_COLOR = "#d1d5db";

/** Canvas link selected color */
export const CANVAS_LINK_SELECTED_COLOR = "#6366f1";
