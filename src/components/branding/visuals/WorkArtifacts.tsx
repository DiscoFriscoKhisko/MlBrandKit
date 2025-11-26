import React, { useEffect, useRef } from "react";
import { GitCommit, MessageSquare, PenTool, CheckCircle, Clock, FileCode } from "lucide-react";
import gsap from "gsap";

// --- Shared Styles ---
const CARD_BASE = "bg-[#090909] border border-white/10 rounded-2xl p-6 relative overflow-hidden font-sans select-none";

// --- 1. Slack / Communication Artifact ---
export function SlackArtifact() {
  return (
    <div className={`${CARD_BASE} w-full max-w-sm`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 opacity-50">
        <div className="w-3 h-3 rounded-full bg-[#17f7f7]" />
        <span className="text-xs font-mono uppercase tracking-wider text-white"># product-ship</span>
      </div>

      {/* Message 1 */}
      <div className="flex gap-3 mb-4">
        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
          ML
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xs font-bold text-white">Material Lab</span>
            <span className="text-[10px] text-white/30">10:42 AM</span>
          </div>
          <p className="text-xs text-[#d5dada] leading-relaxed">
            Deployment is live on production. We've also patched that edge case in the auth flow.
          </p>
        </div>
      </div>

      {/* Message 2 (Client) */}
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded bg-[#17f7f7]/20 flex items-center justify-center text-[10px] text-[#17f7f7] font-bold shrink-0">
          YOU
        </div>
        <div>
           <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xs font-bold text-white">Product Lead</span>
            <span className="text-[10px] text-white/30">10:45 AM</span>
          </div>
          <p className="text-xs text-[#d5dada] leading-relaxed bg-white/5 p-2 rounded-lg rounded-tl-none">
            Incredible speed. Checking the analytics now... looks stable. 
            <span className="block mt-2 flex gap-1 items-center text-[#17f7f7]">
               <CheckCircle size={12} /> Metrics verified.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// --- 2. GitHub / Code Artifact ---
export function GithubArtifact() {
  const commits = [
    { sha: "8f9a2b", msg: "feat: integrate payment gateways", type: "feat", time: "2h ago" },
    { sha: "3c1d4e", msg: "chore: housekeeping & deps update", type: "chore", time: "4h ago" },
    { sha: "7b8a9c", msg: "fix: resolved layout shift on mobile", type: "fix", time: "1d ago" },
  ];

  return (
    <div className={`${CARD_BASE} w-full max-w-sm group`}>
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 text-white/60">
          <GitCommit size={14} />
          <span className="text-xs font-mono">main</span>
        </div>
        <div className="flex gap-1">
           <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
           <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
           <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
        </div>
      </div>

      <div className="space-y-3">
        {commits.map((commit, i) => (
          <div key={i} className="flex items-center justify-between gap-4 font-mono text-[10px] hover:bg-white/5 p-1 rounded transition-colors cursor-default">
             <div className="flex items-center gap-3">
                <span className="text-[#17f7f7] opacity-70">{commit.sha}</span>
                <span className="text-[#d5dada] truncate max-w-[180px]">
                   <span className={`
                      inline-block px-1 rounded mr-2 font-bold
                      ${commit.type === 'feat' ? 'text-green-400 bg-green-400/10' : ''}
                      ${commit.type === 'fix' ? 'text-red-400 bg-red-400/10' : ''}
                      ${commit.type === 'chore' ? 'text-blue-400 bg-blue-400/10' : ''}
                   `}>
                      {commit.type}
                   </span>
                   {commit.msg.replace(/^(feat|chore|fix): /, '')}
                </span>
             </div>
             <span className="text-white/20">{commit.time}</span>
          </div>
        ))}
      </div>
      
      {/* Activity Graph Mockup */}
      <div className="mt-4 pt-2 border-t border-white/5 flex gap-[2px] justify-end opacity-50">
         {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-[1px] ${Math.random() > 0.5 ? 'bg-[#17f7f7]/[0.1]' : Math.random() > 0.8 ? 'bg-[#17f7f7]/[0.6]' : 'bg-white/5'}`} 
            />
         ))}
      </div>
    </div>
  );
}

// --- 3. Figma / Design Artifact ---
export function FigmaArtifact() {
  const cursorRef = useRef(null);
  
  useEffect(() => {
     const ctx = gsap.context(() => {
        gsap.to(".cursor-mock", {
           x: "100",
           y: "50",
           duration: 2,
           repeat: -1,
           yoyo: true,
           ease: "power2.inOut"
        });
     }, cursorRef);
     return () => ctx.revert();
  }, []);

  return (
    <div ref={cursorRef} className={`${CARD_BASE} w-full max-w-sm min-h-[180px] flex items-center justify-center bg-grid-white/[0.02]`}>
       {/* Interface Mockup */}
       <div className="relative w-48 h-32 bg-[#050505] border border-white/20 rounded-lg shadow-2xl flex flex-col overflow-hidden">
          <div className="h-4 border-b border-white/10 bg-white/5 flex items-center px-2 gap-1">
             <div className="w-1 h-1 rounded-full bg-white/20"></div>
             <div className="w-1 h-1 rounded-full bg-white/20"></div>
          </div>
          <div className="flex-1 p-3 flex flex-col gap-2">
             <div className="w-3/4 h-2 bg-white/10 rounded"></div>
             <div className="w-1/2 h-2 bg-white/10 rounded"></div>
             <div className="mt-auto w-full h-8 bg-[#17f7f7] rounded flex items-center justify-center text-[8px] font-bold text-black uppercase tracking-wider">
                Launch
             </div>
          </div>
       </div>

       {/* Collaborator Cursor */}
       <div className="cursor-mock absolute top-10 left-10 z-20 pointer-events-none">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="drop-shadow-lg">
             <path d="M0 0L6.5 17L9.5 10L17 9L0 0Z" fill="#E052A0" stroke="white" strokeWidth="1"/>
          </svg>
          <div className="ml-3 mt-1 bg-[#E052A0] text-white text-[8px] px-1 py-0.5 rounded font-bold whitespace-nowrap">
             Design Team
          </div>
       </div>
    </div>
  );
}
