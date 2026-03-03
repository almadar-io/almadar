import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeWorldMapTemplate } from './KnowledgeWorldMapTemplate';

const meta: Meta<typeof KnowledgeWorldMapTemplate> = {
    title: 'KFlow/Templates/KnowledgeWorldMapTemplate',
    component: KnowledgeWorldMapTemplate,
    parameters: { layout: 'fullscreen' },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KnowledgeWorldMapTemplate>;

export const Default: Story = {
    args: {
        entity: {
            regions: [
                { id: 'region-algebra', domain: 'formal', name: 'Crystal Spire of Algebra', terrain: 'crystal', adjacentRegions: ['region-mechanics'], requiredMastery: 0, challenges: ['math-seq-1'], unlocked: true },
                { id: 'region-mechanics', domain: 'natural', name: 'Mechanics Meadow', terrain: 'forest', adjacentRegions: ['region-algebra', 'region-economics'], requiredMastery: 0, challenges: ['phys-seq-1'], unlocked: true },
                { id: 'region-economics', domain: 'social', name: 'Market Square', terrain: 'cities', adjacentRegions: ['region-mechanics'], requiredMastery: 0, challenges: ['econ-seq-1'], unlocked: true },
            ],
            player: { id: 'p1', name: 'Explorer', level: 2, totalXP: 800, domainXP: { formal: 300, natural: 300, social: 200 }, unlockedTopics: ['Physics'], currentRegion: 'region-mechanics', archetype: 'explorer', resources: {} },
            currentRegion: 'region-mechanics',
            availableChallenges: [
                { id: 'phys-seq-1', domain: 'natural', subject: 'Physics', topic: 'Projectile Motion', tier: 'sequencer', prompt: 'Order the steps.', correctAnswer: 'a,b', hints: [], xpReward: 50, timeLimit: 120 },
            ],
        },
    },
};
