import { ExternalLink, Github } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  href?: string;
  github?: string;
  opensource?: boolean;
}

const projects: Project[] = [
];

const ProjectsSection = () => {
  return (
    <section className="py-24 md:py-32" id="projects">
      <div className="container">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
            Proyectos
          </h2>
          <p className="text-muted-foreground max-w-md mb-12">
            Algunos de los proyectos en los que he trabajado recientemente.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.08}>
              <article className="group relative rounded-xl border border-border bg-card overflow-hidden
                hover:shadow-lg hover:border-foreground/10 transition-all duration-300">
                {project.image && (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-heading font-semibold text-lg">{project.title}</h3>
                    <div className="flex gap-1.5 shrink-0">
                      {project.opensource && project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                          bg-badge-opensource text-badge-opensource-foreground
                          hover:opacity-90 transition-opacity"
                        >
                          <Github size={12} />
                          Open Source
                        </a>
                      )}
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver ${project.title}`}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.github && !project.opensource && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub de ${project.title}`}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
