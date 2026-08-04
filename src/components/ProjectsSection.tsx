import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { usePageContext } from "@/context/PageContext";
import { useLang } from "@/context/LangContext";
import PageLabel from "@/components/PageLabel";
import { containerVariants } from "@/lib/animations";
import ProjectCard from "@/components/ProjectCard";

// Static project metadata (image, href, tags, github) — language-independent
const projectMeta = [
  {
    tags: ["Flutter", "Firebase", "Stripe"],
    category: "Desarrollo" as const,
    href: "https://dovs.vercel.app/",
    image: "/projects_img/Dovs - Gestión de Alquileres.png",
  },
  {
    tags: ["React", "Google Adsense", "APIs"],
    category: "Desarrollo" as const,
    href: "https://www.poanasradio.com.mx/",
    image: "/projects_img/Poanas Radio - Radio en Vivo de Poanas, Durango.png",
  },
  {
    tags: ["React", "Vite", "Framer Motion", "Tailwind", "Vercel"],
    category: "Diseño" as const,
    href: "https://casa-calavera.vercel.app/",
    image: "/projects_img/casa-calavera-bar.png",
  },
];

const ProjectsSection = () => {
  const { navigateTo } = usePageContext();
  const { t, lang } = useLang();
  const p = t.projects;

  // Filter labels differ per language; map them to category values
  const filterMap: Record<string, string | "all"> = {
    [p.filters[0]]: "all",
    [p.filters[1]]: "Desarrollo",
    [p.filters[2]]: "Diseño",
  };

  const [filterLabel, setFilterLabel] = useState(p.filters[0]);

  // Reset to "all" filter when language changes
  useEffect(() => {
    setFilterLabel(p.filters[0]);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeCategory = filterMap[filterLabel] ?? "all";

  // Merge translated text with static metadata
  const projects = projectMeta.map((meta, i) => ({
    ...meta,
    title: p.items[i].title,
    description: p.items[i].description,
  }));

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  return (
    <section
      className="w-full h-full flex flex-col overflow-hidden relative"
      id="projects"
    >
      {/* Subtle background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <PageLabel label={p.pageLabel} />

      {/* Scrollable content */}
      <div className="relative z-10 flex flex-col h-full overflow-y-auto">
        <div className="container max-w-4xl py-16 md:py-20 flex-1">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <button
              id="projects-back-btn"
              onClick={() => navigateTo("home")}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground
                transition-colors duration-200 mb-6 group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              {p.back}
            </button>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight mb-2">
                  {p.heading}
                </h2>
                <p className="text-muted-foreground">{p.subtitle}</p>
              </div>

              {/* Filter */}
              <div className="flex bg-secondary/50 p-1 rounded-lg border border-border w-max shrink-0">
                {p.filters.map((f) => (
                  <button
                    key={f}
                    id={`filter-${f.toLowerCase()}`}
                    onClick={() => setFilterLabel(f)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      filterLabel === f
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="grid gap-4 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            key={`${filterLabel}-${lang}`}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
