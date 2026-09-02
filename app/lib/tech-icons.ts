/**
 * Maps a technology name — as written in `projects[].technologies` and
 * `experience[].stack` — to its logo under `/public/stack-icons`.
 * A name with no entry here falls back to a lettered badge at the call site.
 */
export const TECH_ICON_MAP: Record<string, string> = {
  "HTML":          "frontend/html5.png",
  "CSS":           "frontend/css3.png",
  "JavaScript":    "languages/javascript.png",
  "TypeScript":    "languages/typescript.png",
  "Node.js":       "backend/Node.js.png",
  "Express.js":    "backend/Express.png",
  "Firebase":      "database/Firebase.png",
  "GitHub":        "tools/GitHub.png",
  "Git":           "tools/git.png",
  "Jira":          "tools/jira.png",
  "Angular":       "frontend/angular.png",
  "NestJS":        "backend/nestjs.png",
  "PostgreSQL":    "database/postgresql.png",
  "MySQL":         "database/mysql.png",
  "SQLite":        "database/sqlite.png",
  "Redis":         "database/redis.png",
  "React":         "frontend/react.png",
  "Next.js":       "frontend/next-js.png",
  "Vue.js":        "frontend/vue-js.png",
  "Laravel":       "backend/laravel.png",
  "PHP":           "languages/php.png",
  "Python":        "languages/python.png",
  "Django":        "backend/django.png",
  "Tailwind CSS":  "frontend/tailwind-css.png",
  "Alpine.js":     "frontend/alpine-js.png",
  "Inertia.js":    "frontend/inertia-js.png",
  "Filament":      "backend/filament.png",
  "Livewire":      "frontend/livewire.png",
  "Supabase":      "database/supabase.png",
};

/** Marks that are near-black, so they need inverting on the dark ground. */
export const DARK_ICONS = new Set(["Express.js", "GitHub"]);
