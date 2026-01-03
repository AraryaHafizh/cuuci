import type { Metadata } from "next";
import { Stack_Sans_Text } from "next/font/google";
import { ClientLayout } from "./client-layout";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";

const stack = Stack_Sans_Text({
  variable: "--font-Stack_Sans_Text",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "cuuci",
  description: "cuuci laundry app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${stack.className} antialiased`}>
        <QueryProvider>
        <ClientLayout>
          {children}
        </ClientLayout>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
