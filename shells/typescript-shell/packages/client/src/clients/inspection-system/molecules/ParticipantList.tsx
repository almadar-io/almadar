/**
 * ParticipantList
 *
 * List of participants in an inspection with add/remove actions.
 * Displays company representatives who participated in the inspection.
 *
 * Event Contract:
 * - Emits: UI:ADD_PARTICIPANT { inspectionId }
 * - Emits: UI:REMOVE_PARTICIPANT { participantId, inspectionId }
 * - Emits: UI:EDIT_PARTICIPANT { participant }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Avatar } from "../../../components/atoms/Avatar";
import { Badge } from "../../../components/atoms/Badge";
import { useEventBus } from "../../../hooks/useEventBus";
import { Plus, Trash2, Edit, User, Briefcase, Phone } from "lucide-react";

export interface Participant {
  id: string;
  name: string;
  surname: string;
  positionInCompany: string;
  contactInfo?: string;
  addedAt?: string;
}

export interface ParticipantListProps {
  /** Inspection ID */
  inspectionId: string;
  /** List of participants */
  participants: Participant[];
  /** Allow adding participants */
  allowAdd?: boolean;
  /** Allow removing participants */
  allowRemove?: boolean;
  /** Allow editing participants */
  allowEdit?: boolean;
  /** Minimum required participants */
  minParticipants?: number;
  /** Title */
  title?: string;
  /** Read-only mode */
  readOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Add handler */
  onAdd?: () => void;
  /** Remove handler */
  onRemove?: (participantId: string) => void;
  /** Edit handler */
  onEdit?: (participant: Participant) => void;
}

export const ParticipantList: React.FC<ParticipantListProps> = ({
  inspectionId,
  participants,
  allowAdd = true,
  allowRemove = true,
  allowEdit = true,
  minParticipants = 1,
  title = "Participants",
  readOnly = false,
  className,
  onAdd,
  onRemove,
  onEdit,
}) => {
  const eventBus = useEventBus();

  const handleAdd = useCallback(() => {
    onAdd?.();
    eventBus.emit("UI:ADD_PARTICIPANT", { inspectionId });
  }, [inspectionId, onAdd, eventBus]);

  const handleRemove = useCallback(
    (participantId: string) => {
      onRemove?.(participantId);
      eventBus.emit("UI:REMOVE_PARTICIPANT", { participantId, inspectionId });
    },
    [inspectionId, onRemove, eventBus]
  );

  const handleEdit = useCallback(
    (participant: Participant) => {
      onEdit?.(participant);
      eventBus.emit("UI:EDIT_PARTICIPANT", { participant });
    },
    [onEdit, eventBus]
  );

  const canRemove = !readOnly && allowRemove && participants.length > minParticipants;

  return (
    <VStack gap="md" className={cn("w-full", className)}>
      {/* Header */}
      <HStack justify="between" align="center">
        <HStack gap="sm" align="center">
          <Typography variant="h4" className="text-neutral-800">
            {title}
          </Typography>
          <Badge variant="neutral">{participants.length}</Badge>
        </HStack>

        {!readOnly && allowAdd && (
          <Button variant="secondary" size="sm" onClick={handleAdd} className="gap-1">
            <Plus className="h-4 w-4" />
            Add Participant
          </Button>
        )}
      </HStack>

      {/* Participant cards */}
      {participants.length === 0 ? (
        <Card className="p-6">
          <VStack align="center" gap="sm" className="text-neutral-400">
            <User className="h-8 w-8" />
            <Typography variant="body">No participants added yet</Typography>
            {!readOnly && allowAdd && (
              <Button variant="primary" size="sm" onClick={handleAdd} className="gap-1">
                <Plus className="h-4 w-4" />
                Add First Participant
              </Button>
            )}
          </VStack>
        </Card>
      ) : (
        <VStack gap="sm">
          {participants.map((participant) => (
            <Card key={participant.id} className="p-4">
              <HStack justify="between" align="start">
                <HStack gap="sm" align="start">
                  <Avatar
                    name={`${participant.name} ${participant.surname}`}
                    size="md"
                  />
                  <VStack gap="xs">
                    <Typography variant="body" className="font-medium text-neutral-800">
                      {participant.name} {participant.surname}
                    </Typography>
                    <HStack gap="xs" align="center" className="text-neutral-500">
                      <Briefcase className="h-3 w-3" />
                      <Typography variant="small">
                        {participant.positionInCompany}
                      </Typography>
                    </HStack>
                    {participant.contactInfo && (
                      <HStack gap="xs" align="center" className="text-neutral-500">
                        <Phone className="h-3 w-3" />
                        <Typography variant="small">
                          {participant.contactInfo}
                        </Typography>
                      </HStack>
                    )}
                  </VStack>
                </HStack>

                {!readOnly && (
                  <HStack gap="xs">
                    {allowEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(participant)}
                        className="text-neutral-400 hover:text-neutral-600"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {canRemove && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(participant.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </HStack>
                )}
              </HStack>
            </Card>
          ))}
        </VStack>
      )}

      {/* Minimum participants warning */}
      {participants.length < minParticipants && (
        <Typography variant="small" className="text-amber-600">
          At least {minParticipants} participant{minParticipants !== 1 ? "s" : ""} required
        </Typography>
      )}
    </VStack>
  );
};

ParticipantList.displayName = "ParticipantList";
