/**
 * KnowledgeBattleTemplate - Knowledge battle game view.
 * Pure declarative wrapper.
 */

import React from 'react';
import { KnowledgeBattleBoard } from '../../organisms/KnowledgeBattleBoard';
import type { KnowledgeBattleEntity } from '../../organisms/KnowledgeBattleBoard';

export type { KnowledgeBattleEntity } from '../../organisms/KnowledgeBattleBoard';

export interface KnowledgeBattleTemplateProps {
    entity: KnowledgeBattleEntity;
    className?: string;
}

export const KnowledgeBattleTemplate = ({ entity, className }: KnowledgeBattleTemplateProps) => {
    return <KnowledgeBattleBoard entity={entity} className={className} />;
};

KnowledgeBattleTemplate.displayName = 'KnowledgeBattleTemplate';
