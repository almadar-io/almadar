/**
 * InspectionTimeline
 *
 * Timeline view of inspection events and activities.
 * Shows chronological history of inspection progress.
 *
 * Event Contract:
 * - Emits: UI:TIMELINE_ITEM_CLICK { itemId, item }
 */

import React, { useCallback } from "react";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Camera,
  MessageSquare,
  Flag,
  Play,
  Pause,
} from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Badge,
  useEventBus,
} from '@almadar/ui';

export type TimelineEventType =
  | "start"
  | "pause"
  | "resume"
  | "participant_added"
  | "rule_checked"
  | "photo_added"
  | "objection"
  | "finding"
  | "document"
  | "complete"
  | "note";

export interface TimelineItem {
  id: string;
  type: TimelineEventType;
  title: string;
  description?: string;
  timestamp: string;
  user?: string;
  metadata?: Record<string, string>;
}

export interface InspectionTimelineProps {
  /** Timeline items */
  items: TimelineItem[];
  /** Show relative time */
  relativeTime?: boolean;
  /** Clickable items */
  clickable?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Item click handler */
  onItemClick?: (item: TimelineItem) => void;
}

const eventConfig: Record<
  TimelineEventType,
  { icon: typeof Clock; color: string; bgColor: string }
> = {
  start: {
    icon: Play,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  pause: {
    icon: Pause,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  resume: {
    icon: Play,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  participant_added: {
    icon: User,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  rule_checked: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  photo_added: {
    icon: Camera,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  objection: {
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  finding: {
    icon: Flag,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  document: {
    icon: FileText,
    color: "text-[var(--color-foreground)]",
    bgColor: "bg-slate-100",
  },
  complete: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  note: {
    icon: MessageSquare,
    color: "text-[var(--color-foreground)]",
    bgColor: "bg-neutral-100",
  },
};

// Format relative time
const formatRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

export const InspectionTimeline: React.FC<InspectionTimelineProps> = ({
  items,
  relativeTime = true,
  clickable = false,
  compact = false,
  className,
  onItemClick,
}) => {
  const eventBus = useEventBus();

  const handleItemClick = useCallback(
    (item: TimelineItem) => {
      if (!clickable) return;
      onItemClick?.(item);
      eventBus.emit("UI:TIMELINE_ITEM_CLICK", { itemId: item.id, item });
    },
    [clickable, onItemClick, eventBus]
  );

  if (items.length === 0) {
    return (
      <Box
        padding="lg"
        rounded="lg"
        className={cn("bg-neutral-50 text-center", className)}
      >
        <VStack align="center" gap="sm" className="text-[var(--color-muted-foreground)]">
          <Clock className="h-8 w-8" />
          <Typography variant="body">No activity recorded yet</Typography>
        </VStack>
      </Box>
    );
  }

  return (
    <VStack gap="none" className={cn("relative", className)}>
      {/* Timeline line */}
      <Box
        className="absolute left-4 top-0 bottom-0 w-0.5 bg-neutral-200"
        style={{ transform: "translateX(-50%)" }}
      />

      {items.map((item, index) => {
        const config = eventConfig[item.type];
        const Icon = config.icon;
        const isLast = index === items.length - 1;

        return (
          <Box
            key={item.id}
            className={cn(
              "relative pl-10",
              !isLast && (compact ? "pb-4" : "pb-6"),
              clickable && "cursor-pointer hover:bg-neutral-50 -ml-2 pl-12 pr-2 py-2 rounded-lg"
            )}
            onClick={() => handleItemClick(item)}
          >
            {/* Icon */}
            <Box
              rounded="full"
              padding="xs"
              className={cn(
                "absolute left-0 z-10",
                config.bgColor,
                config.color
              )}
              style={{ transform: "translateX(-50%)" }}
            >
              <Icon className={compact ? "h-3 w-3" : "h-4 w-4"} />
            </Box>

            {/* Content */}
            <VStack gap="xs">
              <HStack justify="between" align="start" wrap>
                <Typography
                  variant={compact ? "small" : "body"}
                  className="font-medium"
                >
                  {item.title}
                </Typography>
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {relativeTime
                    ? formatRelativeTime(item.timestamp)
                    : new Date(item.timestamp).toLocaleString()}
                </Typography>
              </HStack>

              {item.description && !compact && (
                <Typography variant="small" className="text-[var(--color-foreground)]">
                  {item.description}
                </Typography>
              )}

              {item.user && (
                <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
                  <User className="h-3 w-3" />
                  <Typography variant="small">{item.user}</Typography>
                </HStack>
              )}
            </VStack>
          </Box>
        );
      })}
    </VStack>
  );
};

InspectionTimeline.displayName = "InspectionTimeline";
