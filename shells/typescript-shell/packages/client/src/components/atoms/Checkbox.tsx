import React from 'react';
import { cn } from '../../lib/cn';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            className={cn(
              'peer h-4 w-4 border-2 border-black',
              'accent-black focus:ring-black focus:ring-offset-0',
              'bg-white checked:bg-black',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
        </div>
        {label && (
          <label
            htmlFor={inputId}
            className="ml-2 text-sm text-black font-medium cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
