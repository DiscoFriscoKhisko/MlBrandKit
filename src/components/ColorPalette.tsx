import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const lightModeColors = [
  { name: "Primary Black", hex: "#000000", rgb: "0, 0, 0", usage: "Primary text, logo" },
  { name: "Neutral 900", hex: "#171717", rgb: "23, 23, 23", usage: "Headings, emphasis" },
  { name: "Neutral 700", hex: "#404040", rgb: "64, 64, 64", usage: "Secondary text" },
  { name: "Neutral 500", hex: "#737373", rgb: "115, 115, 115", usage: "Tertiary text, labels" },
  { name: "Neutral 300", hex: "#D4D4D4", rgb: "212, 212, 212", usage: "Borders, dividers" },
  { name: "Neutral 100", hex: "#F5F5F5", rgb: "245, 245, 245", usage: "Backgrounds, cards" },
  { name: "Pure White", hex: "#FFFFFF", rgb: "255, 255, 255", usage: "Primary background" },
];

const darkModeColors = [
  { name: "Pure White", hex: "#FFFFFF", rgb: "255, 255, 255", usage: "Primary text, logo" },
  { name: "Neutral 100", hex: "#F5F5F5", rgb: "245, 245, 245", usage: "Headings, emphasis" },
  { name: "Neutral 300", hex: "#D4D4D4", rgb: "212, 212, 212", usage: "Secondary text" },
  { name: "Neutral 500", hex: "#737373", rgb: "115, 115, 115", usage: "Tertiary text, labels" },
  { name: "Neutral 700", hex: "#404040", rgb: "64, 64, 64", usage: "Borders, dividers" },
  { name: "Neutral 900", hex: "#171717", rgb: "23, 23, 23", usage: "Backgrounds, cards" },
  { name: "Primary Black", hex: "#000000", rgb: "0, 0, 0", usage: "Primary background" },
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
  const isDark = name.includes("Black") || name.includes("900") || name.includes("700");
  
  return (
    <Card className="overflow-hidden">
      <div 
        className="h-32 flex items-center justify-center"
        style={{ backgroundColor: hex }}
      >
        <span className={`text-sm uppercase tracking-wider ${isDark ? 'text-white' : 'text-black'}`}>
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
              className="h-6 w-6 p-0"
            >
              {copied === `${name}-hex` ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
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
              className="h-6 w-6 p-0"
            >
              {copied === `${name}-rgb` ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(id);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl mb-4 font-serif">Color Palette</h2>
        <p className="text-neutral-600 max-w-3xl">
          Material Lab uses a pure grayscale palette - black, white, and shades of grey. 
          Our minimal color system supports both light and dark modes for optimal flexibility across all applications.
        </p>
      </div>

      {/* Mode Selector */}
      <Tabs defaultValue="light" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="light">Light Mode</TabsTrigger>
          <TabsTrigger value="dark">Dark Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="light" className="space-y-12 mt-8">
          <div>
            <h3 className="text-2xl mb-6">Light Mode Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {lightModeColors.map((color) => (
                <ColorCard
                  key={color.hex}
                  {...color}
                  onCopy={copyToClipboard}
                  copied={copiedColor}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="dark" className="space-y-12 mt-8">
          <div>
            <h3 className="text-2xl mb-6">Dark Mode Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {darkModeColors.map((color) => (
                <ColorCard
                  key={color.hex}
                  {...color}
                  onCopy={copyToClipboard}
                  copied={copiedColor}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Usage Examples */}
      <div>
        <h3 className="text-2xl mb-6">Usage Examples</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="mb-4">Button Styles</h4>
            <div className="space-y-3">
              <Button className="w-full bg-black hover:bg-neutral-800 text-white">
                Primary Button (Black)
              </Button>
              <Button variant="outline" className="w-full">
                Secondary Button (Outline)
              </Button>
              <Button variant="ghost" className="w-full">
                Ghost Button
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="mb-4">Text Hierarchy</h4>
            <div className="space-y-2">
              <p className="text-black">Primary text - #000000</p>
              <p className="text-neutral-700">Secondary text - #404040</p>
              <p className="text-neutral-500">Tertiary text - #737373</p>
              <p className="text-neutral-300">Disabled text - #D4D4D4</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Color Combinations */}
      <div>
        <h3 className="text-2xl mb-6">Background Combinations</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="h-48 bg-white flex items-center justify-center border-b">
              <div className="text-center">
                <p className="text-black mb-2">White Background</p>
                <p className="text-neutral-500 text-sm">Light & clean</p>
              </div>
            </div>
            <div className="p-4">
              <code className="text-xs">#FFFFFF</code>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-neutral-100 flex items-center justify-center border-b">
              <div className="text-center">
                <p className="text-black mb-2">Light Grey Background</p>
                <p className="text-neutral-500 text-sm">Subtle sections</p>
              </div>
            </div>
            <div className="p-4">
              <code className="text-xs">#F5F5F5</code>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 bg-black flex items-center justify-center border-b">
              <div className="text-center">
                <p className="text-white mb-2">Black Background</p>
                <p className="text-neutral-300 text-sm">Bold & dramatic</p>
              </div>
            </div>
            <div className="p-4">
              <code className="text-xs">#000000</code>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
