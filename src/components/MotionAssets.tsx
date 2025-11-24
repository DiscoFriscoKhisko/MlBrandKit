import { Card } from "./ui/card";

export function MotionAssets() {
  // ShaderGradient configuration using strict Material Lab palette:
  // Key Fixes:
  // - reflection=0: Disables environment reflections to prevent color bleeding
  // - envPreset=studio: Uses neutral lighting instead of colorful "city" preset
  // - brightness=1.2: Ensures colors are visible against dark background
  // - Strict hex codes for all color slots
  
  // Colors:
  // Color 1: #F3F3F5 (Mischka 100)
  // Color 2: #090A09 (Log Cabin)
  // Color 3: #D6D6DE (Mischka)
  // Background: #090A09 (Log Cabin)
  
  const shaderUrl = "https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23090A09&bgColor2=%23090A09&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23F3F3F5&color2=%23090A09&color3=%23D6D6DE&embedMode=on&envPreset=studio&fov=45&grain=on&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uAmplitude=0&uDensity=1.3&uFrequency=5.5&uSpeed=0.2&uStrength=4&wireframe=false&zoomOut=false";

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-serif">Motion & 3D</h2>
        <p className="text-muted-foreground">
          Dynamic backgrounds and 3D elements for digital applications.
        </p>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Primary Gradient Shader</h3>
          <p className="text-sm text-muted-foreground">
            Interactive 3D shader using strict brand palette (Log Cabin, Mischka). Reflections disabled to ensure color purity.
          </p>
        </div>
        
        <div className="w-full h-[500px] rounded-xl overflow-hidden border border-border relative bg-[#090A09]">
          <iframe 
            src={shaderUrl}
            title="Shader Gradient"
            className="w-full h-full border-0"
            loading="lazy"
            allow="accelerometer; camera; gyroscope; xr-spatial-tracking;"
            style={{ pointerEvents: 'auto' }} 
          />
        </div>
      </Card>
    </div>
  );
}
