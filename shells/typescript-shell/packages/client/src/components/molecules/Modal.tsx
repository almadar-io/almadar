/**
 * Modal Molecule Component
 * 
 * A modal dialog component with overlay, header, content, and footer.
 * Uses theme-aware CSS variables for styling.
 */

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Icon } from '../atoms/Icon';
import { Box } from '../atoms/Box';
import { Typography } from '../atoms/Typography';
import { Overlay } from '../atoms/Overlay';
import { cn } from '../../lib/cn';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      firstElement?.focus();
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <Overlay isVisible={isOpen} onClick={handleOverlayClick} className="z-40" />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <Box
          ref={modalRef}
          bg="surface"
          border
          shadow="lg"
          rounded="md"
          className={cn(
            'pointer-events-auto w-full flex flex-col max-h-[90vh]',
            sizeClasses[size],
            className
          )}
          role="dialog"
          aria-modal="true"
          {...(title && { 'aria-labelledby': 'modal-title' })}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div
              className={cn(
                'px-6 py-4 flex items-center justify-between',
                'border-b-[length:var(--border-width)] border-[var(--color-border)]'
              )}
            >
              {title && (
                <Typography variant="h4" as="h2" id="modal-title">
                  {title}
                </Typography>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    'p-1 transition-colors rounded-[var(--radius-sm)]',
                    'hover:bg-[var(--color-muted)]'
                  )}
                  aria-label="Close modal"
                >
                  <Icon icon={X} size="md" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              className={cn(
                'px-6 py-4 bg-[var(--color-muted)]',
                'border-t-[length:var(--border-width)] border-[var(--color-border)]'
              )}
            >
              {footer}
            </div>
          )}
        </Box>
      </div>
    </>
  );
};

Modal.displayName = 'Modal';
