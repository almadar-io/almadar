/**
 * Inspection System Templates
 *
 * Page-level templates for the inspection system.
 */

export { InspectionsTemplate, type InspectionsTemplateProps, type InspectionEntity } from "./InspectionsTemplate";
export { CompaniesTemplate, type CompaniesTemplateProps, type CompanyEntity } from "./CompaniesTemplate";
export { InspectorsTemplate, type InspectorsTemplateProps, type InspectorEntity } from "./InspectorsTemplate";
// Config-driven inspection form template
export {
  InspectionFormDemoTemplate,
  type InspectionFormDemoTemplateProps,
  type InspectionFormEntity,
  type DemoPhase,
  type FormTabConfig,
  type FormSection,
  type FormField,
  type FormState,
  type ViolationRecord,
  type PhaseDefinition,
  type SExpression,
} from "./InspectionFormTemplate";
