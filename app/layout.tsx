import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jimuel Rodado | Full-Stack Developer",
  description:
    "Portfolio of Jimuel Dave Rodado, a full-stack developer focused on healthcare and enterprise web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#edf8ff] text-[#0f172a] antialiased selection:bg-[#48f5ff]/35 selection:text-[#061329] dark:bg-[#02040d] dark:text-[#eaf6ff] dark:selection:text-white">
        <script
          id="theme-bootstrap"
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');var d=t?t==='dark':true;document.documentElement.classList.toggle('dark',d)}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
