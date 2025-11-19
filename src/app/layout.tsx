import type { Metadata } from "next";
import { Stack_Sans_Text } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "./client-layout";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
        <ClientLayout>
          <Navbar />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
