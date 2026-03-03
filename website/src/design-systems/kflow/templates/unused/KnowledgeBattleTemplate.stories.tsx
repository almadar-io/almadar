import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeBattleTemplate } from './KnowledgeBattleTemplate';

const meta: Meta<typeof KnowledgeBattleTemplate> = {
    title: 'KFlow/Templates/KnowledgeBattleTemplate',
    component: KnowledgeBattleTemplate,
    parameters: { layout: 'fullscreen' },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KnowledgeBattleTemplate>;

export const Default: Story = {
    args: {
        entity: {
            player: { id: 'p1', name: 'Scholar', level: 3, totalXP: 1500, domainXP: { formal: 800, natural: 400, social: 300 }, unlockedTopics: ['Physics'], currentRegion: 'region-thermo', archetype: 'scholar', resources: {} },
            opponent: { name: 'Entropy Monster', level: 5, maxHP: 80 },
            challenge: { id: 'phys-b1', domain: 'natural', subject: 'Physics', topic: 'Thermodynamics', tier: 'battle', prompt: 'What happens to entropy?', correctAnswer: 'increases', hints: [], xpReward: 150, timeLimit: 60 },
            turnNumber: 1, playerHP: 100, opponentHP: 80, combatLog: [], phase: 'question',
        },
    },
};
