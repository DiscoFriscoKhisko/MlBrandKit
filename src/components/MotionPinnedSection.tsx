import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { MotionSplitText, MotionFadeText } from "./MotionSystem";
import { ArrowButton } from "./ui/ArrowButton";
import { FloatingShape } from "./ui/FloatingShape";

// Mock Data for the Case Studies
const CASE_STUDIES = [
  {
    id: "01",
    client: "Nebula Industries",
    title: "Orbital Logistics",
    description: "Optimizing supply chain routes through low-earth orbit using spectral analysis.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "02",
    client: "Quantum Systems",
    title: "Entangled Data",
    description: "Zero-latency communication infrastructure for deep space mining operations.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "03",
    client: "Void Architecture",
    title: "Brutalist Habitats",
    description: "Sustainable concrete mega-structures for colonization of hostile environments.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80"
  }
];

function PinnedCard({ 
  item, 
  index, 
  progress,
  total
}: { 
  item: typeof CASE_STUDIES[0], 
  index: number, 
  progress: MotionValue<number>,
  total: number
}) {
  // Define ranges for 3 states: Enter, Active, Exit
  // We distribute the 3 cards across the 0-1 scroll range.
  // Card 0: 0.0 - 0.35 (Exit at 0.35-0.45)
  // Card 1: 0.35 - 0.70 (Enter 0.35-0.45, Exit 0.70-0.80)
  // Card 2: 0.70 - 1.00 (Enter 0.70-0.80)
  
  const stepSize = 0.35; // Roughly 1/3
  const transitionDuration = 0.15; // Overlap duration

  let entryStart = index * stepSize;
  let entryEnd = entryStart + transitionDuration;
  let exitStart = (index + 1) * stepSize;
  let exitEnd = exitStart + transitionDuration;

  // Special case for first card: It should be visible from the start (0.0)
  if (index === 0) {
    entryStart = 0;
    entryEnd = 0.1; // Fast fade in or already visible
  }

  // Special case for last card: It should stay visible
  if (index === total - 1) {
    exitStart = 1.1; // Never start exiting
    exitEnd = 1.2;
  }

  const opacity = useTransform(
    progress, 
    [entryStart, entryEnd, exitStart, exitEnd], 
    [index === 0 ? 1 : 0, 1, 1, 0]
  );
  
  const scale = useTransform(
    progress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [index === 0 ? 1 : 0.9, 1, 1, 0.95]
  );
  
  const y = useTransform(
    progress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [index === 0 ? 0 : 100, 0, 0, -50]
  );

  const filter = useTransform(
    progress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [index === 0 ? "blur(0px)" : "blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  );
  
  return (
    <motion.div 
      style={{ opacity, scale, y, filter }}
      className="absolute top-0 left-0 w-full h-full origin-bottom"
    >
       <div className="bg-[#090909] border border-white/10 overflow-hidden relative group h-full rounded-[32px] shadow-2xl">
          {/* Background Image with Zoom Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
             <div className="flex items-baseline justify-between border-b border-white/10 pb-6 mb-6">
                <div className="flex items-center gap-3">
                   <span className="text-[#17f7f7] font-mono text-xs tracking-widest uppercase">{item.id}</span>
                   <span className="w-8 h-[1px] bg-[#17f7f7]/50"></span>
                   <span className="text-[#17f7f7] font-mono text-xs tracking-widest uppercase">{item.client}</span>
                </div>
                <ArrowButton variant="link" className="text-white text-[10px] hidden md:flex">View Case</ArrowButton>
             </div>
             
             <h3 className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight">{item.title}</h3>
             <p className="text-[#d5dada] font-light max-w-lg text-sm md:text-base leading-relaxed opacity-80">{item.description}</p>
             
             <div className="mt-8 md:hidden">
                <ArrowButton variant="link" className="text-white text-[10px]">View Case</ArrowButton>
             </div>
          </div>
       </div>
    </motion.div>
  );
}

export function MotionPinnedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#050505]">
      {/* Deep Space Debris - Parallax Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <FloatingShape depth={0.3} className="top-[10%] left-[80%] opacity-20">
            <div className="w-64 h-64 border border-[#17f7f7]/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
         </FloatingShape>
         
         <FloatingShape depth={0.6} className="top-[40%] left-[10%] opacity-30">
             <div className="text-[200px] font-serif text-white/[0.02] leading-none select-none">01</div>
         </FloatingShape>

         <FloatingShape depth={1.5} className="top-[70%] right-[20%] opacity-10">
             <div className="w-px h-32 bg-gradient-to-b from-transparent via-white to-transparent" />
         </FloatingShape>
      </div>

      <div className="sticky top-0 h-screen overflow-hidden flex items-center z-10">
         <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl h-full py-20">
            
            {/* Static Left Column - Vertically Centered */}
            <div className="lg:col-span-4 space-y-8 z-10">
               <div className="w-12 h-[1px] bg-[#17f7f7] mb-8" />
               <MotionSplitText className="text-4xl md:text-6xl font-serif text-white leading-[1.1]">
                 Selected Missions
               </MotionSplitText>
               <MotionFadeText className="text-[#d5dada] text-lg font-light leading-relaxed max-w-sm">
                 We engineer digital environments for the most demanding sectors. 
                 Scroll to explore our recent deployments.
               </MotionFadeText>
               
               <MotionFadeText delay={0.4}>
                  <ArrowButton className="mt-8 text-xs tracking-[0.2em]">
                    All Case Studies
                  </ArrowButton>
               </MotionFadeText>
            </div>

            {/* Dynamic Right Column (Pinned Cards) */}
            <div className="lg:col-span-8 relative w-full h-[500px] perspective-[1000px]">
               {CASE_STUDIES.map((study, i) => (
                 <PinnedCard 
                   key={study.id} 
                   item={study} 
                   index={i} 
                   total={CASE_STUDIES.length}
                   progress={scrollYProgress} 
                 />
               ))}
            </div>

         </div>
      </div>
    </section>
  );
}
