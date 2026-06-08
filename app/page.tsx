import type { CSSProperties } from "react";
import Image from "next/image";
import ContactForm from "./contact-form";
import CurrentYear from "./current-year";
import ThemeToggle from "./theme-toggle";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const contactEmail = "rjimueldave12@gmail.com";
const contactPhone = "+63 976 317 0755";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/jimuel-dave-rodado-1731b9182/",
    label: "LinkedIn",
    icon: "linkedin",
  },
  {
    href: "https://github.com/RakuIchijo12",
    label: "GitHub",
    icon: "github",
  },
  {
    href: "https://www.facebook.com/jimueldave.rodado",
    label: "Facebook",
    icon: "facebook",
  },
  {
    href: `mailto:${contactEmail}`,
    label: "Email",
    icon: "mail",
  },
] as const;

const contactDetails = [
  {
    label: "Phone",
    value: contactPhone,
    icon: "phone",
  },
  {
    label: "Email",
    value: contactEmail,
    icon: "mail",
  },
  {
    label: "Location",
    value: "Davao City, Philippines",
    icon: "location",
  },
] as const;

const coreStack = [
  { name: "Laravel", icon: "laravel", color: "#ff3d2e" },
  { name: "FilamentPHP", icon: "filament", color: "#f6a800" },
  { name: "Livewire", icon: "livewire", color: "#ff4d9d" },
  { name: "Tailwind CSS", icon: "tailwind", color: "#16b8f3" },
  { name: "Alpine.js", icon: "alpine", color: "#0f9f89" },
  { name: "MySQL", icon: "mysql", color: "#00758f" },
  { name: "Angular", icon: "angular", color: "#dd0031" },
  { name: "NestJS", icon: "nestjs", color: "#e0234e" },
  { name: "PostgreSQL", icon: "postgresql", color: "#336791" },
  { name: "PestPHP", icon: "pest", color: "#72b01d" },
  { name: "Queues", icon: "queues", color: "#7c3aed" },
  { name: "RESTful APIs", icon: "api", color: "#0891b2" },
] as const;

const aboutCards = [
  {
    title: "Current lane",
    value: "Healthcare systems",
    copy: "Daily work on hospital workflows where reliability, accuracy, and speed matter.",
  },
  {
    title: "System shape",
    value: "Enterprise tools",
    copy: "ERP, CRM, dashboards, user management, automation, and operational platforms.",
  },
  {
    title: "Education",
    value: "Computer Engineering",
    copy: "Bachelor of Science from the University of Mindanao, with a STEM foundation.",
  },
];

