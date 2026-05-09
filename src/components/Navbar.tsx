import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { usePageContext } from "@/context/PageContext";
import { useState, useEffect } from "react";

/** Watches the body for the .modal-open class set by ProjectCard */
const useModalOpen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsModalOpen(document.body.classList.contains("modal-open"));

    const observer = new MutationObserver(check);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return isModalOpen;
};

const Navbar = () => {
  const { resolvedTheme, toggle } = useTheme();
  const { navigateTo } = usePageContext();
  const isModalOpen = useModalOpen();

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 transition-opacity duration-200"
      style={{ opacity: isModalOpen ? 0 : 1, pointerEvents: isModalOpen ? "none" : "auto" }}
    >
      {/* Logo — top-left corner, flush */}
      <button
        id="nav-logo-btn"
        onClick={() => navigateTo("home")}
        aria-label="Ir al inicio"
        className="absolute top-3 left-3 opacity-90 hover:opacity-100 transition-opacity active:scale-95"
      >
        <img src="/image.png" alt="Logo" className="w-10 h-10 rounded-full" />
      </button>

      {/* Theme toggle — top-right corner, flush */}
      <button
        id="nav-theme-btn"
        onClick={toggle}
        className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
        aria-label="Cambiar tema"
      >
        {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
};

export default Navbar;
