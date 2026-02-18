/**
 * FlowView — Flow tab content for StudioProjectBoard
 *
 * Composes DomainFlowView molecules to visualize trait state machine
 * flows from the schema. Shows each trait's flow as a readable
 * process diagram.
 *
 * Event Contract:
 * - None (display only)
 */

import React from "react";
import { VStack, EmptyState } from "@almadar/ui";
import { DomainFlowView } from "../../molecules/domain/DomainFlowView";
import type { OrbitalSchema } from "@almadar/core";
import { extractFlowData } from "../../utils/extractDomainFromSchema";

export interface FlowViewProps {
  schema: OrbitalSchema;
  className?: string;
}

export function FlowView({ schema, className = "" }: FlowViewProps) {
  const flowData = extractFlowData(schema);

  if (flowData.flows.length === 0) {
    return (
      <EmptyState
        title="No flows"
        description="Add traits with state machines to your schema to see process flows."
        className={className}
      />
    );
  }

  return (
    <VStack gap="lg" className={className}>
      {flowData.flows.map((flow) => (
        <DomainFlowView
          key={flow.name}
          name={flow.name}
          states={flow.states}
          initialState={flow.initialState}
          transitions={flow.transitions}
          storyMode
        />
      ))}
    </VStack>
  );
}

FlowView.displayName = "FlowView";
