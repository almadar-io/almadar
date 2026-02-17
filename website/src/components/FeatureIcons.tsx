import React from "react";
import {
  Workflow,
  GitGraph,
  Layers,
  Puzzle,
  Zap,
  Sparkles,
  Users,
  Cloud,
  ShieldCheck,
  LifeBuoy,
  GraduationCap,
  Settings,
  LucideProps,
} from "lucide-react";

/**
 * Modern Lucide icons for feature cards.
 * Replaces custom SVGs and generated images with a consistent icon library.
 */

interface IconProps extends LucideProps {
  size?: number;
  className?: string;
}

// === Build Faster Icons ===

/** Declarative Schemas -> Workflow */
export function SchemaIcon(props: IconProps) {
  return <Workflow {...props} />;
}

/** State Machines -> GitGraph */
export function StateMachineIcon(props: IconProps) {
  return <GitGraph {...props} />;
}

/** Full-Stack Generation -> Layers */
export function FullStackIcon(props: IconProps) {
  return <Layers {...props} />;
}

/** Built-in Integrations -> Puzzle */
export function IntegrationsIcon(props: IconProps) {
  return <Puzzle {...props} />;
}

/** Real-time & Games -> Zap */
export function RealtimeIcon(props: IconProps) {
  return <Zap {...props} />;
}

/** AI-Powered -> Sparkles */
export function AIIcon(props: IconProps) {
  return <Sparkles {...props} />;
}

// === Enterprise Icons ===

/** Team Collaboration -> Users */
export function TeamIcon(props: IconProps) {
  return <Users {...props} />;
}

/** Private Deployments -> Cloud */
export function DeploymentIcon(props: IconProps) {
  return <Cloud {...props} />;
}

/** Enterprise Security -> ShieldCheck */
export function SecurityIcon(props: IconProps) {
  return <ShieldCheck {...props} />;
}

/** Priority Support -> LifeBuoy */
export function SupportIcon(props: IconProps) {
  return <LifeBuoy {...props} />;
}

/** Custom Training -> GraduationCap */
export function TrainingIcon(props: IconProps) {
  return <GraduationCap {...props} />;
}

/** Custom Integrations -> Settings */
export function CustomizationIcon(props: IconProps) {
  return <Settings {...props} />;
}

/** Map of icon keys to components for easy lookup */
export const featureIconMap: Record<string, React.FC<IconProps>> = {
  schema: SchemaIcon,
  stateMachine: StateMachineIcon,
  fullStack: FullStackIcon,
  integrations: IntegrationsIcon,
  realtime: RealtimeIcon,
  ai: AIIcon,
  team: TeamIcon,
  deployment: DeploymentIcon,
  security: SecurityIcon,
  support: SupportIcon,
  training: TrainingIcon,
  customization: CustomizationIcon,
};
