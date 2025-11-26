import React from 'react';
import { Database, Server, Cpu, Globe, Shield, Code2 } from 'lucide-react';

interface IcebergProps {
  title: string;
  description: string;
  topContent: React.ReactNode;
  techStack: string[];
  className?: string;
}

export function IcebergCapability({ title, description, topContent, techStack, className = "" }: IcebergProps) {
  return (
    <div className={`w-full h-full flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-[#090909] group ${className}`}>
      
      {/* Top: Above Water (The Experience) */}
      <div className="h-[45%] relative bg-gradient-to-b from-[#1A1A1A] to-[#090909] p-8 flex flex-col z-20">
         <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-white/30 bg-white/5 px-2 py-1 rounded">
            User Experience
         </div>
         
         <div className="mt-auto relative z-10">
            {topContent}
         </div>
      </div>

      {/* Water Line */}
      <div className="h-[2px] w-full bg-[#17f7f7]/30 shadow-[0_0_20px_rgba(23,247,247,0.5)] relative z-30">
         <div className="absolute right-4 -top-3 text-[9px] font-bold text-[#17f7f7] bg-[#090909] px-2 border border-[#17f7f7]/30 rounded-full">
            WE HANDLE THIS
         </div>
      </div>

      {/* Bottom: Below Water (The Architecture) */}
      <div className="h-[55%] relative bg-[#050505] overflow-hidden p-8 flex flex-col">
         {/* Technical Grid Texture */}
         <div className="absolute inset-0 opacity-[0.07]" 
              style={{ 
                backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}>
         </div>
         
         <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
               <h3 className="font-serif text-2xl text-white mb-2">{title}</h3>
               <p className="text-sm text-[#d5dada]/60 leading-relaxed max-w-md">
                  {description}
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
               {techStack.map((tech, i) => (
                  <div key={i} className="flex items-center gap-2 border-b border-white/5 pb-2">
                     <Code2 size={14} className="text-[#17f7f7]/50" />
                     <span className="text-xs font-mono text-[#d5dada]/50 uppercase tracking-wider">{tech}</span>
                  </div>
               ))}
            </div>

            {/* Subtle Background Glow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#17f7f7] rounded-full opacity-[0.03] blur-[80px] pointer-events-none"></div>
         </div>
      </div>
    </div>
  );
}
