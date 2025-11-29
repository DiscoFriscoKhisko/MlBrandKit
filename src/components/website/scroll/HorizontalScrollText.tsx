import React, { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';

interface HorizontalScrollTextProps {
  text: string;
  className?: string;
}

export function HorizontalScrollText({ text, className = '' }: HorizontalScrollTextProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!triggerRef.current || !headingRef.current) return;

      const trigger = triggerRef.current;
      const heading = headingRef.current;
      const chars = heading.querySelectorAll('.char');

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const headingWidth = heading.scrollWidth;

      // --- Horizontal Scroll ---
      
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
           // Desktop Logic
           const yStart = 0;
           const yEnd = 100;

           // Initial Set
           gsap.set(heading, {
              x: 0, // Start closer to center? Prompt: headingWidth - windowWidth + windowWidth * 0.5
              // Let's start it just offscreen or aligned left
           });

           gsap.fromTo(heading, 
             { x: 0, y: yStart },
             {
               x: () => -(headingWidth - windowWidth), // Scroll until end is visible
               y: yEnd,
               ease: 'none',
               scrollTrigger: {
                 trigger: trigger,
                 start: 'top bottom',
                 end: 'bottom top',
                 scrub: true
               }
             }
           );
        },
        "(max-width: 1023px)": function() {
           // Mobile Logic
           // Prompt: yStart = 100, yEnd = 200...
           const yStart = 50;
           const yEnd = 150;
           
           gsap.fromTo(heading,
             { x: 0, y: yStart },
             {
               x: () => -(headingWidth - windowWidth),
               y: yEnd,
               ease: 'none',
               scrollTrigger: {
                 trigger: trigger,
                 start: 'top bottom',
                 end: 'bottom top',
                 scrub: true
               }
             }
           );
        }
      });

      // --- Character Drop-In Animation ---
      // "As the text scrolls, each letter 'drops in' from above... linked to scroll"
      
      gsap.set(chars, {
         yPercent: -60,
         rotate: 10,
         opacity: 0
      });

      gsap.to(chars, {
         yPercent: 0,
         rotate: 0,
         opacity: 1,
         ease: 'back.inOut(4)',
         stagger: 0.1, // Reduced stagger because 0.35 is very slow for long text
         scrollTrigger: {
            trigger: trigger,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true
         }
      });

    }, triggerRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <div ref={triggerRef} className={`w-full py-32 overflow-hidden flex items-center bg-background ${className}`}>
      <h2 ref={headingRef} className="font-serif text-[20vw] lg:text-[16vw] leading-none font-bold text-white whitespace-nowrap flex px-4">
        {text.split('').map((char, i) => (
          <span key={i} className="char inline-block origin-center will-change-transform">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
    </div>
  );
}