const experience = [
  {
    role: "Computer Programmer",
    company: "Southern Philippines Medical Center (SPMC)",
    meta: "Full-time | Apr 2026 - Present | Davao, Philippines | On-site",
    points: [
      "Developing and maintaining healthcare systems for critical daily operations.",
      "Supporting process automation, user management, internal workflows, and system maintenance.",
      "Turning fast-moving operational requirements into dependable web tools.",
    ],
  },
  {
    role: "Full Stack Laravel Developer",
    company: "DevbeansPH",
    meta: "Full-time | Nov 2024 - Oct 2025 | Davao, Philippines | On-site",
    points: [
      "Built ERP and CRM features using Laravel, FilamentPHP, Livewire, Tailwind CSS, and the TALL stack.",
      "Designed dashboards, CRUD modules, role-based authentication, RESTful APIs, and database workflows.",
      "Improved reliability with queues, jobs, events, caching, logs, debugging tools, and PestPHP tests.",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "Jairosoft Inc.",
    meta: "Contract | Sep 2024 - Oct 2024 | Davao, Philippines | On-site",
    points: [
      "Completed full-stack onboarding with Angular 16 and contributed to application maintenance.",
      "Strengthened frontend fundamentals across HTML, CSS, components, and team workflows.",
    ],
  },
  {
    role: "Back End Developer",
    company: "Jairosoft Inc.",
    meta: "Internship | Feb 2024 - May 2024 | Davao, Philippines | On-site",
    points: [
      "Worked on backend development for an automated magnetic lock system.",
      "Practiced API design, database handling, and backend implementation in a professional environment.",
    ],
  },
];

const heroStats = [
  { value: "4", label: "lanes", accent: "#ff3d6e" },
  { value: "12", label: "tools", accent: "#39ff14" },
  { value: "99%", label: "focus", accent: "#ffd60a" },
];

const rhythmStrips = [
  "Laravel",
  "hospital workflows",
  "queues",
  "dashboards",
  "APIs",
  "role access",
  "tests",
  "automation",
];

const orbitNotes = [
  { label: "API gate", x: "3%", y: "8%", color: "#00d5ff" },
  { label: "CRUD jump", x: "66%", y: "3%", color: "#ff3d6e" },
  { label: "Ops shield", x: "64%", y: "70%", color: "#39ff14" },
  { label: "UI coin", x: "1%", y: "66%", color: "#ffd60a" },
];

const labNotes = [
  { label: "Reliability", value: "97%", color: "#24c6a8" },
  { label: "Workflow clarity", value: "91%", color: "#ff5f57" },
  { label: "Debug patience", value: "99%", color: "#7c3aed" },
];

const confetti = [
  "#ff5f57",
  "#ffd166",
  "#24c6a8",
  "#7c3aed",
  "#1d4ed8",
  "#ff4d9d",
  "#111827",
  "#f6a800",
  "#0891b2",
  "#84cc16",
  "#f97316",
  "#6366f1",
];

function customStyle(properties: Record<string, string>): CSSProperties {
  return properties as CSSProperties;
}

function cardDelay(index: number): CSSProperties {
  return customStyle({ "--delay": `${index * 90}ms` });
}

function stackAccent(color: string): CSSProperties {
  return customStyle({ "--stack-accent": color });
}

function meterStyle(color: string, width: string, index: number): CSSProperties {
  return customStyle({
    "--meter-accent": color,
    "--meter-width": width,
    "--delay": `${index * 120}ms`,
  });
}

function confettiStyle(color: string, index: number): CSSProperties {
  return customStyle({
    "--confetti-color": color,
    "--confetti-left": `${(index * 9 + 7) % 96}%`,
    "--confetti-delay": `${index * -0.85}s`,
    "--confetti-duration": `${8 + (index % 5)}s`,
  });
}

function orbitStyle(
  note: (typeof orbitNotes)[number],
  index: number,
): CSSProperties {
  return customStyle({
    "--orbit-accent": note.color,
    "--orbit-x": note.x,
    "--orbit-y": note.y,
    "--delay": `${index * -0.65}s`,
  });
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  if (icon === "linkedin") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.94 8.98H3.56V20h3.38V8.98ZM7.17 5.58A1.95 1.95 0 1 0 3.28 5.6a1.95 1.95 0 0 0 3.89-.02ZM20.72 13.7c0-3.18-1.7-4.97-4.28-4.97a3.69 3.69 0 0 0-3.33 1.83h-.05V8.98H9.82V20h3.37v-5.45c0-1.44.27-2.84 2.06-2.84 1.76 0 1.78 1.65 1.78 2.93V20h3.38l.31-6.3Z" />
      </svg>
    );
  }

  if (icon === "github") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.69c-2.77.6-3.36-1.18-3.36-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.1-4.54-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.05c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.33 4.66-4.55 4.91.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (icon === "facebook") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.35 8.84V6.98c0-.8.53-.99.91-.99h2.31V2.13L14.39 2.1c-3.53 0-4.33 2.64-4.33 4.33v2.41H7.28v3.98h2.78V23h4.29V12.82h3.58l.16-3.98h-3.74Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function StackIcon({ icon }: { icon: (typeof coreStack)[number]["icon"] }) {
  if (icon === "tailwind") {
    return (
      <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 10.5c1.6-3.2 4-4.2 7.2-3 1.8.7 2.9 2 4.8.9 1-.6 1.5-1.4 1.8-2.2-1.6 3.2-4 4.2-7.2 3-1.8-.7-2.9-2-4.8-.9-1 .6-1.5 1.4-1.8 2.2Z" />
        <path d="M3 16.5c1.6-3.2 4-4.2 7.2-3 1.8.7 2.9 2 4.8.9 1-.6 1.5-1.4 1.8-2.2-1.6 3.2-4 4.2-7.2 3-1.8-.7-2.9-2-4.8-.9-1 .6-1.5 1.4-1.8 2.2Z" />
      </svg>
    );
  }

  if (icon === "mysql" || icon === "postgresql") {
    return (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </svg>
    );
  }

  if (icon === "queues" || icon === "api") {
    return (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="7" r="2.5" />
        <circle cx="18" cy="17" r="2.5" />
        <path d="M8.3 11 15.8 8M8.3 13l7.5 3" />
      </svg>
    );
  }

  if (icon === "pest") {
    return (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="m8.5 12 2.3 2.4L15.8 9" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M12 3 20 8v8l-8 5-8-5V8Z" />
      <path d="M8 16V8l8 8V8" />
    </svg>
  );
}

function ContactDetailIcon({
  icon,
}: {
  icon: (typeof contactDetails)[number]["icon"];
}) {
  if (icon === "phone") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4 text-[#24c6a8]"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L8 9.72a16 16 0 0 0 6.28 6.28l1.29-1.29a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }

  if (icon === "location") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4 text-[#f6a800]"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 21s7-5.33 7-12A7 7 0 0 0 5 9c0 6.67 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 text-[#ff5f57]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="geometry-theme min-h-screen overflow-hidden bg-[#dff7ff] text-[#101827] transition-colors duration-300 dark:bg-[#050713] dark:text-zinc-50">
      <div className="scroll-progress fixed left-0 top-0 z-50 h-1.5 w-full bg-[linear-gradient(90deg,#39ff14,#00d5ff,#ffd60a,#ff3d6e)]" />
      <div className="ambient-grid pointer-events-none fixed inset-0" />
      <div className="noise-panel pointer-events-none fixed inset-0" />
      <div aria-hidden="true" className="confetti-field pointer-events-none fixed inset-0">
        {confetti.map((color, index) => (
          <span
            className="confetti"
            key={`${color}-${index}`}
            style={confettiStyle(color, index)}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="sticky top-2 z-30 flex min-h-14 items-center justify-between gap-2 rounded-md border-2 border-zinc-950 bg-white/94 px-2.5 py-2 shadow-[5px_5px_0_#22c55e] backdrop-blur-md dark:border-zinc-50 dark:bg-[#0d1028]/94 dark:shadow-[5px_5px_0_#00d5ff] sm:px-3">
          <a
            className="logo-mark relative inline-flex h-10 min-w-11 items-center justify-center rounded-md border-2 border-zinc-950 bg-[#7dff6a] px-3 font-mono text-sm font-black uppercase text-zinc-950 shadow-[4px_4px_0_#ff2f6d] transition hover:-rotate-3 hover:scale-105 dark:border-zinc-50 dark:bg-[#39ff14] dark:shadow-[4px_4px_0_#ff3d6e]"
            href="#home"
          >
            JDR
          </a>

          <nav className="hidden items-center gap-1 rounded-md border-2 border-zinc-950 bg-[#f7fdff] p-1 text-sm font-black text-[#101827] shadow-[4px_4px_0_#0284c7] dark:border-zinc-50 dark:bg-[#0b1026] dark:text-white dark:shadow-[4px_4px_0_#00d5ff] md:flex">
            {navLinks.map((link, index) => (
              <a
                className="nav-link rounded-md px-3 py-2 transition"
                href={link.href}
                key={link.href}
                style={cardDelay(index)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="control-shell flex items-center gap-1 rounded-md border-2 border-zinc-950 bg-[#f7fdff] p-1 shadow-[4px_4px_0_#ffd60a] dark:border-zinc-50 dark:bg-[#0b1026]">
            <ThemeToggle />
            <a
              className="motion-card accent-contact inline-flex min-h-9 items-center justify-center gap-2 rounded-md bg-[#ff2f6d] px-3 py-2 text-sm font-black text-white transition focus:outline-none focus:ring-4 focus:ring-[#ffd60a]/60 dark:bg-[#ff3d6e] sm:px-4"
              href="#contact"
            >
              <span className="hidden min-[380px]:inline">Hire Me</span>
              <ArrowIcon />
            </a>
          </div>
        </header>

        <section
          className="home-level relative grid scroll-mt-24 items-center gap-6 overflow-hidden py-5 sm:gap-7 sm:py-6 md:min-h-[calc(100svh-82px)] md:grid-cols-[minmax(0,1.02fr)_minmax(17rem,0.78fr)] lg:gap-8 lg:py-4"
          id="home"
        >
          <div aria-hidden="true" className="spark-line left-[7%] top-[12%]" />
          <div aria-hidden="true" className="spark-line spark-line-two right-[11%] top-[18%]" />
          <div aria-hidden="true" className="level-platform level-platform-one" />
          <div aria-hidden="true" className="level-platform level-platform-two" />
          <div aria-hidden="true" className="spike-row" />

          <div className="relative z-10 max-w-2xl space-y-4 lg:space-y-5">
            <div
              className="animated-card hero-kicker inline-flex items-center gap-2 rounded-md border-2 border-zinc-950 bg-[#ffd60a] px-3 py-2 text-[0.7rem] font-black uppercase tracking-normal text-zinc-950 shadow-[4px_4px_0_#0284c7] dark:border-zinc-50 dark:shadow-[4px_4px_0_#00d5ff]"
              style={cardDelay(0)}
            >
              <span className="signal-dot h-2.5 w-2.5 rounded-sm bg-[#22c55e] dark:bg-[#39ff14]" />
              Level 01 - Full-stack runner
            </div>

            <div className="space-y-3">
              <h1 className="max-w-2xl text-4xl font-black leading-none tracking-normal text-[#101827] dark:text-white sm:text-5xl lg:text-6xl">
                Jimuel Dave Rodado
                <span className="title-spark mt-2 block text-2xl text-[#15803d] dark:text-[#39ff14] sm:text-3xl lg:text-5xl">
                  clears messy workflows one jump at a time.
                </span>
              </h1>
              <p className="wiggle-word inline-block rounded-md border-2 border-zinc-950 bg-[#67e8f9] px-3 py-1.5 text-base font-black text-zinc-950 shadow-[4px_4px_0_#ff2f6d] dark:border-zinc-50 dark:bg-[#00d5ff] dark:shadow-[4px_4px_0_#ff3d6e] sm:text-lg">
                Software Engineer
              </p>
              <p className="max-w-xl text-sm font-semibold leading-6 text-slate-700 dark:text-blue-50 sm:text-base sm:leading-7">
                Laravel-first systems for healthcare and enterprise teams:
                dashboards, workflows, APIs, automation, and maintainable code
                that lands cleanly.
              </p>
            </div>

            <div className="ticker-strip animated-card hidden overflow-hidden rounded-md border-2 border-zinc-950 bg-white py-2 text-[#101827] shadow-[5px_5px_0_#ffd60a] dark:border-zinc-50 dark:bg-[#0b1026] dark:text-white sm:block">
              <div className="ticker-track flex w-max items-center gap-2">
                {[...rhythmStrips, ...rhythmStrips].map((item, index) => (
                  <span
                    className="ticker-chip rounded-md border border-current px-3 py-1 text-xs font-black uppercase"
                    key={`${item}-${index}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
              {heroStats.map((stat, index) => (
                <article
                  className="animated-card metric-burst motion-card rounded-md border-2 border-zinc-950 bg-white p-3 shadow-[5px_5px_0_#0284c7] dark:border-zinc-50 dark:bg-[#111632] dark:shadow-[5px_5px_0_#0b1026] sm:p-4"
                  key={stat.label}
                  style={{
                    ...cardDelay(index + 1),
                    ...customStyle({ "--motion-accent": stat.accent }),
                  }}
                >
                  <p className="font-mono text-2xl font-black text-[#101827] dark:text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.65rem] font-black uppercase leading-4 text-slate-600 dark:text-blue-100 sm:text-xs">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {socialLinks.map((link, index) => (
                <a
                  aria-label={link.label}
                  className="animated-card motion-card accent-about grid h-10 w-10 place-items-center rounded-md border-2 border-zinc-950 bg-[#ffd60a] text-zinc-950 shadow-[4px_4px_0_#0284c7] transition dark:border-zinc-50 dark:shadow-[4px_4px_0_#0b1026] sm:h-11 sm:w-11"
                  href={link.href}
                  key={link.label}
                  rel={link.icon === "mail" ? undefined : "noreferrer"}
                  style={cardDelay(index + 4)}
                  target={link.icon === "mail" ? undefined : "_blank"}
                  title={link.label}
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                className="motion-card accent-contact inline-flex items-center gap-2 rounded-md border-2 border-zinc-950 bg-[#ff2f6d] px-4 py-2.5 text-sm font-black text-white shadow-[5px_5px_0_#0284c7] transition focus:outline-none focus:ring-4 focus:ring-[#ffd60a]/60 dark:border-zinc-50 dark:bg-[#ff3d6e] dark:shadow-[5px_5px_0_#0b1026] sm:px-5"
                href="#contact"
              >
                Start
                <ArrowIcon />
              </a>
              <a
                className="motion-card accent-about rounded-md border-2 border-zinc-950 bg-[#7dff6a] px-4 py-2.5 text-sm font-black text-zinc-950 shadow-[5px_5px_0_#0284c7] transition focus:outline-none focus:ring-4 focus:ring-[#00d5ff]/45 dark:border-zinc-50 dark:bg-[#39ff14] dark:shadow-[5px_5px_0_#0b1026] sm:px-5"
                href="#experience"
              >
                Experience
              </a>
            </div>
          </div>

          <div className="portrait-stage relative z-10 mx-auto w-full max-w-[18rem] sm:max-w-[22rem] md:ml-auto lg:max-w-[24rem]">
            {orbitNotes.map((note, index) => (
              <span
                className="orbit-chip absolute z-20 hidden rounded-md border-2 border-zinc-950 bg-white px-3 py-2 text-xs font-black uppercase text-zinc-950 shadow-[4px_4px_0_var(--orbit-accent)] dark:border-zinc-50 dark:bg-[#17162a] dark:text-zinc-50 sm:inline-flex"
                key={note.label}
                style={orbitStyle(note, index)}
              >
                {note.label}
              </span>
            ))}

            <div
              className="portrait-frame animated-card motion-card accent-contact relative overflow-hidden rounded-md border-2 border-zinc-950 bg-white p-2 shadow-[8px_8px_0_#22c55e] dark:border-zinc-50 dark:bg-[#0b1026] dark:shadow-[8px_8px_0_#00d5ff]"
              style={cardDelay(2)}
            >
              <Image
                alt="Portrait of Jimuel Dave Rodado."
                className="image-glitch h-56 w-full rounded-md object-cover object-[center_32%] sm:h-72 md:h-[24rem] lg:h-[27rem]"
                height={1536}
                priority
                src="/jim-cafe-portrait.png"
                width={1024}
              />
            </div>

            <div className="mini-terminal animated-card relative z-20 mt-3 w-full rounded-md border-2 border-zinc-950 bg-white p-3 text-[#101827] shadow-[5px_5px_0_#ff2f6d] dark:border-zinc-50 dark:bg-[#0b1026] dark:text-zinc-50 dark:shadow-[5px_5px_0_#ff3d6e] sm:absolute sm:-bottom-3 sm:left-3 sm:mt-0 sm:w-[82%]">
              <div className="terminal-lights mb-2 flex gap-1.5">
                <span className="bg-[#ff3d6e]" />
                <span className="bg-[#ffd60a]" />
                <span className="bg-[#39ff14]" />
              </div>
              <p className="font-mono text-[0.7rem] font-bold leading-5 text-[#15803d] dark:text-[#ccff00]">
                jump --queue --deploy
                <span className="terminal-cursor ml-1 inline-block h-4 w-2 bg-[#39ff14] align-middle" />
              </p>
            </div>
          </div>
        </section>

        <section
          className="scroll-reveal grid scroll-mt-28 gap-8 border-y-2 border-zinc-950 py-14 dark:border-zinc-50 lg:grid-cols-[0.7fr_1.3fr] lg:items-start"
          id="about"
        >
          <div>
            <p className="section-label inline-flex rounded-md border-2 border-zinc-950 bg-[#7c3aed] px-3 py-2 font-mono text-sm font-black uppercase text-white shadow-[4px_4px_0_#111827] dark:border-zinc-50">
              About
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-normal sm:text-5xl">
              Practical engineering, but the dashboard has a pulse.
            </h2>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="quirk-card scroll-reveal rounded-lg border-2 border-zinc-950 bg-white p-5 shadow-[8px_8px_0_#24c6a8] dark:border-zinc-50 dark:bg-[#17162a]">
              <div className="space-y-4 text-base font-medium leading-8 text-zinc-700 dark:text-zinc-200">
                <p>
                  I am a Full-Stack Developer with a Computer Engineering
                  background and a strong passion for scalable, maintainable,
                  and useful web applications.
                </p>
                <p>
                  My work spans hospital systems, healthcare workflows, ERP and
                  CRM platforms, internal automation, role-based access,
                  dashboards, APIs, and operational tools.
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {aboutCards.map((card, index) => (
                <article
                  className="animated-card scroll-reveal quirk-card motion-card rounded-lg border-2 border-zinc-950 bg-white p-4 shadow-[6px_6px_0_#111827] dark:border-zinc-50 dark:bg-[#17162a] sm:p-5"
                  key={card.title}
                  style={{
                    ...cardDelay(index),
                    ...customStyle({
                      "--motion-accent":
                        index === 0 ? "#24c6a8" : index === 1 ? "#ff5f57" : "#ffd166",
                    }),
                  }}
                >
                  <p className="font-mono text-xs font-black uppercase text-zinc-500 dark:text-zinc-300">
                    {card.title}
                  </p>
                  <h3 className="mt-3 text-xl font-black">{card.value}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-zinc-650 dark:text-zinc-300">
                    {card.copy}
                  </p>
                </article>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="quirk-card scroll-reveal rounded-lg border-2 border-zinc-950 bg-[#111827] p-5 text-white shadow-[8px_8px_0_#ff5f57] dark:border-zinc-50">
                <p className="font-mono text-xs font-black uppercase text-[#ffd166]">
                  Build temperament
                </p>
                <div className="mt-5 grid gap-4">
                  {labNotes.map((note, index) => (
                    <div key={note.label}>
                      <div className="flex items-center justify-between gap-3 text-sm font-black">
                        <span>{note.label}</span>
                        <span>{note.value}</span>
                      </div>
                      <span
                        className="meter-bar mt-2 block h-3 rounded-md border border-white/60 bg-white/10"
                        style={meterStyle(note.color, note.value, index)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="animated-card scroll-reveal quirk-card motion-card rounded-lg border-2 border-zinc-950 bg-white p-4 shadow-[8px_8px_0_#ffd166] dark:border-zinc-50 dark:bg-[#17162a] sm:p-5">
                <p className="font-mono text-xs font-black uppercase text-zinc-500 dark:text-zinc-300">
                  Stack
                </p>
                <ul
                  aria-label="Core technology stack"
                  className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:flex lg:flex-wrap"
                >
                  {coreStack.map((item, index) => (
                    <li className="flex justify-center" key={item.name}>
                      <span
                        aria-label={item.name}
                        className="stack-icon-tile group relative grid h-11 w-11 place-items-center rounded-md border-2 border-zinc-950 bg-[#fbfff4] text-[var(--stack-accent)] shadow-[3px_3px_0_#111827] transition focus:outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--stack-accent)_28%,transparent)] dark:border-zinc-50 dark:bg-[#100f1f] sm:h-12 sm:w-12"
                        role="img"
                        style={{
                          ...stackAccent(item.color),
                          ...cardDelay(index),
                        }}
                        tabIndex={0}
                        title={item.name}
                      >
                        <StackIcon icon={item.icon} />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 max-w-28 -translate-x-1/2 rounded-md border-2 border-zinc-950 bg-white px-2 py-1 text-center text-xs font-black leading-tight text-zinc-950 opacity-0 shadow-[3px_3px_0_#111827] transition group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-zinc-50 dark:bg-zinc-950 dark:text-zinc-50"
                        >
                          {item.name}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          className="scroll-reveal grid scroll-mt-28 gap-8 py-14 lg:grid-cols-[0.65fr_1.35fr]"
          id="experience"
        >
          <div className="space-y-5">
            <div>
              <p className="section-label inline-flex rounded-md border-2 border-zinc-950 bg-[#24c6a8] px-3 py-2 font-mono text-sm font-black uppercase text-zinc-950 shadow-[4px_4px_0_#111827] dark:border-zinc-50">
                Experience
              </p>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-normal sm:text-5xl">
                Healthcare reliability, enterprise workflow thinking.
              </h2>
            </div>
            <p className="text-base font-medium leading-8 text-zinc-700 dark:text-zinc-200">
              The through-line is practical software: dashboards, APIs,
              automation, user management, queues, tests, and clean workflows
              that support real teams.
            </p>
            <div className="desk-preview relative overflow-hidden rounded-lg border-2 border-zinc-950 bg-white p-2 shadow-[8px_8px_0_#7c3aed] dark:border-zinc-50 dark:bg-[#17162a]">
              <Image
                alt="Stylized workstation with healthcare dashboard visuals."
                className="h-44 w-full rounded-md object-cover"
                height={1024}
                src="/portfolio-hero.png"
                width={1536}
              />
            </div>
          </div>

          <div className="space-y-5">
            {experience.map((job, index) => (
              <article
                className="animated-card scroll-reveal timeline-card motion-card rounded-lg border-2 border-zinc-950 bg-white p-4 shadow-[8px_8px_0_#111827] dark:border-zinc-50 dark:bg-[#17162a] sm:p-5"
                key={`${job.company}-${job.role}`}
                style={{
                  ...cardDelay(index),
                  ...customStyle({
                    "--motion-accent":
                      index % 3 === 0 ? "#ff5f57" : index % 3 === 1 ? "#24c6a8" : "#ffd166",
                  }),
                }}
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="timeline-index flex h-12 w-12 shrink-0 items-center justify-center rounded-md border-2 border-zinc-950 bg-[#ffd166] font-mono text-sm font-black text-zinc-950 shadow-[4px_4px_0_#111827] dark:border-zinc-50">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-xl font-black">{job.role}</h3>
                    <p className="mt-1 font-black text-zinc-700 dark:text-zinc-200">
                      {job.company}
                    </p>
                    <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-300">
                      {job.meta}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3 text-sm font-medium leading-6 text-zinc-650 dark:text-zinc-300">
                  {job.points.map((point) => (
                    <li className="flex gap-3" key={point}>
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full border border-zinc-950 bg-[#ff5f57] dark:border-zinc-50" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          className="contact-section grid scroll-mt-28 gap-8 border-t-2 border-zinc-950 py-14 dark:border-zinc-50 lg:grid-cols-[0.85fr_1.15fr]"
          id="contact"
        >
          <div className="space-y-5">
            <p className="section-label inline-flex rounded-md border-2 border-zinc-950 bg-[#ff5f57] px-3 py-2 font-mono text-sm font-black uppercase text-zinc-950 shadow-[4px_4px_0_#111827] dark:border-zinc-50">
              Contact
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-normal sm:text-5xl">
              Have an idea, role, or project in mind? I&apos;d be glad to hear
              it.
            </h2>
            <p className="max-w-xl text-base font-medium leading-8 text-zinc-700 dark:text-zinc-200">
              Share your name, email, and a short note about what you&apos;re
              looking for. I&apos;ll read it carefully and reply with a clear
              next step.
            </p>
            <div className="contact-meter quirk-card rounded-lg border-2 border-zinc-950 bg-white p-4 text-[#101827] shadow-[8px_8px_0_#22c55e] dark:border-zinc-50 dark:bg-[#111632] dark:text-white dark:shadow-[8px_8px_0_#00d5ff]">
              <p className="font-mono text-xs font-black uppercase text-[#b45309] dark:text-[#ffd60a]">
                Signal board
              </p>
              <div className="mt-4 grid gap-3">
                {contactDetails.map((detail, index) => (
                  <div
                    className="animated-card motion-card flex items-center gap-3 rounded-md border-2 border-zinc-950 bg-[#f7fdff] px-4 py-3 text-sm text-[#101827] shadow-[3px_3px_0_#ffd60a] dark:border-zinc-50 dark:bg-[#0b1026] dark:text-white dark:shadow-[3px_3px_0_#00d5ff]"
                    key={detail.label}
                    style={cardDelay(index)}
                  >
                    <ContactDetailIcon icon={detail.icon} />
                    <span className="min-w-0">
                      <span className="block text-xs font-black uppercase text-slate-600 dark:text-zinc-300">
                        {detail.label}
                      </span>
                      <span className="mt-1 block break-words font-bold">
                        {detail.value}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ContactForm />
        </section>

        <footer className="site-footer border-t-2 border-zinc-950 py-12 text-[#101827] dark:border-[#00d5ff] dark:text-[#b9ecff]">
          <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr_1fr]">
            <div className="max-w-md">
              <h2 className="text-xl font-black text-zinc-950 dark:text-[#39ff14]">
                Jimuel Dave Rodado
              </h2>
              <p className="mt-5 text-sm font-medium leading-7">
                Software Engineer focused on full-stack development, healthcare
                systems, enterprise workflows, and clean, maintainable web
                applications.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-zinc-950 dark:text-[#39ff14]">
                Quick Links
              </h2>
              <nav className="mt-5 grid gap-3 text-sm font-bold">
                {navLinks.map((link) => (
                  <a className="nav-link w-max rounded-md px-2 py-1" href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h2 className="text-xl font-black text-zinc-950 dark:text-[#39ff14]">
                Get in Touch
              </h2>
              <div className="mt-5 grid gap-4 text-sm font-medium">
                <p className="flex min-w-0 items-center gap-3">
                  <ContactDetailIcon icon="mail" />
                  <span className="min-w-0 break-all">{contactEmail}</span>
                </p>
                <p className="flex min-w-0 items-center gap-3">
                  <ContactDetailIcon icon="phone" />
                  <span className="min-w-0 break-words">{contactPhone}</span>
                </p>
                <p className="flex min-w-0 items-center gap-3">
                  <ContactDetailIcon icon="location" />
                  <span className="min-w-0 break-words">
                    Davao City, Philippines
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t-2 border-zinc-950 pt-7 text-sm font-bold dark:border-[#00d5ff] sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; <CurrentYear /> Jimuel Dave Rodado. All rights reserved.
            </p>
            <a className="nav-link w-max rounded-md px-2 py-1" href="#contact">
              Let&apos;s connect.
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
