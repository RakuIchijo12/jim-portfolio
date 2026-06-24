import NavBar          from "./components/nav-bar";
import HeroSection     from "./components/hero-section";
import AboutSection    from "./components/about-section";
import StackSection    from "./components/stack-section";
import ProjectsSection from "./components/projects-section";
import ExperienceSection from "./components/experience-section";
import ContactSection  from "./components/contact-section";
import CurrentYear     from "./current-year";

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
        className="relative py-8 text-center"
        style={{
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
        }}
      >
        {/* Gold rule */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px opacity-40"
          style={{
            background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <span
              className="font-display text-sm font-600 italic"
              style={{ color: "var(--gold)", fontWeight: 600 }}
            >
              JDR
            </span>

            <p className="text-xs" style={{ color: "var(--subtle)" }}>
              &copy; <CurrentYear /> Jimuel Dave Rodado. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
