import type { Meta, StoryObj } from '@storybook/react-vite';
import { GameTemplate } from './GameTemplate';
import { Typography } from '../atoms/Typography';
import { Badge } from '../atoms/Badge';

const meta: Meta<typeof GameTemplate> = {
    title: 'Templates/GameTemplate',
    component: GameTemplate,
    parameters: {
        layout: 'fullscreen',
        backgrounds: { default: 'wireframe' },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Super Platform Quest',
        children: (
            <div className="h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <Typography color="secondary">Game Canvas</Typography>
            </div>
        ),
    },
};

export const WithControls: Story = {
    args: {
        title: 'Platformer Game',
        controls: {
            isPlaying: false,
            onPlay: () => console.log('Play'),
            onPause: () => console.log('Pause'),
            onReset: () => console.log('Reset'),
        },
        children: (
            <div className="h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <Typography color="secondary">Click Play to start</Typography>
            </div>
        ),
    },
};

export const Playing: Story = {
    args: {
        title: 'Platformer Game',
        controls: {
            isPlaying: true,
            onPlay: () => console.log('Play'),
            onPause: () => console.log('Pause'),
            onReset: () => console.log('Reset'),
        },
        children: (
            <div className="h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <Typography color="secondary">Game Running...</Typography>
            </div>
        ),
    },
};

export const WithHUD: Story = {
    args: {
        title: 'Adventure Game',
        controls: {
            isPlaying: true,
            onPlay: () => console.log('Play'),
            onPause: () => console.log('Pause'),
            onReset: () => console.log('Reset'),
        },
        hud: (
            <div className="bg-white border-2 border-black p-2 shadow-wireframe">
                <div className="flex gap-4">
                    <div>
                        <Typography variant="caption" color="secondary">SCORE</Typography>
                        <Typography variant="h6">12,500</Typography>
                    </div>
                    <div>
                        <Typography variant="caption" color="secondary">HEALTH</Typography>
                        <div className="flex gap-1">
                            <span className="text-red-500">❤️</span>
                            <span className="text-red-500">❤️</span>
                            <span className="text-neutral-300">❤️</span>
                        </div>
                    </div>
                    <div>
                        <Typography variant="caption" color="secondary">LEVEL</Typography>
                        <Typography variant="h6">3</Typography>
                    </div>
                </div>
            </div>
        ),
        children: (
            <div className="h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <Typography color="secondary">Game Canvas with HUD Overlay</Typography>
            </div>
        ),
    },
};

export const WithDebugPanel: Story = {
    args: {
        title: 'Debug Mode',
        showDebugPanel: true,
        controls: {
            isPlaying: true,
            onPlay: () => console.log('Play'),
            onPause: () => console.log('Pause'),
            onReset: () => console.log('Reset'),
        },
        debugPanel: (
            <div className="space-y-4">
                <div>
                    <Typography variant="caption" color="secondary">Entity: Player</Typography>
                    <div className="font-mono text-xs space-y-1 mt-1">
                        <div>x: 150</div>
                        <div>y: 320</div>
                        <div>health: 100</div>
                        <div>score: 12500</div>
                    </div>
                </div>
                <div>
                    <Typography variant="caption" color="secondary">State Machine</Typography>
                    <div className="mt-1">
                        <Badge variant="info">idle</Badge>
                    </div>
                </div>
                <div>
                    <Typography variant="caption" color="secondary">FPS</Typography>
                    <Typography variant="body1" className="font-mono">60</Typography>
                </div>
            </div>
        ),
        children: (
            <div className="h-[400px] bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <Typography color="secondary">Game Canvas</Typography>
            </div>
        ),
    },
};

export const FullFeatured: Story = {
    args: {
        title: 'Super Platform Quest',
        showDebugPanel: true,
        controls: {
            isPlaying: true,
            onPlay: () => console.log('Play'),
            onPause: () => console.log('Pause'),
            onReset: () => console.log('Reset'),
        },
        hud: (
            <div className="bg-white border-2 border-black p-3 shadow-wireframe">
                <div className="flex gap-6">
                    <div>
                        <Typography variant="caption" color="secondary">SCORE</Typography>
                        <Typography variant="h5">25,000</Typography>
                    </div>
                    <div>
                        <Typography variant="caption" color="secondary">LIVES</Typography>
                        <Typography variant="h5">3</Typography>
                    </div>
                    <div>
                        <Typography variant="caption" color="secondary">COINS</Typography>
                        <Typography variant="h5">47</Typography>
                    </div>
                </div>
            </div>
        ),
        debugPanel: (
            <div className="space-y-4 text-sm">
                <div>
                    <Typography variant="caption" color="secondary" className="font-bold">Player</Typography>
                    <div className="font-mono text-xs mt-1 space-y-1">
                        <div className="flex justify-between"><span>position:</span><span>(256, 384)</span></div>
                        <div className="flex justify-between"><span>velocity:</span><span>(2.5, 0)</span></div>
                        <div className="flex justify-between"><span>grounded:</span><span>true</span></div>
                    </div>
                </div>
                <div>
                    <Typography variant="caption" color="secondary" className="font-bold">State</Typography>
                    <Badge variant="success" className="mt-1">running</Badge>
                </div>
                <div>
                    <Typography variant="caption" color="secondary" className="font-bold">Performance</Typography>
                    <div className="font-mono text-xs mt-1 space-y-1">
                        <div className="flex justify-between"><span>FPS:</span><span>60</span></div>
                        <div className="flex justify-between"><span>Entities:</span><span>24</span></div>
                        <div className="flex justify-between"><span>Tick:</span><span>1847</span></div>
                    </div>
                </div>
            </div>
        ),
        children: (
            <div className="h-[400px] bg-gradient-to-b from-sky-100 to-sky-200 flex items-end justify-center border-2 border-dashed border-neutral-300">
                <div className="mb-8 text-center">
                    <div className="w-8 h-12 bg-blue-500 border-2 border-black mx-auto mb-2"></div>
                    <Typography color="secondary">Game Running</Typography>
                </div>
            </div>
        ),
    },
};
