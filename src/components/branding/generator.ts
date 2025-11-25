import { MASTER_LOGO_URL, CARD_FRONT_LOGO_URL, CARD_BACK_LOGO_URL } from "./constants";

const LOGO_WIDTH = 100;
const LOGO_HEIGHT = 100;

// Helper to convert image URL to Base64
async function getBase64Image(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateLinkedInPostSVG() {
  const logoDataUri = await getBase64Image(MASTER_LOGO_URL);
  
  return `
    <svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="1200" fill="#FFFFFF"/>
      <!-- Electric Blue accent -->
      <path d="M1050 0 H1200 V150 L1050 0Z" fill="#00F0FF" opacity="0.2"/>
      
      <image href="${logoDataUri}" x="80" y="80" width="150" height="150" />
      
      <g transform="translate(80, 1000)">
        <text font-family="Merriweather, serif" font-size="96" fill="#090A09" font-weight="bold">Build faster with AI</text>
        <text x="0" y="100" font-family="Inter, sans-serif" font-size="48" fill="#737373">Custom workflows that move real metrics</text>
      </g>
    </svg>
  `.trim();
}

export async function generateInstagramPostSVG() {
  const logoDataUri = await getBase64Image(MASTER_LOGO_URL);
  
  return `
    <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
      <rect width="1080" height="1080" fill="#090A09"/>
      <g transform="translate(540, 540)">
        <image href="${logoDataUri}" x="-150" y="-200" width="300" height="300" style="filter: brightness(0) invert(1);" />
        <!-- Electric Blue accent bar -->
        <rect x="-64" y="150" width="128" height="8" rx="4" fill="#00F0FF"/>
      </g>
    </svg>
  `.trim();
}

export async function generateTwitterHeaderSVG() {
  const logoDataUri = await getBase64Image(MASTER_LOGO_URL);
  
  return `
    <svg width="1500" height="500" viewBox="0 0 1500 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="1500" height="500" fill="#090A09"/>
      <!-- Subtle Electric Blue gradient overlay via opacity -->
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#00F0FF;stop-opacity:0.1" />
        <stop offset="100%" style="stop-color:#090A09;stop-opacity:0" />
      </linearGradient>
      <rect width="1500" height="500" fill="url(#grad1)"/>
      
      <image href="${logoDataUri}" x="650" y="150" width="200" height="200" style="filter: brightness(0) invert(1);" />
    </svg>
  `.trim();
}

export async function generateBusinessCardSVG() {
  // Using the logo optimized for dark backgrounds since we are moving to Dark Mode Luxury
  const logoDataUri = await getBase64Image(CARD_BACK_LOGO_URL);
  
  // Front of the card - Dark Mode Luxury
  // 85.6mm x 54mm (Approx 244x154 aspect ratio)
  return `
    <svg width="85.6mm" height="54mm" viewBox="0 0 244 154" xmlns="http://www.w3.org/2000/svg">
      <rect width="244" height="154" fill="#090909"/>
      
      <!-- DAMINI -->
      <text x="25" y="48" font-family="Inter, sans-serif" font-weight="700" font-size="24" letter-spacing="-0.5" fill="#fefefe">DAMINI </text>

      <!-- RATHI -->
      <text x="25" y="76" font-family="Inter, sans-serif" font-weight="700" font-size="24" letter-spacing="-0.5" fill="#fefefe">RATHI</text>
      
      <!-- Line -->
      <line x1="25" y1="92" x2="55" y2="92" stroke="#fefefe" stroke-width="1.5" stroke-opacity="0.3" stroke-linecap="square" />
      
      <!-- CoFounder -->
      <text x="25" y="108" font-family="Inter, sans-serif" font-weight="400" font-size="9" letter-spacing="2" fill="#d5dada" text-transform="uppercase">CoFounder</text>
      
      <!-- Logo Image -->
      <image href="${logoDataUri}" x="200" y="108" width="24" height="28" />
      
      <!-- Vertical Handle (Material Lab) - Repositioned or Removed? 
           Let's keep it but move it to be subtle on the right or remove if it clashes with drama.
           Let's move it to bottom right aligned with logo maybe?
           Or keep vertical on right edge.
      -->
      <text x="225" y="77" font-family="Merriweather, serif" font-weight="bold" font-size="8" letter-spacing="1" fill="#333333" text-anchor="middle" transform="rotate(90, 225, 77)">material lab</text>
    </svg>
  `.trim();
}

export async function generateBusinessCardBackSVG() {
  const logoDataUri = await getBase64Image(CARD_BACK_LOGO_URL);

  return `
    <svg width="85.6mm" height="54mm" viewBox="0 0 244 154" xmlns="http://www.w3.org/2000/svg">
      <rect width="244" height="154" fill="#090909"/>
      
      <!-- Contact Intro -->
      <text x="25" y="35" font-family="Inter, sans-serif" font-weight="400" font-size="9" fill="#666666" letter-spacing="0.5">Please contact me at </text>
      
      <!-- Email -->
      <text x="25" y="55" font-family="Inter, sans-serif" font-weight="600" font-size="13" fill="#fefefe" letter-spacing="0.2">damini@materiallab.io</text>
      
      <!-- Or -->
      <text x="180" y="55" font-family="Inter, sans-serif" font-weight="400" font-size="9" fill="#666666" font-style="italic">or</text>
      
      <!-- Phone -->
      <text x="25" y="78" font-family="Inter, sans-serif" font-weight="600" font-size="13" fill="#fefefe" letter-spacing="0.2">+91-805-013-1733</text>
      
      <!-- Logo Image -->
      <image href="${logoDataUri}" x="25" y="105" width="24" height="28" />
      
      <!-- Website with Jewel Cyan accent -->
      <text x="65" y="124" font-family="Merriweather, serif" font-weight="bold" font-size="10" fill="#17f7f7">materiallab.io</text>
    </svg>
  `.trim();
}

export async function generateAppIconSVG(size: number = 1024) {
  const logoDataUri = await getBase64Image(MASTER_LOGO_URL);
  const padding = Math.round(size * 0.109);
  const imageSize = size - (padding * 2);
  
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#FFFFFF"/>
      <image href="${logoDataUri}" x="${padding}" y="${padding}" width="${imageSize}" height="${imageSize}" />
    </svg>
  `.trim();
}

export async function generateWordmarkSVG(variant: "black" | "white" | "cyan") {
  let fillColor = "#090A09";
  if (variant === "white") fillColor = "#FFFFFF";
  if (variant === "cyan") fillColor = "#00F0FF";
  
  return `
    <svg width="600" height="150" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Merriweather, serif" font-weight="bold" font-size="72" fill="${fillColor}">material lab</text>
    </svg>
  `.trim();
}

export async function generateMicroLogoSVG(variant: "black" | "white" | "cyan") {
  let fillColor = "#090A09";
  if (variant === "white") fillColor = "#FFFFFF";
  if (variant === "cyan") fillColor = "#00F0FF";
  
  return `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="none"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Merriweather, serif" font-weight="bold" font-size="400" fill="${fillColor}" dy=".1em">ml</text>
    </svg>
  `.trim();
}
