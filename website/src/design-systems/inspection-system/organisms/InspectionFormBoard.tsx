/**
 * InspectionFormBoard Organism
 *
 * Config-driven inspection form workflow with all state, logic, sub-components,
 * and event emission. Extracted from InspectionFormDemoTemplate for flattener compliance.
 *
 * Contains:
 * - SingleFieldInput (18 field types)
 * - FieldRenderer (repeatable + single fields)
 * - SectionRenderer (recursive with collapse/expand)
 * - DebugPanel (global/local vars, violations, completed tabs)
 * - Main form with phase/tab navigation
 */

import React, { useState, useCallback, useMemo } from "react";

// Atoms
import { PhaseIndicator, InspectionPhase } from "../atoms/PhaseIndicator";

// Molecules
import { RepeatableFormSection } from "../molecules/RepeatableFormSection";
import { CardSelector, CardSelectorOption } from "../molecules/CardSelector";
import { ContextMenu } from "../molecules/ContextMenu";

// Organisms
import { SignatureCapture } from "../organisms/SignatureCapture";

// Evaluator - stub implementation for design system (actual implementation in @almadar/evaluator)
class SExpressionEvaluator {
  evaluate(expr: unknown, _context: Record<string, unknown>): unknown {
    if (typeof expr === "boolean") return expr;
    return true;
  }
}
const createMinimalContext = (
  _options?: Record<string, unknown>,
): Record<string, unknown> => ({});

import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Bug,
  Briefcase,
  ClipboardCheck,
  FileText,
  FileCheck,
  PenTool,
} from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Card,
  Badge,
  useEventBus,
  useTranslate,
  StatCard,
  Input,
  Checkbox,
  Select,
  Textarea,
} from '@almadar/ui';

// =============================================================================
// Types
// =============================================================================

export type DemoPhase =
  | "introduction"
  | "content"
  | "preparation"
  | "record"
  | "closing";

export interface FormTabConfig {
  tabId: string;
  name: string;
  globalVariablesSet?: string[];
  globalVariablesRequired?: string[];
  localVariables?: string[];
  sections: FormSection[];
}

export interface FormSection {
  id: string;
  title: string;
  condition?: SExpression;
  fields: FormField[];
  subsections?: FormSection[];
  contextMenu?: string[];
  repeatable?: boolean;
  collectionName?: string;
  minItems?: number;
  maxItems?: number;
}

export interface FormField {
  id: string;
  label: string;
  type:
  | "text"
  | "textarea"
  | "date"
  | "datetime"
  | "dropdown"
  | "radio"
  | "checkbox"
  | "comment"
  | "currency"
  | "integer"
  | "decimal"
  | "person"
  | "info-display"
  | "card-selector"
  | "signature"
  | "stats-grid"
  | "multi-select"
  | "entity-list"
  | "entity-cards"
  | "checklist";
  required?: boolean;
  repeatable?: boolean;
  options?: Array<{
    value: string;
    label: string;
    isDefault?: boolean;
    icon?: string;
    description?: string;
  }>;
  defaultValue?: string;
  condition?: SExpression;
  contextMenu?: string[];
  lawReference?: { law: string; article: string };
  hiddenCalculation?: { variable: string; scope: "global" | "local" };
  violationTrigger?: {
    id: string;
    condition: SExpression;
    lawReference: string;
  };
  entityField?: string;
  displayContent?: string;
  displayVariant?: "info" | "warning" | "success" | "error";
  columns?: 1 | 2 | 3 | 4;
  multiple?: boolean;
  stats?: Array<{ label: string; value: string | number; icon?: string }>;
  entityType?: string;
  displayFields?: string[];
  checklistItems?: Array<{ id: string; label: string; required?: boolean }>;
}

export type SExpression = string | number | boolean | SExpression[];

export interface ViolationRecord {
  id: string;
  tabId: string;
  fieldId: string;
  lawReference: string;
  adminAction?: string;
  penaltyAction?: string;
  description?: string;
  timestamp: string;
}

export interface FormState {
  formValues: Record<string, unknown>;
  globalVariables: Record<string, unknown>;
  localVariables: Record<string, unknown>;
  violations: ViolationRecord[];
  completedTabs: string[];
}

export interface PhaseDefinition {
  id: DemoPhase;
  label: string;
  labelSl: string;
  icon: typeof Briefcase;
  tabs: string[];
}

export type MockEntityData = Record<string, Array<Record<string, unknown>>>;

export interface InspectionFormEntity {
  configs: Record<string, FormTabConfig>;
  initialState?: Partial<FormState>;
  mockData?: MockEntityData;
}

