/**
 * World Map Data — Knowledge regions mapped to domains.
 *
 * Domains → terrain types:
 * - Formal = crystal (mathematics, CS, logic)
 * - Natural = forest (physics, biology, chemistry)
 * - Social = cities (economics, history, philosophy)
 */

import type { KnowledgeRegion } from '../types/knowledge';

export const knowledgeRegions: KnowledgeRegion[] = [
    // Formal domain — Crystal terrain
    {
        id: 'region-algebra',
        domain: 'formal',
        name: 'Crystal Spire of Algebra',
        terrain: 'crystal',
        adjacentRegions: ['region-calculus', 'region-logic'],
        requiredMastery: 0,
        challenges: ['math-seq-1'],
        unlocked: true,
    },
    {
        id: 'region-calculus',
        domain: 'formal',
        name: 'Calculus Citadel',
        terrain: 'crystal',
        adjacentRegions: ['region-algebra', 'region-statistics'],
        requiredMastery: 1,
        challenges: ['math-eh-1'],
        unlocked: false,
    },
    {
        id: 'region-logic',
        domain: 'formal',
        name: 'Logic Labyrinth',
        terrain: 'crystal',
        adjacentRegions: ['region-algebra', 'region-cs'],
        requiredMastery: 1,
        challenges: ['math-sa-1'],
        unlocked: false,
    },
    {
        id: 'region-cs',
        domain: 'formal',
        name: 'Code Caverns',
        terrain: 'crystal',
        adjacentRegions: ['region-logic'],
        requiredMastery: 2,
        challenges: [],
        unlocked: false,
    },
    {
        id: 'region-statistics',
        domain: 'formal',
        name: 'Probability Plains',
        terrain: 'crystal',
        adjacentRegions: ['region-calculus', 'region-biology'],
        requiredMastery: 2,
        challenges: [],
        unlocked: false,
    },

    // Natural domain — Forest terrain
    {
        id: 'region-mechanics',
        domain: 'natural',
        name: 'Mechanics Meadow',
        terrain: 'forest',
        adjacentRegions: ['region-thermo', 'region-algebra'],
        requiredMastery: 0,
        challenges: ['phys-seq-1'],
        unlocked: true,
    },
    {
        id: 'region-thermo',
        domain: 'natural',
        name: 'Thermodynamics Thicket',
        terrain: 'forest',
        adjacentRegions: ['region-mechanics', 'region-chemistry'],
        requiredMastery: 1,
        challenges: ['phys-battle-1'],
        unlocked: false,
    },
    {
        id: 'region-biology',
        domain: 'natural',
        name: 'Biology Basin',
        terrain: 'forest',
        adjacentRegions: ['region-statistics', 'region-chemistry'],
        requiredMastery: 1,
        challenges: [],
        unlocked: false,
    },
    {
        id: 'region-chemistry',
        domain: 'natural',
        name: 'Chemistry Canopy',
        terrain: 'forest',
        adjacentRegions: ['region-thermo', 'region-biology'],
        requiredMastery: 2,
        challenges: [],
        unlocked: false,
    },

    // Social domain — Cities terrain
    {
        id: 'region-economics',
        domain: 'social',
        name: 'Market Square',
        terrain: 'cities',
        adjacentRegions: ['region-history', 'region-mechanics'],
        requiredMastery: 0,
        challenges: ['econ-seq-1', 'econ-eh-1'],
        unlocked: true,
    },
    {
        id: 'region-history',
        domain: 'social',
        name: 'History Harbor',
        terrain: 'cities',
        adjacentRegions: ['region-economics', 'region-philosophy'],
        requiredMastery: 1,
        challenges: [],
        unlocked: false,
    },
    {
        id: 'region-philosophy',
        domain: 'social',
        name: 'Philosophy Forum',
        terrain: 'cities',
        adjacentRegions: ['region-history', 'region-logic'],
        requiredMastery: 2,
        challenges: [],
        unlocked: false,
    },
];

export function getRegionById(id: string): KnowledgeRegion | undefined {
    return knowledgeRegions.find(r => r.id === id);
}

export function getRegionsByDomain(domain: string): KnowledgeRegion[] {
    return knowledgeRegions.filter(r => r.domain === domain);
}

export function getUnlockedRegions(): KnowledgeRegion[] {
    return knowledgeRegions.filter(r => r.unlocked);
}

export function getAdjacentRegions(regionId: string): KnowledgeRegion[] {
    const region = getRegionById(regionId);
    if (!region) return [];
    return region.adjacentRegions
        .map(id => getRegionById(id))
        .filter((r): r is KnowledgeRegion => r !== undefined);
}
