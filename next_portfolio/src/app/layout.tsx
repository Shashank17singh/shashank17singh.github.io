import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://shashank17singh.github.io"),
  title: "Shashank Singh | Systems & Applied AI Engineer",
  description: "Shashank Singh builds C++ engines, Python backends and applied AI tools. Seven projects across systems, ML and full-stack, two of them live.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Shashank Singh | Systems & Applied AI Engineer",
    description: "C++ engines, Python backends and applied AI tools. Seven projects, two of them live.",
    url: "https://shashank17singh.github.io",
    siteName: "Shashank Singh Portfolio",
    images: [
      {
        url: "/work/hotseat.png",
        width: 2880,
        height: 1800,
        alt: "Shashank Singh Portfolio - Featured Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashank Singh | Systems & Applied AI Engineer",
    description: "C++ engines, Python backends and applied AI tools. Seven projects, two of them live.",
    images: ["/work/hotseat.png"],
  },
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