export interface InspectionFormBoardProps {
  /** Inspection form entity data */
  entity: InspectionFormEntity;
  /** Current phase override */
  currentPhase?: DemoPhase;
  /** Current tab override */
  currentTab?: string;
  /** Show debug panel */
  showDebugPanel?: boolean;
  /** Declarative event: field value changed */
  fieldChangedEvent?: string;
  /** Declarative event: global variable set */
  globalVariableSetEvent?: string;
  /** Declarative event: tab changed */
  tabChangedEvent?: string;
  /** Declarative event: phase changed */
  phaseChangedEvent?: string;
  /** Declarative event: previous navigation */
  previousEvent?: string;
  /** Declarative event: next navigation */
  nextEvent?: string;
  /** Declarative event: form completed */
  completeEvent?: string;
  /** Declarative event: context menu action */
  contextActionEvent?: string;
  /** Additional class names */
  className?: string;
  /** Loading state indicator */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
}

// =============================================================================
// Phase Configuration
// =============================================================================

const phases: PhaseDefinition[] = [
  {
    id: "introduction",
    label: "inspection.phase.introduction",
    labelSl: "Uvod",
    icon: Briefcase,
    tabs: ["T-001", "T-002", "T-003", "T-004"],
  },
  {
    id: "content",
    label: "inspection.phase.content",
    labelSl: "Vsebina",
    icon: ClipboardCheck,
    tabs: ["T-005", "T2-1"],
  },
  {
    id: "preparation",
    label: "inspection.phase.preparation",
    labelSl: "Priprava",
    icon: FileText,
    tabs: ["T-006", "T-007"],
  },
  {
    id: "record",
    label: "inspection.phase.record",
    labelSl: "Zapisnik",
    icon: FileCheck,
    tabs: ["T-008"],
  },
  {
    id: "closing",
    label: "inspection.phase.closing",
    labelSl: "Zaključek",
    icon: PenTool,
    tabs: ["T-009"],
  },
];

// =============================================================================
// S-Expression Evaluator
// =============================================================================

const sexprEvaluator = new SExpressionEvaluator();

function evaluateSExpression(
  expr: SExpression | undefined,
  context: {
    formValues: Record<string, unknown>;
    globalVariables: Record<string, unknown>;
  },
): boolean {
  if (expr === undefined || expr === null) return true;
  if (typeof expr === "boolean") return expr;
  if (typeof expr === "string" || typeof expr === "number")
    return Boolean(expr);
  if (!Array.isArray(expr) || expr.length === 0) return true;

  try {
    const evalContext = createMinimalContext({
      entity: {
        formValues: context.formValues,
        globalVariables: context.globalVariables,
      },
    });
    const result = sexprEvaluator.evaluate(expr, evalContext);
    return Boolean(result);
  } catch (error) {
    console.warn("S-expression evaluation error:", error, "Expression:", expr);
    return true;
  }
}

// =============================================================================
// Sub-Components
// =============================================================================

interface FieldRendererProps {
  field: FormField;
  value: unknown;
  onChange: (value: unknown) => void;
  isVisible: boolean;
  mockData?: MockEntityData;
  contextActionEvent?: string;
  className?: string;
  isLoading?: boolean;
  error?: Error | null;
  entity?: string;
}

