/**
 * SeriesViewTemplate
 *
 * Pure template wrapping SeriesViewBoard inside StoriesShellTemplate.
 * No hooks, no state - passes entity fields through to child organisms.
 */

import React from 'react';
import { StoriesShellTemplate } from './StoriesShellTemplate';
import { SeriesViewBoard } from '../organisms/SeriesViewBoard';
import type { SeriesViewEntity } from '../organisms/SeriesViewBoard';
import type { StoriesNavUser } from '../molecules/StoriesNavHeader';

export interface SeriesViewTemplateEntity extends SeriesViewEntity {
  shell: { activeRoute: 'series'; user?: StoriesNavUser };
}

export interface SeriesViewTemplateProps {
  entity: SeriesViewTemplateEntity;
  className?: string;
}

export const SeriesViewTemplate: React.FC<SeriesViewTemplateProps> = ({
  entity,
  className,
}) => (
  <StoriesShellTemplate entity={entity.shell}>
    <SeriesViewBoard entity={entity} className={className} />
  </StoriesShellTemplate>
);

SeriesViewTemplate.displayName = 'SeriesViewTemplate';
