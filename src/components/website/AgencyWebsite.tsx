import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { 
  ArrowUpRight, 
  MessageSquare, 
  LineChart, 
  RefreshCw, 
  Hammer, 
  Target, 
  AppWindow, 
  Bot, 
  Users, 
  MessageCircle, 
  Linkedin, 
  Twitter, 
  Github, 
  BookOpen,
  ArrowRight,
  Menu,
  X,
  Cpu,
  Database,
  Globe,
  Shield,
  Check
} from "lucide-react";
import { PrismScene } from "./PrismScene";
import { Cursor } from "../ui/Cursor";
import { Grain } from "../ui/Grain";
import { VerticalParallaxScroll } from "./scroll/VerticalParallaxScroll";
import { HorizontalScrollText } from "./scroll/HorizontalScrollText";
import { ParallaxLogoCarousel } from "./scroll/ParallaxLogoCarousel";
import { Card, ImageContainer } from "../ui/CardSystem";
import { CapabilitiesPage } from "./pages/CapabilitiesPage";
import { MotionPinnedSection } from "../MotionPinnedSection";
import { TOKENS, LAYOUT, TYPOGRAPHY } from "./design-system";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { IconButton } from "../ui/icon-button";
import { ScrollProgress } from "../ui/ScrollProgress";

// --- Data ---

const capabilitiesData = [
  {
    title: "The Vision Sprint",
    subhead: "For founders with a napkin sketch who need a smart first stab.",
    description: "Validate before you build. In just two weeks, we turn your raw concept into a tangible roadmap. You walk away with a high-fidelity prototype you can put in front of investors and a technical plan that proves it’s actually buildable. Low risk, high clarity.",
    features: [
      { label: "Deliverables", text: "Clickable UI Prototype, User Journey Mapping, Technical Feasibility Audit" },
      { label: "Tools", text: "Figma, FigJam, System Architecture Design" },
      { label: "Timeline", text: "2 Weeks Fixed Price" }
    ]
  },
  {
    title: "The MVP Launchpad",
    subhead: "For founders ready to go from zero to one.",
    description: "A market-ready product, not just a demo. We handle the security, database structure, and API architecture so you can focus on your first customers. We build to launch, but we architect for scale to ensure you don't have to rebuild the moment you find traction.",
    features: [
      { label: "Deliverables", text: "Fully functional Web or Mobile App, Admin Dashboard, Analytics Integration" },
      { label: "Stack", text: "React/Next.js, React Native, Supabase/Postgres, Vercel" },
      { label: "Timeline", text: "8–12 Weeks Typical" }
    ]
  },
  {
    title: "The Growth Engine",
    subhead: "For companies that need to convert traffic into revenue.",
    description: "Websites that pull their weight. We combine clear storytelling with performance engineering to build digital experiences that convert. We don't deliver empty templates; we use AI to structure content and programmatic pages that keep up with your growth.",
    features: [
      { label: "Deliverables", text: "High-Performance Website, Brand Identity System, Headless CMS" },
      { label: "Stack", text: "Framer, Webflow, or Custom Next.js; Programmatic SEO Setup" },
      { label: "Timeline", text: "4–8 Weeks" }
    ]
  },
  {
    title: "Workflow OS",
    subhead: "For teams drowning in busywork.",
    description: "Your operations, on autopilot. We tuck autonomous agents into the tools you already use, like Slack, Email, and CRM, to handle the messy, manual work. Your team focuses on judgment; the software handles the rest.",
    features: [
      { label: "Deliverables", text: "Custom RAG Agents Chat with your data, CRM Automations, Support Triage Bots" },
      { label: "Stack", text: "Python, LangChain, OpenAI API, Zapier/Make" },
      { label: "Timeline", text: "Rolling Implementation" }
    ]
  },
  {
    title: "The Partner Pod Retainer",
    subhead: "For founders who need a technical co-founder, without the equity split.",
    description: "A dedicated product team, integrated into your Slack. You don't get hours; you get a Pod, a Strategist, Designer, and Engineer who attend your standups and obsess over your metrics. We build clean, maintainable code because we know we’ll be the ones maintaining it.",
    features: [
      { label: "Team", text: "1 Product Manager, 1 Product Designer, 1 Full-Stack Engineer" },
      { label: "Rituals", text: "Daily Standups, Weekly Sprints, Shared Slack Channel" },
      { label: "Terms", text: "Monthly Subscription. Pause or cancel anytime." }
    ]
  }
];

