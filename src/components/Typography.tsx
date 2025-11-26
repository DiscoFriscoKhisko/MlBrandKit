import { useState, useRef, useEffect } from "react";
import { ArrowButton } from "./ui/ArrowButton";
import { toast } from "sonner@2.0.3";
import { copyToClipboard } from "./ui/utils";
import { MotionFadeText, MotionSplitText, MotionSection, MotionCard } from "./MotionSystem";
import { Slider } from "./ui/slider";
import { motion } from "motion/react";

const typographySpecs = [
  {
    level: "Display",
    font: "Merriweather",
    weight: "Bold",
    weightClass: "font-bold",
    size: "64px",
    sizeClass: "text-6xl md:text-7xl",
    lineHeight: "1.05",
    tracking: "-0.02em",
    example: "Vision",
  },
  {
    level: "Heading 1",
    font: "Merriweather",
    weight: "Bold",
    weightClass: "font-bold",
    size: "48px",
    sizeClass: "text-5xl",
    lineHeight: "1.1",
    tracking: "-0.01em",
    example: "Editorial Depth",
  },
  {
    level: "Heading 2",
    font: "Merriweather",
    weight: "Regular",
    weightClass: "font-normal",
    size: "32px",
    sizeClass: "text-3xl",
    lineHeight: "1.2",
    tracking: "0",
    example: "The silence of space",
  },
  {
    level: "Body Large",
    font: "Inter",
    weight: "Light",
    weightClass: "font-light",
    size: "20px",
    sizeClass: "text-xl",
    lineHeight: "1.6",
    tracking: "0",
    example: "Design is the silent ambassador of your brand.",
  },
  {
    level: "Body",
    font: "Inter",
    weight: "Regular",
    weightClass: "font-normal",
    size: "16px",
    sizeClass: "text-base",
    lineHeight: "1.6",
    tracking: "0",
    example: "Precision is not just a detail. It is the foundation.",
  },
  {
    level: "Mono Label",
    font: "Inter",
    weight: "Medium",
    weightClass: "font-medium",
    size: "11px",
    sizeClass: "text-[11px] uppercase tracking-[0.2em] font-mono",
    lineHeight: "1.4",
    tracking: "0.2em",
    example: "SPECIFICATION 01",
  },
];

