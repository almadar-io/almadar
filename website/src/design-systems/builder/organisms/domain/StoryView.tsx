/**
 * StoryView — Story tab content for StudioProjectBoard
 *
 * Composes StoryHeader + DomainEntityCard molecules to show a
 * plain-language view of the project's domain: what entities exist,
 * what fields they have, and what states they go through.
 *
 * Event Contract:
 * - None (display only)
 */

import React from "react";
import { VStack, Typography, EmptyState } from "@almadar/ui";
import { StoryHeader } from "../../molecules/domain/StoryHeader";
import { DomainEntityCard } from "../../molecules/domain/DomainEntityCard";
import type { OrbitalSchema } from "@almadar/core";
import { extractStoryData } from "../../utils/extractDomainFromSchema";

export interface StoryViewProps {
  schema: OrbitalSchema;
  className?: string;
}

export function StoryView({ schema, className = "" }: StoryViewProps) {
  const domainContext = (schema as unknown as Record<string, unknown>).domainContext as
    | import("@almadar/core").DomainContext
    | undefined;
  const storyData = extractStoryData(schema);

  if (storyData.entityCards.length === 0 && !domainContext) {
    return (
      <EmptyState
        title="No story data"
        description="Add entities and traits to your schema to see the domain story."
        className={className}
      />
    );
  }

  return (
    <VStack gap="lg" className={className}>
      {domainContext && <StoryHeader domainContext={domainContext} />}

      {storyData.entityCards.length > 0 && (
        <VStack gap="md">
          <Typography variant="h4" color="muted">
            {storyData.entityCards.length === 1 ? "Entity" : "Entities"}
          </Typography>
          {storyData.entityCards.map((card) => (
            <DomainEntityCard
              key={card.name}
              name={card.name}
              description={card.description}
              fields={card.fields}
              states={card.states}
              initialState={card.initialState}
              storyMode
            />
          ))}
        </VStack>
      )}
    </VStack>
  );
}

StoryView.displayName = "StoryView";
