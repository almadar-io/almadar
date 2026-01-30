/**
 * ConditionalField
 *
 * A form field that shows/hides based on conditions.
 * Wraps standard form inputs with conditional visibility.
 *
 * Event Contract:
 * - Emits: UI:FIELD_CHANGE { fieldName, value, condition }
 */

import React, { useState, useCallback, useMemo } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Input } from "../../../components/atoms/Input";
import { Select } from "../../../components/atoms/Select";
import { Textarea } from "../../../components/atoms/Textarea";
import { Checkbox } from "../../../components/atoms/Checkbox";
import { useEventBus } from "../../../hooks/useEventBus";
import { ChevronDown, ChevronUp } from "lucide-react";

export type FieldType = "text" | "number" | "select" | "textarea" | "checkbox" | "date";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldCondition {
  /** Field name to watch */
  field: string;
  /** Operator for comparison */
  operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan" | "truthy" | "falsy";
  /** Value to compare against */
  value?: string | number | boolean;
}

export interface ConditionalFieldProps {
  /** Field name */
  name: string;
  /** Field label */
  label: string;
  /** Field type */
  type?: FieldType;
  /** Current value */
  value?: string | number | boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Options for select fields */
  options?: FieldOption[];
  /** Required field */
  required?: boolean;
  /** Condition for showing this field */
  condition?: FieldCondition;
  /** Current form values (for condition evaluation) */
  formValues?: Record<string, unknown>;
  /** Help text */
  helpText?: string;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Change handler */
  onChange?: (value: string | number | boolean) => void;
}

// Evaluate condition against form values
const evaluateCondition = (
  condition: FieldCondition | undefined,
  formValues: Record<string, unknown>
): boolean => {
  if (!condition) return true;

  const fieldValue = formValues[condition.field];

  switch (condition.operator) {
    case "equals":
      return fieldValue === condition.value;
    case "notEquals":
      return fieldValue !== condition.value;
    case "contains":
      return String(fieldValue).includes(String(condition.value));
    case "greaterThan":
      return Number(fieldValue) > Number(condition.value);
    case "lessThan":
      return Number(fieldValue) < Number(condition.value);
    case "truthy":
      return Boolean(fieldValue);
    case "falsy":
      return !fieldValue;
    default:
      return true;
  }
};

export const ConditionalField: React.FC<ConditionalFieldProps> = ({
  name,
  label,
  type = "text",
  value,
  placeholder,
  options = [],
  required = false,
  condition,
  formValues = {},
  helpText,
  error,
  disabled = false,
  className,
  onChange,
}) => {
  const eventBus = useEventBus();

  // Evaluate if field should be shown
  const isVisible = useMemo(
    () => evaluateCondition(condition, formValues),
    [condition, formValues]
  );

  const handleChange = useCallback(
    (newValue: string | number | boolean) => {
      onChange?.(newValue);
      eventBus.emit("UI:FIELD_CHANGE", {
        fieldName: name,
        value: newValue,
        condition: condition ? { met: isVisible } : undefined,
      });
    },
    [name, condition, isVisible, onChange, eventBus]
  );

  if (!isVisible) {
    return null;
  }

  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <Select
            value={String(value || "")}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            className="w-full"
          >
            <option value="">Select...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            value={String(value || "")}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={3}
            className="w-full"
          />
        );

      case "checkbox":
        return (
          <Checkbox
            checked={Boolean(value)}
            onChange={(e) => handleChange(e.target.checked)}
            disabled={disabled}
            label={label}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={String(value || "")}
            onChange={(e) => handleChange(Number(e.target.value))}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full"
          />
        );

      case "date":
        return (
          <Input
            type="date"
            value={String(value || "")}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            className="w-full"
          />
        );

      default:
        return (
          <Input
            type="text"
            value={String(value || "")}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full"
          />
        );
    }
  };

  return (
    <VStack gap="xs" className={cn("w-full", className)}>
      {type !== "checkbox" && (
        <Typography variant="label" className="text-neutral-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Typography>
      )}

      {renderField()}

      {helpText && !error && (
        <Typography variant="small" className="text-neutral-500">
          {helpText}
        </Typography>
      )}

      {error && (
        <Typography variant="small" className="text-red-500">
          {error}
        </Typography>
      )}
    </VStack>
  );
};

ConditionalField.displayName = "ConditionalField";
