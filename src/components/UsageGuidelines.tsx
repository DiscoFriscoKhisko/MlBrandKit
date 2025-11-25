import { Card } from "./ui/card";
import pineappleImg from "figma:asset/4a48ca548bd18aa919107b9d93ce3a1ec8f5690c.png";
import { MASTER_LOGO_URL } from "./branding/constants";

export function UsageGuidelines() {
  return (
    <div className="space-y-32">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <h2 className="text-3xl font-serif text-white">Guidelines</h2>
        </div>
        <div className="md:col-span-8 md:pl-12 border-l border-white/[0.05]">
          <p className="text-[#d5dada] text-lg font-light leading-relaxed max-w-lg">
            The difference between good and great is discipline. 
            Follow these rules to maintain the integrity of the Material Lab system.
          </p>
        </div>
      </div>

      {/* Logo Usage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
        {/* DO SECTION */}
        <div>
          <div className="flex items-center gap-4 mb-12 pb-4 border-b border-[#17f7f7]">
            <span className="text-[#17f7f7] font-bold text-[10px] uppercase tracking-[0.2em]">Do</span>
            <span className="text-[10px] text-[#d5dada]/60 uppercase tracking-widest">Correct Application</span>
          </div>
          
          <div className="space-y-16">
             {/* Do 1 */}
             <div className="group">
               <div className="bg-[#fefefe] p-12 mb-6 flex items-center justify-center aspect-[2.5/1] grainy-aura" style={{ '--aura-color': 'rgba(0,0,0,0.15)' } as React.CSSProperties}>
                 <img src={MASTER_LOGO_URL} alt="Logo Black" className="h-10 w-auto object-contain opacity-90" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Light Backgrounds</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Use the black logo for maximum contrast and legibility on white surfaces.</p>
             </div>

             {/* Do 2 */}
             <div className="group">
               <div className="bg-[#090909] p-12 mb-6 flex items-center justify-center aspect-[2.5/1] border border-white/[0.1] grainy-aura">
                 <img src={MASTER_LOGO_URL} alt="Logo White" className="h-10 w-auto object-contain invert opacity-90" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Dark Backgrounds</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Use the white logo. This is the preferred application for most brand touchpoints.</p>
             </div>

             {/* Do 3 */}
             <div className="group">
               <div className="relative overflow-hidden mb-6 flex items-center justify-center aspect-[2.5/1] grainy-aura">
                 <img 
                    src="https://images.unsplash.com/photo-1614728853913-1e2203d0108d?auto=format&fit=crop&w=800&q=80"
                    alt="Texture" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-overlay"
                 />
                 <div className="absolute inset-0 bg-black/60"></div>
                 <img src={MASTER_LOGO_URL} alt="Logo White" className="h-10 w-auto object-contain invert relative z-10 opacity-90" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Complex Imagery</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Ensure sufficient contrast by applying a 50% black overlay to the image.</p>
             </div>
          </div>
        </div>

        {/* DON'T SECTION */}
        <div>
          <div className="flex items-center gap-4 mb-12 pb-4 border-b border-red-500/50">
            <span className="text-red-500 font-bold text-[10px] uppercase tracking-[0.2em]">Don't</span>
            <span className="text-[10px] text-[#d5dada]/60 uppercase tracking-widest">Avoid These Mistakes</span>
          </div>

          <div className="space-y-16">
             {/* Don't 1 */}
             <div className="group">
               <div className="bg-[#090909] p-12 mb-6 flex items-center justify-center aspect-[2.5/1] relative overflow-hidden border border-white/[0.05]">
                 <div className="absolute inset-0 border border-red-500/20 pointer-events-none"></div>
                 <div className="absolute top-4 right-4 text-red-500 text-xs">✕</div>
                 <img src={MASTER_LOGO_URL} alt="Stretch" className="h-8 w-32 object-fill opacity-80 invert" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Distortion</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Never stretch, squash, or skew the logo proportions.</p>
             </div>

             {/* Don't 2 */}
             <div className="group">
               <div className="bg-[#090909] p-12 mb-6 flex items-center justify-center aspect-[2.5/1] relative overflow-hidden border border-white/[0.05]">
                  <div className="absolute inset-0 border border-red-500/20 pointer-events-none"></div>
                  <div className="absolute top-4 right-4 text-red-500 text-xs">✕</div>
                 <img src={MASTER_LOGO_URL} alt="Color" className="h-10 w-auto object-contain sepia hue-rotate-90 opacity-80 invert" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Recoloring</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Do not apply unauthorized colors or gradients to the logo mark.</p>
             </div>

             {/* Don't 3 */}
             <div className="group">
               <div className="bg-[#17f7f7] p-12 mb-6 flex items-center justify-center aspect-[2.5/1] relative overflow-hidden">
                  <div className="absolute inset-0 border border-red-500/20 pointer-events-none"></div>
                  <div className="absolute top-4 right-4 text-red-500 text-xs">✕</div>
                 <img src={MASTER_LOGO_URL} alt="Low Contrast" className="h-10 w-auto object-contain invert opacity-50" />
               </div>
               <p className="text-sm text-white font-serif mb-2">Low Contrast</p>
               <p className="text-xs text-[#d5dada]/60 leading-relaxed">Avoid using white text on bright backgrounds. It reduces legibility.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Photography Filters */}
      <div className="pt-24 border-t border-white/[0.05]">
         <h3 className="text-[10px] font-mono text-[#d5dada]/40 uppercase tracking-[0.3em] mb-12">Image Processing</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
                { name: "Standard", id: "uz33kvj32d", filter: "grayscale(100%) contrast(120%) brightness(90%)" },
                { name: "Deep", id: "rmgtwohgg5", filter: "grayscale(100%) contrast(140%) brightness(80%)" },
                { name: "Cool", id: "pxsp8qhui3", filter: "grayscale(100%) sepia(20%) hue-rotate(180deg) contrast(110%)" },
                { name: "Stark", id: "meqnevisbo", filter: "grayscale(100%) contrast(160%) brightness(110%)" }
              ].map((filter) => (
                <div key={filter.id} className="group cursor-pointer">
                  <div className="aspect-[3/4] relative bg-[#090909] mb-6 overflow-hidden border border-white/[0.05]">
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
                    <code className="text-[9px] font-mono text-[#d5dada]/40 uppercase tracking-widest">CSS Filter</code>
                  </div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}
