import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";


import { Example } from "./pages/Example";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Example /> */}
    </QueryClientProvider>
  );
}




export default App;
