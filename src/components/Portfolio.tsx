import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ScrollScene from "@/components/ScrollScene";
import ProjectDoodle from "@/components/ProjectDoodle";
import BeneathCursor from "@/components/BeneathCursor";
import { useLang } from "@/context/LangContext";

const projects = [
  { name: "Casa Calavera", type: "WEB DESIGN / DEVELOPMENT", image: "/projects_img/casa-calavera-bar.webp", href: "https://casa-calavera.vercel.app/", index: 2, stack: "React · Framer Motion · Tailwind", color: "#c2c3ad" },
  { name: "Dovs", type: "PRODUCT / DESKTOP APP", image: "/projects_img/Dovs-Gestión-de-Alquileres.webp", href: "https://dovs.vercel.app/", index: 0, stack: "Flutter · Firebase · Stripe", color: "#b8cad3" },
  { name: "Poanas Radio", type: "WEB DEVELOPMENT / LIVE RADIO", image: "/projects_img/Poanas-Radio-Radio-en-Vivo-de-Poanas_-Durango.webp", href: "https://www.poanasradio.com.mx/", index: 1, stack: "React · APIs · Google AdSense", color: "#dfb7a0" },
];
const social = [{ name: "GitHub", icon: Github, href: "https://github.com/stebean" }, { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/estebandsg/" }, { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/stebean.dev/" }];


