/**
 * InspectionFormDemoTemplate
 *
 * A comprehensive demo template that showcases all 5 inspection phases
 * with config-driven dynamic forms. This template is designed for presenting
 * to the client to demonstrate the complete inspection workflow.
 *
 * Features:
 * - Loads form configs from config/tabs/*.json
 * - Renders forms with conditional fields
 * - Shows global variable propagation between tabs
 * - Displays violation tracking
 * - Debug panel for HG-* variables
 */

import React, { useState, useCallback, useMemo } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { useEventBus } from "../../../hooks/useEventBus";

// Atoms
import { PhaseIndicator, InspectionPhase } from "../atoms/PhaseIndicator";

// Molecules
import { RepeatableFormSection } from "../molecules/RepeatableFormSection";
import { CardSelector, CardSelectorOption } from "../molecules/CardSelector";

// Organisms
import { SignatureCapture } from "../organisms/SignatureCapture";

// Components
import { StatCard } from "../../../components/organisms/StatCard";

// Evaluator
import { SExpressionEvaluator, createMinimalContext } from "../../../../evaluator";

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
  options?: Array<{ value: string; label: string; isDefault?: boolean; icon?: string; description?: string }>;
  defaultValue?: string;
  condition?: SExpression;
  contextMenu?: string[];
  lawReference?: { law: string; article: string };
  hiddenCalculation?: { variable: string; scope: "global" | "local" };
  violationTrigger?: { id: string; condition: SExpression; lawReference: string };
  entityField?: string;
  // Info-display specific
  displayContent?: string;
  displayVariant?: "info" | "warning" | "success" | "error";
  // Card-selector specific
  columns?: 1 | 2 | 3 | 4;
  multiple?: boolean;
  // Stats-grid specific
  stats?: Array<{ label: string; value: string | number; icon?: string }>;
  // Entity-list/cards specific
  entityType?: string;
  displayFields?: string[];
  // Checklist specific
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

/**
 * Mock entity data structure matching the .orb schema entity definitions.
 * Keys are entity names (e.g., "InspectionField", "Company", "Participant")
 * Values are arrays of entity records with fields matching the schema.
 */
export type MockEntityData = Record<string, Array<Record<string, unknown>>>;

export interface InspectionFormDemoTemplateProps {
  /** Form tab configs keyed by tabId */
  configs: Record<string, FormTabConfig>;
  /** Initial form state */
  initialState?: Partial<FormState>;
  /**
   * Mock entity data for dynamic field types (card-selector, entity-list, etc.)
   * Structure matches .orb schema entities. Example:
   * ```
   * {
   *   InspectionField: [
   *     { id: "1", name: "Trgovina", description: "...", fieldType: "merchant", isActive: true, ruleCount: 45 },
   *     { id: "2", name: "Gostinstvo", description: "...", fieldType: "merchant", isActive: true, ruleCount: 32 }
   *   ],
   *   Company: [
   *     { id: "1", name: "Podjetje d.o.o.", registrationNumber: "123456", ... }
   *   ]
   * }
   * ```
   */
  mockData?: MockEntityData;
  /** Current phase override */
  currentPhase?: DemoPhase;
  /** Current tab override */
  currentTab?: string;
  /** Show debug panel */
  showDebugPanel?: boolean;
  /** Additional class names */
  className?: string;
  /** Tab change handler */
  onTabChange?: (tabId: string) => void;
  /** Phase change handler */
  onPhaseChange?: (phase: DemoPhase) => void;
  /** Form value change handler */
  onFormValueChange?: (fieldId: string, value: unknown) => void;
  /** Violation detected handler */
  onViolationDetected?: (violation: ViolationRecord) => void;
}

// =============================================================================
// Phase Configuration
// =============================================================================

const phases: PhaseDefinition[] = [
  {
    id: "introduction",
    label: "Introduction",
    labelSl: "Uvod",
    icon: Briefcase,
    tabs: ["T-001", "T-002", "T-003", "T-004"],
  },
  {
    id: "content",
    label: "Content",
    labelSl: "Vsebina",
    icon: ClipboardCheck,
    tabs: ["T-005", "T2-1"],
  },
  {
    id: "preparation",
    label: "Preparation",
    labelSl: "Priprava",
    icon: FileText,
    tabs: ["T-006", "T-007"],
  },
  {
    id: "record",
    label: "Record",
    labelSl: "Zapisnik",
    icon: FileCheck,
    tabs: ["T-008"],
  },
  {
    id: "closing",
    label: "Closing",
    labelSl: "Zaključek",
    icon: PenTool,
    tabs: ["T-009"],
  },
];

