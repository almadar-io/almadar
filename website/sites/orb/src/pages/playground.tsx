import React, { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import { Search } from "lucide-react";
import { translate } from "@docusaurus/Translate";
import { BEHAVIOR_CATALOG } from "../data/behavior-catalog";
import { MODULE_CATALOG } from "../data/module-catalog";
import styles from "./playground.module.css";

// ─── Runtime loader (shared) ──────────────────────────────────────────────────

// Slot system architecture (confirmed from dist source):
//
// SlotsStateContext  (from SlotsProvider / @almadar/ui/runtime)
//   - Written by: useTraitStateMachine via slotsActions.setSlotPatterns()
//   - Shape: Record<slot, { patterns: SlotPatternEntry[], source? }>
//   - SlotPatternEntry.pattern is a PatternConfig OBJECT: { type, ...props }
//   - Read by: useSlots() from @almadar/ui/runtime
//
// UISlotContext  (from UISlotProvider / @almadar/ui/context)
//   - Written by: useUISlots().render({ target, pattern: string, props })
//   - Shape: Record<slot, SlotContent>  where SlotContent.pattern is a STRING
//   - Read by: UISlotComponent (used inside UISlotRenderer) via useUISlots()
//   - UISlotRenderer REQUIRES UISlotProvider — it calls useUISlots() directly
//
// SlotBridge: manually bridges the two.
//   Reads SlotsStateContext via useSlots(), writes to UISlotContext via useUISlots().render().
//   PatternConfig { type, ...props } → render({ pattern: type, props: { ...rest } })
//   Children normalization: PatternConfig children are flat { type, ...props } but
//   renderPatternChildren() in SlotContentRenderer expects { type, props: {...} }.
//   So children must be recursively normalized before passing to render().

interface SlotPatternEntry { pattern: Record<string, unknown>; props: Record<string, unknown> }
interface SlotState { patterns: SlotPatternEntry[]; source?: { trait?: string } }

interface RuntimeComponents {
  OrbitalProvider: React.ComponentType<{ children: ReactNode; initialData?: Record<string, unknown[]>; skipTheme?: boolean; verification?: boolean }>;
  UISlotProvider: React.ComponentType<{ children: ReactNode }>;
  SlotsProvider: React.ComponentType<{ children: ReactNode }>;
  EntitySchemaProvider: React.ComponentType<{ entities: unknown[]; children: ReactNode }>;
  UISlotRenderer: React.ComponentType<{ includeHud?: boolean; includeFloating?: boolean }>;
  useResolvedSchema: (schema: unknown) => { page: unknown; traits: unknown[]; allEntities: Map<string, unknown> };
  useTraitStateMachine: (traits: unknown[], actions: unknown, opts?: unknown) => { sendEvent: (event: string, payload?: Record<string, unknown>) => void };
  useSlotsActions: () => unknown;
  useSlots: () => Record<string, SlotState>;
  useUISlots: () => { render: (cfg: { target: string; pattern: string; props?: Record<string, unknown>; sourceTrait?: string }) => void; clear: (slot: string) => void };
}

let runtimeCache: RuntimeComponents | null = null;

async function loadRuntime(): Promise<RuntimeComponents> {
  if (runtimeCache) return runtimeCache;
  const [providers, context, runtime, components] = await Promise.all([
    import("@almadar/ui/providers"),
    import("@almadar/ui/context"),
    import("@almadar/ui/runtime"),
    import("@almadar/ui/components"),
  ]);
  runtimeCache = {
    OrbitalProvider: providers.OrbitalProvider,
    UISlotProvider: context.UISlotProvider,
    SlotsProvider: runtime.SlotsProvider,
    EntitySchemaProvider: runtime.EntitySchemaProvider,
    UISlotRenderer: components.UISlotRenderer,
    useResolvedSchema: runtime.useResolvedSchema,
    useTraitStateMachine: runtime.useTraitStateMachine,
    useSlotsActions: runtime.useSlotsActions,
    useSlots: runtime.useSlots,
    useUISlots: context.useUISlots,
  };
  return runtimeCache;
}

// ─── Orbital Runtime Preview (shared) ─────────────────────────────────────────

// Normalize a PatternConfig child from flat { type, ...props } to { type, props: {...} }
// because renderPatternChildren() inside SlotContentRenderer expects the latter format.
function normalizeChild(child: Record<string, unknown>): Record<string, unknown> {
  const { type, children, ...rest } = child;
  const normalizedChildren = Array.isArray(children)
    ? children.map((c) => normalizeChild(c as Record<string, unknown>))
    : children;
  return {
    type,
    props: { ...rest, ...(normalizedChildren !== undefined ? { children: normalizedChildren } : {}) },
  };
}

// Bridges SlotsStateContext → UISlotContext.
// useTraitStateMachine writes PatternConfig objects to SlotsStateContext.
// UISlotComponent (inside UISlotRenderer) reads SlotContent from UISlotContext.
// This component syncs between them after each slot state change.
function SlotBridge({ rt }: { rt: RuntimeComponents }) {
  const slots = rt.useSlots();
  const { render, clear } = rt.useUISlots();

  useEffect(() => {
    for (const [slotName, slotState] of Object.entries(slots)) {
      if (slotState.patterns.length === 0) {
        clear(slotName);
        continue;
      }
      // Use the last pattern (most recently set wins)
      const entry = slotState.patterns[slotState.patterns.length - 1];
      const { type: patternType, children, ...inlineProps } = entry.pattern;
      // Normalize children from flat PatternConfig to { type, props } format
      const normalizedChildren = Array.isArray(children)
        ? children.map((c) => normalizeChild(c as Record<string, unknown>))
        : children;
      render({
        target: slotName,
        pattern: patternType as string,
        props: {
          ...inlineProps,
          ...entry.props,
          ...(normalizedChildren !== undefined ? { children: normalizedChildren } : {}),
        },
        sourceTrait: slotState.source?.trait,
      });
    }
  }, [slots]);

  return null;
}

// Fires INIT event after mount so render-ui effects on the INIT transition execute.
// Must be inside SlotsProvider + EntitySchemaProvider.
function TraitInitializer({ rt, traits }: { rt: RuntimeComponents; traits: unknown[] }) {
  const slotsActions = rt.useSlotsActions();
  const { sendEvent } = rt.useTraitStateMachine(traits, slotsActions, {});

  useEffect(() => {
    const t = setTimeout(() => sendEvent("INIT"), 50);
    return () => clearTimeout(t);
  }, [traits]);

  return null;
}

function SchemaRunner({ rt, schema, mockData }: { rt: RuntimeComponents; schema: unknown; mockData: Record<string, unknown[]> }) {
  const { traits, allEntities } = rt.useResolvedSchema(schema);
  return (
    <rt.SlotsProvider>
      <rt.EntitySchemaProvider entities={Array.from(allEntities.values())}>
        <TraitInitializer rt={rt} traits={traits} />
        <SlotBridge rt={rt} />
        <div className={styles.runtimePreview}>
          <rt.UISlotRenderer includeHud includeFloating />
        </div>
      </rt.EntitySchemaProvider>
    </rt.SlotsProvider>
  );
}

function OrbitalPreview({ schema, mockData }: { schema: unknown; mockData: Record<string, unknown[]> }) {
  const [rt, setRt] = useState<RuntimeComponents | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRuntime().then(setRt).catch((e) => setError(String(e)));
  }, []);

  if (error) return <div className={styles.previewError}><pre>{error}</pre></div>;
  if (!rt) return <div className={styles.previewLoading}>Loading runtime…</div>;

  return (
    <rt.OrbitalProvider initialData={mockData} skipTheme verification>
      <rt.UISlotProvider>
        <SchemaRunner rt={rt} schema={schema} mockData={mockData} />
      </rt.UISlotProvider>
    </rt.OrbitalProvider>
  );
}

