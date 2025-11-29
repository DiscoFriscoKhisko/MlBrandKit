import React from 'react';
import { SlackNotification, FigmaCanvas, GithubCommits } from './visuals/ProofOfWork';
import { Button } from './ui/button';

export function SystemV2() {
  return (
    <div className="space-y-32 pb-32">
      
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-20 gap-10 border-b border-white/10 pb-12">
        <div className="lg:col-span-8">
          <h2 className="font-serif text-4xl text-white mb-4">Design System V2.0</h2>
          <p className="font-sans text-xl text-[#d5dada]/70 font-light">
            A strict, high-density design language built for agency-grade precision. 
            Featuring a 20-column grid, massive typographic scale, and cinematic motion.
          </p>
        </div>
        <div className="lg:col-span-12 flex items-end justify-end">
           <div className="text-right">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#17f7f7] mb-1">Version</div>
              <div className="font-sans text-2xl text-white">2.0.0-Spectral</div>
           </div>
        </div>
      </div>

      {/* 0. Core Positioning */}
      <section className="space-y-10">
        <div className="flex items-end justify-between">
          <h3 className="font-serif text-3xl text-white">00. Core Positioning</h3>
          <span className="font-mono text-[#17f7f7] text-sm">Messaging Strategy</span>
        </div>

        <div className="bg-[#090909] border border-white/10 rounded-3xl p-8 md:p-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                 <h4 className="text-[#17f7f7] font-mono text-xs uppercase tracking-widest mb-6">The Pivot</h4>
                 <p className="text-xl text-white font-light leading-relaxed mb-6">
                    We are not selling "hours of coding"; we are selling <span className="text-white font-normal">"market readiness"</span> and <span className="text-white font-normal">"product maturity."</span>
                 </p>
                 <div className="flex items-center gap-4 text-sm text-[#d5dada]/60">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Linear's Precision</span>
                    <span>+</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Basecamp's Warmth</span>
                 </div>
              </div>
              
              <div className="space-y-8 border-l border-white/10 pl-8">
                 <div>
                    <span className="text-white/30 font-mono text-[10px] uppercase tracking-widest block mb-2">Primary Tagline</span>
                    <h5 className="text-2xl font-serif text-white">Your Extended Product Team.</h5>
                 </div>
                 <div>
                    <span className="text-white/30 font-mono text-[10px] uppercase tracking-widest block mb-2">Secondary Tagline</span>
                    <h5 className="text-xl font-serif text-[#d5dada]">Build for impact, not just for launch.</h5>
                 </div>
                 <div>
                    <span className="text-white/30 font-mono text-[10px] uppercase tracking-widest block mb-2">Internal Motto</span>
                    <h5 className="text-xl font-serif text-[#17f7f7] italic">Outcomes over Output.</h5>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 1. Global Grid */}
      <section className="space-y-10">
        <div className="flex items-end justify-between">
          <h3 className="font-serif text-3xl text-white">01. Global Grid</h3>
          <span className="font-mono text-[#17f7f7] text-sm">grid-cols-20</span>
        </div>
        
        <div className="bg-[#090909] border border-white/10 rounded-3xl p-7 md:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-20 gap-4 h-64 opacity-50">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="bg-[#17f7f7]/10 border border-[#17f7f7]/20 h-full flex items-end justify-center pb-2 text-[9px] font-mono text-[#17f7f7]">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="grid grid-cols-1 lg:grid-cols-20 gap-10 w-full px-7 md:px-12">
                <div className="hidden lg:block lg:col-span-8 bg-[#17f7f7]/20 h-32 border border-[#17f7f7] flex items-center justify-center text-[#17f7f7] font-mono uppercase tracking-widest">
                  Text Content (8 Cols)
                </div>
                <div className="hidden lg:block lg:col-span-12 bg-[#17f7f7]/20 h-32 border border-[#17f7f7] flex items-center justify-center text-[#17f7f7] font-mono uppercase tracking-widest">
                  Media Content (12 Cols)
                </div>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="space-y-2">
              <h4 className="text-white font-medium">High Density</h4>
              <p className="text-sm text-[#d5dada]/60">
                We use <code>grid-cols-20</code> to allow for fine-tuned layouts that break away from the standard 12-column bootstrap look.
              </p>
           </div>
           <div className="space-y-2">
              <h4 className="text-white font-medium">Asymmetry</h4>
              <p className="text-sm text-[#d5dada]/60">
                Common ratios include 8/12, 9/11, and 6/14. Avoid perfect 50/50 splits to create visual tension.
              </p>
           </div>
           <div className="space-y-2">
              <h4 className="text-white font-medium">Collapse</h4>
              <p className="text-sm text-[#d5dada]/60">
                On mobile, everything collapses to a single column. The 20-column grid is strictly for <code>lg:</code> breakpoints.
              </p>
           </div>
        </div>
      </section>

      {/* 2. Spacing & Geometry */}
      <section className="space-y-10">
         <div className="flex items-end justify-between">
          <h3 className="font-serif text-3xl text-white">02. Spacing & Geometry</h3>
          <span className="font-mono text-[#17f7f7] text-sm">px-14 / rounded-3xl</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
           {/* Spacing Card */}
           <div className="bg-[#090909] border border-white/10 rounded-3xl p-14 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-14 h-full bg-[#17f7f7]/10 border-r border-[#17f7f7]/30 flex items-center justify-center text-[9px] font-mono text-[#17f7f7] uppercase -rotate-90">
                 px-14 (56px)
              </div>
               <div className="absolute top-0 right-0 w-14 h-full bg-[#17f7f7]/10 border-l border-[#17f7f7]/30 flex items-center justify-center text-[9px] font-mono text-[#17f7f7] uppercase rotate-90">
                 px-14 (56px)
              </div>
              <div className="flex flex-col gap-6 text-center items-center justify-center h-full relative z-10">
                 <div className="w-full h-12 bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-xs text-white/50 font-mono">
                    gap-y-10
                 </div>
                 <div className="w-full h-12 bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-xs text-white/50 font-mono">
                    gap-y-10
                 </div>
              </div>
           </div>

           {/* Geometry Card */}
           <div className="bg-[#090909] border border-white/10 rounded-3xl p-12 flex items-center justify-center relative">
              <div className="w-32 h-32 border-2 border-[#17f7f7] rounded-3xl flex items-center justify-center relative">
                 <div className="absolute -top-3 -right-3 text-[#17f7f7] text-xs font-mono bg-[#090909] px-1">3xl</div>
              </div>
               <div className="absolute bottom-8 left-0 w-full text-center">
                 <p className="text-sm text-[#d5dada]/60 mt-4">
                   Soft, pill-like radii. <br/>
                   <code>rounded-3xl</code> for cards.<br/>
                   <code>rounded-[2.5rem]</code> for sections.
                 </p>
               </div>
           </div>
        </div>
      </section>

       {/* 3. Viewport Typography */}
      <section className="space-y-10">
        <div className="flex items-end justify-between">
          <h3 className="font-serif text-3xl text-white">03. Viewport Typography</h3>
          <span className="font-mono text-[#17f7f7] text-sm">text-[16vw]</span>
        </div>

        <div className="bg-[#090909] border border-white/10 rounded-3xl overflow-hidden py-24 flex items-center justify-center relative">
           <h1 className="font-serif text-[12vw] font-bold tracking-[-0.04em] leading-[0.85] text-white text-center whitespace-nowrap mix-blend-difference">
             Scale
           </h1>
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[90%] border-t border-b border-[#17f7f7]/30 h-[12vw] absolute"></div>
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[#17f7f7] font-mono text-xs">12vw</span>
           </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-sm text-[#d5dada]/60">
           <div className="p-4 border border-white/5 rounded-xl">
              <strong className="text-white block mb-2 font-mono">Display</strong>
              <code>text-[12vw]</code> to <code>text-[16vw]</code>.<br/>
              Used for Hero and Footer statements.
           </div>
           <div className="p-4 border border-white/5 rounded-xl">
              <strong className="text-white block mb-2 font-mono">Heading 1</strong>
              <code>text-4xl</code> to <code>text-6xl</code>.<br/>
              Standard section headers.
           </div>
           <div className="p-4 border border-white/5 rounded-xl">
              <strong className="text-white block mb-2 font-mono">Body Large</strong>
              <code>text-lg</code> to <code>text-2xl</code>.<br/>
              Lead paragraphs and intro text.
           </div>
        </div>
      </section>

       {/* 4. Cursor Interaction */}
      <section className="space-y-10">
        <div className="flex items-end justify-between">
          <h3 className="font-serif text-3xl text-white">04. Cursor Interaction</h3>
          <span className="font-mono text-[#17f7f7] text-sm">Magnetic & Morphing</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
           <div className="bg-[#090909] border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center gap-8 h-80 interactive group cursor-none relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                 <div className="w-8 h-8 rounded-full border border-white"></div>
              </div>
              <Button variant="primary" withArrow={false}>
                Hover Me
              </Button>
              <p className="text-sm text-[#d5dada]/50">
                 Cursor expands to <code>scale-3</code> and blends with content.
              </p>
           </div>

           <div className="space-y-6">
              <div className="flex items-start gap-4">
                 <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center shrink-0 mt-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                 </div>
                 <div>
                    <h4 className="text-white font-medium mb-1">Default State</h4>
                    <p className="text-sm text-[#d5dada]/60">
                       A hollow 32px circle with a solid central dot. 
                       Moves with <code>power2.out</code> easing.
                    </p>
                 </div>
              </div>
              
              <div className="flex items-start gap-4">
                 <div className="w-8 h-8 rounded-full bg-white mix-blend-difference flex items-center justify-center shrink-0 mt-1 scale-150">
                 </div>
                 <div>
                    <h4 className="text-white font-medium mb-1">Interactive State</h4>
                    <p className="text-sm text-[#d5dada]/60">
                       Triggers on <code>&lt;a&gt;</code>, <code>&lt;button&gt;</code>, and <code>.interactive</code> class.
                       Circle scales up 3x, fills with white, and applies <code>mix-blend-difference</code>. 
                       Central dot disappears.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

       {/* 5. Visual Strategy: Proof of Work */}
       <section className="space-y-10">
        <div className="flex items-end justify-between">
          <h3 className="font-serif text-3xl text-white">05. Visual Strategy</h3>
          <span className="font-mono text-[#17f7f7] text-sm">Proof of Work</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Artifact: Slack */}
           <div className="space-y-4">
              <div className="bg-[#090909] border border-white/10 rounded-2xl p-6 h-64 flex items-center justify-center relative overflow-hidden">
                 <SlackNotification className="scale-90" />
              </div>
              <div>
                 <h4 className="text-white font-medium mb-1">Slack Notification</h4>
                 <p className="text-sm text-[#d5dada]/60">
                    Glass-morphism artifact demonstrating real-time deployment and communication.
                 </p>
              </div>
           </div>

           {/* Artifact: Figma */}
           <div className="space-y-4">
              <div className="bg-[#090909] border border-white/10 rounded-2xl p-6 h-64 flex items-center justify-center relative overflow-hidden">
                 <div className="w-full h-full">
                    <FigmaCanvas />
                 </div>
              </div>
              <div>
                 <h4 className="text-white font-medium mb-1">Figma Canvas</h4>
                 <p className="text-sm text-[#d5dada]/60">
                    Simulates collaborative cursors (Client + ML) working on a shared surface.
                 </p>
              </div>
           </div>

           {/* Artifact: GitHub */}
           <div className="space-y-4">
              <div className="bg-[#090909] border border-white/10 rounded-2xl p-6 h-64 flex items-center justify-center relative overflow-hidden">
                 <div className="w-full">
                    <GithubCommits />
                 </div>
              </div>
              <div>
                 <h4 className="text-white font-medium mb-1">GitHub Activity</h4>
                 <p className="text-sm text-[#d5dada]/60">
                    Stylized commit history showing "Housekeeping" and "Features" to imply care.
                 </p>
              </div>
           </div>
        </div>
        
        <div className="border-t border-white/10 pt-10 mt-10">
            <h4 className="text-white font-medium mb-6">The Iceberg Model</h4>
            <div className="bg-[#090909] border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center">
               <div className="w-full md:w-1/2 aspect-video bg-gradient-to-b from-[#1A1A1A] to-[#050505] border border-white/5 rounded-xl relative overflow-hidden flex flex-col">
                  <div className="flex-1 p-4 flex items-center justify-center border-b border-[#17f7f7]/30 relative">
                     <span className="text-xs text-white/50">User Experience (Visible)</span>
                     <div className="absolute bottom-[-6px] right-4 bg-[#090909] px-2 text-[8px] text-[#17f7f7] border border-[#17f7f7]/30 rounded-full">WE HANDLE THIS</div>
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')]">
                     <span className="text-xs text-white/30 font-mono">Technical Architecture (Hidden)</span>
                  </div>
               </div>
               <div className="flex-1">
                  <p className="text-sm text-[#d5dada]/70 leading-relaxed">
                     We use the <strong>Iceberg Visual</strong> to separate the "Outcome" (Top) from the "Execution" (Bottom). 
                     This reinforces that while the user sees simplicity, we handle the complex engineering underneath.
                  </p>
               </div>
            </div>
        </div>
      </section>

      {/* 6. Component Tokens */}
      <section className="space-y-10">
         <div className="flex items-end justify-between">
          <h3 className="font-serif text-3xl text-white">06. Component Tokens</h3>
          <span className="font-mono text-[#17f7f7] text-sm">Cards / Images / Buttons</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Card Token */}
           <div className="space-y-4">
              <div className="bg-[#090909] border border-white/10 rounded-3xl p-12 flex items-center justify-center h-64">
                 <div className="w-32 h-40 bg-[#1A1A1A] border border-white/20 rounded-2xl"></div>
              </div>
              <div>
                 <h4 className="text-white font-medium mb-2">Card System</h4>
                 <ul className="text-sm text-[#d5dada]/60 list-disc pl-4 space-y-1">
                    <li><code>rounded-2xl</code> (Small) or <code>rounded-3xl</code> (Large)</li>
                    <li><code>p-7</code> (Mobile) or <code>p-12</code> (Desktop)</li>
                    <li>Flex layout, centered text usually</li>
                    <li>Minimal internal motion (no micro-bounces)</li>
                 </ul>
              </div>
           </div>

           {/* Image Container */}
           <div className="space-y-4">
              <div className="bg-[#090909] border border-white/10 rounded-3xl overflow-hidden h-64 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                     {/* Simulated Halo */}
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-40 blur-xl scale-110 transition-all duration-500 bg-gradient-to-br from-[#17f7f7] to-blue-600"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-white/30 font-mono text-xs z-10">
                     Hover Me
                  </div>
              </div>
              <div>
                 <h4 className="text-white font-medium mb-2">Image Container</h4>
                 <ul className="text-sm text-[#d5dada]/60 list-disc pl-4 space-y-1">
                    <li>Full-bleed absolute positioning</li>
                    <li>Dual-layer: Sharp Image + Blurred Overlay</li>
                    <li>Active state: <code>opacity-100 blur-lg scale-105</code> on overlay</li>
                    <li>Creates "Halo/Glow" effect</li>
                 </ul>
              </div>
           </div>

           {/* Interactive Elements */}
           <div className="space-y-4">
              <div className="bg-[#090909] border border-white/10 rounded-3xl p-8 h-64 flex flex-col items-center justify-center gap-6">
                 <Button variant="primary" size="sm" withArrow={false}>
                    Primary Pill
                 </Button>
                 <Button variant="secondary" withArrow={false}>
                    Text Link
                 </Button>
              </div>
              <div>
                 <h4 className="text-white font-medium mb-2">Interaction</h4>
                 <ul className="text-sm text-[#d5dada]/60 list-disc pl-4 space-y-1">
                    <li>Pill shapes with slide-up animation</li>
                    <li>Border-radius: 3xl → xl on hover</li>
                    <li>Underlined text for secondary actions</li>
                    <li>Icon buttons rotate 90° on hover</li>
                 </ul>
              </div>
           </div>

        </div>
      </section>

      {/* 7. Scroll & Motion Patterns */}
      <section className="space-y-10">
         <div className="flex items-end justify-between">
          <h3 className="font-serif text-3xl text-white">07. Scroll & Motion Patterns</h3>
          <span className="font-mono text-[#17f7f7] text-sm">Parallax / Scrub / Marquee</span>
        </div>

        <div className="grid grid-cols-1 gap-8">
           
           {/* Pattern A */}
           <div className="bg-[#090909] border border-white/10 rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8">
               <div>
                  <h4 className="text-white text-xl font-serif mb-4">A. Vertical Parallax Story</h4>
                  <p className="text-sm text-[#d5dada]/70 mb-4 leading-relaxed">
                     A split-screen layout where a tall image column scrolls at a different speed than the text column.
                  </p>
                  <ul className="text-xs font-mono text-[#17f7f7] space-y-2">
                     <li>• ScrollTrigger with scrub: true</li>
                     <li>• Images move <code>-(height - windowHeight)</code></li>
                     <li>• Text slides upward to sync with images</li>
                     <li>• Desktop: Natural parallax / Mobile: Pinned stack</li>
                  </ul>
               </div>
               <div className="bg-[#1A1A1A] rounded-xl border border-white/5 flex items-center justify-center">
                  <span className="text-xs text-white/30 uppercase tracking-widest">Visual Representation</span>
               </div>
           </div>

           {/* Pattern B */}
           <div className="bg-[#090909] border border-white/10 rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8">
               <div>
                  <h4 className="text-white text-xl font-serif mb-4">B. Horizontal Scroll + Char Drop</h4>
                  <p className="text-sm text-[#d5dada]/70 mb-4 leading-relaxed">
                     Giant typography that travels horizontally across the screen while individual characters rotate and drop in.
                  </p>
                  <ul className="text-xs font-mono text-[#17f7f7] space-y-2">
                     <li>• Text size: <code>16vw</code>+</li>
                     <li>• Horizontal scrub: <code>x: -(width - window)</code></li>
                     <li>• Char anim: <code>yPercent: -60 -&gt; 0</code> with bounce</li>
                     <li>• Staggered drop-in linked to scroll position</li>
                  </ul>
               </div>
               <div className="bg-[#1A1A1A] rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
                   <h2 className="text-4xl font-serif text-white/20 whitespace-nowrap -rotate-6">SCROLL SCROLL SCROLL</h2>
               </div>
           </div>

           {/* Pattern C */}
           <div className="bg-[#090909] border border-white/10 rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8">
               <div>
                  <h4 className="text-white text-xl font-serif mb-4">C. Parallax Marquee</h4>
                  <p className="text-sm text-[#d5dada]/70 mb-4 leading-relaxed">
                     A continuous infinite loop of logos that also drifts horizontally based on scroll direction.
                  </p>
                  <ul className="text-xs font-mono text-[#17f7f7] space-y-2">
                     <li>• Base layer: CSS Infinite Marquee</li>
                     <li>• Parallax layer: <code>xPercent: -5</code> scrub</li>
                     <li>• Creates a "floating/drifting" sensation on top of the loop</li>
                  </ul>
               </div>
               <div className="bg-[#1A1A1A] rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
                   <div className="flex gap-4 opacity-30">
                      {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 bg-white/20 rounded-full"></div>)}
                   </div>
               </div>
           </div>

        </div>
      </section>

    </div>
  );
}