// =============================================================================
// S-Expression Evaluator (using real evaluator from almadar-shared)
// =============================================================================

// Create a singleton evaluator instance
const sexprEvaluator = new SExpressionEvaluator();

function evaluateSExpression(
  expr: SExpression | undefined,
  context: { formValues: Record<string, unknown>; globalVariables: Record<string, unknown> }
): boolean {
  if (expr === undefined || expr === null) return true;
  if (typeof expr === "boolean") return expr;
  if (typeof expr === "string" || typeof expr === "number") return Boolean(expr);
  if (!Array.isArray(expr) || expr.length === 0) return true;

  try {
    // Create evaluation context with entity bindings
    const evalContext = createMinimalContext({
      entity: {
        formValues: context.formValues,
        globalVariables: context.globalVariables,
      },
    });

    // Evaluate the expression using the real evaluator
    const result = sexprEvaluator.evaluate(expr, evalContext);
    return Boolean(result);
  } catch (error) {
    console.warn("S-expression evaluation error:", error, "Expression:", expr);
    return true; // Default to visible on error
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
}

// Single field input renderer (used by both single and repeatable fields)
const SingleFieldInput: React.FC<{
  field: FormField;
  value: unknown;
  onChange: (value: unknown) => void;
  inputClasses: string;
  instanceId?: string;
  mockData?: MockEntityData;
}> = ({ field, value, onChange, inputClasses, instanceId, mockData = {} }) => {
  const radioName = instanceId ? `${field.id}-${instanceId}` : field.id;

  return (
    <>
      {field.type === "text" && (
        <input
          type="text"
          className={inputClasses}
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          className={cn(inputClasses, "min-h-[80px]")}
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "date" && (
        <input
          type="date"
          className={inputClasses}
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "dropdown" && (
        <select
          className={inputClasses}
          value={String(value || field.defaultValue || "")}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {field.type === "radio" && (
        <div className="flex gap-4">
          {field.options?.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={radioName}
                value={opt.value}
                checked={String(value || field.defaultValue) === opt.value}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4"
              />
              <span className={opt.isDefault ? "font-semibold" : ""}>{opt.label}</span>
            </label>
          ))}
        </div>
      )}

      {field.type === "checkbox" && (
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      )}

      {(field.type === "currency" || field.type === "decimal") && (
        <input
          type="number"
          step="0.01"
          className={inputClasses}
          value={String(value || "")}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
      )}

      {field.type === "integer" && (
        <input
          type="number"
          step="1"
          className={inputClasses}
          value={String(value || "")}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
      )}

      {field.type === "person" && (
        <input
          type="text"
          className={inputClasses}
          placeholder="Search person..."
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {/* === NEW FIELD TYPES === */}

      {/* 1. Info-display: Read-only informational text */}
      {field.type === "info-display" && (
        <Box
          className={cn(
            "p-4 rounded-lg border-l-4",
            field.displayVariant === "warning" && "bg-yellow-50 border-yellow-400 text-yellow-800",
            field.displayVariant === "success" && "bg-green-50 border-green-400 text-green-800",
            field.displayVariant === "error" && "bg-red-50 border-red-400 text-red-800",
            (!field.displayVariant || field.displayVariant === "info") && "bg-blue-50 border-blue-400 text-blue-800"
          )}
        >
          <Typography variant="body">
            {field.displayContent || field.label}
          </Typography>
        </Box>
      )}

      {/* 2. Card-selector: Card-based selection component */}
      {field.type === "card-selector" && (() => {
        // If entityType is specified, use mockData; otherwise use static options
        const entityData = field.entityType ? mockData[field.entityType] || [] : [];
        const optionsFromEntity = entityData.map((item) => ({
          id: String(item.id),
          title: String(item.name || item.label || item.id),
          description: item.description ? String(item.description) : undefined,
        } as CardSelectorOption));

        const optionsFromConfig = (field.options || []).map((opt) => ({
          id: opt.value,
          title: opt.label,
          description: opt.description,
        } as CardSelectorOption));

        // Prefer entity data if available, fall back to config options
        const options = optionsFromEntity.length > 0 ? optionsFromEntity : optionsFromConfig;

        return (
          <CardSelector
            options={options}
            selectedId={field.multiple ? undefined : String(value || "")}
            selectedIds={field.multiple && Array.isArray(value) ? value as string[] : []}
            multiple={field.multiple}
            columns={field.columns || 3}
            onChange={(selectedId) => onChange(selectedId)}
            onMultiChange={(selectedIds) => onChange(selectedIds)}
          />
        );
      })()}

      {/* 3. Signature: Canvas-based signature capture */}
      {field.type === "signature" && (
        <SignatureCapture
          title={field.label}
          participantId={instanceId || field.id}
          required={field.required}
          onCapture={(signatureData) => onChange(signatureData)}
          onClear={() => onChange(null)}
        />
      )}

      {/* 4. Stats-grid: Grid of statistic cards */}
      {field.type === "stats-grid" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(field.stats || []).map((stat, idx) => (
            <StatCard
              key={idx}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>
      )}

      {/* 5. Multi-select: Multiple selection dropdown/checkboxes */}
      {field.type === "multi-select" && (
        <div className="space-y-2 p-3 border rounded bg-neutral-50">
          {field.options?.map((opt) => {
            const selectedValues = Array.isArray(value) ? value : [];
            const isChecked = selectedValues.includes(opt.value);
            return (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={isChecked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...selectedValues, opt.value]);
                    } else {
                      onChange(selectedValues.filter((v: string) => v !== opt.value));
                    }
                  }}
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}

      {/* 6. Entity-list: Display a list of entities */}
      {field.type === "entity-list" && (() => {
        // Use mockData if entityType specified, otherwise use value (which may be set via formValues)
        const entityData = field.entityType ? mockData[field.entityType] || [] : [];
        const items = entityData.length > 0 ? entityData : (Array.isArray(value) ? value : []);

        return (
          <Box className="border rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-100">
                <tr>
                  {(field.displayFields || ["name"]).map((fieldName) => (
                    <th key={fieldName} className="px-3 py-2 text-left font-medium text-neutral-700">
                      {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item: Record<string, unknown>, idx: number) => (
                    <tr key={idx} className="border-t hover:bg-neutral-50">
                      {(field.displayFields || ["name"]).map((fieldName) => (
                        <td key={fieldName} className="px-3 py-2 text-neutral-600">
                          {String(item[fieldName] || "-")}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={(field.displayFields || ["name"]).length}
                      className="px-3 py-4 text-center text-neutral-500"
                    >
                      No items to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        );
      })()}

      {/* 7. Entity-cards: Display entities as cards */}
      {field.type === "entity-cards" && (() => {
        // Use mockData if entityType specified, otherwise use value
        const entityData = field.entityType ? mockData[field.entityType] || [] : [];
        const items = entityData.length > 0 ? entityData : (Array.isArray(value) ? value : []);

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.length > 0 ? (
              items.map((item: Record<string, unknown>, idx: number) => (
                <Card key={idx} className="p-4">
                  <VStack gap="xs">
                    {(field.displayFields || ["name"]).map((fieldName) => (
                      <Typography key={fieldName} variant="body">
                        <span className="font-medium">{fieldName}:</span> {String(item[fieldName] || "-")}
                      </Typography>
                    ))}
                  </VStack>
                </Card>
              ))
            ) : (
              <Box className="col-span-full p-4 text-center text-neutral-500 border rounded">
                No items to display
              </Box>
            )}
          </div>
        );
      })()}

      {/* 8. Datetime: Date and time input */}
      {field.type === "datetime" && (
        <input
          type="datetime-local"
          className={inputClasses}
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {/* 9. Checklist: List of checkable items */}
      {field.type === "checklist" && (
        <div className="space-y-2 p-3 border rounded bg-neutral-50">
          {(field.checklistItems || field.options || []).map((item) => {
            const itemId = "id" in item ? item.id : item.value;
            const itemLabel = "label" in item ? item.label : item.label;
            const checklistValue = (value as Record<string, boolean>) || {};
            const isChecked = Boolean(checklistValue[itemId]);
            return (
              <label key={itemId} className="flex items-start gap-3 cursor-pointer p-2 hover:bg-neutral-100 rounded">
                <input
                  type="checkbox"
                  className="w-5 h-5 mt-0.5"
                  checked={isChecked}
                  onChange={(e) => {
                    onChange({ ...checklistValue, [itemId]: e.target.checked });
                  }}
                />
                <span className={cn(isChecked && "line-through text-neutral-500")}>
                  {itemLabel}
                  {"required" in item && item.required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </>
  );
};

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange, isVisible, mockData = {} }) => {
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

  const inputClasses = "w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  // Handle repeatable fields
  if (field.repeatable) {
    // Value should be an array of items for repeatable fields
    const items = Array.isArray(value) ? value : value ? [{ id: "1", value }] : [];

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
          item.id === itemId ? { ...item, value: newValue } : item
        )
      );
    };

    return (
      <RepeatableFormSection
        sectionType={field.id}
        title={field.label}
        items={items}
        minItems={field.required ? 1 : 0}
        addLabel={`Add ${field.label}`}
        emptyMessage={`No ${field.label.toLowerCase()} added yet`}
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
      />
    );
  }

  // Non-repeatable field
  return (
    <Box className="space-y-1">
      <label className="flex items-center gap-1 text-sm font-medium text-neutral-700">
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>

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
  depth?: number;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  formValues,
  globalVariables,
  onFieldChange,
  mockData = {},
  depth = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const isVisible = evaluateSExpression(section.condition, { formValues, globalVariables });
  if (!isVisible) return null;

  return (
    <Card className={cn("p-4", depth > 0 && "ml-4 border-l-4 border-blue-200")}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left mb-3"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-neutral-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-neutral-500" />
        )}
        <Typography variant="h4" className="text-neutral-800">
          {section.title}
        </Typography>
        <Badge variant="default" className="ml-auto">
          {section.id}
        </Badge>
      </button>

      {isExpanded && (
        <VStack gap="md" align="stretch">
          {section.fields.map((field) => {
            const fieldVisible = evaluateSExpression(field.condition, { formValues, globalVariables });
            return (
              <FieldRenderer
                key={field.id}
                field={field}
                value={formValues[field.id]}
                onChange={(val) => onFieldChange(field.id, val)}
                isVisible={fieldVisible}
                mockData={mockData}
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
}

const DebugPanel: React.FC<DebugPanelProps> = ({
  globalVariables,
  localVariables,
  violations,
  completedTabs,
  isOpen,
  onToggle,
}) => {
  return (
    <Card className="bg-neutral-900 text-neutral-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 w-full p-3 bg-neutral-800 hover:bg-neutral-700"
      >
        <Bug className="h-4 w-4" />
        <Typography variant="small" className="font-mono">
          Debug Panel
        </Typography>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 ml-auto" />
        ) : (
          <ChevronRight className="h-4 w-4 ml-auto" />
        )}
      </button>

      {isOpen && (
        <div className="p-3 space-y-4 font-mono text-xs">
          <div>
            <Typography variant="small" className="text-green-400 mb-1">
              Global Variables (HG-*)
            </Typography>
            <pre className="bg-neutral-800 p-2 rounded overflow-x-auto">
              {JSON.stringify(globalVariables, null, 2) || "{}"}
            </pre>
          </div>

          <div>
            <Typography variant="small" className="text-blue-400 mb-1">
              Local Variables (H-*)
            </Typography>
            <pre className="bg-neutral-800 p-2 rounded overflow-x-auto">
              {JSON.stringify(localVariables, null, 2) || "{}"}
            </pre>
          </div>

          <div>
            <Typography variant="small" className="text-red-400 mb-1">
              Violations ({violations.length})
            </Typography>
            <pre className="bg-neutral-800 p-2 rounded overflow-x-auto">
              {JSON.stringify(violations, null, 2) || "[]"}
            </pre>
          </div>

          <div>
            <Typography variant="small" className="text-yellow-400 mb-1">
              Completed Tabs
            </Typography>
            <pre className="bg-neutral-800 p-2 rounded">
              {completedTabs.join(", ") || "(none)"}
            </pre>
          </div>
        </div>
      )}
    </Card>
  );
};

// =============================================================================
// Main Component
// =============================================================================

export const InspectionFormDemoTemplate: React.FC<InspectionFormDemoTemplateProps> = ({
  configs,
  initialState,
  mockData = {},
  currentPhase: controlledPhase,
  currentTab: controlledTab,
  showDebugPanel = true,
  className,
  onTabChange,
  onPhaseChange,
  onFormValueChange,
  onViolationDetected,
}) => {
  const eventBus = useEventBus();

  // State
  const [formState, setFormState] = useState<FormState>({
    formValues: initialState?.formValues || {},
    globalVariables: initialState?.globalVariables || {},
    localVariables: initialState?.localVariables || {},
    violations: initialState?.violations || [],
    completedTabs: initialState?.completedTabs || [],
  });

  const [activePhase, setActivePhase] = useState<DemoPhase>(controlledPhase || "introduction");
  const [activeTab, setActiveTab] = useState<string>(controlledTab || "T-001");
  const [isDebugOpen, setIsDebugOpen] = useState(false);

  // Derived state
  const currentPhaseConfig = useMemo(
    () => phases.find((p) => p.id === activePhase) || phases[0],
    [activePhase]
  );

  const currentTabConfig = useMemo(() => configs[activeTab], [configs, activeTab]);

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

      onFormValueChange?.(fieldId, value);
      eventBus.emit("UI:FIELD_CHANGED", { fieldId, value, tabId: activeTab });

      // Check for hidden calculations that set global variables
      const field = currentTabConfig?.sections
        .flatMap((s) => [...s.fields, ...(s.subsections?.flatMap((ss) => ss.fields) || [])])
        .find((f) => f.id === fieldId);

      if (field?.hiddenCalculation?.scope === "global") {
        setFormState((prev) => ({
          ...prev,
          globalVariables: {
            ...prev.globalVariables,
            [field.hiddenCalculation!.variable]: value,
          },
        }));
        eventBus.emit("UI:GLOBAL_VARIABLE_SET", {
          variable: field.hiddenCalculation!.variable,
          value,
          sourceTab: activeTab,
        });
      }
    },
    [activeTab, currentTabConfig, eventBus, onFormValueChange]
  );

  const handlePhaseChange = useCallback(
    (phase: DemoPhase) => {
      setActivePhase(phase);
      const firstTab = phases.find((p) => p.id === phase)?.tabs[0];
      if (firstTab) {
        setActiveTab(firstTab);
        onTabChange?.(firstTab);
      }
      onPhaseChange?.(phase);
    },
    [onPhaseChange, onTabChange]
  );

  const handleTabChange = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    },
    [onTabChange]
  );

  const handlePrevious = useCallback(() => {
    if (tabIndex > 0) {
      handleTabChange(currentPhaseConfig.tabs[tabIndex - 1]);
    } else if (phaseIndex > 0) {
      const prevPhase = phases[phaseIndex - 1];
      handlePhaseChange(prevPhase.id);
      handleTabChange(prevPhase.tabs[prevPhase.tabs.length - 1]);
    }
  }, [tabIndex, phaseIndex, currentPhaseConfig.tabs, handleTabChange, handlePhaseChange]);

  const handleNext = useCallback(() => {
    // Mark current tab as complete
    if (!formState.completedTabs.includes(activeTab)) {
      setFormState((prev) => ({
        ...prev,
        completedTabs: [...prev.completedTabs, activeTab],
      }));
    }

    if (tabIndex < currentPhaseConfig.tabs.length - 1) {
      handleTabChange(currentPhaseConfig.tabs[tabIndex + 1]);
    } else if (phaseIndex < phases.length - 1) {
      const nextPhase = phases[phaseIndex + 1];
      handlePhaseChange(nextPhase.id);
    }
  }, [
    tabIndex,
    phaseIndex,
    currentPhaseConfig.tabs,
    activeTab,
    formState.completedTabs,
    handleTabChange,
    handlePhaseChange,
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
              <Typography variant="h3">Inspection Form Demo</Typography>
              <Typography variant="small" className="text-neutral-500">
                Config-driven dynamic forms with all 5 phases
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
                <button
                  key={phase.id}
                  onClick={() => handlePhaseChange(phase.id)}
                  className={cn(
                    "flex-1 p-4 border-b-3 transition-all flex items-center justify-center gap-2",
                    isActive && "border-blue-500 bg-blue-50",
                    isComplete && !isActive && "border-green-500 bg-green-50",
                    !isActive && !isComplete && "border-transparent hover:bg-neutral-50"
                  )}
                >
                  {isComplete ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-blue-600" : "text-neutral-400"
                      )}
                    />
                  )}
                  <VStack gap="none" align="start">
                    <Typography
                      variant="small"
                      weight={isActive ? "semibold" : "normal"}
                      className={cn(
                        isActive && "text-blue-700",
                        isComplete && !isActive && "text-green-700"
                      )}
                    >
                      {phase.label}
                    </Typography>
                    <Typography variant="small" className="text-neutral-500">
                      {phase.labelSl}
                    </Typography>
                  </VStack>
                </button>
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
                <button
                  key={tabId}
                  onClick={() => handleTabChange(tabId)}
                  className={cn(
                    "px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap",
                    isActive && "bg-blue-100 text-blue-700",
                    !isActive && isComplete && "bg-green-100 text-green-700",
                    !isActive && !isComplete && "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  )}
                >
                  {isComplete && <CheckCircle className="h-4 w-4" />}
                  <span className="font-medium">{tabId}</span>
                  {tabConfig && (
                    <span className="text-xs opacity-70">{tabConfig.name}</span>
                  )}
                </button>
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
            <div>
              {currentTabConfig ? (
                <VStack gap="md" align="stretch">
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <HStack justify="between" align="center">
                      <VStack gap="xs">
                        <Typography variant="h3">{currentTabConfig.name}</Typography>
                        <Typography variant="small" className="text-neutral-600">
                          Tab {currentTabConfig.tabId}
                        </Typography>
                      </VStack>
                      {currentTabConfig.globalVariablesSet && currentTabConfig.globalVariablesSet.length > 0 && (
                        <Badge variant="primary">
                          Sets: {currentTabConfig.globalVariablesSet.join(", ")}
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
                    />
                  ))}
                </VStack>
              ) : (
                <Card className="p-8 text-center">
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <Typography variant="h4" className="text-neutral-600">
                    Config not found for tab: {activeTab}
                  </Typography>
                  <Typography variant="small" className="text-neutral-500 mt-2">
                    Make sure the config file exists in config/tabs/
                  </Typography>
                </Card>
              )}
            </div>

            {/* Violations Summary - at bottom */}
            {formState.violations.length > 0 && (
              <Card className="p-4">
                <Typography variant="h4" className="mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Violations ({formState.violations.length})
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {formState.violations.map((violation) => (
                    <Box
                      key={violation.id}
                      className="p-2 bg-red-50 border border-red-200 rounded text-sm"
                    >
                      <HStack justify="between" align="center">
                        <Typography variant="small" className="font-medium text-red-700">
                          {violation.id}
                        </Typography>
                        <Badge className="bg-red-100 text-red-700">
                          {violation.lawReference}
                        </Badge>
                      </HStack>
                      {violation.description && (
                        <Typography variant="small" className="text-red-600 mt-1">
                          {violation.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </div>
              </Card>
            )}

            {/* Global Variables Panel - at bottom */}
            <Card className="p-4">
              <Typography variant="h4" className="mb-3">
                Global Variables
              </Typography>
              {Object.keys(formState.globalVariables).length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {Object.entries(formState.globalVariables).map(([key, value]) => (
                    <HStack key={key} justify="between" className="text-sm bg-neutral-50 p-2 rounded">
                      <code className="text-blue-600 text-xs">{key}</code>
                      <Badge variant="default">{String(value)}</Badge>
                    </HStack>
                  ))}
                </div>
              ) : (
                <Typography variant="small" className="text-neutral-500">
                  No global variables set yet
                </Typography>
              )}
            </Card>

            {/* Debug Panel - at bottom */}
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
              Previous
            </Button>

            <Typography variant="small" className="text-neutral-500">
              {currentPhaseConfig.label} • {activeTab}
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
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </HStack>
        </Box>
      </Box>
    </VStack>
  );
};

InspectionFormDemoTemplate.displayName = "InspectionFormDemoTemplate";
