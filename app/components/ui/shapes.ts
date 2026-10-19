/**
 * The three parts that sit inline in running copy, written as [led],
 * [chip] and [gate] tokens. Each grows in with the words around it.
 */
export type InlineGlyph = "led" | "chip" | "gate";

export const INLINE_GLYPHS: InlineGlyph[] = ["led", "chip", "gate"];
