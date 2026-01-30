/**
 * InspectionProcessTemplate
 *
 * Comprehensive template representing the entire inspection process.
 * Implements all 5 phases from the inspection-system requirements:
 *
 * 1. Introduction Phase: Case Info → Company Data → Participants → Field Selection
 * 2. Content Phase: Rule Checking with ad-hoc actions (add participant, collect document, pause, SOS)
 * 3. Preparation Phase: Findings → Decisions
 * 4. Record Phase: Document Generation → Merchant Review → Objections
 * 5. Closing Phase: End Time → Signatures → Complete
 *
 * This template composes all inspection-system atoms, molecules, and organisms
 * to represent the full application workflow.
 */

import React, { useState } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { useEventBus } from "../../../hooks/useEventBus";

// Atoms
import { PhaseIndicator, InspectionPhase } from "../atoms/PhaseIndicator";
import { LawReferenceBadge } from "../atoms/LawReferenceBadge";

// Molecules
import { ProgressHeader, ProgressStep } from "../molecules/ProgressHeader";
import { ComplianceSummary, ComplianceStats } from "../molecules/ComplianceSummary";
import { RuleCheckItem, RuleCheckItemProps } from "../molecules/RuleCheckItem";
import { EntitySearch, SearchResult } from "../molecules/EntitySearch";
import { ParticipantList, Participant } from "../molecules/ParticipantList";
import { CardSelector, CardSelectorOption } from "../molecules/CardSelector";
import { ConditionalField } from "../molecules/ConditionalField";
import { RepeatableFormSection } from "../molecules/RepeatableFormSection";
import { PhotoAttachment, Photo } from "../molecules/PhotoAttachment";
import { ObjectionRecorder } from "../molecules/ObjectionRecorder";
import { DocumentPreview } from "../molecules/DocumentPreview";
import { InspectionTimeline, TimelineItem } from "../molecules/InspectionTimeline";

// Organisms
import { FloatingActionMenu, QuickAction } from "../organisms/FloatingActionMenu";
import { SignatureCapture } from "../organisms/SignatureCapture";

import {
  ArrowLeft,
  ArrowRight,
  Save,
  CheckCircle,
  Building2,
  Users,
  ClipboardCheck,
  FileText,
  PenTool,
  AlertTriangle,
  FileCheck,
  Scale,
  Clock,
  Briefcase,
  Search,
  Plus,
} from "lucide-react";

// =============================================================================
// Types
// =============================================================================

export type ProcessPhase =
  | "introduction"
  | "content"
  | "preparation"
  | "record"
  | "closing";

export type IntroductionStep =
  | "case-info"
  | "company-data"
  | "participants"
  | "field-selection";

export type ContentStep = "rule-checking";

export type PreparationStep = "findings" | "decisions";

export type RecordStep = "document-generation" | "merchant-review" | "objections";

export type ClosingStep = "end-time" | "signatures" | "complete";

export type ProcessStep =
  | IntroductionStep
  | ContentStep
  | PreparationStep
  | RecordStep
  | ClosingStep;

export interface Inspector {
  id: string;
  name: string;
  surname: string;
  department: string;
  badgeNumber: string;
}

export interface Company {
  id: string;
  name: string;
  legalName: string;
  registrationNumber: string;
  taxNumber: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
}

export interface AccompanyingPerson {
  id: string;
  name: string;
  organization: string;
  role: string;
}

export interface InspectionField {
  id: string;
  name: string;
  description: string;
  ruleCount: number;
}

export interface InspectionRule {
  id: string;
  ruleText: string;
  lawReference: {
    gazetteNumber: string;
    article: string;
  };
  severity: "critical" | "major" | "minor";
  canBeSkipped: boolean;
}

export interface RuleCheck {
  ruleId: string;
  answer: "compliant" | "non-compliant" | "not-applicable" | null;
  notes?: string;
  photos: Photo[];
}

export interface Finding {
  id: string;
  description: string;
  severity: "critical" | "major" | "minor" | "observation";
  relatedRuleIds: string[];
  recommendation: string;
}

export interface Decision {
  id: string;
  orderText: string;
  deadline: string;
  relatedFindingIds: string[];
  status: "pending" | "acknowledged" | "completed";
}

export interface Objection {
  id: string;
  sectionRef: string;
  objectionText: string;
  response?: string;
  status: "pending" | "resolved";
}

export interface InspectionData {
  id: string;
  caseNumber: string;
  inspector?: Inspector;
  company?: Company;
  participants: Participant[];
  accompanyingPersons: AccompanyingPerson[];
  selectedField?: InspectionField;
  rules: InspectionRule[];
  ruleChecks: Record<string, RuleCheck>;
  findings: Finding[];
  decisions: Decision[];
  objections: Objection[];
  collectedDocuments: Array<{ id: string; name: string; type: string; fileUrl: string }>;
  startDateTime?: string;
  endDateTime?: string;
  inspectorSignature?: string;
  merchantSignature?: string;
  currentPhase: ProcessPhase;
  currentStep: ProcessStep;
  timeline: TimelineItem[];
}

