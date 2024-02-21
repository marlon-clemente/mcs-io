import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      onError: (error: any) => {
        if (error.response && error.response.status === 403) {
          console.log("sdsasdsad");
          window.location.href = "/auth";
        }
      },
    },
  },
});
