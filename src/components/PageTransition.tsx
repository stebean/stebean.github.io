import { usePageContext } from "@/context/PageContext";
import { useEffect, useRef } from "react";

// Number of vertical strips for the RPG wipe effect
const STRIPS = 12;

/**
 * RPG-style "curtain wipe" transition overlay.
 * Each strip covers from the same edge but with a staggered delay,
 * creating the feel of a stage curtain closing / opening.
 */
const PageTransition = () => {
  const { transitionPhase } = usePageContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const isCovering = transitionPhase === "covering";
  const isCovered = transitionPhase === "covered";
  const isRevealing = transitionPhase === "revealing";
  const isIdle = transitionPhase === "idle";

  const visible = !isIdle;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: visible ? "all" : "none",
        display: "flex",
      }}
    >
      {Array.from({ length: STRIPS }).map((_, i) => {
        const delay = i * 0.04;
        const reverseDelay = (STRIPS - 1 - i) * 0.035;

        let translateY: string;
        let transition: string;

        if (isCovering) {
          translateY = "0%";
          transition = `transform 0.55s cubic-bezier(0.76, 0, 0.24, 1) ${delay}s`;
        } else if (isCovered) {
          translateY = "0%";
          transition = "none";
        } else if (isRevealing) {
          translateY = "-100%";
          transition = `transform 0.55s cubic-bezier(0.76, 0, 0.24, 1) ${reverseDelay}s`;
        } else {
          // idle
          translateY = "100%";
          transition = "none";
        }

        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: "100%",
              background: "hsl(30 8% 6%)",
              transform: `translateY(${translateY})`,
              transition,
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
};

export default PageTransition;
