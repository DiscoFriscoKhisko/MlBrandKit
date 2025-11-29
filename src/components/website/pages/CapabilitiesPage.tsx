import React, { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';
import { ArrowLeft } from 'lucide-react';
import { TYPOGRAPHY } from '../design-system';
import { ImageContainer } from '../../ui/CardSystem';
import { Button } from '../../ui/button';

const CAPABILITIES_DATA = [
  {
    title: "The Vision Sprint",
    description: "Validate before you build. In just two weeks, we turn your napkin sketch into a high-fidelity prototype and technical plan that investors can actually see. Low risk, high clarity.",
    tags: ["Clickable Prototype", "Technical Audit", "2 Weeks Fixed"],
    image: "https://images.unsplash.com/photo-1680016661694-1cd3faf31c3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90b3R5cGluZyUyMHdpcmVmcmFtZSUyMHNrZXRjaCUyMGRlc2lnbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzY0MTgyNjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "#"
  },
  {
    title: "The MVP Launchpad",
    description: "For founders ready to go from zero to one. We build market-ready products—secure, scalable, and architected for growth—so you can focus entirely on acquiring your first customers.",
    tags: ["Web & Mobile Apps", "React & Supabase", "8–12 Weeks"],
    image: "https://images.unsplash.com/photo-1669023414180-4dcf35d943e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwc29mdHdhcmUlMjBsYXVuY2glMjBtb2Rlcm4lMjB0ZWNofGVufDF8fHx8MTc2NDE4MjYwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "#"
  },
  {
    title: "The Growth Engine",
    description: "Websites that pull their weight. We combine clear storytelling with performance engineering to build digital experiences that actually convert traffic into revenue.",
    tags: ["High-Performance Site", "Programmatic SEO", "Framer / Webflow"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBncm93dGglMjBjaGFydCUyMHBlcmZvcm1hbmNlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2NDE4MjYwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "#"
  },
  {
    title: "Workflow OS",
    description: "Put your operations on autopilot. We tuck autonomous AI agents into your existing tools (Slack, CRM) to handle the messy, manual work so your team can focus on judgment.",
    tags: ["Custom RAG Agents", "CRM Automation", "Python & AI"],
    image: "https://images.unsplash.com/photo-1646583288948-24548aedffd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYXV0b21hdGlvbiUyMHdvcmtmbG93JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzY0MTgyNjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "#"
  },
  {
    title: "The Partner Pod",
    description: "A technical co-founder, without the equity split. You get a dedicated Product Pod—Strategist, Designer, and Engineer—integrated into your Slack to ship clean, maintainable code.",
    tags: ["Dedicated Team", "Daily Standups", "Monthly Sub"],
    image: "https://images.unsplash.com/photo-1733826544831-ad71d05c8423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGNvZGluZyUyMHN0YXJ0dXAlMjBvZmZpY2V8ZW58MXx8fHwxNzY0MTgyNjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "#"
  }
];

export function CapabilitiesPage({ onBack }: { onBack: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);

  useLayoutEffect(() => {
    // Ensure ScrollTrigger is refreshed
    ScrollTrigger.refresh();
    
    const container = containerRef.current;
    if (!container) return;

    // Use selector for robust element order
    const items = gsap.utils.toArray<HTMLElement>(".capability-card");
    const total = items.length;

    if (total === 0) return;

    // MatchMedia for Desktop only animation
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${window.innerHeight * (total)}`, // Add extra scroll space for the last item
          scrub: true,
          pin: true, // Use GSAP pinning instead of CSS sticky for better control
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });

      items.forEach((item, i) => {
          if (i === 0) return; // First item stays put
          
          // Animate subsequent items up to cover the previous ones
          tl.to(item, {
              yPercent: -100 * i, 
              ease: 'none',
              duration: 1
          });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen w-full text-white">
      {/* Header / Nav Area */}
      <div className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
           <Button
             variant="ghost"
             size="sm"
             withArrow={false}
             withAnimation={false}
             onClick={onBack}
             className="gap-2"
           >
             <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
             Back
           </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-32 px-7 md:px-14 pb-20">
         <h1 className={`${TYPOGRAPHY.display} mb-6`}>Capabilities</h1>
         <p className={`${TYPOGRAPHY.bodyLarge} text-[#d5dada] max-w-2xl`}>
            Our full-spectrum methodology for building digital products that scale.
         </p>
      </div>

      {/* Scroll Section */}
      {/* We remove the manual height style and let GSAP pin handle the spacing */}
      <div className="w-full relative z-10">
         
         {/* Trigger / Container */}
         <div 
            ref={containerRef}
            className="w-full flex flex-col lg:justify-center lg:overflow-hidden lg:h-screen bg-[#050505]"
         >
            {/* Items List */}
            <div className="flex flex-col w-full">
               {CAPABILITIES_DATA.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link}
                    ref={el => itemsRef.current[index] = el!}
                    // Add specific class for GSAP selection
                    className="
                      capability-card
                      group w-full grid grid-cols-1 lg:grid-cols-12 gap-8 
                      relative items-center 
                      border-t border-white/10 last:border-b
                      bg-[#050505]
                      py-12 lg:py-0
                      lg:h-screen
                      lg:shrink-0
                      overflow-hidden
                      transition-colors duration-500 hover:bg-white/[0.02]
                    "
                    style={{ zIndex: index + 1 }} // Ensure correct stacking context
                  >
                     {/* Left Content */}
                     <div className="col-span-1 px-7 md:px-14 lg:col-span-6 flex flex-col justify-center h-full space-y-6 relative z-20 pointer-events-none lg:pointer-events-auto">
                        <div className="flex items-center gap-4">
                           <span className="font-mono text-[#17f7f7] text-xs">0{index + 1}</span>
                           <h2 className={`${TYPOGRAPHY.h1} group-hover:text-[#17f7f7] transition-colors`}>
                              {item.title}
                           </h2>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
                           <p className={`${TYPOGRAPHY.body} text-[#d5dada]/70 max-w-md`}>
                              {item.description}
                           </p>
                           
                           <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start lg:min-w-[140px]">
                              {item.tags.map(tag => (
                                 <span key={tag} className="
                                    inline-flex items-center 
                                    px-3 py-1 
                                    rounded-full 
                                    border border-white/10 
                                    bg-white/5
                                    text-[10px] uppercase tracking-wider text-white/60
                                 ">
                                    {tag}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Right Image (Desktop Only) */}
                     <div className="hidden lg:block lg:col-span-6 h-full relative border-l border-white/10">
                        <div className="absolute inset-0 m-4 overflow-hidden rounded-2xl">
                           <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700 ease-out">
                             <ImageContainer src={item.image} alt={item.title} />
                           </div>
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>
                     </div>
                  </a>
               ))}
            </div>
         </div>
      </div>
      
      {/* Footer Space - Extra breathing room after unpinning */}
      <div className="h-[50vh] bg-[#050505] flex items-center justify-center">
          <p className="text-white/30 text-sm font-mono">End of Capabilities</p>
      </div>
    </div>
  );
}
