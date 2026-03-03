/* eslint-disable almadar/organism-extends-entity-display */
/**
 * KnowledgeWorldMapBoard Organism (Milestone 9)
 *
 * Knowledge world map: domains → terrain types, mastery → region unlocking.
 *
 * Domains → terrain:
 * - Formal = crystal (mathematics, CS, logic)
 * - Natural = forest (physics, biology, chemistry)
 * - Social = cities (economics, history, philosophy)
 *
 * Events Emitted:
 * - UI:SELECT_REGION — User selects a region
 * - UI:START_CHALLENGE — User starts a challenge from a region
 * - UI:NAVIGATE_MAP — User navigates between regions
 */

import React, { useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Typography,
  Card,
  Button,
  Container,
  Icon,
  PageHeader,
  Section,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { MapPin, Lock, Unlock, Sword, Star, Compass } from 'lucide-react';
import type { KnowledgeRegion, KnowledgePlayer, KnowledgeChallenge } from '../types/knowledge';
import { DomainBadge } from '../atoms/DomainBadge';
import { XpCounter } from '../atoms/XpCounter';

export interface KnowledgeWorldMapEntity {
  regions: KnowledgeRegion[];
  player: KnowledgePlayer;
  currentRegion: string;
  availableChallenges: KnowledgeChallenge[];
}

export interface KnowledgeWorldMapBoardProps {
  entity: KnowledgeWorldMapEntity;
  className?: string;
}

export function KnowledgeWorldMapBoard({
  entity,
  className = '',
}: KnowledgeWorldMapBoardProps): React.JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const { regions, player, currentRegion, availableChallenges } = entity;

  const handleSelectRegion = useCallback((regionId: string) => {
    emit('UI:SELECT_REGION', { regionId });
  }, [emit]);

  const handleStartChallenge = useCallback((challengeId: string) => {
    emit('UI:START_CHALLENGE', { challengeId });
  }, [emit]);

  const handleNavigate = useCallback((fromRegion: string, toRegion: string) => {
    emit('UI:NAVIGATE_MAP', { fromRegion, toRegion });
  }, [emit]);

  const activeRegion = regions.find(r => r.id === currentRegion);
  const regionChallenges = availableChallenges.filter(
    c => activeRegion?.challenges.includes(c.id),
  );
  const adjacentRegions = activeRegion
    ? regions.filter(r => activeRegion.adjacentRegions.includes(r.id))
    : [];

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <PageHeader
        title={player.name}
        subtitle={t('worldMap.level', { level: player.level, archetype: player.archetype })}
      >
        <HStack gap="md">
          <XpCounter xp={player.domainXP.formal} domain="formal" label={t('worldMap.formal')} />
          <XpCounter xp={player.domainXP.natural} domain="natural" label={t('worldMap.natural')} />
          <XpCounter xp={player.domainXP.social} domain="social" label={t('worldMap.social')} />
        </HStack>
      </PageHeader>

      <Container size="lg" padding="sm" className="py-6">
        <VStack gap="lg">
          {/* Region list */}
          <VStack gap="sm">
            {regions.map((region) => {
              const isCurrent = region.id === currentRegion;
              return (
                <Card
                  key={region.id}
                  className={`cursor-pointer transition-all ${isCurrent ? 'ring-2 ring-indigo-500' : ''} ${!region.unlocked ? 'opacity-50' : ''}`}
                  onClick={() => region.unlocked && handleSelectRegion(region.id)}
                >
                  <HStack justify="between" align="center">
                    <HStack gap="sm" align="center">
                      <Icon
                        icon={region.unlocked ? Unlock : Lock}
                        size="sm"
                        className={region.unlocked ? 'text-[var(--color-success)]' : 'text-[var(--color-muted-foreground)]'}
                      />
                      <VStack gap="xs">
                        <Typography variant="small" className="font-semibold text-[var(--color-foreground)]">
                          {region.name}
                        </Typography>
                        <HStack gap="xs" align="center">
                          <DomainBadge domain={region.domain} size="sm" />
                          {region.challenges.length > 0 && (
                            <Typography variant="small" className="text-xs text-[var(--color-muted-foreground)]">
                              {region.challenges.length} {region.challenges.length !== 1 ? t('worldMap.challenges') : t('worldMap.challenge')}
                            </Typography>
                          )}
                        </HStack>
                      </VStack>
                    </HStack>
                    {isCurrent && (
                      <HStack gap="xs" align="center">
                        <MapPin size={14} className="text-[var(--color-primary)]" />
                        <Typography variant="small" className="text-xs text-[var(--color-primary)]">
                          {t('worldMap.current')}
                        </Typography>
                      </HStack>
                    )}
                  </HStack>
                </Card>
              );
            })}
          </VStack>

          {/* Active region detail */}
          {activeRegion && (
            <VStack gap="md">
              <Section variant="card">
                <VStack gap="sm">
                  <HStack gap="sm" align="center">
                    <DomainBadge domain={activeRegion.domain} size="md" />
                    <Typography variant="h1" className="text-xl font-bold text-[var(--color-foreground)]">
                      {activeRegion.name}
                    </Typography>
                  </HStack>
                  <HStack gap="xs" align="center">
                    <Icon icon={Star} size="xs" className="text-[var(--color-warning)]" />
                    <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                      {t('worldMap.masteryRequired', { mastery: activeRegion.requiredMastery })}
                    </Typography>
                  </HStack>
                </VStack>
              </Section>

              {/* Challenges in this region */}
              {regionChallenges.length > 0 && (
                <Section title={t('worldMap.challengesTitle')}>
                  <VStack gap="sm">
                    {regionChallenges.map((challenge) => (
                      <Card key={challenge.id}>
                        <HStack justify="between" align="center">
                          <VStack gap="xs">
                            <Typography variant="small" className="text-sm text-[var(--color-foreground)]">
                              {challenge.topic}
                            </Typography>
                            <HStack gap="sm" align="center">
                              <Typography variant="small" className="text-xs text-[var(--color-muted-foreground)]">
                                {challenge.tier}
                              </Typography>
                              <XpCounter xp={challenge.xpReward} domain={challenge.domain} />
                            </HStack>
                          </VStack>
                          <Button
                            size="sm"
                            variant="primary"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                            onClick={() => handleStartChallenge(challenge.id)}
                          >
                            <Sword size={14} />
                            {t('worldMap.start')}
                          </Button>
                        </HStack>
                      </Card>
                    ))}
                  </VStack>
                </Section>
              )}

              {/* Adjacent regions */}
              {adjacentRegions.length > 0 && (
                <Section title={t('worldMap.connectedRegions')}>
                  <HStack gap="sm" wrap>
                    {adjacentRegions.map((adj) => (
                      <Button
                        key={adj.id}
                        size="sm"
                        variant="secondary"
                        className="px-4 py-2 bg-gray-100 text-[var(--color-foreground)] rounded-lg hover:bg-gray-200"
                        disabled={!adj.unlocked}
                        onClick={() => handleNavigate(currentRegion, adj.id)}
                      >
                        {!adj.unlocked && <Lock size={12} className="mr-1" />}
                        {adj.name}
                      </Button>
                    ))}
                  </HStack>
                </Section>
              )}
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

KnowledgeWorldMapBoard.displayName = 'KnowledgeWorldMapBoard';
