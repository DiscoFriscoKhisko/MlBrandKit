import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Initial state
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });
    gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0 });

    const onMouseMove = (e: MouseEvent) => {
      // Smooth follow for cursor
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out", scale: 1 });
      // Faster follow for dot
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out", scale: 1 });

      const target = e.target as HTMLElement;
      if (target === cursor || target === dot) return;

      // Check for interactive elements
      // We check for:
      // 1. 'a' tags
      // 2. 'button' tags
      // 3. Elements with class 'interactive'
      // 4. Inputs and textareas
      const isInteractive = target.closest('a, button, .interactive, input, textarea, [role="button"]');

      if (isInteractive) {
        // Hover state: expanded cursor, hidden dot
        gsap.to(cursor, { scale: 3, duration: 0.3 });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else {
        // Normal state: normal cursor, visible dot
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    // Add hover listeners to ensure we catch everything even if mousemove misses it briefly
    const onMouseEnter = () => {
       gsap.to(cursor, { scale: 3, duration: 0.3 });
       gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onMouseLeave = () => {
       gsap.to(cursor, { scale: 1, duration: 0.3 });
       gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    // Attach event listeners
    window.addEventListener("mousemove", onMouseMove);
    
    // Optional: MutationObserver to attach listeners to dynamic elements? 
    // For now, the mousemove check is efficient enough for global checking.

    return () => {
        window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-white rounded-full z-[100] mix-blend-difference bg-white pointer-events-none"
        style={{ pointerEvents: 'none' }}
      />
      <div 
        ref={cursorDotRef} 
        className="hidden md:block fixed top-0 left-0 w-1 h-1 bg-white rounded-full z-[100] mix-blend-difference pointer-events-none"
        style={{ pointerEvents: 'none' }}
      />
    </>
  );
}
