/**
 * KnowledgeWorldMapTemplate - Knowledge world map view.
 * Pure declarative wrapper.
 */

import React from 'react';
import { KnowledgeWorldMapBoard } from '../../organisms/KnowledgeWorldMapBoard';
import type { KnowledgeWorldMapEntity } from '../../organisms/KnowledgeWorldMapBoard';

export type { KnowledgeWorldMapEntity } from '../../organisms/KnowledgeWorldMapBoard';

export interface KnowledgeWorldMapTemplateProps {
    entity: KnowledgeWorldMapEntity;
    className?: string;
}

export const KnowledgeWorldMapTemplate = ({ entity, className }: KnowledgeWorldMapTemplateProps) => {
    return <KnowledgeWorldMapBoard entity={entity} className={className} />;
};

KnowledgeWorldMapTemplate.displayName = 'KnowledgeWorldMapTemplate';
