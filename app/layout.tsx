import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/app/providers";

/* One sans for display and text, one mono for code, labels and the shell.
   Both are the variable Latin cuts from Google Fonts (SIL Open Font
   License), served from the app itself: no third-party request at runtime,
   and builds never depend on reaching Google. */
const sans = localFont({
  src: "./fonts/inter-latin-variable.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/geist-mono-latin-variable.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jimuel Dave Rodado | Software Engineer",
  description:
    "Portfolio of Jimuel Dave Rodado, Software Engineer with a Computer Engineering background, building healthcare, ERP and operational systems with Laravel, FilamentPHP, React, Next.js and TypeScript.",
  // No `icons` override: app/icon.svg and app/apple-icon.png are picked up by
  // the file convention, which emits type/sizes and a content hash for cache busting.
  keywords: [
    "Jimuel Dave Rodado",
    "Software Engineer",
    "Computer Engineer",
    "Full-Stack Developer",
    "Laravel Developer",
    "FilamentPHP",
    "React Developer",
    "Next.js Developer",
    "Healthcare Systems",
    "Enterprise Software",
    "Davao Philippines",
  ],
  openGraph: {
    title: "Jimuel Dave Rodado | Software Engineer",
    description:
      "Enterprise software for healthcare and operations teams: hospital management systems, ERP platforms, and mission-critical applications.",
    type: "website",
    locale: "en_PH",
    siteName: "Jimuel Dave Rodado",
  },
};

/* Paints the browser chrome to match whichever ground is showing. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F5F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0B0D" },
  ],
};

/* Runs before first paint: marks that scripts run (entrance animations may
   start hidden), restores the theme, and skips the intro when it already
   played this session or the visitor prefers reduced motion. */
const bootScript = [
  "(function(){var d=document.documentElement;d.classList.add('js');",
  "try{var t=localStorage.getItem('theme');if(t==='light')d.classList.remove('dark');else d.classList.add('dark');}catch(e){}",
  "try{if(sessionStorage.getItem('intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro-seen');}catch(e){d.classList.add('intro-seen');}",
  "})();",
].join("");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript dangerouslySetInnerHTML={{ __html: "<style>.boot{display:none!important}</style>" }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
