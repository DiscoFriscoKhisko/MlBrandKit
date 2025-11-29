import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { MotionSplitText, MotionFadeText } from "./MotionSystem";
import { Button } from "./ui/button";
import { FloatingShape } from "./ui/FloatingShape";
import { cn } from "./ui/utils";

// Mock Data matching the "Rise of Seven" structure
const CASE_STUDIES = [
  {
    id: "01",
    client: "Nebula Industries",
    title: "Orbital Logistics Platform",
    year: "2023-2025",
    tags: ["Supply Chain", "Data Viz"],
    description: "Optimizing supply chain routes through low-earth orbit using spectral analysis.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    color: "#17f7f7"
  },
  {
    id: "02",
    client: "Quantum Systems",
    title: "Zero-Latency Entanglement",
    year: "2024-2025",
    tags: ["Infrastructure", "Deep Tech"],
    description: "Communication infrastructure for deep space mining operations.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    color: "#7000df"
  },
  {
    id: "03",
    client: "Void Architecture",
    title: "Brutalist Mega-Structures",
    year: "2025",
    tags: ["Architecture", "Sustainable"],
    description: "Sustainable concrete mega-structures for colonization of hostile environments.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80",
    color: "#ff3366"
  },
  {
    id: "04",
    client: "Aero Dynamics",
    title: "Supersonic Transport",
    year: "2025",
    tags: ["Aerospace", "Motion"],
    description: "Next-generation interface for commercial supersonic flight monitoring.",
    image: "https://images.unsplash.com/photo-1559087867-ce4c91325525?auto=format&fit=crop&w=800&q=80",
    color: "#f7b917"
  }
];

export function MotionPinnedSection() {
  const [activeId, setActiveId] = useState(CASE_STUDIES[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find active study for the sticky image
  const activeStudy = CASE_STUDIES.find(s => s.id === activeId) || CASE_STUDIES[0];

  return (
    <section ref={containerRef} className="relative bg-[#050505] text-white py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column - Scrolling Text List */}
          <div className="flex flex-col gap-12 lg:gap-[30vh] py-[10vh]">
             <div className="mb-12">
                <span className="text-sm font-mono text-white/40 uppercase tracking-[0.2em]">Featured Work</span>
             </div>

             {CASE_STUDIES.map((study) => (
               <motion.div
                 key={study.id}
                 className="group cursor-pointer"
                 onViewportEnter={() => setActiveId(study.id)}
                 onMouseEnter={() => setActiveId(study.id)}
                 initial={{ opacity: 0.3 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ amount: 0.5, margin: "-20% 0px -20% 0px" }}
               >
                  <div className={cn(
                    "transition-all duration-500 ease-out pl-4 border-l-2",
                    activeId === study.id ? "border-[#17f7f7]" : "border-white/10"
                  )}>
                    <div className="flex items-baseline gap-4 mb-4">
                       <span className={cn(
                         "font-serif text-xl transition-colors duration-300",
                         activeId === study.id ? "text-[#17f7f7]" : "text-white/60"
                       )}>
                         {study.client}
                       </span>
                       <span className="font-mono text-[10px] text-white/40 tracking-widest">[{study.year}]</span>
                    </div>
                    
                    <h3 className={cn(
                      "text-4xl md:text-6xl font-sans font-bold leading-[0.95] tracking-tighter transition-all duration-500",
                      activeId === study.id ? "text-white" : "text-white/20"
                    )}>
                      {study.title}
                    </h3>
                    
                    <div className={cn(
                      "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      activeId === study.id ? "max-h-[200px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
                    )}>
                       <p className="text-sm text-white/60 max-w-md leading-relaxed">
                         {study.description}
                       </p>
                       <div className="flex gap-3 mt-6">
                          {study.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono uppercase tracking-wider text-white/60">
                              {tag}
                            </span>
                          ))}
                       </div>
                       <Button variant="outline" size="sm" className="mt-8">
                         View Case Study
                       </Button>
                    </div>
                  </div>
               </motion.div>
             ))}
          </div>

          {/* Right Column - Sticky Image Display */}
          <div className="hidden lg:block relative h-[calc(100vh-100px)] sticky top-12">
             <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#090909]">
                <AnimatePresence mode="popLayout">
                   <motion.div 
                      key={activeStudy.id}
                      initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }} // Quick fade out
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // GSAP Expo ease feel
                      className="absolute inset-0 w-full h-full"
                   >
                      <img 
                        src={activeStudy.image} 
                        alt={activeStudy.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                   </motion.div>
                </AnimatePresence>

                {/* Static Overlays on top of the changing image */}
                <div className="absolute top-8 right-8 z-20 mix-blend-difference text-white">
                   <div className="text-[80px] font-serif leading-none font-bold opacity-50">
                      {activeStudy.id}
                   </div>
                </div>

                <div className="absolute bottom-8 left-8 z-20">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center">
                       <div className="w-2 h-2 bg-[#17f7f7] rounded-full animate-pulse" />
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
