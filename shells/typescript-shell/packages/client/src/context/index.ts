/**
 * Context barrel export
 */

export {
  UISlotProvider,
  useUISlots,
  useSlotContent,
  useSlotHasContent,
  UISlotContext,
  type UISlotManager,
  type UISlot,
  type SlotContent,
  type RenderUIConfig,
  type SlotAnimation,
  type SlotChangeCallback,
} from './UISlotContext';

export {
  ThemeProvider,
  ThemeContext,
  useTheme,
  usePatternClasses,
  resolveTokenPath,
  mergeTokenClasses,
  DEFAULT_DESIGN_TOKENS,
  DEFAULT_DESIGN_PREFERENCES,
  type DesignTokens,
  type DesignPreferences,
  type ThemeContextValue,
  type ThemeProviderProps,
} from './ThemeContext';

export {
  UserProvider,
  UserContext,
  useUser,
  useHasRole,
  useHasPermission,
  useUserForEvaluation,
  ANONYMOUS_USER,
  type UserData,
  type UserContextValue,
  type UserProviderProps,
} from './UserContext';