const methodology = [
  {
    title: 'Ideation: The Whiteboard Session',
    description: 'Got a napkin sketch? Let\'s talk. No pitch decks, no sales scripts. Just a working session to see if your idea has legs. We help you take a smart first stab at the concept before you commit a real budget.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80', // People collaborating warmly
  },
  {
    title: 'Build: Transparency & Quality',
    description: 'Quality You Feel. We don\'t throw specs over a wall. We join your Slack, attend your standups, and integrate with your workflow. We handle the complex engineering under the hood so your users get an experience that just works.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80', // Team working together
  },
  {
    title: 'Grow: The Outcome',
    description: 'Impact Outcomes, Not Outputs. We don\'t just ship code; we build engines for revenue. Under the hood, it\'s complex, state-of-the-art tech. On the surface, it\'s friction-free and built to scale.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', // Celebration/success moment
  }
];

const clientLogos = [
   { name: 'Y Combinator', src: '' },
   { name: 'TechStars', src: '' },
   { name: 'Linear', src: '' },
   { name: 'Basecamp', src: '' },
   { name: 'Vercel', src: '' },
   { name: 'Supabase', src: '' },
   { name: 'OpenAI', src: '' },
];

const coreValues = [
    { title: "Plain English Defaults", desc: "We replace the Black Box of development with a Glass Box. We explain the architecture in terms that make sense for your business, so you never feel like an outsider." },
    { title: "Code is a Liability", desc: "More code means more maintenance. We fight to write less code that does more, using automation to handle the heavy lifting." },
    { title: "People Over Pixels", desc: "We don't design for awards; we design for utility. We obsess over the feel of the software until it works effortlessly." }
];

const socialLinks = [
  { href: 'http://wa.me/918050131733', icon: MessageCircle },
  { href: 'https://www.linkedin.com/company/material-lab-io/', icon: Linkedin },
  { href: 'https://x.com/kaushiknaarayan', icon: Twitter },
  { href: 'https://github.com/material-lab-io', icon: Github },
  { href: 'https://blog.kaushiknaarayan.me/', icon: BookOpen }
];

