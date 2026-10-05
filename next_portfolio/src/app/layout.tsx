import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Shashank Singh",
  description: "Personal Portfolio of Shashank Singh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="antialiased bg-[#020617] text-slate-50">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
