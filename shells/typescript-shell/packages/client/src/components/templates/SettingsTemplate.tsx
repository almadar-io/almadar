/**
 * SettingsTemplate
 * 
 * A presentational template for settings/preferences features.
 * Supports sections with various input types and save/reset operations.
 */

import React from 'react';
import { cn } from '../../lib/cn';
import { Container } from '../molecules/Container';
import { VStack, HStack } from '../atoms/Stack';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Checkbox } from '../atoms/Checkbox';
import { Card, CardHeader, CardContent } from '../atoms/Card';
import { Alert } from '../molecules/Alert';
import { Divider } from '../atoms/Divider';
import { Save, RotateCcw, Undo2 } from 'lucide-react';

export type SettingsVariant = 'minimal' | 'standard' | 'full';

export interface SettingsFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'toggle' | 'checkbox';
  description?: string;
  placeholder?: string;
  options?: string[] | Array<{ value: string; label: string }>;
}

export interface SettingsSectionConfig {
  title: string;
  description?: string;
  fields: SettingsFieldConfig[];
}

export interface SettingsTemplateProps {
  /** Current settings values */
  settings: Record<string, unknown>;
  /** Whether settings are being saved */
  isSaving?: boolean;
  /** Whether there are unsaved changes */
  hasChanges?: boolean;
  /** Error object if save failed */
  error?: Error | string | null;
  /** Success message after save */
  successMessage?: string | null;
  /** Called when saving settings */
  onSave?: (settings: Record<string, unknown>) => void;
  /** Called when a setting value changes */
  onChange?: (key: string, value: unknown) => void;
  /** Called to reset to default settings */
  onReset?: () => void;
  /** Called to revert unsaved changes */
  onRevert?: () => void;
  /** Called to dismiss success message */
  onDismissSuccess?: () => void;
  /** Page title */
  title?: string;
  /** Settings sections */
  sections?: SettingsSectionConfig[];
  /** Whether to show reset to defaults button */
  showResetToDefaults?: boolean;
  /** Template variant */
  variant?: SettingsVariant;
  /** Additional class name */
  className?: string;
}

const defaultSections: SettingsSectionConfig[] = [
  {
    title: 'General',
    description: 'General application settings',
    fields: [
      { key: 'theme', label: 'Theme', type: 'select', options: ['light', 'dark', 'system'] },
      { key: 'language', label: 'Language', type: 'select', options: ['en', 'es', 'fr', 'de'] },
    ],
  },
  {
    title: 'Notifications',
    description: 'Notification preferences',
    fields: [
      { key: 'emailNotifications', label: 'Email Notifications', type: 'toggle', description: 'Receive email notifications' },
      { key: 'pushNotifications', label: 'Push Notifications', type: 'toggle', description: 'Receive push notifications' },
    ],
  },
];

