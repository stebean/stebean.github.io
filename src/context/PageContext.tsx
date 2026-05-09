import { createContext, useContext, useState, useRef, useCallback, ReactNode } from "react";

export type PageId = "home" | "about" | "projects" | "contact";
type Phase = "idle" | "covering" | "covered" | "revealing";

interface PageContextValue {
  currentPage: PageId;
  navigateTo: (page: PageId) => void;
  isTransitioning: boolean;
  transitionPhase: Phase;
}

const PageContext = createContext<PageContextValue | null>(null);

export const usePageContext = () => {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error("usePageContext must be used within PageProvider");
  return ctx;
};

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [transitionPhase, setTransitionPhase] = useState<Phase>("idle");

  // Single mutable ref — navigateTo reads from here, never stale closures
  const s = useRef({ page: "home" as PageId, busy: false });

  const navigateTo = useCallback((page: PageId) => {
    if (page === s.current.page || s.current.busy) return;
    s.current.busy = true;

    setTransitionPhase("covering");
    setTimeout(() => {
      s.current.page = page;
      setCurrentPage(page);
      setTransitionPhase("covered");
      setTimeout(() => {
        setTransitionPhase("revealing");
        setTimeout(() => {
          s.current.busy = false;
          setTransitionPhase("idle");
        }, 850);
      }, 100);
    }, 600);
  }, []); // stable forever — reads from ref

  return (
    <PageContext.Provider
      value={{
        currentPage,
        navigateTo,
        isTransitioning: transitionPhase !== "idle",
        transitionPhase,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
