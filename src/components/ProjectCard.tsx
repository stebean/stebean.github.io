import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { useLang } from "@/context/LangContext";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: "Desarrollo" | "Diseño";
  image?: string;
  href?: string;
  github?: string;
  opensource?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const p = t.projects;

  // Translate category label
  const categoryLabel = p.categories[project.category] ?? project.category;

  // Toggle body class so Navbar can hide itself while modal is open
  useEffect(() => {
    if (open) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  return (
    <>
      {/* ── Card (uniform height, title only) ─────────────────────── */}
      <article
        className="group relative rounded-xl border border-border bg-card overflow-hidden
          hover:shadow-lg hover:border-foreground/10 transition-all duration-300
          flex flex-col cursor-pointer h-full"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        aria-label={`${p.viewProject} ${project.title}`}
      >
        {/* Screenshot preview — browser window */}
        {project.image ? (
          <div className="relative w-full overflow-hidden bg-muted flex-shrink-0" style={{ height: 180 }}>
            {/* Browser chrome */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 px-3 py-2
              bg-secondary/90 backdrop-blur-sm border-b border-border/50">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <div className="flex-1 mx-3 h-4 rounded bg-background/60 flex items-center px-2">
                <span className="text-[9px] text-muted-foreground/50 truncate font-mono">
                  {project.href ?? "#"}
                </span>
              </div>
            </div>
            {/* Screenshot top portion */}
            <img
              src={project.image}
              alt={`Preview ${project.title}`}
              className="w-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
              style={{ height: "calc(180px - 28px)", marginTop: 28, objectPosition: "top" }}
              loading="lazy"
            />
            {/* Fade bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent" />
            {/* Hover hint */}
            <div className="absolute inset-0 mt-7 flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              bg-background/20 backdrop-blur-[2px]">
              <span className="text-xs font-medium bg-background/95 border border-border
                rounded-full px-4 py-1.5 shadow-lg">
                {p.viewMore}
              </span>
            </div>
          </div>
        ) : (
          /* Placeholder for projects without image */
          <div className="relative w-full flex-shrink-0 bg-secondary/30 flex items-center justify-center
            group-hover:bg-secondary/50 transition-colors duration-300" style={{ height: 120 }}>
            <span className="text-3xl opacity-20 select-none font-heading font-bold">
              {project.title.charAt(0)}
            </span>
            <div className="absolute inset-0 flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-xs font-medium bg-background/95 border border-border
                rounded-full px-4 py-1.5 shadow-lg">
                {p.viewMore}
              </span>
            </div>
          </div>
        )}

        {/* Card footer — title + category + links only */}
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-heading font-semibold text-sm leading-snug truncate">
              {project.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded border ${
                project.category === "Diseño"
                  ? "border-accent/30 text-accent bg-accent/5"
                  : "border-emerald-500/30 text-emerald-600 bg-emerald-500/5 dark:text-emerald-400 dark:border-emerald-400/30"
              }`}>
                {categoryLabel}
              </span>
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-1.5 py-0.5 text-[10px] rounded bg-secondary text-secondary-foreground">
                  {tag}
                </span>
              ))}
              {project.tags.length > 2 && (
                <span className="text-[10px] text-muted-foreground/60">+{project.tags.length - 2}</span>
              )}
            </div>
          </div>

          {/* External links — stop propagation so they don't open modal */}
          <div className="flex gap-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
            {project.href && (
              <a href={project.href} target="_blank" rel="noopener noreferrer"
                aria-label={`${p.viewProject} ${project.title}`}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink size={14} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                aria-label={`GitHub ${project.title}`}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                <Github size={14} />
              </a>
            )}
          </div>
        </div>
      </article>

      {/* ── Modal — desktop: side-by-side | mobile: stacked ────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[1000] bg-background/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            {/* Window */}
            <motion.div
              key="window"
              className="fixed z-[1001] flex flex-col rounded-xl sm:rounded-2xl overflow-hidden
                shadow-2xl border border-border bg-card"
              style={{
                top: "clamp(8px, 2vw, 16px)",
                bottom: "clamp(8px, 2vw, 16px)",
                left: "clamp(8px, 2vw, 16px)",
                right: "clamp(8px, 2vw, 16px)",
                maxWidth: 960,
                margin: "0 auto",
              }}
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {/* Title bar */}
              <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5
                bg-secondary/80 backdrop-blur-sm border-b border-border">
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t.shared.close}
                  className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors group/close relative"
                >
                  <X size={7} className="absolute inset-0 m-auto opacity-0 group-hover/close:opacity-100 text-red-900" />
                </button>
                <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span className="w-3 h-3 rounded-full bg-green-400/70" />
                <div className="flex-1 flex justify-center">
                  <div className="bg-background/50 rounded px-3 py-0.5 max-w-xs w-full">
                    <span className="block text-[11px] text-muted-foreground font-mono truncate text-center">
                      {project.href ?? project.title}
                    </span>
                  </div>
                </div>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={t.shared.openInTab}
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>

              {/* Body — mobile: column (info top, screenshot bottom) | desktop: row (info left, screenshot right) */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">

                {/* Info panel */}
                <div className="flex-shrink-0 md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-border
                  overflow-y-auto p-5 space-y-4">
                  <div>
                    <h2 className="font-heading font-bold text-lg leading-snug mb-1">
                      {project.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/50">
                      {p.technologies}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded border ${
                        project.category === "Diseño"
                          ? "border-accent/30 text-accent bg-accent/5"
                          : "border-emerald-500/30 text-emerald-600 bg-emerald-500/5 dark:text-emerald-400 dark:border-emerald-400/30"
                      }`}>
                        {categoryLabel}
                      </span>
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs rounded bg-secondary text-secondary-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {(project.href || project.github) && (
                    <div className="space-y-2 pt-2">
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-foreground
                            hover:text-accent transition-colors"
                        >
                          <ExternalLink size={14} />
                          {p.viewProject}
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github size={14} />
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Screenshot panel — scrollable */}
                {project.image ? (
                  <div className="flex-1 overflow-y-auto bg-background overscroll-contain min-h-[200px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full"
                      draggable={false}
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-secondary/20 text-muted-foreground text-sm">
                    {p.noPreview}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
