"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/providers/query-provider";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {/* <SessionProvider> */}
      <QueryProvider>{children}</QueryProvider>
      {/* </SessionProvider> */}
    </ThemeProvider>
  );
}
