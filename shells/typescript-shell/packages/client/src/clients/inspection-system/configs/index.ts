/**
 * Inspection System Form Configs
 *
 * These configs define the structure of each inspection form tab.
 * They are parsed from the client's specification documents and
 * drive the dynamic form rendering in the InspectionFormDemoTemplate.
 *
 * Source: projects/inspection-system/config/tabs/
 */

import T001 from "./tabs/T-001-uvod";
import T002 from "./tabs/T-002-podjetje";
import T003 from "./tabs/T-003-udelezenci";
import T004 from "./tabs/T-004-izbira-podrocja";
import T005 from "./tabs/T-005-trgovina";
import T2_1 from "./tabs/T2-1-oznacevanje-cen";
import T006 from "./tabs/T-006-ugotovitve";
import T007 from "./tabs/T-007-odlocbe";
import T008 from "./tabs/T-008-pripombe";
import T009 from "./tabs/T-009-zakljucek";

import type { FormTabConfig } from "../templates/InspectionFormDemoTemplate";

// Export individual configs
export const configs = {
  "T-001": T001 as unknown as FormTabConfig,
  "T-002": T002 as unknown as FormTabConfig,
  "T-003": T003 as unknown as FormTabConfig,
  "T-004": T004 as unknown as FormTabConfig,
  "T-005": T005 as unknown as FormTabConfig,
  "T2-1": T2_1 as unknown as FormTabConfig,
  "T-006": T006 as unknown as FormTabConfig,
  "T-007": T007 as unknown as FormTabConfig,
  "T-008": T008 as unknown as FormTabConfig,
  "T-009": T009 as unknown as FormTabConfig,
};

// Export by phase for convenience
export const introductionConfigs = {
  "T-001": configs["T-001"],
  "T-002": configs["T-002"],
  "T-003": configs["T-003"],
  "T-004": configs["T-004"],
};

export const contentConfigs = {
  "T-005": configs["T-005"],
  "T2-1": configs["T2-1"],
};

export const preparationConfigs = {
  "T-006": configs["T-006"],
  "T-007": configs["T-007"],
};

export const recordConfigs = {
  "T-008": configs["T-008"],
};

export const closingConfigs = {
  "T-009": configs["T-009"],
};

// Export all configs as a single object
export default configs;

// Re-export raw JSON for direct access
export {
  T001,
  T002,
  T003,
  T004,
  T005,
  T2_1,
  T006,
  T007,
  T008,
  T009,
};
