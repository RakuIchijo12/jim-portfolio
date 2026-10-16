/**
 * Hover text that rolls letter by letter: each glyph slides up and its twin
 * follows from below, staggered. Pure CSS, driven by `.roll-host:hover` on
 * any ancestor. Screen readers get the plain string.
 */
export default function RollText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={`roll ${className}`}>
        {Array.from(text).map((ch, i) => (
          <span
            key={i}
            className="roll__ch"
            data-ch={ch}
            style={{ "--i": i } as React.CSSProperties}
          >
            {ch}
          </span>
        ))}
      </span>
    </>
  );
}
