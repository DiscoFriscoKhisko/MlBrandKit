import { ArrowRight } from "lucide-react";

// --- Colors ---
export const COLORS = {
  void: '#050505',      // Main Background
  oled: '#090909',      // Card/Section Background
  white: '#fefefe',     // Primary Text
  warmWhite: '#faf9f7', 
  laser: '#17f7f7',     // Accent (Cyan)
  alabaster: '#d5dada', // Secondary Text
  nickel: '#737373'
};

// --- Design Tokens ---
export const TOKENS = {
  padding: {
    section: "py-20 lg:py-32",
    container: "px-7 md:px-14", // p-7 (~28px) / px-14 (~56px)
    card: "p-7 md:p-12",
  },
  grid: {
    main: "grid grid-cols-1 lg:grid-cols-20 gap-y-10 lg:gap-x-10", // The 20-column grid
    thirds: "grid grid-cols-1 md:grid-cols-3 gap-10",
    halves: "grid grid-cols-1 md:grid-cols-2 gap-10",
  },
  geometry: {
    rounded: "rounded-3xl", 
    roundedSection: "rounded-[2.5rem]",
  },
  heights: {
    hero: "min-h-screen",
    cardMobile: "h-[50vh]", 
    cardDesktop: "lg:h-[90vh]",
  }
};

export const LAYOUT = {
  container: `w-full mx-auto relative z-10 ${TOKENS.padding.container}`,
  section: `${TOKENS.padding.section} relative overflow-hidden`,
  sectionCurved: `${TOKENS.padding.section} relative overflow-hidden ${TOKENS.geometry.roundedSection} my-4 mx-2 md:mx-4 bg-[#090909] border border-white/5`,
  card: `bg-[#090909] border border-white/10 ${TOKENS.geometry.rounded} ${TOKENS.padding.card}`,
};

// Applied from BrandKit (Typography.tsx)
export const TYPOGRAPHY = {
  // Display: Merriweather Bold, 64px (6xl/7xl), LH 1.05, Tracking -0.02em
  display: "font-serif font-bold text-6xl md:text-7xl leading-[1.05] tracking-[-0.02em]", 
  
  // Heading 1: Merriweather Bold, 48px (5xl), LH 1.1, Tracking -0.01em
  h1: "font-serif font-bold text-4xl md:text-5xl leading-[1.1] tracking-[-0.01em]",
  
  // Heading 2: Merriweather Regular, 32px (3xl), LH 1.2, Tracking 0
  h2: "font-serif font-normal text-2xl md:text-3xl leading-[1.2] tracking-normal",
  
  // Body Large: Inter Light, 20px (xl), LH 1.6
  bodyLarge: "font-sans font-light text-lg md:text-xl leading-[1.6] tracking-normal",
  
  // Body: Inter Regular, 16px (base), LH 1.6
  body: "font-sans font-normal text-sm md:text-base leading-[1.6] tracking-normal",
  
  // Mono Label: Inter Medium (mapped to font-mono for style), 11px, LH 1.4, Tracking 0.2em
  label: "font-mono font-medium text-[10px] md:text-[11px] uppercase tracking-[0.2em] leading-[1.4]"
};
