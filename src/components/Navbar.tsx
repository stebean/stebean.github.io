import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const links = [
  { label: "Sobre mí", href: "#about" },
  { label: "Proyectos", href: "#projects" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, toggle } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-14">
        <a href="/" className="font-heading font-semibold text-lg tracking-tight mt-2 mb-2">
          <img src="/image.png" alt="Logo" className="w-12 h-12 rounded-full" />
        </a>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggle}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
            aria-label="Cambiar tema"
          >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1">
          <button
            onClick={toggle}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
            aria-label="Cambiar tema"
          >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
