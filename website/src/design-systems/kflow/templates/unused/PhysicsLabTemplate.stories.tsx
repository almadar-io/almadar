import type { Meta, StoryObj } from '@storybook/react';
import { PhysicsLabTemplate } from './PhysicsLabTemplate';

const meta: Meta<typeof PhysicsLabTemplate> = {
    title: 'KFlow/Templates/PhysicsLabTemplate',
    component: PhysicsLabTemplate,
    parameters: { layout: 'fullscreen' },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhysicsLabTemplate>;

export const Default: Story = {
    args: {
        entity: {
            simulation: {
                id: 'sim-1',
                preset: 'projectileMotion',
                parameters: { gravity: 9.81, initialVelocity: 20, angle: 45 },
                bodies: [{ id: 'ball', x: 0, y: 0, vx: 14.14, vy: 14.14, mass: 1, radius: 5, color: '#ff6b6b', fixed: false }],
                running: false,
                elapsed: 0,
                measurements: [],
                targetCondition: 'Ball reaches max height',
            },
            availablePresets: [
                { id: 'projectileMotion', name: 'Projectile', description: 'Launch angle simulation' },
                { id: 'pendulum', name: 'Pendulum', description: 'Simple harmonic motion' },
            ],
            measurements: [],
        },
    },
};
