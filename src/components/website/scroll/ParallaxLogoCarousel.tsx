import React, { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';

interface ParallaxLogoCarouselProps {
  logos: { name: string, src: string }[];
  className?: string;
}

export function ParallaxLogoCarousel({ logos, className = '' }: ParallaxLogoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
       if (!containerRef.current) return;
       
       const container = containerRef.current;
       
       ScrollTrigger.matchMedia({
          "(min-width: 1024px)": function() {
             // Parallax Shift
             // "drift horizontally by ~5%... on top of continuous movement"
             gsap.to(container, {
                xPercent: -5,
                ease: 'none',
                scrollTrigger: {
                   trigger: container,
                   start: 'top bottom',
                   end: 'bottom top',
                   scrub: true
                }
             });
          },
          "(max-width: 1023px)": function() {
             gsap.set(container, { xPercent: 0 });
          }
       });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Duplicate logos for infinite loop
  const displayLogos = [...logos, ...logos, ...logos, ...logos]; 

  return (
    <div className={`w-full py-20 bg-[#050505] overflow-hidden ${className}`}>
       <div className="text-center mb-12">
          <span className="font-mono text-[#17f7f7] text-xs uppercase tracking-widest">Trusted By</span>
       </div>
       
       {/* Parallax Container */}
       <div ref={containerRef} className="w-full">
          {/* Marquee Slider */}
          <div className="relative flex w-full overflow-hidden mask-gradient-x">
             <div className="flex gap-12 md:gap-24 animate-marquee whitespace-nowrap py-4 px-4">
                {displayLogos.map((logo, i) => (
                   <div key={i} className="flex items-center justify-center shrink-0 w-32 h-12 md:w-48 md:h-16 opacity-50 hover:opacity-100 transition-opacity duration-300">
                      {/* Using simple text or img placeholders since I don't have real logo SVGs handy unless passed */}
                      {/* Assuming src is an image URL or we fallback to text */}
                      {logo.src ? (
                         <img src={logo.src} alt={logo.name} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all" />
                      ) : (
                         <span className="font-serif text-xl text-white">{logo.name}</span>
                      )}
                   </div>
                ))}
             </div>
             
             {/* Double it for seamless loop if using CSS animation */}
             <div className="flex gap-12 md:gap-24 animate-marquee whitespace-nowrap py-4 px-4 absolute top-0 left-full">
                {displayLogos.map((logo, i) => (
                   <div key={i} className="flex items-center justify-center shrink-0 w-32 h-12 md:w-48 md:h-16 opacity-50 hover:opacity-100 transition-opacity duration-300">
                      {logo.src ? (
                         <img src={logo.src} alt={logo.name} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all" />
                      ) : (
                         <span className="font-serif text-xl text-white">{logo.name}</span>
                      )}
                   </div>
                ))}
             </div>
          </div>
       </div>

       <style>{`
          .mask-gradient-x {
             mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
          @keyframes marquee {
             0% { transform: translateX(0); }
             100% { transform: translateX(-100%); }
          }
          .animate-marquee {
             animation: marquee 40s linear infinite;
          }
       `}</style>
    </div>
  );
}
