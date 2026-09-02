import NavBar            from "./components/nav-bar";
import HeroSection       from "./components/hero-section";
import AboutSection      from "./components/about-section";
import StackSection      from "./components/stack-section";
import ProjectsSection   from "./components/projects-section";
import ExperienceSection from "./components/experience-section";
import ContactSection    from "./components/contact-section";
import SiteFooter        from "./components/site-footer";

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

      <SiteFooter />
    </div>
  );
}
