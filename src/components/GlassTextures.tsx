import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { downloadAsset } from "./ui/utils";
import glassTexture1 from "figma:asset/98e173612e69682754e92cda1176cbf96939a4f5.png";
import glassTexture2 from "figma:asset/c9c3d7ad3259dd947f63b56a233c8da105e3c7b0.png";
import glassTexture3 from "figma:asset/2feab259639b97e6dceaba4c3b295f305ad9aa47.png";

const textures = [
  {
    id: 1,
    name: "Frosted Grid",
    image: glassTexture1,
    description: "Textured glass with grid pattern - perfect for privacy glass effects and subtle backgrounds",
    usage: "Overlays, card backgrounds, modal backgrounds",
    opacity: "30-60%",
  },
  {
    id: 2,
    name: "Liquid Distortion",
    image: glassTexture2,
    description: "Organic flowing glass with vertical distortions - creates dynamic, fluid visual interest",
    usage: "Hero sections, feature highlights, accent panels",
    opacity: "20-40%",
  },
  {
    id: 3,
    name: "Glass Blocks",
    image: glassTexture3,
    description: "Architectural glass blocks with organic distortions - structured yet fluid",
    usage: "Section dividers, feature cards, testimonial backgrounds",
    opacity: "25-50%",
  },
];

const greyGradient = "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 25%, #E5E5E5 50%, #D4D4D4 75%, #FFFFFF 100%)";

