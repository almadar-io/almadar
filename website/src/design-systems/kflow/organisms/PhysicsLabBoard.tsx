/* eslint-disable almadar/organism-extends-entity-display */
/**
 * PhysicsLabBoard Organism (Milestone 10)
 *
 * Interactive physics simulation lab using @almadar/ui:
 * - SimulationCanvas for real-time physics rendering
 * - SimulationControls for play/pause/step/reset + parameter sliders
 * - SimulationGraph for measurement plotting
 *
 * Events Emitted:
 * - UI:SIMULATION_START — User starts a simulation
 * - UI:SIMULATION_PAUSE — User pauses
 * - UI:SIMULATION_RESET — User resets
 * - UI:SIMULATION_COMPLETE — Target condition met
 * - UI:SELECT_PRESET — User selects a preset
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Typography,
  Card,
  Button,
  Container,
  Badge,
  Icon,
  PageHeader,
  Section,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import {
  SimulationCanvas,
  SimulationControls,
  SimulationGraph,
  ALL_PRESETS,
} from '@almadar/ui';
import type { PhysicsPreset } from '@almadar/ui';
import { FlaskConical, Target } from 'lucide-react';
import type { PhysicsSimulation, PhysicsMeasurement } from '../types/knowledge';
import { DomainBadge } from '../atoms/DomainBadge';

export interface PhysicsLabEntity {
  simulation: PhysicsSimulation;
  availablePresets: Array<{ id: string; name: string; description: string }>;
  measurements: PhysicsMeasurement[];
}

export interface PhysicsLabBoardProps {
  entity: PhysicsLabEntity;
  className?: string;
}

export function PhysicsLabBoard({
  entity,
  className = '',
}: PhysicsLabBoardProps): React.JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const { simulation, availablePresets, measurements } = entity;
  const [isRunning, setIsRunning] = useState(simulation.running);
  const [speed, setSpeed] = useState(1);
  const [parameters, setParameters] = useState(simulation.parameters);

  const activePreset: PhysicsPreset | undefined = useMemo(
    () => ALL_PRESETS.find((p) => p.id === simulation.preset),
    [simulation.preset],
  );

  const controlParams = useMemo(() => {
    const result: Record<string, { value: number; min: number; max: number; step: number; label: string }> = {};
    for (const [key, value] of Object.entries(parameters)) {
      result[key] = { value: Number(value), min: 0, max: Number(value) * 3 || 100, step: 0.1, label: key };
    }
    return result;
  }, [parameters]);

  const measurementsByLabel = useMemo(() => {
    const grouped = new Map<string, { label: string; unit: string; data: Array<{ time: number; value: number }> }>();
    for (const m of measurements) {
      const existing = grouped.get(m.label);
      if (existing) {
        existing.data.push({ time: m.time, value: m.value });
      } else {
        grouped.set(m.label, { label: m.label, unit: m.unit, data: [{ time: m.time, value: m.value }] });
      }
    }
    return Array.from(grouped.values());
  }, [measurements]);

  const handlePlay = useCallback(() => {
    setIsRunning(true);
    emit('UI:SIMULATION_START', { simulationId: simulation.id });
  }, [emit, simulation.id]);

  const handlePause = useCallback(() => {
    setIsRunning(false);
    emit('UI:SIMULATION_PAUSE', { simulationId: simulation.id });
  }, [emit, simulation.id]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    emit('UI:SIMULATION_RESET', { simulationId: simulation.id });
  }, [emit, simulation.id]);

  const handleStep = useCallback(() => {
    // Single step handled by SimulationControls
  }, []);

  const handleParameterChange = useCallback((name: string, value: number) => {
    setParameters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectPreset = useCallback((presetId: string) => {
    emit('UI:SELECT_PRESET', { presetId });
  }, [emit]);

  return (
    <Box className={`min-h-screen bg-[var(--color-background)] ${className}`}>
      <PageHeader
        title={simulation.preset}
        subtitle={t('physics.labTitle')}
        status={{ label: isRunning ? t('physics.running') : t('physics.paused'), variant: isRunning ? 'success' : 'info' }}
      >
        <HStack gap="sm" align="center">
          <DomainBadge domain="natural" size="sm" />
          <Typography variant="small" className="text-sm font-medium">
            {simulation.elapsed.toFixed(1)}s
          </Typography>
        </HStack>
      </PageHeader>

      <Container size="lg" padding="sm" className="py-6">
        <VStack gap="lg">
          {/* Simulation canvas */}
          <Section variant="card">
            {activePreset ? (
              <SimulationCanvas
                preset={activePreset}
                width={600}
                height={400}
                running={isRunning}
                speed={speed}
                className="w-full"
              />
            ) : (
              <VStack gap="sm" align="center" className="py-12">
                <Icon icon={FlaskConical} size="xl" className="text-[var(--color-muted-foreground)]" />
                <Typography variant="small" className="text-sm text-[var(--color-muted-foreground)]">
                  {t('physics.selectPreset')}
                </Typography>
              </VStack>
            )}
          </Section>

          {/* Controls */}
          <Section variant="card">
            <SimulationControls
              running={isRunning}
              speed={speed}
              parameters={controlParams}
              onPlay={handlePlay}
              onPause={handlePause}
              onStep={handleStep}
              onReset={handleReset}
              onSpeedChange={setSpeed}
              onParameterChange={handleParameterChange}
            />
          </Section>

          {/* Target condition */}
          {simulation.targetCondition && (
            <Section variant="card">
              <HStack gap="sm" align="center">
                <Icon icon={Target} size="sm" className="text-[var(--color-warning)]" />
                <Typography variant="small" className="text-sm text-[var(--color-foreground)]">
                  {t('physics.target')} {simulation.targetCondition}
                </Typography>
              </HStack>
            </Section>
          )}

          {/* Measurement graphs */}
          {measurementsByLabel.length > 0 && (
            <Section title={t('physics.measurements')}>
              <HStack gap="md" wrap>
                {measurementsByLabel.map((group) => (
                  <SimulationGraph
                    key={group.label}
                    label={group.label}
                    unit={group.unit}
                    data={group.data}
                  />
                ))}
              </HStack>
            </Section>
          )}

          {/* Preset selector */}
          <Section title={t('physics.availablePresets')} variant="card">
            <HStack gap="sm" wrap>
              {availablePresets.map((preset) => (
                <Button
                  key={preset.id}
                  size="sm"
                  variant={preset.id === simulation.preset ? 'primary' : 'secondary'}
                  className={preset.id === simulation.preset
                    ? 'px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg'
                    : 'px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-secondary-hover)]'
                  }
                  onClick={() => handleSelectPreset(preset.id)}
                >
                  {preset.name}
                </Button>
              ))}
            </HStack>
          </Section>
        </VStack>
      </Container>
    </Box>
  );
}

PhysicsLabBoard.displayName = 'PhysicsLabBoard';
