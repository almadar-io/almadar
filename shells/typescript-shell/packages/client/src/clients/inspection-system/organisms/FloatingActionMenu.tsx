/**
 * FloatingActionMenu
 *
 * Floating action button with expandable menu.
 * Provides quick access to common inspection actions.
 *
 * Event Contract:
 * - Emits: UI:QUICK_ACTION { action, context }
 */

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { useEventBus } from "../../../hooks/useEventBus";
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

export interface FloatingAction {
  id: string;
  label: string;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
}

export interface FloatingActionMenuProps {
  /** Available actions */
  actions?: FloatingAction[];
  /** Context data for events */
  context?: Record<string, string>;
  /** Position */
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  /** Additional CSS classes */
  className?: string;
  /** Action click handler */
  onAction?: (actionId: string) => void;
}

const defaultActions: FloatingAction[] = [
  {
    id: "add_participant",
    label: "Add Participant",
    icon: UserPlus,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "take_photo",
    label: "Take Photo",
    icon: Camera,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "add_note",
    label: "Add Note",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "record_objection",
    label: "Record Objection",
    icon: AlertCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    id: "sos",
    label: "Emergency",
    icon: Phone,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
];

const positionClasses = {
  "bottom-right": "right-4 bottom-4",
  "bottom-left": "left-4 bottom-4",
  "bottom-center": "left-1/2 -translate-x-1/2 bottom-4",
};

export const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({
  actions = defaultActions,
  context = {},
  position = "bottom-right",
  className,
  onAction,
}) => {
  const eventBus = useEventBus();
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
    [context, onAction, eventBus]
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <Box
      ref={menuRef}
      className={cn("fixed z-50", positionClasses[position], className)}
    >
      <VStack gap="sm" align="end">
        {isOpen && (
          <VStack gap="sm" align="end">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <HStack key={action.id} gap="sm" align="center">
                  <Box
                    padding="sm"
                    rounded="lg"
                    className="bg-white shadow-lg"
                  >
                    <Typography variant="small" className="font-medium whitespace-nowrap">
                      {action.label}
                    </Typography>
                  </Box>

                  <button
                    type="button"
                    onClick={() => handleAction(action.id)}
                    className={cn(
                      "p-3 rounded-full shadow-lg transition-transform hover:scale-110",
                      action.bgColor || "bg-white",
                      action.color || "text-neutral-700"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                </HStack>
              );
            })}
          </VStack>
        )}

        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            "p-4 rounded-full shadow-lg transition-all",
            isOpen
              ? "bg-neutral-800 text-white rotate-45"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </button>
      </VStack>
    </Box>
  );
};

FloatingActionMenu.displayName = "FloatingActionMenu";
