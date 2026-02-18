/**
 * FloatingActionMenu
 *
 * Floating action button with expandable menu.
 * Provides quick access to common inspection actions.
 *
 * Event Contract:
 * - Emits: UI:QUICK_ACTION { action, context }
 */

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  Plus,
  X,
  UserPlus,
  Camera,
  FileText,
  AlertCircle,
  Phone,
  LucideIcon,
} from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  useEventBus,
  useTranslate,
} from '@almadar/ui';

export interface FloatingAction {
  id: string;
  label: string;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
}

// Type alias for backwards compatibility
export type QuickAction = FloatingAction;

export interface FloatingActionMenuProps {
  /** Available actions */
  actions?: FloatingAction[];
  /** Context data for events */
  context?: Record<string, string>;
  /** Position - accepts unknown for generated code compatibility */
  position?:
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
    | string
    | unknown;
  /** Additional CSS classes */
  className?: string;
  /** Loading state indicator */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Entity name for schema-driven auto-fetch */
  entity?: string;
  /** Action click handler */
  onAction?: (actionId: string) => void;
}

function useDefaultActions(): FloatingAction[] {
  const { t } = useTranslate();
  return useMemo(() => [
    {
      id: "add_participant",
      label: t('floatingMenu.addParticipant'),
      icon: UserPlus,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: "take_photo",
      label: t('floatingMenu.takePhoto'),
      icon: Camera,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "add_note",
      label: t('floatingMenu.addNote'),
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "record_objection",
      label: t('floatingMenu.recordObjection'),
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      id: "sos",
      label: t('floatingMenu.emergency'),
      icon: Phone,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ], [t]);
}

const positionClasses: Record<string, string> = {
  "bottom-right": "right-4 bottom-4",
  "bottom-left": "left-4 bottom-4",
  "bottom-center": "left-1/2 -translate-x-1/2 bottom-4",
};

export const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({
  actions: actionsProp,
  context = {},
  position = "bottom-right",
  className,
  onAction,
}) => {
  const eventBus = useEventBus();
  const defaultActions = useDefaultActions();
  const actions = actionsProp ?? defaultActions;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleAction = useCallback(
    (actionId: string) => {
      onAction?.(actionId);
      eventBus.emit("UI:QUICK_ACTION", { action: actionId, context });
      setIsOpen(false);
    },
    [context, onAction, eventBus],
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Normalize position to string for index access
  const positionKey = typeof position === "string" ? position : "bottom-right";

  return (
    <Box
      ref={menuRef}
      className={cn("fixed z-50", positionClasses[positionKey], className)}
    >
      <VStack gap="sm" align="end">
        {isOpen && (
          <VStack gap="sm" align="end">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <HStack key={action.id} gap="sm" align="center">
                  <Box padding="sm" rounded="lg" className="bg-white shadow-lg">
                    <Typography
                      variant="small"
                      className="font-medium whitespace-nowrap"
                    >
                      {action.label}
                    </Typography>
                  </Box>

                  <Button
                    variant="ghost"
                    onClick={() => handleAction(action.id)}
                    className={cn(
                      "p-3 rounded-full shadow-lg transition-transform hover:scale-110",
                      action.bgColor || "bg-white",
                      action.color || "text-[var(--color-foreground)]",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                </HStack>
              );
            })}
          </VStack>
        )}

        <Button
          variant="ghost"
          onClick={handleToggle}
          className={cn(
            "p-4 rounded-full shadow-lg transition-all",
            isOpen
              ? "bg-neutral-800 text-white rotate-45"
              : "bg-blue-600 text-white hover:bg-blue-700",
          )}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>
      </VStack>
    </Box>
  );
};

FloatingActionMenu.displayName = "FloatingActionMenu";
