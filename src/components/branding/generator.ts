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
        <rect x="-64" y="150" width="128" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
      </g>
    </svg>
  `.trim();
}

export async function generateTwitterHeaderSVG() {
  const logoDataUri = await getBase64Image(MASTER_LOGO_URL);
  
  return `
    <svg width="1500" height="500" viewBox="0 0 1500 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="1500" height="500" fill="#090A09"/>
      <image href="${logoDataUri}" x="650" y="150" width="200" height="200" style="filter: brightness(0) invert(1);" />
    </svg>
  `.trim();
}

export async function generateBusinessCardSVG() {
  const logoDataUri = await getBase64Image(CARD_FRONT_LOGO_URL);
  
  // Front of the card
  // 85.6mm x 54mm (Approx 244x154 aspect ratio)
  return `
    <svg width="85.6mm" height="54mm" viewBox="0 0 244 154" xmlns="http://www.w3.org/2000/svg">
      <rect width="244" height="154" fill="#FFFFFF"/>
      
      <!-- DAMINI: inset-[18.71%_71.56%_71.49%_10.39%] -->
      <text x="25.35" y="35" font-family="Inter, sans-serif" font-weight="600" font-size="12" fill="#0b0c0b">DAMINI </text>

      <!-- RATHI: inset-[33.27%_74.85%_56.93%_10.39%] -->
      <text x="25.35" y="58" font-family="Inter, sans-serif" font-weight="600" font-size="12" fill="#0b0c0b">RATHI</text>
      
      <!-- Line: inset-[53.95%_68.67%_46.05%_10.39%] -->
      <line x1="25.35" y1="83.5" x2="76.9" y2="83.5" stroke="#000000" stroke-width="1" stroke-linecap="round" />
      
      <!-- CoFounder: inset-[44.04%_34.96%_44.2%_32.64%] -->
      <text x="79.6" y="78" font-family="Inter, sans-serif" font-weight="400" font-size="15" fill="#0b0c0b">CoFounder</text>
      
      <!-- Logo Image: inset-[66.91%_76.7%_9.49%_10.46%] -->
      <!-- Width ~ 31px (12.8%), Height ~ 36px (23.6%) based on aspect or just fit box -->
      <!-- Container is top 103, left 25.5. Size: 31x36 approx -->
      <image href="${logoDataUri}" x="25.5" y="103" width="32" height="37" />
      
      <!-- Vertical Handle (Material Lab): inset-[17.59%_11.47%_17.08%_47.51%] -->
      <!-- Center approx x=180, y=77. Rotated 90deg -->
      <text x="180" y="77" font-family="Merriweather, serif" font-weight="bold" font-size="12" fill="#0b0c0b" text-anchor="middle" transform="rotate(90, 180, 77)">Material Lab</text>
    </svg>
  `.trim();
}

export async function generateBusinessCardBackSVG() {
  const logoDataUri = await getBase64Image(CARD_BACK_LOGO_URL);

  return `
    <svg width="85.6mm" height="54mm" viewBox="0 0 244 154" xmlns="http://www.w3.org/2000/svg">
      <rect width="244" height="154" fill="#0B0C0B"/>
      
      <!-- Contact Intro: inset-[13.71%_28.92%_74.53%_10.37%] -->
      <text x="25.3" y="28" font-family="Inter, sans-serif" font-weight="300" font-size="12" fill="#d6d6de">Please contact me at </text>
      
      <!-- Email: inset-[26.45%_23.17%_61.79%_10.37%] -->
      <text x="25.3" y="49" font-family="Inter, sans-serif" font-weight="600" font-size="15" fill="#FFFFFF">damini@materiallab.io</text>
      
      <!-- Or: inset-[32.21%_11.04%_56.03%_82.81%] -->
      <text x="202" y="57" font-family="Inter, sans-serif" font-weight="300" font-size="15" fill="#d6d6de">or</text>
      
      <!-- Phone: inset-[44.04%_33.53%_44.2%_9.86%] -->
      <text x="24" y="75" font-family="Inter, sans-serif" font-weight="500" font-size="15" fill="#FFFFFF">+91-805-013-1733</text>
      
      <!-- Logo Image: inset-[66.91%_76.52%_9.49%_10.64%] -->
      <image href="${logoDataUri}" x="26" y="103" width="32" height="37" />
      
      <!-- Website: inset-[77.64%_25.49%_12.56%_39.65%] -->
      <text x="96.7" y="127" font-family="Merriweather, serif" font-weight="bold" font-size="12" fill="#f3f3f5">materiallab.io</text>
    </svg>
  `.trim();
}

export async function generateAppIconSVG() {
  const logoDataUri = await getBase64Image(MASTER_LOGO_URL);
  
  return `
    <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <rect width="1024" height="1024" fill="#FFFFFF"/>
      <image href="${logoDataUri}" x="112" y="112" width="800" height="800" />
    </svg>
  `.trim();
}
