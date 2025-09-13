import * as React from "react";
import { useState, useEffect, useCallback, useContext } from "react";

interface CarouselContextType {
  currentIndex: number;
  next: () => void;
  prev: () => void;
  itemsPerView: number;
}

const CarouselContext = React.createContext<CarouselContextType | null>(null);

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  autoPlay?: boolean;
  interval?: number;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, autoPlay = true, interval = 3000, children, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsCount, setItemsCount] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    const carouselRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => carouselRef.current!);

    // Count items + responsive itemsPerView
    useEffect(() => {
      const updateItemsPerView = () => {
        const width = window.innerWidth;
        if (width >= 1024) setItemsPerView(3);
        else if (width >= 640) setItemsPerView(2);
        else setItemsPerView(1);
      };
      updateItemsPerView();
      window.addEventListener("resize", updateItemsPerView);

      const items = carouselRef.current?.querySelectorAll("[data-carousel-item]");
      setItemsCount(items?.length || 0);

      return () => window.removeEventListener("resize", updateItemsPerView);
    }, [children]);

    const maxIndex = Math.max(0, itemsCount - itemsPerView);

    const next = useCallback(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const prev = useCallback(() => {
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    // Auto-play
    useEffect(() => {
      if (autoPlay && itemsCount > itemsPerView) {
        const timer = setInterval(next, interval);
        return () => clearInterval(timer);
      }
    }, [autoPlay, interval, next, itemsCount, itemsPerView]);

    return (
      <CarouselContext.Provider value={{ currentIndex, next, prev, itemsPerView }}>
        <div
          ref={carouselRef}
          className={`relative overflow-hidden group ${className ?? ""}`}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);

export const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { currentIndex, itemsPerView } = useContext(CarouselContext)!;
    return (
      <div
        ref={ref}
        data-carousel-content
        className={`flex transition-transform duration-500 ease-in-out ${className ?? ""}`}
        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        {...props}
      />
    );
  }
);

export const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-carousel-item
      className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2 ${className ?? ""}`}
      {...props}
    />
  )
);

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { prev } = useContext(CarouselContext)!;
    return (
      <button
        ref={ref}
        onClick={prev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 
          w-10 h-10 rounded-full bg-white border-2 border-black
          text-black hover:bg-black hover:text-white
          opacity-0 group-hover:opacity-100 transition-all duration-300
          flex items-center justify-center font-bold text-lg
          shadow-lg hover:shadow-xl ${className ?? ""}`}
        {...props}
      >
        ←
      </button>
    );
  }
);

export const CarouselNext = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { next } = useContext(CarouselContext)!;
    return (
      <button
        ref={ref}
        onClick={next}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 rounded-full bg-white border-2 border-black
          text-black hover:bg-black hover:text-white
          opacity-0 group-hover:opacity-100 transition-all duration-300
          flex items-center justify-center font-bold text-lg
          shadow-lg hover:shadow-xl ${className ?? ""}`}
        {...props}
      >
        →
      </button>
    );
  }
);