export function GlassTextures() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl mb-4 font-serif">Glass Textures</h2>
        <p className="text-neutral-600 max-w-3xl">
          Sophisticated glass effect textures that add depth and premium tactile quality to Material Lab's visual identity. 
          Use as overlays to create glassmorphism effects and enhance the liquid chrome aesthetic.
        </p>
      </div>

      {/* Texture Gallery */}
      <div className="grid md:grid-cols-3 gap-6">
        {textures.map((texture) => (
          <Card key={texture.id} className="overflow-hidden">
            <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
              <img 
                src={texture.image} 
                alt={texture.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-3">
              <div>
                <h4 className="mb-1">{texture.name}</h4>
                <p className="text-sm text-neutral-600">{texture.description}</p>
              </div>
              <div className="pt-3 border-t space-y-2">
                <div>
                  <p className="text-xs text-neutral-500">Recommended Opacity</p>
                  <p className="text-sm">{texture.opacity}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Best For</p>
                  <p className="text-sm">{texture.usage}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2"
                onClick={() => downloadAsset(texture.image, `glass-texture-${texture.id}.png`)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Texture
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Glassmorphism Examples */}
      <div>
        <h3 className="text-2xl mb-6">Glassmorphism Effects</h3>
        <p className="text-neutral-600 mb-6 max-w-3xl">
          Combine glass textures with gradients and backdrop blur to create premium glassmorphism UI elements.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Example 1: Frosted Glass Card */}
          <Card className="p-8 relative overflow-hidden" style={{ background: greyGradient }}>
            <div 
              className="absolute inset-0 opacity-40"
              style={{ 
                backgroundImage: `url(${glassTexture1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="relative bg-white/80 backdrop-blur-xl rounded-lg p-6 border border-white/20 shadow-xl">
              <h4 className="mb-2">Frosted Glass Card</h4>
              <p className="text-sm text-neutral-600 mb-4">
                Subtle texture overlay with backdrop blur creates a sophisticated frosted glass effect.
              </p>
              <Button size="sm">Learn More</Button>
            </div>
          </Card>

          {/* Example 2: Liquid Glass Panel */}
          <Card className="p-8 relative overflow-hidden bg-black">
            <div 
              className="absolute inset-0 opacity-30"
              style={{ 
                backgroundImage: `url(${glassTexture2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="relative bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/10 shadow-xl">
              <h4 className="mb-2 text-white">Liquid Glass Panel</h4>
              <p className="text-sm text-neutral-300 mb-4">
                Dynamic distortion texture on dark backgrounds creates depth and movement.
              </p>
              <Button size="sm" variant="outline" className="text-white border-white/20">
                Explore
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Texture + Gradient Combinations */}
      <div>
        <h3 className="text-2xl mb-6">Texture + Gradient Combinations</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="h-48 relative" style={{ background: greyGradient }}>
              <div 
                className="absolute inset-0 opacity-50 mix-blend-overlay"
                style={{ 
                  backgroundImage: `url(${glassTexture1})`,
                  backgroundSize: 'cover',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm text-neutral-700 uppercase tracking-wider">Grid + Gradient</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-neutral-600">Structured texture meets subtle gradient</p>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-48 relative" style={{ background: greyGradient }}>
              <div 
                className="absolute inset-0 opacity-45"
                style={{ 
                  backgroundImage: `url(${glassTexture3})`,
                  backgroundSize: 'cover',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm text-neutral-700 uppercase tracking-wider">Blocks + Gradient</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-neutral-600">Architectural meets monochrome</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div>
        <h3 className="text-2xl mb-6">Usage Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border-neutral-300 bg-neutral-50">
            <h4 className="text-neutral-900 mb-3 flex items-center gap-2">
              <span className="text-xl">✓</span>
              <span>Best Practices</span>
            </h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>• Use as overlays with 20-60% opacity</li>
              <li>• Combine with backdrop-blur for glassmorphism</li>
              <li>• Layer with gradients for depth</li>
              <li>• Maintain readability - ensure text contrast</li>
              <li>• Use sparingly as accent elements</li>
              <li>• Perfect for hero sections and feature highlights</li>
            </ul>
          </Card>

          <Card className="p-6 border-neutral-300 bg-neutral-50">
            <h4 className="text-neutral-900 mb-3 flex items-center gap-2">
              <span className="text-xl">✗</span>
              <span>Avoid</span>
            </h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>• Don't use at 100% opacity - too distracting</li>
              <li>• Don't place important text over busy areas</li>
              <li>• Don't mix multiple textures in one element</li>
              <li>• Don't use on small UI elements (buttons &lt; 100px)</li>
              <li>• Don't overuse - maintain minimal aesthetic</li>
              <li>• Don't use without proper contrast testing</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* CSS Code Examples */}
      <div>
        <h3 className="text-2xl mb-6">CSS Implementation</h3>
        <div className="space-y-4">
          <Card className="p-6">
            <h4 className="mb-3">Glassmorphism Card</h4>
            <div className="bg-neutral-900 rounded p-4 overflow-x-auto">
              <pre className="text-xs text-neutral-100">
                <code>{`.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('glass-texture.png');
  background-size: cover;
  opacity: 0.4;
  mix-blend-mode: overlay;
}`}</code>
              </pre>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="mb-3">Texture Overlay with Gradient</h4>
            <div className="bg-neutral-900 rounded p-4 overflow-x-auto">
              <pre className="text-xs text-neutral-100">
                <code>{`.chrome-glass {
  background: linear-gradient(135deg, 
    #F8F9FA 0%, #C6CDD5 50%, #8B95A1 100%);
  position: relative;
  overflow: hidden;
}

.chrome-glass::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('glass-texture.png');
  background-size: cover;
  opacity: 0.5;
  pointer-events: none;
}`}</code>
              </pre>
            </div>
          </Card>
        </div>
      </div>

      {/* Real-World Examples */}
      <div>
        <h3 className="text-2xl mb-6">Real-World Applications</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Website Hero */}
          <Card className="overflow-hidden">
            <div className="h-64 relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
              <div 
                className="absolute inset-0 opacity-20"
                style={{ 
                  backgroundImage: `url(${glassTexture2})`,
                  backgroundSize: 'cover',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h4 className="text-3xl text-white mb-4 font-serif">Build Faster with AI</h4>
                <p className="text-neutral-300 mb-6">Custom workflows that move real metrics</p>
                <Button style={{ background: greyGradient }}>
                  Get Started
                </Button>
              </div>
            </div>
            <div className="p-4 border-t">
              <p className="text-sm text-neutral-600">Website hero with liquid glass overlay</p>
            </div>
          </Card>

          {/* Feature Card */}
          <Card className="overflow-hidden">
            <div className="h-64 relative p-8" style={{ background: greyGradient }}>
              <div 
                className="absolute inset-0 opacity-40"
                style={{ 
                  backgroundImage: `url(${glassTexture3})`,
                  backgroundSize: 'cover',
                }}
              />
              <div className="relative">
                <div className="w-16 h-16 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="text-xl mb-2">Fast & Efficient</h4>
                <p className="text-sm text-neutral-700">
                  Ship products in days, not months. Our AI-powered workflows streamline development.
                </p>
              </div>
            </div>
            <div className="p-4 border-t">
              <p className="text-sm text-neutral-600">Feature card with glass block texture</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Download All */}
      <div>
        <Card className="p-8 bg-gradient-to-br from-neutral-50 to-white">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl mb-3 font-serif">Download All Textures</h3>
            <p className="text-neutral-600 mb-6">
              Get the complete set of glass textures in multiple formats (PNG, SVG, WEBP) optimized for web and print.
            </p>
            <Button 
              size="lg" 
              className="bg-black hover:bg-neutral-800"
              onClick={() => {
                textures.forEach(t => downloadAsset(t.image, `glass-texture-${t.id}.png`));
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Texture Pack
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}