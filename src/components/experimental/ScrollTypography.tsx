import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export function ScrollTypography() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 1. Font Weight: 100 -> 900
  const weight = useTransform(smoothProgress, [0, 1], [100, 900]);
  
  // 2. Slant: 0 -> -10
  const slant = useTransform(smoothProgress, [0, 1], [0, -10]);
  
  // 3. Color: White -> Cyan
  const color = useTransform(smoothProgress, [0, 0.5], ["#ffffff", "#17f7f7"]);
  
  // 4. Tracking: normal -> wide
  const letterSpacing = useTransform(smoothProgress, [0, 1], ["0em", "0.1em"]);
  
  // 5. Line Width: 0 -> 200px
  const lineWidth = useTransform(smoothProgress, [0, 0.5], ["0px", "200px"]);
  
  // 6. Meta Opacity
  const metaOpacity = useTransform(smoothProgress, [0.6, 1], [0, 1]);
  const metaY = useTransform(smoothProgress, [0.6, 1], [20, 0]);

  const text = "FLUX CORE";

  return (
    <div ref={containerRef} className="h-[400vh] relative bg-[#050505]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden border-l border-white/[0.05]">
        
        {/* Inject Inter Variable Font */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap');
        `}</style>

        <div className="relative z-10 text-center">
          <motion.h1 
            className="text-[12vw] leading-[0.85] mix-blend-difference font-sans transition-colors duration-0"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              color: color,
              letterSpacing: letterSpacing,
              fontVariationSettings: "'wght' 100, 'slnt' 0" // Fallback/Base
            }}
          >
            {text.split("").map((char, i) => (
              <motion.span 
                key={i} 
                style={{
                   // We apply variation settings to each char for potentially different effects later
                   // For now, global sync is fine.
                   // Note: Motion handles CSS variables well, but font-variation-settings string interpolation needs care.
                   // We use a custom value for this.
                   fontVariationSettings: useTransform(
                     [weight, slant], 
                     ([w, s]) => `'wght' ${Math.round(w as number)}, 'slnt' ${s}`
                   )
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div 
            style={{ width: lineWidth, backgroundColor: color }}
            className="h-px mx-auto my-8"
          ></motion.div>
          
          <motion.div style={{ opacity: metaOpacity, y: metaY }}>
             <p className="text-xs font-mono text-[#17f7f7] uppercase tracking-[0.3em]">Inter Variable</p>
             <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-2">Weight & Slant Interpolation</p>
          </motion.div>
        </div>

        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-tr from-[#17f7f7]/20 to-transparent rounded-full blur-[100px]"></div>
        </div>
        
        {/* Scroll Indicators */}
        <div className="absolute bottom-12 left-12 text-left">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Scroll Trigger</p>
          <p className="text-xs font-serif text-white mt-1">Scrub: 1.5s</p>
        </div>
      </div>
    </div>
  );
}
