/**
 * Each project's poster identity: one shape and one colour, shared by the
 * home gallery wall, the case study cover, its drop cap and contents marker,
 * and the next-project preview, so a project looks the same wherever it appears.
 */
export type ProjectShape = "half" | "quarter" | "split" | "square";

export type ProjectLook = {
  /** Fill colour of the project's shape and poster blocks. */
  color: string;
  /** Text colour that reads on that fill. */
  ink: string;
  shape: ProjectShape;
  /** Supporting colour that contrasts the shape. */
  second: string;
  /** How the swatch is named in captions, like a colour chip on a proof. */
  label: string;
  /** Flip the cover: print on the left, folio on the right. Alternates. */
  mirror: boolean;
};

export const PROJECT_LOOKS: Record<string, ProjectLook> = {
  obsentry: { color: "#3E7A72", ink: "#F0E9DC", shape: "half", second: "#D6AB52", label: "Teal half-disc", mirror: false },
  eingress: { color: "#D6AB52", ink: "#14120F", shape: "quarter", second: "#3E7A72", label: "Ochre quarter", mirror: true },
  "velora-motors": { color: "#D0714D", ink: "#14120F", shape: "split", second: "#3E7A72", label: "Split disc", mirror: false },
  "marrea-erp": { color: "#A3936A", ink: "#14120F", shape: "square", second: "#D6AB52", label: "Olive square", mirror: true },
};

const FALLBACK: ProjectLook = { color: "#D0714D", ink: "#14120F", shape: "square", second: "#D6AB52", label: "Terracotta square", mirror: false };

export function lookFor(id: string): ProjectLook {
  return PROJECT_LOOKS[id] ?? FALLBACK;
}

/** Shape classes from globals.css. Square-ish shapes need an explicit ratio. */
export const SHAPE_CLASS: Record<ProjectShape, string> = {
  half: "sh-half",
  quarter: "sh-quarter",
  split: "sh-split aspect-square",
  square: "aspect-square",
};
