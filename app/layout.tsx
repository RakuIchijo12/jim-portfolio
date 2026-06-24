import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
