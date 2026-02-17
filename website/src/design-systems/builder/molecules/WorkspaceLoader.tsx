/**
 * WorkspaceLoader Molecule
 *
 * Full-screen loader showing workspace initialization progress.
 */

import React from 'react';
import { clsx as cn } from 'clsx';
import { Loader2, Server, FileCode, Package, Play, CheckCircle, AlertCircle } from 'lucide-react';

export type WebContainerStatus = 'idle' | 'booting' | 'ready' | 'installing' | 'starting' | 'running' | 'error';

export interface WorkspaceLoaderProps {
  status: WebContainerStatus;
  isLoading?: boolean;
  error?: string | null;
  appName?: string;
  className?: string;
}

interface Step { id: WebContainerStatus; label: string; icon: React.ReactNode; description: string; }

const steps: Step[] = [
  { id: 'booting', label: 'Booting', icon: <Server size={20} />, description: 'Starting WebContainer runtime...' },
  { id: 'ready', label: 'Compiling', icon: <FileCode size={20} />, description: 'Compiling schema to code...' },
  { id: 'installing', label: 'Installing', icon: <Package size={20} />, description: 'Installing npm dependencies...' },
  { id: 'starting', label: 'Starting', icon: <Play size={20} />, description: 'Starting development server...' },
  { id: 'running', label: 'Running', icon: <CheckCircle size={20} />, description: 'Workspace ready!' },
];

function getStepIndex(status: WebContainerStatus): number {
  const idx = steps.findIndex((s) => s.id === status);
  return idx >= 0 ? idx : 0;
}

function getStepState(stepIdx: number, curIdx: number, status: WebContainerStatus): 'completed' | 'current' | 'pending' | 'error' {
  if (status === 'error') return stepIdx <= curIdx ? 'error' : 'pending';
  if (stepIdx < curIdx) return 'completed';
  if (stepIdx === curIdx) return 'current';
  return 'pending';
}

const stepBgStyles: Record<string, React.CSSProperties> = {
  current: { backgroundColor: 'color-mix(in srgb, var(--color-info) 15%, transparent)' },
  error: { backgroundColor: 'color-mix(in srgb, var(--color-error) 15%, transparent)' },
};

const stepIconBgStyles: Record<string, React.CSSProperties> = {
  completed: { backgroundColor: 'color-mix(in srgb, var(--color-success) 15%, transparent)', color: 'var(--color-success)' },
  current: { backgroundColor: 'color-mix(in srgb, var(--color-info) 15%, transparent)', color: 'var(--color-info)' },
  pending: { backgroundColor: 'var(--color-secondary)', color: 'var(--color-muted-foreground)' },
  error: { backgroundColor: 'color-mix(in srgb, var(--color-error) 15%, transparent)', color: 'var(--color-error)' },
};

const stepLabelStyles: Record<string, React.CSSProperties> = {
  completed: { color: 'var(--color-success)' },
  current: { color: 'var(--color-info)' },
  pending: { color: 'var(--color-muted-foreground)' },
  error: { color: 'var(--color-error)' },
};

export const WorkspaceLoader: React.FC<WorkspaceLoaderProps> = ({ status, isLoading = true, error, appName, className }) => {
  const currentIndex = getStepIndex(status);
  if (status === 'running' && !isLoading && !error) return null;

  return (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)]/95 backdrop-blur-sm', className)}>
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-info) 15%, transparent)' }}
          >
            {status === 'error'
              ? <AlertCircle className="w-8 h-8" style={{ color: 'var(--color-error)' }} />
              : <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--color-info)' }} />
            }
          </div>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--color-foreground)' }}>
            {status === 'error' ? 'Initialization Failed' : 'Initializing Workspace'}
          </h2>
          {appName && <p className="text-sm mt-1" style={{ color: 'var(--color-muted-foreground)' }}>{appName}</p>}
        </div>

        {error && (
          <div
            className="mb-6 p-4 rounded-lg border"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-error) 20%, transparent)',
            }}
          >
            <p className="text-sm" style={{ color: 'var(--color-error)' }}>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {steps.map((step, index) => {
            const state = getStepState(index, currentIndex, status);
            return (
              <div key={step.id} className={cn(
                'flex items-center gap-4 p-3 rounded-lg transition-all duration-300',
                state === 'completed' && 'opacity-60',
                state === 'pending' && 'opacity-40',
              )} style={(state === 'current' || state === 'error') ? stepBgStyles[state] : undefined}>
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                  style={stepIconBgStyles[state]}
                >
                  {state === 'completed' ? <CheckCircle size={20} /> : state === 'current' ? (
                    <div className="relative">{step.icon}<Loader2 size={28} className="absolute -top-1 -left-1 animate-spin" style={{ color: 'var(--color-info)' }} /></div>
                  ) : step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium" style={stepLabelStyles[state]}>{step.label}</p>
                  {state === 'current' && <p className="text-sm truncate" style={{ color: 'var(--color-muted-foreground)' }}>{step.description}</p>}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs mt-8" style={{ color: 'var(--color-muted-foreground)' }}>This may take a minute on first load</p>
      </div>
    </div>
  );
};

WorkspaceLoader.displayName = 'WorkspaceLoader';
export default WorkspaceLoader;
