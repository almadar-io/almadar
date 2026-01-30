/**
 * Inspection System Client Components
 *
 * Client-specific components for the government inspection system.
 * These components implement the inspection workflow with compliance tracking.
 *
 * Entity Mappings:
 * - Inspection: Core entity for inspections
 * - Company: Businesses being inspected
 * - Inspector: Government inspectors
 * - Participant: Company representatives
 * - InspectionRule: Compliance rules
 */

// Atoms
export {
  LawReferenceBadge,
  type LawReferenceBadgeProps,
} from "./atoms/LawReferenceBadge";

export {
  PhaseIndicator,
  type PhaseIndicatorProps,
  type InspectionPhase,
} from "./atoms/PhaseIndicator";

// Molecules
export {
  RuleCheckItem,
  type RuleCheckItemProps,
  type RuleSeverity,
} from "./molecules/RuleCheckItem";

export {
  ProgressHeader,
  type ProgressHeaderProps,
  type ProgressStep,
} from "./molecules/ProgressHeader";

export {
  ConditionalField,
  type ConditionalFieldProps,
  type FieldType,
  type FieldCondition,
  type FieldOption,
} from "./molecules/ConditionalField";

export {
  EntitySearch,
  type EntitySearchProps,
  type EntitySearchItem,
} from "./molecules/EntitySearch";

export {
  ParticipantList,
  type ParticipantListProps,
  type Participant,
} from "./molecules/ParticipantList";

export {
  PhotoAttachment,
  type PhotoAttachmentProps,
  type Photo,
} from "./molecules/PhotoAttachment";

export {
  RepeatableFormSection,
  type RepeatableFormSectionProps,
} from "./molecules/RepeatableFormSection";

export {
  CardSelector,
  type CardSelectorProps,
  type CardSelectorOption,
} from "./molecules/CardSelector";

export {
  ObjectionRecorder,
  type ObjectionRecorderProps,
  type Objection,
} from "./molecules/ObjectionRecorder";

export {
  DocumentPreview,
  type DocumentPreviewProps,
  type DocumentStatus,
} from "./molecules/DocumentPreview";

export {
  InspectionTimeline,
  type InspectionTimelineProps,
  type TimelineItem,
  type TimelineEventType,
} from "./molecules/InspectionTimeline";

export {
  ComplianceSummary,
  type ComplianceSummaryProps,
  type ComplianceStats,
} from "./molecules/ComplianceSummary";

// Organisms
export {
  FloatingActionMenu,
  type FloatingActionMenuProps,
  type FloatingAction,
} from "./organisms/FloatingActionMenu";

export {
  SignatureCapture,
  type SignatureCaptureProps,
} from "./organisms/SignatureCapture";

// Templates
export {
  InspectionsTemplate,
  type InspectionsTemplateProps,
  type InspectionData,
} from "./templates/InspectionsTemplate";

export {
  CompaniesTemplate,
  type CompaniesTemplateProps,
  type CompanyData,
} from "./templates/CompaniesTemplate";

export {
  InspectorsTemplate,
  type InspectorsTemplateProps,
  type InspectorData,
} from "./templates/InspectorsTemplate";

export {
  InspectionWizardTemplate,
  type InspectionWizardTemplateProps,
  type WizardStep,
} from "./templates/InspectionWizardTemplate";
