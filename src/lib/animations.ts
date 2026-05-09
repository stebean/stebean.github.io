import type { Variants } from "framer-motion";

/** Custom cubic bezier — smooth entrance */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Staggered container — children animate in sequence */
export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/** Fade + slide up — used for individual items */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Page-level entrance — wraps the whole page content */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, staggerChildren: 0.1, delayChildren: 0.1 },
  },
};