const SingleFieldInput: React.FC<{
  field: FormField;
  value: unknown;
  onChange: (value: unknown) => void;
  inputClasses: string;
  instanceId?: string;
  mockData?: MockEntityData;
}> = ({ field, value, onChange, inputClasses, instanceId, mockData = {} }) => {
  const { t } = useTranslate();
  const radioName = instanceId ? `${field.id}-${instanceId}` : field.id;

  return (
    <>
      {field.type === "text" && (
        <Input
          className={inputClasses}
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "textarea" && (
        <Textarea
          className={cn(inputClasses, "min-h-[80px]")}
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "date" && (
        <Input
          inputType="date"
          className={inputClasses}
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "dropdown" && (
        <Select
          className={inputClasses}
          value={String(value || field.defaultValue || "")}
          onChange={(e) => onChange(e.target.value)}
          options={(field.options || []).map((opt) => ({ value: opt.value, label: opt.label }))}
        />
      )}

      {field.type === "radio" && (
        <HStack gap="md">
          {field.options?.map((opt) => (
            <HStack key={opt.value} gap="xs" className="cursor-pointer">
              {/* eslint-disable-next-line almadar/no-raw-dom-elements */}
              <input
                type="radio"
                name={radioName}
                value={opt.value}
                checked={String(value || field.defaultValue) === opt.value}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4"
              />
              <Typography
                variant="body"
                weight={opt.isDefault ? "semibold" : "normal"}
              >
                {opt.label}
              </Typography>
            </HStack>
          ))}
        </HStack>
      )}

      {field.type === "checkbox" && (
        <Checkbox
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      )}

      {(field.type === "currency" || field.type === "decimal") && (
        <Input
          inputType="number"
          step="0.01"
          className={inputClasses}
          value={String(value || "")}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
      )}

      {field.type === "integer" && (
        <Input
          inputType="number"
          step="1"
          className={inputClasses}
          value={String(value || "")}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
      )}

      {field.type === "person" && (
        <Input
          className={inputClasses}
          placeholder={t('common.search')}
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "info-display" && (
        <Box
          className={cn(
            "p-4 rounded-lg border-l-4",
            field.displayVariant === "warning" &&
            "bg-yellow-50 border-yellow-400 text-yellow-800",
            field.displayVariant === "success" &&
            "bg-green-50 border-green-400 text-green-800",
            field.displayVariant === "error" &&
            "bg-red-50 border-red-400 text-red-800",
            (!field.displayVariant || field.displayVariant === "info") &&
            "bg-blue-50 border-blue-400 text-blue-800",
          )}
        >
          <Typography variant="body">
            {field.displayContent || field.label}
          </Typography>
        </Box>
      )}

      {field.type === "card-selector" &&
        (() => {
          const entityData = field.entityType
            ? mockData[field.entityType] || []
            : [];
          const optionsFromEntity = entityData.map(
            (item) =>
              ({
                id: String(item.id),
                title: String(item.name || item.label || item.id),
                description: item.description
                  ? String(item.description)
                  : undefined,
              }) as CardSelectorOption,
          );

          const optionsFromConfig = (field.options || []).map(
            (opt) =>
              ({
                id: opt.value,
                title: opt.label,
                description: opt.description,
              }) as CardSelectorOption,
          );

          const options =
            optionsFromEntity.length > 0
              ? optionsFromEntity
              : optionsFromConfig;

          return (
            <CardSelector
              options={options}
              selectedId={field.multiple ? undefined : String(value || "")}
              selectedIds={
                field.multiple && Array.isArray(value)
                  ? (value as string[])
                  : []
              }
              multiple={field.multiple}
              columns={field.columns || 3}
              onChange={(selectedId) => onChange(selectedId)}
              onMultiChange={(selectedIds) => onChange(selectedIds)}
            />
          );
        })()}

      {field.type === "signature" && (
        <SignatureCapture
          title={field.label}
          participantId={instanceId || field.id}
          required={field.required}
          onCapture={(signatureData) => onChange(signatureData)}
          onClear={() => onChange(null)}
        />
      )}

      {field.type === "stats-grid" && (
        <HStack gap="md" className="flex-wrap">
          {(field.stats || []).map((stat, idx) => (
            <StatCard key={idx} label={stat.label} value={stat.value} />
          ))}
        </HStack>
      )}

      {field.type === "multi-select" && (
        <VStack gap="xs" className="p-3 border rounded bg-neutral-50">
          {field.options?.map((opt) => {
            const selectedValues = Array.isArray(value) ? value : [];
            const isChecked = selectedValues.includes(opt.value);
            return (
              <HStack key={opt.value} gap="xs" className="cursor-pointer">
                <Checkbox
                  checked={isChecked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...selectedValues, opt.value]);
                    } else {
                      onChange(
                        selectedValues.filter((v: string) => v !== opt.value),
                      );
                    }
                  }}
                />
                <Typography variant="body">{opt.label}</Typography>
              </HStack>
            );
          })}
        </VStack>
      )}

      {field.type === "entity-list" &&
        (() => {
          const entityData = field.entityType
            ? mockData[field.entityType] || []
            : [];
          const items =
            entityData.length > 0
              ? entityData
              : Array.isArray(value)
                ? value
                : [];

          return (
            <Box className="border rounded overflow-hidden">
              {/* eslint-disable-next-line almadar/no-raw-dom-elements */}
              <table className="w-full text-sm">
                {/* eslint-disable-next-line almadar/no-raw-dom-elements */}
                <thead className="bg-neutral-100">
                  {/* eslint-disable-next-line almadar/no-raw-dom-elements */}
                  <tr>
                    {(field.displayFields || ["name"]).map((fieldName) => (
                      // eslint-disable-next-line almadar/no-raw-dom-elements
                      <th
                        key={fieldName}
                        className="px-3 py-2 text-left font-medium text-[var(--color-foreground)]"
                      >
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* eslint-disable-next-line almadar/no-raw-dom-elements */}
                <tbody>
                  {items.length > 0 ? (
                    items.map((item: Record<string, unknown>, idx: number) => (
                      // eslint-disable-next-line almadar/no-raw-dom-elements
                      <tr key={idx} className="border-t hover:bg-neutral-50">
                        {(field.displayFields || ["name"]).map((fieldName) => (
                          // eslint-disable-next-line almadar/no-raw-dom-elements
                          <td
                            key={fieldName}
                            className="px-3 py-2 text-[var(--color-foreground)]"
                          >
                            {String(item[fieldName] || "-")}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    // eslint-disable-next-line almadar/no-raw-dom-elements
                    <tr>
                      {/* eslint-disable-next-line almadar/no-raw-dom-elements */}
                      <td
                        colSpan={(field.displayFields || ["name"]).length}
                        className="px-3 py-4 text-center text-[var(--color-muted-foreground)]"
                      >
                        {t('common.noItemsToDisplay')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Box>
          );
        })()}

      {field.type === "entity-cards" &&
        (() => {
          const entityData = field.entityType
            ? mockData[field.entityType] || []
            : [];
          const items =
            entityData.length > 0
              ? entityData
              : Array.isArray(value)
                ? value
                : [];

          return (
            <HStack gap="md" className="flex-wrap">
              {items.length > 0 ? (
                items.map((item: Record<string, unknown>, idx: number) => (
                  <Card key={idx} className="p-4">
                    <VStack gap="xs">
                      {(field.displayFields || ["name"]).map((fieldName) => (
                        <Typography key={fieldName} variant="body">
                          <Typography variant="body" weight="semibold" as="span">{fieldName}:</Typography>{" "}
                          {String(item[fieldName] || "-")}
                        </Typography>
                      ))}
                    </VStack>
                  </Card>
                ))
              ) : (
                <Box className="col-span-full p-4 text-center text-[var(--color-muted-foreground)] border rounded">
                  {t('common.noItemsToDisplay')}
                </Box>
              )}
            </HStack>
          );
        })()}

      {field.type === "datetime" && (
        <Input
          inputType="datetime-local"
          className={inputClasses}
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "checklist" && (
        <VStack gap="xs" className="p-3 border rounded bg-neutral-50">
          {(field.checklistItems || field.options || []).map(
            (item: { id?: string; value?: string; label: string }) => {
              const itemId = item.id ?? item.value ?? "";
              const itemLabel = item.label;
              const checklistValue = (value as Record<string, boolean>) || {};
              const isChecked = Boolean(checklistValue[itemId]);
              return (
                <HStack
                  key={itemId}
                  gap="sm"
                  align="start"
                  className="cursor-pointer p-2 hover:bg-neutral-100 rounded"
                >
                  <Checkbox
                    checked={isChecked}
                    onChange={(e) => {
                      onChange({
                        ...checklistValue,
                        [itemId]: e.target.checked,
                      });
                    }}
                  />
                  <Typography
                    variant="body"
                    className={cn(isChecked && "line-through text-[var(--color-muted-foreground)]")}
                  >
                    {String(itemLabel)}
                    {"required" in item &&
                      (item as { required?: boolean }).required && (
                        <Typography variant="body" as="span" className="text-red-500 ml-1">*</Typography>
                      )}
                  </Typography>
                </HStack>
              );
            },
          )}
        </VStack>
      )}
    </>
  );
};

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  isVisible,
  mockData = {},
  contextActionEvent,
}) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  if (!isVisible) return null;
  if (field.type === "comment") {
    return (
      <Box className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
        <Typography variant="small" className="text-blue-800">
          {field.label}
        </Typography>
      </Box>
    );
  }

  const inputClasses =
    "w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  if (field.repeatable) {
    const items = Array.isArray(value)
      ? value
      : value
        ? [{ id: "1", value }]
        : [];

    const handleAdd = () => {
      const newItem = { id: String(Date.now()), value: "" };
      onChange([...items, newItem]);
    };

    const handleRemove = (itemId: string) => {
      onChange(items.filter((item: { id: string }) => item.id !== itemId));
    };

    const handleItemChange = (itemId: string, newValue: unknown) => {
      onChange(
        items.map((item: { id: string; value: unknown }) =>
          item.id === itemId ? { ...item, value: newValue } : item,
        ),
      );
    };

    return (
      <RepeatableFormSection
        sectionType={field.id}
        title={field.label}
        items={items}
        minItems={field.required ? 1 : 0}
        addLabel={t('common.addItem', { item: field.label })}
        emptyMessage={t('common.noItemsAdded', { item: field.label.toLowerCase() })}
        onAdd={handleAdd}
        onRemove={handleRemove}
        renderItem={(item) => (
          <Box className="space-y-1">
            <SingleFieldInput
              field={field}
              value={item.value}
              onChange={(newValue) => handleItemChange(item.id, newValue)}
              inputClasses={inputClasses}
              instanceId={item.id}
              mockData={mockData}
            />
            {field.lawReference && (
              <Typography variant="small" className="text-green-600">
                ({field.lawReference.law} {field.lawReference.article})
              </Typography>
            )}
          </Box>
        )}
        contextMenu={field.contextMenu}
        onContextAction={(action) => {
          if (contextActionEvent) {
            emit(`UI:${contextActionEvent}`, {
              action,
              context: { type: "field", id: field.id },
            });
          }
        }}
      />
    );
  }

  return (
    <Box className="space-y-1">
      <HStack gap="xs" align="center" className="text-sm font-medium text-[var(--color-foreground)]">
        <Typography variant="body" weight="medium">{field.label}</Typography>
        {field.required && <Typography variant="body" as="span" className="text-red-500">*</Typography>}
        {field.contextMenu && field.contextMenu.length > 0 && (
          <ContextMenu
            actions={field.contextMenu}
            onAction={(action) => {
              if (contextActionEvent) {
                emit(`UI:${contextActionEvent}`, {
                  action,
                  context: { type: "field", id: field.id },
                });
              }
            }}
            className="ml-auto"
          />
        )}
      </HStack>

      <SingleFieldInput
        field={field}
        value={value}
        onChange={onChange}
        inputClasses={inputClasses}
        mockData={mockData}
      />

      {field.lawReference && (
        <Typography variant="small" className="text-green-600">
          ({field.lawReference.law} {field.lawReference.article})
        </Typography>
      )}
    </Box>
  );
};

interface SectionRendererProps {
  section: FormSection;
  formValues: Record<string, unknown>;
  globalVariables: Record<string, unknown>;
  onFieldChange: (fieldId: string, value: unknown) => void;
  mockData?: MockEntityData;
  contextActionEvent?: string;
  depth?: number;
  className?: string;
  isLoading?: boolean;
  error?: Error | null;
  entity?: string;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  formValues,
  globalVariables,
  onFieldChange,
  mockData = {},
  contextActionEvent,
  depth = 0,
}) => {
  const { emit } = useEventBus();
  const [isExpanded, setIsExpanded] = useState(true);

  const isVisible = evaluateSExpression(section.condition, {
    formValues,
    globalVariables,
  });
  if (!isVisible) return null;

  if (section.repeatable && section.collectionName) {
    const collectionData = (formValues[section.collectionName] as Array<Record<string, unknown>>) || [];
    const minItems = section.minItems || 0;
    const maxItems = section.maxItems || Infinity;

    return (
      <RepeatableFormSection
        sectionType={section.id}
        title={section.title}
        items={collectionData.map((item, idx) => ({ id: idx.toString(), ...item }))}
        minItems={minItems}
        maxItems={maxItems}
        contextMenu={section.contextMenu}
        onContextAction={(action) => {
          if (contextActionEvent) {
            emit(`UI:${contextActionEvent}`, {
              action,
              context: { type: "section", id: section.id },
            });
          }
        }}
        onAdd={() => {
          const newItem = {};
          onFieldChange(section.collectionName!, [...collectionData, newItem]);
        }}
        onRemove={(_, index) => {
          const newData = [...collectionData];
          newData.splice(index, 1);
          onFieldChange(section.collectionName!, newData);
        }}
        renderItem={(item, index) => (
          <VStack gap="md">
            {section.fields.map((field) => (
              <FieldRenderer
                key={field.id}
                field={field}
                value={item[field.id] as unknown}
                onChange={(newValue) => {
                  const newData = [...collectionData];
                  newData[index] = { ...newData[index], [field.id]: newValue };
                  onFieldChange(section.collectionName!, newData);
                }}
                isVisible={true}
                mockData={mockData}
                contextActionEvent={contextActionEvent}
              />
            ))}
          </VStack>
        )}
      />
    );
  }

  return (
    <Card className={cn("p-4", depth > 0 && "ml-4 border-l-4 border-blue-200")}>
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left mb-3 p-0 h-auto"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-[var(--color-muted-foreground)]" />
        ) : (
          <ChevronRight className="h-4 w-4 text-[var(--color-muted-foreground)]" />
        )}
        <Typography variant="h4">
          {section.title}
        </Typography>
        <Badge variant="default" className="ml-auto">
          {section.id}
        </Badge>
        {section.contextMenu && section.contextMenu.length > 0 && (
          <Box onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <ContextMenu
              actions={section.contextMenu}
              onAction={(action) => {
                if (contextActionEvent) {
                  emit(`UI:${contextActionEvent}`, {
                    action,
                    context: { type: "section", id: section.id },
                  });
                }
              }}
            />
          </Box>
        )}
      </Button>

      {isExpanded && (
        <VStack gap="md" align="stretch">
          {section.fields.map((field) => {
            const fieldVisible = evaluateSExpression(field.condition, {
              formValues,
              globalVariables,
            });
            return (
              <FieldRenderer
                key={field.id}
                field={field}
                value={formValues[field.id]}
                onChange={(val) => onFieldChange(field.id, val)}
                isVisible={fieldVisible}
                mockData={mockData}
                contextActionEvent={contextActionEvent}
              />
            );
          })}

          {section.subsections?.map((sub) => (
            <SectionRenderer
              key={sub.id}
              section={sub}
              formValues={formValues}
              globalVariables={globalVariables}
              onFieldChange={onFieldChange}
              mockData={mockData}
              contextActionEvent={contextActionEvent}
              depth={depth + 1}
            />
          ))}
        </VStack>
      )}
    </Card>
  );
};

interface DebugPanelProps {
  globalVariables: Record<string, unknown>;
  localVariables: Record<string, unknown>;
  violations: ViolationRecord[];
  completedTabs: string[];
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  isLoading?: boolean;
  error?: Error | null;
  entity?: string;
}

const DebugPanel: React.FC<DebugPanelProps> = ({
  globalVariables,
  localVariables,
  violations,
  completedTabs,
  isOpen,
  onToggle,
}) => {
  const { t } = useTranslate();
  return (
    <Card className="bg-neutral-900 text-neutral-100 overflow-hidden">
      <Button
        variant="ghost"
        onClick={onToggle}
        className="flex items-center gap-2 w-full p-3 bg-neutral-800 hover:bg-neutral-700 h-auto rounded-none"
      >
        <Bug className="h-4 w-4" />
        <Typography variant="small" className="font-mono">
          {t('inspection.debugPanel')}
        </Typography>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 ml-auto" />
        ) : (
          <ChevronRight className="h-4 w-4 ml-auto" />
        )}
      </Button>

      {isOpen && (
        <VStack gap="md" className="p-3 font-mono text-xs">
          <Box>
            <Typography variant="small" className="text-green-400 mb-1">
              {t('inspection.debug.globalVariables')}
            </Typography>
            <pre className="bg-neutral-800 p-2 rounded overflow-x-auto">
              {JSON.stringify(globalVariables, null, 2) || "{}"}
            </pre>
          </Box>

          <Box>
            <Typography variant="small" className="text-blue-400 mb-1">
              {t('inspection.debug.localVariables')}
            </Typography>
            <pre className="bg-neutral-800 p-2 rounded overflow-x-auto">
              {JSON.stringify(localVariables, null, 2) || "{}"}
            </pre>
          </Box>

          <Box>
            <Typography variant="small" className="text-red-400 mb-1">
              {t('inspection.violationsCount', { count: violations.length })}
            </Typography>
            <pre className="bg-neutral-800 p-2 rounded overflow-x-auto">
              {JSON.stringify(violations, null, 2) || "[]"}
            </pre>
          </Box>

          <Box>
            <Typography variant="small" className="text-yellow-400 mb-1">
              {t('inspection.debug.completedTabs')}
            </Typography>
            <pre className="bg-neutral-800 p-2 rounded">
              {completedTabs.join(", ") || t('common.none')}
            </pre>
          </Box>
        </VStack>
      )}
    </Card>
  );
};

// =============================================================================
// Main Component
// =============================================================================

export function InspectionFormBoard({
  entity,
  currentPhase: controlledPhase,
  currentTab: controlledTab,
  showDebugPanel = true,
  fieldChangedEvent,
  globalVariableSetEvent,
  tabChangedEvent,
  phaseChangedEvent,
  previousEvent,
  nextEvent,
  completeEvent,
  contextActionEvent,
  className,
}: InspectionFormBoardProps): JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const { configs, initialState, mockData = {} } = entity;

  // State
  const [formState, setFormState] = useState<FormState>({
    formValues: initialState?.formValues || {},
    globalVariables: initialState?.globalVariables || {},
    localVariables: initialState?.localVariables || {},
    violations: initialState?.violations || [],
    completedTabs: initialState?.completedTabs || [],
  });

  const [activePhase, setActivePhase] = useState<DemoPhase>(
    controlledPhase || "introduction",
  );
  const [activeTab, setActiveTab] = useState<string>(controlledTab || "T-001");
  const [isDebugOpen, setIsDebugOpen] = useState(false);

  // Derived state
  const currentPhaseConfig = useMemo(
    () => phases.find((p) => p.id === activePhase) || phases[0],
    [activePhase],
  );

  const currentTabConfig = useMemo(
    () => configs[activeTab],
    [configs, activeTab],
  );

  const phaseIndex = phases.findIndex((p) => p.id === activePhase);
  const tabIndex = currentPhaseConfig.tabs.indexOf(activeTab);
  const isFirstTab = phaseIndex === 0 && tabIndex === 0;
  const isLastTab =
    phaseIndex === phases.length - 1 &&
    tabIndex === currentPhaseConfig.tabs.length - 1;

  // Handlers
  const handleFieldChange = useCallback(
    (fieldId: string, value: unknown) => {
      setFormState((prev) => ({
        ...prev,
        formValues: {
          ...prev.formValues,
          [fieldId]: value,
        },
      }));

      if (fieldChangedEvent) {
        emit(`UI:${fieldChangedEvent}`, { fieldId, value, tabId: activeTab });
      }

      const field = currentTabConfig?.sections
        .flatMap((s) => [
          ...s.fields,
          ...(s.subsections?.flatMap((ss) => ss.fields) || []),
        ])
        .find((f) => f.id === fieldId);

      if (field?.hiddenCalculation?.scope === "global") {
        setFormState((prev) => ({
          ...prev,
          globalVariables: {
            ...prev.globalVariables,
            [field.hiddenCalculation!.variable]: value,
          },
        }));
        if (globalVariableSetEvent) {
          emit(`UI:${globalVariableSetEvent}`, {
            variable: field.hiddenCalculation!.variable,
            value,
            sourceTab: activeTab,
          });
        }
      }
    },
    [activeTab, currentTabConfig, emit, fieldChangedEvent, globalVariableSetEvent],
  );

  const handlePhaseChange = useCallback(
    (phase: DemoPhase) => {
      setActivePhase(phase);
      const firstTab = phases.find((p) => p.id === phase)?.tabs[0];
      if (firstTab) {
        setActiveTab(firstTab);
        if (tabChangedEvent) {
          emit(`UI:${tabChangedEvent}`, { tabId: firstTab });
        }
      }
      if (phaseChangedEvent) {
        emit(`UI:${phaseChangedEvent}`, { phase });
      }
    },
    [emit, tabChangedEvent, phaseChangedEvent],
  );

  const handleTabChange = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);
      if (tabChangedEvent) {
        emit(`UI:${tabChangedEvent}`, { tabId });
      }
    },
    [emit, tabChangedEvent],
  );

  const handlePrevious = useCallback(() => {
    if (previousEvent) {
      emit(`UI:${previousEvent}`, { fromTab: activeTab, fromPhase: activePhase });
    }
    if (tabIndex > 0) {
      handleTabChange(currentPhaseConfig.tabs[tabIndex - 1]);
    } else if (phaseIndex > 0) {
      const prevPhase = phases[phaseIndex - 1];
      handlePhaseChange(prevPhase.id);
      handleTabChange(prevPhase.tabs[prevPhase.tabs.length - 1]);
    }
  }, [
    tabIndex,
    phaseIndex,
    activeTab,
    activePhase,
    currentPhaseConfig.tabs,
    handleTabChange,
    handlePhaseChange,
    emit,
    previousEvent,
  ]);

  const handleNext = useCallback(() => {
    if (!formState.completedTabs.includes(activeTab)) {
      setFormState((prev) => ({
        ...prev,
        completedTabs: [...prev.completedTabs, activeTab],
      }));
    }

    if (nextEvent) {
      emit(`UI:${nextEvent}`, { fromTab: activeTab, fromPhase: activePhase, completedTab: activeTab });
    }

    if (tabIndex < currentPhaseConfig.tabs.length - 1) {
      handleTabChange(currentPhaseConfig.tabs[tabIndex + 1]);
    } else if (phaseIndex < phases.length - 1) {
      const nextPhase = phases[phaseIndex + 1];
      handlePhaseChange(nextPhase.id);
    } else {
      if (completeEvent) {
        emit(`UI:${completeEvent}`, { completedTabs: [...formState.completedTabs, activeTab] });
      }
    }
  }, [
    tabIndex,
    phaseIndex,
    currentPhaseConfig.tabs,
    activeTab,
    activePhase,
    formState.completedTabs,
    handleTabChange,
    handlePhaseChange,
    emit,
    nextEvent,
    completeEvent,
  ]);

  const mapPhaseToIndicator = (phase: DemoPhase): InspectionPhase => {
    const mapping: Record<DemoPhase, InspectionPhase> = {
      introduction: "preparation",
      content: "execution",
      preparation: "documentation",
      record: "review",
      closing: "completed",
    };
    return mapping[phase];
  };

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <VStack gap="none" className={cn("min-h-screen bg-neutral-100", className)}>
      {/* Header */}
      <Box className="bg-white border-b shadow-sm sticky top-0 z-50">
        <Box className="max-w-7xl mx-auto p-4">
          <HStack justify="between" align="center">
            <VStack gap="xs">
              <Typography variant="h3">{t('inspection.form.title')}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {t('inspection.form.subtitle')}
              </Typography>
            </VStack>
            <PhaseIndicator phase={mapPhaseToIndicator(activePhase)} />
          </HStack>
        </Box>
      </Box>

      {/* Phase Navigation */}
      <Box className="bg-white border-b">
        <Box className="max-w-7xl mx-auto">
          <HStack gap="none" className="overflow-x-auto">
            {phases.map((phase, idx) => {
              const isActive = phase.id === activePhase;
              const isComplete = idx < phaseIndex;
              const Icon = phase.icon;

              return (
                <Button
                  key={phase.id}
                  variant="ghost"
                  onClick={() => handlePhaseChange(phase.id)}
                  className={cn(
                    "flex-1 p-4 border-b-3 transition-all flex items-center justify-center gap-2 rounded-none h-auto",
                    isActive && "border-blue-500 bg-blue-50",
                    isComplete && !isActive && "border-green-500 bg-green-50",
                    !isActive &&
                    !isComplete &&
                    "border-transparent hover:bg-neutral-50",
                  )}
                >
                  {isComplete ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-blue-600" : "text-[var(--color-muted-foreground)]",
                      )}
                    />
                  )}
                  <VStack gap="none" align="start">
                    <Typography
                      variant="small"
                      weight={isActive ? "semibold" : "normal"}
                      className={cn(
                        isActive && "text-blue-700",
                        isComplete && !isActive && "text-green-700",
                      )}
                    >
                      {t(phase.label)}
                    </Typography>
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {phase.labelSl}
                    </Typography>
                  </VStack>
                </Button>
              );
            })}
          </HStack>
        </Box>
      </Box>

      {/* Tab Navigation */}
      <Box className="bg-white border-b">
        <Box className="max-w-7xl mx-auto px-4">
          <HStack gap="sm" className="py-2 overflow-x-auto">
            {currentPhaseConfig.tabs.map((tabId) => {
              const tabConfig = configs[tabId];
              const isActive = tabId === activeTab;
              const isComplete = formState.completedTabs.includes(tabId);

              return (
                <Button
                  key={tabId}
                  variant="ghost"
                  onClick={() => handleTabChange(tabId)}
                  className={cn(
                    "px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap h-auto",
                    isActive && "bg-blue-100 text-blue-700",
                    !isActive && isComplete && "bg-green-100 text-green-700",
                    !isActive &&
                    !isComplete &&
                    "bg-neutral-100 text-[var(--color-foreground)] hover:bg-neutral-200",
                  )}
                >
                  {isComplete && <CheckCircle className="h-4 w-4" />}
                  <Typography variant="body" weight="semibold">{tabId}</Typography>
                  {tabConfig && (
                    <Typography variant="small" className="opacity-70">{tabConfig.name}</Typography>
                  )}
                </Button>
              );
            })}
          </HStack>
        </Box>
      </Box>

      {/* Main Content */}
      <Box className="flex-1">
        <Box className="max-w-5xl mx-auto p-4">
          <VStack gap="lg" align="stretch">
            {/* Form Area */}
            <Box>
              {currentTabConfig ? (
                <VStack gap="md" align="stretch">
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <HStack justify="between" align="center">
                      <VStack gap="xs">
                        <Typography variant="h3">
                          {currentTabConfig.name}
                        </Typography>
                        <Typography
                          variant="small"
                          className="text-[var(--color-foreground)]"
                        >
                          {t('inspection.form.tabIndicator', { tabId: currentTabConfig.tabId })}
                        </Typography>
                      </VStack>
                      {currentTabConfig.globalVariablesSet &&
                        currentTabConfig.globalVariablesSet.length > 0 && (
                          <Badge variant="primary">
                            {t('inspection.form.setsIndicator', { variables: currentTabConfig.globalVariablesSet.join(", ") })}
                          </Badge>
                        )}
                    </HStack>
                  </Card>

                  {currentTabConfig.sections.map((section) => (
                    <SectionRenderer
                      key={section.id}
                      section={section}
                      formValues={formState.formValues}
                      globalVariables={formState.globalVariables}
                      onFieldChange={handleFieldChange}
                      mockData={mockData}
                      contextActionEvent={contextActionEvent}
                    />
                  ))}
                </VStack>
              ) : (
                <Card className="p-8 text-center">
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <Typography variant="h4" className="text-[var(--color-foreground)]">
                    {t('inspection.form.errorTitle', { tabId: activeTab })}
                  </Typography>
                  <Typography variant="small" className="text-[var(--color-muted-foreground)] mt-2">
                    {t('inspection.form.errorHelp')}
                  </Typography>
                </Card>
              )}
            </Box>

            {/* Violations Summary */}
            {formState.violations.length > 0 && (
              <Card className="p-4">
                <Typography
                  variant="h4"
                  className="mb-3 flex items-center gap-2"
                >
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  {t('inspection.violationsCount', { count: formState.violations.length })}
                </Typography>
                <HStack gap="sm" className="flex-wrap">
                  {formState.violations.map((violation) => (
                    <Box
                      key={violation.id}
                      className="p-2 bg-red-50 border border-red-200 rounded text-sm"
                    >
                      <HStack justify="between" align="center">
                        <Typography
                          variant="small"
                          className="font-medium text-red-700"
                        >
                          {violation.id}
                        </Typography>
                        <Badge className="bg-red-100 text-red-700">
                          {violation.lawReference}
                        </Badge>
                      </HStack>
                      {violation.description && (
                        <Typography
                          variant="small"
                          className="text-red-600 mt-1"
                        >
                          {violation.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </HStack>
              </Card>
            )}

            {/* Global Variables Panel */}
            <Card className="p-4">
              <Typography variant="h4" className="mb-3">
                {t('inspection.globalVariables')}
              </Typography>
              {Object.keys(formState.globalVariables).length > 0 ? (
                <HStack gap="sm" className="flex-wrap">
                  {Object.entries(formState.globalVariables).map(
                    ([key, value]) => (
                      <HStack
                        key={key}
                        justify="between"
                        className="text-sm bg-neutral-50 p-2 rounded"
                      >
                        <code className="text-blue-600 text-xs">{key}</code>
                        <Badge variant="default">{String(value)}</Badge>
                      </HStack>
                    ),
                  )}
                </HStack>
              ) : (
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {t('inspection.noVariables')}
                </Typography>
              )}
            </Card>

            {/* Debug Panel */}
            {showDebugPanel && (
              <DebugPanel
                globalVariables={formState.globalVariables}
                localVariables={formState.localVariables}
                violations={formState.violations}
                completedTabs={formState.completedTabs}
                isOpen={isDebugOpen}
                onToggle={() => setIsDebugOpen(!isDebugOpen)}
              />
            )}
          </VStack>
        </Box>
      </Box>

      {/* Footer Navigation */}
      <Box className="bg-white border-t sticky bottom-0 z-40">
        <Box className="max-w-7xl mx-auto p-4">
          <HStack justify="between" align="center">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={isFirstTab}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('nav.previous')}
            </Button>

            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t(currentPhaseConfig.label)} • {activeTab}
            </Typography>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={isLastTab}
              className="gap-2"
            >
              {isLastTab ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  {t('wizard.complete')}
                </>
              ) : (
                <>
                  {t('nav.next')}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </HStack>
        </Box>
      </Box>
    </VStack>
  );
}

InspectionFormBoard.displayName = "InspectionFormBoard";

export default InspectionFormBoard;
