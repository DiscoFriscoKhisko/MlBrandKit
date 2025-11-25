import { Button } from "./ui/button";
import { MASTER_LOGO_URL } from "./branding/constants";
import { toast } from "sonner@2.0.3";

export function PhysicalMockups() {
  return (
    <div className="space-y-32">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-serif text-white">Tangible Artifacts</h2>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <p className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
            Physical manifestations of the Void. Strictly functional, ruthlessly minimal.
          </p>
        </div>
      </div>

      {/* Digital Stationery (Google Docs) */}
      <div className="pt-24 border-t border-white/[0.05]">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em]">Digital Stationery</h3>
          <Button 
            variant="link" 
            className="text-[#17f7f7] p-0 h-auto text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors decoration-0"
            onClick={() => toast.info("Download started...")}
          >
            Google Doc Template
          </Button>
        </div>

        {/* Google Doc Preview */}
        <div className="relative w-full max-w-3xl mx-auto bg-[#050505] aspect-[1/1.414] shadow-2xl p-[5%] overflow-hidden group">
             <div className="h-full flex flex-col bg-white shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
               {/* Watermark */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
                  <span className="text-[300px] font-serif text-black/[0.03] -rotate-12 select-none leading-none">ml</span>
               </div>

               {/* Header Area */}
               <div className="px-12 py-10 flex justify-between items-end border-b border-black/[0.05] relative z-10">
                  <img src={MASTER_LOGO_URL} alt="Logo" className="h-8 opacity-100 invert brightness-0" />
                  <div className="text-right">
                     <p className="text-black font-serif text-sm">Material Lab</p>
                     <p className="text-[9px] text-black/50 font-mono uppercase tracking-widest mt-1">Executive Memorandum</p>
                  </div>
               </div>

               {/* Body Content */}
               <div className="flex-1 p-12 relative z-10">
                   <div className="w-1/3 h-3 bg-black/10 mb-8 rounded-sm"></div>
                   <div className="space-y-3">
                      <div className="w-full h-2 bg-black/5 rounded-sm"></div>
                      <div className="w-full h-2 bg-black/5 rounded-sm"></div>
                      <div className="w-full h-2 bg-black/5 rounded-sm"></div>
                      <div className="w-2/3 h-2 bg-black/5 rounded-sm"></div>
                   </div>
                   <div className="space-y-3 mt-6">
                      <div className="w-full h-2 bg-black/5 rounded-sm"></div>
                      <div className="w-full h-2 bg-black/5 rounded-sm"></div>
                      <div className="w-5/6 h-2 bg-black/5 rounded-sm"></div>
                   </div>
               </div>

               {/* Footer Area */}
               <div className="px-12 py-4 border-t border-black/[0.05] flex justify-between items-end relative z-10">
                  <div className="text-[6px] text-black/40 font-mono uppercase tracking-wider leading-tight">
                     <p className="font-bold text-black">Material Lab</p>
                     <p>SF, CA • GSTIN: 27AABCU9603R1ZN</p>
                  </div>
                  <div className="text-right text-[6px] text-black/40 font-mono uppercase tracking-wider leading-tight">
                     <p>+1 (555) 019-2834</p>
                     <div className="flex gap-2 justify-end mt-0.5">
                        <span>@materiallab</span>
                        <span>materiallab.io</span>
                     </div>
                  </div>
               </div>
             </div>
        </div>
      </div>

      {/* Email Signature */}
      <div className="pt-24 border-t border-white/[0.05]">
          <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Digital Signature</h3>
          <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-white/10 p-8 rounded-lg relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-1 h-full bg-[#17f7f7]"></div>

             {/* Watermark - Consistent */}
             <div className="absolute -right-12 -bottom-12 z-0 pointer-events-none">
                  <span className="text-[150px] font-serif text-white/[0.02] -rotate-12 select-none leading-none">ml</span>
             </div>
             
             <div className="flex gap-6 items-start relative z-10">
                <img src={MASTER_LOGO_URL} alt="Logo" className="h-16 w-16 object-contain opacity-90 rounded-lg bg-black border border-white/10 p-2" />
                
                <div className="space-y-2 flex-1">
                   <div>
                     <h4 className="text-white font-serif text-lg leading-tight">Damini Rathi</h4>
                     <p className="text-[#17f7f7] font-mono text-[10px] uppercase tracking-widest">Founder</p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[10px] text-[#d5dada]/60 font-light pt-2 border-t border-white/5 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white/20 uppercase tracking-wider text-[8px] w-8">Web</span>
                        <span className="text-white">materiallab.io</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/20 uppercase tracking-wider text-[8px] w-8">Ph</span>
                        <span className="text-white">+1 (555) 019-2834</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/20 uppercase tracking-wider text-[8px] w-8">Soc</span>
                        <span className="text-white">@materiallab</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/20 uppercase tracking-wider text-[8px] w-8">Loc</span>
                        <span className="text-white">SF, CA</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="mt-6 pt-4 border-t border-white/5 relative z-10">
                <p className="text-[8px] text-white/20 font-mono leading-relaxed text-justify">
                   CONFIDENTIALITY NOTICE: The contents of this email message and any attachments are intended solely for the addressee(s) and may contain confidential and/or privileged information and may be legally protected from disclosure.
                </p>
             </div>
          </div>
      </div>

      {/* Company Board / Environmental Graphics */}
      <div className="pt-24 border-t border-white/[0.05]">
          <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Environmental Graphics</h3>
          
          <div className="relative w-full aspect-[21/9] bg-[#080808] overflow-hidden flex items-center justify-center shadow-2xl group">
             {/* Wall Texture */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-20"></div>
             
             {/* Spotlights */}
             <div className="absolute top-0 left-1/4 w-[1px] h-[250px] bg-gradient-to-b from-[#17f7f7]/10 to-transparent transform -rotate-[20deg] blur-[3px]"></div>
             <div className="absolute top-0 right-1/4 w-[1px] h-[250px] bg-gradient-to-b from-[#17f7f7]/10 to-transparent transform rotate-[20deg] blur-[3px]"></div>
             
             {/* 3D Logo Mount */}
             <div className="relative z-10 flex flex-col items-center transform translate-y-4 transition-transform duration-1000 group-hover:scale-105">
                <div className="relative mb-8">
                   {/* Shadow */}
                   <img src={MASTER_LOGO_URL} className="h-32 w-auto blur-xl opacity-50 absolute top-8 left-0 scale-110 text-black" style={{ filter: 'brightness(0) blur(20px)' }} />
                   {/* Actual Object */}
                   <img src={MASTER_LOGO_URL} className="h-32 w-auto relative z-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]" />
                </div>
                
                <div className="text-center">
                   <h1 className="text-4xl font-serif text-white tracking-[0.25em] drop-shadow-[0_5px_10px_rgba(0,0,0,1)]">MATERIAL LAB</h1>
                   <div className="flex items-center justify-center gap-4 mt-4 opacity-60">
                      <div className="h-[1px] w-12 bg-[#17f7f7]"></div>
                      <span className="text-[10px] font-mono text-[#17f7f7] uppercase tracking-[0.3em]">Est. 2024</span>
                      <div className="h-[1px] w-12 bg-[#17f7f7]"></div>
                   </div>
                </div>
             </div>

             {/* Floor Reflection */}
             <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-black to-transparent z-20"></div>
          </div>
      </div>
    </div>
  );
}
