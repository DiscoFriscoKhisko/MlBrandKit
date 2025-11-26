import { useState, useRef } from "react";
import { toast } from "sonner@2.0.3";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { MotionCard } from "./MotionSystem";

// GSAP-like easing curves
const easeOutExpo = [0.19, 1, 0.22, 1];
const easeInOutQuint = [0.86, 0, 0.07, 1];

export function Motion() {
  const [replayKey, setReplayKey] = useState(0);

  // Velocity Demo
  const x = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const rotate = useTransform(xSpring, [-200, 200], [-45, 45]);
  const scale = useTransform(xSpring, [-200, 0, 200], [0.8, 1, 0.8]);

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

      {/* Curve Visualizer - The Lab */}
      <div className="border-b border-white/[0.05] pb-24">
         <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Bezier Lab</h3>
         
         <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* The Graph */}
            <MotionCard className="aspect-video bg-[#090909] relative overflow-hidden border-none p-8">
                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                
                {/* Bezier Curve Representation (approximate visual) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none p-12" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <path d="M0,100 C19,100 22,0 100,0" fill="none" stroke="#17f7f7" strokeWidth="0.5" vectorEffect="non-scaling-stroke" strokeDasharray="2 2" />
                </svg>

                {/* The Runner */}
                <div className="relative w-full h-full flex items-end">
                   <motion.div
                     key={replayKey}
                     className="w-8 h-8 bg-[#17f7f7] rounded-full shadow-[0_0_30px_rgba(23,247,247,0.5)]"
                     initial={{ x: 0, y: 0 }}
                     animate={{ x: "calc(100% - 32px)", y: "-100%" }}
                     transition={{ 
                       duration: 1.5, 
                       ease: easeOutExpo,
                       repeat: Infinity,
                       repeatDelay: 1
                     }}
                   />
                </div>
                
                <div className="absolute top-4 left-4 font-mono text-[10px] text-[#17f7f7]">
                   cubic-bezier(0.19, 1, 0.22, 1)
                </div>
            </MotionCard>

            {/* Explanation */}
            <div className="space-y-6">
               <div>
                  <h4 className="text-white font-serif text-xl mb-2">Expo.out (Heavy)</h4>
                  <p className="text-[#d5dada]/60 text-sm leading-relaxed mb-4">
                     This curve starts explosively fast and decays slowly. It mimics the physics of a high-torque electric motor reaching top speed instantly, then coasting.
                  </p>
               </div>
               
               <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#d5dada]/60 border-b border-white/10 pb-2">
                     <span>CSS</span>
                     <span className="text-white">transition-timing-function</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#d5dada]/60 border-b border-white/10 pb-2">
                     <span>React</span>
                     <span className="text-white">ease: [0.19, 1, 0.22, 1]</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#d5dada]/60 border-b border-white/10 pb-2">
                     <span>GSAP</span>
                     <span className="text-white">Expo.out</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Velocity Responsive Demo */}
      <div className="border-b border-white/[0.05] pb-24">
         <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Velocity Response</h3>
         
         <div className="w-full h-64 bg-[#090909] border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative cursor-grab active:cursor-grabbing">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Drag horizontally</span>
            </div>

            <motion.div
               style={{ x, rotate, scale, cursor: "grab" }}
               drag="x"
               dragConstraints={{ left: -200, right: 200 }}
               whileTap={{ cursor: "grabbing" }}
               className="w-24 h-24 bg-white rounded-[24px] flex items-center justify-center shadow-2xl z-10"
            >
               <div className="w-2 h-8 bg-black/10 rounded-full"></div>
            </motion.div>
         </div>
      </div>

      {/* Micro-Interactions Section */}
      <div>
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Responsive States</h3>
        <div className="grid md:grid-cols-3 gap-8">
            
          {/* Interaction 1: Magnetic Hover */}
          <div className="group relative">
             <MotionCard className="aspect-[4/3] bg-[#050505] border border-white/[0.1] flex items-center justify-center overflow-hidden mb-6 relative depth-card border-none">
                <motion.button 
                  className="relative px-5 py-2.5 rounded-full border border-white/10 text-white font-mono text-xs tracking-widest uppercase overflow-hidden"
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
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Magnetic Spring</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Stiffness: 400, Damping: 25</p>
                </div>
             </div>
          </div>

          {/* Interaction 2: Electric Lift */}
          <div className="group relative cursor-pointer">
             <MotionCard 
               className="aspect-[4/3] bg-[#050505] border border-white/[0.1] flex items-center justify-center mb-6 depth-card border-none"
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
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Levitation</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Expo.out Lift</p>
                </div>
             </div>
          </div>

          {/* Interaction 3: Text Stagger */}
          <div className="group relative">
             <MotionCard className="aspect-[4/3] bg-[#050505] border border-white/[0.1] flex flex-col items-center justify-center mb-6 relative depth-card overflow-hidden border-none" onClick={handleReplay}>
                <div className="absolute top-4 right-4 z-20">
                   <motion.button 
                     className="flex items-center justify-center h-6 w-6 rounded-full text-white/20 hover:text-[#17f7f7] transition-colors"
                     onClick={(e) => { e.stopPropagation(); handleReplay(); }}
                     whileHover={{ rotate: 180 }}
                     transition={{ duration: 0.5 }}
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
                   </motion.button>
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
             </MotionCard>
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
              <MotionCard className="h-40 bg-[#050505] border border-white/[0.1] flex items-center overflow-hidden mb-6 relative depth-card border-none">
                 <div className="flex whitespace-nowrap animate-marquee opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                    {[1,2,3,4].map(i => (
                      <span key={i} className="text-4xl font-serif text-white mx-8 font-light italic">
                         Spectral Analysis — Material Lab — 
                      </span>
                    ))}
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none"></div>
              </MotionCard>
              <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Infinite Loop</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Background data stream.</p>
                </div>
             </div>
           </div>

           {/* Grain/Noise */}
           <div className="group">
              <MotionCard className="h-40 bg-[#050505] border border-white/[0.1] relative overflow-hidden mb-6 isolate depth-card border-none">
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
              </MotionCard>
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
