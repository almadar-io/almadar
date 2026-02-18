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
  useEventBus,
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

export const LearningGoalDisplay: React.FC<LearningGoalDisplayProps> = ({
  goal,
  layerNumber,
  graphId,
  isSaving = false,
  className = '',
}) => {
  const { emit } = useEventBus();
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
              <span className="text-sm font-semibold text-[var(--color-foreground)]">
                Learning Goal
              </span>
              <Info size={14} className="text-indigo-500" />
            </HStack>

            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 rounded transition-colors"
              >
                <Edit2 size={12} />
                <span>Edit</span>
              </button>
            ) : (
              <HStack gap="sm">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded transition-colors"
                >
                  <Save size={12} />
                  <span>{isSaving ? 'Saving...' : 'Save'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-[var(--color-foreground)] hover:text-[var(--color-foreground)] hover:bg-gray-100 disabled:opacity-50 rounded transition-colors"
                >
                  <X size={12} />
                  <span>Cancel</span>
                </button>
              </HStack>
            )}
          </HStack>

          {isEditing ? (
            <textarea
              value={editedGoal}
              onChange={(e) => setEditedGoal(e.target.value)}
              className="w-full px-3 py-2 text-sm text-[var(--color-foreground)] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y min-h-[80px]"
              placeholder="Enter learning goal for this layer..."
              disabled={isSaving}
            />
          ) : (
            <p className="text-sm text-[var(--color-foreground)] leading-relaxed">
              {goal || 'No learning goal set'}
            </p>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

LearningGoalDisplay.displayName = 'LearningGoalDisplay';
