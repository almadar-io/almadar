/**
 * KnowledgeStoryTemplate - Five-step Knowledge Story wizard.
 *
 * Pure declarative wrapper for KnowledgeStoryBoard organism.
 * No hooks, no callbacks, no local state.
 */

import React from 'react';
import { KnowledgeStoryBoard } from '../organisms/KnowledgeStoryBoard';
import type { KnowledgeStoryEntity } from '../organisms/KnowledgeStoryBoard';

export type { KnowledgeStoryEntity } from '../organisms/KnowledgeStoryBoard';

export interface KnowledgeStoryTemplateProps {
  entity: KnowledgeStoryEntity;
  className?: string;
}

export const KnowledgeStoryTemplate = ({
  entity,
  className,
}: KnowledgeStoryTemplateProps) => {
  return <KnowledgeStoryBoard entity={entity} className={className} />;
};

KnowledgeStoryTemplate.displayName = 'KnowledgeStoryTemplate';
