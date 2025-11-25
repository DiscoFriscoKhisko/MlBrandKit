import { Button } from "./ui/button";
import { downloadSVG } from "./ui/utils";
import { MASTER_LOGO_URL, BUSINESS_CARD_FRONT_IMAGE_URL, BUSINESS_CARD_BACK_IMAGE_URL } from "./branding/constants";
import { generateBusinessCardSVG, generateBusinessCardBackSVG } from "./branding/generator";
import { toast } from "sonner@2.0.3";

export function PhysicalMockups() {
  const handleDownloadTemplate = async () => {
    try {
      toast.info("Generating templates...");
      const [front, back] = await Promise.all([
        generateBusinessCardSVG(),
        generateBusinessCardBackSVG()
      ]);
      downloadSVG(front, "material-lab-bc-front.svg");
      setTimeout(() => downloadSVG(back, "material-lab-bc-back.svg"), 100);
      toast.success("Templates downloaded");
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate templates");
    }
  };

  return (
    <div className="space-y-32">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-serif text-white">Physical Mockups</h2>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <p className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
            Tangible touchpoints. Heavy stock, matte finishes, and selective gloss. 
            The physical manifestation of our digital soul.
          </p>
        </div>
      </div>

      {/* Business Cards */}
      <div>
        <div className="flex items-center justify-between mb-12 border-b border-white/[0.05] pb-4">
          <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em]">Business Cards</h3>
          <Button 
            variant="link" 
            className="text-[#17f7f7] p-0 h-auto text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors decoration-0"
            onClick={handleDownloadTemplate}
          >
            Download Vectors
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16">
          {/* Front */}
          <div className="group">
            <div className="relative w-full aspect-[1.586/1] bg-[#fefefe] shadow-2xl mb-8 overflow-hidden transition-transform duration-700 group-hover:scale-[1.01] grainy-aura" style={{ '--aura-color': 'rgba(0,0,0,0.15)' } as React.CSSProperties}>
              <img 
                src={BUSINESS_CARD_FRONT_IMAGE_URL} 
                alt="Front" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-baseline px-1 border-t border-white/[0.1] pt-4">
              <p className="text-sm font-serif text-white">Primary Identity</p>
              <p className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Front</p>
            </div>
          </div>

          {/* Back */}
          <div className="group">
            <div className="relative w-full aspect-[1.586/1] bg-[#090909] border border-white/[0.1] shadow-2xl mb-8 overflow-hidden transition-transform duration-700 group-hover:scale-[1.01] grainy-aura">
               <img 
                src={BUSINESS_CARD_BACK_IMAGE_URL} 
                alt="Back" 
                className="w-full h-full object-cover"
              />
            </div>
             <div className="flex justify-between items-baseline px-1 border-t border-white/[0.1] pt-4">
              <p className="text-sm font-serif text-white">Contact Details</p>
              <p className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-widest">Back</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/[0.05]">
           <div>
             <p className="text-[9px] font-mono text-[#d5dada]/30 uppercase tracking-[0.2em] mb-3">Format</p>
             <p className="text-sm text-[#d5dada]">85mm × 55mm</p>
           </div>
           <div>
             <p className="text-[9px] font-mono text-[#d5dada]/30 uppercase tracking-[0.2em] mb-3">Paper</p>
             <p className="text-sm text-[#d5dada]">350gsm Matte</p>
           </div>
           <div>
             <p className="text-[9px] font-mono text-[#d5dada]/30 uppercase tracking-[0.2em] mb-3">Finish</p>
             <p className="text-sm text-[#d5dada]">Soft Touch Lam</p>
           </div>
            <div>
             <p className="text-[9px] font-mono text-[#d5dada]/30 uppercase tracking-[0.2em] mb-3">Special</p>
             <p className="text-sm text-[#17f7f7] drop-shadow-[0_0_8px_rgba(23,247,247,0.3)]">Cyan Edge Paint</p>
           </div>
        </div>
      </div>

      {/* Letterhead */}
      <div className="pt-24 border-t border-white/[0.05]">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em]">Letterhead</h3>
          <Button 
            variant="link" 
            className="text-[#17f7f7] p-0 h-auto text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors decoration-0"
            onClick={() => downloadAsset(MASTER_LOGO_URL, "letterhead-logo.svg")}
          >
            Download Logo
          </Button>
        </div>

        <div className="relative w-full max-w-3xl mx-auto bg-[#fefefe] aspect-[1/1.414] shadow-2xl p-[8%] overflow-hidden group grainy-aura" style={{ '--aura-color': 'rgba(0,0,0,0.15)' } as React.CSSProperties}>
            {/* Subtle paper grain overlay */}
            <div className="absolute inset-0 bg-black/[0.02] mix-blend-multiply pointer-events-none"></div>
            
            <div className="h-full flex flex-col bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] p-12 relative z-10 transition-transform duration-700 group-hover:scale-[1.005]">
               {/* Header */}
               <div className="flex justify-between items-start mb-16 pb-8 border-b border-black/[0.05]">
                  <img src={MASTER_LOGO_URL} alt="Logo" className="h-10 object-contain opacity-90" />
                  <div className="w-8 h-[2px] bg-[#17f7f7]"></div>
               </div>

               {/* Fake Content - Skeleton */}
               <div className="space-y-8 flex-1 opacity-10">
                  <div className="w-32 h-3 bg-black rounded-sm mb-12"></div>
                  <div className="space-y-3">
                     <div className="w-full h-2 bg-black rounded-sm"></div>
                     <div className="w-full h-2 bg-black rounded-sm"></div>
                     <div className="w-2/3 h-2 bg-black rounded-sm"></div>
                  </div>
                  <div className="space-y-3 pt-6">
                     <div className="w-full h-2 bg-black rounded-sm"></div>
                     <div className="w-5/6 h-2 bg-black rounded-sm"></div>
                  </div>
               </div>

               {/* Footer */}
               <div className="pt-8 border-t border-black/[0.05] flex justify-between items-end text-[9px] text-black/40 font-mono uppercase tracking-[0.2em]">
                  <div className="space-y-2">
                    <p>materiallab.io</p>
                    <p>damini@materiallab.io</p>
                  </div>
                  <p>M/L</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
