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
          {/* Original Log Cabin Filter */}
          <filter colorInterpolationFilters="srgb" x="0" y="0" height="100%" width="100%" id="uz33kvj32d">
            <feColorMatrix 
              type="matrix" 
              values="0.83984375 0 0 0 0.0078125 
                      0.8515625 0 0 0 0.00390625 
                      0.87109375 0 0 0 0.00390625 
                      0 0 0 1 0"
            />
          </filter>

          {/* New Filter 1 */}
          <filter colorInterpolationFilters="srgb" x="0" y="0" height="100%" width="100%" id="rmgtwohgg5">
            <feColorMatrix 
              type="matrix" 
              values="0.828125 0 0 0 0 
                      -0.078125 0 0 0 0.9375 
                      -0.12890625 0 0 0 0.99609375 
                      0 0 0 1 0"
            />
          </filter>

          {/* New Filter 2 */}
          <filter colorInterpolationFilters="srgb" x="0" y="0" height="100%" width="100%" id="pxsp8qhui3">
            <feColorMatrix 
              type="matrix" 
              values="0.8203125 0 0 0 0 
                      -0.0859375 0 0 0 0.9375 
                      -0.125 0 0 0 0.99609375 
                      0 0 0 1 0"
            />
          </filter>

          {/* New Filter 3 */}
          <filter colorInterpolationFilters="srgb" x="0" y="0" height="100%" width="100%" id="meqnevisbo">
            <feColorMatrix 
              type="matrix" 
              values="0.9609375 0 0 0 0.03515625 
                      0.95703125 0 0 0 0.0390625 
                      0.9609375 0 0 0 0.03515625 
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
