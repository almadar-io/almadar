/* eslint-disable almadar/organism-extends-entity-display, almadar/require-event-bus */
/**
 * DashboardBoard Organism
 *
 * Dashboard layout with stats, jump-back-in stories, learning paths,
 * recent activity, quick actions, and optional recommendations/achievements.
 *
 * Events Emitted:
 * - UI:QUICK_ACTION — user clicks a quick action, payload: { actionId }
 * - UI:ACTIVITY_CLICK — user clicks an activity item, payload: { activityId, type }
 * - UI:LEARNING_PATH_CLICK — user clicks a learning path, payload: { pathId, graphId }
 * - UI:CREATE_LEARNING_PATH — user clicks create new path
 * - UI:DELETE_LEARNING_PATH — user clicks delete path, payload: { pathId }
 * - UI:STORY_SELECT — (via JumpBackInRow) user clicks a story
 */

import React, { useCallback } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  BookOpen,
  Plus,
  Trash2,
  Clock,
} from 'lucide-react';
import {
  Box,
  VStack,
  HStack,
  Card,
  Button,
  Typography,
  SimpleGrid,
  Container,
  Badge,
  EmptyState,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { JumpBackInRow } from '../molecules/story/JumpBackInRow';
import type { JumpBackInStory } from '../molecules/story/JumpBackInCard';

export interface DashboardStat {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'flat';
}

export interface DashboardActivity {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  icon?: LucideIcon;
}

export interface DashboardLearningPath {
  id: string;
  graphId: string;
  name: string;
  seedConcept: string;
  conceptCount: number;
  levelCount: number;
  description?: string;
}

export interface DashboardQuickAction {
  id: string;
  label: string;
  icon?: LucideIcon;
  description?: string;
}

export interface DashboardEntity {
  welcomeName: string;
  stats: DashboardStat[];
  jumpBackInStories: JumpBackInStory[];
  recentActivity: DashboardActivity[];
  learningPaths: DashboardLearningPath[];
  quickActions: DashboardQuickAction[];
  recommendations?: Array<{ id: string; title: string; type: string }>;
  achievements?: Array<{ id: string; title: string; earnedAt: string }>;
}

export interface DashboardBoardProps {
  entity: DashboardEntity;
  className?: string;
}

const TrendIcon: React.FC<{ trend?: 'up' | 'down' | 'flat' }> = ({ trend }) => {
  if (trend === 'up') return <TrendingUp size={14} className="text-green-500" />;
  if (trend === 'down') return <TrendingDown size={14} className="text-red-500" />;
  if (trend === 'flat') return <Minus size={14} className="text-[var(--color-muted-foreground)]" />;
  return null;
};

TrendIcon.displayName = 'TrendIcon';

export function DashboardBoard({
  entity,
  className = '',
}: DashboardBoardProps): React.JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleQuickAction = useCallback((actionId: string) => {
    emit('UI:QUICK_ACTION', { actionId });
  }, [emit]);

  const handleActivityClick = useCallback((activityId: string, type: string) => {
    emit('UI:ACTIVITY_CLICK', { activityId, type });
  }, [emit]);

  const handlePathClick = useCallback((pathId: string, graphId: string) => {
    emit('UI:LEARNING_PATH_CLICK', { pathId, graphId });
  }, [emit]);

  const handleCreatePath = useCallback(() => {
    emit('UI:CREATE_LEARNING_PATH', {});
  }, [emit]);

  const handleDeletePath = useCallback((pathId: string) => {
    emit('UI:DELETE_LEARNING_PATH', { pathId });
  }, [emit]);

  return (
    <Container size="lg" padding="sm" className={`py-6 ${className}`}>
      <VStack gap="xl">
        {/* Welcome */}
        <Typography variant="h1" className="text-2xl font-bold text-[var(--color-foreground)]">
          {t('dashboard.welcome', { name: entity.welcomeName })}
        </Typography>

        {/* Stats grid */}
        {entity.stats.length > 0 && (
          <SimpleGrid minChildWidth="200px" gap="md">
            {entity.stats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <Card key={idx} className="p-4">
                  <VStack gap="xs">
                    <HStack justify="between" align="center">
                      <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                        {stat.label}
                      </Typography>
                      {StatIcon && <StatIcon size={16} className="text-[var(--color-muted-foreground)]" />}
                    </HStack>
                    <HStack gap="xs" align="center">
                      <Typography variant="h2" className="text-2xl font-bold text-[var(--color-foreground)]">
                        {stat.value}
                      </Typography>
                      <TrendIcon trend={stat.trend} />
                    </HStack>
                  </VStack>
                </Card>
              );
            })}
          </SimpleGrid>
        )}

        {/* Jump back in stories */}
        <JumpBackInRow
          stories={entity.jumpBackInStories}
          title={t('story.jumpBackIn')}
        />

        {/* Quick actions */}
        {entity.quickActions.length > 0 && (
          <VStack gap="sm">
            <Typography variant="h3" className="text-lg font-semibold text-[var(--color-foreground)]">
              {t('dashboard.quickActions')}
            </Typography>
            <HStack gap="sm" wrap>
              {entity.quickActions.map((action) => {
                const ActionIcon = action.icon;
                return (
                  <Button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    variant="secondary"
                    className="px-4 py-2 flex items-center gap-2"
                  >
                    {ActionIcon && <ActionIcon size={16} />}
                    <Typography variant="small">{action.label}</Typography>
                  </Button>
                );
              })}
            </HStack>
          </VStack>
        )}

        {/* Learning paths */}
        <VStack gap="sm">
          <HStack justify="between" align="center">
            <Typography variant="h3" className="text-lg font-semibold text-[var(--color-foreground)]">
              {t('dashboard.learningPaths')}
            </Typography>
            <Button
              onClick={handleCreatePath}
              variant="primary"
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              {t('dashboard.createPath')}
            </Button>
          </HStack>

          {entity.learningPaths.length > 0 ? (
            <SimpleGrid minChildWidth="280px" gap="md">
              {entity.learningPaths.map((path) => (
                <Card
                  key={path.id}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handlePathClick(path.id, path.graphId)}
                >
                  <VStack gap="sm">
                    <HStack justify="between" align="start">
                      <VStack gap="xs">
                        <Typography variant="h4" className="font-semibold text-[var(--color-foreground)]">
                          {path.name}
                        </Typography>
                        <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                          {path.seedConcept}
                        </Typography>
                      </VStack>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePath(path.id);
                        }}
                        className="p-1 text-[var(--color-muted-foreground)] hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </HStack>
                    <HStack gap="sm">
                      <Badge variant="info" size="sm">
                        {t('dashboard.concepts', { count: path.conceptCount })}
                      </Badge>
                      <Badge variant="default" size="sm">
                        {t('dashboard.levels', { count: path.levelCount })}
                      </Badge>
                    </HStack>
                    {path.description && (
                      <Typography variant="small" className="text-[var(--color-muted-foreground)] line-clamp-2">
                        {path.description}
                      </Typography>
                    )}
                  </VStack>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <EmptyState
              icon={BookOpen}
              title={t('dashboard.noPathsTitle')}
              description={t('dashboard.noPathsDesc')}
              actionLabel={t('dashboard.createPath')}
              onAction={handleCreatePath}
            />
          )}
        </VStack>

        {/* Recent activity */}
        {entity.recentActivity.length > 0 && (
          <VStack gap="sm">
            <Typography variant="h3" className="text-lg font-semibold text-[var(--color-foreground)]">
              {t('dashboard.recentActivity')}
            </Typography>
            <Card className="divide-y divide-[var(--color-border)]">
              {entity.recentActivity.map((activity) => {
                const ActivityIcon = activity.icon ?? Clock;
                return (
                  <Button
                    key={activity.id}
                    onClick={() => handleActivityClick(activity.id, activity.type)}
                    variant="ghost"
                    className="w-full text-left px-4 py-3 hover:bg-[var(--color-muted)] transition-colors"
                  >
                    <HStack gap="sm" align="center">
                      <ActivityIcon size={16} className="text-[var(--color-muted-foreground)] flex-shrink-0" />
                      <VStack gap="none" className="flex-1 min-w-0">
                        <Typography variant="small" className="font-medium text-[var(--color-foreground)] truncate">
                          {activity.title}
                        </Typography>
                        <Typography variant="small" className="text-xs text-[var(--color-muted-foreground)]">
                          {activity.timestamp}
                        </Typography>
                      </VStack>
                      <Badge variant="default" size="sm">
                        {activity.type}
                      </Badge>
                    </HStack>
                  </Button>
                );
              })}
            </Card>
          </VStack>
        )}

        {/* Achievements */}
        {entity.achievements && entity.achievements.length > 0 && (
          <VStack gap="sm">
            <Typography variant="h3" className="text-lg font-semibold text-[var(--color-foreground)]">
              {t('dashboard.achievements')}
            </Typography>
            <HStack gap="sm" wrap>
              {entity.achievements.map((achievement) => (
                <Badge key={achievement.id} variant="warning" size="md">
                  {achievement.title}
                </Badge>
              ))}
            </HStack>
          </VStack>
        )}
      </VStack>
    </Container>
  );
}

DashboardBoard.displayName = 'DashboardBoard';
