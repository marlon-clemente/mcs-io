"use client";
import { queryClient } from "@/services/useQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    console.log("RootLayout");
  }, []);

  return (
    <html lang="pt-br">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className + "theme-light"}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
