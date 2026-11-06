/**
 * Each project's identity, shared by the home list, the case study and the
 * pager so a project looks the same wherever it appears: one hue for its
 * status lights, a part label like a line on a bill of materials, and the
 * path its data takes from the source to the screen.
 */
export type FlowNode = {
  /** What sits at this stage. */
  label: string;
  /** Which layer of the system it belongs to. */
  layer: string;
};

export type ProjectLook = {
  /** Identity hue for dots, rails and highlights. Decorative only. */
  accent: string;
  /** The part, named like a line on a bill of materials. */
  part: string;
  /** Source to screen, in order. */
  flow: FlowNode[];
};

export const PROJECT_LOOKS: Record<string, ProjectLook> = {
  obsentry: {
    accent: "#5AA9FF",
    part: "ANT1 / GPS antenna",
    flow: [
      { label: "GPS, gas and RFID", layer: "sensors" },
      { label: "Arduino", layer: "firmware" },
      { label: "HTTP / SSL module", layer: "transport" },
      { label: "Node.js + Express", layer: "server" },
      { label: "Socket.io", layer: "realtime" },
      { label: "Leaflet.js map", layer: "client" },
    ],
  },
  eingress: {
    accent: "#F2B84B",
    part: "RF1 / RFID keycard",
    flow: [
      { label: "Door lock", layer: "device" },
      { label: "NestJS REST API", layer: "server" },
      { label: "PostgreSQL", layer: "database" },
      { label: "Angular admin", layer: "client" },
    ],
  },
  "velora-motors": {
    accent: "#FF5A4E",
    part: "U1 / Processor",
    flow: [
      { label: "Angular storefront", layer: "client" },
      { label: "Angular back office", layer: "client" },
      { label: "NestJS 11 API", layer: "server" },
      { label: "TypeORM", layer: "data access" },
      { label: "PostgreSQL on Neon", layer: "database" },
    ],
  },
  "marrea-erp": {
    accent: "#C8A26B",
    part: "SRV1 / Server rack",
    flow: [
      { label: "Filament admin", layer: "client" },
      { label: "Livewire + Alpine.js", layer: "interface" },
      { label: "Laravel, 8 modules", layer: "server" },
      { label: "MySQL", layer: "database" },
    ],
  },
};

const FALLBACK: ProjectLook = {
  accent: "#FF8A3D",
  part: "U1 / Processor",
  flow: [],
};

export function lookFor(id: string): ProjectLook {
  return PROJECT_LOOKS[id] ?? FALLBACK;
}

/** What an address bar shows: the host, plus the path for a GitHub link. */
export function displayUrl(link: string) {
  if (!link) return "localhost:8000";
  try {
    const url = new URL(link);
    const host = url.host.replace(/^www\./, "");
    const path = url.pathname.replace(/\/$/, "");
    return host === "github.com" ? `${host}${path}` : host;
  } catch {
    return link;
  }
}

/** A short, stable commit-style hash for any string (FNV-1a, 7 hex digits). */
export function shortHash(input: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}
