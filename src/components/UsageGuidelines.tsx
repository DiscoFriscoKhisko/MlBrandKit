import { Card } from "./ui/card";
import pineappleImg from "figma:asset/4a48ca548bd18aa919107b9d93ce3a1ec8f5690c.png";
import { MASTER_LOGO_URL } from "./branding/constants";

export function UsageGuidelines() {
  return (
    <div className="space-y-32">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-serif text-white">System Protocols</h2>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <p className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
            Strict adherence to the Void. High contrast, minimal interference, and purposeful use of the "Laser Cyan" spectrum.
          </p>
        </div>
      </div>

      {/* Logo Usage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
        {/* DO SECTION */}
        <div>
          <div className="flex items-center gap-4 mb-12 pb-4 border-b border-[#17f7f7]">
            <span className="text-[#17f7f7] font-bold text-[10px] uppercase tracking-[0.2em]">Execute</span>
            <span className="text-[10px] text-[#d5dada]/60 uppercase tracking-widest">Approved States</span>
          </div>
          
          <div className="space-y-16">
             {/* Do 1 */}
             <div className="group">
               <div className="bg-[#f3f4f4] p-12 mb-6 flex items-center justify-center aspect-[2.5/1] depth-card">
                 <img src={MASTER_LOGO_URL} alt="Logo Black" className="h-10 w-auto object-contain opacity-95" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Paper Surfaces</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Use the Void Black logo on "White Smoke" or physical paper stocks.</p>
             </div>

             {/* Do 2 */}
             <div className="group">
               <div className="bg-[#050505] p-12 mb-6 flex items-center justify-center aspect-[2.5/1] border border-white/[0.1] depth-card">
                 <img src={MASTER_LOGO_URL} alt="Logo White" className="h-10 w-auto object-contain invert opacity-95" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Digital Void</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Use the Ghost White logo on digital black backgrounds.</p>
             </div>

             {/* Do 3 */}
             <div className="group">
               <div className="relative overflow-hidden mb-6 flex items-center justify-center aspect-[2.5/1] depth-card">
                 <img 
                    src="https://images.unsplash.com/photo-1614728853913-1e2203d0108d?auto=format&fit=crop&w=800&q=80"
                    alt="Texture" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-overlay"
                 />
                 <div className="absolute inset-0 bg-[#050505]/80"></div>
                 <img src={MASTER_LOGO_URL} alt="Logo White" className="h-10 w-auto object-contain invert relative z-10 opacity-95" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Deep Overlay</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Ensure 80% opacity on black overlays when placing logo over imagery.</p>
             </div>
          </div>
        </div>

        {/* DON'T SECTION */}
        <div>
          <div className="flex items-center gap-4 mb-12 pb-4 border-b border-[#ff2a6d]/50">
            <span className="text-[#ff2a6d] font-bold text-[10px] uppercase tracking-[0.2em]">Abort</span>
            <span className="text-[10px] text-[#d5dada]/60 uppercase tracking-widest">Prohibited States</span>
          </div>

          <div className="space-y-16">
             {/* Don't 1 */}
             <div className="group">
               <div className="bg-[#050505] p-12 mb-6 flex items-center justify-center aspect-[2.5/1] relative overflow-hidden border border-white/[0.05] opacity-60">
                 <div className="absolute inset-0 border border-[#ff2a6d]/20 pointer-events-none"></div>
                 <div className="absolute top-4 right-4 text-[#ff2a6d] text-xs">✕</div>
                 <img src={MASTER_LOGO_URL} alt="Stretch" className="h-8 w-32 object-fill opacity-80 invert" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Distortion</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Never stretch, squash, or skew the logo proportions.</p>
             </div>

             {/* Don't 2 */}
             <div className="group">
               <div className="bg-[#050505] p-12 mb-6 flex items-center justify-center aspect-[2.5/1] relative overflow-hidden border border-white/[0.05] opacity-60">
                  <div className="absolute inset-0 border border-[#ff2a6d]/20 pointer-events-none"></div>
                  <div className="absolute top-4 right-4 text-[#ff2a6d] text-xs">✕</div>
                 <img src={MASTER_LOGO_URL} alt="Color" className="h-10 w-auto object-contain sepia hue-rotate-90 opacity-80 invert" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Recoloring</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Do not apply unauthorized colors or gradients to the logo mark.</p>
             </div>

             {/* Don't 3 */}
             <div className="group">
               <div className="bg-[#17f7f7] p-12 mb-6 flex items-center justify-center aspect-[2.5/1] relative overflow-hidden opacity-60">
                  <div className="absolute inset-0 border border-[#ff2a6d]/20 pointer-events-none"></div>
                  <div className="absolute top-4 right-4 text-[#ff2a6d] text-xs">✕</div>
                 <img src={MASTER_LOGO_URL} alt="Low Contrast" className="h-10 w-auto object-contain invert opacity-50" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Low Contrast</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Avoid placing white logos on high-brightness spectral backgrounds.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Photography Filters */}
      <div className="pt-24 border-t border-white/[0.05]">
         <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Optical Processing</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
                { name: "Standard", id: "uz33kvj32d", filter: "grayscale(100%) contrast(120%) brightness(90%)" },
                { name: "Void", id: "rmgtwohgg5", filter: "grayscale(100%) contrast(150%) brightness(70%)" },
                { name: "Cyanotic", id: "pxsp8qhui3", filter: "grayscale(100%) sepia(100%) hue-rotate(130deg) saturate(200%) contrast(120%) brightness(80%)" },
                { name: "Thermal", id: "meqnevisbo", filter: "grayscale(100%) invert(100%) contrast(120%) brightness(80%) sepia(100%) hue-rotate(-50deg) saturate(300%)" }
              ].map((filter) => (
                <div key={filter.id} className="group cursor-pointer">
                  <div className="aspect-[3/4] relative bg-[#050505] mb-6 overflow-hidden border border-white/[0.05] depth-card">
                    <img 
                      src={pineappleImg} 
                      alt={filter.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      style={{ filter: filter.filter }}
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all duration-500"></div>
                  </div>
                  <div className="flex flex-col space-y-1 border-t border-white/[0.1] pt-4">
                    <span className="text-sm font-serif text-white">{filter.name}</span>
                    <code className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">CSS Matrix</code>
                  </div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}
