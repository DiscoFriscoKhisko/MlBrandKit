import React from 'react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface IcebergCapabilityProps {
  title: string;
  description: string;
  image: string;
  features: { label: string; text: string }[];
  index: number;
}

export function IcebergCapability({ title, description, image, features, index }: IcebergCapabilityProps) {
  return (
    <div className="cap-card sticky top-12 md:top-24 overflow-visible h-[35vh] lg:h-[90vh] group">
      <div className="cap-card-inner bg-[#090909] border border-white/10 rounded-3xl overflow-hidden shadow-2xl h-full origin-top transition-all flex flex-col">
        
        {/* Top Half: The Outcome (Above Water) */}
        <div className="relative h-1/2 w-full bg-white/5 overflow-hidden border-b border-white/10 group-hover:h-[45%] transition-all duration-700 ease-[cubic-bezier(0.83,0,0.17,1)]">
           <div className="absolute inset-0 z-0">
             <img src={image} alt={title} className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#090909] to-transparent opacity-50" />
           </div>
           <div className="relative z-10 p-7 md:p-12 h-full flex flex-col justify-end">
              <span className="font-mono text-[10px] md:text-xs text-[#17f7f7] uppercase tracking-widest mb-2">
                0{index + 1} — The Experience
              </span>
              <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white max-w-3xl leading-tight">
                {title}
              </h3>
           </div>
        </div>

        {/* Bottom Half: The Architecture (Below Water) */}
        <div className="relative h-1/2 w-full bg-[#050505] overflow-hidden p-7 md:p-12 flex flex-col group-hover:h-[55%] transition-all duration-700 ease-[cubic-bezier(0.83,0,0.17,1)]">
            {/* Grid Texture */}
            <div className="absolute inset-0 opacity-[0.03]" 
                style={{ 
                    backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                    <span className="font-mono text-[10px] md:text-xs text-white/40 uppercase tracking-widest flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse"></div>
                       Under the Surface (We handle this)
                    </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 h-full">
                    <div className="flex flex-col justify-center">
                       <p className="font-sans text-lg md:text-xl text-[#d5dada]/80 font-light leading-relaxed mb-8">
                         {description}
                       </p>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center border-l border-white/5 pl-10">
                        <ul className="space-y-4">
                           {features.map((f, i) => (
                              <li key={i} className="group/item">
                                 <strong className="text-white font-medium block text-sm font-mono uppercase tracking-wider mb-1 group-hover/item:text-[#17f7f7] transition-colors">
                                   {f.label}
                                 </strong>
                                 <span className="text-[#d5dada]/50 text-sm block font-mono">
                                   {f.text}
                                 </span>
                              </li>
                           ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
