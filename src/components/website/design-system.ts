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

export const TYPOGRAPHY = {
  display: "font-serif text-[16vw] font-bold tracking-[-0.04em] leading-[0.85]", 
  h1: "font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.1]",
  h2: "font-serif text-2xl md:text-3xl font-normal tracking-normal leading-[1.3]",
  bodyLarge: "font-sans text-lg md:text-2xl font-light tracking-wide leading-[1.6]",
  body: "font-sans text-sm md:text-base font-normal tracking-normal leading-[1.7]",
  label: "font-mono text-[10px] md:text-[11px] font-medium uppercase tracking-[0.25em] leading-[1.4]"
};
