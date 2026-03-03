/**
 * SubjectListItem — Row in a subject list: name, discipline, node count, depth, file size bar.
 *
 * Events Emitted:
 * - UI:SELECT_SUBJECT — When the row is clicked
 *
 * entityAware: true
 */

import React from "react";
import {
  HStack,
  Typography,
  ProgressBar,
  useEventBus,
} from "@almadar/ui";
import { cn } from "@almadar/ui";
import { DomainBadge } from "../atoms/DomainBadge";
import type { KnowledgeSubject } from "../types/knowledge";

export interface SubjectListItemProps {
  subject: KnowledgeSubject;
  maxFileSize?: number;
  selectSubjectEvent?: string;
  className?: string;
}

export const SubjectListItem: React.FC<SubjectListItemProps> = ({
  subject,
  maxFileSize = 2_000_000,
  selectSubjectEvent,
  className,
}) => {
  const { emit } = useEventBus();

  const handleClick = () => {
    if (selectSubjectEvent) emit(`UI:${selectSubjectEvent}`, { subjectId: subject.id });
  };

  const fileSizeKB = Math.round(subject.fileSize / 1024);

  return (
    <HStack
      gap="md"
      align="center"
      className={cn(
        "p-3 rounded hover:bg-[var(--color-muted)] transition-colors",
        selectSubjectEvent && "cursor-pointer",
        className,
      )}
      onClick={handleClick}
    >
      <DomainBadge domain={subject.domain} size="sm" />
      <Typography variant="label" size="sm" truncate className="flex-1 min-w-0">
        {subject.name}
      </Typography>
      <Typography variant="body" size="xs" color="muted">
        {subject.discipline}
      </Typography>
      <Typography variant="body" size="xs" color="muted" align="right" className="w-16">
        {subject.nodeCount} nodes
      </Typography>
      <Typography variant="body" size="xs" color="muted" align="right" className="w-12">
        d={subject.maxDepth}
      </Typography>
      <ProgressBar
        value={subject.fileSize}
        max={maxFileSize}
        variant="primary"
        className="w-20"
      />
      <Typography variant="body" size="xs" color="muted" align="right" className="w-14">
        {fileSizeKB}KB
      </Typography>
    </HStack>
  );
};

SubjectListItem.displayName = "SubjectListItem";
