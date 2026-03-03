/**
 * StreamingDisplay - Displays incrementally parsed JSON content as it streams in
 *
 * Orbital Entity Binding:
 * - Data flows through `content` prop from streaming Orbital state
 * - Display-only component, no user interactions
 *
 * Events Emitted: None (display-only)
 */

import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Card,
  Typography,
  SimpleGrid,
  Spinner,
  Accordion,
  CodeBlock,
  useTranslate,
} from '@almadar/ui';

interface Milestone {
  id?: string;
  title?: string;
  description?: string;
  targetDate?: number;
  completed?: boolean;
}

interface ParsedGoal {
  title?: string;
  description?: string;
  type?: string;
  target?: string;
  estimatedTime?: number;
  milestones?: Milestone[];
}

/**
 * Simple incremental JSON parser that extracts fields as they become available
 */
function parseIncrementalJSON(content: string): ParsedGoal {
  const result: ParsedGoal = {};

  // Try to parse as complete JSON first
  try {
    const parsed = JSON.parse(content);
    return parsed;
  } catch {
    // Fall through to incremental parsing
  }

  // Extract string fields
  const stringFields = ["title", "description", "type", "target"];
  for (const field of stringFields) {
    const regex = new RegExp(`"${field}"\\s*:\\s*"([^"]*)"`, "i");
    const match = content.match(regex);
    if (match) {
      (result as Record<string, string>)[field] = match[1];
    }
  }

  // Extract numeric fields
  const numericFields = ["estimatedTime"];
  for (const field of numericFields) {
    const regex = new RegExp(`"${field}"\\s*:\\s*(\\d+)`, "i");
    const match = content.match(regex);
    if (match) {
      (result as Record<string, number>)[field] = parseInt(match[1], 10);
    }
  }

  // Extract milestones array (simplified)
  const milestonesMatch = content.match(
    /"milestones"\s*:\s*\[([\s\S]*?)(?:\]|$)/,
  );
  if (milestonesMatch) {
    const milestonesContent = milestonesMatch[1];
    const milestones: Milestone[] = [];
    const milestoneRegex = /\{[^{}]*"title"\s*:\s*"([^"]*)"[^{}]*\}/g;
    let match;
    while ((match = milestoneRegex.exec(milestonesContent)) !== null) {
      const fullMatch = match[0];
      const milestone: Milestone = { title: match[1] };

      const descMatch = fullMatch.match(/"description"\s*:\s*"([^"]*)"/);
      if (descMatch) milestone.description = descMatch[1];

      milestones.push(milestone);
    }
    if (milestones.length > 0) {
      result.milestones = milestones;
    }
  }

  return result;
}

export interface StreamingDisplayProps {
  /** The streaming JSON content (may be incomplete) */
  content: string;
  /** Optional title to display while loading */
  loadingTitle?: string;
  /** Show raw content toggle */
  showRawToggle?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const StreamingDisplay = ({
  content,
  loadingTitle = "Generating...",
  showRawToggle = false,
  className = "",
}: StreamingDisplayProps) => {
  const [parsedData, setParsedData] = useState<ParsedGoal>({});
  const { t } = useTranslate();

  useEffect(() => {
    if (content) {
      const parsed = parseIncrementalJSON(content);
      setParsedData(parsed);
    }
  }, [content]);

  const milestones = parsedData.milestones || [];
  const hasGoalInfo =
    parsedData.title ||
    parsedData.description ||
    parsedData.type ||
    parsedData.target;
  const hasData = hasGoalInfo || milestones.length > 0;

  return (
    <VStack gap="md" className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Goal Information Card */}
      {hasGoalInfo && (
        <Card className="border border-gray-200">
          <VStack gap="sm">
            {parsedData.title && (
              <Typography variant="h3">
                {parsedData.title}
              </Typography>
            )}
            {parsedData.description && (
              <Typography variant="body">{parsedData.description}</Typography>
            )}

            <SimpleGrid cols={2} gap="md" className="text-sm">
              {parsedData.type && (
                <HStack gap="xs">
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                    {t('streaming.type')}
                  </Typography>
                  <Typography variant="small" className="font-medium">
                    {parsedData.type}
                  </Typography>
                </HStack>
              )}
              {parsedData.target && (
                <HStack gap="xs">
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                    {t('streaming.target')}
                  </Typography>
                  <Typography variant="small" className="font-medium">
                    {parsedData.target}
                  </Typography>
                </HStack>
              )}
              {parsedData.estimatedTime && (
                <HStack gap="xs">
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                    {t('streaming.estimatedTime')}
                  </Typography>
                  <Typography variant="small" className="font-medium">
                    {parsedData.estimatedTime} {t('streaming.hours')}
                  </Typography>
                </HStack>
              )}
            </SimpleGrid>

            {/* Milestones */}
            {milestones.length > 0 && (
              <VStack gap="sm" className="mt-4">
                <Typography variant="h4">
                  {t('streaming.milestones')}
                </Typography>
                <VStack gap="xs">
                  {milestones.map((milestone, index) => {
                    if (!milestone.title?.trim()) return null;
                    return (
                      <HStack
                        key={milestone.id || `milestone-${index}`}
                        gap="sm"
                        align="start"
                        className="p-3 bg-[var(--color-surface)] rounded-lg"
                      >
                        <Box className="w-6 h-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Box className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                        </Box>
                        <VStack gap="xs" className="flex-1">
                          <Typography variant="small" className="font-medium">
                            {milestone.title}
                          </Typography>
                          {milestone.description && (
                            <Typography variant="small">
                              {milestone.description}
                            </Typography>
                          )}
                        </VStack>
                      </HStack>
                    );
                  })}
                </VStack>
              </VStack>
            )}
          </VStack>
        </Card>
      )}

      {/* Loading State */}
      {!hasData && (
        <Card className="border border-gray-200">
          <VStack gap="sm" align="center" className="py-8 text-[var(--color-muted-foreground)]">
            <Spinner size="md" />
            <Typography variant="small">{loadingTitle}</Typography>
          </VStack>
        </Card>
      )}

      {/* Raw Content Toggle */}
      {showRawToggle && content && (
        <Accordion
          items={[{
            id: 'raw-json',
            header: t('streaming.showRawJson'),
            content: (
              <CodeBlock code={content} language="json" />
            ),
          }]}
        />
      )}
    </VStack>
  );
};

StreamingDisplay.displayName = "StreamingDisplay";
