import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ColorPalette } from "./ColorPalette";
import { Typography } from "./Typography";
import { PhysicalMockups } from "./PhysicalMockups";
import { DigitalAssets } from "./DigitalAssets";
import { Motion } from "./Motion";
import { UsageGuidelines } from "./UsageGuidelines";
import { ScrollTypography } from "./experimental/ScrollTypography";
import { MotionPinnedSection } from "./MotionPinnedSection";
import { FloatingShape } from "./ui/FloatingShape";
import { LayoutSystem } from "./LayoutSystem";
import { MASTER_LOGO_URL } from "./branding/constants";
import { Button } from "./ui/button";
import { MotionSection, MotionSplitText, MotionFadeText } from "./MotionSystem";
import { AgencyWebsite } from "./website/AgencyWebsite";
import { SystemV2 } from "./SystemV2";
import { Cursor } from "./ui/Cursor";

export function BrandKit({ onLaunchLab }: { onLaunchLab?: () => void }) {
  return (
    <div className="min-h-screen bg-[#050505] text-foreground font-sans selection:bg-[#17f7f7]/30 selection:text-white relative cursor-none">
      <Cursor />
      
      {/* Ultra-Subtle Grain - Barely Perceptible */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}></div>

      {/* Ambient Floating Elements - Global Depth */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         {/* Top Right Cyan Glow */}
         <FloatingShape depth={0.5} className="top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#17f7f7] opacity-[0.03] blur-[120px]" />
         
         {/* Middle Left Dark Void */}
         <FloatingShape depth={0.2} className="top-[40%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-black opacity-80 blur-[100px]" />
         
         {/* Bottom Right Subtle Accent */}
         <FloatingShape depth={0.8} className="bottom-[-10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[#d5dada] opacity-[0.02] blur-[80px]" />
         
         {/* Geometric Artifacts */}
         <FloatingShape depth={1.2} className="top-[20%] left-[10%]">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-10">
               <path d="M0 0 L20 20 M100 0 L80 20 M100 100 L80 80 M0 100 L20 80" stroke="#17f7f7" strokeWidth="2" />
               <rect x="40" y="40" width="20" height="20" stroke="white" strokeWidth="1" />
            </svg>
         </FloatingShape>

         <FloatingShape depth={-0.5} className="bottom-[30%] left-[5%]">
            <div className="flex gap-2 opacity-5">
              <div className="w-2 h-2 bg-white rounded-full" />
              <div className="w-2 h-2 bg-white rounded-full" />
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
         </FloatingShape>
      </div>

      <Tabs defaultValue="system" className="w-full relative z-10">
        
        {/* Header Section - Constrained */}
        <MotionSection className="pt-20 pb-12" curved>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="space-y-8">
               <div className="h-20 w-20 flex items-center justify-center relative group interactive">
                 <img src={MASTER_LOGO_URL} alt="Material Lab" className="h-16 w-16 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
               </div>
               <div>
                 <MotionSplitText className="text-6xl md:text-7xl font-serif font-medium text-white tracking-tight mb-2">
                   Material Lab
                 </MotionSplitText>
                 <MotionFadeText className="flex items-center gap-3">
                   <div className="w-12 h-[1px] bg-[#17f7f7]"></div>
                   <span className="text-[#17f7f7] font-mono text-xs uppercase tracking-widest opacity-90">Design System V2.0 • Spectral Edition</span>
                 </MotionFadeText>
               </div>
            </div>
            
            <div className="flex gap-4 pb-2 items-center">
              <Button
                onClick={onLaunchLab}
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
              >
                Enter Refraction Lab
              </Button>

              <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

              <Button
                variant="outline"
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
                href="mailto:damini@materiallab.io"
              >
                Contact
              </Button>
            </div>
          </div>
        </MotionSection>

        {/* Sticky Nav - Full Width Background */}
        <div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.03] mb-0">
          <div className="max-w-[1400px] mx-auto px-8">
            <TabsList className="w-full flex flex-wrap md:flex-nowrap justify-start h-auto py-4 p-0 bg-transparent border-b-0 gap-6 md:gap-12">
              {['system', 'colors', 'typography', 'physical', 'digital', 'motion', 'experiments', 'usage', 'website'].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="
                    relative
                    data-[state=active]:bg-transparent
                    data-[state=active]:text-[#17f7f7] 
                    data-[state=active]:shadow-none
                    data-[state=active]:after:w-full
                    p-0
                    pb-2
                    text-[#d5dada]/50
                    hover:text-white
                    capitalize 
                    transition-all
                    duration-500
                    font-mono
                    text-xs
                    tracking-[0.15em]
                    bg-transparent
                    shadow-none
                    focus-visible:ring-1
                    focus-visible:ring-[#17f7f7]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#050505]
                    focus-visible:text-white
                    focus-visible:outline-none
                    after:content-['']
                    after:absolute
                    after:bottom-0
                    after:left-0
                    after:w-0
                    after:h-[1px]
                    after:bg-[#17f7f7]
                    after:transition-all
                    after:duration-500
                    interactive
                  "
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {/* Content Area - Full Width Container */}
        <div className="min-h-[600px] w-full">
          
          {/* System V2 - The New Documentation */}
          <TabsContent value="system" className="max-w-[1600px] mx-auto px-8 py-20 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
            <SystemV2 />
          </TabsContent>

          {/* Colors - Constrained */}
          <TabsContent value="colors" className="max-w-5xl mx-auto px-8 py-20 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
            <ColorPalette />
          </TabsContent>

          {/* Typography - Constrained */}
          <TabsContent value="typography" className="max-w-5xl mx-auto px-8 py-20 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
            <Typography />
          </TabsContent>

          {/* Layout - Constrained (Legacy) */}
          <TabsContent value="layout" className="max-w-5xl mx-auto px-8 py-20 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
            <LayoutSystem />
          </TabsContent>

          {/* Physical - Wide */}
          <TabsContent value="physical" className="max-w-[1600px] mx-auto px-8 py-20 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
            <PhysicalMockups />
          </TabsContent>

          {/* Digital - Wide */}
          <TabsContent value="digital" className="max-w-[1600px] mx-auto px-8 py-20 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
            <DigitalAssets />
          </TabsContent>

          {/* Motion - Constrained */}
          <TabsContent value="motion" className="max-w-5xl mx-auto px-8 py-20 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
            <Motion />
          </TabsContent>

          {/* Experiments - Full Bleed (Flushed) */}
          <TabsContent value="experiments" className="w-full animate-in fade-in-30 duration-1000 outline-none">
             {/* Intro Header - Constrained */}
             <MotionSection curved className="py-20">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/[0.05] pb-12">
                <div className="md:col-span-4">
                  <h2 className="text-3xl font-serif text-white">Experimental Type</h2>
                </div>
                <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
                  <p className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
                    Inter Variable font technology mapped to user interaction. 
                    Demonstrating weight and slant axes responding to scroll velocity in a full-bleed typographic environment.
                  </p>
                </div>
              </div>
             </MotionSection>
             
             {/* Full Bleed Components */}
             <ScrollTypography />
             
             <MotionPinnedSection />
             
             {/* Placeholder for more scrolly telling sections */}
             <div className="h-[50vh] w-full flex items-center justify-center border-t border-white/[0.05]">
                <p className="text-white/20 font-mono uppercase tracking-widest">End of Sequence</p>
             </div>
          </TabsContent>

          {/* Usage - Constrained */}
          <TabsContent value="usage" className="max-w-5xl mx-auto px-8 py-20 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
            <UsageGuidelines />
          </TabsContent>

          {/* Agency Website - Full Width */}
          <TabsContent value="website" className="w-full animate-in fade-in-30 duration-1000 outline-none">
            <AgencyWebsite />
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}
