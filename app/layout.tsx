import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Jost, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* Geometric display face in the Futura tradition: the Bauhaus voice. */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

/* Only the italic is used, for emphasis inside display type. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jimuel Dave Rodado | Software Engineer",
  description:
    "Portfolio of Jimuel Dave Rodado, Computer Engineer and Full-Stack Developer specialising in Laravel, FilamentPHP, React, Next.js, and enterprise healthcare systems.",
  // No `icons` override: app/icon.svg and app/apple-icon.png are picked up by
  // the file convention, which emits type/sizes and a content hash for cache busting.
  keywords: [
    "Jimuel Dave Rodado",
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
    { media: "(prefers-color-scheme: light)", color: "#F0E9DC" },
    { media: "(prefers-color-scheme: dark)",  color: "#11100E" },
  ],
};

/* Runs before first paint: restores the theme, and skips the intro when it
   already played this session or the visitor prefers reduced motion. */
const bootScript = [
  "(function(){var d=document.documentElement;",
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
    <html
      lang="en"
      className={`dark ${inter.variable} ${jost.variable} ${playfair.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript dangerouslySetInnerHTML={{ __html: "<style>.preloader{display:none!important}</style>" }} />
      </head>
      <body>
        <Providers>{children}</Providers>
        {/* Printed-paper grain over everything. Pointer-events none, and
            hidden when the visitor asks for reduced motion. */}
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
