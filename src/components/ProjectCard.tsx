import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Minus, Square } from "lucide-react";

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

  return (
    <>
      {/* Card */}
      <article
        className="group relative rounded-xl border border-border bg-card overflow-hidden
          hover:shadow-lg hover:border-foreground/10 transition-all duration-300 flex flex-col cursor-pointer"
        onClick={() => project.image && setOpen(true)}
        role={project.image ? "button" : undefined}
        tabIndex={project.image ? 0 : undefined}
        onKeyDown={(e) => e.key === "Enter" && project.image && setOpen(true)}
      >
        {/* Screenshot preview — browser window style */}
        {project.image && (
          <div className="relative w-full overflow-hidden bg-muted flex-shrink-0" style={{ height: 180 }}>
            {/* Browser chrome bar */}
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
            {/* Screenshot — shows top portion */}
            <img
              src={project.image}
              alt={`Preview de ${project.title}`}
              className="w-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 mt-7"
              style={{ height: "calc(180px - 28px)", objectPosition: "top" }}
              loading="lazy"
            />
            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card/80 to-transparent" />
            {/* "Click to expand" hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100
              transition-opacity duration-200 bg-background/10 backdrop-blur-[1px] mt-7">
              <span className="text-xs font-medium bg-background/90 border border-border rounded-full px-3 py-1 shadow-md">
                Ver screenshot
              </span>
            </div>
          </div>
        )}

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-heading font-semibold text-base leading-snug">{project.title}</h3>
            <div className="flex gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              {project.opensource && project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                  bg-badge-opensource text-badge-opensource-foreground hover:opacity-90 transition-opacity">
                  <Github size={11} /> Open Source
                </a>
              )}
              {project.href && (
                <a href={project.href} target="_blank" rel="noopener noreferrer"
                  aria-label={`Ver ${project.title}`}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink size={15} />
                </a>
              )}
              {project.github && !project.opensource && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  aria-label={`GitHub de ${project.title}`}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                  <Github size={15} />
                </a>
              )}
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-3 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-3 border-t border-border/50">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-md border ${
              project.category === "Diseño"
                ? "border-accent/30 text-accent bg-accent/5"
                : "border-emerald-500/30 text-emerald-600 bg-emerald-500/5 dark:text-emerald-400 dark:border-emerald-400/30"
            }`}>
              {project.category}
            </span>
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Desktop window modal */}
      <AnimatePresence>
        {open && project.image && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[1000] bg-background/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            {/* Window — nearly fullscreen on mobile, centered + max-w on desktop */}
            <motion.div
              key="window"
              className="fixed z-[1001] flex flex-col rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-border"
              style={{
                top: "clamp(8px, 2vw, 16px)",
                bottom: "clamp(8px, 2vw, 16px)",
                left: "clamp(8px, 2vw, 16px)",
                right: "clamp(8px, 2vw, 16px)",
                maxWidth: "900px",
                margin: "0 auto",
              }}
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {/* Title bar */}
              <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3
                bg-secondary/90 backdrop-blur-sm border-b border-border">
                {/* macOS-style buttons */}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors group relative"
                >
                  <X size={8} className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 text-red-900" />
                </button>
                <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span className="w-3 h-3 rounded-full bg-green-400/70" />

                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 bg-background/50 rounded-md px-3 py-1">
                    <span className="text-[11px] text-muted-foreground font-mono truncate max-w-[300px]">
                      {project.href ?? project.title}
                    </span>
                  </div>
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Abrir en nueva pestaña"
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Scrollable screenshot */}
              <div className="flex-1 overflow-y-auto bg-background overscroll-contain">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full"
                  draggable={false}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
