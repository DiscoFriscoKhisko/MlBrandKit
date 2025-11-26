import { ArrowRight } from "lucide-react";

interface IcebergProps {
  title: string;
  description: string;
  features: { label: string; text: string }[];
  number: string;
}

export function IcebergCapability({ title, description, features, number }: IcebergProps) {
  return (
    <div className="w-full h-full bg-[#090909] border border-white/10 rounded-3xl overflow-hidden flex flex-col relative group">
       {/* Top Half - "Above Water" (The Outcome / UI) */}
       <div className="h-[45%] bg-gradient-to-b from-[#121212] to-[#090909] p-8 md:p-12 relative overflow-hidden border-b border-white/5">
          <span className="font-mono text-[#17f7f7]/60 mb-6 block text-sm">0{number}</span>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight max-w-2xl">
            {title}
          </h3>
          <p className="font-sans text-lg text-[#d5dada]/80 max-w-xl leading-relaxed">
            {description}
          </p>
          
          {/* Visual Hint of UI */}
          <div className="absolute bottom-0 right-0 w-64 h-40 bg-white/5 rounded-tl-3xl border-t border-l border-white/10 opacity-50 translate-y-8 translate-x-8 group-hover:translate-y-4 group-hover:translate-x-4 transition-transform duration-700"></div>
       </div>

       {/* Bottom Half - "Below Water" (The Tech / Architecture) */}
       <div className="h-[55%] bg-[#050505] relative p-8 md:p-12 flex flex-col justify-end">
          {/* Grid Texture Background */}
          <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'linear-gradient(#17f7f7 1px, transparent 1px), linear-gradient(90deg, #17f7f7 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
          }}></div>
          
          {/* Diagonal Scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(23,247,247,0.03)_50%,transparent_75%)] bg-[length:250%_250%] animate-[gradient_8s_linear_infinite] pointer-events-none"></div>

          <div className="relative z-10">
             <div className="flex items-center gap-3 mb-8">
               <div className="h-[1px] w-12 bg-[#17f7f7]/50"></div>
               <span className="font-mono text-[10px] uppercase tracking-widest text-[#17f7f7]">We Handle This</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {features.map((f, i) => (
                   <div key={i} className="group/item">
                      <h4 className="text-white font-medium text-sm font-mono uppercase tracking-wider mb-2 flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#17f7f7] rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                        {f.label}
                      </h4>
                      <p className="text-[#d5dada]/50 text-sm pl-3 border-l border-white/10 group-hover/item:border-[#17f7f7]/30 transition-colors">
                        {f.text}
                      </p>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}
