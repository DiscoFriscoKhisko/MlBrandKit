import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { cn } from "./utils";

interface FloatingShapeProps extends React.HTMLAttributes<HTMLDivElement> {
  depth?: number;
}

export function FloatingShape({ className, depth = 0.2, style, children, ...props }: FloatingShapeProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // The exact GSAP logic requested by the user
      gsap.to(el, {
        yPercent: depth * 40,
        rotation: depth * 10,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, elRef);

    return () => ctx.revert();
  }, [depth]);

  return (
    <div 
      ref={elRef} 
      className={cn("pointer-events-none absolute z-0", className)} 
      data-depth={depth}
      style={{ willChange: "transform", ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
