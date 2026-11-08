import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Shashank Singh",
  description: "Shashank Singh builds C++ engines, Python backends and applied AI tools. Six projects, two of them live.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

// Runs before paint so a saved choice never flashes the other theme.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preload" href="/fonts/epilogue-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/epilogue-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <a className="skip" href="#main">Skip to content</a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
