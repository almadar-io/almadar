/**
 * AgentAvatar - Avatar indicator for agent/user messages
 *
 * Shows a small icon representing the message source.
 * Extends base Avatar component with agent-specific roles.
 *
 * Event Contract:
 * - Emits: None (display only)
 */

import React from "react";
import { Bot, User, Wrench, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Avatar } from '@almadar/ui';

export type AvatarRole = "assistant" | "user" | "system" | "tool";

export interface AgentAvatarProps {
  role: AvatarRole;
  size?: "sm" | "md" | "lg";
}

const roleConfig: Record<
  AvatarRole,
  {
    icon: LucideIcon;
    name: string;
  }
> = {
  assistant: {
    icon: Bot,
    name: "Assistant",
  },
  user: {
    icon: User,
    name: "User",
  },
  system: {
    icon: Settings,
    name: "System",
  },
  tool: {
    icon: Wrench,
    name: "Tool",
  },
};

const sizeMap: Record<
  AgentAvatarProps["size"] & string,
  "xs" | "sm" | "md" | "lg" | "xl"
> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export function AgentAvatar({ role, size = "md" }: AgentAvatarProps) {
  const config = roleConfig[role];

  return <Avatar icon={config.icon} name={config.name} size={sizeMap[size]} />;
}

export default AgentAvatar;
