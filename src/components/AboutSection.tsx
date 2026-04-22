import ScrollReveal from "./ScrollReveal";

const AboutSection = () => {
    return (
        <section className="py-24 md:py-32" id="about">
            <div className="container">
                <ScrollReveal>
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
                            Sobre mí
                        </h2>
                        <div className="text-muted-foreground text-lg leading-relaxed space-y-4">
                            <p>Hola, soy Esteban.</p>
                            <p>
                                Desarrollador y diseñador UI/UX de Zacatecas. Me especializo en construir productos digitales que se ven bien y funcionan mejor. He trabajado en apps móviles, sistemas web y tiendas online.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default AboutSection;
