import { BrandKit } from "./components/BrandKit";
import { Toaster } from "sonner@2.0.3";

export default function App() {
  return (
    <>
      <BrandKit />
      <Toaster position="bottom-right" />
      
      {/* Global SVG Filters */}
      <svg className="defs-only" style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter colorInterpolationFilters="srgb" x="0" y="0" height="100%" width="100%" id="uz33kvj32d">
            <feColorMatrix 
              type="matrix" 
              values="0.83984375 0 0 0 0.0078125 
                      0.8515625 0 0 0 0.00390625 
                      0.87109375 0 0 0 0.00390625 
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
