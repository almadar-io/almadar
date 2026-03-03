/* eslint-disable almadar/organism-extends-entity-display */
/**
 * DomainExplorerBoard Organism
 *
 * Three-pillar view of all knowledge domains (Formal/Natural/Social).
 * Each column shows a DomainSummaryCard header with SubjectListItem rows sorted by size.
 *
 * Events Emitted:
 * - UI:SELECT_SUBJECT — When a subject row is clicked
 */

import React, { useMemo } from "react";
import {
  Box,
  VStack,
  HStack,
  Button,
  Typography,
  ProgressBar,
  Container,
  SimpleGrid,
  EmptyState,
  PageHeader,
  useEventBus,
  useTranslate,
} from "@almadar/ui";
import { BookOpen, Sparkles } from "lucide-react";
import type { KnowledgeDomain, KnowledgeSubject, KnowledgeDomainType, UserStoryProgress } from "../types/knowledge";
import { DomainSummaryCard } from "../molecules/DomainSummaryCard";
import { SubjectListItem } from "../molecules/SubjectListItem";

const DOMAIN_ORDER: KnowledgeDomainType[] = ["formal", "natural", "social"];

export interface DomainExplorerEntity {
  domains: KnowledgeDomain[];
  subjects: KnowledgeSubject[];
  userProgress?: UserStoryProgress;
}

export interface DomainExplorerBoardProps {
  entity: DomainExplorerEntity;
  selectSubjectEvent?: string;
  className?: string;
}

export function DomainExplorerBoard({
  entity,
  selectSubjectEvent,
  className = "",
}: DomainExplorerBoardProps): React.JSX.Element {
  const { domains, subjects, userProgress } = entity;
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const subjectsByDomain = useMemo(() => {
    const grouped = new Map<KnowledgeDomainType, KnowledgeSubject[]>();
    for (const d of DOMAIN_ORDER) {
      grouped.set(d, []);
    }
    for (const s of subjects) {
      const list = grouped.get(s.domain);
      if (list) list.push(s);
    }
    for (const list of grouped.values()) {
      list.sort((a, b) => b.fileSize - a.fileSize);
    }
    return grouped;
  }, [subjects]);

  const domainMap = useMemo(() => {
    const map = new Map<KnowledgeDomainType, KnowledgeDomain>();
    for (const d of domains) {
      map.set(d.domain, d);
    }
    return map;
  }, [domains]);

  const maxFileSize = useMemo(
    () => Math.max(...subjects.map((s) => s.fileSize), 1),
    [subjects],
  );

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <PageHeader
        title={t('explorer.title')}
        subtitle={t('explorer.subtitle', { subjectCount: subjects.length, domainCount: domains.length })}
      />

      <Container size="xl" padding="sm" className="py-6">
        <SimpleGrid cols={3} gap="lg">
          {DOMAIN_ORDER.map((domainType) => {
            const domain = domainMap.get(domainType);
            const domainSubjects = subjectsByDomain.get(domainType) ?? [];

            if (!domain) return null;

            const domainProg = userProgress?.domainProgress[domainType];

            return (
              <VStack key={domainType} gap="sm">
                <DomainSummaryCard domain={domain} />

                {/* Domain progress stats */}
                {domainProg && (
                  <Box className="px-3 py-2 rounded bg-[var(--color-muted)]">
                    <HStack gap="lg" className="flex-wrap">
                      <VStack gap="xs">
                        <Typography variant="body" size="xs" color="muted">
                          {t('explorer.completion')}
                        </Typography>
                        <HStack gap="xs" align="center">
                          <ProgressBar value={domainProg.completionPercent} max={100} variant="primary" className="w-16" />
                          <Typography variant="label" size="sm">{domainProg.completionPercent}%</Typography>
                        </HStack>
                      </VStack>
                      <VStack gap="xs">
                        <Typography variant="body" size="xs" color="muted">
                          {t('explorer.strongest')}
                        </Typography>
                        <Typography variant="label" size="sm" truncate>{domainProg.strongestSubject}</Typography>
                      </VStack>
                      <VStack gap="xs">
                        <Typography variant="body" size="xs" color="muted">
                          {t('explorer.weakest')}
                        </Typography>
                        <Typography variant="label" size="sm" truncate>{domainProg.weakestSubject}</Typography>
                      </VStack>
                    </HStack>
                  </Box>
                )}

                <VStack gap="xs">
                  {domainSubjects.map((subject) => {
                    const subProg = userProgress?.subjectProgress[subject.id];
                    return (
                      <VStack key={subject.id} gap="none">
                        <SubjectListItem
                          subject={subject}
                          maxFileSize={maxFileSize}
                          selectSubjectEvent={selectSubjectEvent}
                          className={subProg ? (
                            subProg.completed > 0 ? 'border-l-2 border-[var(--color-success)]' : ''
                          ) : ''}
                        />
                        {subProg && subProg.total > 0 && (
                          <HStack gap="sm" align="center" className="pl-10 pb-1">
                            <ProgressBar value={subProg.completed} max={subProg.total} variant="primary" className="w-20" />
                            <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                              {t('explorer.subjectProgress', {
                                completed: String(subProg.completed),
                                total: String(subProg.total),
                                games: String(subProg.gamesPlayed),
                              })}
                            </Typography>
                          </HStack>
                        )}
                        {subProg && subProg.total === 0 && (
                          <HStack className="pl-10 pb-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => emit('UI:STORY_GENERATE_REQUEST', { topic: subject.name, domain: subject.domain })}
                            >
                              <Sparkles size={14} />
                              <Typography variant="caption">
                                {t('explorer.generateStory')}
                              </Typography>
                            </Button>
                          </HStack>
                        )}
                      </VStack>
                    );
                  })}
                  {domainSubjects.length === 0 && (
                    <EmptyState
                      icon={BookOpen}
                      title={t('explorer.noSubjects')}
                      description={t('explorer.noSubjectsDesc')}
                    />
                  )}
                </VStack>
              </VStack>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

DomainExplorerBoard.displayName = "DomainExplorerBoard";
