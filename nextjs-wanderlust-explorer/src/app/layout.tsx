import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wanderlust Explorer",
  description: "Descubre experiencias únicas alrededor del mundo",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 font-sans">
        <FavoritesProvider>
          <Suspense
            fallback={<div className="h-[57px] border-b border-zinc-200" aria-hidden="true" />}
          >
            <Navbar />
          </Suspense>
          <main className="flex-1">
            <Suspense
              fallback={
                <div className="mx-auto max-w-7xl px-4 py-8" aria-busy="true">
                  Cargando página...
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
