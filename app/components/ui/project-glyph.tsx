import type { ProjectGlyphKind } from "@/app/lib/project-looks";
import { Antenna, Cpu, Keycard, ServerRack } from "@/app/components/ui/circuit";

/**
 * A project's hardware glyph. `fill` is the main body; `detail` colours the
 * cut-in parts (coil, die, rack units), so the same drawing works as a
 * bright sticker on the gallery wall and as a tone-on-tone slab on a cover.
 */
export default function ProjectGlyph({
  kind,
  fill,
  detail,
  accent,
  className,
  style,
}: {
  kind: ProjectGlyphKind;
  fill: string;
  detail: string;
  accent: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const vars = { ...style, "--glyph-hole": detail } as React.CSSProperties;
  switch (kind) {
    case "antenna":
      return <Antenna body={fill} className={className} style={vars} />;
    case "keycard":
      return <Keycard body={fill} chip={accent} coil={detail} className={className} style={vars} />;
    case "server":
      return <ServerRack body={fill} unit={detail} led={accent} className={className} style={vars} />;
    case "cpu":
    default:
      return <Cpu body={fill} die={accent} pin={detail} mark={detail} className={className} style={vars} />;
  }
}
