/* eslint-disable almadar/organism-extends-entity-display */
/**
 * KnowledgeBattleBoard Organism (Milestone 8)
 *
 * Knowledge-driven battle: correct answers = attacks, wrong = take damage.
 * Speed bonus = higher damage tier.
 * Uses CombatLog from @almadar/ui for the combat log.
 *
 * Events Emitted:
 * - UI:BATTLE_COMPLETE — Victory
 * - UI:BATTLE_DEFEAT — Defeat
 */

import React, { useState, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Typography,
  Card,
  Button,
  Container,
  HealthBar,
  Badge,
  Icon,
  PageHeader,
  Section,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import { CombatLog } from '@almadar/ui';
import type { CombatEvent } from '@almadar/ui';
import { Sword, Shield, Zap } from 'lucide-react';
import type { KnowledgeChallenge, KnowledgePlayer } from '../types/knowledge';
import { DomainBadge } from '../atoms/DomainBadge';
import { XpCounter } from '../atoms/XpCounter';

export interface KnowledgeBattleEntity {
  player: KnowledgePlayer;
  opponent: { name: string; level: number; maxHP: number };
  challenge: KnowledgeChallenge;
  turnNumber: number;
  playerHP: number;
  opponentHP: number;
  combatLog: Array<{ id: string; message: string; type: 'attack' | 'defend' | 'heal' }>;
  phase: 'question' | 'result' | 'victory' | 'defeat';
}

export interface KnowledgeBattleBoardProps {
  entity: KnowledgeBattleEntity;
  className?: string;
}

export function KnowledgeBattleBoard({
  entity,
  className = '',
}: KnowledgeBattleBoardProps): React.JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const { player, opponent, challenge, playerHP, opponentHP, combatLog, phase, turnNumber } = entity;
  const [playerHPLocal] = useState(playerHP);
  const [opponentHPLocal] = useState(opponentHP);

  const handleAnswer = useCallback((correct: boolean) => {
    if (correct) {
      emit('UI:BATTLE_ANSWER', { correct: true, damage: 20 + Math.floor(Math.random() * 10) });
    } else {
      emit('UI:BATTLE_ANSWER', { correct: false, damage: 15 + Math.floor(Math.random() * 5) });
    }
  }, [emit]);

  const handleComplete = useCallback(() => {
    if (phase === 'victory') {
      emit('UI:BATTLE_COMPLETE', { won: true, xpEarned: challenge.xpReward });
    } else {
      emit('UI:BATTLE_DEFEAT', {});
    }
  }, [phase, emit, challenge.xpReward]);

  const combatEvents: CombatEvent[] = combatLog.map((entry) => ({
    id: entry.id,
    type: entry.type,
    message: entry.message,
    timestamp: Date.now(),
    turn: turnNumber,
  }));

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <PageHeader>
        <HStack justify="between" align="center" className="w-full">
          <VStack gap="xs">
            <Typography variant="small" className="font-semibold text-[var(--color-foreground)]">{player.name}</Typography>
            <HealthBar current={playerHPLocal} max={100} format="bar" size="sm" />
            <Typography variant="small" className="text-xs text-[var(--color-muted-foreground)]">
              {playerHPLocal}/100 {t('battle.hp')}
            </Typography>
          </VStack>
          <VStack gap="xs" align="center">
            <Badge variant="warning" size="sm">{t('battle.turn')} {turnNumber}</Badge>
            <Icon icon={Sword} size="md" className="text-[var(--color-error)]" />
          </VStack>
          <VStack gap="xs" align="end">
            <Typography variant="small" className="font-semibold text-[var(--color-foreground)]">{opponent.name}</Typography>
            <HealthBar current={opponentHPLocal} max={opponent.maxHP} format="bar" size="sm" />
            <Typography variant="small" className="text-xs text-[var(--color-muted-foreground)]">
              {opponentHPLocal}/{opponent.maxHP} {t('battle.hp')}
            </Typography>
          </VStack>
        </HStack>
      </PageHeader>

      <Container size="lg" padding="sm" className="py-6">
        <VStack gap="lg">
          {/* Question area */}
          {(phase === 'question' || phase === 'result') && (
            <Section variant="card">
              <VStack gap="md">
                <HStack gap="sm" align="center">
                  <DomainBadge domain={challenge.domain} size="sm" />
                  <Typography variant="small" className="font-semibold text-[var(--color-foreground)]">
                    {challenge.topic}
                  </Typography>
                </HStack>
                <Typography variant="body" className="text-[var(--color-foreground)]">
                  {challenge.prompt}
                </Typography>

                {phase === 'question' && (
                  <HStack gap="sm">
                    <Button
                      variant="primary"
                      className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                      onClick={() => handleAnswer(true)}
                    >
                      {t('battle.answerCorrectly')}
                    </Button>
                    <Button
                      variant="secondary"
                      className="px-4 py-2 bg-gray-100 text-[var(--color-foreground)] rounded-lg hover:bg-gray-200"
                      onClick={() => handleAnswer(false)}
                    >
                      {t('battle.wrongAnswer')}
                    </Button>
                  </HStack>
                )}
              </VStack>
            </Section>
          )}

          {/* Victory/Defeat */}
          {(phase === 'victory' || phase === 'defeat') && (
            <Card>
              <VStack gap="md" align="center" className="py-12">
                <Icon
                  icon={phase === 'victory' ? Zap : Shield}
                  size="xl"
                  className={phase === 'victory' ? 'text-[var(--color-warning)]' : 'text-[var(--color-error)]'}
                />
                <Typography variant="h1" className="text-3xl font-bold text-[var(--color-foreground)]">
                  {phase === 'victory' ? t('battle.victory') : t('battle.defeated')}
                </Typography>
                {phase === 'victory' && (
                  <XpCounter xp={challenge.xpReward} domain={challenge.domain} />
                )}
                <Button
                  variant="primary"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
                  onClick={handleComplete}
                >
                  {phase === 'victory' ? t('battle.claimReward') : t('battle.tryAgain')}
                </Button>
              </VStack>
            </Card>
          )}

          {/* Combat log — CombatLog from @almadar/ui */}
          {combatEvents.length > 0 && (
            <CombatLog
              events={combatEvents}
              maxVisible={10}
              autoScroll
              title={t('battle.combatLog')}
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
}

KnowledgeBattleBoard.displayName = 'KnowledgeBattleBoard';
