import { Button } from "./ui/button";
import { downloadSVG } from "./ui/utils";
import { MASTER_LOGO_URL, BUSINESS_CARD_FRONT_IMAGE_URL, BUSINESS_CARD_BACK_IMAGE_URL } from "./branding/constants";
import { 
  generateWordmarkSVG,
  generateLinkedInPostSVG, 
  generateInstagramPostSVG, 
  generateTwitterHeaderSVG,
  generateBusinessCardSVG,
  generateBusinessCardBackSVG
} from "./branding/generator";
import { toast } from "sonner@2.0.3";
import { KineticIcosahedron } from "./branding/KineticIcosahedron";
import { KineticTriakis } from "./branding/primitives/KineticTriakis";
import { KineticGreatDodecahedron } from "./branding/primitives/KineticGreatDodecahedron";
import { KineticRhombic } from "./branding/primitives/KineticRhombic";
import { KineticStellationCycle } from "./branding/primitives/KineticStellationCycle";
import { KineticGrid } from "./branding/interactive/KineticGrid";
import { MagneticBadge } from "./branding/interactive/MagneticBadge";
import { GrainyCursor } from "./branding/interactive/GrainyCursor";
import { DymaxionMap } from "./branding/primitives/DymaxionMap";
import { useState } from "react";

// Micro Logo (M/L Monogram)
const MICRO_LOGO_SVG = `
<svg width="512" height="512" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" fill="#090909"/>
  <path d="M14 34V14L20 24L26 14V34" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M38 34L32 14" stroke="#17F7F7" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

const generateIsohedronSVG = (color: string) => `
<svg width="512" height="512" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M50 5 L93.3 30 L93.3 80 L50 105 L6.7 80 L6.7 30 Z" />
    <path d="M50 80 L21 30 L79 30 Z" />
    <path d="M50 5 L21 30 M50 5 L79 30" />
    <path d="M93.3 30 L79 30 M93.3 30 L50 80" />
    <path d="M93.3 80 L50 80" />
    <path d="M6.7 80 L50 80" />
    <path d="M6.7 30 L21 30 M6.7 30 L50 80" />
  </g>
