/**
 * GlossaryView — Glossary tab content for StudioProjectBoard
 *
 * Composes DomainGlossary molecule with auto-generated glossary entries
 * from the schema's entities, traits, and states.
 *
 * Event Contract:
 * - None (display only)
 */

import React from "react";
import { EmptyState } from "@almadar/ui";
import { DomainGlossary } from "../../molecules/domain/DomainGlossary";
import type { OrbitalSchema } from "@almadar/core";
import { extractGlossaryEntries } from "../../utils/extractDomainFromSchema";

export interface GlossaryViewProps {
  schema: OrbitalSchema;
  className?: string;
}

export function GlossaryView({ schema, className = "" }: GlossaryViewProps) {
  const entries = extractGlossaryEntries(schema);

  if (entries.length === 0) {
    return (
      <EmptyState
        title="No glossary entries"
        description="Add entities and traits to your schema to auto-generate a domain glossary."
        className={className}
      />
    );
  }

  return <DomainGlossary entries={entries} className={className} />;
}

GlossaryView.displayName = "GlossaryView";
