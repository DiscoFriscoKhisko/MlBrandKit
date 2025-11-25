import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";
import { motion } from "motion/react";

// GSAP-like easing curves
const easeOutExpo = [0.19, 1, 0.22, 1];
const easeInOutQuint = [0.86, 0, 0.07, 1];

export function Motion() {
  const [replayKey, setReplayKey] = useState(0);

  const handleReplay = () => {
    setReplayKey(prev => prev + 1);
  };

  return (
    <div className="space-y-24">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/[0.05] pb-12">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-serif text-white">Kinetic Physics</h2>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <p className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
            Motion in Material Lab mimics the heavy, viscous nature of light moving through dense glass. 
            We utilize custom cubic-bezier curves (0.19, 1, 0.22, 1) to emulate GSAP's Expo.out easing.
          </p>
        </div>
      </div>

      {/* Micro-Interactions Section */}
      <div>
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Responsive States</h3>
        <div className="grid md:grid-cols-3 gap-8">
            
          {/* Interaction 1: Magnetic Hover */}
          <div className="group relative">
             <div className="aspect-[4/3] bg-[#050505] border border-white/[0.1] flex items-center justify-center overflow-hidden mb-6 relative depth-card">
                <motion.button 
                  className="relative px-8 py-3 rounded-full border border-white/10 text-white font-mono text-xs tracking-widest uppercase overflow-hidden"
                  whileHover={{ scale: 1.05, borderColor: "rgba(23, 247, 247, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                   <motion.span 
                     className="relative z-10 block"
                     variants={{
                       hover: { color: "#17f7f7" },
                       initial: { color: "#ffffff" }
                     }}
                   >
                     Attract
                   </motion.span>
                   <motion.div 
                     className="absolute inset-0 bg-[#17f7f7]/10 rounded-full"
                     initial={{ scale: 0, opacity: 0 }}
                     whileHover={{ scale: 1.5, opacity: 1 }}
                     transition={{ duration: 0.6, ease: easeOutExpo }}
                   />
                </motion.button>
                {/* Grid background for context */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Magnetic Spring</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Stiffness: 400, Damping: 25</p>
                </div>
             </div>
          </div>

          {/* Interaction 2: Electric Lift */}
          <div className="group relative cursor-pointer">
             <motion.div 
               className="aspect-[4/3] bg-[#050505] border border-white/[0.1] flex items-center justify-center mb-6 depth-card"
               whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(23, 247, 247, 0.1)" }}
               transition={{ duration: 0.5, ease: easeOutExpo }}
             >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-[#17f7f7]/5 border border-[#17f7f7]/20 flex items-center justify-center text-[#17f7f7]"
                  whileHover={{ backgroundColor: "#17f7f7", color: "#000000", scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                </motion.div>
             </motion.div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Levitation</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Expo.out Lift</p>
                </div>
             </div>
          </div>

          {/* Interaction 3: Text Stagger */}
          <div className="group relative">
             <div className="aspect-[4/3] bg-[#050505] border border-white/[0.1] flex flex-col items-center justify-center mb-6 relative depth-card overflow-hidden" onClick={handleReplay}>
                <div className="absolute top-4 right-4 z-20">
                   <Button variant="ghost" size="icon" className="h-6 w-6 text-white/20 hover:text-[#17f7f7]" onClick={(e) => { e.stopPropagation(); handleReplay(); }}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
                   </Button>
                </div>
                <motion.h3 
                  className="text-2xl font-serif text-white tracking-tighter cursor-pointer" 
                  key={replayKey}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.05 } }
                  }}
                >
                  {"Refraction".split("").map((char, i) => (
                    <motion.span 
                     key={i} 
                     className="inline-block"
                     variants={{
                        hidden: { y: 40, opacity: 0, rotateX: 90 },
                        visible: { 
                          y: 0, 
                          opacity: 1, 
                          rotateX: 0,
                          transition: { 
                            type: "spring", 
                            damping: 12, 
                            stiffness: 100 
                          } 
                        }
                     }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.h3>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Cascade</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Stagger 0.05s / Spring</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Continuous Motion */}
      <div>
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Ambient States</h3>
        <div className="grid md:grid-cols-2 gap-8">
           {/* Marquee */}
           <div className="group">
              <div className="h-40 bg-[#050505] border border-white/[0.1] flex items-center overflow-hidden mb-6 relative depth-card">
                 <div className="flex whitespace-nowrap animate-marquee opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                    {[1,2,3,4].map(i => (
                      <span key={i} className="text-4xl font-serif text-white mx-8 font-light italic">
                         Spectral Analysis — Material Lab — 
                      </span>
                    ))}
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none"></div>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Infinite Loop</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Background data stream.</p>
                </div>
             </div>
           </div>

           {/* Grain/Noise */}
           <div className="group">
              <div className="h-40 bg-[#050505] border border-white/[0.1] relative overflow-hidden mb-6 isolate depth-card">
                 {/* Noise Layer */}
                 <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                 }}></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 bg-[#17f7f7] rounded-full animate-pulse"></div>
                       <span className="text-[#17f7f7] font-mono text-xs tracking-widest uppercase">Sensor Active</span>
                    </div>
                 </div>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Film Grain</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">ISO 3200 digital noise.</p>
                </div>
             </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
