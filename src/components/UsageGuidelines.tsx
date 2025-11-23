import { Card } from "./ui/card";
import pineappleImg from "figma:asset/4a48ca548bd18aa919107b9d93ce3a1ec8f5690c.png";

const logo = "https://img.notionusercontent.com/ext/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fpublic.notion-static.com%2F0c2aa0c2-6343-48c9-bef0-31a6e04e45bb%2Flogo_static.svg/size/?exp=1763637781&sig=lpSzeJ9hnq_Tk2rEwf6jWebPv3ONXuRT1Vu76bGsDrg&id=2a320d43-82ef-80a5-87cf-007a2b11c48c&table=custom_emoji";

export function UsageGuidelines() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl mb-4 font-serif text-foreground">Usage Guidelines</h2>
        <p className="text-muted-foreground max-w-3xl">
          Follow these guidelines to ensure consistent and proper use of Material Lab branding 
          across all applications. When in doubt, keep it simple and minimal.
        </p>
      </div>

      {/* Logo Do's and Don'ts */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Logo Usage</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Do's */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-lg text-foreground">Do</h4>
            </div>
            
            <Card className="p-6 border-border bg-card">
              <div className="bg-white rounded p-8 mb-3 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Material Lab Logo Black"
                  className="h-20 object-contain"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                The logo is available in black and white versions. Use the black version on light backgrounds.
              </p>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="bg-[#1A1B1A] rounded p-8 mb-3 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Material Lab Logo White"
                  className="h-20 object-contain invert brightness-0"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Use the white version on dark backgrounds. Ensure it remains recognizable and legible.
              </p>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="relative rounded mb-3 overflow-hidden h-48 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1579792685643-a4bb28186899?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzZSUyMHNwYWNlJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzYzOTE4MzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Universe Background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10">
                  <img 
                    src={logo} 
                    alt="Material Lab Logo White"
                    className="h-20 object-contain invert brightness-0"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                On dark images (e.g., universe), use the white logo for contrast.
              </p>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="relative rounded mb-3 overflow-hidden h-48 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1679930348703-f94efd6ad369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNsb3VkcyUyMGJsdWUlMjBza3klMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2MzkxODM2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Cloud Background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10">
                  <img 
                    src={logo} 
                    alt="Material Lab Logo Black"
                    className="h-20 object-contain"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                On light images (e.g., clouds), use the black logo for contrast.
              </p>
            </Card>
          </div>

          {/* Don'ts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-lg text-foreground">Don't</h4>
            </div>

            <Card className="p-6 border-border bg-card">
              <div className="bg-white rounded p-8 mb-3 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Don't stretch"
                  className="h-16 w-32 object-fill opacity-50"
                />
              </div>
              <p className="text-sm text-muted-foreground">Don't distort or stretch the logo</p>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="bg-white rounded p-8 mb-3 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Material Lab Logo"
                  className="h-20 object-contain opacity-50"
                />
              </div>
              <p className="text-sm text-muted-foreground">Don't change logo colors or apply effects</p>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="bg-white rounded p-8 mb-3 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Don't use too small"
                  className="h-8 object-contain opacity-50"
                />
              </div>
              <p className="text-sm text-muted-foreground">Don't use below minimum size (44px)</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Wordmark Typography */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Wordmark Typography</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-8 border-border bg-white">
            <div className="h-32 flex flex-col items-center justify-center">
              <h4 className="text-4xl font-serif font-bold text-[#090A09]">Material Lab</h4>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Black Wordmark:</strong> Use on light backgrounds.
            </p>
          </Card>

          <Card className="p-8 border-border bg-[#1A1B1A]">
            <div className="h-32 flex flex-col items-center justify-center">
              <h4 className="text-4xl font-serif font-bold text-white">Material Lab</h4>
            </div>
            <p className="text-sm text-[#D6D6DE] mt-4">
              <strong>White Wordmark:</strong> Use on dark backgrounds.
            </p>
          </Card>

          <Card className="p-0 border-border overflow-hidden relative h-64">
            <img 
              src="https://images.unsplash.com/photo-1579792685643-a4bb28186899?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzZSUyMHNwYWNlJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzYzOTE4MzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Universe Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h4 className="text-4xl font-serif font-bold text-white drop-shadow-lg">Material Lab</h4>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-sm text-white/90">
                <strong>Image Overlay (Dark):</strong> Use white text on dark imagery (e.g., Universe) to ensure contrast.
              </p>
            </div>
          </Card>

          <Card className="p-0 border-border overflow-hidden relative h-64">
            <img 
              src="https://images.unsplash.com/photo-1679930348703-f94efd6ad369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNsb3VkcyUyMGJsdWUlMjBza3klMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2MzkxODM2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Cloud Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h4 className="text-4xl font-serif font-bold text-[#090A09]">Material Lab</h4>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/80 to-transparent">
              <p className="text-sm text-[#090A09]/90">
                <strong>Image Overlay (Light):</strong> Use black text on light imagery (e.g., Cloud) to maintain legibility.
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-8 border-border">
          <div className="bg-muted rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-2 text-foreground">Wordmark Rules</h4>
            <p className="text-sm text-muted-foreground mb-4">
              The "Material Lab" wordmark is available in black and white versions. It can be placed on dark and white backgrounds, as long as the logo remains recognizable and legible.
            </p>
            <p className="text-sm text-muted-foreground">
               It can also be placed on images (e.g., universe, cloud), where the text should be in black or white to contrast the background appropriately.
            </p>
          </div>
        </Card>
      </div>

      {/* Color Usage */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Color Palette & Combinations</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Color Swatches */}
          <div className="space-y-6">
            <Card className="p-6 border-border bg-white">
              <h4 className="text-lg font-semibold mb-4 text-[#090A09]">Primary Palette</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#090A09] shadow-sm border border-gray-200"></div>
                  <div>
                    <p className="font-serif font-bold text-[#090A09]">Log Cabin</p>
                    <p className="font-mono text-sm text-gray-500">#090A09</p>
                    <p className="text-sm text-gray-500">Primary Background / Text</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#D6D6DE] shadow-sm border border-gray-200"></div>
                  <div>
                    <p className="font-serif font-bold text-[#090A09]">Mischka</p>
                    <p className="font-mono text-sm text-gray-500">#D6D6DE</p>
                    <p className="text-sm text-gray-500">Secondary Background / Text</p>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-4 mt-8 text-[#090A09]">Secondary Palette</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#FFFFFF] shadow-sm border border-gray-200"></div>
                  <div>
                    <p className="font-serif font-bold text-[#090A09]">White</p>
                    <p className="font-mono text-sm text-gray-500">#FFFFFF</p>
                    <p className="text-sm text-gray-500">Card Backgrounds / Inverse Text</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#F3F3F5] shadow-sm border border-gray-200"></div>
                  <div>
                    <p className="font-serif font-bold text-[#090A09]">White Lilac</p>
                    <p className="font-mono text-sm text-gray-500">#F3F3F5</p>
                    <p className="text-sm text-gray-500">Subtle Backgrounds</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#737373] shadow-sm border border-gray-200"></div>
                  <div>
                    <p className="font-serif font-bold text-[#090A09]">Nickel</p>
                    <p className="font-mono text-sm text-gray-500">#737373</p>
                    <p className="text-sm text-gray-500">Muted Text / Borders</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#1A1B1A] shadow-sm border border-gray-200"></div>
                  <div>
                    <p className="font-serif font-bold text-[#090A09]">Rangoon Green</p>
                    <p className="font-mono text-sm text-gray-500">#1A1B1A</p>
                    <p className="text-sm text-gray-500">Dark Surface / Hover States</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border bg-white">
              <h4 className="text-lg font-semibold mb-4 text-[#090A09]">Text & Background Combinations</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded bg-[#090A09] text-[#D6D6DE] flex flex-col justify-center items-center text-center h-24 border border-[#090A09]">
                  <span className="text-sm font-bold mb-1">#D6D6DE</span>
                  <span className="text-xs opacity-75">on #090A09</span>
                </div>
                <div className="p-4 rounded bg-[#D6D6DE] text-[#090A09] flex flex-col justify-center items-center text-center h-24 border border-[#D6D6DE]">
                  <span className="text-sm font-bold mb-1">#090A09</span>
                  <span className="text-xs opacity-75">on #D6D6DE</span>
                </div>
                <div className="p-4 rounded bg-white text-[#090A09] flex flex-col justify-center items-center text-center h-24 border border-gray-200">
                  <span className="text-sm font-bold mb-1">#090A09</span>
                  <span className="text-xs opacity-75">on #FFFFFF</span>
                </div>
                <div className="p-4 rounded bg-[#090A09] text-white flex flex-col justify-center items-center text-center h-24 border border-[#090A09]">
                  <span className="text-sm font-bold mb-1">#FFFFFF</span>
                  <span className="text-xs opacity-75">on #090A09</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Guidelines List */}
          <Card className="p-6 border-border bg-muted h-full">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-foreground text-lg font-semibold">Application Rules</h4>
            </div>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#090A09] text-white flex items-center justify-center shrink-0 text-xs">1</div>
                <span><strong>High Contrast:</strong> Always ensure sufficient contrast between text and background. Log Cabin (#090A09) is safe on Mischka (#D6D6DE) and White.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#090A09] text-white flex items-center justify-center shrink-0 text-xs">2</div>
                <span><strong>Inverted Mode:</strong> When using a dark background (Log Cabin), use Mischka or White for typography. Avoid low-contrast combinations like Mischka on White.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#090A09] text-white flex items-center justify-center shrink-0 text-xs">3</div>
                <span><strong>Strict Monochrome:</strong> Do not introduce any colors outside of this grayscale palette. The brand identity relies on the interplay of these specific tones.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#090A09] text-white flex items-center justify-center shrink-0 text-xs">4</div>
                <span><strong>Texture over Color:</strong> Since the palette is limited, use texture, form, and light in photography to create visual interest instead of adding color.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Typography Best Practices */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Typography Best Practices</h3>
        <Card className="p-6 border-border">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="mb-4 flex items-center gap-2 text-foreground">
                <span>Do</span>
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use Merriweather only for large headings</li>
                <li>• Use Inter for all body text and UI</li>
                <li>• Maintain type hierarchy consistently</li>
                <li>• Keep line lengths between 50-75 characters</li>
                <li>• Use adequate line spacing (1.5-1.6 for body)</li>
                <li>• Ensure text meets WCAG AA standards</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 flex items-center gap-2 text-foreground">
                <span>Don't</span>
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Don't mix with other typefaces</li>
                <li>• Don't use Merriweather for body text</li>
                <li>• Don't set text smaller than 14px</li>
                <li>• Don't use all caps for long text</li>
                <li>• Don't use too many font weights</li>
                <li>• Don't ignore responsive typography</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Photography */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Photography & Imagery</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card className="overflow-hidden border-border">
              <div className="aspect-[3/4] relative bg-[#F3F3F5]">
                <img 
                  src={pineappleImg} 
                  alt="Pineapple with brand filter"
                  className="w-full h-full object-cover"
                  style={{ filter: 'url(#uz33kvj32d)' }}
                />
              </div>
            </Card>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>Processed:</strong> Apply the custom "Log Cabin" filter to all photography to ensure it aligns with the monochrome palette.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-foreground">Image Processing</h4>
              <p className="text-muted-foreground">
                All photography used in Material Lab branding should be processed using the specific SVG color matrix filter. This transforms full-color images into a rich, custom monochrome that matches our "Log Cabin" and "Mischka" palette.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-foreground">CSS Filter</h4>
              <div className="bg-muted p-4 rounded-lg border border-border overflow-x-auto">
                <code className="text-xs text-muted-foreground whitespace-pre font-mono">
                  filter: url("#uz33kvj32d");<br/>
                  -webkit-filter: url("#uz33kvj32d");
                </code>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-foreground">Subject Matter</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-foreground mt-0.5">•</span>
                  <span>Focus on texture, form, and light</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground mt-0.5">•</span>
                  <span>Avoid busy, cluttered compositions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground mt-0.5">•</span>
                  <span>Maintain high contrast and clarity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* General Guidelines */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">General Brand Principles</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 border-border">
            <h4 className="mb-2 text-foreground">Minimal</h4>
            <p className="text-sm text-muted-foreground">
              Keep designs clean and uncluttered. Use white space effectively. 
              Less is more in Material Lab's visual language.
            </p>
          </Card>

          <Card className="p-6 border-border">
            <h4 className="mb-2 text-foreground">Modern</h4>
            <p className="text-sm text-muted-foreground">
              Embrace contemporary design patterns. Use smooth animations and 
              interactions. Stay current with design trends.
            </p>
          </Card>

          <Card className="p-6 border-border">
            <h4 className="mb-2 text-foreground">Playful</h4>
            <p className="text-sm text-muted-foreground">
              Add subtle touches of personality. Use thoughtful design details. 
              Create delightful experiences.
            </p>
          </Card>
        </div>
      </div>

      {/* Contact */}
      <div>
        <Card className="p-8 bg-card border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl mb-3 font-serif text-foreground">Questions About Brand Usage?</h3>
            <p className="text-muted-foreground mb-6">
              If you need clarification on any branding guidelines or have a unique use case, 
              please reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="mailto:damini@materiallab.io"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#090A09] text-white rounded-lg hover:bg-[#090A09]/90 transition-colors"
              >
                Email Us
              </a>
              <a 
                href="https://www.linkedin.com/company/material-lab-io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
