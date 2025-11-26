import { MotionSection, MotionCard, MotionSplitText, MotionFadeText } from "./MotionSystem";

export function LayoutSystem() {
  return (
    <div className="space-y-32">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/[0.05] pb-12">
        <div className="md:col-span-4">
          <MotionSplitText className="text-3xl font-serif text-white">Layout Geometry</MotionSplitText>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <MotionFadeText className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
             Defining the spatial boundaries of the Void. Organic curves meet strict grid systems to create a "Garden" of digital artifacts.
          </MotionFadeText>
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
             <MotionCard className="aspect-[4/3] bg-[#090909] border border-white/10 relative flex flex-col overflow-hidden group">
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

    </div>
  )
}
