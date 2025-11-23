import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { downloadAsset } from "./ui/utils";
import { MASTER_LOGO_URL } from "./branding/constants";

export function DigitalAssets() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl mb-4 font-serif">Digital Assets</h2>
        <p className="text-neutral-600 max-w-3xl">
          Digital branding guidelines for web, mobile, and social media applications. 
          Maintain consistency across all digital touchpoints.
        </p>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-2xl mb-6">Social Media Templates</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* LinkedIn Post */}
          <Card className="overflow-hidden">
            <div className="bg-white p-8 aspect-square flex flex-col justify-between border">
              <div>
                <img 
                  src={MASTER_LOGO_URL} 
                  alt="Material Lab"
                  className="h-12 object-contain"
                />
              </div>
              <div>
                <h4 className="text-2xl mb-2 font-serif">Build faster with AI</h4>
                <p className="text-sm text-neutral-600">Custom workflows that move real metrics</p>
              </div>
            </div>
            <div className="p-4 border-t">
              <p className="text-xs text-neutral-500 mb-2">LinkedIn Post</p>
              <p className="text-xs text-neutral-400">1200 × 1200px</p>
            </div>
          </Card>

          {/* Instagram Post */}
          <Card className="overflow-hidden">
            <div className="bg-black p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <img 
                  src={MASTER_LOGO_URL} 
                  alt="Material Lab"
                  className="h-16 object-contain mx-auto mb-4"
                />
                <div className="h-1 w-32 rounded mx-auto bg-white/20" />
              </div>
            </div>
            <div className="p-4 border-t">
              <p className="text-xs text-neutral-500 mb-2">Instagram Post</p>
              <p className="text-xs text-neutral-400">1080 × 1080px</p>
            </div>
          </Card>

          {/* Twitter/X Header */}
          <Card className="overflow-hidden">
            <div className="bg-neutral-900 p-8 aspect-[3/1] flex items-center justify-center">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab"
                className="h-14 object-contain"
              />
            </div>
            <div className="p-4 border-t">
              <p className="text-xs text-neutral-500 mb-2">X/Twitter Header</p>
              <p className="text-xs text-neutral-400">1500 × 500px</p>
            </div>
          </Card>
        </div>
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => downloadAsset(MASTER_LOGO_URL, "social-media-assets.svg")}
          >
            <Download className="w-4 h-4 mr-2" />
            Download All Social Media Templates
          </Button>
        </div>
      </div>

      {/* Email Signature */}
      <div>
        <h3 className="text-2xl mb-6">Email Signature</h3>
        <Card className="p-8">
          <div className="max-w-xl mx-auto bg-neutral-50 rounded-lg p-6">
            <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Inter, sans-serif' }}>
              <tbody>
                <tr>
                  <td style={{ paddingRight: '24px', borderRight: '2px solid #e5e5e5' }}>
                    <img 
                      src={MASTER_LOGO_URL} 
                      alt="Material Lab"
                      style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                    />
                  </td>
                  <td style={{ paddingLeft: '24px' }}>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#000000' }}>
                      Damini Rathi
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '14px', color: '#737373' }}>
                      Co-founder, Material Lab
                    </p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#737373' }}>
                      damini@materiallab.io • +91 805 013 1733
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#737373' }}>
                      materiallab.io
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <Button 
              variant="outline"
              onClick={() => downloadAsset(MASTER_LOGO_URL, "email-signature-asset.svg")}
            >
              <Download className="w-4 h-4 mr-2" />
              Download HTML Signature
            </Button>
          </div>
        </Card>
      </div>

      {/* Website Components */}
      <div>
        <h3 className="text-2xl mb-6">Website Components</h3>
        <div className="space-y-6">
          {/* Header */}
          <Card className="p-6">
            <p className="text-sm text-neutral-500 mb-4">Header / Navigation</p>
            <div className="bg-white border border-neutral-200 rounded-lg p-6 flex items-center justify-between">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab"
                className="h-10 object-contain"
              />
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-neutral-600 hover:text-black">Work</a>
                <a href="#" className="text-neutral-600 hover:text-black">About</a>
                <a href="#" className="text-neutral-600 hover:text-black">Contact</a>
              </div>
            </div>
          </Card>

          {/* CTA Button */}
          <Card className="p-6">
            <p className="text-sm text-neutral-500 mb-4">Call-to-Action Buttons</p>
            <div className="bg-neutral-50 rounded-lg p-8 flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-black hover:bg-neutral-800">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </Card>

          {/* Footer */}
          <Card className="p-6">
            <p className="text-sm text-neutral-500 mb-4">Footer</p>
            <div className="bg-neutral-900 rounded-lg p-8 text-white">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                  <img 
                    src={MASTER_LOGO_URL} 
                    alt="Material Lab"
                    className="h-12 object-contain"
                  />
                  <div className="flex gap-4 text-sm">
                    <a href="#" className="text-neutral-400 hover:text-white">LinkedIn</a>
                    <a href="#" className="text-neutral-400 hover:text-white">Twitter</a>
                    <a href="#" className="text-neutral-400 hover:text-white">GitHub</a>
                  </div>
                </div>
                <div className="border-t border-neutral-800 pt-6 text-sm text-neutral-400">
                  <p>© 2025 Material Lab. Building delightful things for good people.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile App Icon */}
      <div>
        <h3 className="text-2xl mb-6">App Icons & Favicons</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="aspect-square rounded-2xl mb-4 flex items-center justify-center bg-white border-2 border-neutral-200 p-4">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab iOS Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-neutral-500 text-center">iOS Icon</p>
            <p className="text-xs text-neutral-400 text-center">1024 × 1024px</p>
          </Card>

          <Card className="p-6">
            <div className="aspect-square rounded-lg mb-4 flex items-center justify-center bg-white border-2 border-neutral-200 p-4">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab Android Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-neutral-500 text-center">Android Icon</p>
            <p className="text-xs text-neutral-400 text-center">512 × 512px</p>
          </Card>

          <Card className="p-6">
            <div className="aspect-square rounded mb-4 flex items-center justify-center bg-black p-2">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab Favicon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-neutral-500 text-center">Favicon</p>
            <p className="text-xs text-neutral-400 text-center">32 × 32px</p>
          </Card>

          <Card className="p-6">
            <div className="aspect-square rounded mb-4 flex items-center justify-center bg-white border-2 border-neutral-200 p-3">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab PWA Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-neutral-500 text-center">PWA Icon</p>
            <p className="text-xs text-neutral-400 text-center">192 × 192px</p>
          </Card>
        </div>
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => downloadAsset(MASTER_LOGO_URL, "app-icons.svg")}
          >
            <Download className="w-4 h-4 mr-2" />
            Download All Icon Sizes
          </Button>
        </div>
      </div>

      {/* Business Card */}
      <div>
        <h3 className="text-2xl mb-6">Digital Business Card</h3>
        <Card className="p-8">
          <div className="max-w-md mx-auto bg-white border-2 border-neutral-200 rounded-2xl p-8">
            <div className="mb-8">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab"
                className="h-16 object-contain"
              />
            </div>
            <div className="space-y-3 text-neutral-900">
              <p className="text-sm">damini@materiallab.io</p>
              <p className="text-sm">+91 805 013 1733</p>
              <p className="text-sm">materiallab.io</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button 
              variant="outline"
              onClick={() => downloadAsset(MASTER_LOGO_URL, "digital-business-card.svg")}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Business Card Template
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
