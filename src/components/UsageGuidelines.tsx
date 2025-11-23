import { Card } from "./ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

const logo = "https://img.notionusercontent.com/ext/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fpublic.notion-static.com%2F0c2aa0c2-6343-48c9-bef0-31a6e04e45bb%2Flogo_static.svg/size/?exp=1763637781&sig=lpSzeJ9hnq_Tk2rEwf6jWebPv3ONXuRT1Vu76bGsDrg&id=2a320d43-82ef-80a5-87cf-007a2b11c48c&table=custom_emoji";

export function UsageGuidelines() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-4xl mb-4 font-serif">Usage Guidelines</h2>
        <p className="text-neutral-600 max-w-3xl">
          Follow these guidelines to ensure consistent and proper use of Material Lab branding 
          across all applications. When in doubt, keep it simple and minimal.
        </p>
      </div>

      {/* Logo Do's and Don'ts */}
      <div>
        <h3 className="text-2xl mb-6">Logo Usage</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Do's */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-neutral-900" />
              <h4 className="text-lg">Do</h4>
            </div>
            
            <Card className="p-6 border-neutral-300">
              <div className="bg-white rounded p-8 mb-3 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Material Lab Logo"
                  className="h-20 object-contain"
                />
              </div>
              <p className="text-sm text-neutral-600">Use the logo at its original proportions</p>
            </Card>

            <Card className="p-6 border-neutral-300">
              <div className="bg-neutral-900 rounded p-8 mb-3 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Material Lab Logo"
                  className="h-20 object-contain"
                />
              </div>
              <p className="text-sm text-neutral-600">Use on both light and dark backgrounds</p>
            </Card>

            <Card className="p-6 border-neutral-300">
              <div className="bg-white rounded p-8 mb-3 flex items-center justify-center border-2 border-dashed border-neutral-300">
                <div className="p-4">
                  <img 
                    src={logo} 
                    alt="Material Lab Logo"
                    className="h-16 object-contain"
                  />
                </div>
              </div>
              <p className="text-sm text-neutral-600">Maintain adequate clear space</p>
            </Card>
          </div>

          {/* Don'ts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-neutral-900" />
              <h4 className="text-lg">Don't</h4>
            </div>

            <Card className="p-6 border-neutral-300">
              <div className="bg-white rounded p-8 mb-3 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Don't stretch"
                  className="h-16 w-32 object-fill opacity-50"
                />
              </div>
              <p className="text-sm text-neutral-600">Don't distort or stretch the logo</p>
            </Card>

            <Card className="p-6 border-neutral-300">
              <div className="bg-white rounded p-8 mb-3 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Material Lab Logo"
                  className="h-20 object-contain opacity-50"
                />
              </div>
              <p className="text-sm text-neutral-600">Don't change logo colors or apply effects</p>
            </Card>

            <Card className="p-6 border-neutral-300">
              <div className="bg-white rounded p-8 mb-3 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Don't use too small"
                  className="h-8 object-contain opacity-50"
                />
              </div>
              <p className="text-sm text-neutral-600">Don't use below minimum size (44px)</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Wordmark Typography */}
      <div>
        <h3 className="text-2xl mb-6">Wordmark Typography</h3>
        <Card className="p-8">
          <div className="bg-neutral-50 rounded-lg p-12 flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              <h4 className="text-5xl font-serif mb-4">Material Lab</h4>
              <p className="text-sm text-neutral-600">
                The "Material Lab" wordmark must always be set in <strong>Merriweather</strong> font.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Color Usage */}
      <div>
        <h3 className="text-2xl mb-6">Color Application</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border-neutral-300 bg-neutral-50">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-neutral-900" />
              <h4>Correct Usage</h4>
            </div>
            <ul className="space-y-3 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 mt-0.5">•</span>
                <span>Use grayscale palette for all branding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 mt-0.5">•</span>
                <span>Apply neutral tones consistently</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 mt-0.5">•</span>
                <span>Ensure sufficient contrast for text readability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 mt-0.5">•</span>
                <span>Use appropriate color mode for the background</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 mt-0.5">•</span>
                <span>Maintain consistency across touchpoints</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 border-neutral-300 bg-neutral-50">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-neutral-900" />
              <h4>Avoid</h4>
            </div>
            <ul className="space-y-3 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 mt-0.5">•</span>
                <span>Don't introduce any colors beyond grayscale</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 mt-0.5">•</span>
                <span>Don't use colored accents or gradients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 mt-0.5">•</span>
                <span>Don't use light text on light backgrounds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 mt-0.5">•</span>
                <span>Don't modify the monochrome palette</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 mt-0.5">•</span>
                <span>Don't use busy or patterned backgrounds</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Typography Best Practices */}
      <div>
        <h3 className="text-2xl mb-6">Typography Best Practices</h3>
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-neutral-900" />
                <span>Do</span>
              </h4>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>• Use Merriweather only for large headings</li>
                <li>• Use Inter for all body text and UI</li>
                <li>• Maintain type hierarchy consistently</li>
                <li>• Keep line lengths between 50-75 characters</li>
                <li>• Use adequate line spacing (1.5-1.6 for body)</li>
                <li>• Ensure text meets WCAG AA standards</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-neutral-900" />
                <span>Don't</span>
              </h4>
              <ul className="space-y-2 text-sm text-neutral-700">
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

      {/* General Guidelines */}
      <div>
        <h3 className="text-2xl mb-6">General Brand Principles</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="mb-2">Minimal</h4>
            <p className="text-sm text-neutral-600">
              Keep designs clean and uncluttered. Use white space effectively. 
              Less is more in Material Lab's visual language.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h4 className="mb-2">Modern</h4>
            <p className="text-sm text-neutral-600">
              Embrace contemporary design patterns. Use smooth animations and 
              interactions. Stay current with design trends.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h4 className="mb-2">Playful</h4>
            <p className="text-sm text-neutral-600">
              Add subtle touches of personality. Use thoughtful design details. 
              Create delightful experiences.
            </p>
          </Card>
        </div>
      </div>

      {/* Contact */}
      <div>
        <Card className="p-8 bg-gradient-to-br from-neutral-50 to-white border-neutral-200">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl mb-3 font-serif">Questions About Brand Usage?</h3>
            <p className="text-neutral-600 mb-6">
              If you need clarification on any branding guidelines or have a unique use case, 
              please reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="mailto:damini@materiallab.io"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Email Us
              </a>
              <a 
                href="https://www.linkedin.com/company/material-lab-io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
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