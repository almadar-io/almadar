/**
 * Component Suggester
 *
 * Analyzes an .orb schema and suggests domain-specific components
 * that should be added to the design system for this client.
 */

import * as fs from 'fs';
import * as path from 'path';

interface ComponentSuggestion {
  name: string;
  description: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'templates';
  props: Array<{ name: string; type: string; description: string }>;
  reasoning: string;
  priority: 'high' | 'medium' | 'low';
  codeSketch: string;
}

interface DomainComponents {
  domain: string;
  keywords: string[];
  components: ComponentSuggestion[];
}

// Domain-specific component suggestions
const DOMAIN_COMPONENTS: DomainComponents[] = [
  {
    domain: 'garden',
    keywords: ['plant', 'seed', 'garden', 'grow', 'harvest', 'cultivate', 'soil', 'water', 'farm', 'crop', 'tree'],
    components: [
      {
        name: 'GardenView',
        description: 'A visual garden layout showing plants in a grid or organic arrangement',
        category: 'organisms',
        props: [
          { name: 'plants', type: 'Plant[]', description: 'Array of plants to display' },
          { name: 'layout', type: "'grid' | 'organic'", description: 'Layout style' },
          { name: 'onPlantClick', type: '(plant: Plant) => void', description: 'Plant selection handler' },
        ],
        reasoning: 'Core visualization for garden/agriculture domains to show plant collections',
        priority: 'high',
        codeSketch: `
export function GardenView({ plants, layout = 'grid', onPlantClick }: GardenViewProps) {
  return (
    <div className={cn('garden-view', layout === 'grid' ? 'grid grid-cols-4 gap-4' : 'flex flex-wrap')}>
      {plants.map(plant => (
        <PlantCard key={plant.id} plant={plant} onClick={() => onPlantClick?.(plant)} />
      ))}
    </div>
  );
}`,
      },
      {
        name: 'PlantCard',
        description: 'Card displaying a single plant with growth status and care indicators',
        category: 'molecules',
        props: [
          { name: 'plant', type: 'Plant', description: 'Plant data to display' },
          { name: 'showCareIndicators', type: 'boolean', description: 'Show water/sun needs' },
          { name: 'onClick', type: '() => void', description: 'Click handler' },
        ],
        reasoning: 'Essential card component for displaying individual plant information',
        priority: 'high',
        codeSketch: `
export function PlantCard({ plant, showCareIndicators = true, onClick }: PlantCardProps) {
  return (
    <Card className="plant-card garden-card cursor-pointer" onClick={onClick}>
      <div className="plant-icon text-4xl">{getPlantEmoji(plant.type)}</div>
      <CardTitle>{plant.name}</CardTitle>
      {showCareIndicators && (
        <div className="flex gap-2 mt-2">
          <CareIndicator type="water" level={plant.waterNeeds} />
          <CareIndicator type="sun" level={plant.sunNeeds} />
        </div>
      )}
      <GrowthMeter progress={plant.growthProgress} />
    </Card>
  );
}`,
      },
      {
        name: 'GrowthMeter',
        description: 'Progress indicator showing plant growth stage',
        category: 'atoms',
        props: [
          { name: 'progress', type: 'number', description: 'Growth progress 0-100' },
          { name: 'stages', type: 'string[]', description: 'Growth stage labels' },
        ],
        reasoning: 'Visual feedback for growth/progress - core to garden metaphor',
        priority: 'high',
        codeSketch: `
export function GrowthMeter({ progress, stages = ['Seed', 'Sprout', 'Growing', 'Mature'] }: GrowthMeterProps) {
  const stageIndex = Math.floor(progress / (100 / stages.length));
  return (
    <div className="growth-meter">
      <ProgressBar value={progress} className="bg-garden-leaf-color" />
      <span className="text-sm text-muted-foreground">{stages[stageIndex]}</span>
    </div>
  );
}`,
      },
      {
        name: 'TrustMeter',
        description: 'Visual indicator for trust/relationship level between entities',
        category: 'atoms',
        props: [
          { name: 'level', type: "'low' | 'medium' | 'high' | 'verified'", description: 'Trust level' },
          { name: 'showLabel', type: 'boolean', description: 'Show text label' },
        ],
        reasoning: 'For Winning-11 RFP: visualize trust between farmers and buyers',
        priority: 'medium',
        codeSketch: `
export function TrustMeter({ level, showLabel = true }: TrustMeterProps) {
  return (
    <div className={cn('trust-badge', \`trust-badge--\${level}\`)}>
      <TrustIcon level={level} />
      {showLabel && <span>{level}</span>}
    </div>
  );
}`,
      },
      {
        name: 'CareIndicator',
        description: 'Small icon indicator for plant care needs (water, sun, nutrients)',
        category: 'atoms',
        props: [
          { name: 'type', type: "'water' | 'sun' | 'nutrients'", description: 'Care type' },
          { name: 'level', type: "'low' | 'medium' | 'high'", description: 'Need level' },
        ],
        reasoning: 'Quick visual cues for plant care requirements',
        priority: 'medium',
        codeSketch: `
export function CareIndicator({ type, level }: CareIndicatorProps) {
  const icons = { water: '💧', sun: '☀️', nutrients: '🌱' };
  const colors = { low: 'text-green-500', medium: 'text-yellow-500', high: 'text-red-500' };
  return <span className={cn('care-indicator', colors[level])}>{icons[type]}</span>;
}`,
      },
      {
        name: 'SeasonalCalendar',
        description: 'Calendar view showing planting/harvest seasons',
        category: 'organisms',
        props: [
          { name: 'crops', type: 'Crop[]', description: 'Crops with their seasons' },
          { name: 'currentMonth', type: 'number', description: 'Current month (0-11)' },
        ],
        reasoning: 'Planning component for agricultural scheduling',
        priority: 'low',
        codeSketch: `
export function SeasonalCalendar({ crops, currentMonth }: SeasonalCalendarProps) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return (
    <div className="seasonal-calendar">
      <div className="grid grid-cols-12 gap-1">
        {months.map((month, i) => (
          <div key={month} className={cn('month', i === currentMonth && 'current')}>
            {month}
          </div>
        ))}
      </div>
      {crops.map(crop => <CropSeasonRow key={crop.id} crop={crop} />)}
    </div>
  );
}`,
      },
    ],
  },
  {
    domain: 'healthcare',
    keywords: ['patient', 'doctor', 'hospital', 'medical', 'health', 'diagnosis', 'treatment', 'appointment', 'prescription'],
    components: [
      {
        name: 'PatientCard',
        description: 'Card displaying patient information with status indicators',
        category: 'molecules',
        props: [
          { name: 'patient', type: 'Patient', description: 'Patient data' },
          { name: 'showVitals', type: 'boolean', description: 'Show vital signs' },
        ],
        reasoning: 'Core component for patient-centric healthcare interfaces',
        priority: 'high',
        codeSketch: `
export function PatientCard({ patient, showVitals }: PatientCardProps) {
  return (
    <Card className="patient-card">
      <Avatar name={patient.name} />
      <div className="patient-info">
        <h3>{patient.name}</h3>
        <Badge variant={patient.status}>{patient.status}</Badge>
      </div>
      {showVitals && <VitalsDisplay vitals={patient.vitals} />}
    </Card>
  );
}`,
      },
      {
        name: 'VitalsDisplay',
        description: 'Compact display of patient vital signs',
        category: 'molecules',
        props: [
          { name: 'vitals', type: 'Vitals', description: 'Vital signs data' },
          { name: 'compact', type: 'boolean', description: 'Compact view mode' },
        ],
        reasoning: 'Critical for at-a-glance patient monitoring',
        priority: 'high',
        codeSketch: `
export function VitalsDisplay({ vitals, compact }: VitalsDisplayProps) {
  return (
    <div className={cn('vitals-display', compact && 'compact')}>
      <VitalItem label="HR" value={vitals.heartRate} unit="bpm" />
      <VitalItem label="BP" value={vitals.bloodPressure} />
      <VitalItem label="Temp" value={vitals.temperature} unit="°F" />
    </div>
  );
}`,
      },
      {
        name: 'AppointmentSlot',
        description: 'Time slot component for scheduling appointments',
        category: 'atoms',
        props: [
          { name: 'time', type: 'Date', description: 'Appointment time' },
          { name: 'available', type: 'boolean', description: 'Slot availability' },
          { name: 'onSelect', type: '() => void', description: 'Selection handler' },
        ],
        reasoning: 'Essential for appointment scheduling interfaces',
        priority: 'medium',
        codeSketch: `
export function AppointmentSlot({ time, available, onSelect }: AppointmentSlotProps) {
  return (
    <button
      className={cn('appointment-slot', available ? 'available' : 'unavailable')}
      disabled={!available}
      onClick={onSelect}
    >
      {formatTime(time)}
    </button>
  );
}`,
      },
    ],
  },
  {
    domain: 'ecommerce',
    keywords: ['product', 'cart', 'order', 'checkout', 'inventory', 'shop', 'store', 'price', 'sku'],
    components: [
      {
        name: 'ProductCard',
        description: 'Card displaying product with image, price, and add-to-cart action',
        category: 'molecules',
        props: [
          { name: 'product', type: 'Product', description: 'Product data' },
          { name: 'onAddToCart', type: '() => void', description: 'Add to cart handler' },
        ],
        reasoning: 'Core component for product listings',
        priority: 'high',
        codeSketch: `
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="product-card">
      <img src={product.image} alt={product.name} />
      <CardTitle>{product.name}</CardTitle>
      <div className="price">{formatCurrency(product.price)}</div>
      <Button onClick={onAddToCart}>Add to Cart</Button>
    </Card>
  );
}`,
      },
      {
        name: 'CartSummary',
        description: 'Compact cart summary with item count and total',
        category: 'molecules',
        props: [
          { name: 'items', type: 'CartItem[]', description: 'Cart items' },
          { name: 'onCheckout', type: '() => void', description: 'Checkout handler' },
        ],
        reasoning: 'Essential for cart visibility throughout shopping experience',
        priority: 'high',
        codeSketch: `
export function CartSummary({ items, onCheckout }: CartSummaryProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="cart-summary">
      <Badge>{items.length} items</Badge>
      <span className="total">{formatCurrency(total)}</span>
      <Button onClick={onCheckout}>Checkout</Button>
    </div>
  );
}`,
      },
      {
        name: 'PriceTag',
        description: 'Stylized price display with optional discount',
        category: 'atoms',
        props: [
          { name: 'price', type: 'number', description: 'Current price' },
          { name: 'originalPrice', type: 'number', description: 'Original price (for discount)' },
          { name: 'currency', type: 'string', description: 'Currency code' },
        ],
        reasoning: 'Consistent price formatting across the store',
        priority: 'medium',
        codeSketch: `
export function PriceTag({ price, originalPrice, currency = 'USD' }: PriceTagProps) {
  const hasDiscount = originalPrice && originalPrice > price;
  return (
    <div className="price-tag">
      {hasDiscount && <span className="original line-through">{formatCurrency(originalPrice, currency)}</span>}
      <span className={cn('current', hasDiscount && 'text-accent')}>{formatCurrency(price, currency)}</span>
    </div>
  );
}`,
      },
    ],
  },
  {
    domain: 'game',
    keywords: ['player', 'score', 'level', 'enemy', 'character', 'game', 'sprite', 'health', 'inventory', 'quest'],
    components: [
      {
        name: 'CharacterStats',
        description: 'RPG-style character stats display',
        category: 'molecules',
        props: [
          { name: 'stats', type: 'CharacterStats', description: 'Character statistics' },
          { name: 'compact', type: 'boolean', description: 'Compact view' },
        ],
        reasoning: 'Core component for character-based games',
        priority: 'high',
        codeSketch: `
export function CharacterStats({ stats, compact }: CharacterStatsProps) {
  return (
    <div className={cn('character-stats', compact && 'compact')}>
      <StatBar label="HP" value={stats.health} max={stats.maxHealth} color="red" />
      <StatBar label="MP" value={stats.mana} max={stats.maxMana} color="blue" />
      <StatBar label="XP" value={stats.experience} max={stats.nextLevel} color="yellow" />
    </div>
  );
}`,
      },
      {
        name: 'QuestTracker',
        description: 'Panel showing active quests and objectives',
        category: 'organisms',
        props: [
          { name: 'quests', type: 'Quest[]', description: 'Active quests' },
          { name: 'onQuestSelect', type: '(quest: Quest) => void', description: 'Quest selection' },
        ],
        reasoning: 'Essential for quest/mission-based games',
        priority: 'medium',
        codeSketch: `
export function QuestTracker({ quests, onQuestSelect }: QuestTrackerProps) {
  return (
    <div className="quest-tracker">
      <h3>Active Quests</h3>
      {quests.map(quest => (
        <QuestItem key={quest.id} quest={quest} onClick={() => onQuestSelect(quest)} />
      ))}
    </div>
  );
}`,
      },
    ],
  },
];

