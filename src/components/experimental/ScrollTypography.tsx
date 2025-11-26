import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "motion/react";

// Utility to wrap a number between min and max
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

function ParallaxText({ children, baseVelocity = 100, className }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className={`scroller font-bold uppercase whitespace-nowrap flex flex-nowrap ${className}`} style={{ x }}>
        <span className="block mr-[30px]">{children} </span>
        <span className="block mr-[30px]">{children} </span>
        <span className="block mr-[30px]">{children} </span>
        <span className="block mr-[30px]">{children} </span>
      </motion.div>
    </div>
  );
}

export function ScrollTypography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Variable Font Animations - Keeping the mechanics, reverting the style
  const weight = useTransform(scrollYProgress, [0, 0.5, 1], [100, 900, 100]);
  const slant = useTransform(scrollYProgress, [0, 0.5, 1], [0, -10, 0]);
  const tracking = useTransform(scrollYProgress, [0, 0.5, 1], ["-0.05em", "0.05em", "-0.05em"]);
  
  // Reverted to System Cyan (#17f7f7) and Monochrome
  const color = useTransform(scrollYProgress, [0, 0.5, 1], ["#333333", "#17f7f7", "#333333"]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh] py-20 bg-[#050505] overflow-hidden flex flex-col justify-center gap-10">
       {/* Inject Inter Variable Font for the experiment mechanics only */}
       <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap');
        `}</style>

      <div className="relative z-10 flex flex-col gap-8">
        {/* Row 1: Right to Left */}
        <ParallaxText baseVelocity={-5} className="text-6xl md:text-9xl text-white/20 font-sans">
          Material Lab • System V2.0 • Optical • Flux •
        </ParallaxText>

        {/* Row 2: Left to Right with Variable Font Effects */}
        <motion.div style={{ 
            fontVariationSettings: "'wght' 900, 'slnt' -10",
            color: color,
            letterSpacing: tracking,
            fontFamily: "'Inter', sans-serif"
        }}>
             <ParallaxText baseVelocity={5} className="text-7xl md:text-[10rem] leading-[0.85]">
              Variable Motion • Kinetic Type • Velocity •
            </ParallaxText>
        </motion.div>

        {/* Row 3: Right to Left fast */}
        <ParallaxText baseVelocity={-3} className="text-5xl md:text-8xl text-white/10 font-serif italic">
          Refraction • Prismatic • Spectrum • Light •
        </ParallaxText>
      </div>

      {/* System Indicator - Cyan */}
      <div className="fixed bottom-8 left-8 z-50 pointer-events-none mix-blend-difference">
          <motion.div 
            style={{ scaleX: scrollYProgress }} 
            className="h-1 bg-[#17f7f7] w-24 origin-left mb-2"
          />
          <p className="font-mono text-[10px] text-[#17f7f7] uppercase tracking-widest">
            Velocity Scroll
          </p>
      </div>
      
      {/* Background Elements - Cyan/System */}
      <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            style={{ 
                y: useTransform(scrollYProgress, [0, 1], [0, -200]),
                opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.2, 0.1])
            }}
            className="absolute top-1/4 right-0 w-[50vw] h-[50vw] bg-[#17f7f7] blur-[150px] rounded-full opacity-10" 
          />
      </div>
    </section>
  );
}
