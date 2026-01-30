/**
 * Form Organism Component
 *
 * A form container component with submit/reset handling.
 * Supports both children-based and schema-based form generation.
 * Renders correct input types based on field definitions including relations.
 *
 * Extended for inspection forms with:
 * - Conditional field visibility via S-expressions
 * - Hidden calculations that emit GLOBAL_VARIABLE_SET events
 * - Violation triggers that emit VIOLATION_DETECTED events
 * - Nested sections with collapsible support
 */

import React from 'react';
import { cn } from '../../lib/cn';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { Select, type SelectOption } from '../atoms/Select';
import { Textarea } from '../atoms/Textarea';
import { Checkbox } from '../atoms/Checkbox';
import { Box } from '../atoms/Box';
import { VStack, HStack } from '../atoms/Stack';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { RelationSelect, type RelationOption } from '../molecules/RelationSelect';
import { Alert } from '../molecules/Alert';
import { useEventBus } from '../../hooks/useEventBus';
import { debug, debugGroup, debugGroupEnd, isDebugEnabled } from '../../lib/debug';
import {
  evaluate,
  createMinimalContext,
  type SExpr,
  type EvaluationContext as SharedEvaluationContext,
} from '../../evaluator';

/**
 * S-Expression type for conditional logic (re-export from @almadar/shared)
 */
export type SExpression = SExpr;

/**
 * Form-specific evaluation context
 */
export interface FormEvaluationContext {
  formValues: Record<string, unknown>;
  globalVariables: Record<string, unknown>;
  localVariables?: Record<string, unknown>;
  entity?: Record<string, unknown>;
}

/**
 * Convert form context to shared evaluator context
 */
function toSharedContext(formCtx: FormEvaluationContext): SharedEvaluationContext {
  return createMinimalContext(
    {
      formValues: formCtx.formValues,
      globalVariables: formCtx.globalVariables,
      localVariables: formCtx.localVariables ?? {},
      ...formCtx.entity,
    },
    {},
    'active'
  );
}

/**
 * Evaluate an S-expression using the shared evaluator
 */
function evaluateFormExpression(expr: SExpression, formCtx: FormEvaluationContext): unknown {
  const ctx = toSharedContext(formCtx);
  return evaluate(expr, ctx);
}

/**
 * Hidden calculation definition
 */
export interface HiddenCalculation {
  variableName: string;
  expression: SExpression;
  triggerFields: string[];
}

/**
 * Violation definition
 */
export interface ViolationDefinition {
  law: string;
  article: string;
  actionType: 'measure' | 'admin' | 'penalty';
  message: string;
}

/**
 * Violation trigger definition
 */
export interface ViolationTrigger {
  condition: SExpression;
  violation: ViolationDefinition;
  fieldId?: string;
}

/**
 * Form section definition for nested sections
 */
export interface FormSection {
  id: string;
  title: string;
  condition?: SExpression;
  fields: SchemaField[];
  collapsible?: boolean;
}

/**
 * Form tab definition for tabbed inspection forms
 */
export interface FormTabDefinition {
  /** Unique tab identifier */
  id: string;
  /** Tab display label */
  label: string;
  /** Icon name for the tab (from Icon component) */
  icon?: string;
  /** Sections within this tab */
  sections: FormSection[];
  /** Condition for showing/hiding the entire tab */
  condition?: SExpression;
  /** Badge count or text to display on tab */
  badge?: string | number;
  /** Whether this tab has validation errors */
  hasErrors?: boolean;
}

/**
 * Relation configuration for foreign key fields
 */
export interface RelationConfig {
  /** Target entity name (e.g., 'User', 'Project') */
  entity: string;
  /** Field on target entity to display (defaults to 'name') */
  displayField?: string;
  /** Cardinality: one-to-one or one-to-many */
  cardinality?: 'one' | 'many';
}

/**
 * Schema field definition
 * Supports both 'name' and 'field' for compatibility with different schema formats
 */
