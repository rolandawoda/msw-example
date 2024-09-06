import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Todos } from "components/Todos";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-testid="app" className="App">
        <Todos />
      </div>
    </QueryClientProvider>
  );
}

export default App;
