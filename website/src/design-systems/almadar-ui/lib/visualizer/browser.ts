/**
 * Browser entry point for the Orbital Visualizer
 * 
 * This file is bundled by esbuild to create a standalone browser script.
 * It exports the visualizer to the global `OrbitalVisualizer` object.
 */

import {
  renderStateMachineToSvg,
  renderStateMachineToDomData,
  extractStateMachine,
  getEffectSummary,
  extractOutputsFromTransitions,
  DEFAULT_CONFIG,
  type StateMachineDefinition,
  type EntityDefinition,
  type RenderOptions,
  type VisualizerConfig,
  type TransitionDefinition,
  type StateDefinition,
  type DomLayoutData,
  type DomStateNode,
  type DomTransitionLabel,
} from './index.js';

// =============================================================================
// Human-readable S-expression formatting
// =============================================================================

type SExpr = string | number | boolean | SExpr[];

function formatSExprHumanReadable(expr: SExpr, indent: number = 0): string {
  const spaces = '  '.repeat(indent);

  if (typeof expr === 'string') {
    if (expr.startsWith('@')) {
      // Binding - format nicely
      return `<span class="sexpr-binding">${expr}</span>`;
    }
    return `<span class="sexpr-string">"${expr}"</span>`;
  }
  if (typeof expr === 'number') {
    return `<span class="sexpr-number">${expr}</span>`;
  }
  if (typeof expr === 'boolean') {
    return `<span class="sexpr-boolean">${expr}</span>`;
  }
  if (!Array.isArray(expr) || expr.length === 0) {
    return '[]';
  }

  const op = expr[0];
  const args = expr.slice(1);

  // Format based on operator type
  switch (op) {
    case 'set':
      return `<span class="sexpr-effect">set</span> ${formatSExprHumanReadable(args[0] as SExpr)} → ${formatSExprHumanReadable(args[1] as SExpr)}`;
    case 'emit':
      return `<span class="sexpr-effect">emit</span> <span class="sexpr-event">${args[0]}</span>${args[1] ? ` with ${formatSExprHumanReadable(args[1] as SExpr)}` : ''}`;
    case 'notify':
      return `<span class="sexpr-effect">notify</span> via <span class="sexpr-string">${args[0]}</span>: "${args[1] || ''}"`;
    case 'persist':
      return `<span class="sexpr-effect">persist</span> ${args[0]} ${args[1] || ''}`;
    case 'navigate':
      return `<span class="sexpr-effect">navigate</span> to <span class="sexpr-string">"${args[0]}"</span>`;
    case 'spawn':
      return `<span class="sexpr-effect">spawn</span> <span class="sexpr-entity">${args[0]}</span>`;
    case 'despawn':
      return `<span class="sexpr-effect">despawn</span> ${formatSExprHumanReadable(args[0] as SExpr)}`;
    case 'call-service':
      return `<span class="sexpr-effect">call-service</span> <span class="sexpr-string">"${args[0]}"</span>`;
    case 'do':
      return args.map(a => formatSExprHumanReadable(a as SExpr, indent)).join('\n' + spaces);
    // Guards
    case '=':
    case '!=':
    case '<':
    case '>':
    case '<=':
    case '>=':
      return `${formatSExprHumanReadable(args[0] as SExpr)} <span class="sexpr-operator">${op}</span> ${formatSExprHumanReadable(args[1] as SExpr)}`;
    case 'and':
      return args.map(a => formatSExprHumanReadable(a as SExpr)).join(' <span class="sexpr-operator">AND</span> ');
    case 'or':
      return args.map(a => formatSExprHumanReadable(a as SExpr)).join(' <span class="sexpr-operator">OR</span> ');
    case 'not':
      return `<span class="sexpr-operator">NOT</span> ${formatSExprHumanReadable(args[0] as SExpr)}`;
    default:
      // Generic formatting
      const formattedArgs = args.map(a => formatSExprHumanReadable(a as SExpr)).join(', ');
      return `<span class="sexpr-fn">${op}</span>(${formattedArgs})`;
  }
}

// =============================================================================
// DOM-based rendering (Browser-specific)
// =============================================================================

interface BrowserRenderOptions extends RenderOptions {
  config?: Partial<VisualizerConfig>;
}

// Store state machine data for tooltips
let currentStateMachine: StateMachineDefinition | null = null;

/**
 * Render a state machine into a container element
 */
function render(
  container: HTMLElement,
  data: unknown,
  options: BrowserRenderOptions = {}
): void {
  const config = { ...DEFAULT_CONFIG, ...options.config };

  // Extract state machine from various formats
  const stateMachine = extractStateMachine(data);
  currentStateMachine = stateMachine;

  if (!stateMachine) {
    container.innerHTML = '<p style="color: #8b949e; text-align: center;">No state machine found</p>';
    return;
  }

  // Determine title
  let title = options.title || '';
  if (!title && typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;
    if (obj.name) title = String(obj.name);
  }

  // Get entity from options or data
  const entity = options.entity || (typeof data === 'object' && data !== null ? (data as Record<string, unknown>).entity as EntityDefinition : undefined);

  // Generate SVG
  const svgString = renderStateMachineToSvg(stateMachine, { title, entity }, config);

  // Parse and insert SVG
  container.innerHTML = svgString;

  // Add interactivity
  addInteractivity(container, config, stateMachine);
}

