import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { downloadAsset } from "./ui/utils";
import { MASTER_LOGO_URL } from "./branding/constants";

export function PhysicalMockups() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl mb-4 font-serif">Physical Branding</h2>
        <p className="text-neutral-600 max-w-3xl">
          Material Lab's physical branding applications maintain the same minimal, 
          modern aesthetic across all touchpoints.
        </p>
      </div>

      {/* Business Cards */}
      <div>
        <h3 className="text-2xl mb-6">Business Cards</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Front */}
          <Card className="p-8 bg-neutral-50">
            <div className="bg-white rounded-lg shadow-lg p-8 aspect-[1.75/1] flex flex-col justify-between">
              <div>
                <img 
                  src={MASTER_LOGO_URL} 
                  alt="Material Lab Logo"
                  className="h-16 object-contain"
                />
              </div>
              <div className="text-sm space-y-1">
                <p className="text-neutral-900">Damini Rathi</p>
                <p className="text-neutral-600">Co-founder</p>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mt-4">Front - Minimal design with logo</p>
          </Card>

          {/* Back */}
          <Card className="p-8 bg-neutral-50">
            <div className="bg-white rounded-lg shadow-lg p-8 aspect-[1.75/1] flex flex-col justify-between">
              <div className="h-1 w-24 rounded bg-neutral-300" />
              <div className="text-sm space-y-2 text-neutral-600">
                <p>damini@materiallab.io</p>
                <p>+91 805 013 1733</p>
                <p>materiallab.io</p>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mt-4">Back - Contact details</p>
          </Card>
        </div>
        <div className="mt-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="text-neutral-900 mb-1">Business Card Specifications</p>
                <p className="text-neutral-500">85mm × 55mm (Standard) • 350gsm Premium Stock • Matte Finish</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => downloadAsset(MASTER_LOGO_URL, "business-card-logo.svg")}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Letterhead */}
      <div>
        <h3 className="text-2xl mb-6">Letterhead</h3>
        <Card className="p-8 bg-neutral-50">
          <div className="bg-white rounded-lg shadow-lg p-12 aspect-[1/1.4] max-w-2xl mx-auto">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="mb-8 pb-6 border-b border-neutral-200">
                <img 
                  src={MASTER_LOGO_URL} 
                  alt="Material Lab Logo"
                  className="h-16 object-contain"
                />
              </div>

              {/* Body Content Area */}
              <div className="flex-1 space-y-4">
                <div className="h-3 bg-neutral-200 rounded w-32"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-neutral-100 rounded"></div>
                  <div className="h-2 bg-neutral-100 rounded"></div>
                  <div className="h-2 bg-neutral-100 rounded w-3/4"></div>
                </div>
                <div className="space-y-2 pt-4">
                  <div className="h-2 bg-neutral-100 rounded"></div>
                  <div className="h-2 bg-neutral-100 rounded"></div>
                  <div className="h-2 bg-neutral-100 rounded"></div>
                  <div className="h-2 bg-neutral-100 rounded w-5/6"></div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-neutral-200 text-xs text-neutral-500 space-y-1">
                <p>materiallab.io • damini@materiallab.io</p>
                <p>Building delightful things for good people.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-500 text-center">
            A4 Size (210mm × 297mm) • White Premium Paper
          </div>
        </Card>
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => downloadAsset(MASTER_LOGO_URL, "letterhead-logo.svg")}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Letterhead Template
          </Button>
        </div>
      </div>
    </div>
  );
}