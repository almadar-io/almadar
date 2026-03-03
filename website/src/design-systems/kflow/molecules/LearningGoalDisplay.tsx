/**
 * LearningGoalDisplay - Displays learning goal with inline editing
 *
 * Orbital Entity Binding:
 * - Data flows through props from Orbital state
 * - User interactions emit events via useEventBus()
 *
 * Events Emitted:
 * - UI:EDIT_GOAL - When edit mode is entered
 * - UI:SAVE_GOAL - When goal is saved
 * - UI:CANCEL_EDIT_GOAL - When editing is cancelled
 */

import React, { useState } from 'react';
import { Target, Info, Edit2, Save, X } from 'lucide-react';
import {
  Box,
  HStack,
  VStack,
  Button,
  Typography,
  Textarea,
  useEventBus,
  useTranslate,
} from '@almadar/ui';

export interface LearningGoalDisplayProps {
  /** The learning goal text */
  goal?: string;
  /** Layer number this goal belongs to */
  layerNumber: number;
  /** Graph/course ID for context */
  graphId?: string;
  /** Whether save is in progress */
  isSaving?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const LearningGoalDisplay = ({
  goal,
  layerNumber,
  graphId,
  isSaving = false,
  className = '',
}: LearningGoalDisplayProps) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(goal || '');

  const handleEdit = () => {
    setEditedGoal(goal || '');
    setIsEditing(true);
    emit('UI:EDIT_GOAL', { layerNumber, graphId });
  };

  const handleCancel = () => {
    setEditedGoal(goal || '');
    setIsEditing(false);
    emit('UI:CANCEL_EDIT_GOAL', { layerNumber, graphId });
  };

  const handleSave = () => {
    emit('UI:SAVE_GOAL', { layerNumber, graphId, goal: editedGoal });
    setIsEditing(false);
  };

  if (!goal && !isEditing) {
    return null;
  }

  return (
    <Box
      className={`w-full p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 rounded-lg shadow-sm ${className}`}
    >
      <HStack gap="sm" align="start">
        <Box className="flex-shrink-0 mt-0.5">
          <Box className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
            <Target size={16} className="text-white" />
          </Box>
        </Box>

        <VStack gap="sm" className="flex-1 min-w-0">
          <HStack justify="between" align="center" className="w-full">
            <HStack gap="xs" align="center">
              <Typography variant="small" className="font-semibold">
                {t('learningGoal.title')}
              </Typography>
              <Info size={14} className="text-indigo-500" />
            </HStack>

            {!isEditing ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100"
              >
                <HStack gap="xs" align="center">
                  <Edit2 size={12} />
                  <Typography variant="small">{t('learningGoal.edit')}</Typography>
                </HStack>
              </Button>
            ) : (
              <HStack gap="sm">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="text-xs"
                >
                  <HStack gap="xs" align="center">
                    <Save size={12} />
                    <Typography variant="small">
                      {isSaving ? t('learningGoal.saving') : t('learningGoal.save')}
                    </Typography>
                  </HStack>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="text-xs"
                >
                  <HStack gap="xs" align="center">
                    <X size={12} />
                    <Typography variant="small">{t('learningGoal.cancel')}</Typography>
                  </HStack>
                </Button>
              </HStack>
            )}
          </HStack>

          {isEditing ? (
            <Textarea
              value={editedGoal}
              onChange={(e) => setEditedGoal(e.target.value)}
              placeholder={t('learningGoal.placeholder')}
              disabled={isSaving}
              className="min-h-[80px]"
            />
          ) : (
            <Typography variant="body" className="text-sm leading-relaxed">
              {goal || t('learningGoal.noGoalSet')}
            </Typography>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

LearningGoalDisplay.displayName = 'LearningGoalDisplay';
