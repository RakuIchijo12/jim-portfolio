import { DARK_ICONS, TECH_ICON_MAP } from "@/app/lib/tech-icons";

/** A logo on a light tile, or the first letters when there is no logo. */
export function TechIcon({ name, src }: { name: string; src?: string }) {
  const file = src ?? (TECH_ICON_MAP[name] ? `/stack-icons/${TECH_ICON_MAP[name]}` : null);
  return (
    <span className="tech__icon" aria-hidden="true">
      {file ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          src={file}
          width={18}
          height={18}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={DARK_ICONS.has(name) ? "is-dark" : undefined}
        />
      ) : (
        <span className="tech__txt">{name.slice(0, 2)}</span>
      )}
    </span>
  );
}

/** A row of technology chips. */
export function TechList({
  items,
  className = "",
  size = "md",
}: {
  items: readonly string[];
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <ul className={`techs ${className}`} data-size={size}>
      {items.map((tech) => (
        <li key={tech} className="tech">
          <TechIcon name={tech} />
          {tech}
        </li>
      ))}
    </ul>
  );
}
