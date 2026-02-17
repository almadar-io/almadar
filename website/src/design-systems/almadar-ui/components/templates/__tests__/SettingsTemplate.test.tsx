/**
 * SettingsTemplate Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsTemplate } from '../SettingsTemplate';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

// Mock window.confirm
vi.stubGlobal('confirm', vi.fn(() => true));

const defaultSettings = {
  theme: 'light',
  language: 'en',
  emailNotifications: true,
  pushNotifications: false,
};

describe('SettingsTemplate', () => {
  describe('Rendering', () => {
    it('should render the title', () => {
      render(<SettingsTemplate settings={defaultSettings} title="App Settings" />);
      expect(screen.getByText('App Settings')).toBeInTheDocument();
    });

    it('should render default sections', () => {
      render(<SettingsTemplate settings={defaultSettings} />);
      
      expect(screen.getByText('General')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    it('should render custom sections', () => {
      const sections = [
        {
          title: 'Privacy',
          fields: [
            { key: 'analytics', label: 'Analytics', type: 'toggle' as const },
          ],
        },
      ];
      
      render(<SettingsTemplate settings={{}} sections={sections} />);
      expect(screen.getByText('Privacy')).toBeInTheDocument();
      expect(screen.getByText('Analytics')).toBeInTheDocument();
    });

    it('should render save button', () => {
      render(<SettingsTemplate settings={defaultSettings} />);
      expect(screen.getByText(/Save/)).toBeInTheDocument();
    });

    it('should render reset button when showResetToDefaults is true', () => {
      render(<SettingsTemplate settings={defaultSettings} showResetToDefaults={true} onReset={() => {}} />);
      // Use getByRole to find the specific reset button
      expect(screen.getByRole('button', { name: /Reset All/i })).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('should disable save button when no changes', () => {
      render(<SettingsTemplate settings={defaultSettings} hasChanges={false} />);
      const saveButton = screen.getByRole('button', { name: /Save/i });
      expect(saveButton).toBeDisabled();
    });

    it('should enable save button when there are changes', () => {
      render(<SettingsTemplate settings={defaultSettings} hasChanges={true} />);
      const saveButton = screen.getByRole('button', { name: /Save/i });
      expect(saveButton).not.toBeDisabled();
    });

    it('should show loading state when isSaving', () => {
      render(<SettingsTemplate settings={defaultSettings} isSaving={true} hasChanges={true} />);
      const saveButton = screen.getByRole('button', { name: /Save/i });
      expect(saveButton).toBeDisabled();
    });

    it('should show error alert when error', () => {
      render(<SettingsTemplate settings={defaultSettings} error="Failed to save" />);
      expect(screen.getByText(/Failed to save/)).toBeInTheDocument();
    });

    it('should show success message when provided', () => {
      render(<SettingsTemplate settings={defaultSettings} successMessage="Settings saved!" />);
      expect(screen.getByText('Settings saved!')).toBeInTheDocument();
    });

    it('should show revert button when hasChanges and onRevert provided', () => {
      render(<SettingsTemplate settings={defaultSettings} hasChanges={true} onRevert={() => {}} />);
      expect(screen.getByText(/Revert/)).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onChange when toggle is clicked', () => {
      const onChange = vi.fn();
      
      render(<SettingsTemplate settings={defaultSettings} onChange={onChange} />);
      
      // Find toggles (checkbox inputs)
      const toggles = screen.getAllByRole('checkbox');
      fireEvent.click(toggles[0]);
      
      expect(onChange).toHaveBeenCalled();
    });

    it('should call onChange when select value changes', () => {
      const onChange = vi.fn();
      
      render(<SettingsTemplate settings={defaultSettings} onChange={onChange} />);
      
      const selects = screen.getAllByRole('combobox');
      fireEvent.change(selects[0], { target: { value: 'dark' } });
      
      expect(onChange).toHaveBeenCalledWith('theme', 'dark');
    });

    it('should call onSave when save button is clicked', () => {
      const onSave = vi.fn();
      
      render(<SettingsTemplate settings={defaultSettings} hasChanges={true} onSave={onSave} />);
      
      const saveButton = screen.getByRole('button', { name: /Save/i });
      fireEvent.click(saveButton);
      
      expect(onSave).toHaveBeenCalledWith(defaultSettings);
    });

    it('should call onRevert when revert button is clicked', () => {
      const onRevert = vi.fn();
      
      render(<SettingsTemplate settings={defaultSettings} hasChanges={true} onRevert={onRevert} />);
      
      const revertButton = screen.getByText(/Revert/);
      fireEvent.click(revertButton);
      
      expect(onRevert).toHaveBeenCalled();
    });

    it('should call onReset when reset button is clicked and confirmed', () => {
      const onReset = vi.fn();
      
      render(<SettingsTemplate settings={defaultSettings} showResetToDefaults={true} onReset={onReset} />);
      
      const resetButton = screen.getByRole('button', { name: /Reset All/i });
      fireEvent.click(resetButton);
      
      expect(onReset).toHaveBeenCalled();
    });
  });

  describe('Field Types', () => {
    it('should render select fields', () => {
      const sections = [
        {
          title: 'Display',
          fields: [
            { key: 'theme', label: 'Theme', type: 'select' as const, options: ['light', 'dark'] },
          ],
        },
      ];
      
      render(<SettingsTemplate settings={{ theme: 'light' }} sections={sections} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should render toggle fields', () => {
      const sections = [
        {
          title: 'Features',
          fields: [
            { key: 'enabled', label: 'Enable Feature', type: 'toggle' as const },
          ],
        },
      ];
      
      render(<SettingsTemplate settings={{ enabled: true }} sections={sections} />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should render text input fields', () => {
      const sections = [
        {
          title: 'Profile',
          fields: [
            { key: 'name', label: 'Display Name', type: 'text' as const },
          ],
        },
      ];
      
      render(<SettingsTemplate settings={{ name: 'John' }} sections={sections} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render minimal variant', () => {
      const { container } = render(<SettingsTemplate settings={defaultSettings} variant="minimal" />);
      // Minimal doesn't have Container
      expect(container.querySelector('.mx-auto')).not.toBeInTheDocument();
    });

    it('should render standard variant with title', () => {
      render(<SettingsTemplate settings={defaultSettings} variant="standard" title="Settings" />);
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should render full variant with danger zone', () => {
      render(
        <SettingsTemplate 
          settings={defaultSettings} 
          variant="full" 
          showResetToDefaults={true}
          onReset={() => {}}
        />
      );
      expect(screen.getByText('Danger Zone')).toBeInTheDocument();
    });
  });
});