export interface SchemaField {
  /** Field name (primary) */
  name?: string;
  /** Field name (alias for compatibility) */
  field?: string;
  /** Display label */
  label?: string;
  /** Field type (string, number, email, date, boolean, enum, relation, etc.) */
  type?: string;
  /** Input type for rendering (text, select, textarea, checkbox, etc.) */
  inputType?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether field is required */
  required?: boolean;
  /** Default value */
  defaultValue?: unknown;
  /** Options for select/enum fields - accepts readonly for generated const arrays */
  options?: readonly SelectOption[];
  /** Enum values (alternative to options, just strings) - accepts readonly for generated const arrays */
  values?: readonly string[];
  /** Relation configuration for foreign key references */
  relation?: RelationConfig;
  /** Minimum value (for number) or length (for string) */
  min?: number;
  /** Maximum value or length */
  max?: number;
  /** Pattern for validation */
  pattern?: string;
  /** Validation rules */
  validation?: Record<string, unknown>;
  /** Whether field is readonly (displays value but cannot edit) */
  readonly?: boolean;
  /** Whether field is disabled (alternative to readonly for compatibility) */
  disabled?: boolean;
}

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Form fields (traditional React children) */
  children?: React.ReactNode;
  /** Submit handler - receives form data, or event name string for trait dispatch */
  onSubmit?: ((e: React.FormEvent<HTMLFormElement>, data?: Record<string, unknown>) => void) | string;
  /** Cancel handler - function or event name string for trait dispatch */
  onCancel?: (() => void) | string;
  /** Form layout */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** Gap between fields */
  gap?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;

  // Schema-based props
  /** Entity type name (schema format) */
  entity?: string;
  /** Form mode - 'create' for new records, 'edit' for updating existing */
  mode?: 'create' | 'edit';
  /** Fields definition (schema format) - accepts readonly for generated const arrays */
  fields?: readonly Readonly<SchemaField>[];
  /** Initial form data */
  initialData?: Record<string, unknown>;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Submit button label */
  submitLabel?: string;
  /** Cancel button label (if provided, shows cancel button) */
  cancelLabel?: string;
  /** Show cancel button (defaults to true for schema forms) */
  showCancel?: boolean;
  /** Form title (used by ModalSlot to extract title) */
  title?: string;

  // Event dispatch props (for trait state machine integration)
  /** Event to dispatch on successful submit (defaults to 'SAVE') */
  submitEvent?: string;
  /** Event to dispatch on cancel (defaults to 'CANCEL') */
  cancelEvent?: string;

  // Relation data props
  /** Data for relation fields: { fieldName: RelationOption[] } */
  relationsData?: Record<string, readonly RelationOption[]>;
  /** Loading state for relation data: { fieldName: boolean } */
  relationsLoading?: Record<string, boolean>;

  // Inspection form extensions
  /** Map of fieldId → S-expression condition for conditional field display */
  conditionalFields?: Record<string, SExpression>;
  /** Hidden calculations that emit GLOBAL_VARIABLE_SET on field change */
  hiddenCalculations?: HiddenCalculation[];
  /** Violation conditions that emit VIOLATION_DETECTED when met */
  violationTriggers?: ViolationTrigger[];
  /** Context for S-expression evaluation */
  evaluationContext?: FormEvaluationContext;
  /** Nested form sections with optional conditions */
  sections?: FormSection[];
  /** Callback when any field value changes */
  onFieldChange?: (change: { fieldId: string; value: unknown; formValues: Record<string, unknown> }) => void;
}

const layoutStyles = {
  vertical: 'flex flex-col',
  horizontal: 'flex flex-row flex-wrap items-end',
  inline: 'flex flex-row flex-wrap items-center',
};

const gapStyles = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

/**
 * Get enum options from field definition
 */
function getEnumOptions(field: SchemaField): SelectOption[] {
  // First check if options are already SelectOption format
  // Spread to convert readonly to mutable array
  if (field.options && field.options.length > 0) {
    return [...field.options];
  }

  // Check for values array (just strings)
  if (field.values && field.values.length > 0) {
    return field.values.map((v) => ({
      value: v,
      label: v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, ' '),
    }));
  }

  // Check for validation.enum
  const validation = field.validation as Record<string, unknown> | undefined;
  if (validation?.enum && Array.isArray(validation.enum)) {
    return (validation.enum as string[]).map((v) => ({
      value: v,
      label: v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, ' '),
    }));
  }

  return [];
}

/**
 * Determine the appropriate input type based on field definition
 */
