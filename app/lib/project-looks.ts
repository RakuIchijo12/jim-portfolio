/**
 * Each project's identity: one colour and one piece of hardware that says
 * what the project is, shared by the home gallery wall, the case study
 * cover, its contents LED and the next-project preview, so a project looks
 * the same wherever it appears.
 */
export type ProjectGlyphKind = "antenna" | "keycard" | "cpu" | "server";

export type ProjectLook = {
  /** Fill colour of the project's glyph and poster blocks. */
  color: string;
  /** Text colour that reads on that fill. */
  ink: string;
  glyph: ProjectGlyphKind;
  /** Supporting colour that contrasts the glyph. */
  second: string;
  /** The part, named like a line on a bill of materials. */
  label: string;
  /** Flip the cover: print on the left, folio on the right. Alternates. */
  mirror: boolean;
};

export const PROJECT_LOOKS: Record<string, ProjectLook> = {
  obsentry: { color: "#3E7A72", ink: "#F0E9DC", glyph: "antenna", second: "#D6AB52", label: "ANT1 / GPS antenna", mirror: false },
  eingress: { color: "#D6AB52", ink: "#14120F", glyph: "keycard", second: "#3E7A72", label: "RF1 / RFID keycard", mirror: true },
  "velora-motors": { color: "#D0714D", ink: "#14120F", glyph: "cpu", second: "#3E7A72", label: "U1 / Processor", mirror: false },
  "marrea-erp": { color: "#A3936A", ink: "#14120F", glyph: "server", second: "#D6AB52", label: "SRV1 / Server rack", mirror: true },
};

const FALLBACK: ProjectLook = { color: "#D0714D", ink: "#14120F", glyph: "cpu", second: "#D6AB52", label: "U1 / Processor", mirror: false };

export function lookFor(id: string): ProjectLook {
  return PROJECT_LOOKS[id] ?? FALLBACK;
}
