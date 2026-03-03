import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeBattleBoard } from './KnowledgeBattleBoard';

const meta: Meta<typeof KnowledgeBattleBoard> = {
    title: 'KFlow/Organisms/KnowledgeBattleBoard',
    component: KnowledgeBattleBoard,
    parameters: { layout: 'padded' },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KnowledgeBattleBoard>;

const baseEntity = {
    player: { id: 'p1', name: 'Scholar', level: 3, totalXP: 1500, domainXP: { formal: 800, natural: 400, social: 300 }, unlockedTopics: ['Physics'], currentRegion: 'region-thermo', archetype: 'scholar' as const, resources: {} },
    opponent: { name: 'Entropy Monster', level: 5, maxHP: 80 },
    challenge: { id: 'phys-battle-1', domain: 'natural' as const, subject: 'Physics', topic: 'Thermodynamics', tier: 'battle' as const, prompt: 'What happens to entropy in an isolated system?', correctAnswer: 'increases', hints: ['Second law'], xpReward: 150, timeLimit: 60 },
    turnNumber: 3,
    playerHP: 75,
    opponentHP: 45,
    combatLog: [
        { id: '1', message: 'Scholar attacks for 20 damage!', type: 'attack' as const },
        { id: '2', message: 'Entropy Monster retaliates for 15 damage!', type: 'attack' as const },
    ],
};

export const Question: Story = { args: { entity: { ...baseEntity, phase: 'question' } } };
export const Victory: Story = { args: { entity: { ...baseEntity, phase: 'victory', opponentHP: 0 } } };
export const Defeat: Story = { args: { entity: { ...baseEntity, phase: 'defeat', playerHP: 0 } } };
