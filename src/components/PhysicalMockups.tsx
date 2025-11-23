import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { downloadAsset, downloadSVG } from "./ui/utils";
import { MASTER_LOGO_URL, BUSINESS_CARD_FRONT_IMAGE_URL, BUSINESS_CARD_BACK_IMAGE_URL } from "./branding/constants";
import { generateBusinessCardSVG, generateBusinessCardBackSVG } from "./branding/generator";
import { toast } from "sonner@2.0.3";

export function PhysicalMockups() {
  const handleDownloadTemplate = async () => {
    try {
      toast.info("Generating business card templates...");
      const [front, back] = await Promise.all([
        generateBusinessCardSVG(),
        generateBusinessCardBackSVG()
      ]);
      downloadSVG(front, "material-lab-business-card-front.svg");
      setTimeout(() => downloadSVG(back, "material-lab-business-card-back.svg"), 100);
      toast.success("Templates downloaded");
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate templates");
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl mb-4 font-serif text-foreground">Physical Branding</h2>
        <p className="text-muted-foreground max-w-3xl">
          Material Lab's physical branding applications maintain the same minimal, 
          modern aesthetic across all touchpoints.
        </p>
      </div>

      {/* Business Cards */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Business Cards</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Front */}
          <Card className="p-8 bg-muted">
            <div className="bg-white rounded shadow-lg w-full overflow-hidden">
              <img 
                src={BUSINESS_CARD_FRONT_IMAGE_URL} 
                alt="Business Card Front" 
                className="w-full h-auto block"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">Front - Primary Identity</p>
          </Card>

          {/* Back */}
          <Card className="p-8 bg-muted">
            <div className="bg-[#0B0C0B] rounded shadow-lg w-full overflow-hidden">
              <img 
                src={BUSINESS_CARD_BACK_IMAGE_URL} 
                alt="Business Card Back" 
                className="w-full h-auto block"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">Back - Contact Details</p>
          </Card>
        </div>
        <div className="mt-4">
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="text-foreground mb-1">Business Card Specifications</p>
                <p className="text-muted-foreground">85mm × 55mm (Standard) • 350gsm Premium Stock • Matte Finish</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDownloadTemplate}
              >
                Download Template
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Letterhead */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Letterhead</h3>
        <Card className="p-8 bg-muted">
          <div className="bg-white rounded-lg shadow-lg p-12 aspect-[1/1.4] max-w-2xl mx-auto">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <img 
                  src={MASTER_LOGO_URL} 
                  alt="Material Lab Logo"
                  className="h-16 object-contain"
                />
              </div>

              {/* Body Content Area */}
              <div className="flex-1 space-y-4">
                <div className="h-3 bg-gray-200 rounded w-32"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-100 rounded"></div>
                  <div className="h-2 bg-gray-100 rounded"></div>
                  <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                </div>
                <div className="space-y-2 pt-4">
                  <div className="h-2 bg-gray-100 rounded"></div>
                  <div className="h-2 bg-gray-100 rounded"></div>
                  <div className="h-2 bg-gray-100 rounded"></div>
                  <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-1">
                <p>materiallab.io • damini@materiallab.io</p>
                <p>Building delightful things for good people.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground text-center">
            A4 Size (210mm × 297mm) • White Premium Paper
          </div>
        </Card>
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => downloadAsset(MASTER_LOGO_URL, "letterhead-logo.svg")}
          >
            Download Letterhead Template
          </Button>
        </div>
      </div>
    </div>
  );
}
