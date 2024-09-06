import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";

export function reactQueryWrapper() {
  const queryCache = new QueryCache();
  const queryClient = new QueryClient({
    queryCache,
    defaultOptions: {
      queries: {
        retryDelay: 1,
        retry: 0,
      },
    },
  });

  const wrapper = ({ children }, memoryRouterProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { wrapper, queryCache };
}
