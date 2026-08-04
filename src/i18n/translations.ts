export type Lang = "es" | "en";

export const translations = {
  es: {
    // Navbar
    nav: {
      ariaLabel: "Navegación principal",
      goHome: "Ir al inicio",
      toggleTheme: "Cambiar tema",
      toggleLang: "Switch to English",
    },
    // Hero
    hero: {
      subtitle: "Product Developer — Diseño & Código",
      nav: [
        { label: "Sobre mí",  num: "01" },
        { label: "Proyectos", num: "02" },
        { label: "Contacto",  num: "03" },
      ],
    },
    // About
    about: {
      back: "Volver",
      heading: "Sobre mí",
      pageLabel: "01 / Sobre mí",
      paragraphs: [
        "Hola, soy Esteban.",
        "Desarrollador web y diseñador UI/UX de Zacatecas. Construyo sitios y aplicaciones web modernos, rápidos y escalables para empresas y marcas.",
        "Soy cofundador de DTX Lab — un equipo donde desarrollamos software más completo: apps móviles, de escritorio y productos digitales propios.",
      ],
    },
    // Projects
    projects: {
      back: "Volver",
      heading: "Proyectos",
      pageLabel: "02 / Proyectos",
      subtitle: "Algunos de los proyectos en los que he trabajado.",
      filters: ["Todos", "Desarrollo", "Diseño"] as const,
      viewMore: "Ver más...",
      noPreview: "Sin preview disponible",
      technologies: "Tecnologías",
      viewProject: "Ver proyecto",
      // categories
      categories: { Desarrollo: "Desarrollo", Diseño: "Diseño" },
      // project data
      items: [
        {
          title: "Dovs - Sistema de Gestión de Renta",
          description:
            "Sistema de escritorio para control de alquileres, clientes, inventario y cotizaciones.",
        },
        {
          title: "POANAS - Emisora de Radio",
          description:
            "Sitio web para transmisión de radio y noticias locales de Poanas, Durango.",
        },
        {
          title: "Casa Calavera — Bar & Cafetería",
          description:
            "Sitio web con personalidad propia para Casa Calavera, un bar-cafetería con ambiente único. Cuenta con múltiples menús cada uno con su propia identidad visual, y una galería comunitaria donde los clientes exhiben su arte. Un proyecto de iniciativa personal inspirado en el carácter auténtico del lugar.",
        },
      ],
    },
    // Contact
    contact: {
      back: "Volver",
      heading: "Hablemos",
      pageLabel: "03 / Contacto",
      subtitle:
        "¿Tienes un proyecto en mente o simplemente quieres saludar? Estoy abierto a conversaciones, colaboraciones y oportunidades.",
    },
    // Shared
    shared: {
      openInTab: "Abrir en nueva pestaña",
      close: "Cerrar",
    },
  },

  en: {
    // Navbar
    nav: {
      ariaLabel: "Main navigation",
      goHome: "Go to home",
      toggleTheme: "Toggle theme",
      toggleLang: "Cambiar a Español",
    },
    // Hero
    hero: {
      subtitle: "Product Developer — Design & Code",
      nav: [
        { label: "About",    num: "01" },
        { label: "Projects", num: "02" },
        { label: "Contact",  num: "03" },
      ],
    },
    // About
    about: {
      back: "Back",
      heading: "About me",
      pageLabel: "01 / About",
      paragraphs: [
        "Hi, I'm Esteban.",
        "Web developer and UI/UX designer from Zacatecas, Mexico. I build modern, fast, and scalable websites and web applications for businesses and brands.",
        "I'm co-founder of DTX Lab — a team where we develop more complete software: mobile apps, desktop apps, and our own digital products.",
      ],
    },
    // Projects
    projects: {
      back: "Back",
      heading: "Projects",
      pageLabel: "02 / Projects",
      subtitle: "Some of the projects I've worked on.",
      filters: ["All", "Development", "Design"] as const,
      viewMore: "See more...",
      noPreview: "No preview available",
      technologies: "Technologies",
      viewProject: "View project",
      categories: { Desarrollo: "Development", Diseño: "Design" },
      items: [
        {
          title: "Dovs - Rental Management System",
          description:
            "Desktop system for managing rentals, clients, inventory, and quotes.",
        },
        {
          title: "POANAS - Radio Station",
          description:
            "Website for live radio streaming and local news from Poanas, Durango.",
        },
        {
          title: "Casa Calavera — Bar & Café",
          description:
            "A website with its own personality for Casa Calavera, a bar-café with a unique atmosphere. Features multiple menus each with their own visual identity, and a community gallery where clients showcase their art. A personal initiative project inspired by the authentic character of the place.",
        },
      ],
    },
    // Contact
    contact: {
      back: "Back",
      heading: "Let's talk",
      pageLabel: "03 / Contact",
      subtitle:
        "Have a project in mind or just want to say hi? I'm open to conversations, collaborations, and opportunities.",
    },
    // Shared
    shared: {
      openInTab: "Open in new tab",
      close: "Close",
    },
  },
} satisfies Record<Lang, object>;

export type Translations = typeof translations[Lang];
