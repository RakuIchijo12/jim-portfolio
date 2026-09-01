import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/app/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jimuel Dave Rodado | Software Engineer",
  description:
    "Portfolio of Jimuel Dave Rodado — Computer Engineer, Full-Stack Developer specialising in Laravel, FilamentPHP, React, Next.js, and enterprise healthcare systems.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.remove('dark');else document.documentElement.classList.add('dark');}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
