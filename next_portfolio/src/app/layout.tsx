import type { Metadata, Viewport } from "next";
import { Epilogue, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const epilogue = Epilogue({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-epilogue", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Shashank Singh",
  description: "Shashank Singh builds C++ engines, Python backends and applied AI tools. Six projects, two of them live.",
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${epilogue.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a className="skip" href="#main">Skip to content</a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
