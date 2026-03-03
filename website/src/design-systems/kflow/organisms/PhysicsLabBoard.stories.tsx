import type { Meta, StoryObj } from '@storybook/react';
import { PhysicsLabBoard } from './PhysicsLabBoard';

const meta: Meta<typeof PhysicsLabBoard> = {
    title: 'KFlow/Organisms/PhysicsLabBoard',
    component: PhysicsLabBoard,
    parameters: { layout: 'padded' },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhysicsLabBoard>;

const baseSimulation = {
    id: 'sim-1',
    preset: 'projectileMotion',
    parameters: { gravity: 9.81, initialVelocity: 20, angle: 45 },
    bodies: [
        { id: 'ball', x: 0, y: 0, vx: 14.14, vy: 14.14, mass: 1, radius: 5, color: '#ff6b6b', fixed: false },
    ],
    running: false,
    elapsed: 0,
    measurements: [],
    targetCondition: 'Ball reaches max height',
};

const presets = [
    { id: 'projectileMotion', name: 'Projectile', description: 'Launch angle simulation' },
    { id: 'pendulum', name: 'Pendulum', description: 'Simple harmonic motion' },
    { id: 'springOscillator', name: 'Spring', description: 'Hooke\'s law oscillator' },
];

export const Default: Story = {
    args: {
        entity: {
            simulation: baseSimulation,
            availablePresets: presets,
            measurements: [],
        },
    },
};

export const Running: Story = {
    args: {
        entity: {
            simulation: { ...baseSimulation, running: true, elapsed: 3.5, bodies: [{ id: 'ball', x: 49.5, y: 35.2, vx: 14.14, vy: -20.2, mass: 1, radius: 5, color: '#ff6b6b', fixed: false }] },
            availablePresets: presets,
            measurements: [
                { time: 1.0, label: 'Height', value: 9.07, unit: 'm' },
                { time: 2.0, label: 'Height', value: 8.42, unit: 'm' },
                { time: 3.0, label: 'Height', value: -1.95, unit: 'm' },
                { time: 3.5, label: 'Velocity', value: 24.5, unit: 'm/s' },
            ],
        },
    },
};

export const Pendulum: Story = {
    args: {
        entity: {
            simulation: {
                id: 'sim-2',
                preset: 'pendulum',
                parameters: { length: 2, gravity: 9.81, damping: 0.01 },
                bodies: [
                    { id: 'pivot', x: 200, y: 50, vx: 0, vy: 0, mass: 0, radius: 3, color: '#888', fixed: true },
                    { id: 'bob', x: 280, y: 190, vx: 0, vy: 0, mass: 2, radius: 10, color: '#4ecdc4', fixed: false },
                ],
                running: false,
                elapsed: 0,
                measurements: [],
                targetCondition: 'Complete 5 oscillations',
            },
            availablePresets: presets,
            measurements: [],
        },
    },
};
