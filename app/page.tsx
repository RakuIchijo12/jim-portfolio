import type { CSSProperties } from "react";
import CurrentYear from "./current-year";
import DeferredContactForm from "./deferred-contact-form";
import ProjectCard from "./project-card";
import ThemeToggle from "./theme-toggle";

export const dynamic = "force-static";

const navLinks = [
  { href: "#home",       label: "Home"       },
  { href: "#about",      label: "About"      },
  { href: "#projects",   label: "Projects"   },
  { href: "#experience", label: "Experience" },
  { href: "#contact",    label: "Contact"    },
];

const contactEmail = "rjimueldave12@gmail.com";
const contactPhone  = "+63 976 317 0755";
const resumeHref    = "/resume/Rodado-Resume-2026.pdf";

const socialLinks = [
  { href: "https://www.linkedin.com/in/jimuel-dave-rodado-1731b9182/", label: "LinkedIn", icon: "linkedin" },
  { href: "https://github.com/RakuIchijo12",                           label: "GitHub",   icon: "github"   },
  { href: "https://www.facebook.com/jimueldave.rodado",                label: "Facebook", icon: "facebook" },
  { href: `mailto:${contactEmail}`,                                    label: "Email",    icon: "mail"     },
] as const;

const contactDetails = [
  { label: "Phone",    value: contactPhone,              icon: "phone"    },
  { label: "Email",    value: contactEmail,              icon: "mail"     },
  { label: "Location", value: "Davao City, Philippines", icon: "location" },
] as const;

const stackGroups = [
  { id: "frontend", label: "Frontend" },
  { id: "backend",  label: "Backend"  },
  { id: "ai",       label: "AI Tools" },
] as const;

const coreStack = [
  { name: "React",        icon: "react",        color: "#61dafb", group: "frontend" },
  { name: "Next.js",      icon: "next-js",      color: "#111827", group: "frontend" },
  { name: "Vue.js",       icon: "vue-js",       color: "#42b883", group: "frontend" },
  { name: "Angular",      icon: "angular",      color: "#dd0031", group: "frontend" },
  { name: "Alpine.js",    icon: "alpine-js",    color: "#77c1d2", group: "frontend" },
  { name: "Tailwind CSS", icon: "tailwind-css", color: "#38bdf8", group: "frontend" },
  { name: "Livewire",     icon: "livewire",     color: "#fb70b6", group: "frontend" },
  { name: "HTML5",        icon: "html5",        color: "#e34f26", group: "frontend" },
  { name: "CSS3",         icon: "css3",         color: "#1572b6", group: "frontend" },
  { name: "JavaScript",   icon: "javascript",   color: "#f7df1e", group: "frontend" },
  { name: "TypeScript",   icon: "typescript",   color: "#3178c6", group: "frontend" },
  { name: "Laravel",      icon: "laravel",      color: "#ff4d3d", group: "backend"  },
  { name: "Filament",     icon: "filament",     color: "#f6a800", group: "backend"  },
  { name: "PHP",          icon: "php",          color: "#777bb4", group: "backend"  },
  { name: "Composer",     icon: "composer",     color: "#8b5e34", group: "backend"  },
  { name: "Python",       icon: "python",       color: "#3776ab", group: "backend"  },
  { name: "Django",       icon: "django",       color: "#0c4b33", group: "backend"  },
  { name: "NestJS",       icon: "nestjs",       color: "#e0234e", group: "backend"  },
  { name: "MySQL",        icon: "mysql",        color: "#00758f", group: "backend"  },
  { name: "PostgreSQL",   icon: "postgresql",   color: "#336791", group: "backend"  },
  { name: "Claude",       icon: "claude",       color: "#D4806A", group: "ai"       },
  { name: "OpenAI",       icon: "openai",       color: "#CCCCCC", group: "ai"       },
  { name: "Codex",        icon: "codex",        color: "#7C83F0", group: "ai"       },
] as const;

const aboutCards = [
  {
    title: "Current Role",
    value: "Healthcare systems",
    copy:  "Daily work on hospital workflows where reliability, accuracy, and speed matter.",
  },
  {
    title: "Specialization",
    value: "Enterprise tools",
    copy:  "ERP, CRM, dashboards, user management, automation, and operational platforms.",
  },
  {
    title: "Education",
    value: "Computer Engineering",
    copy:  "Bachelor of Science from the University of Mindanao",
  },
];

