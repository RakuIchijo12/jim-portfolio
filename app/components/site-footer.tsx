import CurrentYear from "@/app/current-year";

export default function SiteFooter() {
  return (
    <footer
      className="relative py-10 sm:py-12"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div aria-hidden="true" className="gold-rule absolute inset-x-0 top-0 opacity-40" />

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs" style={{ color: "var(--subtle)" }}>
          &copy; <CurrentYear />{" "}
          <span style={{ color: "var(--muted)" }}>Jimuel Dave Rodado</span>.
          {" "}All rights reserved.
        </p>
      </div>
    </footer>
  );
}
