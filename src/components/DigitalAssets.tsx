import { downloadSVG, downloadSVGAsPNG } from "./ui/utils";
import { LazyRender } from "./ui/LazyRender";
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
import { Button } from "./ui/button";
import { MagneticBadge } from "./branding/interactive/MagneticBadge";
import { GrainyCursor } from "./branding/interactive/GrainyCursor";
import { DymaxionMap } from "./branding/primitives/DymaxionMap";
import { useState } from "react";
import { Download } from "lucide-react";
import porousCube from 'figma:asset/7b0237d2897c59c2637d17234831014cabda6fb0.png';

// Helper to convert image URL to Base64 (duplicated from generator.ts to avoid multiple file edits)
async function getBase64Image(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const generateCompositeLogoSVG = async (variant: "black" | "white") => {
  const logoDataUri = await getBase64Image(porousCube);
  const fillColor = variant === "white" ? "#FFFFFF" : "#090A09";
  
  // Refined Proportions: Tighter lockup, balanced icon weight
  return `
    <svg width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
      <image href="${logoDataUri}" x="20" y="35" width="130" height="130" />
      <text x="180" y="132" font-family="Merriweather, serif" font-weight="bold" font-size="90" fill="${fillColor}" letter-spacing="-3">material lab</text>
    </svg>
  `.trim();
};

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

  const handleDownload = async (
    type: string, 
    generator: () => Promise<string> | string, 
    filename: string, 
    format: 'svg' | 'png' = 'svg',
    width: number = 1080, 
    height: number = 1080
  ) => {
    try {
      toast.info(`Generating ${type} (${format.toUpperCase()})...`);
      const svg = await generator();
      
      if (format === 'png') {
        const pngFilename = filename.replace('.svg', '.png');
        downloadSVGAsPNG(svg, pngFilename, width, height);
      } else {
        downloadSVG(svg, filename);
      }
      
      toast.success("Download started");
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate asset");
    }
  };

  const DownloadButtons = ({ 
    onDownload, 
    className = "",
    width = 1080,
    height = 1080
  }: { 
    onDownload: (format: 'svg' | 'png', w: number, h: number) => void, 
    className?: string,
    width?: number,
    height?: number
  }) => (
    <div className={`absolute inset-x-0 bottom-0 p-6 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 ${className}`}>
       <Button
         variant="light"
         size="sm"
         withArrow={false}
         withAnimation={false}
         onClick={(e) => { e.stopPropagation(); onDownload('svg', width, height); }}
       >
         SVG
       </Button>
       <Button
         variant="outline"
         size="sm"
         withArrow={false}
         withAnimation={false}
         onClick={(e) => { e.stopPropagation(); onDownload('png', width, height); }}
       >
         PNG
       </Button>
    </div>
  );

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
           <div className="group relative">
             <MotionCard className="aspect-square depth-card flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura border-none">
                <LazyRender unmountOnHide>
                  <KineticIcosahedron size={120} color="#fefefe" />
                </LazyRender>
                <DownloadButtons 
                  onDownload={(f, w, h) => handleDownload("Kinetic Isohedron", () => generateIsohedronSVG("#fefefe"), "kinetic-isohedron-white.svg", f, w, h)} 
                />
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-4">
                <div>
                    <p className="text-sm font-serif text-white">The Isohedron</p>
                    <p className="text-[10px] text-[#d5dada]/50 mt-1">Primitive 01</p>
                </div>
             </div>
           </div>

           {/* Kinetic Triakis */}
           <div className="group">
             <MotionCard className="aspect-square depth-card flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura border-none">
                <LazyRender unmountOnHide>
                  <KineticTriakis size={120} color="#fefefe" />
                </LazyRender>
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
           <div className="group">
             <MotionCard className="aspect-square depth-card flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura border-none">
                <LazyRender unmountOnHide>
                  <KineticGreatDodecahedron size={120} color="#fefefe" />
                </LazyRender>
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
           <div className="group">
             <MotionCard className="aspect-square depth-card flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura border-none">
                <LazyRender unmountOnHide>
                  <KineticRhombic size={120} color="#fefefe" />
                </LazyRender>
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
           <div className="group">
             <MotionCard className="aspect-square depth-card flex items-center justify-center p-12 mb-6 transition-transform duration-500 relative overflow-hidden grainy-aura border-none">
                <LazyRender unmountOnHide>
                  <KineticStellationCycle size={120} color="#fefefe" />
                </LazyRender>
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

        </div>
      </div>

      {/* Interactive Primitives */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Interactive Primitives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Kinetic Grid */}
            <div className="group">
               <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] relative mb-6 overflow-hidden grainy-aura border-none">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LazyRender unmountOnHide>
                      <KineticGrid width={400} height={400} color="#17f7f7" />
                    </LazyRender>
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
                    <LazyRender unmountOnHide>
                      <DymaxionMap 
                        size={320} 
                        cities={[
                          { name: "NYC", lat: 40.7128, lng: -74.0060 },
                          { name: "LDN", lat: 51.5074, lng: -0.1278 },
                          { name: "TYO", lat: 35.6762, lng: 139.6503 },
                          { name: "SGP", lat: 1.3521, lng: 103.8198 }
                        ]} 
                      />
                    </LazyRender>
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

      {/* Textures & Materials */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Visual Language</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Textures */}
            <div className="space-y-8">
               {/* OLED Noise */}
               <div className="group">
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
               <div className="group">
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
                <div className="group">
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
                <div className="group">
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
                <div className="group">
                   <MotionCard className="aspect-[3/4] bg-[#090909] border border-white/[0.1] relative mb-4 overflow-hidden depth-card border-none">
                      <img src={IMG_GEOMETRIC_CYAN} className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" alt="Abstract Light" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                   </MotionCard>
                   <p className="text-xs font-medium text-white font-serif">Cyber Noir Light</p>
                   <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Mood</p>
                </div>

                {/* Abstract Cyan Image */}
                 <div className="group">
                   <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] relative mb-4 overflow-hidden depth-card border-none">
                      <img src={IMG_ABSTRACT_CYAN} className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-700 mix-blend-lighten" alt="Abstract Texture" />
                   </MotionCard>
                   <p className="text-xs font-medium text-white font-serif">Refraction</p>
                   <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Abstract</p>
                </div>
            </div>

        </div>
      </div>


      {/* Master Lockup */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Master Lockup</h3>
        <div className="grid md:grid-cols-2 gap-8">
           {/* White Composite */}
           <div className="group relative">
             <MotionCard className="aspect-[3/1] bg-[#090909] border border-white/[0.1] flex items-center justify-center p-12 mb-4 relative grainy-aura border-none">
                <div className="flex items-center gap-6">
                   <img src={porousCube} className="w-16 h-16 object-contain opacity-90" alt="Logomark" />
                   <h1 className="font-serif font-bold text-4xl text-white tracking-tight">material lab</h1>
                </div>
                <DownloadButtons 
                  onDownload={(f, w, h) => handleDownload('Composite Logo (White)', () => generateCompositeLogoSVG("white"), 'material-lab-composite-white.svg', f, w, h)}
                  width={1600} height={400}
                />
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
               <span className="text-xs font-medium text-white font-serif">Composite White</span>
               <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Dark BG</span>
             </div>
           </div>

           {/* Black Composite */}
           <div className="group relative">
             <MotionCard className="aspect-[3/1] bg-[#fefefe] flex items-center justify-center p-12 mb-4 relative grainy-aura" style={{ '--aura-color': 'rgba(0,0,0,0.15)' } as React.CSSProperties}>
                <div className="flex items-center gap-6">
                   <img src={porousCube} className="w-16 h-16 object-contain mix-blend-multiply opacity-90" alt="Logomark" />
                   <h1 className="font-serif font-bold text-4xl text-black tracking-tight">material lab</h1>
                </div>
                <DownloadButtons 
                  onDownload={(f, w, h) => handleDownload('Composite Logo (Black)', () => generateCompositeLogoSVG("black"), 'material-lab-composite-black.svg', f, w, h)}
                  width={1600} height={400}
                  className="text-black"
                />
             </MotionCard>
             <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
               <span className="text-xs font-medium text-white font-serif">Composite Black</span>
               <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Light BG</span>
             </div>
           </div>
        </div>
      </div>

      {/* Micro Assets */}
      <div className="border-t border-white/[0.05] pt-24">
        <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Micro Assets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Micro Logo (M/L) */}
             <div className="group relative">
              <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center p-12 mb-4 relative grainy-aura border-none">
                 <div className="flex items-center font-serif text-2xl text-white font-bold tracking-tighter">
                    <span>M</span>
                    <span className="text-[#17f7f7] mx-0.5 italic">/</span>
                    <span>L</span>
                 </div>
                 <DownloadButtons 
                   onDownload={(f, w, h) => handleDownload("Micro Logo", () => MICRO_LOGO_SVG, "micro-logo.svg", f, w, h)}
                   width={512} height={512}
                 />
              </MotionCard>
              <p className="text-xs font-medium text-white font-serif">Micro Logo</p>
              <p className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest mt-1">Monogram</p>
            </div>

            {/* Favicon Preview */}
            <div className="group">
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
          <div className="group relative">
            <MotionCard className="aspect-[2.5/1] bg-[#fefefe] flex items-center justify-center p-8 mb-4 relative grainy-aura" style={{ '--aura-color': 'rgba(0,0,0,0.15)' } as React.CSSProperties}>
               <h1 className="font-serif font-bold text-2xl text-black">material lab</h1>
               <DownloadButtons 
                 onDownload={(f, w, h) => handleDownload('Black Wordmark', () => generateWordmarkSVG("black"), 'material-lab-wordmark-black.svg', f, w, h)}
                 width={1200} height={480}
                 className="text-black"
               />
            </MotionCard>
            <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Primary Black</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Light BG</span>
            </div>
          </div>

          {/* White */}
          <div className="group relative">
            <MotionCard className="aspect-[2.5/1] bg-[#090909] border border-white/[0.1] flex items-center justify-center p-8 mb-4 relative grainy-aura border-none">
               <h1 className="font-serif font-bold text-2xl text-white">material lab</h1>
               <DownloadButtons 
                 onDownload={(f, w, h) => handleDownload('White Wordmark', () => generateWordmarkSVG("white"), 'material-lab-wordmark-white.svg', f, w, h)}
                 width={1200} height={480}
               />
            </MotionCard>
            <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Primary White</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Dark BG</span>
            </div>
          </div>

          {/* Cyan */}
          <div className="group relative">
             <MotionCard className="aspect-[2.5/1] bg-[#090909] border border-[#17f7f7]/30 flex items-center justify-center p-8 mb-4 relative grainy-aura">
               <h1 className="font-serif font-bold text-2xl text-[#17f7f7]">material lab</h1>
               <DownloadButtons 
                 onDownload={(f, w, h) => handleDownload('Cyan Wordmark', () => generateWordmarkSVG("cyan"), 'material-lab-wordmark-cyan.svg', f, w, h)}
                 width={1200} height={480}
               />
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
          <div className="group relative">
            <MotionCard className="aspect-[1.91/1] bg-[#090909] border border-white/[0.1] flex items-center justify-center p-8 mb-4 relative overflow-hidden grainy-aura border-none">
               <div className="flex flex-col items-center gap-2">
                  <h2 className="font-serif text-white">LinkedIn</h2>
                  <p className="text-[9px] font-mono text-[#17f7f7]">PROMO KIT</p>
               </div>
               <DownloadButtons 
                 onDownload={(f, w, h) => handleDownload('LinkedIn Template', generateLinkedInPostSVG, 'linkedin-post.svg', f, w, h)}
                 width={1200} height={627}
               />
            </MotionCard>
            <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">LinkedIn Post</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">1200x627</span>
            </div>
          </div>

          {/* Instagram */}
          <div className="group relative">
            <MotionCard className="aspect-square bg-[#090909] border border-white/[0.1] flex items-center justify-center p-8 mb-4 relative overflow-hidden grainy-aura border-none">
               <div className="flex flex-col items-center gap-2">
                  <h2 className="font-serif text-white">Instagram</h2>
                  <p className="text-[9px] font-mono text-[#17f7f7]">SQUARE</p>
               </div>
               <DownloadButtons 
                 onDownload={(f, w, h) => handleDownload('Instagram Template', generateInstagramPostSVG, 'instagram-post.svg', f, w, h)}
                 width={1080} height={1080}
               />
            </MotionCard>
            <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">Instagram Feed</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">1080x1080</span>
            </div>
          </div>

          {/* Twitter Header */}
          <div className="group relative">
            <MotionCard className="aspect-[3/1] bg-[#090909] border border-white/[0.1] flex items-center justify-center p-8 mb-4 relative overflow-hidden grainy-aura border-none">
               <div className="flex flex-col items-center gap-2">
                  <h2 className="font-serif text-white">X / Twitter</h2>
                  <p className="text-[9px] font-mono text-[#17f7f7]">HEADER</p>
               </div>
               <DownloadButtons 
                 onDownload={(f, w, h) => handleDownload('Twitter Header', generateTwitterHeaderSVG, 'twitter-header.svg', f, w, h)}
                 width={1500} height={500}
               />
            </MotionCard>
            <div className="flex justify-between items-baseline border-t border-white/[0.1] pt-3">
              <span className="text-xs font-medium text-white font-serif">X Header</span>
              <span className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">1500x500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Print Collateral */}
      <div className="border-t border-white/[0.05] pt-24 pb-32">
         <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Print Collateral</h3>
         <div className="grid md:grid-cols-2 gap-12">
            {/* Business Card Front */}
            <div className="group relative">
               <MotionCard className="aspect-[1.75/1] bg-[#090909] border border-white/[0.1] flex items-center justify-center relative overflow-hidden grainy-aura border-none">
                 <div className="absolute inset-0 bg-black flex items-center justify-center">
                     <img src={BUSINESS_CARD_FRONT_IMAGE_URL} className="w-full h-full object-cover opacity-80" alt="Business Card Front" />
                 </div>
                 <DownloadButtons 
                   onDownload={(f, w, h) => handleDownload('Business Card Front', generateBusinessCardSVG, 'business-card-front.svg', f, w, h)}
                   width={1050} height={600}
                 />
               </MotionCard>
               <p className="mt-4 text-xs font-medium text-white font-serif">Business Card (Front)</p>
            </div>

            {/* Business Card Back */}
            <div className="group relative">
               <MotionCard className="aspect-[1.75/1] bg-[#090909] border border-white/[0.1] flex items-center justify-center relative overflow-hidden grainy-aura border-none">
                 <div className="absolute inset-0 bg-white flex items-center justify-center">
                     <img src={BUSINESS_CARD_BACK_IMAGE_URL} className="w-full h-full object-cover" alt="Business Card Back" />
                 </div>
                 <DownloadButtons 
                   onDownload={(f, w, h) => handleDownload('Business Card Back', generateBusinessCardBackSVG, 'business-card-back.svg', f, w, h)}
                   width={1050} height={600}
                 />
               </MotionCard>
               <p className="mt-4 text-xs font-medium text-white font-serif">Business Card (Back)</p>
            </div>
         </div>
      </div>

    </div>
  );
}
