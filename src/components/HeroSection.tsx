import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { usePageContext, PageId } from "@/context/PageContext";
import { containerVariants, itemVariants } from "@/lib/animations";

const socials = [
  { icon: Github, href: "https://github.com/stebean", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/estebandsg/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/stebeandevart/", label: "Instagram" },
  { icon: Mail, href: "mailto:estebandesa0@gmail.com", label: "Email" },
];

const navItems: { label: string; page: PageId; num: string }[] = [
  { label: "Sobre mí", page: "about", num: "01" },
  { label: "Proyectos", page: "projects", num: "02" },
  { label: "Contacto", page: "contact", num: "03" },
];



const HomeSection = () => {
  const { navigateTo } = usePageContext();

  return (
    <section
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      id="home"
    >
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner decorations */}
      <span
        aria-hidden="true"
        className="absolute top-8 left-8 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40 font-mono"
      >
        Portfolio v2
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-8 right-8 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40 font-mono"
      >
        Zacatecas, MX
      </span>

      {/* Main content */}
      <motion.div
        className="flex flex-col items-center text-center gap-8 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Name */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight leading-[1.0]">
            Esteban
            <br />
            <span className="text-accent">de Santiago</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg font-heading tracking-wide">
            Product Developer — Diseño &amp; Código
          </p>
        </motion.div>

        {/* Nav buttons */}
        <motion.nav
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
          aria-label="Navegación principal"
        >
          {navItems.map(({ label, page, num }) => (
            <button
              key={page}
              id={`nav-btn-${page}`}
              onClick={() => navigateTo(page)}
              className="group relative px-8 py-4 min-w-[160px] rounded-xl border border-border
                bg-card/60 backdrop-blur-sm text-foreground font-heading font-medium
                hover:border-accent/50 hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/10
                transition-all duration-300 active:scale-95 overflow-hidden"
            >
              {/* Scanline hover effect */}
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(var(--accent) / 0.04) 3px, hsl(var(--accent) / 0.04) 4px)",
                }}
              />
              <span className="relative flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-muted-foreground/60 group-hover:text-accent/60 transition-colors">
                  {num}
                </span>
                <span>{label}</span>
                <span className="text-muted-foreground/0 group-hover:text-accent transition-all duration-300 translate-x-0 group-hover:translate-x-0.5 text-sm">
                  →
                </span>
              </span>
            </button>
          ))}
        </motion.nav>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex gap-2">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-lg border border-border bg-card/50 text-muted-foreground
                hover:text-foreground hover:border-foreground/20 hover:shadow-md
                transition-all duration-200 active:scale-95"
            >
              <Icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeSection;
