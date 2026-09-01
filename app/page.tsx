import NavBar          from "./components/nav-bar";
import HeroSection     from "./components/hero-section";
import AboutSection    from "./components/about-section";
import StackSection    from "./components/stack-section";
import ProjectsSection from "./components/projects-section";
import ExperienceSection from "./components/experience-section";
import ContactSection  from "./components/contact-section";
import CurrentYear     from "./current-year";
import { contactEmail, navLinks, socialLinks } from "./lib/data";

export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="ambient-bg min-h-screen">
      <NavBar />

      <main>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <footer
        className="relative pt-14 pb-8"
        style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
      >
        <div aria-hidden="true" className="gold-rule absolute inset-x-0 top-0 opacity-40" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Top */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">

            {/* Identity */}
            <div>
              <p
                className="font-display text-2xl italic leading-none"
                style={{ color: "var(--gold)", fontWeight: 700 }}
              >
                JDR
              </p>
              <p className="mt-4 max-w-xs text-sm leading-7" style={{ color: "var(--muted)" }}>
                Software engineer building enterprise systems for healthcare
                and operations teams.
              </p>
              <div className="mt-5 inline-flex items-center gap-2.5">
                <span aria-hidden="true" className="live-dot" />
                <span className="lux-label" style={{ color: "var(--fg)" }}>
                  Available for work
                </span>
              </div>
            </div>

            {/* Navigate */}
            <nav aria-label="Footer">
              <p className="lux-label mb-4" style={{ color: "var(--gold)" }}>
                Navigate
              </p>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="nav-link inline-block text-sm"
                      style={{ color: "var(--muted)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Elsewhere */}
            <div>
              <p className="lux-label mb-4" style={{ color: "var(--gold)" }}>
                Elsewhere
              </p>
              <ul className="space-y-2.5">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.icon === "mail" ? undefined : "_blank"}
                      rel={link.icon === "mail" ? undefined : "noreferrer"}
                      className="nav-link inline-block text-sm"
                      style={{ color: "var(--muted)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${contactEmail}`}
                className="nav-link mt-5 inline-block break-all text-sm font-600"
                style={{ color: "var(--fg)", fontWeight: 600 }}
              >
                {contactEmail}
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-12 flex flex-col items-center gap-3 pt-6 sm:flex-row sm:justify-between"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p className="text-xs" style={{ color: "var(--subtle)" }}>
              &copy; <CurrentYear /> Jimuel Dave Rodado. All rights reserved.
            </p>
            <p className="lux-label" style={{ color: "var(--subtle)" }}>
              Davao City · Philippines
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
