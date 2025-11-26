import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ColorPalette } from "./ColorPalette";
import { Typography } from "./Typography";
import { PhysicalMockups } from "./PhysicalMockups";
import { DigitalAssets } from "./DigitalAssets";
import { Motion } from "./Motion";
import { UsageGuidelines } from "./UsageGuidelines";
import { ScrollTypography } from "./experimental/ScrollTypography";
import { LayoutSystem } from "./LayoutSystem";
import { MASTER_LOGO_URL } from "./branding/constants";
import { Button } from "./ui/button";
import { ArrowButton } from "./ui/ArrowButton";
import { MotionSection, MotionSplitText, MotionFadeText } from "./MotionSystem";

export function BrandKit({ onLaunchLab }: { onLaunchLab?: () => void }) {
  return (
    <div className="min-h-screen bg-[#050505] text-foreground font-sans selection:bg-[#17f7f7]/30 selection:text-white overflow-x-hidden">
      {/* Ultra-Subtle Grain - Barely Perceptible */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}></div>

      <Tabs defaultValue="experiments" className="w-full relative z-10">
        
        {/* Header Section - Constrained */}
        <MotionSection className="pt-20 pb-12" curved>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="space-y-8">
               <div className="h-20 w-20 flex items-center justify-center relative group">
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
              <ArrowButton 
                onClick={onLaunchLab}
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
              >
                Enter Refraction Lab
              </ArrowButton>
              
              <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

              <ArrowButton 
                variant="outline" 
                className="font-mono text-[10px] uppercase tracking-[0.2em] px-5 py-2.5"
                href="mailto:damini@materiallab.io"
              >
                Contact
              </ArrowButton>
            </div>
          </div>
        </MotionSection>

        {/* Sticky Nav - Full Width Background */}
        <div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.03] mb-0">
          <div className="max-w-[1400px] mx-auto px-8">
            <TabsList className="w-full flex flex-wrap md:flex-nowrap justify-start h-auto py-4 p-0 bg-transparent border-b-0 gap-6 md:gap-12">
              {['colors', 'typography', 'layout', 'physical', 'digital', 'motion', 'experiments', 'usage'].map((tab) => (
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
          
          {/* Colors - Constrained */}
          <TabsContent value="colors" className="max-w-5xl mx-auto px-8 py-20 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
            <ColorPalette />
          </TabsContent>

          {/* Typography - Constrained */}
          <TabsContent value="typography" className="max-w-5xl mx-auto px-8 py-20 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
            <Typography />
          </TabsContent>

          {/* Layout - Constrained */}
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
          <TabsContent value="experiments" className="w-full animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
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
             
             {/* Placeholder for more scrolly telling sections */}
             <div className="h-[50vh] w-full flex items-center justify-center border-t border-white/[0.05]">
                <p className="text-white/20 font-mono uppercase tracking-widest">End of Sequence</p>
             </div>
          </TabsContent>

          {/* Usage - Constrained */}
          <TabsContent value="usage" className="max-w-5xl mx-auto px-8 py-20 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
            <UsageGuidelines />
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}
