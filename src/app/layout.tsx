import { JSX } from "react";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { SideBar } from "@/components/SideBar";
import { TopBar } from "@/components/TopBar";

import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hair Salon",
  description: "Salón de Bangelia Karamanos",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>): JSX.Element {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <TopBar isMobile={true} />

          <div className="flex flex-1">
            <SideBar />

            <main className="flex-1 p-2">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
