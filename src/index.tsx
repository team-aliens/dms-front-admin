import { StyledProvider } from '@team-aliens/design-system';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { App } from './App';
import { ModalProvider } from '@/context/modal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  },
});

const root = createRoot(document.getElementById('root'));

root.render(
  <StyledProvider>
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ModalProvider>
  </StyledProvider>,
);
