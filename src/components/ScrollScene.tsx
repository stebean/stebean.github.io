import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** Reversible section reveals; keep focused content visible for keyboard navigation. */
export default function ScrollScene({ children, className, delay = 0 }: {
  children: ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.08, margin: "0px 0px -24px 0px" });
  const [focused, setFocused] = useState(false);
  const visible = reduced || inView || focused;
  return <motion.div ref={ref} className={className}
    initial={reduced ? false : { opacity: 0, y: 24 }}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
    transition={{ duration: reduced ? 0 : visible ? 0.55 : 0.25,
      delay: visible && !focused ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}>
    {children}
  </motion.div>;
}
