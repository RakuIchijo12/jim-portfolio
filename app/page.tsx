import type { CSSProperties } from "react";
import Image from "next/image";
import AudioControl from "./audio-control";
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
  { name: "Filament PHP", icon: "filament", color: "#f6a800" },
  { name: "Livewire", icon: "livewire", color: "#ff4d9d" },
  { name: "Tailwind CSS", icon: "tailwind", color: "#16b8f3" },
  { name: "React", icon: "react", color: "#61dafb" },
  { name: "Alpine.js", icon: "alpine", color: "#0f9f89" },
  { name: "MySQL", icon: "mysql", color: "#00758f" },
  { name: "Angular", icon: "angular", color: "#dd0031" },
  { name: "Django", icon: "django", color: "#0c4b33" },
  { name: "NestJS", icon: "nestjs", color: "#e0234e" },
  { name: "PostgreSQL", icon: "postgresql", color: "#336791" },
  { name: "Pest PHP", icon: "pest", color: "#72b01d" },
  { name: "Figma", icon: "figma", color: "#a259ff" },
  { name: "Postman", icon: "postman", color: "#ff6c37" },
  { name: "TablePlus", icon: "tableplus", color: "#f59e0b" },
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
  { value: "4", label: "lanes", accent: "#ff4fd8" },
  { value: "17", label: "tools", accent: "#48f5ff" },
  { value: "99%", label: "focus", accent: "#b8ff5c" },
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
  { label: "API gate", x: "3%", y: "8%", color: "#48f5ff" },
  { label: "CRUD jump", x: "66%", y: "3%", color: "#ff4fd8" },
  { label: "Ops shield", x: "64%", y: "70%", color: "#b8ff5c" },
  { label: "UI coin", x: "1%", y: "66%", color: "#ffe66d" },
];

const labNotes = [
  { label: "Reliability", value: "97%", color: "#48f5ff" },
  { label: "Workflow clarity", value: "91%", color: "#ff4fd8" },
  { label: "Debug patience", value: "99%", color: "#b8ff5c" },
];

const cometColors = [
  "#0284c7",
  "#0f766e",
  "#be185d",
  "#f59e0b",
  "#6366f1",
  "#334155",
  "#21d4fd",
  "#7c5cff",
  "#0891b2",
  "#c026d3",
  "#0369a1",
  "#475569",
  "#0891b2",
  "#9333ea",
  "#0e7490",
  "#b45309",
  "#2563eb",
  "#db2777",
  "#155e75",
  "#4f46e5",
  "#14b8a6",
  "#f97316",
  "#64748b",
  "#7c3aed",
];

const fallingCometColors = cometColors.slice(0, 7);
const twinkleStars = Array.from({ length: 28 }, (_, index) => index);
const rollingStars = Array.from({ length: 8 }, (_, index) => index);

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

function twinkleStarStyle(index: number): CSSProperties {
  return customStyle({
    "--twinkle-color": cometColors[index % cometColors.length],
    "--twinkle-delay": `${index * -0.31}s`,
    "--twinkle-duration": `${2.2 + (index % 7) * 0.38}s`,
    "--twinkle-left": `${(index * 17 + 9) % 100}%`,
    "--twinkle-size": `${0.38 + (index % 5) * 0.13}rem`,
    "--twinkle-top": `${(index * 23 + 7) % 100}%`,
  });
}

function rollingStarStyle(index: number): CSSProperties {
  const direction = index % 2 === 0 ? 1 : -1;
  const drift = 18 + (index % 5) * 8;
  const scale = 0.82 + (index % 4) * 0.08;

  return customStyle({
    "--rolling-star-color": cometColors[(index * 3 + 2) % cometColors.length],
    "--rolling-star-delay": `${index * -0.74}s`,
    "--rolling-star-duration": `${5.8 + (index % 6) * 0.74}s`,
    "--rolling-star-end-x": `${direction * drift}vw`,
    "--rolling-star-left": `${(index * 13 + 4) % 98}%`,
    "--rolling-star-mid-x": `${direction * drift * 0.52}vw`,
    "--rolling-star-opacity": `${0.68 + (index % 4) * 0.07}`,
    "--rolling-star-end-scale": `${scale * 0.78}`,
    "--rolling-star-scale": `${scale}`,
    "--rolling-star-start-scale": `${scale * 0.74}`,
    "--rolling-star-size": `${0.75 + (index % 4) * 0.16}rem`,
    "--rolling-star-spin": `${direction * (720 + (index % 3) * 180)}deg`,
    "--rolling-star-spin-mid": `${direction * (340 + (index % 3) * 90)}deg`,
    "--rolling-star-start-x": `${direction * -14}vw`,
  });
}

