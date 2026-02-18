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

export const StreamingDisplay: React.FC<StreamingDisplayProps> = ({
  content,
  loadingTitle = "Generating...",
  showRawToggle = false,
  className = "",
}) => {
  const [parsedData, setParsedData] = useState<ParsedGoal>({});

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
              <h3 className="text-xl font-semibold text-[var(--color-foreground)]">
                {parsedData.title}
              </h3>
            )}
            {parsedData.description && (
              <p className="text-[var(--color-foreground)]">{parsedData.description}</p>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              {parsedData.type && (
                <div>
                  <span className="text-[var(--color-muted-foreground)]">Type:</span>
                  <span className="ml-2 text-[var(--color-foreground)] font-medium">
                    {parsedData.type}
                  </span>
                </div>
              )}
              {parsedData.target && (
                <div>
                  <span className="text-[var(--color-muted-foreground)]">Target:</span>
                  <span className="ml-2 text-[var(--color-foreground)] font-medium">
                    {parsedData.target}
                  </span>
                </div>
              )}
              {parsedData.estimatedTime && (
                <div>
                  <span className="text-[var(--color-muted-foreground)]">Estimated Time:</span>
                  <span className="ml-2 text-[var(--color-foreground)] font-medium">
                    {parsedData.estimatedTime} hours
                  </span>
                </div>
              )}
            </div>

            {/* Milestones */}
            {milestones.length > 0 && (
              <VStack gap="sm" className="mt-4">
                <h4 className="text-lg font-semibold text-[var(--color-foreground)]">
                  Milestones
                </h4>
                <ul className="space-y-2">
                  {milestones.map((milestone, index) => {
                    if (!milestone.title?.trim()) return null;
                    return (
                      <li
                        key={milestone.id || `milestone-${index}`}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <Box className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Box className="w-2 h-2 rounded-full bg-indigo-600" />
                        </Box>
                        <VStack gap="xs" className="flex-1">
                          <span className="font-medium text-[var(--color-foreground)]">
                            {milestone.title}
                          </span>
                          {milestone.description && (
                            <span className="text-sm text-[var(--color-foreground)]">
                              {milestone.description}
                            </span>
                          )}
                        </VStack>
                      </li>
                    );
                  })}
                </ul>
              </VStack>
            )}
          </VStack>
        </Card>
      )}

      {/* Loading State */}
      {!hasData && (
        <Card className="border border-gray-200">
          <VStack gap="sm" align="center" className="py-8 text-[var(--color-muted-foreground)]">
            <Box className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <span className="text-sm">{loadingTitle}</span>
          </VStack>
        </Card>
      )}

      {/* Raw Content Toggle */}
      {showRawToggle && content && (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-[var(--color-foreground)] hover:text-[var(--color-foreground)]">
            Show raw JSON content
          </summary>
          <pre className="mt-2 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
            {content}
          </pre>
        </details>
      )}
    </VStack>
  );
};

StreamingDisplay.displayName = "StreamingDisplay";
