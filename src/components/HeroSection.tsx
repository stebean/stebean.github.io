import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/stebean", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/estebandsg/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/stebeandevart/", label: "Instagram" },
  { icon: Mail, href: "mailto:estebandesa0@gmail.com", label: "Email" },
];

const HeroSection = () => {
  return (
    <section className="min-h-[85vh] flex items-center">
      <div className="container">
        <div className="max-w-2xl space-y-5">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Esteban de Santiago
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Product Developer — <span className="text-accent">Diseño</span> & Código
          </motion.p>

          <motion.div
            className="flex gap-3 pt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-lg border border-border bg-card text-muted-foreground
                  hover:text-foreground hover:border-foreground/20 hover:shadow-md
                  transition-all duration-200 active:scale-95"
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
