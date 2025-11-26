import { useState, useEffect } from "react";
import { MotionSection, MotionCard, MotionSplitText, MotionFadeText } from "./MotionSystem";
import { ArrowButton } from "./ui/ArrowButton";

export function LayoutSystem() {
  const [showGrid, setShowGrid] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBreakpoint = (width: number) => {
    if (width < 640) return 'Mobile (Default)';
    if (width < 768) return 'Tablet (sm)';
    if (width < 1024) return 'Desktop (md)';
    if (width < 1280) return 'Large (lg)';
    return 'Wide (xl)';
  };

  return (
    <div className="space-y-32 relative">
      {/* Live Grid Overlay */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-50 max-w-[1400px] mx-auto px-8">
           <div className="grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-8 h-full w-full">
              {Array.from({ length: 12 }).map((_, i) => (
                 <div key={i} className={`h-full bg-[#17f7f7]/10 border-x border-[#17f7f7]/20 ${i >= 4 ? 'hidden md:block' : ''}`}></div>
              ))}
           </div>
        </div>
      )}

      {/* Header with Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/[0.05] pb-12">
        <div className="md:col-span-4">
          <MotionSplitText className="text-3xl font-serif text-white">Layout Geometry</MotionSplitText>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <MotionFadeText className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
             Defining the spatial boundaries of the Void. Organic curves meet strict grid systems to create a "Garden" of digital artifacts.
          </MotionFadeText>
          
          <div className="mt-8 flex items-center gap-6">
             <button 
               onClick={() => setShowGrid(!showGrid)}
               className={`px-4 py-2 rounded text-[10px] font-mono uppercase tracking-widest border transition-all ${showGrid ? 'bg-[#17f7f7] text-black border-[#17f7f7]' : 'bg-transparent text-white border-white/20 hover:border-[#17f7f7]'}`}
             >
               {showGrid ? 'Hide Grid' : 'Show Grid'}
             </button>
             
             <div className="text-[10px] font-mono text-[#d5dada]/60">
                Current Viewport: <span className="text-white">{windowWidth}px</span> — <span className="text-[#17f7f7]">{getBreakpoint(windowWidth)}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Section Shells */}
      <div>
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Section Shells</h3>
        
        <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-4">
                     <div className="h-64 w-full border border-dashed border-white/20 rounded-[32px] relative flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-white/5"></div>
                        <div className="text-center">
                            <span className="text-[#17f7f7] font-mono text-xs block mb-2">.section--curved</span>
                            <span className="text-white/40 font-mono text-[10px]">Border Radius: 32px</span>
                        </div>
                        
                        {/* Corner markers */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#17f7f7] rounded-tl-[32px]"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#17f7f7] rounded-tr-[32px]"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#17f7f7] rounded-bl-[32px]"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#17f7f7] rounded-br-[32px]"></div>
                     </div>
                </div>
                <div>
                    <h4 className="text-white font-serif text-xl mb-4">Panel Architecture</h4>
                    <p className="text-[#d5dada]/60 font-light leading-relaxed mb-6">
                        Key narrative sections utilize the <code className="text-[#17f7f7] bg-white/5 px-1.5 py-0.5 rounded text-[10px]">.section--curved</code> class. 
                        This creates a distinct "panel" feel, separating content islands from the infinite void background.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-[#d5dada]/40">
                        <div className="border-t border-white/10 pt-2">
                            <span className="block text-white mb-1">Radius</span>
                            32px
                        </div>
                         <div className="border-t border-white/10 pt-2">
                            <span className="block text-white mb-1">Padding</span>
                            80px / 24px
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Container Geometry */}
      <div className="border-t border-white/[0.05] pt-24">
         <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Container Geometry</h3>
         
         <div className="grid md:grid-cols-2 gap-12">
             {/* Card Example */}
             <MotionCard className="aspect-[4/3] bg-[#090909] border border-white/10 relative flex flex-col overflow-hidden group border-none">
                 <div className="flex-1 bg-white/5 relative flex items-center justify-center border-b border-white/5">
                    <span className="text-white/20 font-mono text-[10px] uppercase tracking-widest">Media Area</span>
                 </div>
                 <div className="p-6">
                    <div className="w-1/2 h-2 bg-white/10 rounded mb-3"></div>
                    <div className="w-3/4 h-2 bg-white/10 rounded"></div>
                 </div>
                 
                 {/* Overlay Specs */}
                 <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#17f7f7] rounded-tl-[24px]"></div>
                 <div className="absolute top-4 left-4 text-[#17f7f7] font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">R24</div>
             </MotionCard>

             <div className="flex flex-col justify-center">
                  <h4 className="text-white font-serif text-xl mb-4">The Card Protocol</h4>
                  <p className="text-[#d5dada]/60 font-light leading-relaxed mb-8">
                      Content units are encapsulated in <code className="text-[#17f7f7] bg-white/5 px-1.5 py-0.5 rounded text-[10px]">.card</code> containers.
                      These feature a softer 24px radius, distinguishing them from the structural section shells.
                  </p>
                  
                  <div className="space-y-4 font-mono text-xs text-[#d5dada]/60">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                          <span>Class</span>
                          <span className="text-white">.card</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                          <span>Border Radius</span>
                          <span className="text-white">24px</span>
                      </div>
                       <div className="flex justify-between border-b border-white/10 pb-2">
                          <span>Inner Padding</span>
                          <span className="text-white">20px / 24px</span>
                      </div>
                  </div>
             </div>
         </div>
      </div>
    
      {/* Grid System */}
       <div className="border-t border-white/[0.05] pt-24">
         <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Grid Constraints</h3>
         <div className="h-40 w-full border-x border-dashed border-white/20 relative flex items-center justify-center">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#17f7f7]/30"></div>
            <span className="bg-[#050505] px-4 py-2 text-[#17f7f7] font-mono text-xs border border-[#17f7f7]/30 rounded-full">
                max-width: 1080px
            </span>
            <span className="absolute left-4 text-white/20 font-mono text-[9px]">.section-inner</span>
            <span className="absolute right-4 text-white/20 font-mono text-[9px]">.section-inner</span>
         </div>
       </div>

      {/* Button Primitives */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Button Primitives</h3>
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Primary Button Spec */}
          <div className="space-y-6">
            <div className="p-12 bg-[#090909] border border-white/10 rounded-[24px] flex items-center justify-center gap-4">
              <div className="relative">
                 {/* The Actual Button */}
                 <ArrowButton className="bg-[#17f7f7] text-black hover:bg-white border-transparent">
                    Book a call
                 </ArrowButton>

                 {/* Spec Lines */}
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#17f7f7] whitespace-nowrap">
                   px-5 (20px)
                 </div>
                 <div className="absolute top-1/2 -right-12 -translate-y-1/2 text-[9px] font-mono text-[#17f7f7] whitespace-nowrap">
                   py-2.5 (10px)
                 </div>
              </div>
            </div>
            <div>
               <h4 className="text-white font-serif text-lg mb-2">Primary Action</h4>
               <div className="grid grid-cols-2 gap-y-2 text-[10px] font-mono text-[#d5dada]/60 border-t border-white/10 pt-2">
                 <span className="text-white">Shape</span> <span>Pill (999px)</span>
                 <span className="text-white">Padding</span> <span>10px / 20px</span>
                 <span className="text-white">Hover</span> <span>y: -2px</span>
                 <span className="text-white">Icon</span> <span>Slide Left</span>
               </div>
            </div>
          </div>

          {/* Secondary Line Spec */}
           <div className="space-y-6">
            <div className="p-12 bg-[#090909] border border-white/10 rounded-[24px] flex items-center justify-center gap-4">
              <div className="relative">
                 {/* The Actual Button */}
                 <ArrowButton variant="link" className="text-white pb-0.5 hover:opacity-80 px-0">
                    View details
                 </ArrowButton>
              </div>
            </div>
            <div>
               <h4 className="text-white font-serif text-lg mb-2">Secondary Line</h4>
               <div className="grid grid-cols-2 gap-y-2 text-[10px] font-mono text-[#d5dada]/60 border-t border-white/10 pt-2">
                 <span className="text-white">Style</span> <span>Border Bottom</span>
                 <span className="text-white">Padding Bottom</span> <span>2px</span>
                 <span className="text-white">Gap</span> <span>6px</span>
               </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
