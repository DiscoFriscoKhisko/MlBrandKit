# Material Lab Design System - Context Export

This document contains the core design tokens, architectural patterns, and component usage guidelines for the "Material Lab" branding kit. It is intended to be used as context for Claude or other AI assistants to maintain consistency when developing new features.

## 1. Core Aesthetic: "Dark Mode Luxury"
- **Theme**: Cyber-Noir / Premium Technical
- **Key Characteristics**:
  - **OLED Blacks**: Backgrounds are pure black (`#090909` or `#050505`) rather than dark grey.
  - **Jewel Cyan Accents**: The primary brand color is a vibrant, electric cyan (`#17f7f7`).
  - **Alabaster Grey**: Secondary elements use a muted, pale grey (`#d5dada`) for contrast without harsh whiteness.
  - **Sharp Geometry**: `border-radius` is strictly `0px` (Brutalist/Editorial).
  - **Noise/Grain**: Subtle texture overlays are used to prevent "flatness" in large black areas.

## 2. Design Tokens (Tailwind CSS)

### Colors
| Token | Hex Value | Usage |
|-------|-----------|-------|
| `--background` | `#090909` | Main page background |
| `--foreground` | `#fefefe` | Primary text (White) |
| `--primary` | `#17f7f7` | "Jewel Cyan" - Main actions, active states, glows |
| `--secondary` | `#d5dada` | "Alabaster Grey" - Borders, muted text, secondary actions |
| `--card` | `#090909` | Card backgrounds (same as bg, relies on border) |
| `--border` | `#d5dada` | Visible borders for structure |
| `--muted` | `#090909` | Muted backgrounds |
| `--muted-foreground` | `#d5dada` | Secondary text |

### Typography
- **Font Family (Serif)**: Used for Headings (`h1`, `h2`, `h3`). Implies luxury/editorial.
- **Font Family (Mono)**: Used for labels, captions, buttons, and data displays. Implies technical precision.
- **Scale**: Minimal scale. Large headings vs tiny, wide-tracked captions.

### Radius
- `--radius`: `0px` (Global)

## 3. Key Components

### `PrismScene` (Interactive WebGL)
- **Path**: `/components/branding/interactive/PrismScene.tsx`
- **Tech**: Three.js (React Three Fiber logic but vanilla implementation for performance/control).
- **Function**:
  - Displays a faceted, refractive cyan glass object (`IcosahedronGeometry` with noise displacement).
  - Simulates light physics: Raycasting from cursor position -> Entry Refraction -> Internal Travel -> Exit Refraction.
  - Splits white light into 7 spectral beams (ROYGBIV) with wavelength-dependent IOR.
- **Integration**: Lazy loaded in `App.tsx` to isolate the WebGL context.

### Brand Primitives (Canvas 2D)
Located in `/components/branding/primitives/`. These are lightweight, canvas-based decorative elements.
1.  **`FluxCore`**: A rotating constellation of connected particles.
2.  **`OrbitalGyre`**: Concentric rings rotating on different axes (Gyroscopic).
3.  **`DataHelix`**: Double helix DNA-like structure representing data flow.

### UI Components (ShadCN)
- Located in `/components/ui/`.
- Heavily customized to match the Design System (0px radius, Border-based styling).
- **Tabs**: Custom underline animation, minimal text.
- **Buttons**: Text-based link styles or outlined ghost styles.

## 4. Architectural Patterns

### Three.js & React
- **Isolation**: Heavy 3D scenes are lazy-loaded (`React.lazy`) to prevent main thread blocking on initial load.
- **Cleanup**: All Three.js resources (geometries, materials, textures) must be explicitly disposed of in the `useEffect` cleanup function to prevent memory leaks.
- **Imports**: Use `import * as THREE from 'three'` to avoid "Multiple Instances" warnings in this specific bundler environment.

### Styling
- **Global CSS**: `/styles/globals.css` defines the root variables.
- **Tailwind**: Used for layout and utility classes.
- **Effects**: Custom classes like `.depth-card` and `.grainy-aura` for visual depth.

## 5. File Structure Map
```
/
├── components/
│   ├── branding/
│   │   ├── interactive/
│   │   │   └── PrismScene.tsx  (The main WebGL feature)
│   │   ├── primitives/
│   │   │   ├── FluxCore.tsx
│   │   │   ├── OrbitalGyre.tsx
│   │   │   └── DataHelix.tsx
│   │   └── constants.ts
│   ├── ui/                     (ShadCN Components)
│   ├── BrandKit.tsx            (Main Dashboard View)
│   ├── ColorPalette.tsx
│   ├── Typography.tsx
│   └── ...
├── styles/
│   └── globals.css             (Design Tokens)
└── App.tsx                     (Entry Point & Routing)
```
