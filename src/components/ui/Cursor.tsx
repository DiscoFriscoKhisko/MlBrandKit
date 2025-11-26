import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Move cursor
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    // Hover states
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    // Add listeners to interactive elements
    const addListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, .cursor-hover');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    const removeListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, .cursor-hover');
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    
    // Initial add
    addListeners();

    // Observer for dynamic content
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      removeListeners();
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2 will-change-transform
        ${isHovering ? 'scale-[4] bg-white' : 'scale-100 bg-white'}
      `}
      style={{
        boxShadow: isHovering ? 'none' : '0 0 0 0px rgba(255, 255, 255, 0.5)'
      }}
    />
  );
}
