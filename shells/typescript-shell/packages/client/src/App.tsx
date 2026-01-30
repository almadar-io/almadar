import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts';
import { ToastProvider } from '@/contexts/ToastContext';
import { EventBusProvider } from '@/providers/EventBusProvider';
import { UISlotProvider } from '@/context/UISlotContext';
import { DashboardLayout } from '@components';
import { Home } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// {{GENERATED_IMPORTS}}

// Export queryClient for test access (to clear cache between tests)
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

/** Navigation items for sidebar - generated from schema */
const navItems: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: 'Home', href: '/', icon: Home },
  // {{GENERATED_NAV_ITEMS}}
];

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <EventBusProvider>
            <UISlotProvider>
              <BrowserRouter>
                <Routes>
                  {/* Dashboard layout routes */}
                  <Route element={<DashboardLayout navItems={navItems} appName="{{APP_NAME}}" />}>
                    <Route index element={<Navigate to="/" replace />} />
                    {/* {{GENERATED_ROUTES}} */}
                  </Route>

                  {/* Fallback route - redirect to main page */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </UISlotProvider>
          </EventBusProvider>
        </QueryClientProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
