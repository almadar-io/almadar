import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeWorldMapBoard } from './KnowledgeWorldMapBoard';

const meta: Meta<typeof KnowledgeWorldMapBoard> = {
    title: 'KFlow/Organisms/KnowledgeWorldMapBoard',
    component: KnowledgeWorldMapBoard,
    parameters: { layout: 'padded' },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KnowledgeWorldMapBoard>;

const player = {
    id: 'p1',
    name: 'Explorer',
    level: 3,
    totalXP: 1500,
    domainXP: { formal: 800, natural: 400, social: 300 },
    unlockedTopics: ['Physics', 'Algebra'],
    currentRegion: 'region-mechanics',
    archetype: 'explorer' as const,
    resources: {},
};

const regions = [
    { id: 'region-algebra', domain: 'formal' as const, name: 'Crystal Spire of Algebra', terrain: 'crystal' as const, adjacentRegions: ['region-calculus', 'region-logic'], requiredMastery: 0, challenges: ['math-seq-1'], unlocked: true },
    { id: 'region-calculus', domain: 'formal' as const, name: 'Calculus Citadel', terrain: 'crystal' as const, adjacentRegions: ['region-algebra'], requiredMastery: 1, challenges: [], unlocked: false },
    { id: 'region-logic', domain: 'formal' as const, name: 'Logic Labyrinth', terrain: 'crystal' as const, adjacentRegions: ['region-algebra'], requiredMastery: 1, challenges: [], unlocked: false },
    { id: 'region-mechanics', domain: 'natural' as const, name: 'Mechanics Meadow', terrain: 'forest' as const, adjacentRegions: ['region-thermo', 'region-algebra'], requiredMastery: 0, challenges: ['phys-seq-1'], unlocked: true },
    { id: 'region-thermo', domain: 'natural' as const, name: 'Thermodynamics Thicket', terrain: 'forest' as const, adjacentRegions: ['region-mechanics'], requiredMastery: 1, challenges: ['phys-battle-1'], unlocked: true },
    { id: 'region-economics', domain: 'social' as const, name: 'Market Square', terrain: 'cities' as const, adjacentRegions: ['region-history'], requiredMastery: 0, challenges: ['econ-seq-1'], unlocked: true },
    { id: 'region-history', domain: 'social' as const, name: 'History Harbor', terrain: 'cities' as const, adjacentRegions: ['region-economics'], requiredMastery: 1, challenges: [], unlocked: false },
];

const challenges = [
    { id: 'phys-seq-1', domain: 'natural' as const, subject: 'Physics', topic: 'Projectile Motion', tier: 'sequencer' as const, prompt: 'Order the steps.', correctAnswer: 'decompose,solve', hints: ['Think vectors'], xpReward: 50, timeLimit: 120 },
    { id: 'phys-battle-1', domain: 'natural' as const, subject: 'Physics', topic: 'Thermodynamics', tier: 'battle' as const, prompt: 'What happens to entropy?', correctAnswer: 'increases', hints: [], xpReward: 150, timeLimit: 60 },
    { id: 'math-seq-1', domain: 'formal' as const, subject: 'Math', topic: 'Algebra Basics', tier: 'sequencer' as const, prompt: 'Solve for x.', correctAnswer: '5', hints: ['Isolate x'], xpReward: 30, timeLimit: 90 },
    { id: 'econ-seq-1', domain: 'social' as const, subject: 'Economics', topic: 'Supply & Demand', tier: 'sequencer' as const, prompt: 'Order market events.', correctAnswer: 'supply,demand', hints: [], xpReward: 40, timeLimit: 90 },
];

export const Default: Story = {
    args: {
        entity: {
            regions,
            player,
            currentRegion: 'region-mechanics',
            availableChallenges: challenges,
        },
    },
};

export const FormalRegion: Story = {
    args: {
        entity: {
            regions,
            player: { ...player, currentRegion: 'region-algebra' },
            currentRegion: 'region-algebra',
            availableChallenges: challenges,
        },
    },
};

export const SocialRegion: Story = {
    args: {
        entity: {
            regions,
            player: { ...player, currentRegion: 'region-economics' },
            currentRegion: 'region-economics',
            availableChallenges: challenges,
        },
    },
};
