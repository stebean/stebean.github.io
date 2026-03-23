import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const ScrollReveal = ({ children, className, delay = 0, direction = "up" }: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const offsets = {
    up: { y: 20 },
    left: { x: -20 },
    right: { x: 20 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(4px)", ...offsets[direction] }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)", x: 0, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
