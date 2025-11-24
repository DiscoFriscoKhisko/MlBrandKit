import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { downloadSVG, downloadAsset } from "./ui/utils";
import { MASTER_LOGO_URL, METEOR_GLYPH_URL, MICRO_LOGO_URL } from "./branding/constants";
import { 
  generateLinkedInPostSVG, 
  generateInstagramPostSVG, 
  generateTwitterHeaderSVG,
  generateAppIconSVG,
  generateWordmarkSVG
} from "./branding/generator";
import { toast } from "sonner@2.0.3";

export function DigitalAssets() {
  const handleDownloadSocial = async () => {
    try {
      toast.info("Generating assets...");
      const [linkedIn, instagram, twitter] = await Promise.all([
        generateLinkedInPostSVG(),
        generateInstagramPostSVG(),
        generateTwitterHeaderSVG()
      ]);
      
      downloadSVG(linkedIn, "material-lab-linkedin.svg");
      setTimeout(() => downloadSVG(instagram, "material-lab-instagram.svg"), 100);
      setTimeout(() => downloadSVG(twitter, "material-lab-twitter.svg"), 200);
      
      toast.success("Social media assets downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate assets");
    }
  };

  const handleDownloadAppIcons = async () => {
    try {
      toast.info("Generating app icons...");
      const iconSvg = await generateAppIconSVG();
      downloadSVG(iconSvg, "material-lab-app-icon.svg");
      toast.success("App icons downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate icons");
    }
  };

  const handleDownloadWordmarks = async () => {
    try {
      toast.info("Generating wordmarks...");
      const [black, white] = await Promise.all([
        generateWordmarkSVG("black"),
        generateWordmarkSVG("white")
      ]);
      
      downloadSVG(black, "material-lab-wordmark-black.svg");
      setTimeout(() => downloadSVG(white, "material-lab-wordmark-white.svg"), 100);
      
      toast.success("Wordmarks downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate wordmarks");
    }
  };

  const handleDownloadSignature = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<body>
  <table cellPadding="0" cellSpacing="0" style="font-family: 'Inter', sans-serif; background-color: transparent;">
    <tbody>
      <tr>
        <td style="padding-right: 24px; border-right: 2px solid #090A09;">
          <img src="${MASTER_LOGO_URL}" alt="Material Lab" style="width: 60px; height: 60px; object-fit: contain;" />
        </td>
        <td style="padding-left: 24px;">
          <p style="margin: 0; font-size: 16px; font-weight: 700; color: #090A09;">Damini Rathi</p>
          <p style="margin: 4px 0; font-size: 14px; color: #090A09;">Co-founder, Material Lab</p>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #090A09;">damini@materiallab.io • +91 805 013 1733</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #090A09;">materiallab.io</p>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "material-lab-signature.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Signature HTML downloaded");
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl mb-4 font-serif text-foreground">Digital Assets</h2>
        <p className="text-muted-foreground max-w-3xl">
          Digital branding guidelines for web, mobile, and social media applications. 
          Maintain consistency across all digital touchpoints.
        </p>
      </div>

      {/* Wordmarks */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Wordmarks</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Black Wordmark */}
          <div className="space-y-6">
            <Card className="p-6 border-border">
              <div className="aspect-[3/1] rounded-lg mb-4 flex items-center justify-center bg-white border border-border p-8">
                <div className="w-full h-full flex items-center justify-center">
                   <h1 className="font-serif font-bold text-4xl md:text-5xl text-[#090A09]">material lab</h1>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                   <p className="text-sm font-semibold text-foreground">Primary Wordmark</p>
                   <p className="text-xs text-muted-foreground">Log Cabin / Light Background</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={async () => {
                    const svg = await generateWordmarkSVG("black");
                    downloadSVG(svg, "material-lab-wordmark-black.svg");
                  }}
                >
                  Download
                </Button>
              </div>
            </Card>
          </div>

          {/* White Wordmark */}
          <div className="space-y-6">
            <Card className="p-6 border-border">
              <div className="aspect-[3/1] rounded-lg mb-4 flex items-center justify-center bg-[#090A09] border border-border p-8">
                <div className="w-full h-full flex items-center justify-center">
                   <h1 className="font-serif font-bold text-4xl md:text-5xl text-white">material lab</h1>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                   <p className="text-sm font-semibold text-foreground">Inverse Wordmark</p>
                   <p className="text-xs text-muted-foreground">White / Dark Background</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={async () => {
                    const svg = await generateWordmarkSVG("white");
                    downloadSVG(svg, "material-lab-wordmark-white.svg");
                  }}
                >
                  Download
                </Button>
              </div>
            </Card>
          </div>
        </div>
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleDownloadWordmarks}
          >
            Download All Wordmarks
          </Button>
        </div>
      </div>

      {/* Brand Glyphs */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Brand Glyphs</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Meteor Glyph */}
          <div className="space-y-6">
            <Card className="p-6 border-border">
              <div className="aspect-square rounded-lg mb-4 flex items-center justify-center bg-white border border-border p-12">
                <img 
                  src={METEOR_GLYPH_URL} 
                  alt="Meteor Glyph"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                   <p className="text-sm font-semibold text-foreground">Meteor Glyph</p>
                   <p className="text-xs text-muted-foreground">Primary Brand Symbol</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => downloadAsset(METEOR_GLYPH_URL, "material-lab-meteor-glyph.png")}
                >
                  Download
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 border-border">
              <div className="aspect-square rounded-lg mb-4 flex items-center justify-center bg-[#090A09] border border-border p-12">
                <img 
                  src={METEOR_GLYPH_URL} 
                  alt="Meteor Glyph Inverse"
                  className="w-full h-full object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
               <div className="flex items-center justify-between mt-4">
                <div>
                   <p className="text-sm font-semibold text-foreground">Meteor Glyph (Inverse)</p>
                   <p className="text-xs text-muted-foreground">For Dark Backgrounds</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => downloadAsset(METEOR_GLYPH_URL, "material-lab-meteor-glyph.png")}
                >
                  Download
                </Button>
              </div>
            </Card>
          </div>

          {/* Micro Logo */}
          <div className="space-y-6">
            <Card className="p-6 border-border">
              <div className="aspect-square rounded-lg mb-4 flex items-center justify-center bg-white border border-border p-12">
                <img 
                  src={MICRO_LOGO_URL} 
                  alt="Micro Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                   <p className="text-sm font-semibold text-foreground">Micro Logo</p>
                   <p className="text-xs text-muted-foreground">Secondary Symbol</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => downloadAsset(MICRO_LOGO_URL, "material-lab-micro-logo.png")}
                >
                  Download
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 border-border">
              <div className="aspect-square rounded-lg mb-4 flex items-center justify-center bg-[#090A09] border border-border p-12">
                <img 
                  src={MICRO_LOGO_URL} 
                  alt="Micro Logo Inverse"
                  className="w-full h-full object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
               <div className="flex items-center justify-between mt-4">
                <div>
                   <p className="text-sm font-semibold text-foreground">Micro Logo (Inverse)</p>
                   <p className="text-xs text-muted-foreground">For Dark Backgrounds</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => downloadAsset(MICRO_LOGO_URL, "material-lab-micro-logo.png")}
                >
                  Download
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Social Media Templates</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* LinkedIn Post */}
          <Card className="overflow-hidden border-border">
            <div className="bg-white p-8 aspect-square flex flex-col justify-between border-b border-border">
              <div>
                <img 
                  src={MASTER_LOGO_URL} 
                  alt="Material Lab"
                  className="h-12 object-contain"
                />
              </div>
              <div>
                <h4 className="text-2xl mb-2 font-serif text-[#090A09]">Build faster with AI</h4>
                <p className="text-sm text-[#737373]">Custom workflows that move real metrics</p>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">LinkedIn Post</p>
              <p className="text-xs text-muted-foreground/70">1200 × 1200px</p>
            </div>
          </Card>

          {/* Instagram Post */}
          <Card className="overflow-hidden border-border">
            <div className="bg-[#090A09] p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <img 
                  src={MASTER_LOGO_URL} 
                  alt="Material Lab"
                  className="h-16 object-contain mx-auto mb-4 invert brightness-0"
                />
                <div className="h-1 w-32 rounded mx-auto bg-white/20" />
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Instagram Post</p>
              <p className="text-xs text-muted-foreground/70">1080 × 1080px</p>
            </div>
          </Card>

          {/* Twitter/X Header */}
          <Card className="overflow-hidden border-border">
            <div className="bg-[#090A09] p-8 aspect-[3/1] flex items-center justify-center">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab"
                className="h-14 object-contain invert brightness-0"
              />
            </div>
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">X/Twitter Header</p>
              <p className="text-xs text-muted-foreground/70">1500 × 500px</p>
            </div>
          </Card>
        </div>
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleDownloadSocial}
          >
            Download All Social Media Templates
          </Button>
        </div>
      </div>

      {/* Email Signature */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Email Signature</h3>
        <Card className="p-8 border-border">
          <div className="max-w-xl mx-auto p-6">
            <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Inter, sans-serif' }}>
              <tbody>
                <tr>
                  <td style={{ paddingRight: '24px', borderRight: '2px solid #090A09' }}>
                    <img 
                      src={MASTER_LOGO_URL} 
                      alt="Material Lab"
                      style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                    />
                  </td>
                  <td style={{ paddingLeft: '24px' }}>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#090A09' }}>
                      Damini Rathi
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '14px', color: '#090A09' }}>
                      Co-founder, Material Lab
                    </p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#090A09' }}>
                      damini@materiallab.io • +91 805 013 1733
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#090A09' }}>
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
              onClick={handleDownloadSignature}
            >
              Download HTML Signature
            </Button>
          </div>
        </Card>
      </div>

      {/* Website Components */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Website Components</h3>
        <div className="space-y-6">
          {/* Header */}
          <Card className="p-6 border-border">
            <p className="text-sm text-muted-foreground mb-4">Header / Navigation</p>
            <div className="bg-white border border-border rounded-lg p-6 flex items-center justify-between">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab"
                className="h-10 object-contain"
              />
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-[#737373] hover:text-[#090A09]">Work</a>
                <a href="#" className="text-[#737373] hover:text-[#090A09]">About</a>
                <a href="#" className="text-[#737373] hover:text-[#090A09]">Contact</a>
              </div>
            </div>
          </Card>

          {/* CTA Button */}
          <Card className="p-6 border-border">
            <p className="text-sm text-muted-foreground mb-4">Call-to-Action Buttons</p>
            <div className="bg-muted rounded-lg p-8 flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-[#090A09] hover:bg-[#090A09]/90 text-white">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-[#D6D6DE] text-[#090A09] hover:bg-[#D6D6DE]/20">
                Learn More
              </Button>
            </div>
          </Card>

          {/* Footer */}
          <Card className="p-6 border-border">
            <p className="text-sm text-muted-foreground mb-4">Footer</p>
            <div className="bg-[#090A09] rounded-lg p-8 text-white">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                  <img 
                    src={MASTER_LOGO_URL} 
                    alt="Material Lab"
                    className="h-12 object-contain invert brightness-0"
                  />
                  <div className="flex gap-4 text-sm">
                    <a href="#" className="text-[#D6D6DE] hover:text-white">LinkedIn</a>
                    <a href="#" className="text-[#D6D6DE] hover:text-white">Twitter</a>
                    <a href="#" className="text-[#D6D6DE] hover:text-white">GitHub</a>
                  </div>
                </div>
                <div className="border-t border-[#D6D6DE]/20 pt-6 text-sm text-[#D6D6DE]/60">
                  <p>© 2025 Material Lab. Building delightful things for good people.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile App Icon */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">App Icons & Favicons</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 border-border">
            <div className="aspect-square rounded-2xl mb-4 flex items-center justify-center bg-white border-2 border-border p-4">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab iOS Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">iOS Icon</p>
            <p className="text-xs text-muted-foreground/70 text-center">1024 × 1024px</p>
          </Card>

          <Card className="p-6 border-border">
            <div className="aspect-square rounded-lg mb-4 flex items-center justify-center bg-white border-2 border-border p-4">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab Android Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">Android Icon</p>
            <p className="text-xs text-muted-foreground/70 text-center">512 × 512px</p>
          </Card>

          <Card className="p-6 border-border">
            <div className="aspect-square rounded mb-4 flex items-center justify-center bg-white border-2 border-border p-3">
              <img 
                src={MASTER_LOGO_URL} 
                alt="Material Lab PWA Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">PWA Icon</p>
            <p className="text-xs text-muted-foreground/70 text-center">192 × 192px</p>
          </Card>
        </div>
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleDownloadAppIcons}
          >
            Download All Icon Sizes
          </Button>
        </div>
      </div>
    </div>
  );
}