function ProjectList() {
  const { t, lang } = useLang();
  const reduced = useReducedMotion();
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [previewProject, setPreviewProject] = useState<string | null>(null);
  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const mobile = useIsMobile(701);
  const duration = reduced ? 0 : 0.25;
  const desktop = () => window.matchMedia("(min-width: 701px) and (hover: hover) and (pointer: fine)").matches;
  const positionPreview = (x: number, y: number) => {
    const width = Math.min(420, window.innerWidth * 0.32);
    const height = width * 9 / 16;
    previewX.set(x + width + 30 > window.innerWidth ? Math.max(12, x - width - 24) : x + 24);
    previewY.set(Math.min(Math.max(12, y - height / 2), window.innerHeight - height - 12));
  };

  return <div className="project-list project-list-text">
    <ProjectDoodle surprised={openProject !== null || previewProject !== null} />
    {projects.map(project => {
      const expanded = openProject === project.name;
      const preview = previewProject === project.name;
      const id = `project-${project.index}`;
      return <article className="project-row" key={project.name}>
        <div className="project-summary">
          <h3><button id={`${id}-trigger`} className="project-trigger"
            aria-expanded={expanded} aria-controls={`${id}-panel`}
            onClick={() => setOpenProject(expanded ? null : project.name)}
            onMouseEnter={event => { if (desktop()) { positionPreview(event.clientX, event.clientY); setPreviewProject(project.name); } }}
            onMouseMove={event => { if (desktop()) positionPreview(event.clientX, event.clientY); }}
            onMouseLeave={() => setPreviewProject(null)}
            onFocus={event => {
              if (desktop() && event.currentTarget.matches(":focus-visible")) {
                const bounds = event.currentTarget.getBoundingClientRect();
                positionPreview(bounds.right, bounds.top);
                setPreviewProject(project.name);
              }
            }}
            onBlur={() => setPreviewProject(null)}>
            <motion.span className="project-name" initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: mobile, amount: 0.1, margin: mobile ? "0px" : "0px 0px -20px 0px" }}
              animate={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 22 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}>{project.name}</motion.span>
          </button></h3>
          <a className="project-direct" href={project.href} target="_blank" rel="noopener noreferrer"
            aria-label={`${lang === "es" ? "Visitar" : "Visit"} ${project.name} (${t.shared.openInTab})`} onMouseEnter={() => setPreviewProject(null)} onFocus={() => setPreviewProject(null)}><ArrowUpRight /></a>
          <AnimatePresence>
            {preview && <motion.div key="preview" className="project-hover-preview" aria-hidden="true"
              style={{ x: previewX, y: previewY }}
              initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
              transition={{ duration, ease: "easeOut" }}>
              <motion.img src={project.image} alt="" initial={{ objectPosition: "50% 0%" }}
                animate={{ objectPosition: reduced ? "50% 0%" : ["50% 0%", "50% 100%"] }}
                transition={{ duration: reduced ? 0 : 12, ease: "easeInOut", repeat: reduced ? 0 : Infinity, repeatType: "reverse", repeatDelay: reduced ? 0 : 1 }} />
            </motion.div>}
          </AnimatePresence>
        </div>
        <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-trigger`}>
          <motion.div className="project-panel-clip" initial={false}
              animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
              aria-hidden={!expanded} {...{ inert: expanded ? undefined : "" }}
              transition={{ duration, ease: "easeInOut" }}>
              <div className="project-panel">
                <motion.img className="project-mobile-preview" loading="lazy" decoding="async" src={project.image} alt={`${lang === "es" ? "Captura de" : "Screenshot of"} ${project.name}`}
                  initial={{ objectPosition: "50% 0%" }}
                  animate={{ objectPosition: reduced || !expanded ? "50% 0%" : ["50% 0%", "50% 100%"] }}
                  transition={{ duration: reduced ? 0 : 12, ease: "easeInOut", repeat: reduced || !expanded ? 0 : Infinity, repeatType: "reverse", repeatDelay: reduced ? 0 : 1 }} />
                <p>{t.projects.items[project.index].description}</p>
                <div className="project-panel-meta"><span className="eyebrow">{t.projects.technologies}</span><p>{project.stack}</p>
                  <a href={project.href} target="_blank" rel="noopener noreferrer">{lang === "es" ? "Visitar" : "Visit"} <ArrowUpRight size={19} /></a>
                </div>
              </div>
          </motion.div>
        </div>
      </article>;
    })}
  </div>;
}

export default function Portfolio() {
  const { lang, toggle, t } = useLang();
  const en = lang === "en";
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);
  const sceneRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<SVGTSpanElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile(701);
  const zoomEnd = mobile ? 0.66 : 0.88;
  const [frame, setFrame] = useState({ width: 1000, height: 700, x: 440, y: 350 });
  const { scrollYProgress: heroProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const heroOpacity = useTransform(heroProgress, [0, 0.13], [1, 0]);
  const contentVisibility = useTransform(heroProgress, value => value >= 0.13 ? "hidden" : "visible");
  const vectorVisibility = useTransform(heroProgress, value => value >= zoomEnd ? "hidden" : "visible");
  const arrivalOpacity = useTransform(heroProgress, value =>
    Math.min(1, Math.max(0, (value - zoomEnd) / ((mobile ? 0.8 : 0.98) - zoomEnd))));
  const rotationRef = useRef<SVGGElement>(null);
  useMotionValueEvent(heroProgress, "change", value => {
    const angle = reduced ? 0 : -7 * Math.min(value / 0.45, 1);
    rotationRef.current?.setAttribute("transform", `rotate(${angle} ${frame.x} ${frame.y})`);
  });
  const viewBox = useTransform(heroProgress, value => {
    const p = reduced ? 0 : Math.min(value / zoomEnd, 1);
    const scale = Math.exp(p * Math.log(180));
    const width = frame.width / scale;
    const height = frame.height / scale;
    // Preserve the target point's screen position as the camera moves inward.
    const x = frame.x * (1 - 1 / scale);
    const y = frame.y * (1 - 1 / scale);
    return `${x} ${y} ${width} ${height}`;
  });
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const width = hero.clientWidth;
      const height = hero.clientHeight;
      const box = glyphRef.current?.getBBox();
      setFrame({ width, height,
        x: box ? box.x + box.width * 0.18 : width * 0.44,
        y: box ? box.y + box.height * 0.55 : height * 0.5 });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    document.fonts.ready.then(measure);
    measure();
    return () => { active = false; observer.disconnect(); };
  }, []);
  useEffect(() => {
    const box = glyphRef.current?.getBBox();
    if (box) setFrame(previous => ({ ...previous, x: box.x + box.width * 0.18, y: box.y + box.height * 0.55 }));
  }, [frame.width, frame.height]);
  const { scrollYProgress } = useScroll();
  return <MotionConfig reducedMotion="user"><div className="portfolio">
    <BeneathCursor />
    <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} />
    <a className="skip-link" href="#work">{en ? "Skip to projects" : "Saltar a proyectos"}</a>
    <motion.header className="site-header" initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}><a className="wordmark" href="#home" aria-label={t.nav.goHome}><img className="illustrated-logo" src="/image.png" alt="Esteban de Santiago" /></a><div className="header-controls"><button onClick={toggle} aria-label={t.nav.toggleLang}>{lang.toUpperCase()} <span>↓</span></button></div></motion.header>
    <main>
      <section ref={sceneRef} id="home" className={`hero-scene ${reduced ? "hero-scene-static" : ""}`}>
        <h1 className="sr-only">{en ? "Esteban de Santiago (Stebean), web developer and UI/UX designer in Zacatecas" : "Esteban de Santiago (Stebean), desarrollador web y diseñador UI/UX en Zacatecas"}</h1>
        <div className="hero-stage">
          <motion.svg className="brand-vector" viewBox={viewBox} style={{ visibility: reduced ? "visible" : vectorVisibility }} aria-hidden="true" preserveAspectRatio="none">
            <rect x="-100000" y="-100000" width="200000" height="200000" fill="var(--paper)" />
            <defs><clipPath id="brand-entrance-clip" clipPathUnits="userSpaceOnUse">
              <motion.rect x={0} width={frame.width} initial={reduced ? false : { y: frame.height, height: 0 }}
                animate={{ y: 0, height: frame.height }} transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }} />
            </clipPath></defs>
            <g clipPath="url(#brand-entrance-clip)"><g ref={rotationRef}>
            <text x={frame.width / 2} y={frame.height * 0.5} dominantBaseline="central" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontWeight="700" fontSize={frame.width * 0.18} letterSpacing={-frame.width * 0.0135} fill="var(--orange)">ste<tspan ref={glyphRef}>b</tspan>ean</text>
            </g></g>
          </motion.svg>
          {!reduced && <motion.div className="hero-arrival" style={{ opacity: arrivalOpacity }} aria-hidden="true"><div><span className="eyebrow">01 / {en ? "RECENT WORK" : "TRABAJOS RECIENTES"}</span><span>{en ? "Into the work." : "Dentro de la idea."}</span><ArrowDown /></div></motion.div>}
      <motion.div ref={heroRef} className="hero" style={{ opacity: reduced ? 1 : heroOpacity, visibility: reduced ? "visible" : contentVisibility }}><motion.div className="hero-top eyebrow" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.25 }}><span>{en ? "INDEPENDENT DEVELOPER & DESIGNER" : "DESARROLLADOR & DISEÑADOR INDEPENDIENTE"}</span><span className="location">ZACATECAS, MÉXICO<br />22°46′ N — 102°34′ W</span></motion.div>
        <div className="brand-center"><motion.p className="brand-prelude" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 0.65 }} transition={{ duration: 0.5, delay: reduced ? 0 : 0.35 }}>{en ? "A different perspective starts here." : "Una perspectiva diferente empieza aquí."}</motion.p><div className="brand-title" aria-hidden="true">stebean</div><motion.p className="brand-subtitle" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 0.5, delay: reduced ? 0 : 0.55 }}>{en ? "Design, code & a little curiosity." : "Diseño, código y un poco de curiosidad."}</motion.p><motion.a className="brand-enter" href="#work" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: reduced ? 0 : 0.7 }}>{en ? "Explore my work" : "Explora mi trabajo"}<ArrowDown size={16} /></motion.a></div>
        <motion.div className="hero-bottom" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.85 }}><p>{en ? "I turn ideas into digital experiences with their own identity. From the first sketch to the last line of code." : "Transformo ideas en experiencias digitales con identidad propia. Del primer boceto a la última línea de código."}</p></motion.div>
      </motion.div>
        </div>
      </section>
      <div className="blue-world">
      <div className="ticker" aria-hidden="true"><div>{Array.from({ length: 4 }, (_, i) => <span key={i}>CREATIVE DEVELOPMENT <b>✳</b> DESIGN WITH INTENT <b>✳</b> BUILT TO FEEL DIFFERENT <b>✳</b> </span>)}</div></div>
      <section id="work" className="work section-pad"><ScrollScene className="section-heading"><span className="eyebrow">01 / {en ? "RECENT WORK" : "TRABAJOS RECIENTES"}</span><h2>{en ? "Every idea" : "Cada idea"}<br /><i>{en ? "Tailor-made." : "A la medida."}</i></h2><span className="eyebrow work-count">(03 {en ? "PROJECTS" : "PROYECTOS"})</span></ScrollScene><ProjectList /></section>
      <section className="about section-pad" id="about"><span className="eyebrow">02 / {en ? "THE PERSON BEHIND THE PIXELS" : "LA PERSONA DETRÁS DE LOS PÍXELES"}</span><div className="about-layout"><ScrollScene className="about-title"><span className="about-mark" aria-hidden="true">↳</span><h2>{en ? "Curious by" : "Curioso por"}<br /><i>{en ? "nature." : "naturaleza."}</i></h2></ScrollScene><ScrollScene className="about-copy" delay={0.08}><p className="about-intro"><span>{en ? "Hi, I’m Esteban de Santiago. I think in design and build with code." : "Soy Esteban de Santiago. Pienso en diseño y construyo con código."}</span></p><p>{t.about.paragraphs[1]}</p><p>{t.about.paragraphs[2]}</p><div className="skills">{["UI/UX DESIGN", "WEB DEVELOPMENT", "REACT", "FLUTTER", "CREATIVE CODING"].map((s) => <span key={s}>{s}<ArrowUpRight size={13} /></span>)}</div></ScrollScene></div></section>
      <section id="contact" className="contact section-pad"><ScrollScene className="contact-top eyebrow"><span>03 / {en ? "NEXT STEP" : "EL SIGUIENTE PASO"}</span><span>ZACATECAS → {en ? "ANYWHERE" : "DONDE SEA"}</span></ScrollScene><ScrollScene className="contact-invitation"><p>{en ? "Got an idea that won’t leave your head?" : "¿Una idea que no te sale de la cabeza?"}</p></ScrollScene><ScrollScene className="contact-heading" delay={0.05}><motion.a className="contact-title" href="mailto:estebandesa0@gmail.com" whileTap={reduced ? undefined : { scale: 0.985 }} transition={{ duration: 0.15 }}><span className="contact-line">{en ? "Let’s make" : "Hagamos"}</span><br /><i className="contact-line">{en ? "it happen." : "que pase."}</i></motion.a><nav className="contact-socials" aria-label={en ? "Contact and social links" : "Contacto y redes sociales"}>{[...social, { name: "Email", href: "mailto:estebandesa0@gmail.com", icon: Mail }].map(({ name, href, icon: Icon }) => <a href={href} key={name} target={name === "Email" ? undefined : "_blank"} rel="noopener noreferrer" aria-label={name} title={name}><Icon size={44} strokeWidth={1.5} /></a>)}</nav></ScrollScene><ScrollScene className="contact-email" delay={0.1}><a className="email-link" href="mailto:estebandesa0@gmail.com">estebandesa0@gmail.com <ArrowUpRight size={20} /></a></ScrollScene><ScrollScene className="footer-scene"><footer><a className="wordmark" href="#home">stebean.</a><span className="eyebrow">© {new Date().getFullYear()} ESTEBAN DE SANTIAGO</span><a href="#home" aria-label={t.nav.goHome}>↑ {en ? "BACK UP" : "ARRIBA"}</a></footer></ScrollScene></section>
      </div>
    </main>
  </div></MotionConfig>;
}
