import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLang } from "@/context/LangContext";
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
  const { resolvedTheme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang, t } = useLang();
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
        aria-label={t.nav.goHome}
        className="absolute top-3 left-3 opacity-90 hover:opacity-100 transition-opacity active:scale-95"
      >
        <img src="/image.png" alt="Logo" className="w-10 h-10 rounded-full" />
      </button>

      {/* Controls — top-right corner */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        {/* Language segmented control */}
        <div
          className="flex items-center bg-secondary/60 border border-border/60 rounded-md p-0.5 gap-0"
          role="group"
          aria-label={t.nav.toggleLang}
        >
          {(["es", "en"] as const).map((l) => (
            <button
              key={l}
              id={`nav-lang-${l}`}
              onClick={() => lang !== l && toggleLang()}
              className={`relative px-2.5 py-1 text-[11px] font-mono font-semibold tracking-widest rounded transition-all duration-200 uppercase
                ${lang === l
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              aria-pressed={lang === l}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          id="nav-theme-btn"
          onClick={toggleTheme}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
          aria-label={t.nav.toggleTheme}
        >
          {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

