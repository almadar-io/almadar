/**
 * Domain Language Molecules
 *
 * Composite components for the domain language editor.
 */

export { DomainSectionHeader } from './DomainSectionHeader';
export type { DomainSectionHeaderProps, SectionType } from './DomainSectionHeader';

export { DomainFieldRow } from './DomainFieldRow';
export type { DomainFieldRowProps, FieldConstraint } from './DomainFieldRow';

export { DomainRelationshipRow } from './DomainRelationshipRow';
export type { DomainRelationshipRowProps, RelationshipType } from './DomainRelationshipRow';

export { DomainGuardRow } from './DomainGuardRow';
export type { DomainGuardRowProps, GuardExpression, GuardType } from './DomainGuardRow';

export { DomainTransitionRow } from './DomainTransitionRow';
export type { DomainTransitionRowProps, TransitionEffect } from './DomainTransitionRow';

export { DomainValidationMessage, DomainValidationSummary } from './DomainValidationMessage';
export type {
  DomainValidationMessageProps,
  DomainValidationSummaryProps,
  ValidationSeverity,
  ValidationSummary,
} from './DomainValidationMessage';
