/**
 * ObjectionRecorder
 *
 * Records objections from inspection participants.
 * Used to capture disagreements or concerns during inspections.
 *
 * Event Contract:
 * - Emits: UI:OBJECTION_SUBMITTED { objection, participantId }
 */

import React, { useState, useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Textarea } from "../../../components/atoms/Textarea";
import { Select } from "../../../components/atoms/Select";
import { Badge } from "../../../components/atoms/Badge";
import { useEventBus } from "../../../hooks/useEventBus";
import { AlertCircle, Plus, User, Clock } from "lucide-react";

export interface Objection {
  id: string;
  participantId: string;
  participantName: string;
  text: string;
  timestamp: string;
}

export interface ObjectionRecorderProps {
  /** Existing objections */
  objections?: Objection[];
  /** Available participants */
  participants?: Array<{ id: string; name: string }>;
  /** Inspection ID */
  inspectionId?: string;
  /** Read-only mode */
  readOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Objection submitted handler */
  onSubmit?: (objection: { participantId: string; text: string }) => void;
}

export const ObjectionRecorder: React.FC<ObjectionRecorderProps> = ({
  objections = [],
  participants = [],
  inspectionId,
  readOnly = false,
  className,
  onSubmit,
}) => {
  const eventBus = useEventBus();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState("");
  const [objectionText, setObjectionText] = useState("");

  const handleSubmit = useCallback(() => {
    if (!selectedParticipant || !objectionText.trim()) return;

    const objectionData = {
      participantId: selectedParticipant,
      text: objectionText.trim(),
    };

    onSubmit?.(objectionData);
    eventBus.emit("UI:OBJECTION_SUBMITTED", {
      objection: objectionData,
      inspectionId,
    });

    // Reset form
    setSelectedParticipant("");
    setObjectionText("");
    setIsAdding(false);
  }, [selectedParticipant, objectionText, inspectionId, onSubmit, eventBus]);

  const handleCancel = useCallback(() => {
    setSelectedParticipant("");
    setObjectionText("");
    setIsAdding(false);
  }, []);

  return (
    <VStack gap="md" className={cn("w-full", className)}>
      {/* Header */}
      <HStack justify="between" align="center">
        <HStack gap="sm" align="center">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <Typography variant="h4" className="text-neutral-800">
            Objections
          </Typography>
          {objections.length > 0 && (
            <Badge variant="warning">{objections.length}</Badge>
          )}
        </HStack>

        {!readOnly && !isAdding && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            Record Objection
          </Button>
        )}
      </HStack>

      {/* Add objection form */}
      {isAdding && (
        <Card className="p-4 border-amber-200 bg-amber-50">
          <VStack gap="md">
            <Typography variant="body" className="font-medium text-amber-800">
              Record New Objection
            </Typography>

            <VStack gap="xs">
              <Typography variant="label" className="text-neutral-700">
                Participant
              </Typography>
              <Select
                value={selectedParticipant}
                onChange={(e) => setSelectedParticipant(e.target.value)}
                className="w-full"
              >
                <option value="">Select participant...</option>
                {participants.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </VStack>

            <VStack gap="xs">
              <Typography variant="label" className="text-neutral-700">
                Objection Details
              </Typography>
              <Textarea
                value={objectionText}
                onChange={(e) => setObjectionText(e.target.value)}
                placeholder="Describe the objection or concern..."
                rows={3}
                className="w-full"
              />
            </VStack>

            <HStack gap="sm" justify="end">
              <Button variant="secondary" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                disabled={!selectedParticipant || !objectionText.trim()}
              >
                Record Objection
              </Button>
            </HStack>
          </VStack>
        </Card>
      )}

      {/* Objections list */}
      {objections.length === 0 && !isAdding ? (
        <Card className="p-6">
          <VStack align="center" gap="sm" className="text-neutral-400">
            <AlertCircle className="h-8 w-8" />
            <Typography variant="body">No objections recorded</Typography>
            <Typography variant="small">
              Objections will be documented in the final report
            </Typography>
          </VStack>
        </Card>
      ) : (
        <VStack gap="sm">
          {objections.map((objection) => (
            <Card key={objection.id} className="p-4 border-amber-100">
              <VStack gap="sm">
                <HStack justify="between" align="start">
                  <HStack gap="sm" align="center">
                    <User className="h-4 w-4 text-neutral-500" />
                    <Typography variant="body" className="font-medium">
                      {objection.participantName}
                    </Typography>
                  </HStack>
                  <HStack gap="xs" align="center" className="text-neutral-500">
                    <Clock className="h-3 w-3" />
                    <Typography variant="small">
                      {new Date(objection.timestamp).toLocaleString()}
                    </Typography>
                  </HStack>
                </HStack>

                <Typography variant="body" className="text-neutral-700">
                  {objection.text}
                </Typography>
              </VStack>
            </Card>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

ObjectionRecorder.displayName = "ObjectionRecorder";
