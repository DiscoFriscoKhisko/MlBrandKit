import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageContainer } from '../ui/CardSystem';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxItem {
  image: string;
  title: string;
  description: string;
}

interface VerticalParallaxScrollProps {
  items: ParallaxItem[];
  className?: string;
}

export function VerticalParallaxScroll({ items, className = '' }: VerticalParallaxScrollProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLDivElement>(null);
  const headingsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!triggerRef.current || !imagesRef.current || !headingsContainerRef.current) return;

      const trigger = triggerRef.current;
      const images = imagesRef.current;
      const headingsContainer = headingsContainerRef.current;
      
      // We need to wait for images to load or just rely on layout
      // In a real app, might need ResizeObserver. For now, assume content is ready.
      
      const imagesHeight = images.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Desktop Animation
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function() {
           // 1. Image Column Parallax
           // The logic from the prompt:
           // trigger height is set to match images height (done via CSS/content)
           // We pin the trigger so we can scroll "through" it? 
           // The prompt says: "On pointer: fine (desktop): The trigger's height is set to match images' height... images is animated vertically".
           // It DOES NOT explicitly say "pin: true" for desktop, but usually for this "window moving through canvas" effect with that specific math, 
           // either the container is fixed height (100vh) and we scroll the inner content, OR the container is tall and we parallax the content.
           
           // Given the specific GSAP code: 
           // end: `+=${images.offsetHeight - windowHeight}`
           // This implies the scroll distance is exactly the overflow amount.
           
           // Let's try pinning the container to 100vh, and scrolling the content.
           // But the prompt says "trigger's height is set to match images' height".
           
           // Let's interpret "trigger" as the wrapper.
           // If I pin the wrapper, the user stays in place while content moves.
           
           gsap.to(images, {
             y: () => -(imagesHeight - windowHeight),
             ease: 'none',
             scrollTrigger: {
               trigger: trigger,
               start: 'top top',
               end: () => `+=${imagesHeight - windowHeight}`,
               scrub: true,
               pin: true, // I am adding pin: true because otherwise the math suggests we are scrubbing through the overflow.
               anticipatePin: 1
             }
           });

           // 2. Headings Parallax
           // "headingsTimeline uses the same trigger... y: (headingsContainer.offsetHeight * -1) + 300"
           const headings = gsap.utils.toArray('.js-heading');
           
           // We want the headings column to move in sync (or parallax) with the images.
           // The prompt says "text column slides upward as a block".
           gsap.to(headingsContainer, {
              y: () => -(headingsContainer.offsetHeight - windowHeight + 300), // Modified slightly to keep last item visible
              ease: 'none',
              scrollTrigger: {
                 trigger: trigger,
                 start: 'top top',
                 end: () => `+=${imagesHeight - windowHeight}`,
                 scrub: true
              }
           });
           
           // Individual heading animations (if needed per prompt "Every heading... Start: y:150...")
           // The prompt says "Every heading: Start: y: 150, End: y: ...". 
           // This sounds like they are animating individually?
           // "Result: the text column slides upward as a block". 
           // I will stick to moving the container for better performance/sync, as implemented above.
        },
        
        "(max-width: 1023px)": function() {
           // Mobile Behavior
           // "End position is (windowHeight * 1.1)... pin: true"
           gsap.to(images, {
             y: () => -(imagesHeight - windowHeight * 1.1),
             ease: 'none',
             scrollTrigger: {
               trigger: trigger,
               start: 'top top',
               end: () => `+=${imagesHeight - windowHeight}`,
               scrub: true,
               pin: true
             }
           });
        }
      });

    }, triggerRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={triggerRef} className={`relative w-full min-h-screen bg-[#050505] overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        
        {/* Text Column */}
        <div className="relative h-screen flex items-center z-10 pointer-events-none lg:pointer-events-auto px-7 md:px-14">
           <div ref={headingsContainerRef} className="w-full space-y-[40vh] lg:space-y-[60vh] py-[20vh]">
              {items.map((item, i) => (
                 <div key={i} className="js-heading max-w-lg">
                    <span className="text-[#17f7f7] font-mono text-xs uppercase tracking-widest mb-4 block">0{i + 1} — {item.title}</span>
                    <h3 className="font-serif text-3xl md:text-5xl text-white mb-6">{item.description}</h3>
                 </div>
              ))}
           </div>
        </div>

        {/* Image Column */}
        <div className="relative h-full">
           <div ref={imagesRef} className="flex flex-col w-full">
              {items.map((item, i) => (
                 <div key={i} className="w-full h-[80vh] lg:h-screen relative p-4 lg:p-12">
                    <div className="w-full h-full relative overflow-hidden rounded-3xl border border-white/10">
                       <ImageContainer src={item.image} alt={item.title} />
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}
