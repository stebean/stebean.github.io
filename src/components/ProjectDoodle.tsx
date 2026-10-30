import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/** Original vector portrait: a companion to the illustrated brand mark. */
export default function ProjectDoodle({ surprised }: { surprised: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const aimX = useMotionValue(0);
  const aimY = useMotionValue(0);
  const headX = useSpring(aimX, { stiffness: 85, damping: 22 });
  const headY = useSpring(aimY, { stiffness: 85, damping: 22 });
  const headAngle = useTransform(headX, value => value * 0.45);
  const eyeX = useSpring(aimX, { stiffness: 170, damping: 24 });
  const eyeY = useSpring(aimY, { stiffness: 170, damping: 24 });
  useEffect(() => {
    if (reduced) return;
    const reset = () => { aimX.set(0); aimY.set(0); };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !ref.current) return;
      const bounds = ref.current.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      aimX.set(Math.max(-7, Math.min(7, (event.clientX - bounds.left - bounds.width / 2) / 65)));
      aimY.set(Math.max(-5, Math.min(5, (event.clientY - bounds.top - bounds.height / 2) / 65)));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [reduced, aimX, aimY]);

  const expressionTransition = { duration: reduced ? 0 : 0.22 };
  return <motion.aside className="project-doodle" aria-hidden="true" initial={false}>
    <div ref={ref} className="doodle-portrait">
      <svg viewBox="0 0 320 350" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="160" cy="287" rx="112" ry="20" strokeWidth="1" opacity=".22" />
          <path d="M43 189c-14-43 7-101 48-126M249 91c31 22 47 55 40 84" strokeWidth="1" opacity=".35" strokeDasharray="3 7" />
          <path d="m59 92 3-13 3 13 12 3-12 3-3 13-3-13-12-3 12-3ZM269 218l3-9 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" strokeWidth="1.6" />
          <path d="M89 270c15-17 35-26 57-29m29 0c24 4 43 13 56 30" strokeWidth="2.5" />
          <path d="m127 245 16 19 18-11 18 11 16-19M160 254v32" strokeWidth="2" />
        </g>
        <motion.g style={{ x: headX, y: headY, rotate: headAngle, transformOrigin: "160px 160px" }}>
          <g stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M98 151c-11-10-23-4-22 10 1 12 12 22 23 20" fill="var(--orange)" />
            <path d="M222 150c11-9 22-2 20 12-1 11-11 20-22 19" fill="var(--orange)" />
            <path d="M97 126c-1 18-1 43 3 62 6 31 27 55 58 57 30 1 56-23 63-54 5-21 4-48 0-67" fill="var(--orange)" />
            <path d="m86 160 6 5M234 159l-6 6" strokeWidth="2" />
            <path d="M98 144c-9-23-6-49 8-65 13-14 33-24 54-25 28 0 53 14 66 38l-3 39" fill="var(--orange)" />
            <path d="M98 126c26-19 56-30 91-29 25 1 46 9 61 23 5 5 3 10-4 10-18 1-36-9-54-10-33-1-60 11-91 23Z" fill="currentColor" />
            <path d="M105 111c13-25 33-43 55-57M163 73l13 13" strokeWidth="1.5" opacity=".65" />
            <motion.path d="M116 147c7-5 15-7 23-4m42 0c8-3 16-2 23 3" strokeWidth="2.5"
              animate={{ y: surprised ? -7 : 0 }} transition={expressionTransition} />
          </g>
          <motion.g style={{ x: eyeX, y: eyeY }} fill="currentColor">
            <motion.ellipse cx="132" cy="168" animate={{ rx: surprised ? 8 : 6, ry: surprised ? 13 : 10 }} transition={expressionTransition} />
            <motion.ellipse cx="190" cy="168" animate={{ rx: surprised ? 8 : 6, ry: surprised ? 13 : 10 }} transition={expressionTransition} />
          </motion.g>
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="m159 171-3 18c2 4 7 5 11 2" strokeWidth="2.2" />
            <motion.path d="M139 207c12 10 28 10 40-1" strokeWidth="2.5"
              animate={{ opacity: surprised ? 0 : 1 }} transition={expressionTransition} />
            <motion.ellipse cx="160" cy="211" rx="8" ry="11" strokeWidth="2.5"
              animate={{ opacity: surprised ? 1 : 0 }} transition={expressionTransition} />
            <path d="M116 190h7m75 0h7" strokeWidth="1.5" opacity=".4" />
          </g>
        </motion.g>
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".7">
          <path d="M96 313c-18 6-38 2-49-9m0 0 1 12m-1-12 12 1" />
        </g>
      </svg>
    </div>

  </motion.aside>;
}
