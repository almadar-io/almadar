/**
 * ConceptCard - Displays a concept with header, description, metadata, and children
 *
 * Orbital Entity Binding:
 * - Data flows through `entity` prop from Orbital state
 * - User interactions emit events via useEventBus()
 *
 * Events Emitted:
 * - UI:EXPAND_CONCEPT - When expand/collapse is toggled
 * - UI:SELECT_CONCEPT - When concept is clicked
 * - UI:CONCEPT_ACTION - When an action button is clicked
 */

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Check,
  Circle,
} from "lucide-react";
import {
  Box,
  VStack,
  HStack,
  Card,
  useEventBus,
} from '@almadar/ui';
import type { LucideIcon } from "lucide-react";

export interface ConceptEntity {
  id: string;
  name: string;
  description?: string;
  layer?: number;
  prerequisites?: string[];
  parents?: string[];
  childConcepts?: ConceptEntity[];
  progress?: number;
  hasLesson?: boolean;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export interface ConceptCardProps {
  /** Concept entity data */
  entity?: ConceptEntity | string;
  /** Whether this concept is highlighted (lesson ready) */
  highlighted?: boolean;
  /** Hide the lesson status badges */
  hideLessonBadge?: boolean;
  /** Optional icon */
  icon?: LucideIcon;
  /** Is expanded (showing children) */
  expanded?: boolean;
  /** Operation buttons */
  operations?: Array<{
    label: string;
    icon?: LucideIcon;
    action: string;
    variant?: "primary" | "secondary" | "danger";
  }>;
  /** Additional CSS classes */
  className?: string;
  // Entity-aware props (for schema compatibility)
  /** Data to display */
  data?: unknown | unknown[];
  /** Display variant */
  variant?: string;
  /** Item actions */
  itemActions?: Array<{
    label: string;
    event: string;
    onClick?: (row: Record<string, unknown>) => void;
  }>;
  /** Actions */
  actions?: Array<{ label: string; event: string }>;
  /** Fields to display */
  displayFields?: string[];
  /** Show children */
  showChildren?: boolean;
  /** Show flash cards */
  showFlashCards?: boolean;
  /** Show progress */
  showProgress?: boolean;
  /** Show lesson content */
  showLessonContent?: boolean;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
  entity: entityProp,
  highlighted,
  hideLessonBadge = false,
  icon: IconComponent,
  expanded: controlledExpanded,
  operations,
  className = "",
}) => {
  const { emit } = useEventBus();
  const [internalExpanded, setInternalExpanded] = useState(false);

  // Normalize entity - handle string, object, or undefined
  const entity: ConceptEntity =
    typeof entityProp === "string"
      ? { id: entityProp, name: entityProp }
      : (entityProp ?? { id: "unknown", name: "Unknown" });

  const expanded =
    controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  const hasChildren =
    Array.isArray(entity.childConcepts) && entity.childConcepts.length > 0;

  const isHighlighted = highlighted ?? entity.hasLesson;
  const { isCompleted, isCurrent } = entity;

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      const newExpanded = !expanded;
      if (controlledExpanded === undefined) {
        setInternalExpanded(newExpanded);
      }
      emit("UI:EXPAND_CONCEPT", {
        conceptId: entity.id,
        expanded: newExpanded,
      });
    }
  };

  const handleClick = () => {
    emit("UI:SELECT_CONCEPT", { conceptId: entity.id, entity });
  };

  const handleAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    emit("UI:CONCEPT_ACTION", { conceptId: entity.id, action });
  };

  const getCardStyle = () => {
    const baseStyle = "transition-all duration-200 border-l-4 cursor-pointer";
    if (isCompleted) return `${baseStyle} opacity-60 border-l-gray-300`;
    if (isCurrent)
      return `${baseStyle} ring-2 ring-indigo-500 border-l-indigo-500 bg-indigo-50`;
    if (isHighlighted) return `${baseStyle} border-l-emerald-500 bg-emerald-50`;
    return `${baseStyle} border-l-gray-200`;
  };

  const getStatusIcon = () => {
    if (isCompleted) return <Check size={18} className="text-white" />;
    if (isHighlighted) return <BookOpen size={16} className="text-white" />;
    return <Circle size={18} className="text-[var(--color-muted-foreground)]" />;
  };

  const getStatusBgColor = () => {
    if (isCompleted) return "bg-green-500";
    if (isCurrent) return "bg-indigo-500";
    if (isHighlighted) return "bg-emerald-500";
    return "bg-gray-200";
  };

  return (
    <Card
      className={`shadow-md ${getCardStyle()} ${className}`}
      onClick={handleClick}
    >
      <VStack gap="sm">
        {/* Header */}
        <HStack gap="sm" align="start">
          {hasChildren && (
            <button
              type="button"
              onClick={handleExpand}
              className="flex-shrink-0 mt-1 p-1 hover:bg-gray-100 rounded"
            >
              {expanded ? (
                <ChevronDown size={16} className="text-[var(--color-muted-foreground)]" />
              ) : (
                <ChevronRight size={16} className="text-[var(--color-muted-foreground)]" />
              )}
            </button>
          )}

          {/* Status indicator */}
          {!IconComponent && (
            <Box
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getStatusBgColor()}`}
            >
              {getStatusIcon()}
            </Box>
          )}

          {IconComponent && (
            <Box className="flex-shrink-0">
              <IconComponent size={24} className="text-[var(--color-foreground)]" />
            </Box>
          )}

          <VStack gap="xs" className="flex-1 min-w-0">
            <HStack gap="sm" align="center">
              <span className="font-semibold text-[var(--color-foreground)]">{entity.name}</span>
              {!hideLessonBadge && isHighlighted && !isCompleted && (
                <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded">
                  Lesson Ready
                </span>
              )}
              {!hideLessonBadge && !isHighlighted && !isCompleted && (
                <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-[var(--color-foreground)] rounded">
                  No Lesson
                </span>
              )}
            </HStack>

            {entity.description && (
              <p className="text-sm text-[var(--color-foreground)]">{entity.description}</p>
            )}

            {/* Prerequisites */}
            {entity.prerequisites && entity.prerequisites.length > 0 && (
              <HStack gap="xs" wrap className="mt-1">
                <span className="text-xs font-semibold text-indigo-600">
                  Prerequisites:
                </span>
                {entity.prerequisites.map((prereq, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded"
                  >
                    {prereq}
                  </span>
                ))}
              </HStack>
            )}

            {/* Parents */}
            {entity.parents && entity.parents.length > 0 && (
              <HStack gap="xs" wrap className="mt-1">
                <span className="text-xs text-[var(--color-muted-foreground)]">Parents:</span>
                {entity.parents.map((parent, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-[var(--color-foreground)] rounded"
                  >
                    {parent}
                  </span>
                ))}
              </HStack>
            )}
          </VStack>
        </HStack>

        {/* Progress Bar */}
        {entity.progress !== undefined && (
          <Box className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <Box
              className="h-full bg-indigo-500 transition-all"
              style={{ width: `${entity.progress}%` }}
            />
          </Box>
        )}

        {/* Operations */}
        {operations && operations.length > 0 && (
          <HStack gap="sm">
            {operations.map((op, idx) => {
              const OpIcon = op.icon;
              return (
                <button
                  key={idx}
                  className={`px-3 py-1.5 text-sm font-medium rounded flex items-center gap-1 ${
                    op.variant === "primary"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : op.variant === "danger"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-100 text-[var(--color-foreground)] hover:bg-gray-200"
                  }`}
                  onClick={(e) => handleAction(op.action, e)}
                >
                  {OpIcon && <OpIcon size={14} />}
                  {op.label}
                </button>
              );
            })}
          </HStack>
        )}

        {/* Children */}
        {hasChildren && expanded && entity.childConcepts && (
          <VStack gap="sm" className="pl-6 border-l-2 border-gray-200 mt-2">
            {entity.childConcepts.map((child) => (
              <ConceptCard
                key={child.id}
                entity={child}
                hideLessonBadge={hideLessonBadge}
              />
            ))}
          </VStack>
        )}
      </VStack>
    </Card>
  );
};

ConceptCard.displayName = "ConceptCard";
