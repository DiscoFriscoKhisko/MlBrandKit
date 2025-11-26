import React from 'react';
import { Check, GitCommit, MessageSquare, Figma, GitPullRequest, Clock } from 'lucide-react';

// --- Slack Notification Component ---
export function SlackNotification({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#1a1d21] border border-white/10 rounded-xl p-4 max-w-[320px] shadow-2xl font-sans ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-md bg-[#17f7f7] flex items-center justify-center shrink-0">
           <span className="font-bold text-black text-xs">ML</span>
        </div>
        <div className="space-y-1 min-w-0 flex-1">
           <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Material Lab</span>
              <span className="text-[10px] text-white/40">Just now</span>
           </div>
           <p className="text-white/80 text-xs leading-relaxed">
             🚀 <span className="font-semibold text-[#17f7f7]">Deployment Successful</span><br/>
             Production is live. The new user flows are scaling perfectly. Monitoring the logs now.
           </p>
           <div className="pt-2 flex gap-2">
              <div className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-white/60 flex items-center gap-1">
                 <Check size={10} className="text-green-400" /> All systems go
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// --- GitHub Commit History Component ---
export function GithubCommits({ className = "" }: { className?: string }) {
  const commits = [
    { msg: "feat: implement user auth flow", time: "2h ago", hash: "8f2d1a", status: "success" },
    { msg: "refactor: optimize db queries", time: "4h ago", hash: "3b4c5d", status: "success" },
    { msg: "chore: housekeeping & cleanup", time: "5h ago", hash: "9e8f7a", status: "neutral" },
  ];

  return (
    <div className={`bg-[#0d1117] border border-white/10 rounded-xl p-0 overflow-hidden max-w-[320px] shadow-2xl font-mono ${className}`}>
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-[#161b22]">
         <div className="flex items-center gap-2 text-xs text-white/70">
            <GitPullRequest size={12} />
            <span>main</span>
         </div>
         <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
         </div>
      </div>
      <div className="divide-y divide-white/5">
         {commits.map((commit, i) => (
            <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-white/[0.02] transition-colors group">
               <GitCommit size={14} className="text-white/30 group-hover:text-[#17f7f7] transition-colors shrink-0" />
               <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-xs truncate group-hover:text-white transition-colors">{commit.msg}</p>
                  <p className="text-white/30 text-[10px]">{commit.time}</p>
               </div>
               <span className="text-[#17f7f7] text-[10px] opacity-50">{commit.hash}</span>
            </div>
         ))}
      </div>
    </div>
  );
}

// --- Figma Canvas Component ---
export function FigmaCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#1e1e1e] border border-white/10 rounded-xl w-full h-[200px] max-w-[320px] shadow-2xl relative overflow-hidden ${className}`}>
       {/* Grid Background */}
       <div className="absolute inset-0 opacity-20" 
            style={{ backgroundImage: 'radial-gradient(#555 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
       </div>

       {/* UI Element Mockup */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-20 bg-white rounded-lg shadow-lg flex flex-col p-2 gap-2 transform -rotate-3">
          <div className="w-2/3 h-2 bg-gray-200 rounded-full"></div>
          <div className="w-full h-1 bg-gray-100 rounded-full"></div>
          <div className="w-full h-1 bg-gray-100 rounded-full"></div>
          <div className="mt-auto w-1/3 h-4 bg-blue-500 rounded-md"></div>
       </div>

       {/* Cursor 1 (You) */}
       <div className="absolute top-[40%] left-[60%] flex flex-col z-10">
          <svg width="18" height="24" viewBox="0 0 18 24" fill="none" className="drop-shadow-md">
             <path d="M0 0L8.5 23L11.5 13.5L17.5 13.5L0 0Z" fill="#17f7f7"/>
             <path d="M0 0L8.5 23L11.5 13.5L17.5 13.5L0 0Z" stroke="black" strokeOpacity="0.2"/>
          </svg>
          <div className="ml-3 px-2 py-0.5 bg-[#17f7f7] text-black text-[9px] font-bold rounded-full whitespace-nowrap">
             Design Partner
          </div>
       </div>
       
       {/* Cursor 2 (Client) */}
       <div className="absolute bottom-[30%] left-[20%] flex flex-col z-10 opacity-60">
          <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
             <path d="M0 0L8.5 23L11.5 13.5L17.5 13.5L0 0Z" fill="#ff00ff"/>
          </svg>
          <div className="ml-3 px-2 py-0.5 bg-[#ff00ff] text-white text-[9px] font-bold rounded-full whitespace-nowrap">
             You
          </div>
       </div>
    </div>
  );
}
