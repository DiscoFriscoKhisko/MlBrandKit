import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ColorPalette } from "./ColorPalette";
import { Typography } from "./Typography";
import { PhysicalMockups } from "./PhysicalMockups";
import { DigitalAssets } from "./DigitalAssets";
import { MotionAssets } from "./MotionAssets";
import { UsageGuidelines } from "./UsageGuidelines";
import { toast } from "sonner@2.0.3";

export function BrandKit() {
  const handleDownloadKit = () => {
    toast.success("Preparing brand kit download...");
    setTimeout(() => {
       window.print();
    }, 1000);
  };

  const handleGitHub = () => {
    window.open("https://github.com/material-lab-io", "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl mb-6 font-serif text-foreground">
              Material Lab Brand Kit
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete branding guidelines for digital and physical applications. 
              Everything you need to represent Material Lab consistently across all touchpoints.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleDownloadKit}>
                Download Full Kit
              </Button>
              <Button size="lg" variant="outline" onClick={handleGitHub}>
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Tabs defaultValue="colors" className="w-full">
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 pb-6 mb-8 border-b border-border">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 bg-muted text-muted-foreground">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="physical">Physical</TabsTrigger>
              <TabsTrigger value="digital">Digital</TabsTrigger>
              <TabsTrigger value="motion">Motion</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="colors">
            <ColorPalette />
          </TabsContent>

          <TabsContent value="typography">
            <Typography />
          </TabsContent>

          <TabsContent value="physical">
            <PhysicalMockups />
          </TabsContent>

          <TabsContent value="digital">
            <DigitalAssets />
          </TabsContent>

          <TabsContent value="motion">
            <MotionAssets />
          </TabsContent>

          <TabsContent value="usage">
            <UsageGuidelines />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-sm text-muted-foreground">
                © 2025 Material Lab. Building delightful things for good people.
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <a href="mailto:damini@materiallab.io" className="text-muted-foreground hover:text-foreground transition-colors">
                Email
              </a>
              <a href="http://wa.me/918050131733" className="text-muted-foreground hover:text-foreground transition-colors">
                WhatsApp
              </a>
              <a href="https://www.linkedin.com/company/material-lab-io/" className="text-muted-foreground hover:text-foreground transition-colors">
                LinkedIn
              </a>
              <a href="https://x.com/kaushiknaarayan" className="text-muted-foreground hover:text-foreground transition-colors">
                X/Twitter
              </a>
              <a href="https://github.com/material-lab-io" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
