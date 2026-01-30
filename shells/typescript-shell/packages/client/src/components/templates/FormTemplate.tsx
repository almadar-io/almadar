/**
 * FormTemplate
 * 
 * A presentational template for form-based features like contact forms, feedback, surveys.
 * Supports submission, validation, and success/error states.
 */

import React from 'react';
import { cn } from '../../lib/cn';
import { Container } from '../molecules/Container';
import { VStack, HStack } from '../atoms/Stack';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/Textarea';
import { Select } from '../atoms/Select';
import { Checkbox } from '../atoms/Checkbox';
import { Alert } from '../molecules/Alert';
import { FormField } from '../molecules/FormField';
import { Card, CardContent } from '../atoms/Card';
import { Send, RotateCcw, CheckCircle } from 'lucide-react';

export type FormVariant = 'minimal' | 'standard' | 'full';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
}

export interface FormTemplateProps {
  /** Current form field values */
  formData: Record<string, unknown>;
  /** Whether form is being submitted */
  isSubmitting?: boolean;
  /** Whether submission was successful */
  isSuccess?: boolean;
  /** Error object if submission failed */
  error?: Error | string | null;
  /** Field-level validation errors */
  validationErrors?: Record<string, string>;
  /** Called when form is submitted */
  onSubmit?: (formData: Record<string, unknown>) => void;
  /** Called when a field value changes */
  onFieldChange?: (field: string, value: unknown) => void;
  /** Called to reset the form */
  onReset?: () => void;
  /** Called to dismiss success message */
  onDismissSuccess?: () => void;
  /** Form title */
  title?: string;
  /** Form subtitle/description */
  subtitle?: string;
  /** Submit button label */
  submitLabel?: string;
  /** Success message */
  successMessage?: string;
  /** Whether to show reset button */
  showReset?: boolean;
  /** Form field definitions */
  fields?: FormFieldConfig[];
  /** Template variant */
  variant?: FormVariant;
  /** Additional class name */
  className?: string;
}

const defaultFields: FormFieldConfig[] = [
  { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'your@email.com' },
  { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Your message...', rows: 4 },
];

export const FormTemplate: React.FC<FormTemplateProps> = ({
  formData = {},
  isSubmitting = false,
  isSuccess = false,
  error = null,
  validationErrors = {},
  onSubmit,
  onFieldChange,
  onReset,
  onDismissSuccess,
  title = 'Contact Us',
  subtitle,
  submitLabel = 'Submit',
  successMessage = 'Thank you! Your submission has been received.',
  showReset = false,
  fields = defaultFields,
  variant = 'standard',
  className,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const renderField = (field: FormFieldConfig) => {
    const value = formData[field.name];
    const fieldError = validationErrors[field.name];

    const handleChange = (newValue: unknown) => {
      onFieldChange?.(field.name, newValue);
    };

    switch (field.type) {
      case 'textarea':
        return (
          <FormField key={field.name} label={field.label} required={field.required} error={fieldError}>
            <Textarea
              value={(value as string) || ''}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              className={cn(fieldError && 'border-red-500')}
            />
          </FormField>
        );
      
      case 'select':
        return (
          <FormField key={field.name} label={field.label} required={field.required} error={fieldError}>
            <Select
              value={(value as string) || ''}
              onChange={(e) => handleChange(e.target.value)}
              options={field.options?.map(o => ({ value: o.value, label: o.label })) || []}
              placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`}
            />
          </FormField>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="flex items-center gap-2">
            <Checkbox
              checked={Boolean(value)}
              onChange={(e) => handleChange(e.target.checked)}
            />
            <Typography variant="body">{field.label}</Typography>
            {field.required && <span className="text-red-500">*</span>}
          </div>
        );

      default:
        return (
          <FormField key={field.name} label={field.label} required={field.required} error={fieldError}>
            <Input
              type={field.type}
              value={(value as string) || ''}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={field.placeholder}
              className={cn(fieldError && 'border-red-500')}
            />
          </FormField>
        );
    }
  };

  const renderSuccess = () => (
    <VStack gap="lg" align="center" className="py-8">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <Typography variant="h3" align="center">Success!</Typography>
      <Typography variant="body" color="muted" align="center">
        {successMessage}
      </Typography>
      {onDismissSuccess && (
        <Button variant="primary" onClick={onDismissSuccess}>
          Send Another
        </Button>
      )}
    </VStack>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <VStack gap="lg">
        {error && (
          <Alert variant="error" title="Submission Failed">
            {typeof error === 'string' ? error : error?.message || 'Please try again.'}
          </Alert>
        )}

        {fields.map(renderField)}

        <HStack gap="md" justify={showReset ? 'between' : 'end'}>
          {showReset && (
            <Button
              type="button"
              variant="ghost"
              onClick={onReset}
              leftIcon={<RotateCcw className="h-4 w-4" />}
            >
              Reset
            </Button>
          )}
          <Button
            type="submit"
            isLoading={isSubmitting}
            leftIcon={<Send className="h-4 w-4" />}
          >
            {submitLabel}
          </Button>
        </HStack>
      </VStack>
    </form>
  );

  const renderMinimal = () => (
    <VStack gap="lg" className={className}>
      {isSuccess ? renderSuccess() : renderForm()}
    </VStack>
  );

  const renderStandard = () => (
    <Container size="sm" padding="lg" className={className}>
      <VStack gap="lg">
        <VStack gap="xs">
          <Typography variant="h2">{title}</Typography>
          {subtitle && (
            <Typography variant="body" color="muted">
              {subtitle}
            </Typography>
          )}
        </VStack>

        {isSuccess ? renderSuccess() : renderForm()}
      </VStack>
    </Container>
  );

  const renderFull = () => (
    <Container size="md" padding="lg" className={className}>
      <Card>
        <CardContent className="p-8">
          <VStack gap="xl">
            <VStack gap="sm" align="center">
              <Typography variant="h2" align="center">{title}</Typography>
              {subtitle && (
                <Typography variant="body" color="muted" align="center">
                  {subtitle}
                </Typography>
              )}
            </VStack>

            {isSuccess ? renderSuccess() : renderForm()}
          </VStack>
        </CardContent>
      </Card>
    </Container>
  );

  switch (variant) {
    case 'minimal':
      return renderMinimal();
    case 'full':
      return renderFull();
    default:
      return renderStandard();
  }
};

FormTemplate.displayName = 'FormTemplate';

export default FormTemplate;
