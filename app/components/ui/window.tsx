import { displayUrl } from "@/app/lib/project-looks";

/**
 * An app window: three lights, a title in the middle and anything extra on
 * the right. Terminals, editors, the API client and the screenshots all sit
 * in one of these, so the page reads like a workstation.
 */
export function Window({
  title,
  extra,
  children,
  className = "",
  bodyClassName = "",
  as: Tag = "div",
}: {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  as?: "div" | "figure" | "section";
}) {
  return (
    <Tag className={`win ${className}`}>
      <div className="win__bar">
        <span aria-hidden="true" className="win__lights">
          <i />
          <i />
          <i />
        </span>
        {title !== undefined && <span className="win__title">{title}</span>}
        {extra !== undefined && <span className="win__extra">{extra}</span>}
      </div>
      <div className={`win__body ${bodyClassName}`}>{children}</div>
    </Tag>
  );
}

/** Browser chrome for a screenshot: lights, padlock and the address. */
export function BrowserBar({ link }: { link: string }) {
  return (
    <span className="win__bar win__bar--browser" aria-hidden="true">
      <span className="win__lights">
        <i />
        <i />
        <i />
      </span>
      <span className="win__url">
        <svg viewBox="0 0 12 14" className="win__lock">
          <path d="M3.2 6 V4.2 a2.8 2.8 0 0 1 5.6 0 V6" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <rect x="1.5" y="6" width="9" height="7" rx="1.6" fill="currentColor" />
        </svg>
        <span className="truncate">{displayUrl(link)}</span>
      </span>
    </span>
  );
}
