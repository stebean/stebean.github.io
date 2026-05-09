import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { usePageContext } from "@/context/PageContext";
import PageLabel from "@/components/PageLabel";
import { containerVariants } from "@/lib/animations";
import ProjectCard from "@/components/ProjectCard";

type ProjectCategory = "Desarrollo" | "Diseño";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  image?: string;
  href?: string;
  github?: string;
  opensource?: boolean;
}

const projects: Project[] = [
  {
    title: "Refaccionaria ACME — Diseño UI/UX",
    description:
      "Propuesta de ecommerce para tienda de refacciones automotrices. Incluye buscador por marca, modelo y año, sistema de puntos, banners promocionales y catálogo de productos.",
    tags: ["Figma", "UI/UX", "Ecommerce"],
    category: "Diseño",
    href: "https://www.figma.com/design/7xrtAOnqBOKsaYM72CN9zK/E-commerce-Refaccionaria?node-id=0-1&t=QKvcmHl6UPzXay2C-1",
  },
  {
    title: "Tabletop - Tienda de Juegos de Mesa",
    description:
      "Ecommerce completo desarrollado en Wix para una tienda de juegos de mesa. Incluye catálogo con filtros, sistema de ofertas, carrito de compras y sección de pedidos.",
    tags: ["Wix", "UI/UX", "Tienda Online"],
    category: "Diseño",
    href: "https://21040208.wixsite.com/tabletop",
  },
  {
    title: "Dovs - Sistema de Gestión de Renta",
    description:
      "Sistema de escritorio para control de alquileres, clientes, inventario y cotizaciones.",
    tags: ["Flutter", "Firebase", "Stripe"],
    category: "Desarrollo",
    href: "https://dovs.vercel.app/#descargar",
    image: "/projects_img/Dovs - Gestión de Alquileres.png",
  },
  {
    title: "POANAS - Emisora de Radio",
    description:
      "Sitio web para transmisión de radio y noticias locales de Poanas, Durango.",
    tags: ["React", "Google Adsense", "APIs"],
    category: "Desarrollo",
    href: "https://www.poanasradio.com.mx/",
  },

];

type FilterType = "Todos" | "Desarrollo" | "Diseño";



const ProjectsSection = () => {
  const [filter, setFilter] = useState<FilterType>("Todos");
  const { navigateTo } = usePageContext();

  const filteredProjects = projects.filter(
    (project) => filter === "Todos" || project.category === filter
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

      <PageLabel label="02 / Proyectos" />

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
              Volver
            </button>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight mb-2">
                  Proyectos
                </h2>
                <p className="text-muted-foreground">
                  Algunos de los proyectos en los que he trabajado.
                </p>
              </div>

              {/* Filter */}
              <div className="flex bg-secondary/50 p-1 rounded-lg border border-border w-max shrink-0">
                {(["Todos", "Desarrollo", "Diseño"] as FilterType[]).map((f) => (
                  <button
                    key={f}
                    id={`filter-${f.toLowerCase()}`}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      filter === f
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
            key={filter}
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
