import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeChallengeTemplate } from './KnowledgeChallengeTemplate';

const meta: Meta<typeof KnowledgeChallengeTemplate> = {
    title: 'KFlow/Templates/KnowledgeChallengeTemplate',
    component: KnowledgeChallengeTemplate,
    parameters: { layout: 'fullscreen' },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KnowledgeChallengeTemplate>;

export const Default: Story = {
    args: {
        entity: {
            challenge: { id: 'phys-seq-1', domain: 'natural', subject: 'Physics', topic: 'Mechanics', tier: 'sequencer', prompt: 'Order projectile motion steps.', correctAnswer: 'decompose,solve', hints: ['Separate x and y'], xpReward: 50, timeLimit: 120 },
            player: { id: 'p1', name: 'Explorer', level: 2, totalXP: 800, domainXP: { formal: 200, natural: 400, social: 200 }, unlockedTopics: ['Physics'], currentRegion: 'region-mechanics', archetype: 'explorer', resources: {} },
            progress: 0, hints: ['Separate x and y'], hintsUsed: 0, timeRemaining: 120,
        },
    },
};