function determineInputType(field: SchemaField): string {
  // If inputType is explicitly set, use it
  if (field.inputType) {
    return field.inputType;
  }

  // Check for relation type
  if (field.type === 'relation' || field.relation) {
    return 'relation';
  }

  // Check for enum type
  if (field.type === 'enum' || field.values || getEnumOptions(field).length > 0) {
    return 'select';
  }

  // Map type to inputType
  switch (field.type?.toLowerCase()) {
    case 'email':
      return 'email';
    case 'password':
      return 'password';
    case 'url':
      return 'url';
    case 'number':
    case 'integer':
    case 'float':
      return 'number';
    case 'date':
      return 'date';
    case 'datetime':
    case 'timestamp':
      return 'datetime-local';
    case 'boolean':
      return 'checkbox';
    case 'textarea':
    case 'text':
      return field.max && field.max > 200 ? 'textarea' : 'text';
    default:
      return 'text';
  }
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  onCancel,
  layout = 'vertical',
  gap = 'md',
  className,
  // Schema-based props
  entity,
  fields,
  initialData = {},
  isLoading = false,
  error,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  showCancel,
  title,
  submitEvent = 'SAVE',
  cancelEvent = 'CANCEL',
  relationsData = {},
  relationsLoading = {},
  // Inspection form extensions
  conditionalFields = {},
  hiddenCalculations = [],
  violationTriggers = [],
  evaluationContext: externalContext,
  sections = [],
  onFieldChange,
  ...props
}) => {
  const eventBus = useEventBus();
  const [formData, setFormData] = React.useState<Record<string, unknown>>(initialData);
  const [collapsedSections, setCollapsedSections] = React.useState<Set<string>>(new Set());

  // Default to showing cancel button for schema-based forms
  const shouldShowCancel = showCancel ?? (fields && fields.length > 0);

  // Build evaluation context from form data and external context
  const evalContext: FormEvaluationContext = React.useMemo(() => ({
    formValues: formData,
    globalVariables: externalContext?.globalVariables ?? {},
    localVariables: externalContext?.localVariables ?? {},
    entity: externalContext?.entity ?? {},
  }), [formData, externalContext]);

  // Sync form data when initialData changes (e.g., when data loads from API)
  React.useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    }
  }, [initialData]);

  /**
   * Process hidden calculations when triggered fields change
   */
  const processCalculations = React.useCallback((changedFieldId: string, newFormData: Record<string, unknown>) => {
    if (!hiddenCalculations.length) return;

    const context: FormEvaluationContext = {
      formValues: newFormData,
      globalVariables: externalContext?.globalVariables ?? {},
      localVariables: externalContext?.localVariables ?? {},
      entity: externalContext?.entity ?? {},
    };

    hiddenCalculations.forEach(calc => {
      if (calc.triggerFields.includes(changedFieldId)) {
        const value = evaluateFormExpression(calc.expression, context);
        eventBus.emit('UI:GLOBAL_VARIABLE_SET', {
          variable: calc.variableName,
          value,
        });
        debug('forms', `Calculation triggered: ${calc.variableName} = ${value}`);
      }
    });
  }, [hiddenCalculations, externalContext, eventBus]);

  /**
   * Check violation triggers when form data changes
   */
  const checkViolations = React.useCallback((changedFieldId: string, newFormData: Record<string, unknown>) => {
    if (!violationTriggers.length) return;

    const context: FormEvaluationContext = {
      formValues: newFormData,
      globalVariables: externalContext?.globalVariables ?? {},
      localVariables: externalContext?.localVariables ?? {},
      entity: externalContext?.entity ?? {},
    };

    violationTriggers.forEach(trigger => {
      const conditionMet = evaluateFormExpression(trigger.condition, context);
      if (conditionMet) {
        eventBus.emit('UI:VIOLATION_DETECTED', {
          fieldId: trigger.fieldId ?? changedFieldId,
          ...trigger.violation,
        });
        debug('forms', `Violation detected: ${trigger.violation.law} ${trigger.violation.article}`);
      }
    });
  }, [violationTriggers, externalContext, eventBus]);

  const handleChange = (name: string, value: unknown) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Emit field change event
    eventBus.emit('UI:FIELD_CHANGED', { fieldId: name, value, formValues: newFormData });

    // Call external handler if provided
    onFieldChange?.({ fieldId: name, value, formValues: newFormData });

    // Process calculations and check violations
    processCalculations(name, newFormData);
    checkViolations(name, newFormData);
  };

  /**
   * Check if a field should be visible based on its condition
   */
  const isFieldVisible = React.useCallback((fieldName: string): boolean => {
    const condition = conditionalFields[fieldName];
    if (!condition) return true;
    return Boolean(evaluateFormExpression(condition, evalContext));
  }, [conditionalFields, evalContext]);

  /**
   * Check if a section should be visible based on its condition
   */
  const isSectionVisible = React.useCallback((section: FormSection): boolean => {
    if (!section.condition) return true;
    return Boolean(evaluateFormExpression(section.condition, evalContext));
  }, [evalContext]);

  /**
   * Toggle section collapsed state
   */
  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch submit event for trait state machine integration
    eventBus.emit(`UI:${submitEvent}`, { data: formData, entity });
    // Handle onSubmit - can be a function or event name string
    if (typeof onSubmit === 'function') {
      onSubmit(e, formData);
    } else if (typeof onSubmit === 'string') {
      eventBus.emit(`UI:${onSubmit}`, { data: formData, entity });
    }
  };

  const handleCancel = () => {
    // Dispatch cancel event for trait state machine integration
    eventBus.emit(`UI:${cancelEvent}`);
    eventBus.emit('UI:CLOSE');
    // Handle onCancel - can be a function or event name string
    if (typeof onCancel === 'function') {
      onCancel();
    } else if (typeof onCancel === 'string') {
      eventBus.emit(`UI:${onCancel}`);
    }
  };

  /**
   * Render a single field with conditional visibility
   */
  const renderField = React.useCallback((field: SchemaField) => {
    const fieldName = field.name || field.field;
    if (!fieldName) return null;

    // Check conditional visibility
    if (!isFieldVisible(fieldName)) {
      return null;
    }

    const inputType = determineInputType(field);
    const label = field.label || fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1');
    const currentValue = formData[fieldName] ?? field.defaultValue ?? '';

    return (
      <VStack key={fieldName} gap="xs">
        {inputType !== 'checkbox' && (
          <Typography as="label" variant="label" weight="bold" className="text-black">
            {label}
            {field.required && <Typography as="span" color="error" className="ml-1">*</Typography>}
          </Typography>
        )}
        {renderFieldInput(field, fieldName, inputType, currentValue, label)}
      </VStack>
    );
  }, [formData, isFieldVisible, relationsData, relationsLoading, isLoading]);

  // Generate form fields from schema
  const schemaFields = React.useMemo(() => {
    if (!fields || fields.length === 0) return null;

    if (isDebugEnabled()) {
      debugGroup(`Form: ${entity || 'unknown'}`);
      debug(`Fields count: ${fields.length}`);
      debug('Conditional fields:', Object.keys(conditionalFields));
      debugGroupEnd();
    }

    return fields.map(renderField).filter(Boolean);
  }, [fields, renderField, entity, conditionalFields]);

  // Generate form sections with nested fields
  const sectionElements = React.useMemo(() => {
    if (!sections || sections.length === 0) return null;

    return sections.map(section => {
      if (!isSectionVisible(section)) {
        return null;
      }

      const isCollapsed = collapsedSections.has(section.id);

      return (
        <Box
          key={section.id}
          border
          rounded="lg"
          overflow="hidden"
        >
          <Box
            className={cn(
              'px-4 py-3 bg-gray-50 flex items-center justify-between',
              section.collapsible && 'cursor-pointer hover:bg-gray-100'
            )}
            onClick={section.collapsible ? () => toggleSection(section.id) : undefined}
          >
            <Typography variant="label" weight="semibold">
              {section.title}
            </Typography>
            {section.collapsible && (
              <Icon
                name="chevron-down"
                size="md"
                className={cn('text-gray-500 transition-transform', isCollapsed && 'rotate-180')}
              />
            )}
          </Box>
          {!isCollapsed && (
            <Box padding="md">
              <VStack gap={gap === 'sm' ? 'sm' : gap === 'lg' ? 'lg' : 'md'}>
                {section.fields.map(renderField).filter(Boolean)}
              </VStack>
            </Box>
          )}
        </Box>
      );
    }).filter(Boolean);
  }, [sections, isSectionVisible, collapsedSections, renderField, gap]);

  /**
   * Render the appropriate input component based on field type
   */
  function renderFieldInput(
    field: SchemaField,
    fieldName: string,
    inputType: string,
    currentValue: unknown,
    label: string
  ): React.ReactNode {
    const commonProps = {
      id: fieldName,
      name: fieldName,
      required: field.required,
      disabled: isLoading,
      placeholder: field.placeholder,
    };

    switch (inputType) {
      case 'checkbox':
        return (
          <Checkbox
            {...commonProps}
            label={label + (field.required ? ' *' : '')}
            checked={Boolean(currentValue)}
            onChange={(e) => handleChange(fieldName, e.target.checked)}
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            value={String(currentValue)}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            minLength={field.min}
            maxLength={field.max}
          />
        );

      case 'select': {
        const options = getEnumOptions(field);
        return (
          <Select
            {...commonProps}
            options={options}
            value={String(currentValue)}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            placeholder={field.placeholder || `Select ${label}...`}
          />
        );
      }

      case 'relation': {
        // Get relation options from relationsData
        const relationOptions = relationsData[fieldName] || [];
        const relationLoading = relationsLoading[fieldName] || false;

        return (
          <RelationSelect
            {...commonProps}
            value={currentValue ? String(currentValue) : undefined}
            onChange={(value) => handleChange(fieldName, value)}
            options={relationOptions}
            isLoading={relationLoading}
            placeholder={field.placeholder || `Select ${label}...`}
            searchPlaceholder={`Search ${field.relation?.entity || label}...`}
            clearable={!field.required}
          />
        );
      }

      case 'number':
        return (
          <Input
            {...commonProps}
            type="number"
            value={currentValue !== undefined && currentValue !== '' ? String(currentValue) : ''}
            onChange={(e) => handleChange(fieldName, e.target.value ? Number(e.target.value) : undefined)}
            min={field.min}
            max={field.max}
          />
        );

      case 'date':
        return (
          <Input
            {...commonProps}
            type="date"
            value={formatDateValue(currentValue)}
            onChange={(e) => handleChange(fieldName, e.target.value)}
          />
        );

      case 'datetime-local':
        return (
          <Input
            {...commonProps}
            type="datetime-local"
            value={formatDateTimeValue(currentValue)}
            onChange={(e) => handleChange(fieldName, e.target.value)}
          />
        );

      case 'email':
        return (
          <Input
            {...commonProps}
            type="email"
            value={String(currentValue)}
            onChange={(e) => handleChange(fieldName, e.target.value)}
          />
        );

      case 'url':
        return (
          <Input
            {...commonProps}
            type="url"
            value={String(currentValue)}
            onChange={(e) => handleChange(fieldName, e.target.value)}
          />
        );

      case 'password':
        return (
          <Input
            {...commonProps}
            type="password"
            value={String(currentValue)}
            onChange={(e) => handleChange(fieldName, e.target.value)}
          />
        );

      case 'text':
      default:
        return (
          <Input
            {...commonProps}
            type="text"
            value={String(currentValue)}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            minLength={field.min}
            maxLength={field.max}
            pattern={field.pattern}
          />
        );
    }
  }

  return (
    <form
      className={cn(
        layoutStyles[layout],
        gapStyles[gap],
        className
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      {/* Error state */}
      {error && (
        <Alert variant="error" className="mb-4">
          {error.message || 'An error occurred'}
        </Alert>
      )}

      {/* Render sections (inspection forms with nested sections) */}
      {sectionElements && sectionElements.length > 0 && (
        <VStack gap={gap === 'sm' ? 'sm' : gap === 'lg' ? 'lg' : 'md'}>
          {sectionElements}
        </VStack>
      )}

      {/* Render schema-generated fields (flat fields outside sections) */}
      {schemaFields}

      {/* Render children (traditional form content) */}
      {children}

      {/* Action buttons for schema-based forms */}
      {((schemaFields && schemaFields.length > 0) || (sectionElements && sectionElements.length > 0)) && (
        <HStack gap="sm" className="pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            data-event={submitEvent}
            data-testid={`action-${submitEvent}`}
          >
            {isLoading ? 'Saving...' : submitLabel}
          </Button>
          {shouldShowCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isLoading}
              data-event={cancelEvent}
              data-testid={`action-${cancelEvent}`}
            >
              {cancelLabel}
            </Button>
          )}
        </HStack>
      )}
    </form>
  );
};

/**
 * Format date value for date input
 */
function formatDateValue(value: unknown): string {
  if (!value) return '';

  if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  }

  if (typeof value === 'string') {
    // Try to parse as date
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    return value;
  }

  return '';
}

/**
 * Format datetime value for datetime-local input
 */
function formatDateTimeValue(value: unknown): string {
  if (!value) return '';

  if (value instanceof Date) {
    return value.toISOString().slice(0, 16);
  }

  if (typeof value === 'string') {
    // Try to parse as date
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.toISOString().slice(0, 16);
    }
    return value;
  }

  return '';
}

Form.displayName = 'Form';