export interface InspectionProcessTemplateProps {
  /** Full inspection data */
  data: InspectionData;
  /** Available inspectors for selection */
  availableInspectors?: Inspector[];
  /** Available inspection fields */
  availableFields?: InspectionField[];
  /** Company search results */
  companySearchResults?: SearchResult[];
  /** Is searching for company */
  isSearchingCompany?: boolean;
  /** Additional class names */
  className?: string;
  /** Phase change handler */
  onPhaseChange?: (phase: ProcessPhase) => void;
  /** Step change handler */
  onStepChange?: (step: ProcessStep) => void;
  /** Data update handler */
  onDataUpdate?: (data: Partial<InspectionData>) => void;
  /** Company search handler */
  onCompanySearch?: (query: string) => void;
  /** Save draft handler */
  onSaveDraft?: () => void;
  /** Complete handler */
  onComplete?: () => void;
}

// =============================================================================
// Phase Configuration
// =============================================================================

interface PhaseConfig {
  id: ProcessPhase;
  label: string;
  icon: typeof Building2;
  steps: Array<{
    id: ProcessStep;
    label: string;
    documentSection?: string;
  }>;
}

const phases: PhaseConfig[] = [
  {
    id: "introduction",
    label: "Introduction",
    icon: Briefcase,
    steps: [
      { id: "case-info", label: "Case Info", documentSection: "1. SPLOŠNI PODATKI" },
      { id: "company-data", label: "Company Data", documentSection: "2. PODATKI O ZAVEZANCU" },
      { id: "participants", label: "Participants", documentSection: "3. PRISOTNE OSEBE" },
      { id: "field-selection", label: "Field Selection", documentSection: "4. PREDMET PREGLEDA" },
    ],
  },
  {
    id: "content",
    label: "Inspection",
    icon: ClipboardCheck,
    steps: [
      { id: "rule-checking", label: "Rule Checking", documentSection: "5. UGOTOVITVE PRI PREGLEDU" },
    ],
  },
  {
    id: "preparation",
    label: "Preparation",
    icon: FileText,
    steps: [
      { id: "findings", label: "Findings", documentSection: "6. UGOTOVITVE" },
      { id: "decisions", label: "Decisions", documentSection: "7. ODLOČBE IN UKREPI" },
    ],
  },
  {
    id: "record",
    label: "Record",
    icon: FileCheck,
    steps: [
      { id: "document-generation", label: "Generate Document" },
      { id: "merchant-review", label: "Merchant Review" },
      { id: "objections", label: "Objections", documentSection: "9. PRIPOMBE ZAVEZANCA" },
    ],
  },
  {
    id: "closing",
    label: "Closing",
    icon: PenTool,
    steps: [
      { id: "end-time", label: "End Time", documentSection: "10. ZAKLJUČEK" },
      { id: "signatures", label: "Signatures" },
      { id: "complete", label: "Complete" },
    ],
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

function getPhaseForStep(step: ProcessStep): ProcessPhase {
  for (const phase of phases) {
    if (phase.steps.some((s) => s.id === step)) {
      return phase.id;
    }
  }
  return "introduction";
}

function getStepIndex(step: ProcessStep): number {
  let index = 0;
  for (const phase of phases) {
    for (const s of phase.steps) {
      if (s.id === step) return index;
      index++;
    }
  }
  return 0;
}

function getAllSteps(): ProcessStep[] {
  return phases.flatMap((p) => p.steps.map((s) => s.id));
}

function mapPhaseToIndicator(phase: ProcessPhase): InspectionPhase {
  const mapping: Record<ProcessPhase, InspectionPhase> = {
    introduction: "preparation",
    content: "execution",
    preparation: "documentation",
    record: "review",
    closing: "completed",
  };
  return mapping[phase];
}

// =============================================================================
// Component
// =============================================================================

export const InspectionProcessTemplate: React.FC<InspectionProcessTemplateProps> = ({
  data,
  availableInspectors = [],
  availableFields = [],
  companySearchResults = [],
  isSearchingCompany = false,
  className,
  onPhaseChange,
  onStepChange,
  onDataUpdate,
  onCompanySearch,
  onSaveDraft,
  onComplete,
}) => {
  const eventBus = useEventBus();
  const [isPaused, setIsPaused] = useState(false);

  const { currentPhase, currentStep } = data;
  const allSteps = getAllSteps();
  const currentStepIndex = getStepIndex(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === allSteps.length - 1;

  // Calculate compliance stats
  const totalRules = data.rules.length;
  const checkedRules = Object.keys(data.ruleChecks).length;
  const compliant = Object.values(data.ruleChecks).filter(
    (r) => r.answer === "compliant"
  ).length;
  const nonCompliant = Object.values(data.ruleChecks).filter(
    (r) => r.answer === "non-compliant"
  ).length;
  const notChecked = totalRules - checkedRules;

  const complianceStats: ComplianceStats = {
    compliant,
    nonCompliant,
    notChecked,
    totalRules,
    criticalCount: Object.values(data.ruleChecks).filter(
      (r) =>
        r.answer === "non-compliant" &&
        data.rules.find((rule) => rule.id === r.ruleId)?.severity === "critical"
    ).length,
    majorCount: Object.values(data.ruleChecks).filter(
      (r) =>
        r.answer === "non-compliant" &&
        data.rules.find((rule) => rule.id === r.ruleId)?.severity === "major"
    ).length,
    minorCount: Object.values(data.ruleChecks).filter(
      (r) =>
        r.answer === "non-compliant" &&
        data.rules.find((rule) => rule.id === r.ruleId)?.severity === "minor"
    ).length,
  };

  // Build progress steps for header
  const progressSteps: ProgressStep[] = allSteps.map((step, index) => ({
    id: step,
    label: phases
      .flatMap((p) => p.steps)
      .find((s) => s.id === step)?.label || step,
    completed: index < currentStepIndex,
    current: step === currentStep,
  }));

  // Navigation handlers
  const handlePrevious = () => {
    if (isFirstStep) return;
    const prevStep = allSteps[currentStepIndex - 1];
    const prevPhase = getPhaseForStep(prevStep);
    if (prevPhase !== currentPhase) {
      onPhaseChange?.(prevPhase);
    }
    onStepChange?.(prevStep);
    eventBus.emit("UI:STEP_BACK", { step: prevStep, phase: prevPhase });
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
      eventBus.emit("UI:INSPECTION_COMPLETE", { inspectionId: data.id });
      return;
    }
    const nextStep = allSteps[currentStepIndex + 1];
    const nextPhase = getPhaseForStep(nextStep);
    if (nextPhase !== currentPhase) {
      onPhaseChange?.(nextPhase);
    }
    onStepChange?.(nextStep);
    eventBus.emit("UI:STEP_NEXT", { step: nextStep, phase: nextPhase });
  };

  const handleSaveDraft = () => {
    onSaveDraft?.();
    eventBus.emit("UI:SAVE_DRAFT", { inspectionId: data.id, currentStep });
  };

  // Floating action menu actions
  const floatingActions: QuickAction[] = [
    {
      id: "add-participant",
      label: "Add Participant",
      icon: "user-plus",
      action: "add_participant",
    },
    {
      id: "collect-document",
      label: "Collect Document",
      icon: "file-plus",
      action: "collect_document",
    },
    {
      id: "take-photo",
      label: "Take Photo",
      icon: "camera",
      action: "take_photo",
    },
    {
      id: "pause",
      label: isPaused ? "Resume" : "Pause",
      icon: isPaused ? "play" : "pause",
      action: isPaused ? "resume" : "pause",
    },
    {
      id: "sos",
      label: "SOS Exception",
      icon: "alert-triangle",
      action: "sos",
      variant: "danger",
    },
  ];

  // ==========================================================================
  // Step Content Renderers
  // ==========================================================================

  const renderCaseInfo = () => (
    <VStack gap="lg" align="stretch">
      <Typography variant="h3">Case Information</Typography>
      <Card className="p-4">
        <VStack gap="md" align="stretch">
          <Box>
            <Typography variant="small" className="text-neutral-500 mb-1">
              Case Number
            </Typography>
            <Typography variant="h4">{data.caseNumber || "Auto-generated"}</Typography>
          </Box>

          <Box>
            <Typography variant="small" className="text-neutral-500 mb-1">
              Inspector
            </Typography>
            <EntitySearch
              label="Select Inspector"
              placeholder="Search inspectors..."
              results={availableInspectors.map((i) => ({
                id: i.id,
                label: `${i.name} ${i.surname}`,
                sublabel: `${i.department} - ${i.badgeNumber}`,
              }))}
              selectedId={data.inspector?.id}
              onSearch={(q) => eventBus.emit("UI:SEARCH_INSPECTOR", { query: q })}
              onSelect={(result) =>
                onDataUpdate?.({
                  inspector: availableInspectors.find((i) => i.id === result.id),
                })
              }
              allowCreate={false}
            />
          </Box>

          <Box>
            <Typography variant="small" className="text-neutral-500 mb-1">
              Start Date/Time
            </Typography>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded"
              value={data.startDateTime || ""}
              onChange={(e) => onDataUpdate?.({ startDateTime: e.target.value })}
            />
          </Box>

          <Box>
            <Typography variant="small" className="text-neutral-500 mb-1">
              Accompanying Persons
            </Typography>
            <RepeatableFormSection
              title="Accompanying Persons"
              items={data.accompanyingPersons.map((p) => ({
                id: p.id,
                data: p,
              }))}
              renderItem={(item) => (
                <HStack gap="md" className="flex-1">
                  <Typography>{item.data.name}</Typography>
                  <Badge variant="secondary">{item.data.organization}</Badge>
                  <Typography variant="small" className="text-neutral-500">
                    {item.data.role}
                  </Typography>
                </HStack>
              )}
              renderForm={(onAdd) => (
                <VStack gap="sm" align="stretch">
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-2 border rounded"
                    id="acc-name"
                  />
                  <input
                    type="text"
                    placeholder="Organization"
                    className="p-2 border rounded"
                    id="acc-org"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    className="p-2 border rounded"
                    id="acc-role"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const name = (document.getElementById("acc-name") as HTMLInputElement)?.value;
                      const org = (document.getElementById("acc-org") as HTMLInputElement)?.value;
                      const role = (document.getElementById("acc-role") as HTMLInputElement)?.value;
                      if (name && org) {
                        onAdd({ name, organization: org, role });
                      }
                    }}
                  >
                    Add Person
                  </Button>
                </VStack>
              )}
              onAdd={(person) => {
                const newPerson: AccompanyingPerson = {
                  id: `acc-${Date.now()}`,
                  name: person.name,
                  organization: person.organization,
                  role: person.role || "",
                };
                onDataUpdate?.({
                  accompanyingPersons: [...data.accompanyingPersons, newPerson],
                });
              }}
              onRemove={(id) => {
                onDataUpdate?.({
                  accompanyingPersons: data.accompanyingPersons.filter((p) => p.id !== id),
                });
              }}
            />
          </Box>
        </VStack>
      </Card>
    </VStack>
  );

  const renderCompanyData = () => (
    <VStack gap="lg" align="stretch">
      <Typography variant="h3">Company Data</Typography>
      <Card className="p-4">
        <VStack gap="md" align="stretch">
          <EntitySearch
            label="Search Company"
            placeholder="Search by name or registration number..."
            results={companySearchResults}
            isLoading={isSearchingCompany}
            selectedId={data.company?.id}
            onSearch={(q) => onCompanySearch?.(q)}
            onSelect={(result) =>
              eventBus.emit("UI:COMPANY_SELECTED", { companyId: result.id })
            }
            onCreateNew={() => eventBus.emit("UI:CREATE_NEW_COMPANY", {})}
            allowCreate
            createLabel="Create New Company"
          />

          {data.company && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <VStack gap="sm" align="stretch">
                <HStack justify="between">
                  <Typography variant="h4">{data.company.name}</Typography>
                  <Badge variant="primary">Selected</Badge>
                </HStack>
                <Typography variant="small" className="text-neutral-600">
                  Legal Name: {data.company.legalName}
                </Typography>
                <HStack gap="lg">
                  <Box>
                    <Typography variant="small" className="text-neutral-500">
                      Registration #
                    </Typography>
                    <Typography>{data.company.registrationNumber}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="small" className="text-neutral-500">
                      Tax ID
                    </Typography>
                    <Typography>{data.company.taxNumber}</Typography>
                  </Box>
                </HStack>
                <Box>
                  <Typography variant="small" className="text-neutral-500">
                    Address
                  </Typography>
                  <Typography>
                    {data.company.address.street}, {data.company.address.postalCode}{" "}
                    {data.company.address.city}
                  </Typography>
                </Box>
              </VStack>
            </Card>
          )}
        </VStack>
      </Card>
    </VStack>
  );

  const renderParticipants = () => (
    <VStack gap="lg" align="stretch">
      <Typography variant="h3">Participants</Typography>
      <Typography variant="body" className="text-neutral-600">
        At least one company representative must be present during the inspection.
      </Typography>
      <Card className="p-4">
        <ParticipantList
          participants={data.participants}
          onAdd={(participant) => {
            const newParticipant: Participant = {
              ...participant,
              id: `part-${Date.now()}`,
            };
            onDataUpdate?.({
              participants: [...data.participants, newParticipant],
            });
          }}
          onRemove={(id) => {
            if (data.participants.length > 1) {
              onDataUpdate?.({
                participants: data.participants.filter((p) => p.id !== id),
              });
            }
          }}
          minParticipants={1}
        />
      </Card>
      {data.participants.length === 0 && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <HStack gap="sm">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <Typography className="text-yellow-700">
              At least one participant is required to proceed (ZIN Art. 22)
            </Typography>
          </HStack>
        </Card>
      )}
    </VStack>
  );

  const renderFieldSelection = () => (
    <VStack gap="lg" align="stretch">
      <Typography variant="h3">Inspection Field</Typography>
      <Typography variant="body" className="text-neutral-600">
        Select the type of inspection to determine which rules apply.
      </Typography>
      <CardSelector
        options={availableFields.map((field) => ({
          id: field.id,
          title: field.name,
          description: `${field.description} (${field.ruleCount} rules)`,
        }))}
        selectedId={data.selectedField?.id}
        onChange={(id) => {
          const field = availableFields.find((f) => f.id === id);
          if (field) {
            onDataUpdate?.({ selectedField: field });
            eventBus.emit("UI:FIELD_SELECTED", { fieldId: id });
          }
        }}
      />
    </VStack>
  );

  const renderRuleChecking = () => (
    <VStack gap="lg" align="stretch">
      <HStack justify="between" align="center">
        <Typography variant="h3">Rule Checking</Typography>
        <Badge variant="secondary">
          {checkedRules} / {totalRules} checked
        </Badge>
      </HStack>

      <ComplianceSummary stats={complianceStats} variant="full" />

      <VStack gap="md" align="stretch">
        {data.rules.map((rule) => {
          const check = data.ruleChecks[rule.id];
          return (
            <RuleCheckItem
              key={rule.id}
              ruleId={rule.id}
              ruleText={rule.ruleText}
              gazetteNumber={rule.lawReference.gazetteNumber}
              article={rule.lawReference.article}
              severity={rule.severity}
              answer={check?.answer || null}
              notes={check?.notes}
              photoCount={check?.photos?.length || 0}
              onCheck={(answer, notes) => {
                onDataUpdate?.({
                  ruleChecks: {
                    ...data.ruleChecks,
                    [rule.id]: {
                      ruleId: rule.id,
                      answer,
                      notes,
                      photos: check?.photos || [],
                    },
                  },
                });
              }}
              onAddPhoto={() =>
                eventBus.emit("UI:ADD_RULE_PHOTO", { ruleId: rule.id })
              }
            />
          );
        })}
      </VStack>
    </VStack>
  );

  const renderFindings = () => (
    <VStack gap="lg" align="stretch">
      <Typography variant="h3">Findings</Typography>

      {/* Summary of non-compliant rules */}
      <Card className="p-4 bg-red-50 border-red-200">
        <VStack gap="sm" align="stretch">
          <Typography variant="h4" className="text-red-700">
            Non-Compliant Items ({nonCompliant})
          </Typography>
          {Object.entries(data.ruleChecks)
            .filter(([, check]) => check.answer === "non-compliant")
            .map(([ruleId, check]) => {
              const rule = data.rules.find((r) => r.id === ruleId);
              return (
                <HStack key={ruleId} gap="sm" className="text-red-600">
                  <Badge
                    variant={
                      rule?.severity === "critical" ? "error" : "warning"
                    }
                  >
                    {rule?.severity}
                  </Badge>
                  <Typography variant="small">{rule?.ruleText}</Typography>
                </HStack>
              );
            })}
        </VStack>
      </Card>

      {/* Add findings */}
      <RepeatableFormSection
        title="Formal Findings"
        items={data.findings.map((f) => ({ id: f.id, data: f }))}
        renderItem={(item) => (
          <VStack gap="sm" align="stretch" className="flex-1">
            <HStack justify="between">
              <Typography fontWeight="medium">{item.data.description}</Typography>
              <Badge
                variant={
                  item.data.severity === "critical"
                    ? "error"
                    : item.data.severity === "major"
                    ? "warning"
                    : "secondary"
                }
              >
                {item.data.severity}
              </Badge>
            </HStack>
            <Typography variant="small" className="text-neutral-500">
              {item.data.recommendation}
            </Typography>
          </VStack>
        )}
        renderForm={(onAdd) => (
          <VStack gap="sm" align="stretch">
            <textarea
              placeholder="Finding description..."
              className="p-2 border rounded min-h-[80px]"
              id="finding-desc"
            />
            <select className="p-2 border rounded" id="finding-severity">
              <option value="observation">Observation</option>
              <option value="minor">Minor</option>
              <option value="major">Major</option>
              <option value="critical">Critical</option>
            </select>
            <textarea
              placeholder="Recommendation..."
              className="p-2 border rounded"
              id="finding-rec"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const desc = (document.getElementById("finding-desc") as HTMLTextAreaElement)?.value;
                const severity = (document.getElementById("finding-severity") as HTMLSelectElement)?.value;
                const rec = (document.getElementById("finding-rec") as HTMLTextAreaElement)?.value;
                if (desc) {
                  onAdd({ description: desc, severity, recommendation: rec });
                }
              }}
            >
              Add Finding
            </Button>
          </VStack>
        )}
        onAdd={(findingData) => {
          const newFinding: Finding = {
            id: `finding-${Date.now()}`,
            description: findingData.description,
            severity: findingData.severity as Finding["severity"],
            relatedRuleIds: [],
            recommendation: findingData.recommendation || "",
          };
          onDataUpdate?.({ findings: [...data.findings, newFinding] });
        }}
        onRemove={(id) => {
          onDataUpdate?.({ findings: data.findings.filter((f) => f.id !== id) });
        }}
      />
    </VStack>
  );

  const renderDecisions = () => (
    <VStack gap="lg" align="stretch">
      <Typography variant="h3">Decisions & Orders</Typography>

      <RepeatableFormSection
        title="Required Actions"
        items={data.decisions.map((d) => ({ id: d.id, data: d }))}
        renderItem={(item) => (
          <VStack gap="sm" align="stretch" className="flex-1">
            <Typography fontWeight="medium">{item.data.orderText}</Typography>
            <HStack gap="md">
              <Badge variant="secondary">
                <Clock className="h-3 w-3 mr-1" />
                Due: {item.data.deadline}
              </Badge>
              <Badge
                variant={
                  item.data.status === "completed"
                    ? "success"
                    : item.data.status === "acknowledged"
                    ? "primary"
                    : "warning"
                }
              >
                {item.data.status}
              </Badge>
            </HStack>
          </VStack>
        )}
        renderForm={(onAdd) => (
          <VStack gap="sm" align="stretch">
            <textarea
              placeholder="Order/Action required..."
              className="p-2 border rounded min-h-[80px]"
              id="decision-text"
            />
            <input
              type="date"
              className="p-2 border rounded"
              id="decision-deadline"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const text = (document.getElementById("decision-text") as HTMLTextAreaElement)?.value;
                const deadline = (document.getElementById("decision-deadline") as HTMLInputElement)?.value;
                if (text && deadline) {
                  onAdd({ orderText: text, deadline });
                }
              }}
            >
              Add Decision
            </Button>
          </VStack>
        )}
        onAdd={(decisionData) => {
          const newDecision: Decision = {
            id: `decision-${Date.now()}`,
            orderText: decisionData.orderText,
            deadline: decisionData.deadline,
            relatedFindingIds: [],
            status: "pending",
          };
          onDataUpdate?.({ decisions: [...data.decisions, newDecision] });
        }}
        onRemove={(id) => {
          onDataUpdate?.({ decisions: data.decisions.filter((d) => d.id !== id) });
        }}
      />
    </VStack>
  );

  const renderDocumentGeneration = () => (
    <VStack gap="lg" align="stretch">
      <Typography variant="h3">Document Generation</Typography>
      <Typography variant="body" className="text-neutral-600">
        Review the compiled inspection document before presenting to the merchant.
      </Typography>

      <DocumentPreview
        title="Inspection Record"
        subtitle={`Case #${data.caseNumber}`}
        previewUrl={`/api/inspections/${data.id}/preview`}
        downloadUrl={`/api/inspections/${data.id}/download`}
        onDownload={() => eventBus.emit("UI:DOWNLOAD_DOCUMENT", { inspectionId: data.id })}
        onPrint={() => eventBus.emit("UI:PRINT_DOCUMENT", { inspectionId: data.id })}
      />

      <Card className="p-4">
        <VStack gap="md" align="stretch">
          <Typography variant="h4">Document Sections</Typography>
          {phases.map((phase) => (
            <Box key={phase.id}>
              <Typography variant="small" className="text-neutral-500 mb-1">
                {phase.label}
              </Typography>
              {phase.steps
                .filter((s) => s.documentSection)
                .map((step) => (
                  <HStack key={step.id} gap="sm" className="ml-4">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Typography variant="small">{step.documentSection}</Typography>
                  </HStack>
                ))}
            </Box>
          ))}
        </VStack>
      </Card>
    </VStack>
  );

  const renderMerchantReview = () => (
    <VStack gap="lg" align="stretch">
      <Typography variant="h3">Merchant Review</Typography>
      <Typography variant="body" className="text-neutral-600">
        Present the inspection document to the merchant for review.
      </Typography>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <VStack gap="sm" align="stretch">
          <HStack gap="sm">
            <Scale className="h-5 w-5 text-blue-600" />
            <Typography className="text-blue-700 font-medium">
              The merchant has the right to review all findings and raise objections.
            </Typography>
          </HStack>
        </VStack>
      </Card>

      <DocumentPreview
        title="Inspection Record"
        subtitle="For Merchant Review"
        previewUrl={`/api/inspections/${data.id}/preview`}
        isReadOnly
      />
    </VStack>
  );

  const renderObjections = () => (
    <VStack gap="lg" align="stretch">
      <Typography variant="h3">Objections</Typography>

      {data.objections.length === 0 ? (
        <Card className="p-4 bg-green-50 border-green-200">
          <HStack gap="sm">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <Typography className="text-green-700">
              No objections have been raised by the merchant.
            </Typography>
          </HStack>
        </Card>
      ) : (
        <VStack gap="md" align="stretch">
          {data.objections.map((objection) => (
            <Card key={objection.id} className="p-4">
              <VStack gap="sm" align="stretch">
                <HStack justify="between">
                  <Badge variant="secondary">Section: {objection.sectionRef}</Badge>
                  <Badge
                    variant={
                      objection.status === "resolved" ? "success" : "warning"
                    }
                  >
                    {objection.status}
                  </Badge>
                </HStack>
                <Typography>{objection.objectionText}</Typography>
                {objection.response && (
                  <Box className="bg-neutral-50 p-2 rounded">
                    <Typography variant="small" className="text-neutral-500">
                      Inspector Response:
                    </Typography>
                    <Typography variant="small">{objection.response}</Typography>
                  </Box>
                )}
              </VStack>
            </Card>
          ))}
        </VStack>
      )}

      <ObjectionRecorder
        onSubmit={(sectionRef, text) => {
          const newObjection: Objection = {
            id: `obj-${Date.now()}`,
            sectionRef,
            objectionText: text,
            status: "pending",
          };
          onDataUpdate?.({ objections: [...data.objections, newObjection] });
        }}
      />
    </VStack>
  );

  const renderEndTime = () => (
    <VStack gap="lg" align="stretch">
      <Typography variant="h3">Closing Information</Typography>

      <Card className="p-4">
        <VStack gap="md" align="stretch">
          <Box>
            <Typography variant="small" className="text-neutral-500 mb-1">
              Inspection Start
            </Typography>
            <Typography>{data.startDateTime || "Not recorded"}</Typography>
          </Box>
          <Box>
            <Typography variant="small" className="text-neutral-500 mb-1">
              Inspection End
            </Typography>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded"
              value={data.endDateTime || ""}
              onChange={(e) => onDataUpdate?.({ endDateTime: e.target.value })}
            />
          </Box>
        </VStack>
      </Card>

      <InspectionTimeline items={data.timeline} />
    </VStack>
  );

  const renderSignatures = () => (
    <VStack gap="lg" align="stretch">
      <Typography variant="h3">Signatures</Typography>
      <Typography variant="body" className="text-neutral-600">
        Both the inspector and merchant representative must sign the inspection record.
      </Typography>

      <Card className="p-4">
        <VStack gap="lg" align="stretch">
          <SignatureCapture
            title="Inspector Signature"
            subtitle={
              data.inspector
                ? `${data.inspector.name} ${data.inspector.surname}`
                : "Inspector"
            }
            onCapture={(signatureData) => {
              onDataUpdate?.({ inspectorSignature: signatureData });
              eventBus.emit("UI:INSPECTOR_SIGNED", { inspectionId: data.id });
            }}
          />

          <SignatureCapture
            title="Merchant Signature"
            subtitle={
              data.participants[0]
                ? `${data.participants[0].name} ${data.participants[0].surname}`
                : "Company Representative"
            }
            onCapture={(signatureData) => {
              onDataUpdate?.({ merchantSignature: signatureData });
              eventBus.emit("UI:MERCHANT_SIGNED", { inspectionId: data.id });
            }}
          />
        </VStack>
      </Card>

      {(!data.inspectorSignature || !data.merchantSignature) && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <HStack gap="sm">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <Typography className="text-yellow-700">
              Both signatures are required to complete the inspection (ZIN Art. 28)
            </Typography>
          </HStack>
        </Card>
      )}
    </VStack>
  );

  const renderComplete = () => (
    <VStack gap="lg" align="center" className="py-8">
      <Box className="p-4 rounded-full bg-green-100">
        <CheckCircle className="h-16 w-16 text-green-600" />
      </Box>
      <Typography variant="h2">Inspection Complete</Typography>
      <Typography variant="body" className="text-neutral-600 text-center max-w-md">
        The inspection has been successfully completed. You can download the final
        document or archive it to the information system.
      </Typography>

      <Card className="p-4 w-full max-w-md">
        <VStack gap="sm" align="stretch">
          <HStack justify="between">
            <Typography>Case Number</Typography>
            <Typography fontWeight="medium">{data.caseNumber}</Typography>
          </HStack>
          <HStack justify="between">
            <Typography>Company</Typography>
            <Typography fontWeight="medium">{data.company?.name}</Typography>
          </HStack>
          <HStack justify="between">
            <Typography>Rules Checked</Typography>
            <Typography fontWeight="medium">{checkedRules}</Typography>
          </HStack>
          <HStack justify="between">
            <Typography>Findings</Typography>
            <Typography fontWeight="medium">{data.findings.length}</Typography>
          </HStack>
          <HStack justify="between">
            <Typography>Decisions</Typography>
            <Typography fontWeight="medium">{data.decisions.length}</Typography>
          </HStack>
        </VStack>
      </Card>

      <HStack gap="md">
        <Button
          variant="secondary"
          onClick={() => eventBus.emit("UI:DOWNLOAD_FINAL", { inspectionId: data.id })}
        >
          <FileText className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button
          variant="primary"
          onClick={() => eventBus.emit("UI:ARCHIVE_INSPECTION", { inspectionId: data.id })}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Archive to System
        </Button>
      </HStack>
    </VStack>
  );

  // Step content renderer
  const renderStepContent = () => {
    switch (currentStep) {
      case "case-info":
        return renderCaseInfo();
      case "company-data":
        return renderCompanyData();
      case "participants":
        return renderParticipants();
      case "field-selection":
        return renderFieldSelection();
      case "rule-checking":
        return renderRuleChecking();
      case "findings":
        return renderFindings();
      case "decisions":
        return renderDecisions();
      case "document-generation":
        return renderDocumentGeneration();
      case "merchant-review":
        return renderMerchantReview();
      case "objections":
        return renderObjections();
      case "end-time":
        return renderEndTime();
      case "signatures":
        return renderSignatures();
      case "complete":
        return renderComplete();
      default:
        return null;
    }
  };

  // Can proceed check
  const canProceed = (): boolean => {
    switch (currentStep) {
      case "case-info":
        return !!data.caseNumber && !!data.inspector && !!data.startDateTime;
      case "company-data":
        return !!data.company;
      case "participants":
        return data.participants.length >= 1;
      case "field-selection":
        return !!data.selectedField;
      case "rule-checking":
        return checkedRules === totalRules;
      case "findings":
        return true; // Optional
      case "decisions":
        return true; // Optional
      case "document-generation":
        return true;
      case "merchant-review":
        return true;
      case "objections":
        return data.objections.every((o) => o.status === "resolved");
      case "end-time":
        return !!data.endDateTime;
      case "signatures":
        return !!data.inspectorSignature && !!data.merchantSignature;
      case "complete":
        return true;
      default:
        return true;
    }
  };

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <VStack gap="none" className={cn("min-h-screen bg-neutral-50", className)}>
      {/* Header */}
      <Box className="bg-white border-b sticky top-0 z-40">
        <Box className="max-w-6xl mx-auto p-4">
          <HStack justify="between" align="center">
            <VStack gap="xs">
              <Typography variant="h3">
                Field Inspection - {data.caseNumber || "New"}
              </Typography>
              <Typography variant="small" className="text-neutral-500">
                {data.company?.name || "No company selected"}
              </Typography>
            </VStack>
            <PhaseIndicator phase={mapPhaseToIndicator(currentPhase)} />
          </HStack>
        </Box>
      </Box>

      {/* Phase Navigation */}
      <Box className="bg-white border-b">
        <Box className="max-w-6xl mx-auto p-2">
          <HStack gap="none" className="overflow-x-auto">
            {phases.map((phase, phaseIndex) => {
              const phaseStepIndices = phase.steps.map((s) => getStepIndex(s.id));
              const isPhaseComplete = phaseStepIndices.every(
                (i) => i < currentStepIndex
              );
              const isCurrentPhase = phase.id === currentPhase;
              const Icon = phase.icon;

              return (
                <Box
                  key={phase.id}
                  className={cn(
                    "flex-1 p-3 border-b-2 transition-all",
                    isCurrentPhase && "border-blue-500 bg-blue-50",
                    isPhaseComplete && !isCurrentPhase && "border-green-500",
                    !isCurrentPhase && !isPhaseComplete && "border-transparent"
                  )}
                >
                  <HStack gap="sm" justify="center">
                    {isPhaseComplete ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          isCurrentPhase ? "text-blue-600" : "text-neutral-400"
                        )}
                      />
                    )}
                    <Typography
                      variant="small"
                      fontWeight={isCurrentPhase ? "semibold" : "normal"}
                      className={cn(
                        isCurrentPhase && "text-blue-700",
                        isPhaseComplete && !isCurrentPhase && "text-green-700"
                      )}
                    >
                      {phase.label}
                    </Typography>
                  </HStack>
                </Box>
              );
            })}
          </HStack>
        </Box>
      </Box>

      {/* Step Progress */}
      <Box className="max-w-6xl mx-auto w-full px-4 py-4">
        <ProgressHeader
          title={phases.find((p) => p.id === currentPhase)?.label || ""}
          subtitle={`Step ${currentStepIndex + 1} of ${allSteps.length}`}
          phase={mapPhaseToIndicator(currentPhase)}
          steps={progressSteps.slice(
            getStepIndex(phases.find((p) => p.id === currentPhase)?.steps[0].id || "case-info"),
            getStepIndex(
              phases.find((p) => p.id === currentPhase)?.steps[
                phases.find((p) => p.id === currentPhase)!.steps.length - 1
              ].id || "case-info"
            ) + 1
          )}
          compact
        />
      </Box>

      {/* Main Content */}
      <Box className="max-w-6xl mx-auto w-full px-4 pb-24 flex-1">
        <Card className="p-6">{renderStepContent()}</Card>
      </Box>

      {/* Footer Navigation */}
      <Box className="bg-white border-t fixed bottom-0 left-0 right-0 z-40">
        <Box className="max-w-6xl mx-auto p-4">
          <HStack justify="between" align="center">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={isFirstStep}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <HStack gap="sm">
              <Button variant="ghost" onClick={handleSaveDraft} className="gap-2">
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
            </HStack>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2"
            >
              {isLastStep ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Archive Inspection
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </HStack>
        </Box>
      </Box>

      {/* Floating Action Menu (only during content phase) */}
      {currentPhase === "content" && (
        <FloatingActionMenu
          actions={floatingActions}
          context={{ inspectionId: data.id, currentStep }}
        />
      )}
    </VStack>
  );
};

InspectionProcessTemplate.displayName = "InspectionProcessTemplate";
