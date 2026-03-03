/**
 * StoryCatalogTemplate - Browse and discover Knowledge Stories.
 *
 * Pure declarative wrapper for StoryCatalogBoard organism.
 * No hooks, no callbacks, no local state.
 */

import React from 'react';
import { StoryCatalogBoard } from '../organisms/StoryCatalogBoard';
import type { StoryCatalogEntity } from '../organisms/StoryCatalogBoard';

export type { StoryCatalogEntity } from '../organisms/StoryCatalogBoard';

export interface StoryCatalogTemplateProps {
  entity: StoryCatalogEntity;
  className?: string;
}

export const StoryCatalogTemplate = ({
  entity,
  className,
}: StoryCatalogTemplateProps) => {
  return <StoryCatalogBoard entity={entity} className={className} />;
};

StoryCatalogTemplate.displayName = 'StoryCatalogTemplate';
