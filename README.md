# Stebean — Portfolio Web

<img width="1366" height="639" alt="image" src="https://github.com/user-attachments/assets/19932ef7-f0d9-44bb-b8d6-6171c2817922" />

Este es el código fuente de mi sitio web personal y portafolio profesional, diseñado con una estética moderna, minimalista y de alto rendimiento.

He decidido abrir el código de este proyecto para que la comunidad pueda usarlo como base para sus propios portafolios, aprender de la estructura o simplemente explorar cómo está construido.

Este es un proyecto en **constante evolución**. Seguiré añadiendo mejoras, nuevas secciones y optimizaciones conforme el diseño web y las herramientas que utilizo sigan avanzando

---

## Demo
Puedes ver el sitio en vivo en: **[stebean.github.io](https://stebean.github.io/)**

---

## Características Principales
- **Diseño Moderno:** Inspirado en tendencias minimalistas con tipografía 'Space Grotesk'.
- **Interacciones Fluidas:** Micro-animaciones suaves usando `framer-motion`.
- **Efecto Reveal en el Footer:** Un efecto de scroll único para una despedida memorable.
- **Componentes de Shadcn UI:** UI consistente y accesible construida sobre Radix UI.
- **Modo Oscuro Integrado:** Soporte nativo para temas claros y oscuros.
- **Optimizado para SEO:** Estructura semántica y metadatos listos.
- **Despliegue Automático:** Configurado con GitHub Actions para publicar en GitHub Pages al instante.

---

## Stack Tecnológico
- **Core:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Gestión de Estado/Datos:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Testing:** [Vitest](https://vitest.dev/)

---

### Como instalar y ejecutar localmente

La forma más sencilla de empezar es haciendo un **Fork** de este repositorio para tener tu propia copia en tu perfil de GitHub.

### Configuración local alternativamente:

1. **Clonar el repositorio**
```bash
git clone https://github.com/stebean/stebean.github.io.git
cd stebean.github.io
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en local (Modo desarrollo)**
```bash
npm run dev
```

### 4. Construir para producción
```bash
npm run build
```

---

## Cómo personalizarlo para ti

Si decides usar este proyecto como base, aquí tienes los puntos clave para hacerlo tuyo:

1.  **Información Personal:** Edita los archivos dentro de `src/components/` (especialmente `HeroSection.tsx`, `FooterReveal.tsx` y `ProjectsSection.tsx`).
2.  **Logo/Imágenes:** Sustituye el archivo `public/image.png` por tu propia foto o logo.
3.  **Colores:** Puedes ajustar la paleta de colores global en `src/index.css` modificando las variables HSL dentro de `:root` y `.dark`.
4.  **Tipografía:** Si quieres cambiar las fuentes, puedes hacerlo en `tailwind.config.ts` y en el `import` de `@fontsource` en el CSS global.

---

## Despliegue en GitHub Pages

Este proyecto ya incluye un flujo de trabajo automático en `.github/workflows/deploy.yml`. 

Para usarlo:
1. Sube tu código a GitHub.
2. Ve a **Settings -> Pages** en tu repositorio.
3. En **Source**, selecciona **GitHub Actions**.

¡Y ya está! Cada `git push` actualizará tu sitio automáticamente.

---

## Contribuciones
¡Las contribuciones son más que bienvenidas! Si tienes ideas para mejorar el diseño o añadir nuevas funciones, siéntete libre de abrir un **Pull Request** o una **Issue**.

---

## Licencia
Este proyecto es **Open Source** y está bajo la licencia [MIT](LICENSE). Siéntete libre de usarlo para fines personales o comerciales, ¡pero un agradecimiento o una mención siempre se agradece! 😉

---

Hecho con ❤️ por [Esteban de Santiago](https://github.com/stebean)