interface OrbitalSchema {
  name: string;
  version?: string;
  description?: string;
  orbitals?: Array<{
    name: string;
    entity?: {
      name: string;
      fields?: Array<{ name: string; type: string }>;
    };
  }>;
}

/**
 * Detect domains from schema
 */
function detectDomains(schema: OrbitalSchema): string[] {
  const detectedDomains: string[] = [];

  const searchText = [
    schema.name,
    schema.description || '',
    ...(schema.orbitals || []).map(o => o.name),
    ...(schema.orbitals || []).flatMap(o => o.entity?.fields?.map(f => f.name) || []),
  ].join(' ').toLowerCase();

  for (const domainConfig of DOMAIN_COMPONENTS) {
    for (const keyword of domainConfig.keywords) {
      if (searchText.includes(keyword)) {
        if (!detectedDomains.includes(domainConfig.domain)) {
          detectedDomains.push(domainConfig.domain);
        }
        break;
      }
    }
  }

  return detectedDomains;
}

/**
 * Suggest components based on schema analysis
 */
export function suggestComponents(schemaPath: string): { domains: string[]; suggestions: ComponentSuggestion[] } {
  const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
  const schema: OrbitalSchema = JSON.parse(schemaContent);

  const domains = detectDomains(schema);
  console.log(`Detected domains: ${domains.join(', ') || 'none'}`);

  const suggestions: ComponentSuggestion[] = [];

  for (const domain of domains) {
    const domainConfig = DOMAIN_COMPONENTS.find(d => d.domain === domain);
    if (domainConfig) {
      suggestions.push(...domainConfig.components);
    }
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return { domains, suggestions };
}

/**
 * Generate component stubs from suggestions
 */
export function generateComponentStubs(
  suggestions: ComponentSuggestion[],
  outputDir: string
): void {
  for (const suggestion of suggestions) {
    const categoryDir = path.join(outputDir, suggestion.category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    const componentFile = path.join(categoryDir, `${suggestion.name}.tsx`);

    // Generate component stub
    const propsInterface = `interface ${suggestion.name}Props {
${suggestion.props.map(p => `  /** ${p.description} */\n  ${p.name}${p.type.includes('?') ? '' : '?'}: ${p.type};`).join('\n')}
}`;

    const content = `/**
 * ${suggestion.name}
 *
 * ${suggestion.description}
 *
 * Category: ${suggestion.category}
 * Priority: ${suggestion.priority}
 *
 * Reasoning: ${suggestion.reasoning}
 */

import React from 'react';
import { cn } from '../../lib/cn';

${propsInterface}

export function ${suggestion.name}({ ${suggestion.props.map(p => p.name).join(', ')} }: ${suggestion.name}Props) {
  // TODO: Implement component
  ${suggestion.codeSketch}
}
`;

    fs.writeFileSync(componentFile, content);
    console.log(`Generated: ${componentFile}`);
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: npx tsx suggest-components.ts <schema.orb> [--generate <output-dir>]');
    process.exit(1);
  }

  const schemaPath = args[0];
  const generateIndex = args.indexOf('--generate');

  const { domains, suggestions } = suggestComponents(schemaPath);

  console.log('\n📦 Component Suggestions:\n');

  for (const suggestion of suggestions) {
    console.log(`[${suggestion.priority.toUpperCase()}] ${suggestion.name} (${suggestion.category})`);
    console.log(`   ${suggestion.description}`);
    console.log(`   Reasoning: ${suggestion.reasoning}`);
    console.log('');
  }

  if (generateIndex !== -1 && args[generateIndex + 1]) {
    const outputDir = args[generateIndex + 1];
    console.log(`\n🔧 Generating component stubs to: ${outputDir}\n`);
    generateComponentStubs(suggestions, outputDir);
  }
}