// ─── Shared: Picker sidebar ───────────────────────────────────────────────────

function Picker<T extends { name: string; description: string }>({
  items,
  selected,
  onSelect,
  getCategory,
}: {
  items: T[];
  selected: string;
  onSelect: (name: string) => void;
  getCategory: (name: string) => string;
}) {
  const [query, setQuery] = useState("");

  const filtered = items.filter(
    (b) =>
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.description.toLowerCase().includes(query.toLowerCase())
  );

  const byCategory: Record<string, T[]> = {};
  for (const b of filtered) {
    const cat = getCategory(b.name);
    (byCategory[cat] ||= []).push(b);
  }
  const sortedCategories = Object.keys(byCategory).sort();

  return (
    <div className={styles.picker}>
      <div className={styles.pickerSearch}>
        <Search size={14} className={styles.pickerSearchIcon} />
        <input
          className={styles.pickerSearchInput}
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className={styles.pickerList}>
        {sortedCategories.map((cat) => (
          <div key={cat} className={styles.pickerGroup}>
            <div className={styles.pickerGroupLabel}>{cat}</div>
            {byCategory[cat].map((b) => (
              <button
                key={b.name}
                className={`${styles.pickerItem} ${b.name === selected ? styles.pickerItemActive : ""}`}
                onClick={() => onSelect(b.name)}
                title={b.description}
              >
                <span className={styles.pickerItemName}>{b.name.replace(/^std-/, "")}</span>
                {b.description && <span className={styles.pickerItemDesc}>{b.description}</span>}
              </button>
            ))}
          </div>
        ))}
        {filtered.length === 0 && <div className={styles.pickerEmpty}>No matches for "{query}"</div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 1: BEHAVIORS
// ═══════════════════════════════════════════════════════════════════════════════

const BEHAVIOR_LIST = Object.values(BEHAVIOR_CATALOG).map((b) => {
  const s = b as Record<string, unknown>;
  return { name: s.name as string, description: (s.description as string) || "" };
});

const BEHAVIOR_CATEGORY_RULES: [RegExp, string][] = [
  [/game|combat|collision|crafting|dialogue|enemy|platformer|rpg|strategy|puzzle/, "Game"],
  [/cart|checkout|catalog|booking|payment|invoice|subscription/, "Commerce"],
  [/calendar|availability|scheduler/, "Scheduling"],
  [/task|approval|confirmation|pipeline|kanban/, "Workflow"],
  [/feed|article|content|bookmark|annotation|media|curriculum/, "Content"],
  [/chart|dashboard/, "Dashboard"],
  [/filter|drawer|alert|fetch|async|notification/, "UI"],
  [/device|iot|circuit|cache/, "Infrastructure"],
  [/social/, "Social"],
  [/health|patient/, "Healthcare"],
  [/finance|bank|budget|loan/, "Finance"],
  [/geo|map|location/, "Geospatial"],
  [/sim|agent|physics|neural/, "Simulation"],
];

function getBehaviorCategory(name: string): string {
  const key = name.replace(/^std-/, "");
  for (const [pattern, cat] of BEHAVIOR_CATEGORY_RULES) {
    if (pattern.test(key)) return cat;
  }
  return "General";
}

function buildMockData(schema: Record<string, unknown>): Record<string, unknown[]> {
  const orbital = (schema.orbitals as Record<string, unknown>[])?.[0];
  const entity = orbital?.entity as Record<string, unknown> | undefined;
  if (!entity) return {};
  const fields = (entity.fields as Record<string, unknown>[]) ?? [];
  const item: Record<string, unknown> = { id: "1" };
  for (const f of fields) {
    const fname = f.name as string;
    if (fname === "id") continue;
    const ftype = f.type as string;
    if (ftype === "string") item[fname] = `Sample ${fname}`;
    else if (ftype === "number") item[fname] = 42;
    else if (ftype === "boolean") item[fname] = true;
    else item[fname] = (f.default ?? null);
  }
  const entityName = entity.name as string;
  return { [entityName]: [item, { ...item, id: "2" }] };
}

/**
 * When mock data exists for a trait's linked entity, adjust the schema so
 * the state machine starts in a data-displaying state instead of the empty state.
 *
 * Many behaviors define two INIT handlers: one from the "empty" state (shows
 * placeholder UI) and one from a data state like "hasItems" (shows entity list).
 * The playground generates mock data, so we want to start in the data state.
 *
 * Logic: for each trait whose linkedEntity has mock data, find a non-initial
 * state that also handles INIT. If found, make it the initial state.
 */
function adjustSchemaForMockData(
  schema: Record<string, unknown>,
  mockData: Record<string, unknown[]>,
): Record<string, unknown> {
  const orbitals = schema.orbitals as Record<string, unknown>[] | undefined;
  if (!orbitals?.length) return schema;

  let changed = false;
  const updatedOrbitals = orbitals.map((orbital) => {
    const traits = (orbital.traits as Record<string, unknown>[]) ?? [];
    const updatedTraits = traits.map((trait) => {
      const sm = trait.stateMachine as Record<string, unknown> | undefined;
      if (!sm) return trait;

      const linkedEntity = trait.linkedEntity as string | undefined;
      if (!linkedEntity || !mockData[linkedEntity]?.length) return trait;

      const states = (sm.states as Record<string, unknown>[]) ?? [];
      const transitions = (sm.transitions as Record<string, unknown>[]) ?? [];

      // Find current initial state
      const initialStateName =
        (states.find((s) => s.isInitial)?.name as string) ??
        (states[0]?.name as string);
      if (!initialStateName) return trait;

      // Find a non-initial state that also handles INIT
      const dataState = states.find((s) => {
        const name = s.name as string;
        if (name === initialStateName) return false;
        return transitions.some(
          (t) =>
            t.event === "INIT" &&
            (t.from === name ||
              (Array.isArray(t.from) && (t.from as string[]).includes(name))),
        );
      });

      if (!dataState) return trait;

      changed = true;
      const dataStateName = dataState.name as string;
      const updatedStates = states.map((s) => {
        if ((s.name as string) === initialStateName)
          return { ...s, isInitial: false };
        if ((s.name as string) === dataStateName)
          return { ...s, isInitial: true };
        return s;
      });

      return { ...trait, stateMachine: { ...sm, states: updatedStates } };
    });

    return updatedTraits !== traits
      ? { ...orbital, traits: updatedTraits }
      : orbital;
  });

  return changed ? { ...schema, orbitals: updatedOrbitals } : schema;
}

function BehaviorStateMachineInfo({ schema }: { schema: Record<string, unknown> }) {
  const orbital = (schema.orbitals as Record<string, unknown>[])?.[0];
  const traits = (orbital?.traits as Record<string, unknown>[]) ?? [];
  const states: string[] = [];
  const events: string[] = [];
  for (const trait of traits) {
    const sm = trait.stateMachine as Record<string, unknown> | undefined;
    for (const s of (sm?.states as Record<string, unknown>[]) ?? []) states.push(s.name as string);
    for (const t of (sm?.transitions as Record<string, unknown>[]) ?? []) {
      const ev = t.event as string;
      if (ev && !events.includes(ev)) events.push(ev);
    }
  }
  return (
    <div className={styles.smInfo}>
      <div className={styles.smSection}>
        <span className={styles.smLabel}>States</span>
        <div className={styles.smTags}>{states.map((s) => <span key={s} className={styles.smTag}>{s}</span>)}</div>
      </div>
      <div className={styles.smSection}>
        <span className={styles.smLabel}>Events</span>
        <div className={styles.smTags}>{events.map((e) => <span key={e} className={`${styles.smTag} ${styles.smTagEvent}`}>{e}</span>)}</div>
      </div>
    </div>
  );
}

function BehaviorsTab({ initialSelected }: { initialSelected?: string | null }) {
  const [selected, setSelected] = useState(
    initialSelected && BEHAVIOR_CATALOG[initialSelected] ? initialSelected : "std-cart"
  );
  const [previewKey, setPreviewKey] = useState(0);

  const schema = BEHAVIOR_CATALOG[selected] as Record<string, unknown> | undefined ?? null;
  const mockData = schema ? buildMockData(schema) : {};
  const adjustedSchema = schema ? adjustSchemaForMockData(schema, mockData) : null;

  const handleSelect = useCallback((name: string) => {
    setSelected(name);
    setPreviewKey((k) => k + 1);
  }, []);

  return (
    <div className={styles.liveLayout}>
      <Picker items={BEHAVIOR_LIST} selected={selected} onSelect={handleSelect} getCategory={getBehaviorCategory} />
      <div className={styles.liveRight}>
        <div className={styles.liveHeader}>
          <div className={styles.liveBehaviorName}>{selected}</div>
          {schema && <div className={styles.liveBehaviorDesc}>{(schema.description as string) || ""}</div>}
        </div>
        {schema && <BehaviorStateMachineInfo schema={schema} />}
        <div className={styles.livePreviewBox}>
          {adjustedSchema
            ? <OrbitalPreview key={previewKey} schema={adjustedSchema} mockData={mockData} />
            : <div className={styles.previewEmpty}>Select a behavior</div>
          }
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 2: MODULES
// ═══════════════════════════════════════════════════════════════════════════════

const MODULE_GROUP: Record<string, string> = {
  math: "Core", str: "Core", array: "Core", object: "Core",
  format: "Core", time: "Core", validate: "Core",
  async: "Async",
  prob: "ML", nn: "ML", tensor: "ML", train: "ML",
};

const MODULE_LIST = Object.keys(MODULE_CATALOG).map((m) => ({
  name: m,
  description: `${Object.keys(MODULE_CATALOG[m]).length} operators`,
}));

function getModuleCategory(name: string): string {
  return MODULE_GROUP[name] ?? "Other";
}

/** Parse the example comment to extract expression and expected value */
function parseExample(example: string): { expr: string; expected: string } {
  // Try "// =>" first (preserves expected value)
  const arrowIdx = example.indexOf("// =>");
  if (arrowIdx > 0) {
    return {
      expr: example.substring(0, arrowIdx).trim(),
      expected: example.substring(arrowIdx + 5).trim(),
    };
  }
  // Fallback: strip any trailing // comment
  const commentIdx = example.lastIndexOf(" //");
  if (commentIdx > 0) {
    return { expr: example.substring(0, commentIdx).trim(), expected: "" };
  }
  return { expr: example.trim(), expected: "" };
}


function ModuleOperatorPanel({ moduleName, opName, op }: {
  moduleName: string;
  opName: string;
  op: { description: string; example: string; returnType: string };
}) {
  const { expr: defaultExpr } = parseExample(op.example);
  const [expr, setExpr] = useState(defaultExpr || `["${opName}"]`);
  const [result, setResult] = useState<{ text: string; isError: boolean } | null>(null);

  const run = useCallback(async () => {
    try {
      const parsed = JSON.parse(expr.trim());
      const { SExpressionEvaluator, createMinimalContext } = await import("@almadar/evaluator");
      const evaluator = new SExpressionEvaluator();
      const ctx = createMinimalContext({}, {}, "initial");
      const value = evaluator.evaluate(parsed, ctx);
      const formatted = value === null ? "null"
        : value === undefined ? "undefined"
        : typeof value === "object" ? JSON.stringify(value, null, 2)
        : String(value);
      setResult({ text: formatted, isError: false });
    } catch (e) {
      setResult({ text: (e as Error).message, isError: true });
    }
  }, [expr, opName]);

  // Run on first load with the default example
  useEffect(() => {
    if (defaultExpr) run();
  }, [opName]);

  return (
    <div className={styles.opPanel}>
      <div className={styles.opHeader}>
        <code className={styles.opName}>{opName}</code>
        <span className={styles.opReturn}>→ {op.returnType}</span>
      </div>
      <p className={styles.opDesc}>{op.description}</p>

      <div className={styles.opExprRow}>
        <textarea
          className={styles.opExprInput}
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          rows={2}
          spellCheck={false}
          onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(); } }}
        />
        <button className={styles.opRunBtn} onClick={run}>Run</button>
      </div>

      <div className={styles.opPreviewBox}>
        {result
          ? <pre className={result.isError ? styles.opResultError : styles.opResultSuccess}>{result.text}</pre>
          : <div className={styles.previewLoading}>Press Run to execute</div>
        }
      </div>
    </div>
  );
}

function ModuleDetail({ moduleName }: { moduleName: string }) {
  const ops = MODULE_CATALOG[moduleName] ?? {};
  const opNames = Object.keys(ops);
  const [selectedOp, setSelectedOp] = useState(opNames[0] ?? "");

  // Reset selection when module changes
  useEffect(() => {
    setSelectedOp(Object.keys(MODULE_CATALOG[moduleName] ?? {})[0] ?? "");
  }, [moduleName]);

  return (
    <div className={styles.moduleDetail}>
      {/* Op list */}
      <div className={styles.opList}>
        <div className={styles.opListLabel}>{moduleName} operators</div>
        {opNames.map((op) => (
          <button
            key={op}
            className={`${styles.opListItem} ${op === selectedOp ? styles.opListItemActive : ""}`}
            onClick={() => setSelectedOp(op)}
          >
            <code>{op}</code>
            <span className={styles.opListDesc}>{ops[op].description}</span>
          </button>
        ))}
      </div>

      {/* Op detail + live execution */}
      <div className={styles.opDetailPane}>
        {selectedOp && ops[selectedOp]
          ? <ModuleOperatorPanel key={selectedOp} moduleName={moduleName} opName={selectedOp} op={ops[selectedOp]} />
          : <div className={styles.previewEmpty}>Select an operator</div>
        }
      </div>
    </div>
  );
}

function ModulesTab({ initialSelected }: { initialSelected?: string | null }) {
  const [selected, setSelected] = useState(
    initialSelected && MODULE_CATALOG[initialSelected] ? initialSelected : "math"
  );

  return (
    <div className={styles.liveLayout}>
      <Picker items={MODULE_LIST} selected={selected} onSelect={setSelected} getCategory={getModuleCategory} />
      <div className={styles.liveRight}>
        <div className={styles.liveHeader}>
          <div className={styles.liveBehaviorName}>{selected}</div>
          <div className={styles.liveBehaviorDesc}>{Object.keys(MODULE_CATALOG[selected] ?? {}).length} operators — executed live via the Orbital evaluator</div>
        </div>
        <ModuleDetail moduleName={selected} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════

type PlaygroundTab = "behaviors" | "modules";

/** Read ?tab= and ?selected= from the URL so tests can deep-link */
function useUrlParams(): { tab: PlaygroundTab; selected: string | null } {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const rawTab = params?.get("tab");
  const tab: PlaygroundTab = rawTab === "modules" ? "modules" : "behaviors";
  return { tab, selected: params?.get("selected") ?? null };
}

export default function Playground(): ReactNode {
  const urlParams = useUrlParams();
  const [activeTab, setActiveTab] = useState<PlaygroundTab>(urlParams.tab);

  return (
    <Layout
      title={translate({ id: "playground.meta.title", message: "Playground — Almadar" })}
      description={translate({
        id: "playground.meta.description",
        message: "Live preview of Almadar standard behaviors and modules.",
      })}
    >
      <div className={styles.pageHeader}>
        <div className="container">
          <Heading as="h1" className={styles.pageTitle}>Playground</Heading>
          <p className={styles.pageSubtitle}>
            Explore standard behaviors and modules — rendered live by the Orbital runtime.
          </p>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "behaviors" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("behaviors")}
            >
              Behaviors
            </button>
            <button
              className={`${styles.tab} ${activeTab === "modules" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("modules")}
            >
              Modules
            </button>
          </div>
        </div>
      </div>

      <main className={styles.playgroundMain}>
        <BrowserOnly fallback={<div className={styles.loadingFallback}>Loading…</div>}>
          {() => activeTab === "behaviors"
            ? <BehaviorsTab initialSelected={urlParams.tab === "behaviors" ? urlParams.selected : null} />
            : <ModulesTab initialSelected={urlParams.tab === "modules" ? urlParams.selected : null} />
          }
        </BrowserOnly>
      </main>
    </Layout>
  );
}
