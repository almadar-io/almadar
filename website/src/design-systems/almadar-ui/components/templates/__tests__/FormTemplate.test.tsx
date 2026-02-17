/**
 * FormTemplate Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormTemplate } from '../FormTemplate';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

describe('FormTemplate', () => {
  describe('Rendering', () => {
    it('should render the title', () => {
      render(<FormTemplate formData={{}} title="Contact Form" />);
      expect(screen.getByText('Contact Form')).toBeInTheDocument();
    });

    it('should render subtitle when provided', () => {
      render(<FormTemplate formData={{}} subtitle="Get in touch" />);
      expect(screen.getByText('Get in touch')).toBeInTheDocument();
    });

    it('should render default fields', () => {
      render(<FormTemplate formData={{}} />);
      
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Message')).toBeInTheDocument();
    });

    it('should render custom fields', () => {
      const fields = [
        { name: 'company', label: 'Company', type: 'text' as const },
        { name: 'phone', label: 'Phone', type: 'tel' as const },
      ];
      
      render(<FormTemplate formData={{}} fields={fields} />);
      
      expect(screen.getByText('Company')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
    });

    it('should render submit button with custom label', () => {
      render(<FormTemplate formData={{}} submitLabel="Send Message" />);
      expect(screen.getByText('Send Message')).toBeInTheDocument();
    });

    it('should show reset button when showReset is true', () => {
      render(<FormTemplate formData={{}} showReset={true} />);
      expect(screen.getByText('Reset')).toBeInTheDocument();
    });

    it('should not show reset button by default', () => {
      render(<FormTemplate formData={{}} />);
      expect(screen.queryByText('Reset')).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('should show loading state when isSubmitting', () => {
      render(<FormTemplate formData={{}} isSubmitting={true} />);
      // Button should have loading indicator
      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();
    });

    it('should show success state when isSuccess', () => {
      render(<FormTemplate formData={{}} isSuccess={true} successMessage="Thank you!" />);
      expect(screen.getByText('Thank you!')).toBeInTheDocument();
      expect(screen.getByText('Success!')).toBeInTheDocument();
    });

    it('should show error alert when error', () => {
      render(<FormTemplate formData={{}} error="Submission failed" />);
      expect(screen.getByText(/Submission failed/)).toBeInTheDocument();
    });

    it('should show field validation errors', () => {
      const validationErrors = {
        email: 'Invalid email address',
      };
      
      render(<FormTemplate formData={{}} validationErrors={validationErrors} />);
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onFieldChange when field value changes', () => {
      const onFieldChange = vi.fn();
      
      render(<FormTemplate formData={{}} onFieldChange={onFieldChange} />);
      
      const nameInput = screen.getByPlaceholderText('Your name');
      fireEvent.change(nameInput, { target: { value: 'John' } });
      
      expect(onFieldChange).toHaveBeenCalled();
    });

    it('should call onSubmit when form is submitted', () => {
      const onSubmit = vi.fn();
      
      render(
        <FormTemplate 
          formData={{ name: 'John', email: 'john@test.com', message: 'Hello' }} 
          onSubmit={onSubmit}
        />
      );
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);
      
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@test.com',
        message: 'Hello',
      });
    });

    it('should call onReset when reset button is clicked', () => {
      const onReset = vi.fn();
      
      render(<FormTemplate formData={{}} showReset={true} onReset={onReset} />);
      
      const resetButton = screen.getByText('Reset');
      fireEvent.click(resetButton);
      
      expect(onReset).toHaveBeenCalled();
    });

    it('should call onDismissSuccess when "Send Another" is clicked', () => {
      const onDismissSuccess = vi.fn();
      
      render(
        <FormTemplate 
          formData={{}} 
          isSuccess={true} 
          onDismissSuccess={onDismissSuccess}
        />
      );
      
      const sendAnotherButton = screen.getByText('Send Another');
      fireEvent.click(sendAnotherButton);
      
      expect(onDismissSuccess).toHaveBeenCalled();
    });
  });

  describe('Field Types', () => {
    it('should render textarea for textarea type', () => {
      const fields = [
        { name: 'bio', label: 'Bio', type: 'textarea' as const, rows: 5 },
      ];
      
      render(<FormTemplate formData={{}} fields={fields} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render select for select type', () => {
      const fields = [
        { 
          name: 'country', 
          label: 'Country', 
          type: 'select' as const,
          options: [
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
          ],
        },
      ];
      
      render(<FormTemplate formData={{}} fields={fields} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    it('should render checkbox for checkbox type', () => {
      const fields = [
        { name: 'agree', label: 'I agree to terms', type: 'checkbox' as const },
      ];
      
      render(<FormTemplate formData={{}} fields={fields} />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render minimal variant', () => {
      const { container } = render(<FormTemplate formData={{}} variant="minimal" />);
      // Minimal doesn't have Container
      expect(container.querySelector('.mx-auto')).not.toBeInTheDocument();
    });

    it('should render standard variant with title', () => {
      render(<FormTemplate formData={{}} variant="standard" title="Contact" />);
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should render full variant in a card', () => {
      const { container } = render(<FormTemplate formData={{}} variant="full" />);
      // Full variant uses Card component with bordered wireframe style
      expect(container.querySelector('.border-2.border-black')).toBeInTheDocument();
    });
  });
});
