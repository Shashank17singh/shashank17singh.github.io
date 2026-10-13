import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Shashank Singh",
  description: "Personal Portfolio of Shashank Singh",
  other: {
    "darkreader-lock": "",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" content="" />
      </head>
      <body className="antialiased bg-[#020617] text-slate-50" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
