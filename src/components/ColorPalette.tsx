import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

const brandColors = [
  { name: "Log Cabin", hex: "#090A09", rgb: "9, 10, 9", usage: "Primary Brand Color, Headings, Text" },
  { name: "Mischka", hex: "#D6D6DE", rgb: "214, 214, 222", usage: "Secondary Brand Color, Borders, Accents" },
  { name: "White", hex: "#FFFFFF", rgb: "255, 255, 255", usage: "Backgrounds, Negative Space" },
];

// Derived shades for functional UI needs (based on Log Cabin and Mischka)
const functionalColors = [
  { name: "Log Cabin 900", hex: "#090A09", rgb: "9, 10, 9", usage: "Default Text" },
  { name: "Log Cabin 800", hex: "#1A1B1A", rgb: "26, 27, 26", usage: "Hover States" },
  { name: "Mischka 500", hex: "#D6D6DE", rgb: "214, 214, 222", usage: "Borders, Dividers" },
  { name: "Mischka 100", hex: "#F3F3F5", rgb: "243, 243, 245", usage: "Light Backgrounds" },
];

interface ColorCardProps {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
  onCopy: (text: string, id: string) => void;
  copied: string | null;
}

function ColorCard({ name, hex, rgb, usage, onCopy, copied }: ColorCardProps) {
  // Determine text color based on brightness
  const isDark = hex.toLowerCase() === "#090a09" || hex.toLowerCase() === "#1a1b1a";
  
  return (
    <Card className="overflow-hidden">
      <div 
        className="h-32 flex items-center justify-center"
        style={{ backgroundColor: hex }}
      >
        <span className={`text-sm uppercase tracking-wider ${isDark ? 'text-[#D6D6DE]' : 'text-[#090A09]'}`}>
          {name}
        </span>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-neutral-500 mb-1">HEX</p>
          <div className="flex items-center justify-between">
            <code className="text-sm">{hex}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopy(hex, `${name}-hex`)}
              className="h-6 px-2 text-xs"
            >
              {copied === `${name}-hex` ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
        <div>
          <p className="text-xs text-neutral-500 mb-1">RGB</p>
          <div className="flex items-center justify-between">
            <code className="text-sm">{rgb}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopy(rgb, `${name}-rgb`)}
              className="h-6 px-2 text-xs"
            >
              {copied === `${name}-rgb` ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
        <p className="text-xs text-neutral-500 pt-2 border-t">{usage}</p>
      </div>
    </Card>
  );
}

export function ColorPalette() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    const executeCopy = async () => {
      try {
        // Try modern Clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          return true;
        }
        throw new Error("Clipboard API unavailable");
      } catch (err) {
        // Fallback to legacy method
        try {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.left = "-999999px";
          textarea.style.top = "-999999px";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          
          const successful = document.execCommand("copy");
          document.body.removeChild(textarea);
          return successful;
        } catch (fallbackErr) {
          console.error("Fallback copy failed:", fallbackErr);
          return false;
        }
      }
    };

    const success = await executeCopy();
    
    if (success) {
      setCopiedColor(id);
      setTimeout(() => setCopiedColor(null), 2000);
      toast.success(`Copied ${text}`);
    } else {
      // Manual fallback: show the text in a toast for manual copying
      toast.error(`Please copy manually: ${text}`);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl mb-4 font-serif text-[#090A09]">Color Palette</h2>
        <p className="text-[#090A09]/80 max-w-3xl text-lg">
          Material Lab uses a strict monochrome palette anchored by <strong>Log Cabin</strong> (Black) and <strong>Mischka</strong> (Grey). 
          These two colors form the foundation of our visual identity.
        </p>
      </div>

      {/* Core Identity */}
      <div className="space-y-6">
        <h3 className="text-2xl text-[#090A09]">Core Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brandColors.map((color) => (
            <ColorCard
              key={color.hex}
              {...color}
              onCopy={copyToClipboard}
              copied={copiedColor}
            />
          ))}
        </div>
      </div>

      {/* Functional Palette */}
      <div className="space-y-6">
        <h3 className="text-2xl text-[#090A09]">Functional Shades</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {functionalColors.map((color) => (
            <ColorCard
              key={color.hex}
              {...color}
              onCopy={copyToClipboard}
              copied={copiedColor}
            />
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div>
        <h3 className="text-2xl mb-6 text-[#090A09]">Usage Examples</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border-[#D6D6DE]">
            <h4 className="mb-4 text-[#090A09]">Button Styles</h4>
            <div className="space-y-3">
              <Button className="w-full bg-[#090A09] hover:bg-[#090A09]/90 text-white">
                Log Cabin Button
              </Button>
              <Button className="w-full bg-[#D6D6DE] hover:bg-[#D6D6DE]/90 text-[#090A09]">
                Mischka Button
              </Button>
              <Button variant="outline" className="w-full border-[#D6D6DE] text-[#090A09] hover:bg-[#D6D6DE]/20">
                Outline Button
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-[#090A09] text-[#D6D6DE]">
            <h4 className="mb-4 text-white">Dark Mode / High Contrast</h4>
            <div className="space-y-2">
              <p className="text-white text-xl font-serif">Log Cabin & Mischka</p>
              <p className="text-[#D6D6DE]">
                The quick, brown, log cabin, and mischka fox jumped over the lazy dog.
              </p>
              <div className="mt-4 pt-4 border-t border-[#D6D6DE]/30">
                <p className="text-xs text-[#D6D6DE]/70">Dark background pairing</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Background Combinations */}
      <div>
        <h3 className="text-2xl mb-6 text-[#090A09]">Background Combinations</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="overflow-hidden border-[#D6D6DE]">
            <div className="h-48 bg-white flex items-center justify-center border-b border-[#D6D6DE]">
              <div className="text-center">
                <p className="text-[#090A09] mb-2 font-bold">White</p>
                <p className="text-[#090A09]/60 text-sm">Standard Background</p>
              </div>
            </div>
            <div className="p-4 bg-white">
              <code className="text-xs text-[#090A09]">#FFFFFF</code>
            </div>
          </Card>

          <Card className="overflow-hidden border-[#D6D6DE]">
            <div className="h-48 bg-[#D6D6DE] flex items-center justify-center border-b border-[#D6D6DE]">
              <div className="text-center">
                <p className="text-[#090A09] mb-2 font-bold">Mischka</p>
                <p className="text-[#090A09]/60 text-sm">Secondary / Accent</p>
              </div>
            </div>
            <div className="p-4 bg-[#D6D6DE]">
              <code className="text-xs text-[#090A09]">#D6D6DE</code>
            </div>
          </Card>

          <Card className="overflow-hidden border-[#D6D6DE]">
            <div className="h-48 bg-[#090A09] flex items-center justify-center border-b border-[#090A09]">
              <div className="text-center">
                <p className="text-white mb-2 font-bold">Log Cabin</p>
                <p className="text-[#D6D6DE] text-sm">Primary Dark</p>
              </div>
            </div>
            <div className="p-4 bg-[#090A09]">
              <code className="text-xs text-[#D6D6DE]">#090A09</code>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}