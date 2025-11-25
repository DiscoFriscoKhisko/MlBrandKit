import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";
import { copyToClipboard } from "./ui/utils";

const brandColors = [
  { name: "OLED Black", hex: "#090909", rgb: "9 9 9", usage: "Void" },
  { name: "White Smoke", hex: "#f3f4f4", rgb: "243 244 244", usage: "Surface" },
  { name: "Alabaster", hex: "#d5dada", rgb: "213 218 218", usage: "Structure" },
  { name: "Cyan Laser", hex: "#17f7f7", rgb: "23 247 247", usage: "Energy" },
  { name: "Pure White", hex: "#fefefe", rgb: "254 254 254", usage: "Signal" },
];

interface ColorBlockProps {
  name: string;
  hex: string;
  rgb: string;
  usage?: string;
  onCopy: (text: string, id: string) => void;
  copied: string | null;
}

function ColorBlock({ name, hex, rgb, usage, onCopy, copied }: ColorBlockProps) {
  const isCopied = copied === `${name}-hex`;
  
  return (
    <div className="group cursor-pointer" onClick={() => onCopy(hex, `${name}-hex`)}>
      {/* Color Square - No Borders, Sharp Edges */}
      <div 
        className="aspect-[4/5] w-full relative mb-6 transition-all duration-500 ease-out group-hover:scale-[1.02]"
        style={{ backgroundColor: hex }}
      >
         {/* Floating Usage Label */}
         {usage && (
           <span className={`absolute top-4 left-4 text-[9px] uppercase tracking-[0.2em] font-mono opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 ${['#fefefe', '#f3f4f4', '#d5dada'].includes(hex) ? 'text-black' : 'text-white'}`}>
             {usage}
           </span>
         )}
         
         {/* Copied State - Minimal */}
         {isCopied && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
              <span className="text-[10px] tracking-[0.3em] font-mono text-white">COPIED</span>
            </div>
         )}
      </div>
      
      {/* Metadata - Sparse & Clean */}
      <div className="space-y-2 pl-1 border-l border-transparent group-hover:border-[#17f7f7] transition-colors duration-300">
        <h4 className="text-sm font-serif text-white font-medium">{name}</h4>
        <div className="flex flex-col gap-1">
          <code className="text-[10px] font-mono text-[#d5dada]/60 uppercase group-hover:text-[#17f7f7] transition-colors">{hex}</code>
          <code className="text-[10px] font-mono text-[#d5dada]/30 uppercase">{rgb}</code>
        </div>
      </div>
    </div>
  );
}

export function ColorPalette() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedColor(id);
      setTimeout(() => setCopiedColor(null), 1500);
      toast.success(`Copied ${text}`);
    } else {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="space-y-32">
      {/* Editorial Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-serif text-white">Chromatic Depth</h2>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <p className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
            A palette distilled to its essence. Deep voids, sterile surfaces, and 
            clinical accents. Color is used not for decoration, but for direction.
          </p>
        </div>
      </div>

      {/* Swatches - Wide Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 md:gap-12">
        {brandColors.map((color) => (
          <ColorBlock
            key={color.hex}
            {...color}
            onCopy={handleCopy}
            copied={copiedColor}
          />
        ))}
      </div>

      {/* Interaction Study */}
      <div className="pt-12 border-t border-white/[0.05]">
         <div className="grid md:grid-cols-2 gap-24">
            
            {/* Concept 1: Hierarchy */}
            <div>
              <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Interactive States</h3>
              <div className="flex flex-col gap-6 max-w-xs">
                  {/* Primary: Outline with Glow */}
                  <Button className="w-full bg-transparent hover:bg-[#17f7f7]/5 text-[#17f7f7] border border-[#17f7f7]/50 hover:border-[#17f7f7] rounded-none h-14 tracking-[0.1em] text-xs uppercase transition-all duration-300">
                    Primary System
                  </Button>
                  
                  {/* Secondary: Ghost White */}
                  <Button className="w-full bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 rounded-none h-14 tracking-[0.1em] text-xs uppercase transition-all duration-300">
                    Secondary Function
                  </Button>

                  {/* Tertiary: Link */}
                  <Button variant="ghost" className="w-full justify-start px-0 text-[#d5dada] hover:text-white hover:bg-transparent h-auto text-xs uppercase tracking-[0.2em] group">
                    <span className="border-b border-transparent group-hover:border-[#17f7f7] transition-all duration-300 pb-1">Documentation</span>
                    <span className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#17f7f7]">&rarr;</span>
                  </Button>
              </div>
            </div>

            {/* Concept 2: Usage Context */}
            <div className="space-y-8 relative">
               <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Contextual Application</h3>
               <div className="p-8 border border-white/[0.05] bg-white/[0.01] backdrop-blur-sm space-y-6 grainy-aura">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-1.5 w-1.5 bg-[#17f7f7] rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-mono text-[#17f7f7] tracking-widest uppercase">System Active</span>
                  </div>
                  <h4 className="text-2xl font-serif text-white">OLED precision meets brutalist structure.</h4>
                  <p className="text-sm text-[#d5dada]/60 leading-relaxed">
                    The interface recedes, allowing content to pierce through the darkness.
                  </p>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
