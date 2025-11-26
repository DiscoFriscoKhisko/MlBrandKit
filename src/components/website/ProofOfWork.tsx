import { CheckCircle2, GitCommit, GitPullRequest, MessageSquare, Hash, Users, MousePointer2 } from "lucide-react";

export function SlackNotification() {
  return (
    <div className="w-full max-w-sm bg-[#1a1d21] border border-white/10 rounded-xl overflow-hidden shadow-2xl font-sans">
      <div className="h-8 bg-[#090909] border-b border-white/5 flex items-center px-3 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ed6a5e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f5bf4f]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#61c554]" />
        </div>
        <span className="ml-auto text-[10px] text-white/30 font-mono">#deployment-logs</span>
      </div>
      <div className="p-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-[#17f7f7] to-blue-600 flex items-center justify-center shrink-0">
            <BotIcon className="text-black w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-white">Deploy Bot</span>
              <span className="text-[10px] text-white/40">APP 2:14 PM</span>
            </div>
            <p className="text-sm text-[#d5dada]">
              <span className="text-[#17f7f7]">@channel</span> Production deployment successful. <br/>
              v2.4.0 is live. All systems operational.
            </p>
            <div className="pt-2 flex gap-1">
              <div className="px-2 py-1 rounded bg-white/5 border border-white/5 flex items-center gap-1">
                <span className="text-xs">🚀</span>
                <span className="text-[10px] text-white/50">3</span>
              </div>
              <div className="px-2 py-1 rounded bg-white/5 border border-white/5 flex items-center gap-1">
                <span className="text-xs">🔥</span>
                <span className="text-[10px] text-white/50">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  )
}

export function GithubCommit() {
  return (
    <div className="w-full max-w-sm bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
       <div className="p-4 space-y-4">
         <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2 text-white/60">
              <GitPullRequest size={14} className="text-[#17f7f7]" />
              <span>Pull Request #429</span>
            </div>
            <span className="text-[#17f7f7] bg-[#17f7f7]/10 px-2 py-0.5 rounded-full text-[10px]">Merged</span>
         </div>
         
         <div className="space-y-3">
            <div className="flex gap-3 items-start opacity-60 hover:opacity-100 transition-opacity">
               <GitCommit size={14} className="mt-0.5 text-white/40" />
               <div>
                  <div className="text-white">refactor: optimize core loop</div>
                  <div className="text-white/30 text-[10px]">7m ago • main</div>
               </div>
            </div>
            <div className="flex gap-3 items-start opacity-60 hover:opacity-100 transition-opacity">
               <GitCommit size={14} className="mt-0.5 text-white/40" />
               <div>
                  <div className="text-white">chore: housekeeping & linting</div>
                  <div className="text-white/30 text-[10px]">2h ago • main</div>
               </div>
            </div>
            <div className="flex gap-3 items-start opacity-100">
               <CheckCircle2 size={14} className="mt-0.5 text-[#3fb950]" />
               <div>
                  <div className="text-white">feat: user perception layer</div>
                  <div className="text-white/30 text-[10px]">4h ago • feature/perception</div>
               </div>
            </div>
         </div>
       </div>
    </div>
  )
}

export function FigmaCanvas() {
  return (
    <div className="w-full max-w-sm aspect-video bg-[#1e1e1e] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative group cursor-none">
       {/* Grid Background */}
       <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(#555 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
       }}></div>

       {/* UI Elements Mockup */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-20 bg-white rounded shadow-lg flex flex-col p-2 gap-2">
          <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
          <div className="w-full h-8 bg-blue-500 rounded opacity-20"></div>
       </div>

       {/* Cursors */}
       <div className="absolute top-1/4 left-1/4 flex flex-col items-start">
          <MousePointer2 className="text-[#ff00ff] fill-[#ff00ff] w-4 h-4 rotate-[-15deg]" />
          <span className="bg-[#ff00ff] text-white text-[9px] px-1.5 py-0.5 rounded-br-md rounded-bl-md rounded-tr-md">You</span>
       </div>

       <div className="absolute bottom-1/3 right-1/3 flex flex-col items-start animate-pulse">
          <MousePointer2 className="text-[#17f7f7] fill-[#17f7f7] w-4 h-4 rotate-[-15deg]" />
          <span className="bg-[#17f7f7] text-black text-[9px] px-1.5 py-0.5 rounded-br-md rounded-bl-md rounded-tr-md font-bold">Material Lab</span>
       </div>
    </div>
  )
}