export const SettingsTemplate: React.FC<SettingsTemplateProps> = ({
  settings = {},
  isSaving = false,
  hasChanges = false,
  error = null,
  successMessage = null,
  onSave,
  onChange,
  onReset,
  onRevert,
  onDismissSuccess,
  title = 'Settings',
  sections = defaultSections,
  showResetToDefaults = true,
  variant = 'standard',
  className,
}) => {
  const handleSave = () => {
    onSave?.(settings);
  };

  const renderField = (field: SettingsFieldConfig) => {
    const value = settings[field.key];

    if (field.type === 'toggle' || field.type === 'checkbox') {
      return (
        <HStack key={field.key} justify="between" align="center" className="py-2">
          <VStack gap="xs">
            <Typography variant="body" weight="medium">{field.label}</Typography>
            {field.description && (
              <Typography variant="small" color="muted">{field.description}</Typography>
            )}
          </VStack>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onChange?.(field.key, e.target.checked)}
              className="sr-only peer"
            />
            <div className={cn(
              "w-11 h-6 rounded-full transition-colors",
              "bg-gray-200 peer-checked:bg-primary-600",
              "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
              "after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all",
              "peer-checked:after:translate-x-5"
            )} />
          </label>
        </HStack>
      );
    }

    if (field.type === 'select') {
      const options = field.options?.map(opt => 
        typeof opt === 'string' ? { value: opt, label: opt } : opt
      ) || [];
      
      return (
        <VStack key={field.key} gap="xs" className="py-2">
          <Typography variant="body" weight="medium">{field.label}</Typography>
          {field.description && (
            <Typography variant="small" color="muted">{field.description}</Typography>
          )}
          <Select
            value={(value as string) || ''}
            onChange={(e) => onChange?.(field.key, e.target.value)}
            options={options}
            className="mt-1"
          />
        </VStack>
      );
    }

    return (
      <VStack key={field.key} gap="xs" className="py-2">
        <Typography variant="body" weight="medium">{field.label}</Typography>
        {field.description && (
          <Typography variant="small" color="muted">{field.description}</Typography>
        )}
        <Input
          type={field.type}
          value={(value as string) || ''}
          onChange={(e) => onChange?.(field.key, e.target.value)}
          placeholder={field.placeholder}
          className="mt-1"
        />
      </VStack>
    );
  };

  const renderSection = (section: SettingsSectionConfig, index: number) => (
    <Card key={index}>
      <CardHeader>
        <Typography variant="h4">{section.title}</Typography>
        {section.description && (
          <Typography variant="small" color="muted">{section.description}</Typography>
        )}
      </CardHeader>
      <CardContent>
        <VStack gap="sm" className="divide-y divide-gray-100">
          {section.fields.map(renderField)}
        </VStack>
      </CardContent>
    </Card>
  );

  const renderMinimal = () => (
    <VStack gap="lg" className={className}>
      {error && (
        <Alert variant="error">
          {typeof error === 'string' ? error : error?.message || 'Failed to save settings'}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" dismissible onDismiss={onDismissSuccess}>
          {successMessage}
        </Alert>
      )}

      <VStack gap="md">
        {sections.flatMap(section => section.fields).map(renderField)}
      </VStack>

      <HStack gap="md" justify="end">
        {hasChanges && onRevert && (
          <Button variant="ghost" onClick={onRevert}>
            Revert
          </Button>
        )}
        <Button onClick={handleSave} isLoading={isSaving} disabled={!hasChanges}>
          Save
        </Button>
      </HStack>
    </VStack>
  );

  const renderStandard = () => (
    <Container size="md" padding="lg" className={className}>
      <VStack gap="lg">
        <HStack justify="between" align="center">
          <Typography variant="h2">{title}</Typography>
          <HStack gap="sm">
            {hasChanges && onRevert && (
              <Button variant="ghost" onClick={onRevert} leftIcon={<Undo2 className="h-4 w-4" />}>
                Revert
              </Button>
            )}
            <Button 
              onClick={handleSave} 
              isLoading={isSaving} 
              disabled={!hasChanges}
              leftIcon={<Save className="h-4 w-4" />}
            >
              Save Changes
            </Button>
          </HStack>
        </HStack>

        {error && (
          <Alert variant="error">
            {typeof error === 'string' ? error : error?.message || 'Failed to save settings'}
          </Alert>
        )}

        {successMessage && (
          <Alert variant="success" dismissible onDismiss={onDismissSuccess}>
            {successMessage}
          </Alert>
        )}

        <VStack gap="lg">
          {sections.map(renderSection)}
        </VStack>

        {showResetToDefaults && onReset && (
          <>
            <Divider />
            <HStack justify="between" align="center">
              <VStack gap="xs">
                <Typography variant="h5">Reset to Defaults</Typography>
                <Typography variant="small" color="muted">
                  Restore all settings to their default values
                </Typography>
              </VStack>
              <Button 
                variant="danger" 
                onClick={() => {
                  if (confirm('Are you sure you want to reset all settings to defaults?')) {
                    onReset();
                  }
                }}
                leftIcon={<RotateCcw className="h-4 w-4" />}
              >
                Reset All
              </Button>
            </HStack>
          </>
        )}
      </VStack>
    </Container>
  );

  const renderFull = () => (
    <Container size="lg" padding="lg" className={className}>
      <VStack gap="xl">
        <HStack justify="between" align="start">
          <VStack gap="xs">
            <Typography variant="h2">{title}</Typography>
            <Typography variant="body" color="muted">
              Manage your application preferences and configuration
            </Typography>
          </VStack>
          <HStack gap="sm">
            {hasChanges && onRevert && (
              <Button variant="secondary" onClick={onRevert} leftIcon={<Undo2 className="h-4 w-4" />}>
                Discard Changes
              </Button>
            )}
            <Button 
              onClick={handleSave} 
              isLoading={isSaving} 
              disabled={!hasChanges}
              leftIcon={<Save className="h-4 w-4" />}
            >
              Save Changes
            </Button>
          </HStack>
        </HStack>

        {error && (
          <Alert variant="error" title="Save Failed">
            {typeof error === 'string' ? error : error?.message || 'Failed to save settings. Please try again.'}
          </Alert>
        )}

        {successMessage && (
          <Alert variant="success" dismissible onDismiss={onDismissSuccess}>
            {successMessage}
          </Alert>
        )}

        {hasChanges && (
          <Alert variant="warning" title="Unsaved Changes">
            You have unsaved changes. Don't forget to save before leaving.
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map(renderSection)}
        </div>

        {showResetToDefaults && onReset && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <HStack justify="between" align="center">
                <VStack gap="xs">
                  <Typography variant="h5" className="text-red-900">Danger Zone</Typography>
                  <Typography variant="small" className="text-red-700">
                    Reset all settings to their factory defaults. This action cannot be undone.
                  </Typography>
                </VStack>
                <Button 
                  variant="danger" 
                  onClick={() => {
                    if (confirm('Are you sure you want to reset ALL settings? This cannot be undone.')) {
                      onReset();
                    }
                  }}
                  leftIcon={<RotateCcw className="h-4 w-4" />}
                >
                  Reset Everything
                </Button>
              </HStack>
            </CardContent>
          </Card>
        )}
      </VStack>
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

SettingsTemplate.displayName = 'SettingsTemplate';

export default SettingsTemplate;
