import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Stack_Sans_Text } from "next/font/google";

import QueryProvider from "@/providers/query-provider";
import "./globals.css";

const stack = Stack_Sans_Text({
  variable: "--font-Stack_Sans_Text",
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
    <html lang="en">
      <body className={`${stack.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        ></ThemeProvider>
        <SessionProvider>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