function cometStyle(color: string, index: number): CSSProperties {
  const direction = index % 2 === 0 ? 1 : -1;
  const drift = 24 + (index % 6) * 6;
  const scale = 0.72 + (index % 5) * 0.05;

  return customStyle({
    "--comet-angle": `${direction === 1 ? 29 + (index % 4) * 3 : 151 - (index % 4) * 3}deg`,
    "--comet-boost-scale": `${scale + 0.06}`,
    "--comet-color": color,
    "--comet-delay": `${index * -1.65}s`,
    "--comet-duration": `${11.4 + (index % 5) * 0.9}s`,
    "--comet-end-x": `${direction * drift}vw`,
    "--comet-head-size": `${0.86 + (index % 3) * 0.11}rem`,
    "--comet-height": `${0.68 + (index % 4) * 0.09}rem`,
    "--comet-intro-x": `${direction * -13}vw`,
    "--comet-left": `${(index * 11 + 5) % 96}%`,
    "--comet-mid-x": `${direction * drift * 0.44}vw`,
    "--comet-opacity": `${0.34 + (index % 4) * 0.05}`,
    "--comet-pre-end-x": `${direction * drift * 0.88}vw`,
    "--comet-scale": `${scale}`,
    "--comet-start-x": `${direction * -18}vw`,
    "--comet-width": `${6.8 + (index % 5) * 0.82}rem`,
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
  if (icon === "laravel") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M5 7.5 12 3l7 4.5v8.5l-7 4.5L5 16Z" />
        <path d="M5 7.5 12 12l7-4.5" />
        <path d="M12 12v8.5" />
        <path d="M8.5 5.3v4.5l7 4.4v-4.5" />
      </svg>
    );
  }

  if (icon === "filament") {
    return (
      <svg aria-hidden="true" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.8c3.2 2.4 4.9 4.8 4.9 7.3 0 2.1-1 3.8-2.2 5.5-1 1.5-2.2 3-2.7 5.6-.5-2.6-1.7-4.1-2.7-5.6-1.2-1.7-2.2-3.4-2.2-5.5 0-2.5 1.7-4.9 4.9-7.3Z" />
        <path d="M12 7.4c1.5 1.3 2.2 2.6 2.2 3.9 0 1.4-.8 2.5-2.2 3.8-1.4-1.3-2.2-2.4-2.2-3.8 0-1.3.7-2.6 2.2-3.9Z" fill="#fff" opacity="0.72" />
      </svg>
    );
  }

  if (icon === "livewire") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M3 12.8c2.2-4 4.7-4 7.3 0s5.1 4 7.4 0" />
        <path d="M6 17c2-2.2 4-2.2 6 0s4 2.2 6 0" />
        <circle cx="7.2" cy="9" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="16.8" cy="15" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (icon === "tailwind") {
    return (
      <svg aria-hidden="true" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 10.5c1.6-3.2 4-4.2 7.2-3 1.8.7 2.9 2 4.8.9 1-.6 1.5-1.4 1.8-2.2-1.6 3.2-4 4.2-7.2 3-1.8-.7-2.9-2-4.8-.9-1 .6-1.5 1.4-1.8 2.2Z" />
        <path d="M3 16.5c1.6-3.2 4-4.2 7.2-3 1.8.7 2.9 2 4.8.9 1-.6 1.5-1.4 1.8-2.2-1.6 3.2-4 4.2-7.2 3-1.8-.7-2.9-2-4.8-.9-1 .6-1.5 1.4-1.8 2.2Z" />
      </svg>
    );
  }

  if (icon === "react") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        <ellipse cx="12" cy="12" rx="9" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" fill="currentColor" r="1.4" stroke="none" />
      </svg>
    );
  }

  if (icon === "alpine") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M3.5 18 9.5 7l3.1 5.2L15 8l5.5 10Z" />
        <path d="m9.5 7 3.1 11" />
        <path d="m15 8-2.4 4.2" />
      </svg>
    );
  }

  if (icon === "mysql") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <ellipse cx="12" cy="7" rx="7" ry="3" />
        <path d="M5 7v6c0 1.7 3.1 3 7 3s7-1.3 7-3V7" />
        <path d="M8.3 17.4c1.1.4 2.4.6 3.7.6 2.6 0 5-.8 6.2-2" />
        <path d="M15.6 5.1c1.4-1 2.9-1 4.5-.2-.9.6-1.3 1.3-1.4 2.3" />
      </svg>
    );
  }

  if (icon === "angular") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M12 3 20 7.2l-1.3 10.3L12 21l-6.7-3.5L4 7.2Z" />
        <path d="M8.2 17 12 7l3.8 10" />
        <path d="M9.4 14h5.2" />
      </svg>
    );
  }

  if (icon === "django") {
    return (
      <svg aria-hidden="true" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.7 4.2h3.2v11.9c-1 .5-2.3.8-3.7.8-3.2 0-5.2-1.8-5.2-4.8 0-3.2 2.2-5 5.3-5 .2 0 .4 0 .4.1v-3Zm0 5.9a2.5 2.5 0 0 0-.8-.1c-1.1 0-1.8.8-1.8 2s.7 2 1.9 2c.3 0 .5 0 .7-.1v-3.8Z" />
        <path d="M15.2 7.4h3.1v9.5c0 2.5-1.4 3.8-4.2 3.8-.8 0-1.5-.1-2.2-.3l.3-2.4c.5.2 1 .2 1.5.2 1 0 1.5-.5 1.5-1.5V7.4Zm0-3.3h3.1v2.2h-3.1V4.1Z" />
      </svg>
    );
  }

  if (icon === "nestjs") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M12 3 20 8v8l-8 5-8-5V8Z" />
        <path d="M8 16V8l8 8V8" />
        <path d="M6.2 6.6 4 5.3" />
        <path d="m17.8 6.6 2.2-1.3" />
      </svg>
    );
  }

  if (icon === "postgresql") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M8 18c-1.6-1.4-2.5-3.3-2.5-5.4 0-4 3-7.1 6.9-7.1 3.5 0 6.1 2.6 6.1 6.1 0 2.2-1.1 4.1-2.8 5.3" />
        <path d="M12 10v8.5c0 1.2-.9 2-2.1 2H8.8" />
        <path d="M14 11.2c1.4.2 2.6 1 3.5 2.1" />
        <path d="M9.3 9.7h.1" />
        <path d="M15.3 9.7h.1" />
      </svg>
    );
  }

  if (icon === "pest") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4v3c0 2.2-1.8 4-4 4s-4-1.8-4-4Z" />
        <path d="M9 6.2 10.2 8" />
        <path d="M15 6.2 13.8 8" />
        <path d="M6 13H3.8" />
        <path d="M20.2 13H18" />
        <path d="m10 13.5 1.4 1.5 3-3.5" />
      </svg>
    );
  }

  if (icon === "figma") {
    return (
      <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
        <path
          d="M10 3h4a3 3 0 0 1 0 6h-4V3Z"
          fill="currentColor"
          opacity="0.96"
        />
        <path
          d="M10 9h4a3 3 0 0 1 0 6h-4V9Z"
          fill="currentColor"
          opacity="0.72"
        />
        <path
          d="M10 15h3a3 3 0 1 1-3-3v3Z"
          fill="currentColor"
          opacity="0.84"
          transform="translate(0 3)"
        />
        <path d="M7 3h3v6H7a3 3 0 0 1 0-6Z" fill="currentColor" opacity="0.88" />
        <path d="M7 9h3v6H7a3 3 0 0 1 0-6Z" fill="currentColor" opacity="0.64" />
      </svg>
    );
  }

  if (icon === "postman") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8.3 13.4 6.9-6.2 1.6 1.6-6.2 6.9-3.2.9Z" />
        <path d="m12.1 11.7 2.2 2.2" />
        <path d="M15.4 7.4 17 5.8" />
      </svg>
    );
  }

  if (icon === "tableplus") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <rect height="13" rx="2.2" width="16" x="4" y="5" />
        <path d="M4 9h16" />
        <path d="M9.4 5v13" />
        <path d="M14.8 5v13" />
        <path d="M6.8 13.5H18" />
        <path d="M17.4 14.9v5.2" />
        <path d="M14.8 17.5H20" />
      </svg>
    );
  }

  if (icon === "queues") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M6 7h10a3 3 0 0 1 0 6H8a3 3 0 1 0 0 6h10" />
        <path d="m16 4 3 3-3 3" />
        <path d="m8 16-3 3 3 3" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M8 8 4 12l4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m14 5-4 14" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
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
        className="h-4 w-4 text-[#48f5ff]"
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
        className="h-4 w-4 text-[#ffe66d]"
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
      className="h-4 w-4 text-[#ff4fd8]"
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
    <main className="geometry-theme space-theme min-h-screen overflow-hidden bg-[#edf8ff] text-[#0f172a] transition-colors duration-300 dark:bg-[#02040d] dark:text-[#eaf6ff]">
      <div className="scroll-progress fixed left-0 top-0 z-50 h-1.5 w-full bg-[linear-gradient(90deg,#48f5ff,#b8ff5c,#ff4fd8,#ffe66d)]" />
      <div className="ambient-grid pointer-events-none fixed inset-0" />
      <div className="noise-panel pointer-events-none fixed inset-0" />
      <div aria-hidden="true" className="space-effect-field pointer-events-none fixed inset-0">
        {twinkleStars.map((star) => (
          <span
            className="twinkle-star"
            key={`star-${star}`}
            style={twinkleStarStyle(star)}
          />
        ))}
        {rollingStars.map((star) => (
          <span
            className="rolling-falling-star"
            key={`rolling-star-${star}`}
            style={rollingStarStyle(star)}
          />
        ))}
        {fallingCometColors.map((color, index) => (
          <span
            className="comet"
            key={`comet-${color}-${index}`}
            style={cometStyle(color, index)}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="sticky top-2 z-30 flex min-h-14 items-center justify-between gap-2 rounded-md border-2 border-[#78e5ff]/60 bg-[#061329]/90 px-2.5 py-2 shadow-[0_0_28px_#48f5ff33] backdrop-blur-md dark:border-[#78e5ff]/60 dark:bg-[#02040d]/92 dark:shadow-[0_0_32px_#48f5ff33] sm:px-3">
          <a
            className="logo-mark relative inline-flex h-11 min-w-12 items-center justify-center rounded-md border-2 border-[#eaf6ff]/80 bg-[linear-gradient(135deg,#48f5ff,#b8ff5c)] px-3 font-mono text-sm font-black uppercase text-[#03111f] shadow-[4px_4px_0_#ff4fd866] transition hover:-rotate-3 hover:scale-105 dark:border-[#eaf6ff]/80 dark:bg-[linear-gradient(135deg,#48f5ff,#b8ff5c)] dark:shadow-[4px_4px_0_#ff4fd866]"
            href="#home"
          >
            JDR
          </a>

          <nav className="hidden items-center gap-1 rounded-md border-2 border-[#78e5ff]/50 bg-[#07172c]/80 p-1 text-sm font-black text-[#eaf6ff] shadow-[0_0_22px_#48f5ff2e] dark:border-[#78e5ff]/50 dark:bg-[#07172c]/80 dark:text-[#eaf6ff] dark:shadow-[0_0_22px_#48f5ff2e] md:flex">
            {navLinks.map((link, index) => (
              <a
                className="nav-link inline-flex min-h-11 items-center rounded-md px-3 py-2 transition"
                href={link.href}
                key={link.href}
                style={cardDelay(index)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="control-shell flex items-center gap-1 rounded-md border-2 border-[#78e5ff]/50 bg-[#07172c]/80 p-1 shadow-[0_0_22px_#48f5ff2e] dark:border-[#78e5ff]/50 dark:bg-[#07172c]/80">
            <ThemeToggle />
            <AudioControl />
            <a
              className="motion-card accent-contact inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[linear-gradient(135deg,#ff4fd8,#7c5cff)] px-3 py-2 text-sm font-black text-white transition focus:outline-none focus:ring-4 focus:ring-[#48f5ff]/35 dark:bg-[linear-gradient(135deg,#ff4fd8,#7c5cff)] sm:px-4"
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
              className="animated-card hero-kicker inline-flex items-center gap-2 rounded-md border-2 border-[#eaf6ff]/80 bg-[linear-gradient(90deg,#48f5ff,#b8ff5c)] px-3 py-2 text-[0.7rem] font-black uppercase tracking-normal text-[#03111f] shadow-[4px_4px_0_#ff4fd866] dark:border-[#eaf6ff]/80 dark:shadow-[4px_4px_0_#ff4fd866]"
              style={cardDelay(0)}
            >
              <span className="signal-dot h-2.5 w-2.5 rounded-sm bg-[#b8ff5c] dark:bg-[#b8ff5c]" />
              Level 01 - Full-stack runner
            </div>

            <div className="space-y-3">
              <h1 className="max-w-2xl text-4xl font-black leading-none tracking-normal text-[#f4fbff] dark:text-white sm:text-5xl lg:text-6xl">
                Jimuel Dave Rodado
                <span className="title-spark mt-2 block text-2xl text-[#48f5ff] dark:text-[#48f5ff] sm:text-3xl lg:text-5xl">
                  clears messy workflows one jump at a time.
                </span>
              </h1>
              <p className="wiggle-word inline-block rounded-md border-2 border-[#48f5ff]/80 bg-[#48f5ff]/15 px-3 py-1.5 text-base font-black text-[#eaf6ff] shadow-[4px_4px_0_#ff4fd866] dark:border-[#48f5ff]/80 dark:bg-[#48f5ff]/15 dark:shadow-[4px_4px_0_#ff4fd866] sm:text-lg">
                Software Engineer
              </p>
              <p className="max-w-xl text-sm font-semibold leading-6 text-slate-700 dark:text-blue-50 sm:text-base sm:leading-7">
                Laravel-first systems for healthcare and enterprise teams:
                dashboards, workflows, APIs, automation, and maintainable code
                that lands cleanly.
              </p>
            </div>

            <div className="ticker-strip animated-card hidden overflow-hidden rounded-md border-2 border-[#78e5ff]/50 bg-[#07172c]/80 py-2 text-[#d9f7ff] shadow-[0_0_22px_#48f5ff2e] dark:border-[#78e5ff]/50 dark:bg-[#07172c]/80 dark:text-[#d9f7ff] sm:block">
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
                  className="animated-card metric-burst motion-card rounded-md border-2 border-[#78e5ff]/50 bg-[#07172c]/80 p-3 shadow-[0_0_22px_#48f5ff2e] dark:border-[#78e5ff]/50 dark:bg-[#07172c]/80 dark:shadow-[0_0_22px_#48f5ff2e] sm:p-4"
                  key={stat.label}
                  style={{
                    ...cardDelay(index + 1),
                    ...customStyle({ "--motion-accent": stat.accent }),
                  }}
                >
                  <p className="font-mono text-2xl font-black text-[#f8fbff] dark:text-white sm:text-3xl">
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
                  className="animated-card motion-card accent-about grid h-11 w-11 place-items-center rounded-md border-2 border-[#eaf6ff]/80 bg-[linear-gradient(135deg,#48f5ff,#b8ff5c)] text-[#03111f] shadow-[4px_4px_0_#ff4fd866] transition dark:border-[#eaf6ff]/80 dark:shadow-[4px_4px_0_#ff4fd866]"
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
                className="motion-card accent-contact inline-flex min-h-11 items-center gap-2 rounded-md border-2 border-[#ff8fe8]/80 bg-[linear-gradient(135deg,#ff4fd8,#7c5cff)] px-4 py-2.5 text-sm font-black text-white shadow-[5px_5px_0_#48f5ff66] transition focus:outline-none focus:ring-4 focus:ring-[#48f5ff]/35 dark:border-[#ff8fe8]/80 dark:bg-[linear-gradient(135deg,#ff4fd8,#7c5cff)] dark:shadow-[5px_5px_0_#48f5ff66] sm:px-5"
                href="#contact"
              >
                Start
                <ArrowIcon />
              </a>
              <a
                className="motion-card accent-about inline-flex min-h-11 items-center rounded-md border-2 border-[#eaf6ff]/80 bg-[linear-gradient(135deg,#48f5ff,#b8ff5c)] px-4 py-2.5 text-sm font-black text-[#03111f] shadow-[5px_5px_0_#ff4fd866] transition focus:outline-none focus:ring-4 focus:ring-[#48f5ff]/35 dark:border-[#eaf6ff]/80 dark:bg-[linear-gradient(135deg,#48f5ff,#b8ff5c)] dark:shadow-[5px_5px_0_#ff4fd866] sm:px-5"
                href="#experience"
              >
                Experience
              </a>
            </div>
          </div>

          <div className="portrait-stage relative z-10 mx-auto w-full max-w-[18rem] sm:max-w-[22rem] md:ml-auto lg:max-w-[24rem]">
            {orbitNotes.map((note, index) => (
              <span
                className="orbit-chip absolute z-20 hidden rounded-md border-2 border-[#78e5ff]/60 bg-[#061329]/90 px-3 py-2 text-xs font-black uppercase text-[#eaf6ff] shadow-[4px_4px_0_var(--orbit-accent)] dark:border-[#78e5ff]/60 dark:bg-[#061329]/90 dark:text-zinc-50 sm:inline-flex"
                key={note.label}
                style={orbitStyle(note, index)}
              >
                {note.label}
              </span>
            ))}

            <div
              className="portrait-frame animated-card motion-card accent-contact relative overflow-hidden rounded-md border-2 border-[#78e5ff]/60 bg-[#07172c]/80 p-2 shadow-[0_0_32px_#48f5ff33] dark:border-[#78e5ff]/60 dark:bg-[#07172c]/80 dark:shadow-[0_0_32px_#48f5ff33]"
              style={cardDelay(2)}
            >
              <Image
                alt="Portrait of Jimuel Dave Rodado."
                className="image-glitch h-56 w-full rounded-md object-cover object-[center_32%] sm:h-72 md:h-[24rem] lg:h-[27rem]"
                height={1154}
                preload
                quality={78}
                sizes="(max-width: 640px) 18rem, (max-width: 1024px) 22rem, 24rem"
                src="/jim-cafe-portrait-optimized.webp"
                width={768}
              />
            </div>

            <div className="mini-terminal animated-card relative z-20 mt-3 w-full rounded-md border-2 border-[#78e5ff]/60 bg-[#061329]/90 p-3 text-[#eaf6ff] shadow-[0_0_26px_#48f5ff33] dark:border-[#78e5ff]/60 dark:bg-[#061329]/90 dark:text-zinc-50 dark:shadow-[0_0_26px_#48f5ff33] sm:absolute sm:-bottom-3 sm:left-3 sm:mt-0 sm:w-[82%]">
              <div className="terminal-lights mb-2 flex gap-1.5">
                <span className="bg-[#ff4fd8]" />
                <span className="bg-[#ffe66d]" />
                <span className="bg-[#b8ff5c]" />
              </div>
              <p className="font-mono text-[0.7rem] font-bold leading-5 text-[#b8ff5c] dark:text-[#b8ff5c]">
                jump --queue --deploy
                <span className="terminal-cursor ml-1 inline-block h-4 w-2 bg-[#b8ff5c] align-middle" />
              </p>
            </div>
          </div>
        </section>

        <section
          className="scroll-reveal grid scroll-mt-28 gap-8 border-y-2 border-[#78e5ff]/45 py-14 dark:border-[#78e5ff]/45 lg:grid-cols-[0.7fr_1.3fr] lg:items-start"
          id="about"
        >
          <div>
            <p className="section-label inline-flex rounded-md border-2 border-[#eaf6ff]/80 bg-[linear-gradient(90deg,#48f5ff,#b8ff5c)] px-3 py-2 font-mono text-sm font-black uppercase text-[#03111f] shadow-[4px_4px_0_#ff4fd866] dark:border-[#eaf6ff]/80">
              About
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-normal sm:text-5xl">
              Practical engineering, but the dashboard has a pulse.
            </h2>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="quirk-card scroll-reveal rounded-lg border-2 border-[#78e5ff]/55 bg-[#07172c]/80 p-5 shadow-[0_0_26px_#48f5ff33] dark:border-[#78e5ff]/55 dark:bg-[#07172c]/80">
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
                  className="animated-card scroll-reveal quirk-card motion-card rounded-lg border-2 border-[#78e5ff]/55 bg-[#07172c]/80 p-4 shadow-[0_0_24px_#48f5ff2e] dark:border-[#78e5ff]/55 dark:bg-[#07172c]/80 sm:p-5"
                  key={card.title}
                  style={{
                    ...cardDelay(index),
                    ...customStyle({
                      "--motion-accent":
                        index === 0 ? "#48f5ff" : index === 1 ? "#ff4fd8" : "#b8ff5c",
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
              <div className="quirk-card scroll-reveal rounded-lg border-2 border-[#78e5ff]/55 bg-[#061329]/90 p-5 text-white shadow-[0_0_26px_#ff4fd833] dark:border-[#78e5ff]/55">
                <p className="font-mono text-xs font-black uppercase text-[#ffe66d]">
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

              <div className="animated-card scroll-reveal quirk-card motion-card rounded-lg border-2 border-[#78e5ff]/55 bg-[#07172c]/80 p-4 shadow-[0_0_24px_#48f5ff2e] dark:border-[#78e5ff]/55 dark:bg-[#07172c]/80 sm:p-5">
                <p className="font-mono text-xs font-black uppercase text-zinc-500 dark:text-zinc-300">
                  Stack
                </p>
                <ul
                  aria-label="Core technology stack"
                  className="mt-5 grid grid-cols-4 gap-x-3 gap-y-7 sm:grid-cols-6 lg:flex lg:flex-wrap lg:gap-x-5 lg:gap-y-7"
                >
                  {coreStack.map((item, index) => (
                    <li
                      className="stack-item group relative flex min-h-16 min-w-14 items-start justify-center text-center"
                      key={item.name}
                      style={{
                        ...stackAccent(item.color),
                        ...cardDelay(index),
                      }}
                    >
                      <span
                        aria-label={item.name}
                        className="stack-icon-tile relative z-10 grid h-12 w-12 place-items-center rounded-md text-[var(--stack-accent)] transition focus:outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--stack-accent)_28%,transparent)]"
                        role="img"
                        tabIndex={0}
                        title={item.name}
                      >
                        <StackIcon icon={item.icon} />
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-12 z-30 w-max max-w-28 -translate-x-1/2 text-center text-[0.65rem] font-black uppercase leading-tight text-[var(--stack-accent)] opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100 sm:text-xs"
                      >
                        {item.name}
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
              <p className="section-label inline-flex rounded-md border-2 border-[#eaf6ff]/80 bg-[linear-gradient(90deg,#48f5ff,#b8ff5c)] px-3 py-2 font-mono text-sm font-black uppercase text-[#03111f] shadow-[4px_4px_0_#ff4fd866] dark:border-[#eaf6ff]/80">
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
            <div className="desk-preview relative overflow-hidden rounded-lg border-2 border-[#78e5ff]/55 bg-[#07172c]/80 p-2 shadow-[0_0_28px_#9b8cff33] dark:border-[#78e5ff]/55 dark:bg-[#07172c]/80">
              <Image
                alt="Stylized workstation with healthcare dashboard visuals."
                className="h-44 w-full rounded-md object-cover"
                decoding="async"
                height={640}
                loading="lazy"
                quality={76}
                sizes="(max-width: 1024px) 100vw, 28rem"
                src="/portfolio-hero-optimized.webp"
                width={960}
              />
            </div>
          </div>

          <div className="space-y-5">
            {experience.map((job, index) => (
              <article
                className="animated-card scroll-reveal timeline-card motion-card rounded-lg border-2 border-[#78e5ff]/55 bg-[#07172c]/80 p-4 shadow-[0_0_24px_#48f5ff2e] dark:border-[#78e5ff]/55 dark:bg-[#07172c]/80 sm:p-5"
                key={`${job.company}-${job.role}`}
                style={{
                  ...cardDelay(index),
                  ...customStyle({
                    "--motion-accent":
                      index % 3 === 0 ? "#ff4fd8" : index % 3 === 1 ? "#48f5ff" : "#b8ff5c",
                  }),
                }}
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="timeline-index flex h-12 w-12 shrink-0 items-center justify-center rounded-md border-2 border-[#78e5ff]/60 bg-[#061329]/90 font-mono text-sm font-black text-[#eaf6ff] shadow-[0_0_18px_#48f5ff33] dark:border-[#78e5ff]/60">
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
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full border border-[#eaf6ff]/70 bg-[#48f5ff] dark:border-[#eaf6ff]/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          className="contact-section grid scroll-mt-28 gap-8 border-t-2 border-[#78e5ff]/45 py-14 dark:border-[#78e5ff]/45 lg:grid-cols-[0.85fr_1.15fr]"
          id="contact"
        >
          <div className="space-y-5">
            <p className="section-label inline-flex rounded-md border-2 border-[#eaf6ff]/80 bg-[linear-gradient(90deg,#48f5ff,#b8ff5c)] px-3 py-2 font-mono text-sm font-black uppercase text-[#03111f] shadow-[4px_4px_0_#ff4fd866] dark:border-[#eaf6ff]/80">
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
            <div className="contact-meter quirk-card rounded-lg border-2 border-[#78e5ff]/55 bg-[#07172c]/80 p-4 text-[#eaf6ff] shadow-[0_0_26px_#48f5ff33] dark:border-[#78e5ff]/55 dark:bg-[#07172c]/80 dark:text-white dark:shadow-[0_0_26px_#48f5ff33]">
              <p className="font-mono text-xs font-black uppercase text-[#ffe66d] dark:text-[#ffe66d]">
                Signal board
              </p>
              <div className="mt-4 grid gap-3">
                {contactDetails.map((detail, index) => (
                  <div
                    className="animated-card motion-card flex items-center gap-3 rounded-md border-2 border-[#78e5ff]/45 bg-[#030916]/75 px-4 py-3 text-sm text-[#eaf6ff] shadow-[0_0_18px_#48f5ff2e] dark:border-[#78e5ff]/45 dark:bg-[#030916]/75 dark:text-white dark:shadow-[0_0_18px_#48f5ff2e]"
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

        <footer className="site-footer border-t-2 border-[#78e5ff]/45 py-12 text-[#c8d8ee] dark:border-[#78e5ff]/45 dark:text-[#b9ecff]">
          <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr_1fr]">
            <div className="max-w-md">
              <h2 className="text-xl font-black text-[#f4fbff] dark:text-[#b8ff5c]">
                Jimuel Dave Rodado
              </h2>
              <p className="mt-5 text-sm font-medium leading-7">
                Software Engineer focused on full-stack development, healthcare
                systems, enterprise workflows, and clean, maintainable web
                applications.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#f4fbff] dark:text-[#b8ff5c]">
                Quick Links
              </h2>
              <nav className="mt-5 grid gap-3 text-sm font-bold">
                {navLinks.map((link) => (
                  <a
                    className="nav-link inline-flex min-h-11 w-max items-center rounded-md px-2 py-1"
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#f4fbff] dark:text-[#b8ff5c]">
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

          <div className="mt-10 flex flex-col gap-4 border-t-2 border-[#78e5ff]/45 pt-7 text-sm font-bold dark:border-[#78e5ff]/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; <CurrentYear /> Jimuel Dave Rodado. All rights reserved.
            </p>
            <a
              className="nav-link inline-flex min-h-11 w-max items-center rounded-md px-2 py-1"
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
