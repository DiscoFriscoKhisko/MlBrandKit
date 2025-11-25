import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

export function Motion() {
  const [replayKey, setReplayKey] = useState(0);

  const handleReplay = () => {
    setReplayKey(prev => prev + 1);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className="space-y-24">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/[0.05] pb-12">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-serif text-white">Motion Language</h2>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <p className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
            Our motion principles prioritize physics-based interactions and subtle, continuous states over abrupt transitions. 
            Motion serves to guide focus and communicate material depth.
          </p>
        </div>
      </div>

      {/* Micro-Interactions Section */}
      <div>
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Interactive States</h3>
        <div className="grid md:grid-cols-3 gap-8">
            
          {/* Interaction 1: Magnetic Hover */}
          <div className="group relative">
             <div className="aspect-[4/3] bg-[#090909] border border-white/[0.1] flex items-center justify-center overflow-hidden mb-6 relative">
                <button className="relative px-8 py-3 rounded-full border border-white/20 text-white font-mono text-xs tracking-widest uppercase overflow-hidden group-hover:border-[#17f7f7]/50 transition-colors duration-500">
                   <span className="relative z-10 group-hover:text-[#17f7f7] transition-colors duration-300">Magnetic</span>
                   <div className="absolute inset-0 bg-white/5 scale-0 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                </button>
                {/* Grid background for context */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Magnetic Response</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Cursor-aware attraction.</p>
                </div>
             </div>
          </div>

          {/* Interaction 2: Electric Lift */}
          <div className="group relative cursor-pointer">
             <div className="aspect-[4/3] bg-[#090909] border border-white/[0.1] flex items-center justify-center mb-6 transition-all duration-500 ease-out hover:-translate-y-2 grainy-aura hover:border-[#17f7f7]/30">
                <div className="w-12 h-12 rounded-full bg-[#17f7f7]/10 flex items-center justify-center text-[#17f7f7]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                </div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Electric Lift</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Y-axis translation with grainy aura.</p>
                </div>
             </div>
          </div>

          {/* Interaction 3: Text Stagger */}
          <div className="group relative">
             <div className="aspect-[4/3] bg-[#090909] border border-white/[0.1] flex flex-col items-center justify-center mb-6 relative" onClick={handleReplay}>
                <div className="absolute top-4 right-4">
                   <Button variant="ghost" size="icon" className="h-6 w-6 text-white/20 hover:text-white" onClick={(e) => { e.stopPropagation(); handleReplay(); }}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
                   </Button>
                </div>
                <h3 className="text-2xl font-serif text-white" key={replayKey}>
                  {"Material".split("").map((char, i) => (
                    <span 
                     key={i} 
                     className="inline-block animate-in slide-in-from-bottom-4 fade-in duration-700 fill-mode-backwards"
                     style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                    >
                      {char}
                    </span>
                  ))}
                </h3>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Staggered Reveal</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Cascading character entrance.</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Continuous Motion */}
      <div>
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Continuous States</h3>
        <div className="grid md:grid-cols-2 gap-8">
           {/* Marquee */}
           <div className="group">
              <div className="h-40 bg-[#090909] border border-white/[0.1] flex items-center overflow-hidden mb-6 relative">
                 <div className="flex whitespace-nowrap animate-marquee">
                    {[1,2,3,4].map(i => (
                      <span key={i} className="text-4xl font-serif text-white/10 mx-8 font-light italic">
                         Material Lab — Design System
                      </span>
                    ))}
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-transparent to-[#090909]"></div>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Infinite Marquee</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Ambient background motion.</p>
                </div>
             </div>
           </div>

           {/* Grain/Noise */}
           <div className="group">
              <div className="h-40 bg-[#1a1a1a] border border-white/[0.1] relative overflow-hidden mb-6 isolate">
                 {/* Noise Layer */}
                 <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                 }}></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-mono text-xs tracking-widest uppercase">Film Grain</span>
                 </div>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Texture Overlay</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Static noise for tactility.</p>
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
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
