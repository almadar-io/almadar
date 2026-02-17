/**
 * TodoList - List of agent todos with progress tracking
 *
 * Event Contract:
 * - Emits: UI:TODO_COMPLETE - When a todo is marked complete
 * - Emits: UI:TODO_SELECT - When a todo is selected
 * - Payload: { todo: TodoItem }
 */

import React from "react";
import {
  Box,
  HStack,
  VStack,
  Typography,
  ProgressBar,
} from '@almadar/ui';
import { TodoItem, type Todo } from "../../molecules/agent";

export interface TodoListProps {
  /** List of todos — accepts DS Todo[] or compiler-generated Record<string, unknown>[] */
  todos?: Todo[] | Record<string, unknown>[];
  /** Show section header */
  showHeader?: boolean;
  /** Event name for selecting a todo (compiler pattern) */
  onTodoSelect?: string;
  /** Event name for completing a todo (compiler pattern) */
  onTodoComplete?: string;
  /** Item actions (compiler pattern) */
  itemActions?: Array<{ label: string; event: string }>;
  /** Entity name (passed by compiler) */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

export function TodoList({
  todos: rawTodos = [],
  showHeader = true,
  className = "",
}: TodoListProps) {
  // Normalize todos — compiler generates Record<string, unknown>[] for array fields
  const todos = (rawTodos || []) as Todo[];

  if (todos.length === 0) {
    return null;
  }

  const completedCount = todos.filter((t) => t.status === "completed").length;
  const progress = Math.round((completedCount / todos.length) * 100);

  return (
    <VStack gap="md" className={className}>
      {showHeader && (
        <HStack justify="between" align="center">
          <Typography variant="overline">
            Tasks ({completedCount}/{todos.length})
          </Typography>
          <HStack gap="sm" align="center">
            <Box className="w-24">
              <ProgressBar value={progress} max={100} size="sm" />
            </Box>
            <Typography variant="caption" color="muted">
              {progress}%
            </Typography>
          </HStack>
        </HStack>
      )}

      <VStack gap="sm">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </VStack>
    </VStack>
  );
}

export default TodoList;
