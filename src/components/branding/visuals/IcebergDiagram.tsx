import React from "react";
import { Button } from "../../ui/button";

export function IcebergDiagram() {
  return (
    <div className="w-full h-full relative flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-[#050505]">
      
      {/* --- TOP: The User Experience (Above Water) --- */}
      <div className="relative h-[45%] bg-gradient-to-b from-[#090909] to-[#0f0f0f] p-8 flex flex-col items-center justify-center z-10">
         
         {/* Minimalist UI Card */}
         <div className="w-full max-w-xs bg-[#050505] border border-white/10 rounded-xl shadow-2xl p-6 relative">
            {/* Decorative Elements representing "Clean UI" */}
            <div className="flex justify-between items-center mb-6">
               <div className="w-8 h-8 rounded-full bg-white/10"></div>
               <div className="w-16 h-2 rounded-full bg-white/5"></div>
            </div>
            <div className="space-y-3 mb-6">
               <div className="w-full h-20 rounded-lg bg-gradient-to-br from-white/5 to-transparent border border-white/5"></div>
               <div className="w-3/4 h-2 rounded bg-white/10"></div>
               <div className="w-1/2 h-2 rounded bg-white/10"></div>
            </div>
            <Button variant="primary" size="sm" withArrow={false} className="w-full">
               Action
            </Button>

            {/* Label */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex items-center gap-2">
               <div className="w-8 h-[1px] bg-white/20"></div>
               <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 writing-mode-vertical">The Experience</span>
            </div>
         </div>

         {/* Waterline */}
         <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#17f7f7]/30 shadow-[0_0_10px_rgba(23,247,247,0.5)]"></div>
      </div>

      {/* --- BOTTOM: The Architecture (Below Water) --- */}
      <div className="relative h-[55%] bg-[#050505] overflow-hidden">
         {/* Grid Texture */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#17f7f705_1px,transparent_1px),linear-gradient(to_bottom,#17f7f705_1px,transparent_1px)] bg-[size:20px_20px]"></div>
         
         {/* Technical Schematic */}
         <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="grid grid-cols-3 gap-4 w-full max-w-md opacity-60">
               {/* Node 1 */}
               <div className="border border-[#17f7f7]/20 bg-[#17f7f7]/5 p-3 rounded flex flex-col gap-2">
                  <div className="w-full h-1 bg-[#17f7f7]/30"></div>
                  <div className="w-2/3 h-1 bg-[#17f7f7]/30"></div>
                  <span className="text-[8px] font-mono text-[#17f7f7] mt-1">API_GATEWAY</span>
               </div>
               
               {/* Node 2 */}
               <div className="border border-[#17f7f7]/20 bg-[#17f7f7]/5 p-3 rounded flex flex-col gap-2 relative">
                  <div className="absolute -top-4 left-1/2 w-[1px] h-4 bg-[#17f7f7]/20"></div>
                   <div className="w-full h-1 bg-[#17f7f7]/30"></div>
                  <div className="w-full h-1 bg-[#17f7f7]/30"></div>
                  <span className="text-[8px] font-mono text-[#17f7f7] mt-1">AUTH_WORKER</span>
               </div>

               {/* Node 3 */}
               <div className="border border-[#17f7f7]/20 bg-[#17f7f7]/5 p-3 rounded flex flex-col gap-2">
                  <div className="w-full h-1 bg-[#17f7f7]/30"></div>
                   <span className="text-[8px] font-mono text-[#17f7f7] mt-1">DB_SHARD_01</span>
               </div>
               
               {/* Connections */}
               <div className="col-span-3 h-[1px] bg-[#17f7f7]/20 my-2 relative">
                  <div className="absolute left-1/4 top-[-2px] w-1 h-1 bg-[#17f7f7] rounded-full"></div>
                  <div className="absolute left-3/4 top-[-2px] w-1 h-1 bg-[#17f7f7] rounded-full"></div>
               </div>
               
               {/* Core */}
               <div className="col-span-3 border border-white/10 bg-white/5 p-4 rounded flex items-center justify-center">
                   <span className="text-xs font-mono text-white tracking-widest">INFRASTRUCTURE_LAYER</span>
               </div>
            </div>
         </div>

         {/* "We Handle This" Label */}
         <div className="absolute bottom-8 right-8 bg-[#17f7f7]/10 border border-[#17f7f7]/30 px-3 py-1 rounded-full">
            <span className="text-[10px] font-mono text-[#17f7f7] uppercase tracking-wider flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-[#17f7f7] animate-pulse"></span>
               We Handle This
            </span>
         </div>
      </div>
    </div>
  );
}
