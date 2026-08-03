import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, ArrowLeft } from "lucide-react";
import { usePageContext } from "@/context/PageContext";
import { useLang } from "@/context/LangContext";
import PageLabel from "@/components/PageLabel";
import { containerVariants, itemVariants } from "@/lib/animations";

const contactLinks = [
  { icon: Mail,      href: "mailto:estebandesa0@gmail.com",                   label: "Email",     text: "estebandesa0@gmail.com" },
  { icon: Github,    href: "https://github.com/stebean",                      label: "GitHub",    text: "@stebean" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/estebandsg/",         label: "LinkedIn",  text: "estebandsg" },
  { icon: Instagram, href: "https://www.instagram.com/stebean.dev/",          label: "Instagram", text: "@stebean.dev" },
];

const ContactSection = () => {
  const { navigateTo } = usePageContext();
  const { t } = useLang();
  const c = t.contact;

  return (
    <section
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      id="contact"
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

      <PageLabel label={c.pageLabel} />

      <motion.div
        className="w-full max-w-lg px-6 md:px-10 space-y-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <button
            id="contact-back-btn"
            onClick={() => navigateTo("home")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground
              transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            {c.back}
          </button>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight mb-3">
            {c.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {c.subtitle}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          {contactLinks.map(({ icon: Icon, href, label, text }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center gap-4 px-5 py-4 rounded-xl border border-border
                bg-card/60 backdrop-blur-sm text-left
                hover:border-accent/40 hover:bg-accent/5 hover:shadow-md
                transition-all duration-300"
            >
              <span className="p-2 rounded-lg bg-secondary text-muted-foreground group-hover:text-accent group-hover:bg-accent/10 transition-all duration-200">
                <Icon size={18} strokeWidth={1.5} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground/60 font-mono uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                <p className="text-sm font-medium text-foreground truncate">{text}</p>
              </div>
              <span className="text-muted-foreground/30 group-hover:text-accent/60 transition-colors text-sm">
                →
              </span>
            </a>
          ))}
        </motion.div>

        <motion.p variants={itemVariants} className="text-xs text-muted-foreground/40 font-mono">
          © {new Date().getFullYear()} Esteban de Santiago
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ContactSection;