const founders = [
  { name: 'Damini Rathi', href: 'https://www.linkedin.com/in/daminirathi', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face' }, // Professional woman smiling
  { name: 'Kaushik Naarayan', href: 'https://www.linkedin.com/in/kaushik-naarayan/', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' } // Professional man
];

const navLinks = [
  { href: '#how-we-work', label: 'How We Work' },
  { href: '#work', label: 'Work' },
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#contact', label: 'Contact' }
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--duration-slower)] ease-[var(--ease-out)] border-b ${scrolled ? 'bg-background/90 backdrop-blur-lg border-white/5 py-4' : 'bg-transparent border-transparent py-6 md:py-8'}`}>
        <div className={`w-full ${TOKENS.padding.container} flex justify-between items-center`}>
          <a href="#" className="relative z-50 mix-blend-difference text-white group interactive">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] group-hover:tracking-tight">Material Lab</span>
          </a>

          <div className="hidden md:flex items-center gap-10 mix-blend-difference text-white">
            {navLinks.map((item) => (
               <a key={item.href} href={item.href} className="relative text-xs font-mono uppercase tracking-[0.2em] hover:text-primary transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] interactive group">
                 {item.label}
                 <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] group-hover:w-full" />
               </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button href="mailto:damini@materiallab.io" variant="outline" size="sm">
               Contact
            </Button>
          </div>

          <button className="md:hidden text-white relative z-50 interactive p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background flex items-center justify-center animate-in fade-in duration-[var(--duration-normal)]">
          <div className="flex flex-col items-center gap-10">
            {navLinks.map((item, i) => (
               <a
                 key={item.href}
                 href={item.href}
                 className="text-4xl font-serif text-white hover:text-primary transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] interactive"
                 onClick={() => setMobileOpen(false)}
                 style={{ animationDelay: `${i * 50}ms` }}
               >
                 {item.label}
               </a>
            ))}
             <Button href="mailto:damini@materiallab.io" variant="primary" className="mt-8">
               Contact
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

// --- Footer Sub-Components ---

// FooterLink with Rise at Seven text-slide hover animation
function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="group inline-flex text-background font-medium text-lg lg:text-xl hover:text-primary transition-colors interactive">
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out)] pointer-fine:group-hover:-translate-y-7">
          {children}
        </div>
        <div className="transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out)] absolute top-0 left-0 translate-y-7 pointer-fine:group-hover:translate-y-0 text-primary">
          {children}
        </div>
      </div>
    </a>
  );
}

// SocialPill with pill-style social buttons (Rise at Seven style)
function SocialPill({ href, icon: Icon }: { href: string; icon: React.ComponentType<{ size?: number }> }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-x-2 rounded-xl text-xs px-3 py-2 bg-background text-foreground transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] pointer-fine:hover:rounded-sm interactive group"
    >
      <Icon size={14} />
      <ArrowUpRight size={12} className="transition-transform duration-[var(--duration-fast)] pointer-fine:group-hover:rotate-45" />
    </a>
  );
}

// Connect column links
const connectLinks = [
  { href: 'mailto:damini@materiallab.io', label: 'damini@materiallab.io' },
  { href: 'https://wa.me/918050131733', label: 'WhatsApp' },
];

export function AgencyWebsite() {
  const [view, setView] = useState<'home' | 'capabilities'>('home');
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {

      // --- Hero Entrance Animation ---
      const heroTl = gsap.timeline({ delay: 0.3 });

      // Split hero title words for staggered animation
      heroTl.from(".hero-title", {
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out"
      })
      .from(".hero-sub p", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=1")
      .from(".hero-sub .flex", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      // Hero Parallax Effect
      gsap.to(".hero-title", {
         yPercent: -50,
         opacity: 0.3,
         ease: "none",
         scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.5
         }
      });

      // --- Section Label Animations ---
      const sectionLabels = gsap.utils.toArray('.section-label');
      sectionLabels.forEach((label: any) => {
        gsap.from(label, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: label,
            start: "top 85%"
          }
        });
      });

      // --- Enhanced Fade Up with Scale ---
      const fadeUps = gsap.utils.toArray('.fade-up');
      fadeUps.forEach((elem: any) => {
        gsap.from(elem, {
          y: 60,
          opacity: 0,
          scale: 0.98,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 88%"
          }
        });
      });

      // --- Capabilities Cards Stagger Animation ---
      const capCards = gsap.utils.toArray('.capability-card');
      gsap.from(capCards, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".capabilities-grid",
          start: "top 80%"
        }
      });

      // --- Core Values Stagger ---
      const coreValueItems = gsap.utils.toArray('.core-value-item');
      gsap.from(coreValueItems, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".core-values-grid",
          start: "top 85%"
        }
      });

      // --- Manifesto Section Reveal ---
      gsap.from(".manifesto-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "top 75%"
        }
      });

      gsap.from(".manifesto-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto-content",
          start: "top 80%"
        }
      });

      // --- Quote Section Animation ---
      gsap.from(".quote-section", {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".quote-section",
          start: "top 80%"
        }
      });

      // --- Featured Work Section ---
      // Parallax disabled for now - first testing basic layout
      // TODO: Add parallax scroll back once layout is working

      // --- Footer Reveal Animation ---
      gsap.from(".footer-cta", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-cta",
          start: "top 90%"
        }
      });

      // --- Parallax Background Elements ---
      const parallaxBgs = gsap.utils.toArray('.parallax-bg');
      parallaxBgs.forEach((bg: any) => {
        gsap.to(bg, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: bg,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  if (view === 'capabilities') {
    return <CapabilitiesPage onBack={() => setView('home')} />;
  }

  return (
    <div ref={mainRef} className="bg-background text-white min-h-screen w-full selection:bg-primary/30 selection:text-white font-sans cursor-none">
      <ScrollProgress />
      <Grain />
      <Cursor />
      <Nav />
      
      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 bg-background">
        
        {/* --- SECTION 1: HERO --- */}
        <section className={`hero-section relative min-h-screen flex flex-col justify-center items-center ${TOKENS.padding.container} overflow-hidden pt-24 pb-16`}>
          <div className="absolute inset-0 z-0">
              <PrismScene />
          </div>

          <div className="relative z-10 w-full max-w-none flex flex-col items-center text-center">
              {/* Billboard Typography - More breathing room */}
              <h1 className={`${TYPOGRAPHY.display} hero-title text-white mix-blend-difference mb-16 max-w-5xl leading-[1.02]`}>
                Your Extended Product Team.
              </h1>

              <div className="hero-sub max-w-2xl mx-auto text-center space-y-12">
                <p className={`${TYPOGRAPHY.bodyLarge} text-muted-foreground leading-[1.8]`}>
                    Material Lab turns raw ideas into digital products that feel right. We are the partners you call when you want to take a smart first stab at a new concept, or build a platform that actually moves the needle.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <Button href="#contact" variant="primary">Book a Whiteboard Session</Button>
                    <Button href="#work" variant="secondary">See The Work</Button>
                </div>
              </div>
          </div>

          {/* Subtle scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 animate-pulse">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </section>

        {/* --- SECTION 2: MARQUEE (Trust Bar) --- */}
        <section className="relative bg-background z-10 border-t border-white/5">
            <div className="pt-12 text-center fade-up">
                <span className={`${TYPOGRAPHY.label} text-white/40 section-label`}>Building alongside founders at:</span>
            </div>
           <ParallaxLogoCarousel logos={clientLogos} className="py-12" />
        </section>

        {/* --- SECTION 2.5: CAPABILITIES CTA (Redesigned) --- */}
        <section className="relative bg-background z-10 pb-32" id="capabilities">
           <div className={LAYOUT.container}>

              {/* Header Grid */}
              <div className="fade-up grid grid-cols-12 gap-y-8 mb-12 md:mb-24 pt-24 border-b border-white/10 pb-8">
                 <div className="col-span-12 md:col-span-9 flex items-end">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white flex flex-wrap items-center gap-x-4 md:gap-x-6">
                       <span>Our</span>
                       <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/10 rotate-3 hover:rotate-0 transition-transform duration-500">
                          <img
                             src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&q=80"
                             alt="Services"
                             className="w-full h-full object-cover"
                          />
                       </div>
                       <span>Services</span>
                    </h2>
                 </div>
                 <div className="col-span-12 md:col-span-3 flex items-end justify-start md:justify-end">
                    <div onClick={() => setView('capabilities')}>
                       <Button variant="white" size="sm">
                          View All Services
                       </Button>
                    </div>
                 </div>
              </div>

              {/* Cards Grid */}
              <div className="capabilities-grid grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-px bg-white/10 border-t border-white/10">
                 {capabilitiesData.map((cap, i) => (
                    <div
                       key={i}
                       className="capability-card group relative bg-background border-b border-white/10 overflow-hidden h-[300px] md:h-[400px] cursor-pointer interactive"
                       onClick={() => setView('capabilities')}
                    >
                       {/* Default Content */}
                       <div className="relative z-20 h-full flex flex-col justify-between p-8 md:p-12 transition-colors duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:text-white">
                          <div className="flex justify-between items-start">
                             <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                                <span className="text-white/30 font-mono text-sm font-medium">0{i + 1}</span>
                             </div>
                             <ArrowUpRight className="w-8 h-8 text-white/30 transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-primary group-hover:scale-110" />
                          </div>

                          <div>
                             <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out)] group-hover:-translate-y-2">
                                {cap.title}
                             </h3>
                             <p className="text-muted-foreground/60 max-w-md transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] group-hover:opacity-0 group-hover:translate-y-4">
                                {cap.subhead}
                             </p>
                          </div>
                       </div>

                       {/* Hover Background Image Reveal */}
                       <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-slower)] ease-[var(--ease-out)] pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
                          <img
                             src={[
                               "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
                               "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
                               "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
                               "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
                               "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=80"
                             ][i] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"}
                             className="w-full h-full object-cover scale-110 transition-transform duration-[var(--duration-slowest)] ease-[var(--ease-out-expo)] group-hover:scale-100"
                             alt={cap.title}
                          />
                       </div>
                    </div>
                 ))}
              </div>

           </div>
        </section>

        {/* --- SECTION 3: THE MANIFESTO --- */}
        <section className={`${LAYOUT.sectionCurved} manifesto-section`} id="manifesto">
          <div className={LAYOUT.container}>
              <div className={TOKENS.grid.main}>
                  <div className="lg:col-span-8">
                    <h2 className={`${TYPOGRAPHY.h1} text-white sticky top-32 manifesto-title`}>
                        Software should feel effortless.
                    </h2>
                  </div>
                  <div className="lg:col-span-12 space-y-12 manifesto-content">
                    <div className="space-y-6">
                        <h3 className={`${TYPOGRAPHY.h2} text-primary`}>The craft of a studio. The heart of a team.</h3>
                        <p className={`${TYPOGRAPHY.bodyLarge} text-muted-foreground leading-relaxed`}>
                            Too many great ideas fail because of messy execution. We built Material Lab to fix that. We aren't a run-of-the-mill agency. We are professional, accountable, and obsessively collaborative.
                        </p>
                        <p className={`${TYPOGRAPHY.bodyLarge} text-muted-foreground leading-relaxed`}>
                            We don't just deliver a service; we co-own the outcome. We integrate with your workflows, debate the strategy, and build software that simply feels better to use.
                        </p>
                    </div>

                    <div className="core-values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12 border-t border-white/10">
                        {coreValues.map((value, i) => (
                            <div key={i} className="core-value-item space-y-3">
                                <h4 className="text-white font-serif text-xl">{value.title}</h4>
                                <p className={`${TYPOGRAPHY.body} text-white/60`}>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                  </div>
              </div>
          </div>
        </section>

        {/* --- SECTION 4: THE HANDSHAKE --- */}
        <section className={LAYOUT.section} id="handshake">
            <div className={LAYOUT.container}>
                <div className="quote-section max-w-4xl mx-auto text-center border border-white/10 rounded-3xl p-10 md:p-20 bg-white/[0.02] backdrop-blur-sm transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] hover:border-primary/30 hover:shadow-[var(--glow-subtle)]">
                    <span className={`${TYPOGRAPHY.label} text-primary mb-8 block section-label`}>A Note from the Team</span>
                    <blockquote className="font-serif text-2xl md:text-4xl text-white leading-relaxed mb-8">
                        "We treat your budget like it's our own money. If a feature doesn't add value, we'll kill it before we bill for it. No lock-in contracts. You own the code from Day 1."
                    </blockquote>
                </div>
            </div>
        </section>

        {/* --- SECTION 5: HOW WE WORK (Methodology) --- */}
        <section className="relative bg-background" id="how-we-work">
            <div className={LAYOUT.container}>
               <div className="py-24">
                 <span className={`${TYPOGRAPHY.label} text-primary mb-4 block section-label`}>Methodology</span>
                 <h2 className={`${TYPOGRAPHY.h1} max-w-4xl mb-4 fade-up`}>
                     Professional like a firm. Personal like a co-founder.
                 </h2>
                 <p className={`${TYPOGRAPHY.bodyLarge} text-white/60 fade-up`}>You handle the vision. We handle the heavy lifting.</p>
               </div>
            </div>
            <VerticalParallaxScroll items={methodology} />
        </section>

        {/* --- SECTION 6: FEATURED WORK --- */}
        <MotionPinnedSection />

        {/* --- BOOK A SESSION (Horizontal Scroll) --- */}
        <section className="relative z-20 bg-background" id="contact">
           <HorizontalScrollText text="Book a Whiteboard Session — Let's Build" />
        </section>
      
      </main>

      {/* --- FOOTER (Rise at Seven inspired) --- */}
      <footer className={`bg-foreground text-background pt-14 pb-6 ${TOKENS.padding.container} relative overflow-hidden`}>

        {/* Main Footer Grid - 12 column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-5 gap-y-7">

          {/* LEFT COLUMN: CTA + Social + Founders */}
          <div className="lg:col-span-4 space-y-10 mb-10 lg:mb-0">

            {/* CTA Section */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-background leading-tight">
                Got a project<br />in mind?
              </h2>
              <Button
                href="https://wa.me/918050131733"
                variant="primary"
                size="lg"
                className="group"
              >
                <MessageCircle size={18} className="mr-2" />
                Text Us
                <ArrowUpRight size={16} className="ml-2 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>

            {/* Social Pills */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link, i) => (
                <SocialPill key={i} href={link.href} icon={link.icon} />
              ))}
            </div>

            {/* Founders */}
            <div className="space-y-6 pt-6 border-t border-black/10">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-black/40">Founders</h4>
              <div className="flex flex-col gap-4">
                {founders.map((founder) => (
                  <a
                    key={founder.name}
                    href={founder.href}
                    className="flex items-center gap-4 group interactive"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-black/10 flex-shrink-0">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[var(--duration-slow)]"
                      />
                    </div>
                    <span className="text-background/70 group-hover:text-background transition-colors duration-[var(--duration-normal)]">
                      {founder.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Link Columns with border-l separators */}
          <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-2 gap-x-5">

            {/* Sitemap Column */}
            <div className="border-l border-black/20 pl-4">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-6">Sitemap</h5>
              <ul className="space-y-3">
                {navLinks.map(item => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Column */}
            <div className="border-l border-black/20 pl-4">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-6">Connect</h5>
              <ul className="space-y-3">
                {connectLinks.map(link => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Brand Wordmark - Massive scale */}
        <div className="mt-10 lg:mt-24 -mx-6 md:-mx-12 lg:-mx-20 overflow-hidden">
          <h2 className="text-[18vw] md:text-[16vw] lg:text-[14vw] font-serif leading-[0.8] text-black/[0.04] select-none tracking-tighter pointer-events-none text-center whitespace-nowrap">
            Material Lab
          </h2>
        </div>

        {/* Legal Bar with dot separators */}
        <div className="mt-8 lg:mt-0 pt-6 border-t border-black/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-black/40 font-mono text-[10px] uppercase tracking-widest">
              <span>© 2025 Material Lab</span>
              <span className="hidden md:inline">•</span>
              <a href="#" className="hover:text-primary transition-colors interactive hidden md:inline">Privacy</a>
              <span className="hidden md:inline">•</span>
              <a href="#" className="hover:text-primary transition-colors interactive hidden md:inline">Terms</a>
            </div>
            <div className="text-black/30 font-mono text-[9px] uppercase tracking-wider">
              Building delightful things for good people.
            </div>
          </div>
        </div>

      </footer>

    </div>
  );
}