const projects = [
  {
    id: "obsentry",
    name: "Obsentry",
    category: "Vehicle Tracking",
    tagline: "School vehicle monitoring — University of Mindanao",
    overview:
      "A web-based system to monitor data from GPS, gas sensors, and RFID. Built to help track untracked school vehicles at the University of Mindanao.",
    details: [
      "Arduino handles sensor data capture; an SSL/HTTP module sends data to the deployed web server.",
      "Socket.io paired with Leaflet.js powers real-time map updates and live sensor dashboards.",
    ],
    features: [
      "Real-time GPS tracking of vehicles",
      "Gas sensor data monitoring",
      "RFID, Gas Sensor, and GPS Sensor integration for passenger tracking",
      "Responsive web dashboard",
      "Authentication",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "Firebase", "GitHub"],
    images: [
      { src: "/projects/obsentry/obs1.webp", alt: "Obsentry - Image 1" },
      { src: "/projects/obsentry/obs2.webp", alt: "Obsentry - Image 2" },
      { src: "/projects/obsentry/obs3.webp", alt: "Obsentry - Image 3" },
      { src: "/projects/obsentry/obs4.webp", alt: "Obsentry - Image 4" },
      { src: "/projects/obsentry/obs5.webp", alt: "Obsentry - Image 5" },
    ],
    link: "https://um-obsentry.onrender.com/",
    linkLabel: "View Live Site",
  },
  {
    id: "eingress",
    name: "Eingress",
    category: "Door Lock System",
    tagline: "Door lock security & employee monitoring system",
    overview:
      "A door lock system built to secure and monitor a company building. The admin panel includes user management to track employees in and out, along with their personal details.",
    details: [
      "Understanding of UI/UX principles, browser dev tools, client-server architecture, rendering, and security.",
      "A robust REST API built with NestJS handles authentication, authorization, and all employee access records.",
    ],
    features: [
      "Secure door lock monitoring",
      "Employee access tracking",
      "Robust REST API with NestJS",
      "Relational database management",
      "Authentication and Authorization",
    ],
    technologies: ["HTML", "CSS", "TypeScript", "Angular", "Node.js", "NestJS", "PostgreSQL", "GitHub"],
    images: [
      { src: "/projects/eingress/Screenshot%202024-11-04%20102254.png", alt: "Eingress - Image 1" },
      { src: "/projects/eingress/Screenshot%202024-11-04%20102340.png", alt: "Eingress - Image 2" },
      { src: "/projects/eingress/Screenshot%202024-11-04%20102446.png", alt: "Eingress - Image 3" },
      { src: "/projects/eingress/Screenshot%202024-11-04%20102512.png", alt: "Eingress - Image 4" },
      { src: "/projects/eingress/Screenshot%202024-11-04%20102742.png", alt: "Eingress - Image 5" },
      { src: "/projects/eingress/Screenshot%202024-11-04%20102824.png", alt: "Eingress - Image 6" },
    ],
    link: "https://github.com/RakuIchijo12",
    linkLabel: "GitHub",
  },
] as const;