/**
 * Add hover effects, tooltips, and animations to the rendered SVG
 */
function addInteractivity(container: HTMLElement, config: VisualizerConfig, stateMachine: StateMachineDefinition): void {
  const svg = container.querySelector('svg');
  if (!svg) return;

  // Add CSS animations and tooltip styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes draw-arrow {
      to { stroke-dashoffset: 0; }
    }
    @keyframes tooltip-fade-in {
      from { opacity: 0; transform: translateX(-50%) translateY(10px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    .orbital-state-machine .state-node {
      cursor: pointer;
      transition: filter 0.2s ease;
    }
    .orbital-state-machine .state-node:hover {
      filter: brightness(1.2);
    }
    .orbital-state-machine .state-node circle {
      transition: stroke-width 0.2s ease, filter 0.2s ease;
    }
    .orbital-state-machine .state-node:hover circle {
      stroke-width: 4;
    }
    .orbital-state-machine .transition-group {
      cursor: pointer;
    }
    .orbital-state-machine .transition-group:hover text {
      fill: #e6edf3 !important;
    }
    .orbital-tooltip {
      animation: tooltip-fade-in 0.2s ease;
      max-width: 400px;
    }
    .orbital-tooltip .tooltip-header {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 8px;
      color: #e6edf3;
      border-bottom: 1px solid #30363d;
      padding-bottom: 8px;
    }
    .orbital-tooltip .tooltip-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      margin-right: 4px;
      background: #30363d;
      color: #8b949e;
    }
    .orbital-tooltip .tooltip-badge.initial {
      background: rgba(35, 134, 54, 0.2);
      color: #238636;
    }
    .orbital-tooltip .tooltip-badge.final {
      background: rgba(248, 81, 73, 0.2);
      color: #f85149;
    }
    .orbital-tooltip .tooltip-section {
      margin-top: 10px;
    }
    .orbital-tooltip .tooltip-section-title {
      font-size: 11px;
      color: #8b949e;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .orbital-tooltip .tooltip-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      background: #0d1117;
      padding: 8px;
      border-radius: 4px;
      line-height: 1.5;
    }
    .orbital-tooltip .tooltip-code .sexpr-effect {
      color: #ffb86c;
      font-weight: 600;
    }
    .orbital-tooltip .tooltip-code .sexpr-binding {
      color: #79c0ff;
    }
    .orbital-tooltip .tooltip-code .sexpr-string {
      color: #a5d6ff;
    }
    .orbital-tooltip .tooltip-code .sexpr-number {
      color: #ffa657;
    }
    .orbital-tooltip .tooltip-code .sexpr-boolean {
      color: #ff7b72;
    }
    .orbital-tooltip .tooltip-code .sexpr-operator {
      color: #ff79c6;
      font-weight: 600;
    }
    .orbital-tooltip .tooltip-code .sexpr-event {
      color: #7ee787;
    }
    .orbital-tooltip .tooltip-code .sexpr-entity {
      color: #d2a8ff;
    }
    .orbital-tooltip .tooltip-code .sexpr-fn {
      color: #d2a8ff;
    }
    /* Transition filtering styles */
    .orbital-state-machine.filtering .transition-element {
      opacity: 0.15;
      transition: opacity 0.2s ease;
    }
    .orbital-state-machine.filtering .transition-element.highlighted {
      opacity: 1;
    }
    .orbital-state-machine.filtering .state-node {
      opacity: 0.4;
      transition: opacity 0.2s ease;
    }
    .orbital-state-machine.filtering .state-node.highlighted {
      opacity: 1;
    }
    .orbital-state-machine.filtering .transition-path,
    .orbital-state-machine.filtering .transition-label {
      opacity: 0.15;
      transition: opacity 0.2s ease;
    }
    .orbital-state-machine.filtering .transition-path.highlighted,
    .orbital-state-machine.filtering .transition-label.highlighted {
      opacity: 1;
    }
    /* Transition detail reveal on hover */
    .orbital-state-machine .transition-event {
      cursor: pointer;
    }
    .orbital-state-machine .transition-event:hover {
      fill: #e6edf3 !important;
    }
    .orbital-state-machine .transition-path {
      cursor: pointer;
    }
    .orbital-state-machine .transition-detail {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .orbital-state-machine .transition-group:hover .transition-detail {
      opacity: 1;
      pointer-events: auto;
    }
    .orbital-state-machine .transition-detail.visible {
      opacity: 1 !important;
      pointer-events: auto !important;
    }
  `;
  container.appendChild(style);

  // Transition tooltips are handled via CSS hover on .transition-detail elements
  // (embedded in the SVG, showing human-readable domain language text)

  // Add click and hover handlers to state nodes
  const stateNodes = svg.querySelectorAll('.state-node');
  stateNodes.forEach((node) => {
    const text = node.querySelector('text');
    const stateName = text?.textContent || '';

    // Add hover listeners for transition filtering
    node.addEventListener('mouseenter', () => {
      svg.classList.add('filtering');

      // Highlight this state
      node.classList.add('highlighted');

      // Find connected states and highlight them
      const connectedStates = new Set<string>();
      connectedStates.add(stateName);

      stateMachine.transitions.forEach((t) => {
        if (t.from === stateName) connectedStates.add(t.to);
        if (t.to === stateName) connectedStates.add(t.from);
      });

      // Highlight connected state nodes
      stateNodes.forEach((otherNode) => {
        const otherText = otherNode.querySelector('text');
        const otherName = otherText?.textContent || '';
        if (connectedStates.has(otherName)) {
          otherNode.classList.add('highlighted');
        }
      });

      // Highlight related transition paths and labels using data attributes
      svg.querySelectorAll('.transition-path, .transition-label').forEach((el) => {
        const from = el.getAttribute('data-from');
        const to = el.getAttribute('data-to');
        if (from === stateName || to === stateName) {
          el.classList.add('highlighted');
        }
      });
    });

    node.addEventListener('mouseleave', () => {
      svg.classList.remove('filtering');
      svg.querySelectorAll('.highlighted').forEach((el) => el.classList.remove('highlighted'));
    });

    node.addEventListener('click', (e) => {
      e.stopPropagation();
      const stateData = stateMachine.states.find(s => s.name === stateName);
      const outgoingTransitions = stateMachine.transitions.filter(t => t.from === stateName);
      showStateTooltip(container, node as SVGGElement, stateData, outgoingTransitions, config);
    });
  });

  // Add click handlers to transition labels (effect text)
  const transitionLabels = svg.querySelectorAll('text');
  transitionLabels.forEach((label) => {
    const text = label.textContent || '';
    // Check if this is an event label (transition event names are usually UPPERCASE)
    if (/^[A-Z_]+$/.test(text)) {
      const parent = label.parentElement;
      if (parent) {
        parent.classList.add('transition-group');
        label.addEventListener('click', (e) => {
          e.stopPropagation();
          // Find matching transition
          const transition = stateMachine.transitions.find(t => t.event === text);
          if (transition) {
            showTransitionDetailTooltip(container, label, transition, config);
          }
        });
      }
    }
  });

  // Close tooltips on click outside
  document.addEventListener('click', () => {
    const tooltip = document.body.querySelector('.orbital-tooltip');
    if (tooltip) tooltip.remove();
  });
}

function showStateTooltip(
  container: HTMLElement,
  node: SVGGElement,
  state: StateDefinition | undefined,
  outgoingTransitions: TransitionDefinition[],
  config: VisualizerConfig
): void {
  // Remove existing tooltip
  const existing = document.body.querySelector('.orbital-tooltip');
  if (existing) existing.remove();

  if (!state) return;

  // Get node position
  const circle = node.querySelector('circle');
  if (!circle) return;

  const cx = parseFloat(circle.getAttribute('cx') || '0');
  const cy = parseFloat(circle.getAttribute('cy') || '0');
  const r = parseFloat(circle.getAttribute('r') || '0');

  // Get SVG offset
  const svg = container.querySelector('svg');
  if (!svg) return;

  const svgRect = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;
  const scaleX = svgRect.width / viewBox.width;
  const scaleY = svgRect.height / viewBox.height;

  // Use page coordinates for fixed positioning
  const x = (cx * scaleX) + svgRect.left + window.scrollX;
  const y = ((cy - r) * scaleY) + svgRect.top + window.scrollY - 10;

  // Build tooltip content
  let content = `
    <div class="tooltip-header">${state.name}</div>
    <div class="tooltip-body">
      ${state.isInitial ? '<span class="tooltip-badge initial">Initial State</span>' : ''}
      ${state.isFinal ? '<span class="tooltip-badge final">Final State</span>' : ''}
      ${!state.isInitial && !state.isFinal ? '<span class="tooltip-badge">Intermediate State</span>' : ''}
      ${state.description ? `<p style="margin: 8px 0 0 0; color: #8b949e; font-size: 12px;">${state.description}</p>` : ''}
    </div>
  `;

  if (outgoingTransitions.length > 0) {
    content += `
      <div class="tooltip-section">
        <div class="tooltip-section-title">Outgoing Transitions</div>
        <div class="tooltip-code">
          ${outgoingTransitions.map(t => `→ <span class="sexpr-event">${t.event}</span> → ${t.to}`).join('<br>')}
        </div>
      </div>
    `;
  }

  const tooltip = document.createElement('div');
  tooltip.className = 'orbital-tooltip';
  tooltip.innerHTML = content;
  tooltip.style.cssText = `
    position: fixed;
    left: ${x - window.scrollX}px;
    top: ${y - window.scrollY}px;
    transform: translateX(-50%) translateY(-100%);
    background: #1a1f2e;
    border: 1px solid ${state.isInitial ? config.colors.initialNode : state.isFinal ? config.colors.finalNode : config.colors.nodeBorder};
    border-radius: 8px;
    padding: 12px 16px;
    color: #e6edf3;
    font-family: Inter, sans-serif;
    font-size: 13px;
    z-index: 99999;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    pointer-events: auto;
  `;

  document.body.appendChild(tooltip);

  // Keep tooltip open until clicked elsewhere
  tooltip.addEventListener('click', (e) => e.stopPropagation());
}

function showTransitionDetailTooltip(
  container: HTMLElement,
  label: SVGTextElement,
  transition: TransitionDefinition,
  config: VisualizerConfig
): void {
  // Remove existing tooltip
  const existing = document.body.querySelector('.orbital-tooltip');
  if (existing) existing.remove();

  // Get label position
  const svg = container.querySelector('svg');
  if (!svg) return;

  const labelRect = label.getBoundingClientRect();

  // Use page coordinates for fixed positioning
  const x = labelRect.left + labelRect.width / 2;
  const y = labelRect.top - 10;

  // Build tooltip content
  let content = `
    <div class="tooltip-header">${transition.event}</div>
    <div class="tooltip-body">
      <span class="tooltip-badge">${transition.from} → ${transition.to}</span>
    </div>
  `;

  if (transition.guard) {
    content += `
      <div class="tooltip-section">
        <div class="tooltip-section-title">Guard Condition</div>
        <div class="tooltip-code">
          ${formatSExprHumanReadable(transition.guard as SExpr)}
        </div>
      </div>
    `;
  }

  if (transition.effects && transition.effects.length > 0) {
    content += `
      <div class="tooltip-section">
        <div class="tooltip-section-title">Effects</div>
        <div class="tooltip-code">
          ${transition.effects.map(e => formatSExprHumanReadable(e as SExpr)).join('<br>')}
        </div>
      </div>
    `;
  }

  const tooltip = document.createElement('div');
  tooltip.className = 'orbital-tooltip';
  tooltip.innerHTML = content;
  tooltip.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    transform: translateX(-50%) translateY(-100%);
    background: #1a1f2e;
    border: 1px solid #8b949e;
    border-radius: 8px;
    padding: 12px 16px;
    color: #e6edf3;
    font-family: Inter, sans-serif;
    font-size: 13px;
    z-index: 99999;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    pointer-events: auto;
  `;

  document.body.appendChild(tooltip);

  // Keep tooltip open until clicked elsewhere
  tooltip.addEventListener('click', (e) => e.stopPropagation());
}

// =============================================================================
// DOM-based rendering (Vanilla JS - matches React DomStateMachineVisualizer)
// =============================================================================

/**
 * Auto-initialize diagrams from data attributes
 */
function init(): void {
  document.querySelectorAll('[data-orbital-diagram]').forEach((container) => {
    try {
      const dataAttr = container.getAttribute('data-orbital-diagram');
      if (!dataAttr) return;

      const data = JSON.parse(dataAttr);
      const title = container.getAttribute('data-title') || '';
      const useDom = container.getAttribute('data-use-dom') === 'true';

      if (useDom) {
        renderDom(container as HTMLElement, data, { title });
      } else {
        render(container as HTMLElement, data, { title });
      }
    } catch (e) {
      console.error('Failed to parse orbital diagram:', e);
      (container as HTMLElement).innerHTML = '<p style="color: #f85149;">Failed to render diagram</p>';
    }
  });
}

interface TransitionBundle {
  id: string;
  from: string;
  to: string;
  labels: DomTransitionLabel[];
  isBidirectional: boolean;
  isReverse: boolean;
}

let pinnedTooltip: { element: HTMLElement; bundleId: string } | null = null;

/**
 * Render a state machine into a container element using DOM-based approach
 * This matches the React DomStateMachineVisualizer component
 */
function renderDom(
  container: HTMLElement,
  data: unknown,
  options: BrowserRenderOptions = {}
): void {
  const config = { ...DEFAULT_CONFIG, ...options.config };

  // Extract state machine from various formats
  const stateMachine = extractStateMachine(data);
  currentStateMachine = stateMachine;

  if (!stateMachine) {
    container.innerHTML = '<p style="color: #8b949e; text-align: center;">No state machine found</p>';
    return;
  }

  // Determine title
  let title = options.title || '';
  if (!title && typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;
    if (obj.name) title = String(obj.name);
  }

  // Get entity from options or data
  const entity = options.entity || (typeof data === 'object' && data !== null ? (data as Record<string, unknown>).entity as EntityDefinition : undefined);

  // Generate DOM layout data
  const layoutData = renderStateMachineToDomData(stateMachine, { title, entity }, config);

  // Bundle transitions by from->to
  const bundles = bundleTransitions(layoutData.labels);

  // Create DOM structure
  container.innerHTML = '';
  container.style.position = 'relative';
  container.style.width = layoutData.width + 'px';
  container.style.height = layoutData.height + 'px';
  container.style.backgroundColor = config.colors.background;
  container.style.borderRadius = '8px';
  container.style.overflow = 'visible';

  // Title
  if (title) {
    const titleEl = document.createElement('div');
    titleEl.style.cssText = `
      position: absolute; left: 0; right: 0; top: 10px;
      text-align: center; font-weight: 600;
      color: ${config.colors.nodeText}; font-size: 14px;
      font-family: Inter, sans-serif;
    `;
    titleEl.textContent = title;
    container.appendChild(titleEl);
  }

  // Content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.style.cssText = `
    position: absolute; inset: 0;
    top: ${title ? 30 : 0}px;
  `;
  container.appendChild(contentWrapper);

  // Entity box
  if (layoutData.entity) {
    const entityBox = createEntityBox(layoutData.entity);
    contentWrapper.appendChild(entityBox);
  }

  // State nodes (rendered first, z-index 5)
  layoutData.states.forEach(state => {
    const stateNode = createStateNode(state, config);
    contentWrapper.appendChild(stateNode);
  });

  // SVG layer for transitions (z-index 20, on top of states)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.cssText = `
    position: absolute; inset: 0;
    width: ${layoutData.width}px;
    height: ${layoutData.height - (title ? 30 : 0)}px;
    overflow: visible;
    z-index: 20;
    pointer-events: none;
  `;
  contentWrapper.appendChild(svg);

  // Render transition bundles
  bundles.forEach((bundle, idx) => {
    const group = createTransitionBundle(bundle, layoutData.states, idx, bundles.length, config, container);
    if (group) svg.appendChild(group);
  });

  // Outputs box
  if (layoutData.outputs) {
    const outputsBox = createOutputsBox(layoutData.outputs);
    contentWrapper.appendChild(outputsBox);
  }

  // Legend
  const legend = createLegend(config, layoutData.height);
  container.appendChild(legend);

  // Add CSS styles
  addDomStyles();
}

function bundleTransitions(labels: DomTransitionLabel[]): TransitionBundle[] {
  const bundleMap: Record<string, DomTransitionLabel[]> = {};

  labels.forEach(label => {
    const key = `${label.from}->${label.to}`;
    if (!bundleMap[key]) bundleMap[key] = [];
    bundleMap[key].push(label);
  });

  const allPairs = new Set(Object.keys(bundleMap));

  return Object.entries(bundleMap).map(([key, bundleLabels]) => {
    const [from, to] = key.split('->');
    const reverseKey = `${to}->${from}`;
    const isBidirectional = allPairs.has(reverseKey);
    const isReverse = from > to;

    return {
      id: `bundle-${from}-${to}`,
      from,
      to,
      labels: bundleLabels,
      isBidirectional,
      isReverse,
    };
  });
}

function createStateNode(state: DomStateNode, config: VisualizerConfig): HTMLElement {
  const size = state.radius * 2;
  let borderColor = config.colors.nodeBorder;
  let borderWidth = 2;

  if (state.isInitial) {
    borderColor = config.colors.initialNode;
    borderWidth = 3;
  } else if (state.isFinal) {
    borderColor = config.colors.finalNode;
    borderWidth = 3;
  }

  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: absolute;
    left: ${state.x - state.radius}px;
    top: ${state.y - state.radius}px;
    width: ${size}px;
    height: ${size}px;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const circle = document.createElement('div');
  circle.style.cssText = `
    position: absolute; inset: 0;
    border-radius: 50%;
    background: ${config.colors.node};
    border: ${borderWidth}px solid ${borderColor};
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const nameEl = document.createElement('span');
  nameEl.style.cssText = `
    font-weight: 600;
    color: ${config.colors.nodeText};
    font-size: 18px;
    font-family: Inter, sans-serif;
    text-align: center;
    padding: 0 8px;
  `;
  nameEl.textContent = state.name;
  circle.appendChild(nameEl);

  if (state.isFinal) {
    const inner = document.createElement('div');
    inner.style.cssText = `
      position: absolute;
      width: ${size - 12}px;
      height: ${size - 12}px;
      border-radius: 50%;
      border: 2px solid ${borderColor};
    `;
    circle.appendChild(inner);
  }

  wrapper.appendChild(circle);

  // Initial state arrow
  if (state.isInitial) {
    const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrowSvg.style.cssText = `
      position: absolute;
      left: -45px;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 20px;
    `;
    arrowSvg.innerHTML = `
      <defs>
        <marker id="init-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="${config.colors.initial}" />
        </marker>
      </defs>
      <path d="M 0 10 L 35 10" stroke="${config.colors.initial}" stroke-width="2" fill="none" marker-end="url(#init-arrow)" />
    `;
    wrapper.appendChild(arrowSvg);
  }

  return wrapper;
}

function createTransitionBundle(
  bundle: TransitionBundle,
  states: DomStateNode[],
  bundleIndex: number,
  totalBundles: number,
  config: VisualizerConfig,
  container: HTMLElement
): SVGGElement | null {
  const fromState = states.find(s => s.name === bundle.from);
  const toState = states.find(s => s.name === bundle.to);
  if (!fromState || !toState) return null;

  // Check if this is a self-loop
  const isSelfLoop = bundle.from === bundle.to;

  const dx = toState.x - fromState.x;
  const dy = toState.y - fromState.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Self-loop handling: render as an arc above/below the state
  if (isSelfLoop) {
    const loopRadius = 50 + bundleIndex * 25;
    const loopDirection = bundleIndex % 2 === 0 ? -1 : 1;

    const cx = fromState.x;
    const cy = fromState.y + (fromState.radius + loopRadius) * loopDirection;

    const startAngle = loopDirection === -1 ? -0.5 : 0.5;
    const endAngle = loopDirection === -1 ? 0.5 : -0.5;

    const startX = fromState.x + Math.cos(Math.PI / 2 * loopDirection + startAngle) * fromState.radius;
    const startY = fromState.y + Math.sin(Math.PI / 2 * loopDirection + startAngle) * fromState.radius;
    const endX = fromState.x + Math.cos(Math.PI / 2 * loopDirection + endAngle) * fromState.radius;
    const endY = fromState.y + Math.sin(Math.PI / 2 * loopDirection + endAngle) * fromState.radius;

    const isSingle = bundle.labels.length === 1;
    const labelText = isSingle ? bundle.labels[0].event : `${bundle.labels.length} events`;
    const bundleColor = isSingle ? config.colors.arrow : '#6366f1';
    const labelWidth = labelText.length * 9 + (isSingle ? 24 : 40);

    const loopPath = `M ${startX} ${startY} A ${loopRadius} ${loopRadius} 0 1 ${loopDirection === -1 ? 1 : 0} ${endX} ${endY}`;
    const labelX = cx;
    const labelY = cy + loopRadius * loopDirection * 0.5;

    const markerId = `arrow-self-${bundle.id}`;

    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('data-bundle-id', bundle.id);
    group.setAttribute('cursor', 'pointer');
    group.style.pointerEvents = 'auto';

    group.innerHTML = `
      <defs>
        <marker id="${markerId}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="${bundleColor}" />
        </marker>
      </defs>
      <path d="${loopPath}" stroke="${bundleColor}" stroke-width="${isSingle ? 1.5 : 2.5}" fill="none" marker-end="url(#${markerId})" />
      <rect x="${labelX - labelWidth / 2}" y="${labelY - 14}" width="${labelWidth}" height="28" rx="${isSingle ? 4 : 14}"
            fill="${isSingle ? config.colors.background : '#4f46e5'}" stroke="${bundleColor}" stroke-width="${isSingle ? 1 : 0}" />
      <text x="${labelX}" y="${labelY + 5}" text-anchor="middle" fill="${isSingle ? config.colors.arrowText : '#ffffff'}"
            font-family="JetBrains Mono, monospace" font-size="13px" font-weight="${isSingle ? 600 : 700}">${labelText}</text>
    `;

    // Add event listeners
    group.addEventListener('mouseenter', () => {
      if (pinnedTooltip) return;
      showBundleTooltip(container, bundle, labelX, labelY, config, false);
    });
    group.addEventListener('mouseleave', () => {
      if (pinnedTooltip) return;
      hideBundleTooltip();
    });
    group.addEventListener('click', (e) => {
      e.stopPropagation();
      if (pinnedTooltip?.bundleId === bundle.id) {
        hideBundleTooltip();
        pinnedTooltip = null;
      } else {
        showBundleTooltip(container, bundle, labelX, labelY, config, true);
      }
    });

    return group;
  }

  // Non-self-loop: normal transition
  if (dist === 0) return null;

  const nx = dx / dist;
  const ny = dy / dist;

  const startX = fromState.x + nx * fromState.radius;
  const startY = fromState.y + ny * fromState.radius;
  const endX = toState.x - nx * (toState.radius + 8);
  const endY = toState.y - ny * (toState.radius + 8);

  // Lane calculation - INCREASED spacing
  const baseCurveDirection = bundle.isReverse ? 1 : -1;
  const laneOffset = 55 + bundleIndex * 55; // Increased from 40 + 35
  const baseOffset = bundle.isBidirectional ? 60 : 40; // Increased from 50/30
  const curveAmount = (baseOffset + laneOffset) * baseCurveDirection;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const perpX = -ny * curveAmount;
  const perpY = nx * curveAmount;
  const controlX = midX + perpX;
  const controlY = midY + perpY;

  // Bezier midpoint
  const t = 0.5;
  const labelX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
  const labelY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;

  const isSingle = bundle.labels.length === 1;
  const labelText = isSingle ? bundle.labels[0].event : `${bundle.labels.length} events`;
  const labelWidth = labelText.length * 9 + (isSingle ? 24 : 40);
  const bundleColor = isSingle ? config.colors.arrow : '#6366f1';

  // Single continuous bezier path from start to end
  const pathD = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;

  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('data-bundle-id', bundle.id);
  group.setAttribute('cursor', 'pointer');
  group.style.pointerEvents = 'auto';

  const markerId = `arrow-${bundle.id}`;
  group.innerHTML = `
    <defs>
      <marker id="${markerId}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${bundleColor}" />
      </marker>
    </defs>
    <path d="${pathD}" stroke="${bundleColor}" stroke-width="${isSingle ? 1.5 : 2.5}" fill="none" marker-end="url(#${markerId})" />
    <rect x="${labelX - labelWidth / 2}" y="${labelY - 14}" width="${labelWidth}" height="28" rx="${isSingle ? 4 : 14}"
          fill="${isSingle ? config.colors.background : '#4f46e5'}" stroke="${bundleColor}" stroke-width="${isSingle ? 1 : 0}" />
    <text x="${labelX}" y="${labelY + 5}" text-anchor="middle" fill="${isSingle ? config.colors.arrowText : '#ffffff'}"
          font-family="JetBrains Mono, monospace" font-size="13px" font-weight="${isSingle ? 600 : 700}">${labelText}</text>
  `;

  // Tooltip handlers
  group.addEventListener('mouseenter', (e) => {
    if (pinnedTooltip) return;
    showBundleTooltip(container, bundle, labelX, labelY, config, false);
  });

  group.addEventListener('mouseleave', () => {
    if (pinnedTooltip) return;
    hideBundleTooltip();
  });

  group.addEventListener('click', (e) => {
    e.stopPropagation();
    if (pinnedTooltip?.bundleId === bundle.id) {
      hideBundleTooltip();
      pinnedTooltip = null;
    } else {
      showBundleTooltip(container, bundle, labelX, labelY, config, true);
    }
  });

  return group;
}

function showBundleTooltip(
  container: HTMLElement,
  bundle: TransitionBundle,
  x: number,
  y: number,
  config: VisualizerConfig,
  pinned: boolean
): void {
  hideBundleTooltip();

  const isSingle = bundle.labels.length === 1;
  const containerRect = container.getBoundingClientRect();
  const screenX = containerRect.left + x + window.scrollX;
  const screenY = containerRect.top + y + window.scrollY;

  // Estimate height and check bounds
  const estimatedHeight = isSingle ? 80 : 60 + bundle.labels.length * 50;
  const showBelow = screenY - estimatedHeight < 50;

  const tooltip = document.createElement('div');
  tooltip.className = 'orbital-dom-tooltip';

  // Extra top padding when pinned to make room for header
  const topPadding = pinned ? 32 : 12;

  tooltip.style.cssText = `
    position: fixed;
    left: ${screenX - window.scrollX}px;
    top: ${screenY - window.scrollY + (showBelow ? 30 : -10)}px;
    transform: translate(-50%, ${showBelow ? '0' : '-100%'});
    background: rgba(22, 27, 34, 0.98);
    border: ${pinned ? 2 : 1}px solid ${pinned ? '#22c55e' : (isSingle ? config.colors.nodeBorder : '#6366f1')};
    border-radius: 8px;
    padding: ${topPadding}px 16px 12px 16px;
    color: #e6edf3;
    font-family: Inter, sans-serif;
    font-size: 13px;
    z-index: 99999;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    max-width: 400px;
    max-height: 50vh;
    overflow-y: auto;
    pointer-events: ${pinned ? 'auto' : 'none'};
  `;

  let content = '';

  // Pinned indicator and close button - use relative wrapper to prevent clipping
  if (pinned) {
    content += `
      <div style="position: relative; margin-bottom: 8px; height: 24px;">
        <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%);
                    background: #22c55e; color: #fff; padding: 2px 8px; border-radius: 9999px; font-size: 11px; white-space: nowrap;">
          📌 Pinned
        </div>
        <button onclick="this.closest('.orbital-dom-tooltip').remove(); window._pinnedTooltip = null;" 
                style="position: absolute; top: 0; right: 0; width: 20px; height: 20px;
                       background: #ef4444; border: none; border-radius: 50%; color: #fff;
                       cursor: pointer; font-size: 12px; line-height: 18px;">×</button>
      </div>
    `;
  }

  // Header for multi-event bundles
  if (!isSingle) {
    content += `
      <div style="font-weight: 700; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #4f46e5; color: #a5b4fc;">
        ${bundle.from} → ${bundle.to}
        <span style="background: #4f46e5; color: #fff; padding: 2px 8px; border-radius: 9999px; font-size: 11px; margin-left: 8px;">
          ${bundle.labels.length} events
        </span>
      </div>
    `;
  }

  // Scrollable content area for events
  const maxContentHeight = pinned ? 'calc(100vh - 120px)' : '300px';
  content += `<div style="display: flex; flex-direction: column; gap: 8px; max-height: ${maxContentHeight}; overflow-y: auto; overflow-x: hidden;">`;
  bundle.labels.forEach((label, idx) => {
    content += `
      <div style="${!isSingle && idx > 0 ? 'padding-top: 8px; border-top: 1px solid #30363d;' : ''} max-width: 100%; overflow: hidden;">
        <div style="font-weight: 600; color: ${config.colors.arrowText}; font-family: JetBrains Mono, monospace; word-break: break-word; overflow-wrap: break-word; white-space: normal; max-width: 100%;">
          ${!isSingle ? '<span style="color: #6b7280;">• </span>' : ''}${label.event}
        </div>
        ${label.guardText ? `
          <div style="margin-left: 12px; font-size: 12px; color: ${config.colors.guardText}; word-break: break-word; overflow-wrap: break-word; white-space: pre-wrap; max-width: 100%;">
            <span style="font-weight: 600;">if:</span> ${label.guardText}
          </div>
        ` : ''}
        ${label.effectTexts.length > 0 ? label.effectTexts.map((e, i) => `
          <div style="margin-left: 12px; font-size: 12px; color: ${config.colors.effectText}; word-break: break-word; overflow-wrap: break-word; white-space: pre-wrap; max-width: 100%;">
            <span style="font-weight: 600;">${i === 0 ? '→' : ' '}</span> ${e}
          </div>
        `).join('') : ''}
      </div>
    `;
  });
  content += '</div>';

  tooltip.innerHTML = content;
  document.body.appendChild(tooltip);

  // After render, STRICTLY clamp tooltip to CONTAINER bounds (not window)
  const rect = tooltip.getBoundingClientRect();
  const margin = 16;

  // Use container bounds for clamping, not window
  const containerLeft = containerRect.left;
  const containerTop = containerRect.top;
  const containerRight = containerRect.right;
  const containerBottom = containerRect.bottom;

  // Calculate initial position (centered horizontally, above or below anchor)
  let finalLeft = screenX - window.scrollX - rect.width / 2;
  let finalTop = showBelow
    ? screenY - window.scrollY + 30
    : screenY - window.scrollY - 10 - rect.height;

  // STRICT horizontal clamping to container bounds
  finalLeft = Math.max(containerLeft + margin, Math.min(finalLeft, containerRight - rect.width - margin));

  // STRICT vertical clamping to container bounds
  finalTop = Math.max(containerTop + margin, finalTop);

  // Calculate max available height within container
  const maxAvailableHeight = containerBottom - finalTop - margin;

  // If tooltip is taller than available space, constrain height and enable scroll
  if (rect.height > maxAvailableHeight && maxAvailableHeight > 100) {
    tooltip.style.maxHeight = `${maxAvailableHeight}px`;
  }

  // Final safety: if finalTop + final height would still exceed container bottom, clamp it
  const finalHeight = Math.min(rect.height, maxAvailableHeight > 100 ? maxAvailableHeight : rect.height);
  if (finalTop + finalHeight > containerBottom - margin) {
    finalTop = Math.max(containerTop + margin, containerBottom - finalHeight - margin);
  }

  // Apply final position without transform
  tooltip.style.left = `${finalLeft}px`;
  tooltip.style.top = `${finalTop}px`;
  tooltip.style.transform = 'none';

  if (pinned) {
    pinnedTooltip = { element: tooltip, bundleId: bundle.id };
  }
}

function hideBundleTooltip(): void {
  const existing = document.querySelector('.orbital-dom-tooltip:not([data-pinned])');
  if (existing && !pinnedTooltip) existing.remove();
}

function createEntityBox(entity: { name: string; fields: string[]; x: number; y: number; width: number; height: number }): HTMLElement {
  const box = document.createElement('div');
  box.style.cssText = `
    position: absolute;
    left: ${entity.x}px;
    top: ${entity.y}px;
    width: ${entity.width}px;
    height: ${entity.height}px;
    background: #1a1f2e;
    border: 2px solid #4a9eff;
    border-radius: 8px;
    padding: 12px;
    z-index: 5;
  `;
  box.innerHTML = `
    <div style="text-align: center; font-weight: 600; color: #4a9eff; font-size: 14px; margin-bottom: 8px;">
      📦 ${entity.name}
    </div>
    ${entity.fields.map(f => `<div style="font-size: 12px; color: #8b949e; font-family: JetBrains Mono, monospace;">• ${f}</div>`).join('')}
  `;
  return box;
}

function createOutputsBox(outputs: { outputs: string[]; x: number; y: number; width: number; height: number }): HTMLElement {
  const box = document.createElement('div');
  box.style.cssText = `
    position: absolute;
    left: ${outputs.x}px;
    top: ${outputs.y}px;
    width: ${outputs.width}px;
    height: ${outputs.height}px;
    background: #1a1f2e;
    border: 2px solid #ffb86c;
    border-radius: 8px;
    padding: 12px;
    z-index: 5;
  `;
  box.innerHTML = `
    <div style="text-align: center; font-weight: 600; color: #ffb86c; font-size: 13px; margin-bottom: 8px;">
      📤 External Effects
    </div>
    ${outputs.outputs.map(o => `<div style="font-size: 12px; color: #e6edf3; font-family: Inter, sans-serif; margin-bottom: 2px;">• ${o}</div>`).join('')}
  `;
  return box;
}

function createLegend(config: VisualizerConfig, height: number): HTMLElement {
  const legend = document.createElement('div');
  legend.style.cssText = `
    position: absolute;
    left: 20px;
    top: ${height - 25}px;
    display: flex;
    gap: 16px;
    z-index: 15;
  `;
  const items = [
    { label: 'Initial', color: config.colors.initialNode },
    { label: 'Final', color: config.colors.finalNode },
    { label: 'State', color: config.colors.nodeBorder },
    { label: 'Multi-event', color: '#6366f1', isFilled: true },
  ];
  items.forEach(item => {
    const el = document.createElement('div');
    el.style.cssText = 'display: flex; align-items: center; gap: 6px;';
    el.innerHTML = `
      <div style="width: 12px; height: 12px; border-radius: 50%;
                  ${item.isFilled ? `background: ${item.color};` : `background: ${config.colors.node}; border: 2px solid ${item.color};`}"></div>
      <span style="font-size: 12px; color: ${config.colors.arrowText};">${item.label}</span>
    `;
    legend.appendChild(el);
  });
  return legend;
}

function addDomStyles(): void {
  if (document.getElementById('orbital-dom-styles')) return;
  const style = document.createElement('style');
  style.id = 'orbital-dom-styles';
  style.textContent = `
    .orbital-dom-tooltip { animation: tooltip-fade-in 0.2s ease; }
    @keyframes tooltip-fade-in {
      from { opacity: 0; transform: translate(-50%, -100%) translateY(10px); }
      to { opacity: 1; transform: translate(-50%, -100%); }
    }
  `;
  document.head.appendChild(style);
}

// Close pinned tooltip on outside click
if (typeof document !== 'undefined') {
  document.addEventListener('click', () => {
    if (pinnedTooltip) {
      pinnedTooltip.element.remove();
      pinnedTooltip = null;
    }
  });
}

// =============================================================================
// Export to global scope
// =============================================================================

const OrbitalVisualizer = {
  render,
  renderDom,
  init,
  renderToSvg: renderStateMachineToSvg,
  extractStateMachine,
  getEffectSummary,
  extractOutputsFromTransitions,
  formatSExprHumanReadable,
  CONFIG: DEFAULT_CONFIG,
};

// Attach to window
declare global {
  interface Window {
    OrbitalVisualizer: typeof OrbitalVisualizer;
    _pinnedTooltip: typeof pinnedTooltip;
  }
}

if (typeof window !== 'undefined') {
  window.OrbitalVisualizer = OrbitalVisualizer;
  window._pinnedTooltip = pinnedTooltip;

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

export { OrbitalVisualizer };

