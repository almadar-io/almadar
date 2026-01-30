import React from 'react';
import { cn } from '../../lib/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'block w-full border-2 shadow-sm',
          'px-3 py-2 text-sm text-black',
          'bg-white',
          'placeholder:text-neutral-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-black',
          'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
          'resize-y min-h-[80px]',
          error
            ? 'border-red-600 focus:border-red-600'
            : 'border-black focus:border-black',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
