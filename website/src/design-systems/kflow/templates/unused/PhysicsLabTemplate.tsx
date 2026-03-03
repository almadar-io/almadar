/**
 * PhysicsLabTemplate - Physics simulation lab view.
 * Pure declarative wrapper.
 */

import React from 'react';
import { PhysicsLabBoard } from '../../organisms/PhysicsLabBoard';
import type { PhysicsLabEntity } from '../../organisms/PhysicsLabBoard';

export type { PhysicsLabEntity } from '../../organisms/PhysicsLabBoard';

export interface PhysicsLabTemplateProps {
    entity: PhysicsLabEntity;
    className?: string;
}

export const PhysicsLabTemplate = ({ entity, className }: PhysicsLabTemplateProps) => {
    return <PhysicsLabBoard entity={entity} className={className} />;
};

PhysicsLabTemplate.displayName = 'PhysicsLabTemplate';
