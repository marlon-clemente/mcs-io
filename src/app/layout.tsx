"use client";

import { Toaster } from "@/components/ui/toast/toaster";
import { queryClient } from "@/services/useQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <QueryClientProvider client={queryClient}>
          <div className={inter.className + "theme-light w-full h-full flex"}>
            {children}
          </div>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
