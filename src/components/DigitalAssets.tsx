import { downloadSVG } from "./ui/utils";
import { MotionCard, MotionFadeText, MotionSplitText } from "./MotionSystem";
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
import { StellatedIcosidodecahedron } from "./branding/primitives/StellatedIcosidodecahedron";
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

// Images from Unsplash
const IMG_ABSTRACT_CYAN = "https://images.unsplash.com/photo-1573655349936-de6bed86f839?auto=format&fit=crop&w=800&q=80";
const IMG_DARK_STONE = "https://images.unsplash.com/photo-1574505371939-de03b2e174f4?auto=format&fit=crop&w=800&q=80";
const IMG_BRUSHED_METAL = "https://images.unsplash.com/photo-1509311375768-01b361cf6cc3?auto=format&fit=crop&w=800&q=80";
const IMG_GEOMETRIC_CYAN = "https://images.unsplash.com/photo-1601654661685-a54e794246f7?auto=format&fit=crop&w=800&q=80";

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
          <MotionSplitText className="text-3xl font-serif text-white">Digital Assets</MotionSplitText>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <MotionFadeText className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
            Primary logos, social templates, and glyphs. 
            Pixel-perfect vectors ready for production.
          </MotionFadeText>
        </div>
      </div>

      {/* Identity Primitives */}
      <div>
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Identity Primitives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Kinetic Isohedron */}
           <div className="group cursor-pointer" onClick={() => handleDownload("Kinetic Isohedron", () => generateIsohedronSVG("#fefefe"), "kinetic-isohedron-white.svg")}>
             <MotionCard className="aspect-square depth-card flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura border-none">
                <KineticIcosahedron size={120} color="#fefefe" />
                
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white text-black text-[10px] font-mono uppercase tracking-widest px-4 py-2">SVG</span>
                </div>
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">The Isohedron</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Primitive 01</p>
                </div>
             </div>
           </div>

           {/* Kinetic Triakis */}
           <div className="group cursor-pointer">
             <MotionCard className="aspect-square depth-card flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura border-none">
                <KineticTriakis size={120} color="#fefefe" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 text-[10px] font-mono uppercase tracking-widest px-4 py-2">Locked</span>
                </div>
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Triakis</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Primitive 02</p>
                </div>
             </div>
           </div>

           {/* Kinetic Great Dodecahedron */}
           <div className="group cursor-pointer">
             <MotionCard className="aspect-square depth-card flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura border-none">
                <KineticGreatDodecahedron size={120} color="#fefefe" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 text-[10px] font-mono uppercase tracking-widest px-4 py-2">Locked</span>
                </div>
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Great Dodec</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Primitive 03</p>
                </div>
             </div>
           </div>

           {/* Kinetic Rhombic */}
           <div className="group cursor-pointer">
             <MotionCard className="aspect-square depth-card flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura border-none">
                <KineticRhombic size={120} color="#fefefe" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 text-[10px] font-mono uppercase tracking-widest px-4 py-2">Locked</span>
                </div>
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Rhombic Grid</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Primitive 04</p>
                </div>
             </div>
           </div>

           {/* Kinetic Stellation Cycle */}
           <div className="group cursor-pointer">
             <MotionCard className="aspect-square depth-card flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura border-none">
                <KineticStellationCycle size={120} color="#fefefe" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white text-black text-[10px] font-mono uppercase tracking-widest px-4 py-2">Sequenced</span>
                </div>
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">59 Icosahedra</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Stellation Cycle</p>
                </div>
             </div>
           </div>

           {/* Stellated Icosidodecahedron */}
           <div className="group cursor-pointer">
             <MotionCard className="aspect-square depth-card flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura border-none">
                <StellatedIcosidodecahedron size={120} color="#17f7f7" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 text-[10px] font-mono uppercase tracking-widest px-4 py-2">Animated</span>
                </div>
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">Icosidodeca</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Stellation Series</p>
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
               <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] relative mb-6 overflow-hidden grainy-aura border-none">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <KineticGrid width={400} height={400} color="#17f7f7" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                    <span className="text-[9px] font-mono text-[#17f7f7] uppercase tracking-widest opacity-50">Interacts with Cursor</span>
                  </div>
               </MotionCard>
               <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                  <div>
                      <p className="text-sm font-serif text-white">Kinetic Grid</p>
                      <p className="text-[10px] text-[#d5dada]/50 mt-1">Force-directed mesh distortion.</p>
                  </div>
               </div>
            </div>

            {/* Dymaxion Map */}
            <div className="group">
               <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] relative mb-6 overflow-hidden grainy-aura border-none">
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
               </MotionCard>
               <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                  <div>
                      <p className="text-sm font-serif text-white">Dymaxion Projection</p>
                      <p className="text-[10px] text-[#d5dada]/50 mt-1">Global presence visualization.</p>
                  </div>
               </div>
            </div>

            {/* Magnetic Badge */}
            <div className="group">
               <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center relative mb-6 overflow-hidden grainy-aura border-none">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
                  
                  <MagneticBadge strength={0.4} className="z-10">
                     <div className="px-6 py-3 border border-white/20 bg-black/50 backdrop-blur-sm rounded-full text-white font-mono text-xs tracking-widest uppercase hover:border-[#17f7f7] hover:text-[#17f7f7] transition-colors duration-300">
                        Magnetic
                     </div>
                  </MagneticBadge>
               </MotionCard>
               <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                  <div>
                      <p className="text-sm font-serif text-white">Magnetic Badge</p>
                      <p className="text-[10px] text-[#d5dada]/50 mt-1">Physics-based cursor attraction.</p>
                  </div>
               </div>
            </div>

            {/* Grainy Aura Cursor Demo */}
            <div className="group" onMouseEnter={() => setShowCursorDemo(true)} onMouseLeave={() => setShowCursorDemo(false)}>
               <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center relative mb-6 overflow-hidden cursor-none border-none">
                  <p className="text-white font-serif text-lg z-10 pointer-events-none mix-blend-difference">Hover Me</p>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                     <div className="w-32 h-32 rounded-full bg-[#17f7f7] blur-3xl"></div>
                  </div>
               </MotionCard>
               <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                  <div>
                      <p className="text-sm font-serif text-white">Grainy Aura Cursor</p>
                      <p className="text-[10px] text-[#d5dada]/50 mt-1">Custom cursor visual with noise.</p>
                  </div>
               </div>
            </div>

        </div>
      </div>

      {/* Textures & Materials (Expanded with Images) */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Visual Language</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Textures */}
            <div className="space-y-8">
               {/* OLED Noise */}
               <div className="group cursor-pointer">
                  <MotionCard className="aspect-square bg-[#050505] border border-white/[0.1] relative mb-4 overflow-hidden depth-card border-none">
                     <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={{ 
                       backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                     }}></div>
                     <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                       <span className="bg-white text-black text-[9px] font-mono uppercase tracking-widest px-2 py-1">SVG Pattern</span>
                     </div>
                  </MotionCard>
                  <p className="text-xs font-medium text-white font-serif">OLED Grain</p>
                  <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Texture 01</p>
               </div>

               {/* Dark Stone Image */}
               <div className="group cursor-pointer">
                  <MotionCard className="aspect-[3/4] bg-[#090909] border border-white/[0.1] relative mb-4 overflow-hidden depth-card border-none">
                     <img src={IMG_DARK_STONE} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 grayscale hover:grayscale-0" alt="Stone Texture" />
                     <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                       <span className="bg-white text-black text-[9px] font-mono uppercase tracking-widest px-2 py-1">Unsplash</span>
                     </div>
                  </MotionCard>
                  <p className="text-xs font-medium text-white font-serif">Basalt Form</p>
                  <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Photography</p>
               </div>
            </div>

            {/* Column 2: Materials */}
            <div className="space-y-8 md:pt-12">
                {/* Jewel Cyan Gradient */}
                <div className="group cursor-pointer">
                   <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] relative mb-4 overflow-hidden depth-card border-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#17f7f7]/20 via-transparent to-[#050505]"></div>
                      <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="bg-white text-black text-[9px] font-mono uppercase tracking-widest px-2 py-1">CSS</span>
                      </div>
                   </MotionCard>
                   <p className="text-xs font-medium text-white font-serif">Jewel Gradient</p>
                   <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Texture 02</p>
                </div>

                {/* Brushed Metal Image */}
                <div className="group cursor-pointer">
                   <MotionCard className="aspect-video bg-[#090909] border border-white/[0.1] relative mb-4 overflow-hidden depth-card border-none">
                      <img src={IMG_BRUSHED_METAL} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 grayscale hover:grayscale-0" alt="Metal Texture" />
                   </MotionCard>
                   <p className="text-xs font-medium text-white font-serif">Anodized Aluminum</p>
                   <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Material Ref</p>
                </div>
            </div>

            {/* Column 3: Abstract */}
            <div className="space-y-8">
                {/* Geometric Cyan Image */}
                <div className="group cursor-pointer">
                   <MotionCard className="aspect-[3/4] bg-[#090909] border border-white/[0.1] relative mb-4 overflow-hidden depth-card border-none">
                      <img src={IMG_GEOMETRIC_CYAN} className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" alt="Abstract Light" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                   </MotionCard>
                   <p className="text-xs font-medium text-white font-serif">Cyber Noir Light</p>
                   <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Mood</p>
                </div>

                {/* Abstract Cyan Image */}
                 <div className="group cursor-pointer">
                   <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] relative mb-4 overflow-hidden depth-card border-none">
                      <img src={IMG_ABSTRACT_CYAN} className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-700 mix-blend-lighten" alt="Abstract Texture" />
                   </MotionCard>
                   <p className="text-xs font-medium text-white font-serif">Refraction</p>
                   <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Abstract</p>
                </div>
            </div>

        </div>
      </div>

      {/* Micro Assets */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Micro Assets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Micro Logo (M/L) */}
             <div className="group cursor-pointer" onClick={() => handleDownload("Micro Logo", () => MICRO_LOGO_SVG, "micro-logo.svg")}>
              <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center p-12 mb-4 relative grainy-aura border-none">
                 <div className="flex items-center font-serif text-2xl text-white font-bold tracking-tighter">
                    <span>M</span>
                    <span className="text-[#17f7f7] mx-0.5 italic">/</span>
                    <span>L</span>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-white text-black text-[9px] font-mono uppercase tracking-widest px-2 py-1">SVG</span>
                 </div>
              </MotionCard>
              <p className="text-xs font-medium text-white font-serif">Micro Logo</p>
              <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Monogram</p>
            </div>

            {/* Favicon Preview */}
            <div className="group cursor-pointer">
              <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center p-12 mb-4 relative grainy-aura border-none">
                 <div className="w-8 h-8 bg-[#17f7f7] rounded flex items-center justify-center text-black font-bold font-serif text-xs">
                    M
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="bg-white text-black text-[9px] font-mono uppercase tracking-widest px-2 py-1">ICO</span>
                 </div>
              </MotionCard>
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
            <MotionCard className="aspect-[2.5/1] bg-[#fefefe] flex items-center justify-center p-8 mb-4 relative grainy-aura" style={{ '--aura-color': 'rgba(0,0,0,0.15)' } as React.CSSProperties}>
               <h1 className="font-serif font-bold text-2xl text-black">material lab</h1>
               <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-mono text-black uppercase tracking-widest">SVG</span>
               </div>
            </MotionCard>
            <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Primary Black</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Light BG</span>
            </div>
          </div>

          {/* White */}
          <div className="group cursor-pointer" onClick={() => handleDownload('White Wordmark', () => generateWordmarkSVG("white"), 'material-lab-wordmark-white.svg')}>
            <MotionCard className="aspect-[2.5/1] bg-[#090909] border border-white/[0.1] flex items-center justify-center p-8 mb-4 relative grainy-aura border-none">
               <h1 className="font-serif font-bold text-2xl text-white">material lab</h1>
               <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest">SVG</span>
               </div>
            </MotionCard>
            <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Primary White</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Dark BG</span>
            </div>
          </div>

          {/* Cyan */}
          <div className="group cursor-pointer" onClick={() => handleDownload('Cyan Wordmark', () => generateWordmarkSVG("cyan"), 'material-lab-wordmark-cyan.svg')}>
             <MotionCard className="aspect-[2.5/1] bg-[#090909] border border-[#17f7f7]/30 flex items-center justify-center p-8 mb-4 relative grainy-aura">
               <h1 className="font-serif font-bold text-2xl text-[#17f7f7]">material lab</h1>
               <div className="absolute inset-0 flex items-center justify-center bg-[#17f7f7]/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-mono text-[#17f7f7] uppercase tracking-widest">SVG</span>
               </div>
            </MotionCard>
            <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Electric Cyan</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Accent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Templates */}
      <div className="border-t border-white/[0.05] pt-24 pb-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Social Media</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* LinkedIn */}
          <div className="group cursor-pointer" onClick={() => handleDownload('LinkedIn Template', generateLinkedInPostSVG, 'linkedin-post.svg')}>
             <MotionCard className="aspect-square bg-[#fefefe] relative overflow-hidden mb-4 grainy-aura shadow-2xl border-none" style={{ '--aura-color': 'rgba(0,0,0,0.15)' } as React.CSSProperties}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#17f7f7]/20 rounded-bl-[100px] z-0"></div>
                <div className="absolute inset-0 flex flex-col justify-between p-10 z-10">
                   <img src={MASTER_LOGO_URL} alt="Logo" className="h-6 w-auto object-contain self-start opacity-100 mix-blend-multiply" />
                   <p className="font-serif text-4xl text-black leading-[0.9] tracking-tighter">Ship<br/>faster.</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/5 transition-colors duration-500">
                   <span className="bg-black text-white text-[10px] font-mono uppercase tracking-widest px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">Download</span>
                </div>
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-sm font-medium text-white font-serif">LinkedIn</span>
              <span className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-widest">1200 × 1200</span>
            </div>
          </div>
          
          {/* Instagram */}
          <div className="group cursor-pointer" onClick={() => handleDownload('Instagram Template', generateInstagramPostSVG, 'instagram-post.svg')}>
             <MotionCard className="aspect-square bg-[#000000] relative overflow-hidden mb-4 border border-white/[0.1] grainy-aura shadow-2xl">
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                   <img src={MASTER_LOGO_URL} alt="Logo" className="h-16 w-auto object-contain mb-6 opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                   <div className="h-[1px] w-8 bg-[#17f7f7]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-white/0 group-hover:bg-white/5 transition-colors duration-500">
                   <span className="bg-white text-black text-[10px] font-mono uppercase tracking-widest px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">Download</span>
                </div>
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-sm font-medium text-white font-serif">Instagram</span>
              <span className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-widest">1080 × 1080</span>
            </div>
          </div>

          {/* Twitter */}
          <div className="group cursor-pointer" onClick={() => handleDownload('Twitter Template', generateTwitterHeaderSVG, 'twitter-header.svg')}>
             <MotionCard className="aspect-square bg-[#090909] relative overflow-hidden mb-4 border border-white/[0.1] grainy-aura shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#17f7f7]/20 via-[#050505] to-[#000000]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <h1 className="font-serif text-4xl text-white tracking-tight drop-shadow-lg">Launch.</h1>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-white/0 group-hover:bg-white/5 transition-colors duration-500">
                   <span className="bg-white text-black text-[10px] font-mono uppercase tracking-widest px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">Download</span>
                </div>
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-sm font-medium text-white font-serif">X / Twitter</span>
              <span className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Header</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
