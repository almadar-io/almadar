/* eslint-disable almadar/organism-extends-entity-display, almadar/require-event-bus */
/**
 * LearnBoard Organism
 *
 * Learning paths grid with create/delete actions,
 * empty/loading/error states.
 *
 * Events Emitted:
 * - UI:LEARNING_PATH_CLICK — user clicks a learning path, payload: { pathId, graphId }
 * - UI:CREATE_LEARNING_PATH — user clicks create new path
 * - UI:DELETE_LEARNING_PATH — user clicks delete path, payload: { pathId }
 */

import React, { useCallback } from 'react';
import { BookOpen, Plus, Trash2 } from 'lucide-react';
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
  LoadingState,
  ErrorState,
  useEventBus,
  useTranslate,
} from '@almadar/ui';

export interface LearnPathItem {
  id: string;
  graphId: string;
  name: string;
  seedConcept: string;
  conceptCount: number;
  levelCount: number;
  description?: string;
}

export interface LearnEntity {
  learningPaths: LearnPathItem[];
  loading: boolean;
  error?: string;
}

export interface LearnBoardProps {
  entity: LearnEntity;
  className?: string;
}

export function LearnBoard({
  entity,
  className = '',
}: LearnBoardProps): React.JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handlePathClick = useCallback((pathId: string, graphId: string) => {
    emit('UI:LEARNING_PATH_CLICK', { pathId, graphId });
  }, [emit]);

  const handleCreatePath = useCallback(() => {
    emit('UI:CREATE_LEARNING_PATH', {});
  }, [emit]);

  const handleDeletePath = useCallback((pathId: string) => {
    emit('UI:DELETE_LEARNING_PATH', { pathId });
  }, [emit]);

  if (entity.loading) {
    return (
      <Container size="lg" padding="sm" className={`py-6 ${className}`}>
        <LoadingState message={t('learn.loading')} />
      </Container>
    );
  }

  if (entity.error) {
    return (
      <Container size="lg" padding="sm" className={`py-6 ${className}`}>
        <ErrorState
          message={entity.error}
        />
      </Container>
    );
  }

  return (
    <Container size="lg" padding="sm" className={`py-6 ${className}`}>
      <VStack gap="lg">
        {/* Header with create button */}
        <HStack justify="between" align="center">
          <VStack gap="xs">
            <Typography variant="h1" className="text-2xl font-bold text-[var(--color-foreground)]">
              {t('learn.title')}
            </Typography>
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              {t('learn.subtitle')}
            </Typography>
          </VStack>
          <Button
            onClick={handleCreatePath}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            {t('learn.createPath')}
          </Button>
        </HStack>

        {/* Learning paths grid */}
        {entity.learningPaths.length > 0 ? (
          <SimpleGrid minChildWidth="300px" gap="md">
            {entity.learningPaths.map((path) => (
              <Card
                key={path.id}
                className="p-5 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handlePathClick(path.id, path.graphId)}
              >
                <VStack gap="sm">
                  <HStack justify="between" align="start">
                    <VStack gap="xs" className="flex-1 min-w-0">
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
                      className="p-1 text-[var(--color-muted-foreground)] hover:text-red-500 flex-shrink-0"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </HStack>

                  <HStack gap="sm">
                    <Badge variant="info" size="sm">
                      {t('learn.concepts', { count: path.conceptCount })}
                    </Badge>
                    <Badge variant="default" size="sm">
                      {t('learn.levels', { count: path.levelCount })}
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
          <Box className="py-8">
            <EmptyState
              icon={BookOpen}
              title={t('learn.emptyTitle')}
              description={t('learn.emptyDesc')}
              actionLabel={t('learn.createPath')}
              onAction={handleCreatePath}
            />
          </Box>
        )}
      </VStack>
    </Container>
  );
}

LearnBoard.displayName = 'LearnBoard';
