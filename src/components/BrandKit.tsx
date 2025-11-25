import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ColorPalette } from "./ColorPalette";
import { Typography } from "./Typography";
import { PhysicalMockups } from "./PhysicalMockups";
import { DigitalAssets } from "./DigitalAssets";
import { Motion } from "./Motion";
import { UsageGuidelines } from "./UsageGuidelines";
import { MASTER_LOGO_URL } from "./branding/constants";
import { Button } from "./ui/button";

export function BrandKit() {
  return (
    <div className="min-h-screen bg-[#050505] text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
      {/* Ultra-Subtle Grain - Barely Perceptible */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015] mix-blend-overlay" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-20">
        
        {/* Brand Header - Minimal & Spaced */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-32 gap-8">
          <div className="space-y-8">
             <div className="h-20 w-20 flex items-center justify-center relative group">
               <img src={MASTER_LOGO_URL} alt="Material Lab" className="h-16 w-16 object-contain opacity-90" />
             </div>
             <div>
               <h1 className="text-6xl md:text-7xl font-serif font-medium text-white tracking-tight mb-2">Material Lab</h1>
               <div className="flex items-center gap-3">
                 <div className="h-px w-8 bg-[#17f7f7]"></div>
                 <span className="text-[#d5dada] font-mono text-[10px] uppercase tracking-[0.3em]">Design System V2.0</span>
               </div>
             </div>
          </div>
          
          <div className="flex gap-8 pb-2">
            <Button variant="link" className="text-[#d5dada]/60 hover:text-white p-0 h-auto font-mono text-[10px] uppercase tracking-[0.2em] decoration-0 transition-colors duration-500" asChild>
              <a href="mailto:damini@materiallab.io">Contact</a>
            </Button>
            <Button variant="link" className="text-[#17f7f7] hover:text-[#17f7f7]/80 p-0 h-auto font-mono text-[10px] uppercase tracking-[0.2em] decoration-0 transition-colors duration-500">
              Download Assets
            </Button>
          </div>
        </div>

        <Tabs defaultValue="colors" className="w-full">
          <div className="sticky top-0 z-50 pt-4 pb-12 mb-16 backdrop-blur-xl -mx-8 px-8 bg-[#050505]/80 border-b border-white/[0.03]">
            <TabsList className="w-full flex flex-wrap md:flex-nowrap justify-start h-auto p-0 bg-transparent border-b-0 gap-6 md:gap-12">
              {['colors', 'typography', 'physical', 'digital', 'motion', 'usage'].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="
                    relative
                    data-[state=active]:bg-transparent
                    data-[state=active]:text-white 
                    data-[state=active]:shadow-none
                    data-[state=active]:after:w-full
                    p-0
                    pb-2
                    text-[#d5dada]/70
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

          <div className="min-h-[600px] max-w-5xl mx-auto">
            <TabsContent value="colors" className="space-y-32 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
              <ColorPalette />
            </TabsContent>

            <TabsContent value="typography" className="space-y-32 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
              <Typography />
            </TabsContent>

            <TabsContent value="physical" className="space-y-32 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
              <PhysicalMockups />
            </TabsContent>

            <TabsContent value="digital" className="space-y-32 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
              <DigitalAssets />
            </TabsContent>

            <TabsContent value="motion" className="space-y-32 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
              <Motion />
            </TabsContent>

            <TabsContent value="usage" className="space-y-32 animate-in fade-in-30 slide-in-from-bottom-4 duration-1000 outline-none">
              <UsageGuidelines />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
