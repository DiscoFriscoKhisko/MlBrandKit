import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ColorPalette } from "./ColorPalette";
import { Typography } from "./Typography";
import { PhysicalMockups } from "./PhysicalMockups";
import { DigitalAssets } from "./DigitalAssets";
import { UsageGuidelines } from "./UsageGuidelines";
import { toast } from "sonner@2.0.3";

export function BrandKit() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Tabs defaultValue="colors" className="w-full">
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 pb-6 mb-8 border-b border-border">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 gap-2 bg-muted text-muted-foreground">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="physical">Physical</TabsTrigger>
              <TabsTrigger value="digital">Digital</TabsTrigger>
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

          <TabsContent value="usage">
            <UsageGuidelines />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
