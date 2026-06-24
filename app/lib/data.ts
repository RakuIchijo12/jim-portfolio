export const contactEmail = "rjimueldave12@gmail.com";
export const contactPhone  = "+63 976 317 0755";
export const resumeHref    = "/resume/Rodado-Resume-2026.pdf";

export const socialLinks = [
  { href: "https://www.linkedin.com/in/jimuel-dave-rodado-1731b9182/", label: "LinkedIn",  icon: "linkedin"  },
  { href: "https://github.com/RakuIchijo12",                           label: "GitHub",    icon: "github"    },
  { href: "https://www.facebook.com/jimueldave.rodado",                label: "Facebook",  icon: "facebook"  },
  { href: `mailto:${contactEmail}`,                                    label: "Email",     icon: "mail"      },
] as const;

export const navLinks = [
  { href: "#home",       label: "Home"       },
  { href: "#about",      label: "About"      },
  { href: "#stack",      label: "Stack"      },
  { href: "#projects",   label: "Projects"   },
  { href: "#experience", label: "Experience" },
  { href: "#contact",    label: "Contact"    },
];

export const heroStats = [
  { value: "2+",  label: "Years Experience" },
  { value: "35+", label: "Technologies"     },
  { value: "3",   label: "Industries"       },
];

export const identityTags = [
  "Laravel & FilamentPHP",
  "React & Next.js",
  "AI-Assisted Dev",
  "Computer Engineer",
];

export const aboutBio = [
  "I am a Software Engineer with a Computer Engineering background and a strong passion for scalable, maintainable, and useful web applications.",
  "My work spans hospital systems, healthcare workflows, ERP and CRM platforms, internal automation, role-based access, dashboards, APIs, and operational tools.",
];

export const aboutCards = [
  {
    title: "Current Role",
    value: "Healthcare Systems",
    copy:  "Daily work on hospital workflows where reliability, accuracy, and speed matter.",
  },
  {
    title: "Specialization",
    value: "Enterprise Tools",
    copy:  "ERP, CRM, dashboards, user management, automation, and operational platforms.",
  },
  {
    title: "Education",
    value: "Computer Engineering",
    copy:  "Bachelor of Science from the University of Mindanao.",
  },
];

export const labNotes = [
  { label: "Reliability",         value: 97, display: "97%" },
  { label: "Code Clarity",        value: 91, display: "91%" },
  { label: "Attention to Detail", value: 99, display: "99%" },
];

export const stackGroups = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React",        icon: "react",        color: "#61dafb" },
      { name: "Next.js",      icon: "next-js",      color: "#e2e8f0" },
      { name: "Vue.js",       icon: "vue-js",       color: "#42b883" },
      { name: "Angular",      icon: "angular",      color: "#dd0031" },
      { name: "Alpine.js",    icon: "alpine-js",    color: "#77c1d2" },
      { name: "Tailwind CSS", icon: "tailwind-css", color: "#38bdf8" },
      { name: "Livewire",     icon: "livewire",     color: "#fb70b6" },
      { name: "HTML5",        icon: "html5",        color: "#e34f26" },
      { name: "CSS3",         icon: "css3",         color: "#1572b6" },
      { name: "JavaScript",   icon: "javascript",   color: "#f7df1e" },
      { name: "TypeScript",   icon: "typescript",   color: "#3178c6" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Laravel",    icon: "laravel",    color: "#ff4d3d" },
      { name: "Filament",   icon: "filament",   color: "#f6a800" },
      { name: "PHP",        icon: "php",        color: "#777bb4" },
      { name: "Python",     icon: "python",     color: "#3776ab" },
      { name: "Django",     icon: "django",     color: "#0c4b33" },
      { name: "NestJS",     icon: "nestjs",     color: "#e0234e" },
      { name: "MySQL",      icon: "mysql",      color: "#00758f" },
      { name: "PostgreSQL", icon: "postgresql", color: "#336791" },
    ],
  },
  {
    id: "ai",
    label: "AI Tools",
    items: [
      { name: "Claude", icon: "claude", color: "#D4806A", ai: true },
      { name: "OpenAI", icon: "openai", color: "#CCCCCC", ai: true },
      { name: "Codex",  icon: "codex",  color: "#7C83F0", ai: true },
    ],
  },
] as const;

export const projects = [
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
      "RFID, Gas Sensor, and GPS Sensor integration",
      "Responsive web dashboard",
      "Authentication",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "Firebase", "GitHub"],
    images: [
      { src: "/projects/obsentry/obs1.webp", alt: "Obsentry — Dashboard" },
      { src: "/projects/obsentry/obs2.webp", alt: "Obsentry — Map View" },
      { src: "/projects/obsentry/obs3.webp", alt: "Obsentry — Sensor Data" },
      { src: "/projects/obsentry/obs4.webp", alt: "Obsentry — Analytics" },
      { src: "/projects/obsentry/obs5.webp", alt: "Obsentry — Reports" },
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
      { src: "/projects/eingress/Screenshot%202024-11-04%20102254.png", alt: "Eingress — Login" },
      { src: "/projects/eingress/Screenshot%202024-11-04%20102340.png", alt: "Eingress — Dashboard" },
      { src: "/projects/eingress/Screenshot%202024-11-04%20102446.png", alt: "Eingress — Access Log" },
      { src: "/projects/eingress/Screenshot%202024-11-04%20102512.png", alt: "Eingress — Employees" },
      { src: "/projects/eingress/Screenshot%202024-11-04%20102742.png", alt: "Eingress — Reports" },
      { src: "/projects/eingress/Screenshot%202024-11-04%20102824.png", alt: "Eingress — Settings" },
    ],
    link: "https://github.com/RakuIchijo12",
    linkLabel: "GitHub",
  },
] as const;

export const experience = [
  {
    role: "Computer Programmer",
    company: "Southern Philippines Medical Center (SPMC)",
    period: "Apr 2026 — Present",
    type: "Full-time · On-site",
    location: "Davao, Philippines",
    current: true,
    points: [
      "Developing and maintaining healthcare systems for critical daily operations.",
      "Supporting process automation, user management, internal workflows, and system maintenance.",
      "Turning fast-moving operational requirements into dependable web tools.",
      "Leveraging AI tools (Claude, OpenAI, Codex) to accelerate development and code review.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "DevbeansPH",
    period: "Nov 2024 — Oct 2025",
    type: "Full-time · On-site",
    location: "Davao, Philippines",
    current: false,
    points: [
      "Built ERP and CRM features using Laravel, Filament PHP, Livewire, Tailwind CSS, and the TALL stack.",
      "Designed dashboards, CRUD modules, role-based authentication, RESTful APIs, and database workflows.",
      "Improved reliability with queues, jobs, events, caching, logs, debugging tools, and Pest PHP tests.",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "Jairosoft Inc.",
    period: "Sep 2024 — Oct 2024",
    type: "Contract · On-site",
    location: "Davao, Philippines",
    current: false,
    points: [
      "Completed full-stack onboarding with Angular 16 and contributed to application maintenance.",
      "Strengthened frontend fundamentals across HTML, CSS, components, and team workflows.",
    ],
  },
  {
    role: "Back End Developer",
    company: "Jairosoft Inc.",
    period: "Feb 2024 — May 2024",
    type: "Internship · On-site",
    location: "Davao, Philippines",
    current: false,
    points: [
      "Worked on backend development for an automated magnetic lock system.",
      "Practiced API design, database handling, and backend implementation in a professional environment.",
    ],
  },
] as const;
