import { Github, Linkedin, Mail, Instagram, Heart } from "lucide-react";

const contactLinks = [
  { icon: Mail, href: "mailto:estebandesa0@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/stebean", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/estebandsg/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/stebeandevart/", label: "Instagram" },
];

const FooterReveal = () => {
  return (
    <footer className="footer-reveal bg-card border-t border-border">
      <div className="container py-20 md:py-28">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
            Hablemos
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            ¿Tienes un proyecto en mente o simplemente quieres saludar?
            Estoy abierto a conversaciones, colaboraciones y oportunidades.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            {contactLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-xl border border-border bg-background text-muted-foreground
                  hover:text-foreground hover:border-foreground/20 hover:shadow-md
                  transition-all duration-200 active:scale-95"
              >
                <Icon size={22} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Esteban de Santiago</p>
          <a
            href="https://github.com/stebean/stebean.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Heart size={14} className="text-primary" />
            Este portafolio es open source
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterReveal;
