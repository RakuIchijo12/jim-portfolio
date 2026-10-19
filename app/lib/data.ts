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

export const identityTags = [
  "Laravel & FilamentPHP",
  "React & Next.js",
  "AI-Assisted Dev",
  "Computer Engineer",
];

export const aboutBio = [
  "I am a Software Engineer with a Computer Engineering background and hands-on experience building healthcare, ERP, CRM, HR, payroll, and operational systems.",
  "I work mainly in Laravel, FilamentPHP, React, and TypeScript, with additional experience in Django, Angular, NestJS, MySQL, PostgreSQL, and REST APIs. My focus is reliable, maintainable software for institutions and teams that depend on accurate daily operations.",
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
      { name: "React",        icon: "frontend/react",        color: "#61dafb" },
      { name: "Next.js",      icon: "frontend/next-js",      color: "#e2e8f0" },
      { name: "Vue.js",       icon: "frontend/vue-js",       color: "#42b883" },
      { name: "Angular",      icon: "frontend/angular",      color: "#dd0031" },
      { name: "Alpine.js",    icon: "frontend/alpine-js",    color: "#77c1d2" },
      { name: "Tailwind CSS", icon: "frontend/tailwind-css", color: "#38bdf8" },
      { name: "Livewire",     icon: "frontend/livewire",     color: "#fb70b6" },
      { name: "Inertia.js",   icon: "frontend/inertia-js",   color: "#9553e9" },
      { name: "HTML5",        icon: "frontend/html5",        color: "#e34f26" },
      { name: "CSS3",         icon: "frontend/css3",         color: "#1572b6" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Laravel",  icon: "backend/laravel",  color: "#ff4d3d" },
      { name: "Filament", icon: "backend/filament", color: "#f6a800", bleed: true },
      { name: "Django",   icon: "backend/django",   color: "#0c4b33" },
      { name: "NestJS",   icon: "backend/nestjs",   color: "#e0234e" },
      { name: "Node.js",  icon: "backend/Node.js",  color: "#339933" },
    ],
  },
  {
    id: "database",
    label: "Database",
    items: [
      { name: "MySQL",      icon: "database/mysql",      color: "#00758f" },
      { name: "PostgreSQL", icon: "database/postgresql", color: "#336791" },
      { name: "SQLite",     icon: "database/sqlite",     color: "#0f80cc" },
      { name: "Redis",      icon: "database/redis",      color: "#d82c20" },
      { name: "Firebase",   icon: "database/Firebase",   color: "#ffca28" },
      { name: "Supabase",   icon: "database/supabase",   color: "#3ecf8e" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "JavaScript",   icon: "languages/javascript",   color: "#f7df1e" },
      { name: "TypeScript",   icon: "languages/typescript",   color: "#3178c6" },
      { name: "PHP",          icon: "languages/php",          color: "#777bb4" },
      { name: "Python",       icon: "languages/python",       color: "#3776ab" },
      { name: "Java",         icon: "languages/java",         color: "#ea2d2e" },
      { name: "C++",          icon: "languages/cplusplus",    color: "#00599c" },
      { name: "C",            icon: "languages/c",            color: "#a8b9cc" },
      { name: "Visual Basic", icon: "languages/visual-basic", color: "#945db7" },
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
  {
    id: "tools",
    label: "Other Tools",
    items: [
      { name: "Git",            icon: "tools/git",            color: "#f05032" },
      { name: "GitHub",         icon: "tools/GitHub",         color: "#e2e8f0" },
      { name: "GitLab",         icon: "tools/gitlab",         color: "#fc6d26" },
      { name: "Docker",         icon: "tools/docker",         color: "#2496ed" },
      { name: "Figma",          icon: "tools/figma",          color: "#f24e1e" },
      { name: "Postman",        icon: "tools/postman",        color: "#ff6c37" },
      { name: "VS Code",        icon: "tools/vs-code",        color: "#007acc" },
      { name: "Linux",          icon: "tools/linux",          color: "#fcc624" },
      { name: "Azure",          icon: "tools/azure",          color: "#0078d4" },
      { name: "Composer",       icon: "tools/composer",       color: "#885630" },
      { name: "Jira",           icon: "tools/jira",           color: "#0052cc" },
      { name: "Android Studio", icon: "tools/android-studio", color: "#3ddc84" },
      { name: "Visual Studio",  icon: "tools/visual-studio",  color: "#5c2d91" },
      { name: "Slack",          icon: "tools/slack",          color: "#4a154b" },
      { name: "Ren'Py",         icon: "tools/renpy",          color: "#ff7f7f" },
    ],
  },
] as const;

/** Kept in step with stackGroups so the hero counter cannot drift. */
export const totalTechnologies = stackGroups.reduce((n, g) => n + g.items.length, 0);

/** Numeric so the hero can count them up on entry. */
export const heroStats = [
  { n: 2,                  suffix: "+", label: "Years Experience" },
  { n: totalTechnologies,  suffix: "",  label: "Technologies"     },
  { n: 3,                  suffix: "",  label: "Industries"       },
];

export const projects = [
  {
    id: "obsentry",
    name: "Obsentry",
    category: "Vehicle Tracking",
    tagline: "School vehicle monitoring at the University of Mindanao",
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
      { src: "/projects/obsentry/login.webp",            alt: "Obsentry: Login"           },
      { src: "/projects/obsentry/admin-dashboard.webp",  alt: "Obsentry: Admin Dashboard" },
      { src: "/projects/obsentry/admin-maps.webp",       alt: "Obsentry: Admin Maps"      },
      { src: "/projects/obsentry/user-dashboard.webp",   alt: "Obsentry: User Dashboard"  },
      { src: "/projects/obsentry/user-maps.webp",        alt: "Obsentry: User Maps"       },
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
      { src: "/projects/eingress/login.webp",              alt: "Eingress: Login"             },
      { src: "/projects/eingress/dashboard.webp",          alt: "Eingress: Dashboard"         },
      { src: "/projects/eingress/users.webp",              alt: "Eingress: Users"             },
      { src: "/projects/eingress/add-user.webp",           alt: "Eingress: Add User"          },
      { src: "/projects/eingress/profile-details.webp",    alt: "Eingress: Profile Details"   },
      { src: "/projects/eingress/change-password.webp",    alt: "Eingress: Change Password"   },
      { src: "/projects/eingress/forgot-password.webp",    alt: "Eingress: Forgot Password"   },
      { src: "/projects/eingress/verification-code.webp",  alt: "Eingress: Verification Code" },
      { src: "/projects/eingress/reports.webp",            alt: "Eingress: Reports"           },
    ],
    link: "https://github.com/RakuIchijo12",
    linkLabel: "GitHub",
  },
  {
    id: "velora-motors",
    name: "Velora Motors",
    category: "Car Dealership",
    tagline: "Pre-owned dealership platform with inventory, financing estimates and enquiries",
    overview:
      "A full-stack dealership platform for a Davao City pre-owned car lot. Buyers filter a live inventory, shortlist and compare units side by side, estimate monthly repayments, and send an enquiry straight to the sales team. Built with Angular and NestJS on Supabase.",
    details: [
      "Angular drives the storefront with Tailwind CSS, a full dark and light theme, and a faceted inventory filter over brand, body type, price, year, transmission, fuel, seating and mileage.",
      "NestJS exposes the REST API with Supabase for Postgres and vehicle image storage, while shortlists and comparisons persist per browser so buyers keep their picks without an account.",
    ],
    features: [
      "Faceted inventory search with sorting and pagination",
      "Vehicle detail pages with gallery, full specs and equipment list",
      "Saved-vehicle shortlist and side-by-side comparison of up to three units",
      "Monthly payment estimator with adjustable down payment and loan term",
      "Sell-your-car appraisal flow and per-vehicle enquiry forms",
      "WhatsApp, call and Google Maps contact routes",
      "Dark and light themes across every page",
      "Staff admin console for inventory, leads, brands and customers",
    ],
    technologies: ["HTML", "CSS", "Tailwind CSS", "Angular", "TypeScript", "NestJS", "PostgreSQL", "Supabase"],
    images: [
      { src: "/projects/velora-motors/inventory.jpg",       alt: "Velora Motors: Inventory"        },
      { src: "/projects/velora-motors/home.jpg",            alt: "Velora Motors: Home"             },
      { src: "/projects/velora-motors/vehicle.jpg",         alt: "Velora Motors: Vehicle Detail"   },
      { src: "/projects/velora-motors/compare.jpg",         alt: "Velora Motors: Compare Vehicles" },
      { src: "/projects/velora-motors/saved.jpg",           alt: "Velora Motors: Saved Vehicles"   },
      { src: "/projects/velora-motors/sell.jpg",            alt: "Velora Motors: Sell Your Car"    },
      { src: "/projects/velora-motors/about.jpg",           alt: "Velora Motors: About"            },
      { src: "/projects/velora-motors/contact.jpg",         alt: "Velora Motors: Contact"          },
      { src: "/projects/velora-motors/admin-dashboard.jpg", alt: "Velora Motors: Admin Dashboard"  },
      { src: "/projects/velora-motors/admin-cars.jpg",      alt: "Velora Motors: Admin Inventory"  },
      { src: "/projects/velora-motors/inventory-light.jpg", alt: "Velora Motors: Light Theme"      },
    ],
    link: "https://velora-motors-ph.vercel.app/",
    linkLabel: "View Live Site",
  },
  {
    id:       "marrea-erp",
    name:     "Real Estate Management System",
    category: "Real Estate ERP",
    tagline:  "Private ERP built and maintained for 1+ year across real estate, construction & hospitality",
    overview:
      "Full-scale private ERP for a multi-company group in real estate, construction, and hospitality. Replaced entirely manual workflows with a unified platform, developed and maintained for over a year.",
    details: [
      "Eight modules shipped and integrated into one system: project management, sales CRM, receivables, accounting, payroll, purchasing, inventory, and resort booking.",
      "Delivered 70% faster processing and real-time visibility across all companies within months of launch.",
    ],
    features: [
      "Project management for subdivision & high-rise unit tracking",
      "Sales CRM with buyer profiles & equity scheduling",
      "Receivables with payment tracking & collection monitoring",
      "Accounting for journal entries, bank reconciliation & reports",
      "Payroll, HR & multi-level cash management",
      "Purchasing, inventory & supplier management",
      "Resort booking & marketing module",
      "Role-based access, audit trails & compliance",
    ],
    technologies: ["Laravel", "Filament", "Livewire", "Alpine.js", "Tailwind CSS", "PHP", "MySQL"],
    images:    [],
    cover:     "/projects/marrea-erp/cover.jpg",
    link:      "",
    linkLabel: "",
  },
] as const;

