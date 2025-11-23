import { Card } from "./ui/card";
import { Button } from "./ui/button";

const typographySpecs = [
  {
    level: "Display",
    example: "Building the Future",
    font: "Merriweather",
    weight: "700 (Bold)",
    size: "60px / 3.75rem",
    lineHeight: "1.1",
    usage: "Hero sections, landing pages",
  },
  {
    level: "H1",
    example: "Main Page Heading",
    font: "Merriweather",
    weight: "700 (Bold)",
    size: "48px / 3rem",
    lineHeight: "1.2",
    usage: "Page titles",
  },
  {
    level: "H2",
    example: "Section Heading",
    font: "Merriweather",
    weight: "700 (Bold)",
    size: "36px / 2.25rem",
    lineHeight: "1.3",
    usage: "Major sections",
  },
  {
    level: "H3",
    example: "Subsection Heading",
    font: "Inter",
    weight: "600 (Semi-bold)",
    size: "24px / 1.5rem",
    lineHeight: "1.4",
    usage: "Subsections, cards",
  },
  {
    level: "Body Large",
    example: "This is body text for reading. Clear, comfortable, and accessible.",
    font: "Inter",
    weight: "400 (Regular)",
    size: "18px / 1.125rem",
    lineHeight: "1.6",
    usage: "Introductions, lead paragraphs",
  },
  {
    level: "Body",
    example: "This is the default body text used throughout the application and website for general content.",
    font: "Inter",
    weight: "400 (Regular)",
    size: "16px / 1rem",
    lineHeight: "1.6",
    usage: "Default body text",
  },
  {
    level: "Body Small",
    example: "Smaller text for captions and supporting information that doesn't need as much prominence.",
    font: "Inter",
    weight: "400 (Regular)",
    size: "14px / 0.875rem",
    lineHeight: "1.5",
    usage: "Captions, metadata, labels",
  },
  {
    level: "Caption",
    example: "UPPERCASE LABELS AND TAGS",
    font: "Inter",
    weight: "500 (Medium)",
    size: "12px / 0.75rem",
    lineHeight: "1.4",
    usage: "Labels, tags, small UI elements",
  },
];

export function Typography() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl mb-4 font-serif text-foreground">Typography</h2>
        <p className="text-muted-foreground max-w-3xl">
          Material Lab uses Merriweather for display and headings to add personality, 
          paired with Inter for body text to ensure readability and clarity.
        </p>
      </div>

      {/* Font Families */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-8 bg-card border-border">
          <div className="mb-6">
            <h3 className="text-2xl mb-2 font-serif text-foreground">Merriweather</h3>
            <p className="text-sm text-muted-foreground">Display & Headings</p>
          </div>
          <div className="space-y-4 mb-6">
            <p className="font-serif text-4xl text-foreground">
              Aa Bb Cc
            </p>
            <p className="font-serif text-2xl text-foreground">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz</p>
            <p>0123456789 !@#$%^&*()</p>
          </div>
          <Button variant="outline" className="mt-6 w-full" asChild>
            <a href="https://fonts.google.com/specimen/Merriweather" target="_blank" rel="noopener noreferrer">
              View on Google Fonts
            </a>
          </Button>
        </Card>

        <Card className="p-8 bg-card border-border">
          <div className="mb-6">
            <h3 className="text-2xl mb-2 text-foreground">Inter</h3>
            <p className="text-sm text-muted-foreground">Body & UI Text</p>
          </div>
          <div className="space-y-4 mb-6">
            <p className="text-4xl text-foreground">
              Aa Bb Cc
            </p>
            <p className="text-2xl text-foreground">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz</p>
            <p>0123456789 !@#$%^&*()</p>
          </div>
          <Button variant="outline" className="mt-6 w-full" asChild>
            <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener noreferrer">
              View on Google Fonts
            </a>
          </Button>
        </Card>
      </div>

      {/* Type Scale */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Type Scale</h3>
        <Card className="divide-y divide-border border-border">
          {typographySpecs.map((spec) => (
            <div key={spec.level} className="p-6">
              <div className="grid md:grid-cols-[200px_1fr_300px] gap-6 items-start">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{spec.level}</p>
                  <p className="text-xs text-muted-foreground/70">{spec.font}</p>
                </div>
                <div>
                  <p 
                    className={spec.font === "Merriweather" ? "font-serif text-foreground" : "text-foreground"}
                    style={{ 
                      fontSize: spec.size.split('/')[0].trim(),
                      fontWeight: spec.weight.split(' ')[0],
                      lineHeight: spec.lineHeight
                    }}
                  >
                    {spec.example}
                  </p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Weight:</strong> {spec.weight}</p>
                  <p><strong className="text-foreground">Size:</strong> {spec.size}</p>
                  <p><strong className="text-foreground">Line Height:</strong> {spec.lineHeight}</p>
                  <p className="text-xs text-muted-foreground/80 pt-2">{spec.usage}</p>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Pairing Examples */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Pairing in Context</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 border-border">
            <h4 className="text-3xl mb-3 font-serif text-foreground">
              Build faster with AI
            </h4>
            <p className="text-muted-foreground mb-4">
              Custom workflows, websites, apps, automation, and GTM systems 
              that move real metrics. No decks, no layers, just results.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Merriweather heading + Inter body text
            </p>
          </Card>

          <Card className="p-8 border-border">
            <div className="inline-block px-3 py-1 bg-muted rounded text-xs uppercase tracking-wider text-muted-foreground mb-4 border border-border">
              Case Study
            </div>
            <h4 className="text-3xl mb-3 font-serif text-foreground">
              Perhitsiksha
            </h4>
            <p className="text-muted-foreground mb-4">
              Website, tailor-made workflows, CRM automation, and sales systems 
              for an education platform serving 10,000+ students.
            </p>
            <p className="text-sm text-muted-foreground/70">
              All three levels working together
            </p>
          </Card>
        </div>
      </div>

      {/* Best Practices */}
      <div>
        <h3 className="text-2xl mb-6 text-foreground">Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border-foreground/20 bg-muted/50">
            <div className="flex items-center gap-2 mb-3">
               <h4 className="text-foreground font-medium">Do</h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use Merriweather for large headings and titles</li>
              <li>• Use Inter for all body text and UI elements</li>
              <li>• Maintain consistent line heights for readability</li>
              <li>• Use weight variations to create hierarchy</li>
              <li>• Keep body text between 16-18px for optimal reading</li>
            </ul>
          </Card>

          <Card className="p-6 border-border bg-transparent opacity-70">
             <div className="flex items-center gap-2 mb-3">
               <h4 className="text-muted-foreground font-medium">Don't</h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Don't use Merriweather for body text</li>
              <li>• Don't mix with other font families</li>
              <li>• Don't use too many font weights (stick to 400, 600, 700)</li>
              <li>• Don't make body text smaller than 14px</li>
              <li>• Don't use all caps for long paragraphs</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
