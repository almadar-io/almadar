/**
 * BreadcrumbTrail — Domain → Discipline → Subject → Concept path with domain coloring.
 *
 * Uses @almadar/ui Breadcrumb molecule directly.
 *
 * Events Emitted:
 * - UI:NAVIGATE_BREADCRUMB — When a breadcrumb segment is clicked
 *
 * entityAware: false
 */

import React from "react";
import { Breadcrumb } from "@almadar/ui";
import type { KnowledgeDomainType } from "../types/knowledge";

export interface BreadcrumbSegment {
  label: string;
  type: "domain" | "discipline" | "subject" | "concept";
  id?: string;
}

export interface BreadcrumbTrailProps {
  segments: BreadcrumbSegment[];
  domain: KnowledgeDomainType;
  navigateEvent?: string;
  className?: string;
}

export const BreadcrumbTrail: React.FC<BreadcrumbTrailProps> = ({
  segments,
  navigateEvent,
  className,
}) => {
  const items = segments.map((segment, index) => ({
    label: segment.label,
    isCurrent: index === segments.length - 1,
    event: navigateEvent && index < segments.length - 1
      ? navigateEvent
      : undefined,
  }));

  return (
    <Breadcrumb items={items} className={className} />
  );
};

BreadcrumbTrail.displayName = "BreadcrumbTrail";
