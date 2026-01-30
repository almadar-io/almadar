/**
 * ToastContext - Global toast notification system
 *
 * Provides a context for showing toast notifications from anywhere in the app.
 *
 * @packageDocumentation
 */

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { Toast, type ToastVariant } from '@/components/molecules/Toast';

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  /** Show a toast notification */
  toast: (options: Omit<ToastItem, 'id'>) => void;
  /** Show a success toast */
  success: (message: string, title?: string) => void;
  /** Show an error toast */
  error: (message: string, title?: string) => void;
  /** Show an info toast */
  info: (message: string, title?: string) => void;
  /** Show a warning toast */
  warning: (message: string, title?: string) => void;
  /** Dismiss a toast by id */
  dismiss: (id: string) => void;
  /** Dismiss all toasts */
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: ReactNode;
  /** Maximum number of toasts to show at once */
  maxToasts?: number;
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = useCallback((options: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastItem = { id, ...options };
    
    setToasts(prev => {
      const updated = [...prev, newToast];
      // Keep only the most recent toasts
      return updated.slice(-maxToasts);
    });
  }, [maxToasts]);

  const success = useCallback((message: string, title?: string) => {
    toast({ variant: 'success', message, title, duration: 4000 });
  }, [toast]);

  const error = useCallback((message: string, title?: string) => {
    toast({ variant: 'error', message, title, duration: 6000 });
  }, [toast]);

  const info = useCallback((message: string, title?: string) => {
    toast({ variant: 'info', message, title, duration: 5000 });
  }, [toast]);

  const warning = useCallback((message: string, title?: string) => {
    toast({ variant: 'warning', message, title, duration: 5000 });
  }, [toast]);

  const value: ToastContextValue = {
    toast,
    success,
    error,
    info,
    warning,
    dismiss,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast container - fixed position at top-right */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <Toast
              variant={t.variant}
              title={t.title}
              message={t.message}
              duration={t.duration}
              onDismiss={() => dismiss(t.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Hook to access toast notifications
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export default ToastContext;
