import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";

import FooterReveal from "@/components/FooterReveal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="footer-reveal-wrapper bg-background">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
      </main>
      <FooterReveal />
    </div>
  );
};

export default Index;
