import React from 'react'

export const SVGFilters: React.FC = () => {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        {/* Log Cabin Filter - Monochrome with warm tint */}
        <filter id="log-cabin-filter" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="
            0.83984375 0 0 0 0.0078125
            0.8515625 0 0 0 0.00390625
            0.87109375 0 0 0 0.00390625
            0 0 0 1 0
          "/>
        </filter>

        {/* Cyan Tone Filter - Cool spectral tint */}
        <filter id="cyan-filter" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="
            0.828125 0 0 0 0
            -0.078125 0 0 0 0.9375
            -0.12890625 0 0 0 0.99609375
            0 0 0 1 0
          "/>
        </filter>

        {/* Warm Tone Filter - Warm spectral tint */}
        <filter id="warm-filter" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="
            0.9609375 0 0 0 0.03515625
            0.95703125 0 0 0 0.0390625
            0.9609375 0 0 0 0.03515625
            0 0 0 1 0
          "/>
        </filter>

        {/* Noise Filter for Grain Texture */}
        <filter id="noise-filter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves={3} stitchTiles="stitch"/>
        </filter>
      </defs>
    </svg>
  )
}
