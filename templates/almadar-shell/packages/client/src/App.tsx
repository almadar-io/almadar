/**
 * App Entry Point
 *
 * Main application component with compiler-generated content placeholders.
 * The Rust compiler replaces {{PLACEHOLDERS}} with generated code.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ThemeProvider,
  EventBusProvider,
  UISlotProvider,
} from '@almadar/ui/providers';

// {{GENERATED_IMPORTS}}

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
          <UISlotProvider>
            <BrowserRouter>
              <Routes>
                {/* {{GENERATED_ROUTES}} */}
                <Route path="/" element={<div>Welcome to Almadar</div>} />
              </Routes>
            </BrowserRouter>
          </UISlotProvider>
        </EventBusProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
