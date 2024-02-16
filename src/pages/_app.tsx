import { queryClient } from "@/services/useQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="p-60 bg-green-600">
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
