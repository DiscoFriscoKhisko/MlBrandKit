import React, { useEffect, useRef } from 'react';

export const GrainyCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-64 h-64 pointer-events-none z-50 -ml-32 -mt-32 mix-blend-screen opacity-60"
      style={{ willChange: 'transform' }}
    >
      <div className="w-full h-full rounded-full bg-radial-gradient from-[#17f7f7]/20 to-transparent blur-2xl"></div>
      <div className="absolute inset-0 rounded-full opacity-50"
         style={{ 
           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
         }}
      ></div>
    </div>
  );
};
