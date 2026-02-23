/**
 * App Entry Point
 *
 * Main application component with compiler-generated content placeholders.
 * The Rust compiler replaces {{PLACEHOLDERS}} with generated code.
 *
 * Navigation works via schema-driven NavigationProvider:
 * - NavigationProvider holds active page state
 * - navigateTo() switches pages and fires INIT with payload
 * - No dependency on react-router for internal navigation
 * - react-router is optional for URL bookmarkability
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ThemeProvider,
  EventBusProvider,
  UISlotProvider,
  VerificationProvider,
} from '@almadar/ui/providers';
import { NavigationProvider } from '@almadar/ui/renderer';

// {{GENERATED_IMPORTS}}

// Generated schema import (compiler fills this in)
// {{GENERATED_SCHEMA_IMPORT}}
const schema = { orbitals: [] }; // Placeholder - replaced by compiler

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <EventBusProvider>
          <VerificationProvider>
            <UISlotProvider>
              <NavigationProvider
                schema={schema}
                updateUrl={true}
                onNavigate={(pageName, path, payload) => {
                  console.log('[App] Navigation:', { pageName, path, payload });
                }}
              >
                <BrowserRouter>
                  <Routes>
                    {/* {{GENERATED_ROUTES}} */}
                    <Route path="/" element={<div>Welcome to Almadar</div>} />
                  </Routes>
                </BrowserRouter>
              </NavigationProvider>
            </UISlotProvider>
          </VerificationProvider>
        </EventBusProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
