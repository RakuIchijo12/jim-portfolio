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
  { name: "Laravel", icon: "laravel", color: "#ff2d20" },
  { name: "FilamentPHP", icon: "filament", color: "#f59e0b" },
  { name: "Livewire", icon: "livewire", color: "#ec4899" },
  { name: "Tailwind CSS", icon: "tailwind", color: "#38bdf8" },
  { name: "Alpine.js", icon: "alpine", color: "#0f766e" },
  { name: "MySQL", icon: "mysql", color: "#00758f" },
  { name: "Angular", icon: "angular", color: "#dd0031" },
  { name: "NestJS", icon: "nestjs", color: "#e0234e" },
  { name: "PostgreSQL", icon: "postgresql", color: "#336791" },
  { name: "PestPHP", icon: "pest", color: "#65a30d" },
  { name: "Queues", icon: "queues", color: "#8b5cf6" },
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

function cardDelay(index: number): CSSProperties {
  return { "--delay": `${index * 90}ms` } as CSSProperties;
}

function stackAccent(color: string): CSSProperties {
  return { "--stack-accent": color } as CSSProperties;
}

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  if (icon === "linkedin") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6.94 8.98H3.56V20h3.38V8.98ZM7.17 5.58A1.95 1.95 0 1 0 3.28 5.6a1.95 1.95 0 0 0 3.89-.02ZM20.72 13.7c0-3.18-1.7-4.97-4.28-4.97a3.69 3.69 0 0 0-3.33 1.83h-.05V8.98H9.82V20h3.37v-5.45c0-1.44.27-2.84 2.06-2.84 1.76 0 1.78 1.65 1.78 2.93V20h3.38l.31-6.3Z" />
      </svg>
    );
  }

  if (icon === "github") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.69c-2.77.6-3.36-1.18-3.36-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.1-4.54-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.05c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.33 4.66-4.55 4.91.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (icon === "facebook") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
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
  if (icon === "laravel") {
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
        <path d="M4 6.5 10 3l6 3.5v7L10 17 4 13.5Z" />
        <path d="M10 3v7l6 3.5M10 10 4 13.5" />
        <path d="M16 6.5 20 9v7l-6 3.5-4-2.5" />
      </svg>
    );
  }

  if (icon === "filament") {
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
        <rect height="6" rx="1.5" width="14" x="5" y="4" />
        <path d="M7 13h10M7 17h7" />
        <path d="M5 20h14" />
      </svg>
    );
  }

  if (icon === "livewire") {
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
        <path d="M3 12c2.2-4 4.4-4 6.6 0s4.4 4 6.6 0 4.4-4 6.6 0" />
        <path d="M3 16c2.2-2.4 4.4-2.4 6.6 0s4.4 2.4 6.6 0 4.4-2.4 6.6 0" />
      </svg>
    );
  }

  if (icon === "tailwind") {
    return (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6 10.5c1.6-3.2 4-4.2 7.2-3 1.8.7 2.9 2 4.8.9 1-.6 1.5-1.4 1.8-2.2-1.6 3.2-4 4.2-7.2 3-1.8-.7-2.9-2-4.8-.9-1 .6-1.5 1.4-1.8 2.2Z" />
        <path d="M3 16.5c1.6-3.2 4-4.2 7.2-3 1.8.7 2.9 2 4.8.9 1-.6 1.5-1.4 1.8-2.2-1.6 3.2-4 4.2-7.2 3-1.8-.7-2.9-2-4.8-.9-1 .6-1.5 1.4-1.8 2.2Z" />
      </svg>
    );
  }

  if (icon === "alpine") {
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
        <path d="m3 18 6.5-11 4 6 2-3L21 18Z" />
        <path d="m9.5 7 3.1 11M15.5 10l1.7 8" />
      </svg>
    );
  }

  if (icon === "mysql") {
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

  if (icon === "angular") {
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
        <path d="m12 3 8 3-1.3 11.1L12 21l-6.7-3.9L4 6Z" />
        <path d="m8.5 16 3.5-9 3.5 9M10 12.5h4" />
      </svg>
    );
  }

  if (icon === "nestjs") {
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

  if (icon === "postgresql") {
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
        <ellipse cx="10" cy="6" rx="6" ry="3" />
        <path d="M4 6v7c0 1.7 2.7 3 6 3s6-1.3 6-3V6" />
        <path d="M14.5 14.5 20 20M18.8 14.8l1.7 5.5-5.5-1.7" />
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

  if (icon === "queues") {
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
        <path d="M5 7h11M5 12h11M5 17h11" />
        <path d="m16 5 3 2-3 2M16 10l3 2-3 2M16 15l3 2-3 2" />
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
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <path d="M8.3 11 15.8 8M8.3 13l7.5 3" />
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
        className="h-4 w-4 text-teal-600 dark:text-teal-300"
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
        className="h-4 w-4 text-yellow-500"
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
      className="h-4 w-4 text-coral"
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
    <main className="min-h-screen bg-[#fbfaf7] text-zinc-950 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="scroll-progress fixed left-0 top-0 z-50 h-1 w-full bg-teal-700 dark:bg-teal-300" />
      <div className="ambient-grid pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(24,24,27,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,27,0.045)_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(rgba(250,250,250,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(250,250,250,0.055)_1px,transparent_1px)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-3 border-b border-zinc-200 bg-[#fbfaf7]/90 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/88">
          <a
            className="font-mono text-sm font-semibold uppercase tracking-[0.18em]"
            href="#home"
          >
            JDR
          </a>

          <nav className="hidden items-center gap-1 rounded-lg border border-zinc-200 bg-white p-1 text-sm font-medium text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 md:flex">
            {navLinks.map((link) => (
              <a
                className="rounded-md px-3 py-2 transition hover:bg-yellow-100 hover:text-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-white"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white p-1 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900">
            <ThemeToggle />
            <a
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-200 dark:bg-teal-400 dark:text-zinc-950 dark:hover:bg-teal-300 dark:focus:ring-teal-500/25"
              href="#contact"
            >
              <span>Hire Me</span>
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
            </a>
          </div>
        </header>

        <section
          className="grid scroll-mt-24 items-center gap-6 overflow-hidden py-8 sm:gap-8 sm:py-10 md:min-h-[calc(100svh-64px)] md:grid-cols-[1fr_0.86fr] lg:py-6"
          id="home"
        >
          <div className="max-w-2xl space-y-4">
            <div
              className="animated-card motion-card accent-teal inline-flex items-center gap-3 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-normal text-zinc-650 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              style={cardDelay(0)}
            >
              <span className="h-2 w-2 bg-emerald-500" />
              Available for full-stack opportunities
            </div>

            <div className="space-y-3">
              <h1 className="max-w-2xl text-3xl font-normal leading-tight tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-4xl lg:text-[2.75rem]">
                Jimuel Dave Rodado
              </h1>
              <p className="text-lg font-normal text-teal-700 dark:text-teal-300 sm:text-xl">
                Software Engineer
              </p>
              <p className="max-w-xl text-sm font-normal leading-7 text-zinc-650 dark:text-zinc-300 sm:text-base">
                I build clean Laravel-first systems for healthcare and
                enterprise teams, with a practical approach to dashboards,
                workflows, APIs, and maintainable code.
              </p>
            </div>

            <div className="grid max-w-sm grid-cols-2 gap-2">
              {["Healthcare", "ERP/CRM"].map((item, index) => (
                <div
                  className="animated-card motion-card accent-teal rounded-md border border-zinc-200 bg-white px-3 py-3 text-center text-xs font-normal text-zinc-650 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  key={item}
                  style={cardDelay(index + 1)}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  aria-label={link.label}
                  className="animated-card motion-card accent-teal grid h-10 w-10 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-650 shadow-sm hover:text-teal-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-teal-300"
                  href={link.href}
                  key={link.label}
                  rel={link.icon === "mail" ? undefined : "noreferrer"}
                  style={cardDelay(4)}
                  target={link.icon === "mail" ? undefined : "_blank"}
                  title={link.label}
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                className="motion-card accent-teal rounded-md bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition dark:bg-teal-500 dark:text-zinc-950"
                href="#contact"
              >
                Start a conversation
              </a>
              <a
                className="motion-card accent-about rounded-md border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold transition dark:border-zinc-700 dark:bg-zinc-900"
                href="#experience"
              >
                View experience
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[22rem] md:ml-auto lg:max-w-[24rem]">
            <div className="floating-accent absolute -left-3 top-8 hidden h-20 w-20 rounded-md border border-zinc-950 bg-yellow-300 dark:border-zinc-100 sm:block" />
            <div className="floating-accent floating-accent-two absolute -right-3 -top-3 hidden h-14 w-14 rounded-md border border-zinc-950 bg-coral dark:border-zinc-100 sm:block" />
            <div className="floating-accent floating-accent-three absolute -bottom-4 left-10 hidden h-12 w-28 rounded-md border border-zinc-950 bg-teal-500 dark:border-zinc-100 sm:block" />
            <div
              className="animated-card motion-card accent-teal relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-2 shadow-[0_24px_70px_-45px_rgba(24,24,27,0.45)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_24px_70px_-45px_rgba(20,184,166,0.42)]"
              style={cardDelay(2)}
            >
              <Image
                alt="Portrait of Jimuel Dave Rodado."
                className="h-[34svh] min-h-56 max-h-[26rem] w-full rounded-md object-cover object-[center_34%] sm:h-[46svh] md:h-[62svh] md:max-h-none"
                height={1536}
                priority
                src="/jim-cafe-portrait.png"
                width={1024}
              />
            </div>
          </div>
        </section>

        <section
          className="scroll-reveal grid scroll-mt-24 gap-8 border-y border-zinc-200 py-12 dark:border-zinc-800 sm:py-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-start"
          id="about"
        >
          <div>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-coral">
              About
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
              Practical engineering for systems people actually depend on.
            </h2>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="space-y-4 text-base leading-8 text-zinc-700 dark:text-zinc-300">
              <p>
                I am a Full-Stack Developer with a Computer Engineering
                background and a strong passion for scalable, maintainable, and
                useful web applications.
              </p>
              <p>
                My work spans hospital systems, healthcare workflows, ERP and CRM
                platforms, internal automation, role-based access, dashboards,
                APIs, and operational tools.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {aboutCards.map((card, index) => (
                <article
                  className="animated-card scroll-reveal motion-card accent-about rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5"
                  key={card.title}
                  style={cardDelay(index)}
                >
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                    {card.title}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{card.value}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-650 dark:text-zinc-300">
                    {card.copy}
                  </p>
                </article>
              ))}
            </div>

            <div className="animated-card scroll-reveal motion-card accent-teal rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Stack
              </p>
              <ul
                aria-label="Core technology stack"
                className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:flex lg:flex-wrap"
              >
                {coreStack.map((item) => (
                  <li key={item.name}>
                    <span
                      aria-label={item.name}
                      className="stack-icon-tile group relative grid h-11 w-11 place-items-center rounded-md border border-zinc-200 bg-[#fbfaf7] text-[var(--stack-accent)] shadow-sm transition hover:-translate-y-1 hover:border-[var(--stack-accent)] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--stack-accent)_28%,transparent)] dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-900 sm:h-12 sm:w-12"
                      role="img"
                      style={stackAccent(item.color)}
                      tabIndex={0}
                      title={item.name}
                    >
                      <StackIcon icon={item.icon} />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-900 bg-zinc-950 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950"
                      >
                        {item.name}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="scroll-reveal grid scroll-mt-24 gap-8 py-12 sm:py-14 lg:grid-cols-[0.65fr_1.35fr]"
          id="experience"
        >
          <div className="space-y-5">
            <div>
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
                Experience
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
                Healthcare reliability, enterprise workflow thinking.
              </h2>
            </div>
            <p className="text-base leading-8 text-zinc-700 dark:text-zinc-300">
              The through-line is practical software: dashboards, APIs,
              automation, user management, queues, tests, and clean workflows
              that support real teams.
            </p>
          </div>

          <div className="space-y-4">
            {experience.map((job, index) => (
              <article
                className="animated-card scroll-reveal motion-card accent-experience rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5"
                key={`${job.company}-${job.role}`}
                style={cardDelay(index)}
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-900 bg-[#fbfaf7] font-mono text-sm font-bold dark:border-zinc-100 dark:bg-zinc-950">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{job.role}</h3>
                    <p className="mt-1 font-medium text-zinc-700 dark:text-zinc-300">
                      {job.company}
                    </p>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                      {job.meta}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-650 dark:text-zinc-300">
                  {job.points.map((point) => (
                    <li className="flex gap-3" key={point}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-coral" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          className="scroll-reveal grid scroll-mt-24 gap-8 border-t border-zinc-200 py-12 dark:border-zinc-800 sm:py-14 lg:grid-cols-[0.85fr_1.15fr]"
          id="contact"
        >
          <div className="space-y-5">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
              Contact
            </p>
            <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">
              Have an idea, role, or project in mind? I&apos;d be glad to hear it.
            </h2>
            <p className="max-w-xl text-base leading-8 text-zinc-700 dark:text-zinc-300">
              Share your name, email, and a short note about what you&apos;re
              looking for. I&apos;ll read it carefully and reply with a clear next
              step.
            </p>
            <div className="grid gap-3 pt-2">
              {contactDetails.map((detail, index) => (
                <div
                  className="animated-card scroll-reveal motion-card accent-teal flex items-center gap-3 rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-650 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  key={detail.label}
                  style={cardDelay(index)}
                >
                  <ContactDetailIcon icon={detail.icon} />
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                      {detail.label}
                    </span>
                    <span className="mt-1 block break-words">
                      {detail.value}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </section>

        <footer className="scroll-reveal border-t border-zinc-200 py-12 text-zinc-650 dark:border-zinc-800 dark:text-zinc-300">
          <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr_1fr]">
            <div className="max-w-md">
              <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                Jimuel Dave Rodado
              </h2>
              <p className="mt-5 text-sm leading-7">
                Software Engineer focused on full-stack development, healthcare
                systems, enterprise workflows, and clean, maintainable web
                applications.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                Quick Links
              </h2>
              <nav className="mt-5 grid gap-3 text-sm">
                {navLinks.map((link) => (
                  <a
                    className="transition hover:text-teal-700 dark:hover:text-teal-300"
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                Get in Touch
              </h2>
              <div className="mt-5 grid gap-4 text-sm">
                <p className="flex items-center gap-3">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 text-coral"
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
                  {contactEmail}
                </p>
                <p className="flex items-center gap-3">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 text-teal-600 dark:text-teal-300"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L8 9.72a16 16 0 0 0 6.28 6.28l1.29-1.29a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  {contactPhone}
                </p>
                <p className="flex items-center gap-3">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 text-yellow-500"
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
                  Davao City, Philippines
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-zinc-200 pt-7 text-sm dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; <CurrentYear /> Jimuel Dave Rodado. All rights reserved.
            </p>
            <a
              className="transition hover:text-teal-700 dark:hover:text-teal-300"
              href="#contact"
            >
              Let&apos;s connect.
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
