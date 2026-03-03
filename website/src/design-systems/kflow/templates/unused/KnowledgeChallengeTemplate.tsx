/**
 * KnowledgeChallengeTemplate - Knowledge challenge game view.
 *
 * Pure declarative wrapper for KnowledgeChallengeBoard organism.
 * No hooks, no callbacks, no local state.
 */

import React from 'react';
import { KnowledgeChallengeBoard } from '../../organisms/KnowledgeChallengeBoard';
import type { KnowledgeChallengeEntity } from '../../organisms/KnowledgeChallengeBoard';

export type { KnowledgeChallengeEntity } from '../../organisms/KnowledgeChallengeBoard';

export interface KnowledgeChallengeTemplateProps {
    entity: KnowledgeChallengeEntity;
    className?: string;
}

export const KnowledgeChallengeTemplate = ({
    entity,
    className,
}: KnowledgeChallengeTemplateProps) => {
    return <KnowledgeChallengeBoard entity={entity} className={className} />;
};

KnowledgeChallengeTemplate.displayName = 'KnowledgeChallengeTemplate';
