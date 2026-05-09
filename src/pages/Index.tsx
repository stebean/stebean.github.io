import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import { PageProvider, usePageContext } from "@/context/PageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import PageTransition from "@/components/PageTransition";

const PageContent = () => {
  const { currentPage } = usePageContext();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      {/* Fixed navbar overlay */}
      <Navbar />

      {/* Pages — only the active one is rendered */}
      {currentPage === "home" && <HeroSection />}
      {currentPage === "about" && <AboutSection />}
      {currentPage === "projects" && <ProjectsSection />}
      {currentPage === "contact" && <ContactSection />}

      {/* RPG wipe transition overlay */}
      <PageTransition />
    </div>
  );
};

const Index = () => {
  return (
    <PageProvider>
      <PageContent />
    </PageProvider>
  );
};

export default Index;
