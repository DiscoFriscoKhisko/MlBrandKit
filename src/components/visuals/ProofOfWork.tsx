import React from 'react';
import { Check, GitCommit, MessageSquare, ArrowUpRight, MousePointer2 } from 'lucide-react';

export function SlackNotification({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 w-full max-w-xs shadow-2xl font-sans ${className}`}>
      <div className="flex items-center justify-between mb-3">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
         </div>
         <span className="text-[10px] text-white/40 font-mono">#deployments</span>
      </div>
      
      <div className="flex gap-3">
         <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#17f7f7] to-blue-600 flex items-center justify-center shrink-0">
            <span className="text-black font-bold text-xs">ML</span>
         </div>
         <div className="space-y-1">
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold text-white">Material Lab Bot</span>
               <span className="text-[10px] text-white/30">APP 1:42 PM</span>
            </div>
            <p className="text-xs text-[#d5dada] leading-relaxed">
               <span className="text-[#17f7f7]">@channel</span> Deployment to production successful. 
               <br/>
               <span className="opacity-60">Performance score: 98/100.</span>
            </p>
            <div className="flex gap-1 mt-2">
               <div className="bg-white/5 px-2 py-1 rounded text-[10px] text-[#17f7f7] border border-[#17f7f7]/20">View Release</div>
            </div>
         </div>
      </div>
    </div>
  );
}

export function FigmaCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#0F0F0F] border border-white/10 rounded-xl overflow-hidden w-full h-full relative ${className}`}>
       {/* Grid Background */}
       <div className="absolute inset-0 opacity-20 pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
       </div>

       {/* Abstract UI Mockup */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#1A1A1A] border border-white/5 rounded-lg shadow-2xl p-4 space-y-3">
          <div className="h-2 w-1/3 bg-white/10 rounded"></div>
          <div className="flex gap-2">
             <div className="h-20 w-1/2 bg-white/5 rounded border border-white/5"></div>
             <div className="h-20 w-1/2 bg-white/5 rounded border border-white/5"></div>
          </div>
          <div className="h-2 w-full bg-white/10 rounded"></div>
          <div className="h-2 w-2/3 bg-white/10 rounded"></div>
          
          {/* Cursors */}
          <div className="absolute -right-4 top-1/4 flex flex-col items-start animate-pulse">
             <MousePointer2 className="text-[#17f7f7] fill-[#17f7f7] w-4 h-4 transform rotate-[-15deg]" />
             <div className="bg-[#17f7f7] px-1 py-0.5 rounded text-[8px] font-bold text-black mt-1">Design Team</div>
          </div>
          
          <div className="absolute -left-2 bottom-1/4 flex flex-col items-start delay-700 animate-pulse">
             <MousePointer2 className="text-[#ff00ff] fill-[#ff00ff] w-4 h-4 transform rotate-[-15deg]" />
             <div className="bg-[#ff00ff] px-1 py-0.5 rounded text-[8px] font-bold text-black mt-1">You</div>
          </div>
       </div>
    </div>
  );
}

export function GithubCommits({ className = "" }: { className?: string }) {
  const commits = [
    { msg: "feat: implement rag pipeline", hash: "7a2f19", time: "2h ago" },
    { msg: "chore: housekeeping & deps", hash: "8b3c20", time: "4h ago" },
    { msg: "fix: edge case in auth flow", hash: "9c4d31", time: "1d ago" },
  ];

  return (
    <div className={`bg-[#0D1117] border border-white/10 rounded-xl p-4 w-full font-mono ${className}`}>
       <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
          <span className="text-xs text-white/60">Commits</span>
          <span className="text-[10px] text-white/40">main</span>
       </div>
       <div className="space-y-3 relative">
          {/* Connector Line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10"></div>
          
          {commits.map((commit, i) => (
             <div key={i} className="flex items-start gap-3 relative z-10">
                <div className="mt-1 w-3.5 h-3.5 rounded-full border-2 border-[#0D1117] bg-[#17f7f7]"></div>
                <div className="flex-1">
                   <div className="flex justify-between items-center">
                      <span className="text-xs text-[#d5dada]">{commit.msg}</span>
                      <span className="text-[10px] text-white/30">{commit.time}</span>
                   </div>
                   <div className="flex items-center gap-2 mt-1">
                      <GitCommit size={10} className="text-white/20" />
                      <span className="text-[10px] text-[#17f7f7]/60">{commit.hash}</span>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
