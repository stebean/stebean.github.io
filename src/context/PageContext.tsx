import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

export type PageId = "home" | "about" | "projects" | "contact";
type Phase = "idle" | "covering" | "covered" | "revealing";

const VALID_PAGES: PageId[] = ["home", "about", "projects", "contact"];

/** Reads the current URL hash and returns the matching PageId, or "home". */
const hashToPage = (): PageId => {
  const hash = window.location.hash.replace("#", "").toLowerCase();
  return (VALID_PAGES.includes(hash as PageId) ? hash : "home") as PageId;
};

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
  const [currentPage, setCurrentPage] = useState<PageId>(hashToPage);
  const [transitionPhase, setTransitionPhase] = useState<Phase>("idle");

  // Single mutable ref — navigateTo reads from here, never stale closures
  const s = useRef({ page: hashToPage() as PageId, busy: false });

  const applyTransition = useCallback((page: PageId, pushHistory: boolean) => {
    if (page === s.current.page || s.current.busy) return;
    s.current.busy = true;

    // Push a new history entry so the back button works
    if (pushHistory) {
      const hash = page === "home" ? "" : `#${page}`;
      window.history.pushState({ page }, "", `/${hash}`);
    }

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
  }, []);

  const navigateTo = useCallback(
    (page: PageId) => applyTransition(page, true),
    [applyTransition]
  );

  // Listen to browser back / forward buttons
  useEffect(() => {
    const onPopState = () => {
      const target = hashToPage();
      applyTransition(target, false);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [applyTransition]);

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
