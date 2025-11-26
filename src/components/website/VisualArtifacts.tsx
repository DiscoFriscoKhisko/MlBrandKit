import React from 'react';
import { Check, GitCommit, MessageSquare, Hash, MoreHorizontal, Command, User } from 'lucide-react';

export const SlackMessage = () => {
  return (
    <div className="w-full max-w-sm mx-auto">
       <div className="bg-[#1A1D21] border border-white/10 rounded-xl p-4 shadow-2xl relative overflow-hidden">
          {/* Glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
          
          <div className="flex gap-3 relative z-10">
             <div className="w-10 h-10 rounded-lg bg-[#17f7f7] flex items-center justify-center shrink-0">
                <span className="font-bold text-black text-xs">ML</span>
             </div>
             <div className="space-y-1 flex-1">
                <div className="flex justify-between items-baseline">
                   <span className="font-bold text-white text-sm">Material Lab</span>
                   <span className="text-[10px] text-white/40">10:42 AM</span>
                </div>
                <div className="bg-[#222529] rounded p-2 mb-1 border-l-2 border-[#17f7f7]">
                   <div className="flex items-center gap-2 text-[#17f7f7] text-xs font-mono mb-1">
                      <Check size={10} /> Deployment Successful
                   </div>
                   <p className="text-white/60 text-xs font-mono">
                      Production build v2.4.0 is live.<br/>
                      Performance score: 99/100
                   </p>
                </div>
                <div className="flex gap-2 pt-1">
                    <span className="bg-white/5 px-2 py-0.5 rounded-full text-[10px] text-white/60 border border-white/5">👍 2</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded-full text-[10px] text-white/60 border border-white/5">🚀 1</span>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export const FigmaCanvas = () => {
  return (
    <div className="w-full h-full min-h-[200px] bg-[#1e1e1e] rounded-xl border border-white/10 relative overflow-hidden">
       {/* Grid Pattern */}
       <div className="absolute inset-0 opacity-20" 
            style={{ backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
       </div>

       {/* Interface Mockup */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-[#2c2c2c] rounded-lg border border-white/10 shadow-xl">
          <div className="h-6 border-b border-white/10 flex items-center gap-1 px-2">
             <div className="w-2 h-2 rounded-full bg-red-500/50" />
             <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
             <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <div className="p-3 space-y-2">
             <div className="w-3/4 h-2 bg-white/10 rounded" />
             <div className="w-1/2 h-2 bg-white/10 rounded" />
             <div className="flex gap-2 mt-4">
                <div className="w-8 h-8 rounded bg-[#17f7f7]/20" />
                <div className="w-8 h-8 rounded bg-white/5" />
             </div>
          </div>
       </div>

       {/* Cursor: Client */}
       <div className="absolute top-[30%] left-[25%]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
             <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19179L14.7841 12.3673H5.65376Z" fill="#FF00FF" stroke="white" strokeWidth="1"/>
          </svg>
          <div className="absolute left-3 top-4 bg-[#FF00FF] px-2 py-0.5 text-[9px] font-bold text-white rounded-full whitespace-nowrap">
             Client
          </div>
       </div>

       {/* Cursor: Material Lab */}
       <div className="absolute bottom-[30%] right-[25%]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
             <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19179L14.7841 12.3673H5.65376Z" fill="#17f7f7" stroke="black" strokeWidth="1"/>
          </svg>
          <div className="absolute left-3 top-4 bg-[#17f7f7] px-2 py-0.5 text-[9px] font-bold text-black rounded-full whitespace-nowrap">
             Material Lab
          </div>
       </div>
    </div>
  );
};

export const GitHubCommits = () => {
   const commits = [
      { id: '8a2b1f', msg: 'feat: implement outcome-based analytics', author: 'kn', status: 'deploy' },
      { id: '9c3d2e', msg: 'chore: housekeeping & type safety', author: 'dr', status: 'maintenance' },
      { id: '1e4f5g', msg: 'fix: resolve race condition in auth', author: 'kn', status: 'fix' },
   ];

   return (
      <div className="w-full max-w-sm mx-auto bg-[#0D1117] rounded-xl border border-white/10 p-4 font-mono text-xs shadow-2xl">
         <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
            <div className="flex items-center gap-2 text-white/60">
               <GitCommit size={14} />
               <span>main</span>
            </div>
            <span className="text-[#17f7f7] text-[10px]">Last commit 2m ago</span>
         </div>
         <div className="space-y-3">
            {commits.map((commit) => (
               <div key={commit.id} className="flex items-start gap-3 group">
                  <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                     commit.status === 'deploy' ? 'bg-green-500' : 
                     commit.status === 'maintenance' ? 'bg-blue-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between">
                        <span className="text-white truncate group-hover:text-[#17f7f7] transition-colors cursor-pointer">{commit.msg}</span>
                     </div>
                     <div className="flex gap-2 mt-1 text-white/30 text-[10px]">
                        <span>{commit.id}</span>
                        <span>•</span>
                        <span>{commit.author}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export const IcebergCard = ({ 
  number, 
  title, 
  description, 
  features, 
  uiType = 'dashboard',
  techStack = ['Postgres', 'Redis', 'Next.js', 'Go']
}: { 
  number: string, 
  title: string, 
  description: string, 
  features: { label: string, text: string }[],
  uiType?: 'dashboard' | 'mobile' | 'graph',
  techStack?: string[]
}) => {
  return (
    <div className="w-full h-full flex flex-col rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#090909]">
       {/* Top: The Experience (Visible Value) */}
       <div className="relative h-[55%] bg-[#0C0C0C] p-8 md:p-12 flex flex-col z-20">
          <div className="flex justify-between items-start mb-6">
             <span className="font-mono text-[#17f7f7] text-xs tracking-widest uppercase">The Experience</span>
             <span className="font-mono text-white/20 text-xs tracking-widest">0{number}</span>
          </div>
          
          <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">{title}</h3>
          <p className="text-[#d5dada]/70 text-sm md:text-base max-w-lg">{description}</p>

          {/* Minimalist UI Representation based on type */}
          <div className="mt-auto pt-8 relative">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0C0C0C] to-transparent z-10" />
             <div className="w-full h-32 border border-white/5 rounded-t-xl bg-[#151515] p-4 flex flex-col gap-3 opacity-50 transform translate-y-2">
                <div className="flex gap-4">
                   <div className="w-1/4 h-24 bg-white/5 rounded" />
                   <div className="flex-1 space-y-3">
                      <div className="w-full h-4 bg-white/5 rounded" />
                      <div className="w-2/3 h-4 bg-white/5 rounded" />
                      <div className="flex gap-2 mt-2">
                         <div className="w-8 h-8 rounded-full bg-[#17f7f7]/10" />
                         <div className="w-8 h-8 rounded-full bg-white/5" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* The Waterline */}
       <div className="h-0.5 w-full bg-[#17f7f7]/20 relative z-30">
          <div className="absolute right-8 -top-3 bg-[#050505] border border-[#17f7f7]/30 px-3 py-1 rounded-full text-[9px] text-[#17f7f7] font-mono uppercase tracking-wider">
             We Handle This
          </div>
       </div>

       {/* Bottom: The Architecture (Hidden Complexity) */}
       <div className="relative h-[45%] bg-[#050505] p-8 md:p-12 flex flex-col z-10 overflow-hidden">
          {/* Tech Texture Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 font-mono text-[10px] text-white transform -rotate-12">API Gateway</div>
             <div className="absolute top-20 right-20 font-mono text-[10px] text-white transform rotate-6">CRON Jobs</div>
             <div className="absolute bottom-10 left-1/3 font-mono text-[10px] text-white">Websockets</div>
             <svg className="w-full h-full" width="100%" height="100%">
                <defs>
                   <pattern id={`grid-${number}`} width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                   </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${number})`} />
             </svg>
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 h-full">
             <div>
                <span className="font-mono text-white/30 text-xs tracking-widest uppercase mb-4 block">Architecture</span>
                <ul className="space-y-3">
                   {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#d5dada]/60">
                         <span className="text-[#17f7f7] mt-0.5">↳</span>
                         <span className="font-mono">{f.label}: <span className="text-[#d5dada]/40 font-sans">{f.text}</span></span>
                      </li>
                   ))}
                </ul>
             </div>
             <div className="hidden md:flex flex-col justify-end items-end">
                <span className="font-mono text-white/30 text-xs tracking-widest uppercase mb-2 block">Stack</span>
                <div className="flex flex-wrap justify-end gap-2">
                   {techStack.map((tech, i) => (
                      <span key={i} className="px-2 py-1 border border-white/10 rounded bg-white/5 text-[10px] text-white/50 font-mono">
                         {tech}
                      </span>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