export function Typography() {
  const [previewText, setPreviewText] = useState("Material Lab");
  const [weight, setWeight] = useState([400]);
  const [slant, setSlant] = useState([0]);
  
  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      toast.success("Copied style classes");
    } else {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="space-y-32">
       {/* Inject Inter Variable Font for this section */}
       <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap');
        `}</style>

      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <MotionSplitText className="text-3xl font-serif text-white">Typographic Voice</MotionSplitText>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <MotionFadeText className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
            Merriweather provides the authority of the printed word. Inter provides the utility of the machine.
            Together, they form a dialogue between tradition and technology.
          </MotionFadeText>
        </div>
      </div>
      
      {/* Variable Font Playground */}
      <MotionSection curved className="bg-[#090909] border border-white/10 p-8 md:p-12">
         <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4 space-y-8">
               <div>
                 <h3 className="text-[10px] font-mono text-[#17f7f7] uppercase tracking-[0.3em] mb-6">Variable Axis Control</h3>
                 <p className="text-sm text-[#d5dada]/60 mb-8">Manipulate the Inter Variable axes to fine-tune typographic voice for specific interaction states.</p>
               </div>
               
               <div className="space-y-6">
                  <div className="space-y-3">
                     <div className="flex justify-between text-[10px] font-mono text-[#d5dada] uppercase tracking-wider">
                        <span>Weight (wght)</span>
                        <span>{weight[0]}</span>
                     </div>
                     <Slider 
                        defaultValue={[400]} 
                        max={900} 
                        min={100} 
                        step={1} 
                        value={weight}
                        onValueChange={setWeight}
                        className="py-2"
                     />
                  </div>

                  <div className="space-y-3">
                     <div className="flex justify-between text-[10px] font-mono text-[#d5dada] uppercase tracking-wider">
                        <span>Slant (slnt)</span>
                        <span>{slant[0]}deg</span>
                     </div>
                     <Slider 
                        defaultValue={[0]} 
                        max={0} 
                        min={-10} 
                        step={0.1} 
                        value={slant}
                        onValueChange={setSlant}
                        className="py-2"
                     />
                  </div>

                  <div className="pt-4">
                     <input 
                       type="text" 
                       value={previewText}
                       onChange={(e) => setPreviewText(e.target.value)}
                       className="w-full bg-black/20 border border-white/10 text-white px-4 py-2 text-sm font-sans focus:outline-none focus:border-[#17f7f7]/50 transition-colors rounded"
                       placeholder="Type to test..."
                     />
                  </div>
               </div>
            </div>

            <div className="md:col-span-8 flex items-center justify-center min-h-[300px] border-l border-white/5 pl-8 overflow-hidden relative">
               <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(10,1fr)] opacity-10 pointer-events-none">
                  {Array.from({ length: 200 }).map((_, i) => (
                     <div key={i} className="border-[0.5px] border-[#17f7f7]/20" />
                  ))}
               </div>
               
               <motion.div 
                 className="text-center z-10 break-words max-w-full p-4"
                 animate={{
                    fontVariationSettings: `'wght' ${weight[0]}, 'slnt' ${slant[0]}`
                 }}
                 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    color: '#ffffff',
                    lineHeight: 1,
                 }}
               >
                 {previewText}
               </motion.div>
               
               <div className="absolute bottom-4 right-4 text-[9px] font-mono text-[#17f7f7]/50">
                  font-variation-settings: 'wght' {weight[0]}, 'slnt' {slant[0]};
               </div>
            </div>
         </div>
      </MotionSection>

      {/* Type Specimen List */}
      <div className="w-full border-t border-white/[0.05]">
        {typographySpecs.map((spec, index) => (
          <div 
            key={spec.level} 
            className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-white/[0.05] hover:bg-white/[0.01] transition-colors duration-500"
            onClick={() => handleCopy(`${spec.font === "Merriweather" ? "font-serif" : "font-sans"} ${spec.sizeClass} ${spec.weightClass} tracking-[${spec.tracking}]`)}
          >
            {/* Meta Column */}
            <div className="md:col-span-3 flex flex-col justify-between h-full py-1">
              <div>
                <span className="text-[10px] font-mono text-[#17f7f7] uppercase tracking-[0.2em] mb-2 block opacity-60 group-hover:opacity-100 transition-opacity">
                  {spec.level}
                </span>
                <div className="flex flex-col gap-1 text-[#d5dada]/40 font-mono text-[10px] uppercase tracking-wider">
                   <span>{spec.font}</span>
                   <span>{spec.weight} / {spec.size}</span>
                   <span>LH {spec.lineHeight} / TR {spec.tracking}</span>
                </div>
              </div>
              <span className="text-[9px] text-white/20 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 mt-8 cursor-pointer">
                Click to Copy
              </span>
            </div>

            {/* Example Column */}
            <div className="md:col-span-9 flex items-center overflow-hidden">
               <span 
                 className={`${spec.font === "Merriweather" ? "font-serif" : "font-sans"} text-white block`}
                 style={{ 
                   fontSize: spec.size,
                   fontWeight: spec.weight === "Bold" ? 700 : spec.weight === "Light" ? 300 : spec.weight === "Medium" ? 500 : 400,
                   lineHeight: spec.lineHeight,
                   letterSpacing: spec.tracking
                 }}
               >
                 {spec.example}
               </span>
            </div>
          </div>
        ))}
      </div>

      {/* Editorial Layout Example */}
      <MotionSection curved className="bg-[#090909] border border-white/5 px-8 py-12">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Editorial Applications</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
          {/* Web Interface: Hero */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#17f7f7]"></span>
              <span className="text-[10px] font-mono text-[#d5dada]/60 uppercase tracking-widest">Web Interface / Hero</span>
            </div>
            <div className="border-l-2 border-[#17f7f7] pl-8 py-2">
              <h1 className="font-serif text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6">
                Luxury is<br/>
                <span className="italic text-[#d5dada]">Subtractive.</span>
              </h1>
              <p className="text-lg font-light text-[#d5dada]/80 leading-relaxed max-w-md mb-8">
                By removing the noise, we allow the signal to be heard. 
                Every pixel must justify its existence in the void.
              </p>
              <ArrowButton variant="link" className="text-[#17f7f7] font-bold tracking-[0.2em] text-[10px]">
                Read Manifesto
              </ArrowButton>
            </div>
          </div>

          {/* Print: Magazine Column */}
          <div className="space-y-8">
             <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-white border border-white/20"></span>
              <span className="text-[10px] font-mono text-[#d5dada]/60 uppercase tracking-widest">Print / Vertical Spread</span>
            </div>
            <div className="columns-1 md:columns-2 gap-8 text-[11px] text-[#d5dada]/70 leading-[1.8] text-justify">
              <p className="mb-4">
                <span className="float-left text-4xl font-serif text-white mr-2 mt-[-6px]">T</span>
                he refractive index of the glass determines the angle of the beam. In our simulations, we set this to 1.52—identical to crown glass. This creates a distinct separation of the spectral lines, allowing the "Neon Red" warnings to bleed into the "Laser Cyan" safe zones without mixing.
              </p>
              <p>
                It is this precision that defines the Material Lab aesthetic. We do not fake the glow; we calculate it. Every shadow is a result of a ray trace, every highlight a consequence of a photon hitting a surface.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="font-mono text-[9px] text-[#17f7f7] uppercase tracking-[0.2em]">Fig 1.2 — Light Transport</p>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Digital Product: Data Visualization */}
      <div className="pt-24 border-t border-white/[0.05]">
         <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Data Density</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "System Status", value: "Optimal", color: "text-[#17f7f7]" },
              { label: "Ray Depth", value: "128", color: "text-white" },
              { label: "Refraction", value: "1.52", color: "text-white" },
              { label: "Spectral Shift", value: "+0.04nm", color: "text-[#ff2a6d]" }
            ].map((stat, i) => (
              <div key={i} className="border-l border-white/10 pl-6">
                 <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mb-2">{stat.label}</p>
                 <p className={`text-2xl font-mono ${stat.color} tracking-tighter`}>{stat.value}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
