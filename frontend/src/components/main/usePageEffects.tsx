import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Dispatch, SetStateAction } from "react";
import { productSlides, showcaseColors } from "@/components/main/data";

type PageEffectsContextValue = {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  colorIndex: number;
  visibleSections: Record<string, boolean>;
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
  isTabVisible: boolean;
};

const PageEffectsContext = createContext<PageEffectsContextValue | undefined>(
  undefined
);

export function PageEffectsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(
    typeof document !== "undefined" ? !document.hidden : true
  );

  // timers
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Color cycling
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = setInterval(() => {
      setColorIndex((p) => (p + 1) % showcaseColors.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setActiveIndex(
          (p) => (p - 1 + productSlides.length) % productSlides.length
        );
      if (e.key === "ArrowRight")
        setActiveIndex((p) => (p + 1) % productSlides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Intersection observer
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisibleSections((p) => ({ ...p })); // SSR safe fallback
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute("data-section");
            if (sectionName && sectionName !== "hero") {
              // 👆 don't auto-trigger hero, that's handled separately
              setVisibleSections((prev) => ({ ...prev, [sectionName]: true }));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" } // tighter margins, smoother flow
    );

    const nodes = document.querySelectorAll("[data-section]");
    nodes.forEach((n) => {
      if (n.getAttribute("data-section") !== "hero") {
        observer.observe(n); 
      }
    });

    return () => observer.disconnect();
  }, []);

  // Hero staggered animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    heroTimeouts.current.push(
      setTimeout(() => setVisibleSections((p) => ({ ...p, hero: true })), 200),
      setTimeout(
        () => setVisibleSections((p) => ({ ...p, heroDesc: true })),
        800
      ),
      setTimeout(
        () => setVisibleSections((p) => ({ ...p, heroButtons: true })),
        1400
      )
    );

    return () => {
      heroTimeouts.current.forEach((t) => clearTimeout(t));
      heroTimeouts.current = [];
    };
  }, []);

  // Autoplay
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }

    if (!isPaused && isTabVisible && productSlides.length > 1) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((p) => (p + 1) % productSlides.length);
      }, 4000);
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, isTabVisible]);

  // Visibility change
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    setIsTabVisible(!document.hidden);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  const value: PageEffectsContextValue = {
    activeIndex,
    setActiveIndex,
    colorIndex,
    visibleSections,
    isPaused,
    setIsPaused,
    isTabVisible,
  };

  return (
    <PageEffectsContext.Provider value={value}>
      {children}
    </PageEffectsContext.Provider>
  );
}

export function usePageEffects(): PageEffectsContextValue {
  const ctx = useContext(PageEffectsContext);
  if (!ctx)
    throw new Error("usePageEffects must be used within PageEffectsProvider");
  return ctx;
}
