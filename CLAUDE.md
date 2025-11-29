# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ML Brand Kit is a React-based design system and brand kit exported from Figma. It showcases Material Lab branding with a "Dark Mode Luxury" / "Cyber-Noir" aesthetic featuring pure black backgrounds, electric cyan accents, and brutalist 0px border radius.

## Commands

```bash
npm run dev          # Start Vite dev server on port 3000
npm run build        # Build to /build directory
npm run test:visual  # Run Playwright visual regression tests
npm run test:visual:update  # Update Playwright snapshots
```

## Architecture

### Core Technology Stack
- **Vite + React 18** with SWC for fast builds
- **Tailwind CSS** for utility styling
- **GSAP + ScrollTrigger** for scroll-based animations (registered in `src/lib/gsap.ts`)
- **Lenis** for smooth scrolling (initialized in `App.tsx`)
- **Three.js** (vanilla) for WebGL scenes

### Key Architectural Patterns

**Three.js Isolation**: Heavy 3D scenes like `PrismScene` are lazy-loaded with `React.lazy()` to prevent main thread blocking. All Three.js resources must be explicitly disposed in `useEffect` cleanup.

**Global Scroll System**: `App.tsx` initializes Lenis smooth scrolling integrated with GSAP's ScrollTrigger. Always import GSAP from `src/lib/gsap.ts` to ensure plugins are registered.

**Asset Aliasing**: Figma-exported assets use `figma:asset/*` import aliases resolved in `vite.config.ts` to files in `src/assets/`.

**Path Alias**: Use `@/` to reference `src/` directory.

### Directory Structure

- `src/components/branding/` - Brand-specific visual elements
  - `interactive/` - WebGL/Three.js scenes (PrismScene)
  - `primitives/` - Canvas 2D decorative elements (FluxCore, OrbitalGyre, DataHelix)
- `src/components/ui/` - ShadCN-based UI components customized for the design system
- `src/components/website/` - Agency website components with scroll animations
- `src/styles/globals.css` - Design tokens and CSS custom properties
- `src/lib/gsap.ts` - GSAP with ScrollTrigger plugin registration

### Design Tokens

Defined in `src/styles/globals.css`:
- `--background: #050505` (OLED black)
- `--primary: #17f7f7` (Electric cyan - main accent)
- `--foreground: #fefefe` (Pure white text)
- `--radius: 0px` (Brutalist/no rounding)
- `--border: rgba(255, 255, 255, 0.08)` (Subtle frost borders)

### Utility Functions

`src/components/ui/utils.ts` provides:
- `cn()` - Tailwind class merging
- `copyToClipboard()` - Clipboard with fallback for iframes
- `downloadSVG()`, `downloadSVGAsPNG()`, `downloadRecoloredImage()` - Asset download utilities

## Visual Testing

Playwright visual regression tests run against `http://localhost:3000`. Screenshots stored in `tests/visual/__screenshots__/` organized by project (desktop/mobile).
