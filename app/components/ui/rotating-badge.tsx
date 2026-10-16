"use client";

import { useId } from "react";

/**
 * Circular type that turns slowly around a core, like a sticker on a poster.
 * Renders a button, a link, or a plain decorative disc.
 */
export default function RotatingBadge({
  text,
  children,
  className = "",
  onClick,
  href,
  label,
}: {
  text: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  /** Accessible name. Without one, the badge is decorative. */
  label?: string;
}) {
  const pathId = `ring-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const inner = (
    <>
      <svg className="badge__ring" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <path id={pathId} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text>
          <textPath href={`#${pathId}`} textLength="238" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="badge__core" aria-hidden="true">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a className={`badge ${className}`} href={href} aria-label={label}>
        {inner}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={`badge ${className}`} onClick={onClick} aria-label={label}>
        {inner}
      </button>
    );
  }

  return (
    <div className={`badge ${className}`} aria-hidden="true" style={{ cursor: "default" }}>
      {inner}
    </div>
  );
}
