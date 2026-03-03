/**
 * CrossDomainDiscoveryTemplate - Cross-domain discovery viewer.
 *
 * Pure declarative wrapper for CrossDomainDiscoveryBoard organism.
 * No hooks, no callbacks, no local state.
 *
 * Page: CrossDomainDiscoveryPage
 * Entity: CrossDomainDiscoveryEntity
 * ViewType: detail
 *
 * Events Emitted (via CrossDomainDiscoveryBoard):
 * - UI:SELECT_NODE
 */

import React from "react";
import { CrossDomainDiscoveryBoard } from "../../organisms/CrossDomainDiscoveryBoard";
import type { CrossDomainDiscoveryEntity } from "../../organisms/CrossDomainDiscoveryBoard";

export type { CrossDomainDiscoveryEntity } from "../../organisms/CrossDomainDiscoveryBoard";

export interface CrossDomainDiscoveryTemplateProps {
  entity: CrossDomainDiscoveryEntity;
  className?: string;
}

export const CrossDomainDiscoveryTemplate = ({
  entity,
  className,
}: CrossDomainDiscoveryTemplateProps) => {
  return (
    <CrossDomainDiscoveryBoard
      entity={entity}
      className={className}
    />
  );
};

CrossDomainDiscoveryTemplate.displayName = "CrossDomainDiscoveryTemplate";
