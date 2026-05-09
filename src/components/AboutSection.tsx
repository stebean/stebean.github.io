import { motion } from "framer-motion";
import { usePageContext } from "@/context/PageContext";
import { ArrowLeft } from "lucide-react";
import PageLabel from "@/components/PageLabel";
import { pageVariants, itemVariants } from "@/lib/animations";



const AboutSection = () => {
  const { navigateTo } = usePageContext();

  return (
    <section
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      id="about"
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

      <PageLabel label="01 / Sobre mí" />

      <motion.div
        className="w-full max-w-2xl px-6 md:px-10 space-y-8"
        variants={pageVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <button
            id="about-back-btn"
            onClick={() => navigateTo("home")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground
              transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            Volver
          </button>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight mb-2">
            Sobre mí
          </h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-muted-foreground text-lg leading-relaxed space-y-4"
        >
          <p>Hola, soy Esteban.</p>
          <p>
            Desarrollador y diseñador UI/UX de Zacatecas. Me especializo en construir
            productos digitales que se ven bien y funcionan mejor. He trabajado en apps
            móviles, sistemas web y tiendas online.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-2">
          {["Flutter", "React", "UI/UX", "Firebase", "TypeScript", "Figma"].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-border
                bg-card text-muted-foreground hover:text-foreground hover:border-foreground/20
                transition-all duration-200"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
