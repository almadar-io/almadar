/**
 * Inspection System Templates
 *
 * Page-level templates for the inspection system.
 */

export { InspectionsTemplate, type InspectionsTemplateProps, type InspectionData } from "./InspectionsTemplate";
export { CompaniesTemplate, type CompaniesTemplateProps, type CompanyData } from "./CompaniesTemplate";
export { InspectorsTemplate, type InspectorsTemplateProps, type InspectorData } from "./InspectorsTemplate";
export { InspectionWizardTemplate, type InspectionWizardTemplateProps, type WizardStep } from "./InspectionWizardTemplate";

// Comprehensive process template that represents the full inspection workflow
export {
  InspectionProcessTemplate,
  type InspectionProcessTemplateProps,
  type ProcessPhase,
  type ProcessStep,
  type IntroductionStep,
  type ContentStep,
  type PreparationStep,
  type RecordStep,
  type ClosingStep,
  type InspectionData as FullInspectionData,
  type Inspector,
  type Company,
  type AccompanyingPerson,
  type InspectionField,
  type InspectionRule,
  type RuleCheck,
  type Finding,
  type Decision,
  type Objection,
} from "./InspectionProcessTemplate";

// Config-driven demo template for client presentations
export {
  InspectionFormDemoTemplate,
  type InspectionFormDemoTemplateProps,
  type DemoPhase,
  type FormTabConfig,
  type FormSection,
  type FormField,
  type FormState,
  type ViolationRecord,
  type PhaseDefinition,
  type SExpression,
} from "./InspectionFormDemoTemplate";