export const experience = [
  {
    role: "Computer Programmer I",
    company: "Southern Philippines Medical Center (SPMC)",
    period: "Apr 2026 - Present",
    type: "Full-time · On-site",
    location: "Davao, Philippines",
    current: true,
    stack: ["Laravel", "Inertia.js", "React", "TypeScript", "Django", "MySQL", "SQLite"],
    points: [
      "Design, develop, and maintain hospital management systems supporting clinical and administrative operations.",
      "Built payroll and healthcare workflow systems with role-based access control, user management, reporting, and multi-system API integration.",
      "Contributed to database architecture and legacy modernization through schema design, migrations, and performance-focused improvements.",
      "Build responsive enterprise interfaces with React and TypeScript while resolving critical frontend and backend issues.",
      "Use AI-assisted development tools including Claude, OpenAI, and Codex to accelerate development, review code, and improve delivery workflows.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "DevbeansPH",
    period: "Nov 2024 - Oct 2025",
    type: "Full-time · On-site",
    location: "Davao, Philippines",
    current: false,
    stack: ["Laravel", "Filament", "Livewire", "Alpine.js", "Tailwind CSS", "PHP", "MySQL", "Redis", "Git", "Jira"],
    points: [
      "Built and maintained ERP and CRM systems supporting sales, HR, payroll, inventory, and customer management workflows.",
      "Developed admin dashboards, CRUD modules, role-based access control, and RESTful APIs using Laravel, FilamentPHP, and the TALL stack.",
      "Applied clean architecture and SOLID principles to keep modules maintainable and extensible as requirements evolved.",
      "Improved system performance using Redis caching and Laravel tooling while covering critical paths with unit and feature tests in PestPHP.",
      "Worked in Agile sprints with Git, GitHub, and Jira, contributing to requirements analysis, sprint planning, code reviews, and feature delivery.",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "Jairosoft Inc.",
    period: "Sep 2024 - Oct 2024",
    type: "Contract · On-site",
    location: "Davao, Philippines",
    current: false,
    stack: ["Angular", "TypeScript", "NestJS", "Node.js", "HTML", "CSS", "Git"],
    points: [
      "Developed full-stack web applications using Angular 16 and NestJS, delivering features within a fast-paced 2-month contract engagement.",
      "Built and delivered an Automated Magnetic Lock Admin Website, providing administrators with a centralized interface for managing access control systems.",
      "Implemented responsive frontend interfaces with Angular components and RESTful backend APIs with NestJS, ensuring seamless client-server integration.",
      "Completed structured onboarding in full-stack development practices, quickly ramping up on the company's tech stack and coding standards.",
      "Collaborated with the development team through code reviews and version control workflows to deliver features aligned with project requirements.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Jairosoft Inc.",
    period: "Feb 2024 - May 2024",
    type: "Internship · On-site",
    location: "Davao, Philippines",
    current: false,
    stack: ["NestJS", "Node.js", "Angular", "TypeScript", "PostgreSQL", "HTML", "CSS"],
    points: [
      "Developed the backend of an Automated Magnetic Lock Admin Website using NestJS, building RESTful APIs to manage access control operations.",
      "Integrated the web application with physical door lock hardware via Raspberry Pi 4, enabling real-time device communication and remote lock control.",
      "Designed database models and API endpoints to handle user access records, device status, and administrative functions.",
      "Worked across the stack with Angular 16 on the frontend to connect UI features with backend services.",
      "Gained hands-on experience in IoT integration, bridging web software with embedded hardware in a production-oriented project.",
    ],
  },
] as const;
