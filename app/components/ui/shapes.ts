/** The three Bauhaus primitives used as markers across the site. */
export type ShapeName = "circle" | "square" | "tri";

export const SHAPE_CYCLE: ShapeName[] = ["circle", "square", "tri"];

export const SHAPE_CLASS: Record<ShapeName, string> = {
  circle: "sh-circle",
  square: "",
  tri: "sh-tri",
};

export const SHAPE_COLOR: Record<ShapeName, string> = {
  circle: "var(--brand-terra)",
  square: "var(--ochre)",
  tri: "var(--olive)",
};