const experience = [
  {
    role: "Computer Programmer",
    company: "Southern Philippines Medical Center (SPMC)",
    meta: "Full-time | Apr 2026 - Present | Davao, Philippines | On-site",
    points: [
      "Developing and maintaining healthcare systems for critical daily operations.",
      "Supporting process automation, user management, internal workflows, and system maintenance.",
      "Turning fast-moving operational requirements into dependable web tools.",
      "Leveraging AI tools (Claude, OpenAI, Codex) to accelerate development, code review, and problem-solving.",
    ],
  },
  {
    role: "Full Stack Laravel Developer",
    company: "DevbeansPH",
    meta: "Full-time | Nov 2024 - Oct 2025 | Davao, Philippines | On-site",
    points: [
      "Built ERP and CRM features using Laravel, Filament PHP, Livewire, Tailwind CSS, and the TALL stack.",
      "Designed dashboards, CRUD modules, role-based authentication, RESTful APIs, and database workflows.",
      "Improved reliability with queues, jobs, events, caching, logs, debugging tools, and Pest PHP tests.",
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
  { value: "2+",  label: "years exp."    },
  { value: "35+", label: "technologies"  },
  { value: "3",   label: "industries"    },
];

const labNotes = [
  { label: "Reliability",         value: "97%", color: "#9E6F1E" },
  { label: "Code clarity",        value: "91%", color: "#3A7DAF" },
  { label: "Attention to detail", value: "99%", color: "#806090" },
];

function customStyle(properties: Record<string, string>): CSSProperties {
  return properties as CSSProperties;
}

function cardDelay(index: number, max = 300): CSSProperties {
  return customStyle({ "--delay": `${Math.min(index * 45, max)}ms` });
}

function stackAccent(color: string): CSSProperties {
  return customStyle({ "--stack-accent": color });
}

function meterStyle(color: string, width: string, index: number): CSSProperties {
  return customStyle({
    "--meter-accent": color,
    "--meter-width":  width,
    "--delay":        `${index * 120}ms`,
  });
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v5h5" />
      <path d="M12 11v6" />
      <path d="m9 14 3 3 3-3" />
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
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

const AI_ICON_PATHS: Record<string, string> = {
  claude: "/ai-icons/claude-color.png",
  codex:  "/ai-icons/codex-color.png",
  openai: "/ai-icons/openai.png",
};

function StackIcon({ icon }: { icon: string }) {
  const src = AI_ICON_PATHS[icon] ?? `/stack-icons/${icon}.png`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" aria-hidden="true" className="stack-icon-img"
      decoding="async" draggable={false} height={48} loading="lazy" src={src} width={48} />
  );
}

function ContactDetailIcon({ icon }: { icon: (typeof contactDetails)[number]["icon"] }) {
  if (icon === "phone") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L8 9.72a16 16 0 0 0 6.28 6.28l1.29-1.29a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }
  if (icon === "location") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 21s7-5.33 7-12A7 7 0 0 0 5 9c0 6.67 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-12 sm:mb-14">
      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-(--accent)" />
        <span className="font-mono text-[0.58rem] font-bold tracking-[0.22em] text-(--accent)">{num}</span>
        <span className="text-[0.65rem] font-black uppercase tracking-[0.22em]">{title}</span>
        <div className="h-px flex-1 bg-(--border)" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="ink-theme min-h-screen overflow-hidden transition-colors duration-300">
      {/* Top accent bar — gold shimmer */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[200] h-0.5"
        style={{ background: "linear-gradient(90deg, transparent, #7A5315 12%, #C9A84C 42%, #EDD890 65%, #C9A84C 88%, transparent)" }}
      />

      <div className="ambient-grid pointer-events-none fixed inset-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="sticky top-3 z-30 grid min-h-14 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-xl border bg-white/90 px-2.5 py-2 shadow-sm backdrop-blur-md sm:px-3 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
          <a
            className="logo-mark relative z-10 inline-flex h-11 min-w-12 items-center justify-center rounded-lg px-3 font-mono text-sm font-black uppercase transition hover:-rotate-2 hover:scale-105"
            href="#home"
          >
            JDR
          </a>

          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-lg border bg-white/95 p-1 text-sm font-semibold backdrop-blur-sm lg:flex">
            {navLinks.map((link, index) => (
              <a
                className="nav-link inline-flex min-h-9 items-center rounded-md px-3 py-2 transition hover:text-(--accent)"
                href={link.href}
                key={link.href}
                style={cardDelay(index)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="control-shell relative z-10 flex items-center justify-self-end gap-1 rounded-lg border bg-white/95 p-1 backdrop-blur-sm">
            <ThemeToggle />
            <a
              className="motion-card action-link action-link-primary accent-contact inline-flex min-h-9 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-(--accent)/30 sm:px-4"
              href="#contact"
            >
              <span className="hidden min-[380px]:inline">Hire Me</span>
              <ArrowIcon />
            </a>
          </div>
        </header>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section
          className="hero-luxe relative scroll-mt-24 py-20 sm:py-24 md:py-28"
          id="home"
        >
          <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:gap-7">

            {/* Role kicker */}
            <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-(--accent)">
              // Software Engineer
            </span>

            {/* Stacked name — full width centered */}
            <h1 className="hero-name-xl w-full">
              <span className="block">JIMUEL</span>
              <span className="block">DAVE</span>
              <span className="block">RODADO.</span>
            </h1>

            {/* Gold divider */}
            <div aria-hidden="true" className="h-px w-16 bg-(--accent) opacity-60" />

            {/* Specialty pill */}
            <span className="inline-block rounded-full bg-(--accent-light) px-5 py-1.5 font-mono text-sm font-bold text-(--accent)">
              Healthcare &amp; Enterprise
            </span>

            {/* Description */}
            <p className="max-w-lg text-base font-medium leading-7">
              I build solutions for healthcare and enterprise teams:
              dashboards, workflows, APIs, automation, and maintainable
              code that lands cleanly.
            </p>

            {/* Portrait — centered below text */}
            <div className="portrait-stage relative mx-auto mt-2 w-full max-w-[18rem] sm:max-w-88">
              <div
                className="portrait-frame animated-card relative overflow-hidden rounded-2xl border p-2 shadow-lg"
                style={cardDelay(2)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Portrait of Jimuel Dave Rodado."
                  className="image-glitch h-72 w-full rounded-xl object-cover object-[center_32%] sm:h-80"
                  decoding="async"
                  fetchPriority="high"
                  height={1154}
                  loading="eager"
                  src="/images/jim-cafe-portrait-optimized.webp"
                  width={768}
                />
              </div>

              {/* Mini terminal */}
              <div className="mini-terminal animated-card relative z-20 mt-3 w-full rounded-xl border p-3 sm:absolute sm:-bottom-3 sm:left-3 sm:mt-0 sm:w-[80%]">
                <div className="terminal-lights mb-2 flex gap-1.5">
                  <span className="bg-[#FF5F57]" />
                  <span className="bg-[#FEBC2E]" />
                  <span className="bg-[#28C840]" />
                </div>
                <p className="font-mono text-[0.7rem] font-bold leading-5 text-[#C9A84C]">
                  git push origin main
                  <span className="terminal-cursor ml-1 inline-block h-4 w-2 bg-[#C9A84C] align-middle" />
                </p>
              </div>
            </div>

            {/* Inline stats */}
            <div className="mt-4 flex items-stretch divide-x divide-(--border-strong)">
              {heroStats.map((stat) => (
                <div key={stat.label} className="pr-6 pl-6 first:pl-0 last:pr-0">
                  <span className="block font-mono text-2xl font-black sm:text-3xl">
                    {stat.value}
                  </span>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Social chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {socialLinks.map((link, index) => (
                <a
                  aria-label={link.label}
                  className="animated-card motion-card social-chip grid h-11 w-11 place-items-center rounded-lg border transition"
                  href={link.href}
                  key={link.label}
                  rel={link.icon === "mail" ? undefined : "noreferrer"}
                  style={cardDelay(index + 2)}
                  target={link.icon === "mail" ? undefined : "_blank"}
                  title={link.label}
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
              <a
                className="motion-card action-link action-link-primary accent-contact inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-(--accent)/25"
                href="#contact"
              >
                Get in Touch
                <ArrowIcon />
              </a>
              <a
                className="motion-card action-link action-link-secondary accent-about inline-flex min-h-11 items-center rounded-xl border px-5 py-2.5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-(--accent)/25"
                href="#experience"
              >
                Experience
              </a>
              <a
                aria-label="Open resume PDF in a new tab"
                className="motion-card action-link action-link-secondary accent-resume inline-flex min-h-11 items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold transition focus:outline-none"
                href={resumeHref}
                rel="noreferrer"
                target="_blank"
              >
                Resume
                <ResumeIcon />
              </a>
            </div>

          </div>
        </section>

        {/* ── About ──────────────────────────────────────────────────────── */}
        <section
          className="scroll-reveal scroll-mt-28 border-t py-16 sm:py-20"
          id="about"
        >
          <SectionHead num="01" title="About" />

          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-14">
            {/* Left: heading + bio */}
            <div className="space-y-5">
              <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                Clean engineering with a focus on reliability and delivery.
              </h2>
              <div className="space-y-4 text-base font-medium leading-8">
                <p>
                  I am a Software Engineer with a Computer Engineering
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

            {/* Right: tiles + work approach */}
            <div className="space-y-4 lg:sticky lg:top-28">
              <div className="grid gap-3 sm:grid-cols-3">
                {aboutCards.map((card, index) => (
                  <article
                    className="animated-card scroll-reveal about-tile quirk-card motion-card rounded-xl border p-4 sm:p-5"
                    key={card.title}
                    style={{
                      ...cardDelay(index),
                      ...customStyle({
                        "--motion-accent": index === 0 ? "#9E6F1E" : index === 1 ? "#3A7DAF" : "#806090",
                      }),
                    }}
                  >
                    <p className="font-mono text-xs font-bold uppercase tracking-wider">
                      {card.title}
                    </p>
                    <h3 className="mt-3 text-lg font-black leading-tight">{card.value}</h3>
                    <p className="mt-2 text-sm font-medium leading-6">{card.copy}</p>
                  </article>
                ))}
              </div>

              <div className="temperament-card quirk-card scroll-reveal rounded-xl border p-5">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-(--accent)">
                  Work approach
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {labNotes.map((note, index) => (
                    <div key={note.label}>
                      <div className="flex items-center justify-between gap-3 text-sm font-bold">
                        <span>{note.label}</span>
                        <span className="font-mono">{note.value}</span>
                      </div>
                      <span
                        className="meter-bar mt-2 block h-2.5 rounded-full border"
                        style={meterStyle(note.color, note.value, index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stack ──────────────────────────────────────────────────────── */}
        <section className="scroll-reveal border-t py-16 sm:py-20">
          <SectionHead num="02" title="Stack" />

          <div className="animated-card scroll-reveal stack-console">
            <div className="stack-layout">
              {stackGroups.map((group) => {
                const groupItems = coreStack.filter((item) => item.group === group.id);
                return (
                  <section
                    aria-labelledby={`stack-${group.id}`}
                    className={`stack-group stack-group-${group.id}`}
                    key={group.id}
                  >
                    <div className="stack-group-bar flex items-center justify-between gap-3">
                      <h4
                        className="stack-group-heading text-sm font-black uppercase leading-none tracking-widest sm:text-base"
                        id={`stack-${group.id}`}
                      >
                        {group.label}
                      </h4>
                    </div>
                    <ul aria-label={`${group.label} stack`} className="stack-grid mt-5">
                      {groupItems.map((item, index) => (
                        <li
                          className="stack-item group text-center"
                          key={item.name}
                          style={{ ...stackAccent(item.color), ...cardDelay(index, 200) }}
                        >
                          <span
                            aria-label={item.name}
                            className="stack-icon-tile"
                            role="img"
                            tabIndex={0}
                            title={item.name}
                          >
                            <StackIcon icon={item.icon} />
                          </span>
                          <span className="stack-label">{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Projects ───────────────────────────────────────────────────── */}
        <section
          className="scroll-reveal scroll-mt-28 border-t py-16 sm:py-20"
          id="projects"
        >
          <SectionHead num="03" title="Projects" />

          <div className="mb-8 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
            <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              Things I&apos;ve built.
            </h2>
            <p className="max-w-xs text-sm font-medium leading-6">
              IoT systems, real-time dashboards, and full-stack web applications.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* ── Experience ─────────────────────────────────────────────────── */}
        <section
          className="scroll-reveal scroll-mt-28 border-t py-16 sm:py-20"
          id="experience"
        >
          <SectionHead num="04" title="Experience" />

          <div className="mb-10 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              Healthcare reliability,<br className="hidden sm:block" /> enterprise workflow thinking.
            </h2>
            <p className="max-w-xs text-sm font-medium leading-6">
              Practical software: dashboards, APIs, automation, and clean
              workflows that support real teams.
            </p>
          </div>

          <div>
            {experience.map((job, index) => (
              <div
                className="exp-item relative border-t pl-5 py-7"
                key={`${job.company}-${job.role}`}
              >
                <div className="grid gap-5 sm:grid-cols-[220px_1fr] sm:gap-8">
                  {/* Left: index + company + meta */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[0.6rem] font-black tracking-[0.18em] text-(--accent)">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {job.meta.includes("Present") && (
                        <span className="rounded-full bg-(--accent) px-2 py-0.5 font-mono text-[0.58rem] font-bold text-white tracking-wide">
                          Current
                        </span>
                      )}
                    </div>
                    <span className="mt-2 block text-sm font-black leading-snug">
                      {job.company}
                    </span>
                    <span className="mt-1.5 block font-mono text-xs leading-5 text-(--muted)">
                      {job.meta.replace(/ \| /g, " · ")}
                    </span>
                  </div>

                  {/* Right: role + bullets */}
                  <div>
                    <h3 className="text-xl font-black leading-tight sm:text-2xl">
                      {job.role}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {job.points.map((point) => (
                        <li className="flex gap-3 text-sm leading-6" key={point}>
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t" />
          </div>
        </section>

        {/* ── Contact ────────────────────────────────────────────────────── */}
        <section
          className="scroll-reveal scroll-mt-28 border-t py-16 sm:py-20"
          id="contact"
        >
          <SectionHead num="05" title="Contact" />

          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            {/* Left: heading + info */}
            <div>
              <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                Have an idea, role, or project in mind? I&apos;d be glad to hear it.
              </h2>
              <p className="mt-4 max-w-md text-base font-medium leading-8">
                Share your name, email, and a short note about what you&apos;re
                looking for. I&apos;ll read it carefully and reply with a clear next step.
              </p>

              <div className="mt-8 space-y-5">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-(--accent-light) text-(--accent)">
                      <ContactDetailIcon icon={detail.icon} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">
                        {detail.label}
                      </p>
                      <span className="mt-0.5 block text-sm font-semibold wrap-break-word">
                        {detail.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <DeferredContactForm />
          </div>
        </section>

        <footer className="border-t py-6 text-center text-sm font-medium text-(--muted)">
          &copy; <CurrentYear /> Jimuel Dave Rodado. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