</svg>
`;

export function DigitalAssets() {
  const [showCursorDemo, setShowCursorDemo] = useState(false);

  const handleDownload = async (type: string, generator: () => Promise<string> | string, filename: string) => {
    try {
      toast.info(`Generating ${type}...`);
      const svg = await generator();
      downloadSVG(svg, filename);
      toast.success("Download started");
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate asset");
    }
  };

  return (
    <div className="space-y-32 relative">
      {showCursorDemo && <GrainyCursor />}

      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/[0.05] pb-12">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-serif text-white">Digital Assets</h2>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <p className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
            Primary logos, social templates, and glyphs. 
            Pixel-perfect vectors ready for production.
          </p>
        </div>
      </div>

      {/* Identity Primitives */}
      <div>
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Identity Primitives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
           {/* Kinetic Isohedron */}
           <div className="group cursor-pointer" onClick={() => handleDownload("Kinetic Isohedron", () => generateIsohedronSVG("#fefefe"), "kinetic-isohedron-white.svg")}>
             <div className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura">
                <KineticIcosahedron size={120} color="#fefefe" />
                
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white text-black text-[10px] font-mono uppercase tracking-widest px-4 py-2">SVG</span>
                </div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">The Isohedron</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Primitive 01</p>
                </div>
             </div>
           </div>

           {/* Kinetic Triakis */}
           <div className="group cursor-pointer">
             <div className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura">
                <KineticTriakis size={120} color="#fefefe" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 text-[10px] font-mono uppercase tracking-widest px-4 py-2">Locked</span>
                </div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Triakis</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Primitive 02</p>
                </div>
             </div>
           </div>

           {/* Kinetic Great Dodecahedron */}
           <div className="group cursor-pointer">
             <div className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura">
                <KineticGreatDodecahedron size={120} color="#fefefe" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 text-[10px] font-mono uppercase tracking-widest px-4 py-2">Locked</span>
                </div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Great Dodec</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Primitive 03</p>
                </div>
             </div>
           </div>

           {/* Kinetic Rhombic */}
           <div className="group cursor-pointer">
             <div className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura">
                <KineticRhombic size={120} color="#fefefe" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 text-[10px] font-mono uppercase tracking-widest px-4 py-2">Locked</span>
                </div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Rhombic Grid</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Primitive 04</p>
                </div>
             </div>
           </div>

           {/* Kinetic Stellation Cycle */}
           <div className="group cursor-pointer">
             <div className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura">
                <KineticStellationCycle size={120} color="#fefefe" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white text-black text-[10px] font-mono uppercase tracking-widest px-4 py-2">Sequenced</span>
                </div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">59 Icosahedra</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Stellation Cycle</p>
                </div>
             </div>
           </div>

        </div>
      </div>

      {/* Interactive Primitives (New Section) */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Interactive Primitives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Kinetic Grid */}
            <div className="group">
               <div className="aspect-square bg-[#090909] border border-white/[0.1] relative mb-6 overflow-hidden grainy-aura">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <KineticGrid width={400} height={400} color="#17f7f7" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                    <span className="text-[9px] font-mono text-[#17f7f7] uppercase tracking-widest opacity-50">Interacts with Cursor</span>
                  </div>
               </div>
               <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                  <div>
                      <p className="text-sm font-serif text-white">Kinetic Grid</p>
                      <p className="text-[10px] text-[#d5dada]/50 mt-1">Force-directed mesh distortion.</p>
                  </div>
               </div>
            </div>

            {/* Dymaxion Map */}
            <div className="group">
               <div className="aspect-square bg-[#090909] border border-white/[0.1] relative mb-6 overflow-hidden grainy-aura">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <DymaxionMap 
                      size={320} 
                      cities={[
                        { name: "NYC", lat: 40.7128, lng: -74.0060 },
                        { name: "LDN", lat: 51.5074, lng: -0.1278 },
                        { name: "TYO", lat: 35.6762, lng: 139.6503 },
                        { name: "SGP", lat: 1.3521, lng: 103.8198 }
                      ]} 
                    />
                  </div>
               </div>
               <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                  <div>
                      <p className="text-sm font-serif text-white">Dymaxion Projection</p>
                      <p className="text-[10px] text-[#d5dada]/50 mt-1">Global presence visualization.</p>
                  </div>
               </div>
            </div>

            {/* Magnetic Badge */}
            <div className="group">
               <div className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center relative mb-6 overflow-hidden grainy-aura">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
                  
                  <MagneticBadge strength={0.4} className="z-10">
                     <div className="px-6 py-3 border border-white/20 bg-black/50 backdrop-blur-sm rounded-full text-white font-mono text-xs tracking-widest uppercase hover:border-[#17f7f7] hover:text-[#17f7f7] transition-colors duration-300">
                        Magnetic
                     </div>
                  </MagneticBadge>
               </div>
               <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                  <div>
                      <p className="text-sm font-serif text-white">Magnetic Badge</p>
                      <p className="text-[10px] text-[#d5dada]/50 mt-1">Physics-based cursor attraction.</p>
                  </div>
               </div>
            </div>

            {/* Grainy Aura Cursor Demo */}
            <div className="group" onMouseEnter={() => setShowCursorDemo(true)} onMouseLeave={() => setShowCursorDemo(false)}>
               <div className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center relative mb-6 overflow-hidden cursor-none">
                  <p className="text-white font-serif text-lg z-10 pointer-events-none mix-blend-difference">Hover Me</p>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                     <div className="w-32 h-32 rounded-full bg-[#17f7f7] blur-3xl"></div>
                  </div>
               </div>
               <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                  <div>
                      <p className="text-sm font-serif text-white">Grainy Aura Cursor</p>
                      <p className="text-[10px] text-[#d5dada]/50 mt-1">Custom cursor visual with noise.</p>
                  </div>
               </div>
            </div>

        </div>
      </div>

      {/* Textures & Materials (New Section) */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Material Textures</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* OLED Noise */}
            <div className="group cursor-pointer">
               <div className="aspect-square bg-[#050505] border border-white/[0.1] relative mb-4 overflow-hidden grainy-aura">
                  <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}></div>
                  <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-white text-black text-[9px] font-mono uppercase tracking-widest px-2 py-1">SVG Pattern</span>
                  </div>
               </div>
               <p className="text-xs font-medium text-white font-serif">OLED Grain</p>
               <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Texture 01</p>
            </div>

            {/* Jewel Cyan Gradient */}
            <div className="group cursor-pointer">
               <div className="aspect-square bg-[#090909] border border-white/[0.1] relative mb-4 overflow-hidden grainy-aura">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#17f7f7]/20 via-transparent to-[#050505]"></div>
                  <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-white text-black text-[9px] font-mono uppercase tracking-widest px-2 py-1">CSS</span>
                  </div>
               </div>
               <p className="text-xs font-medium text-white font-serif">Jewel Gradient</p>
               <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Texture 02</p>
            </div>
        </div>
      </div>

      {/* Micro Assets */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Micro Assets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Micro Logo (M/L) */}
             <div className="group cursor-pointer" onClick={() => handleDownload("Micro Logo", () => MICRO_LOGO_SVG, "micro-logo.svg")}>
              <div className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center p-12 mb-4 relative grainy-aura">
                 <div className="flex items-center font-serif text-2xl text-white font-bold tracking-tighter">
                    <span>M</span>
                    <span className="text-[#17f7f7] mx-0.5 italic">/</span>
                    <span>L</span>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-white text-black text-[9px] font-mono uppercase tracking-widest px-2 py-1">SVG</span>
                 </div>
              </div>
              <p className="text-xs font-medium text-white font-serif">Micro Logo</p>
              <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Monogram</p>
            </div>

            {/* Favicon Preview */}
            <div className="group cursor-pointer">
              <div className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center p-12 mb-4 relative grainy-aura">
                 <div className="w-8 h-8 bg-[#17f7f7] rounded flex items-center justify-center text-black font-bold font-serif text-xs">
                    M
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-white text-black text-[9px] font-mono uppercase tracking-widest px-2 py-1">ICO</span>
                 </div>
              </div>
              <p className="text-xs font-medium text-white font-serif">App Icon</p>
              <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">32x32</p>
            </div>
        </div>
      </div>

      {/* Wordmarks Section */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Wordmarks</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Black */}
          <div className="group cursor-pointer" onClick={() => handleDownload('Black Wordmark', () => generateWordmarkSVG("black"), 'material-lab-wordmark-black.svg')}>
            <div className="aspect-[2.5/1] bg-[#fefefe] flex items-center justify-center p-8 mb-4 relative grainy-aura" style={{ '--aura-color': 'rgba(0,0,0,0.15)' } as React.CSSProperties}>
               <h1 className="font-serif font-bold text-2xl text-black">material lab</h1>
               <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-mono text-black uppercase tracking-widest">SVG</span>
               </div>
            </div>
            <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Primary Black</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Light BG</span>
            </div>
          </div>

          {/* White */}
          <div className="group cursor-pointer" onClick={() => handleDownload('White Wordmark', () => generateWordmarkSVG("white"), 'material-lab-wordmark-white.svg')}>
            <div className="aspect-[2.5/1] bg-[#090909] border border-white/[0.1] flex items-center justify-center p-8 mb-4 relative grainy-aura">
               <h1 className="font-serif font-bold text-2xl text-white">material lab</h1>
               <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest">SVG</span>
               </div>
            </div>
            <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Primary White</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Dark BG</span>
            </div>
          </div>

          {/* Cyan */}
          <div className="group cursor-pointer" onClick={() => handleDownload('Cyan Wordmark', () => generateWordmarkSVG("cyan"), 'material-lab-wordmark-cyan.svg')}>
             <div className="aspect-[2.5/1] bg-[#090909] border border-[#17f7f7]/30 flex items-center justify-center p-8 mb-4 relative grainy-aura">
               <h1 className="font-serif font-bold text-2xl text-[#17f7f7]">material lab</h1>
               <div className="absolute inset-0 flex items-center justify-center bg-[#17f7f7]/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-mono text-[#17f7f7] uppercase tracking-widest">SVG</span>
               </div>
            </div>
            <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Electric Cyan</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Accent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Templates */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Social Media</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* LinkedIn */}
          <div className="group cursor-pointer" onClick={() => handleDownload('LinkedIn Template', generateLinkedInPostSVG, 'linkedin-post.svg')}>
             <div className="aspect-square bg-[#fefefe] relative overflow-hidden mb-4 grainy-aura" style={{ '--aura-color': 'rgba(0,0,0,0.15)' } as React.CSSProperties}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#17f7f7]/20 rounded-bl-full z-0"></div>
                <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
                   <img src={MASTER_LOGO_URL} alt="Logo" className="h-5 w-auto object-contain self-start opacity-80" />
                   <p className="font-serif text-3xl text-black leading-none tracking-tighter">Ship<br/>faster.</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-black text-white text-[10px] font-mono uppercase tracking-widest px-4 py-2">Download</span>
                </div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">LinkedIn</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">1200 × 1200</span>
            </div>
          </div>
          
          {/* Instagram */}
          <div className="group cursor-pointer" onClick={() => handleDownload('Instagram Template', generateInstagramPostSVG, 'instagram-post.svg')}>
             <div className="aspect-square bg-[#090909] relative overflow-hidden mb-4 border border-white/[0.1] grainy-aura">
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                   <img src={MASTER_LOGO_URL} alt="Logo" className="h-12 w-auto object-contain mb-6 opacity-90 invert" />
                   <div className="h-px w-8 bg-[#17f7f7]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white text-black text-[10px] font-mono uppercase tracking-widest px-4 py-2">Download</span>
                </div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Instagram</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">1080 × 1080</span>
            </div>
          </div>

          {/* Twitter */}
          <div className="group cursor-pointer" onClick={() => handleDownload('Twitter Template', generateTwitterHeaderSVG, 'twitter-header.svg')}>
             <div className="aspect-square bg-[#090909] relative overflow-hidden mb-4 border border-white/[0.1] grainy-aura">
                <div className="absolute inset-0 bg-gradient-to-br from-[#17f7f7]/30 via-[#17f7f7]/5 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <h1 className="font-serif text-4xl text-white tracking-tight">Launch.</h1>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white text-black text-[10px] font-mono uppercase tracking-widest px-4 py-2">Download</span>
                </div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">X / Twitter</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Header</span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Cards */}
      <div className="border-t border-white/[0.05] pt-24 pb-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Business Cards</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Front Card */}
          <div className="group cursor-pointer" onClick={() => handleDownload('Business Card Front', generateBusinessCardSVG, 'business-card-front.svg')}>
             <div className="aspect-[1.58/1] bg-[#090909] relative overflow-hidden mb-4 border border-white/[0.1] grainy-aura p-8 flex flex-col justify-between">
                <div>
                  <p className="font-sans font-bold text-3xl text-white tracking-tight leading-none mb-1">DAMINI</p>
                  <p className="font-sans font-bold text-3xl text-white tracking-tight leading-none">RATHI</p>
                  <div className="h-px w-8 bg-white/30 my-4"></div>
                  <p className="font-sans font-normal text-[9px] uppercase tracking-[0.2em] text-[#d5dada]">CoFounder</p>
                </div>
                
                <div className="flex justify-between items-end">
                   {/* Logo moved to bottom right for drama or keep hidden? SVG has it at x=200. Preview should match. */}
                   {/* SVG code puts logo at 200, 108 (bottom right ish). */}
                   <div className="flex-1"></div>
                   <img src={MASTER_LOGO_URL} className="w-6 h-7 object-contain opacity-80 invert" alt="Logo" />
                </div>
                
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40%] rotate-90">
                   <span className="font-serif font-bold text-[8px] tracking-widest text-[#333333] uppercase">material lab</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white text-black text-[10px] font-mono uppercase tracking-widest px-4 py-2">SVG Front</span>
                </div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Card Front</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">85mm × 55mm</span>
            </div>
          </div>

          {/* Back Card */}
          <div className="group cursor-pointer" onClick={() => handleDownload('Business Card Back', generateBusinessCardBackSVG, 'business-card-back.svg')}>
             <div className="aspect-[1.58/1] bg-[#090909] relative overflow-hidden mb-4 border border-white/[0.1] grainy-aura p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                     <p className="font-sans font-normal text-[9px] text-[#666] tracking-wide mb-1">Please contact me at</p>
                     <p className="font-sans font-semibold text-sm text-white tracking-wide">damini@materiallab.io</p>
                  </div>
                  
                  <div className="flex items-center">
                     <div className="flex-1"></div>
                     <span className="font-sans font-light text-[9px] text-[#666] italic pr-8">or</span>
                  </div>

                  <div>
                     <p className="font-sans font-semibold text-sm text-white tracking-wide">+91-805-013-1733</p>
                  </div>
                </div>
                
                <div className="flex items-end gap-4 mt-auto">
                   <img src={MASTER_LOGO_URL} className="w-6 h-7 object-contain opacity-80 invert" alt="Logo" />
                   <span className="font-serif font-bold text-[10px] text-[#17f7f7] mb-1">materiallab.io</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white text-black text-[10px] font-mono uppercase tracking-widest px-4 py-2">SVG Back</span>
                </div>
             </div>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Card Back</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">85mm × 55mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
