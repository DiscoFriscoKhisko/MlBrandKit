import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowButton } from "./ui/ArrowButton";
import { toast } from "sonner@2.0.3";
import { copyToClipboard } from "./ui/utils";
import { MotionCard, MotionFadeText, MotionSplitText } from "./MotionSystem";

const brandColors = [
  { name: "Void Black", hex: "#050505", rgb: "5 5 5", usage: "Deep Background" },
  { name: "OLED Black", hex: "#090909", rgb: "9 9 9", usage: "Surface" },
  { name: "Ghost White", hex: "#fefefe", rgb: "254 254 254", usage: "Signal" },
  { name: "Alabaster", hex: "#d5dada", rgb: "213 218 218", usage: "Structure" },
  
  // Spectral Series
  { name: "Laser Cyan", hex: "#17f7f7", rgb: "23 247 247", usage: "Primary Accent" },
  { name: "Neon Red", hex: "#ff2a6d", rgb: "255 42 109", usage: "Destructive / Spectrum" },
  { name: "Neon Green", hex: "#05f7a5", rgb: "5 247 165", usage: "Success / Spectrum" },
  { name: "Neon Blue", hex: "#0a84ff", rgb: "10 132 255", usage: "Info / Spectrum" },
  { name: "Neon Violet", hex: "#bf5af2", rgb: "191 90 242", usage: "Spectrum" },
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
      {/* Color Square - Rounded, Interactive */}
      <MotionCard 
        className="aspect-[4/5] w-full relative mb-6 transition-all duration-500 ease-out hover:scale-[1.02] border-none"
        style={{ backgroundColor: hex }}
      >
         {/* Floating Usage Label */}
         {usage && (
           <span className={`absolute top-4 left-4 text-[9px] uppercase tracking-[0.2em] font-mono opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 ${['#fefefe', '#d5dada', '#17f7f7', '#05f7a5', '#ff9f0a', '#ffd60a'].includes(hex) ? 'text-black' : 'text-white'}`}>
             {usage}
           </span>
         )}
         
         {/* Copied State - Minimal */}
         {isCopied && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
              <span className="text-[10px] tracking-[0.3em] font-mono text-white">COPIED</span>
            </div>
         )}
      </MotionCard>
      
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
          <MotionSplitText className="text-3xl font-serif text-white">Chromatic Depth</MotionSplitText>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <MotionFadeText className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
            The "Spectral" series expands our brutalist void with high-energy neon injections.
            These colors are reserved for active states, refractions, and data visualization.
          </MotionFadeText>
        </div>
      </div>

      {/* Swatches - Wide Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-8 md:gap-12">
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
                  <Button className="w-full bg-transparent hover:bg-[#17f7f7]/5 text-[#17f7f7] border border-[#17f7f7]/50 hover:border-[#17f7f7] rounded-full h-14 tracking-[0.1em] text-xs uppercase transition-all duration-300 shadow-[0_0_0_1px_transparent] hover:shadow-[0_0_15px_rgba(23,247,247,0.3)]">
                    Primary System
                  </Button>
                  
                  {/* Destructive: Neon Red */}
                  <Button className="w-full bg-transparent hover:bg-[#ff2a6d]/5 text-[#ff2a6d] border border-[#ff2a6d]/50 hover:border-[#ff2a6d] rounded-full h-14 tracking-[0.1em] text-xs uppercase transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,42,109,0.3)]">
                    Critical Action
                  </Button>

                  {/* Tertiary: Link */}
                  <ArrowButton variant="link" className="w-full justify-start text-[#d5dada] hover:text-white text-xs uppercase tracking-[0.2em]">
                    Documentation
                  </ArrowButton>
              </div>
            </div>

            {/* Concept 2: Usage Context */}
            <div className="space-y-8 relative">
               <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Contextual Application</h3>
               <MotionCard className="p-8 border border-white/[0.05] bg-white/[0.01] backdrop-blur-sm space-y-6 depth-card">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-1.5 w-1.5 bg-[#05f7a5] rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-mono text-[#05f7a5] tracking-widest uppercase">Optimal State</span>
                  </div>
                  <h4 className="text-2xl font-serif text-white">Spectral feedback loops.</h4>
                  <p className="text-sm text-[#d5dada]/60 leading-relaxed">
                    Utilize the full spectrum for data density. Colors should vibrate against the void.
                  </p>
               </MotionCard>
            </div>

         </div>
      </div>
    </div>
  );
}
