import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  Shield
} from "lucide-react";
import { PrismScene } from "./PrismScene";
import { CustomCursor } from "./CustomCursor";
import { GrainOverlay } from "./GrainOverlay";
import { SlackNotification, FigmaCanvas, GithubCommits } from "../visuals/ProofOfWork";
import { VerticalParallaxScroll } from "./scroll/VerticalParallaxScroll";
import { HorizontalScrollText } from "./scroll/HorizontalScrollText";
import { ParallaxLogoCarousel } from "./scroll/ParallaxLogoCarousel";

gsap.registerPlugin(ScrollTrigger);

// --- Design System Tokens ---

const TOKENS = {
  padding: {
    section: "py-20 lg:py-32",
    container: "px-7 md:px-14", // p-7 (~28px) / px-14 (~56px)
    card: "p-7 md:p-12",
  },
  grid: {
    main: "grid grid-cols-1 lg:grid-cols-20 gap-y-10 lg:gap-x-10", // The 20-column grid
    thirds: "grid grid-cols-1 md:grid-cols-3 gap-10",
  },
  geometry: {
    rounded: "rounded-3xl", // rounded-2xl / rounded-3xl
    roundedSection: "rounded-[2.5rem]",
  },
  heights: {
    hero: "min-h-screen",
    cardMobile: "h-[50vh]", // increased for iceberg
    cardDesktop: "lg:h-[90vh]",
  }
};

const LAYOUT = {
  container: `w-full mx-auto relative z-10 ${TOKENS.padding.container}`,
  section: `${TOKENS.padding.section} relative overflow-hidden`,
  sectionCurved: `${TOKENS.padding.section} relative overflow-hidden ${TOKENS.geometry.roundedSection} my-4 mx-2 md:mx-4 bg-[#090909] border border-white/5`,
  card: `bg-[#090909] border border-white/10 ${TOKENS.geometry.rounded} ${TOKENS.padding.card}`,
};

const TYPOGRAPHY = {
  // Huge responsive sizes for billboard effect
  display: "font-serif text-[16vw] font-bold tracking-[-0.04em] leading-[0.85]", 
  h1: "font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.1]",
  h2: "font-serif text-2xl md:text-3xl font-normal tracking-normal leading-[1.3]",
  bodyLarge: "font-sans text-lg md:text-2xl font-light tracking-wide leading-[1.6]",
  body: "font-sans text-sm md:text-base font-normal tracking-normal leading-[1.7]",
  label: "font-mono text-[10px] md:text-[11px] font-medium uppercase tracking-[0.25em] leading-[1.4]"
};

// --- Data ---

const capabilities = [
  {
    title: 'AUTOMATE',
    description: 'We tuck LLMs and autonomous agents into the tools you already use.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
  },
  {
    title: 'BUILD',
    description: 'Go from "I have an idea" to people actually using it.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  },
  {
    title: 'SCALE',
    description: 'Scale your sales engine without scaling headcount.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    title: 'CONVERT',
    description: 'We build websites and brand systems that actually pull their weight.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
  }
];

const clientLogos = [
   { name: 'Linear', src: '' },
   { name: 'Basecamp', src: '' },
   { name: 'Vercel', src: '' },
   { name: 'Supabase', src: '' },
   { name: 'OpenAI', src: '' },
   { name: 'Framer', src: '' },
];

const caseStudies = [
  { name: 'Perhitsiksha', tag: 'Website, CRM, Sales', tagColor: 'text-[#17f7f7]', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', description: 'Website, tailor-made workflows, CRM automation', badge: 'Full Stack', badgeIcon: Bot },
  { name: 'White Space Studio', tag: 'AI Automation', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', description: 'AI automation for project costing & docs', badge: 'Architecture', badgeIcon: AppWindow },
  { name: 'CargoSphere', tag: 'GTM & Website', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80', description: 'Go-to-market for global cargo-tech expansion' },
  { name: 'TMEN Systems', tag: 'Sales Enablement', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', description: 'Sales enablement and GTM systems' },
  { name: 'Cargomen', tag: 'ERP Automation', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', description: 'Automated credit control, support workflows, dashboards' },
  { name: 'Alamirap Nutrition', tag: 'Lead Funnels', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', description: 'End-to-end automation for lead funnels & CRM' },
  { name: 'JB Singh & Sons', tag: 'Website + AI', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80', description: 'Website and AI automation workflows' },
  { name: 'Numbers', tag: 'Learning App', image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&q=80', description: 'Custom learning app to practice mental maths' },
  { name: 'Birdsong', tag: 'Mobile App', image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80', description: 'Location-aware birding app; collect birds by listening', badge: 'Mobile App', badgeIcon: Users },
  { name: 'Troupex', tag: 'Coming Soon', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80', description: 'Social network for entertainment professionals', badge: 'Coming Soon', badgeIcon: RefreshCw }
];

const reasons = [
  { icon: RefreshCw, title: 'Small team, real partnership', description: 'You work with us directly. No layers, no runaround.' },
  { icon: Hammer, title: 'Built for your workflow', description: 'Everything we build fits how your team already operates: tools, rituals, constraints.' },
  { icon: Target, title: 'Metric-first delivery', description: 'We don\'t sell features. We solve problems.' },
  { icon: AppWindow, title: 'Production, not prototypes', description: 'We stay through evaluations, rollout, and reliability so the system is actually used.' },
  { icon: Bot, title: 'AI where it counts', description: 'We use LLMs and agents only where they reduce cost, time, or complexity. Nowhere else.' },
  { icon: Users, title: 'A tech team for non-technical teams', description: 'Most of our clients are strong in ops or marketing, not engineering. We handle "everything tech" so you can focus on the business.' }
];

const socialLinks = [
  { href: 'http://wa.me/918050131733', icon: MessageCircle },
  { href: 'https://www.linkedin.com/company/material-lab-io/', icon: Linkedin },
  { href: 'https://x.com/kaushiknaarayan', icon: Twitter },
  { href: 'https://github.com/material-lab-io', icon: Github },
  { href: 'https://blog.kaushiknaarayan.me/', icon: BookOpen }
];

const founders = [
  { name: 'Damini Rathi', href: 'https://www.linkedin.com/in/daminirathi', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { name: 'Kaushik Naarayan', href: 'https://www.linkedin.com/in/kaushik-naarayan/', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' }
];

const navLinks = [
  { href: '#services', label: 'Capabilities' },
  { href: '#work', label: 'Work' },
  { href: '#how-we-work', label: 'The Blueprint' },
  { href: '#about', label: 'About' }
];

// --- Components ---

function SystemButton({ children, href, variant = 'primary', className = '' }: { children: React.ReactNode, href?: string, variant?: 'primary' | 'secondary' | 'outline' | 'white', className?: string }) {
  const baseClasses = "group relative inline-flex items-center justify-center gap-2 overflow-hidden transition-all duration-500 no-underline cursor-pointer tracking-wide interactive";
  
  let variantClasses = "";
  if (variant === 'primary') {
    variantClasses = "rounded-full px-6 py-3 text-xs font-medium bg-[#17f7f7] text-black hover:bg-white border border-transparent hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]";
  } else if (variant === 'outline') {
    variantClasses = "rounded-full px-6 py-3 text-xs font-medium bg-transparent text-white border border-white/20 hover:border-[#17f7f7] hover:text-[#17f7f7]";
  } else if (variant === 'secondary') {
    variantClasses = "text-sm font-medium border-b border-white/30 pb-1 gap-2 hover:border-[#17f7f7] hover:text-[#17f7f7] px-0 rounded-none text-white";
  } else if (variant === 'white') {
    variantClasses = "rounded-full px-6 py-3 text-xs font-medium bg-black text-white hover:bg-[#17f7f7] hover:text-black border border-transparent";
  }
  
  const Component = href ? 'a' : 'button';
  
  return (
    // @ts-ignore
    <Component href={href} className={`${baseClasses} ${variantClasses} ${className}`}>
      <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.15em]">
        {children}
      </span>
      <div className={`relative overflow-hidden ${variant === 'secondary' ? 'h-3 w-3' : 'h-4 w-4'}`}>
        <div className="flex transition-transform duration-300 ease-out group-hover:-translate-x-1/2">
          <ArrowRight className={`shrink-0 ${variant === 'secondary' ? 'h-3 w-3' : 'h-4 w-4'}`} />
          <ArrowRight className={`shrink-0 ${variant === 'secondary' ? 'h-3 w-3' : 'h-4 w-4'}`} />
        </div>
      </div>
    </Component>
  );
}

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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-white/5 py-4' : 'bg-transparent border-transparent py-6 md:py-8'}`}>
        <div className={`w-full ${TOKENS.padding.container} flex justify-between items-center`}>
          {/* Logo */}
          <a href="#" className="relative z-50 mix-blend-difference text-white group interactive">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter">Material Lab</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 mix-blend-difference text-white">
            {navLinks.map((item) => (
               <a key={item.href} href={item.href} className="text-xs font-mono uppercase tracking-[0.2em] hover:text-[#17f7f7] transition-colors interactive">
                 {item.label}
               </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <SystemButton href="mailto:damini@materiallab.io" variant="outline" className="py-2 px-4 text-[10px]">
               Contact
            </SystemButton>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white relative z-50 interactive" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505] flex items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((item) => (
               <a 
                 key={item.href} 
                 href={item.href} 
                 className="text-3xl font-serif text-white hover:text-[#17f7f7] transition-colors interactive"
                 onClick={() => setMobileOpen(false)}
               >
                 {item.label}
               </a>
            ))}
             <SystemButton href="mailto:damini@materiallab.io" variant="primary" className="mt-8">
               Contact
            </SystemButton>
          </div>
        </div>
      )}
    </>
  )
}

// Helper to generate top content for Iceberg
function getIcebergContent(index: number) {
   switch(index) {
      case 0: // Automate
         return (
            <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 w-full max-w-xs shadow-2xl font-sans">
               <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#17f7f7]/20 flex items-center justify-center shrink-0">
                     <Bot size={16} className="text-[#17f7f7]" />
                  </div>
                  <div className="space-y-2 flex-1">
                     <div className="bg-white/5 rounded p-2 text-[10px] text-[#d5dada]">
                        Analysis complete. Routing to sales team...
                     </div>
                     <div className="bg-[#17f7f7]/10 rounded p-2 text-[10px] text-[#17f7f7] self-end w-fit ml-auto">
                        Ticket #4092 Created
                     </div>
                  </div>
               </div>
            </div>
         );
      case 1: // Build
         return (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-48 h-64 bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                   <div className="h-4 bg-white/10 w-full mb-2"></div>
                   <div className="p-2 space-y-2">
                      <div className="h-20 bg-white/5 rounded"></div>
                      <div className="h-2 bg-white/10 w-2/3 rounded"></div>
                      <div className="h-2 bg-white/10 w-1/2 rounded"></div>
                   </div>
                   <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#17f7f7]/20 to-transparent"></div>
                </div>
            </div>
         );
      case 2: // Scale
         return (
            <div className="w-full h-32 flex items-end gap-2 px-4 pb-4">
               {[40, 65, 45, 80, 55, 90, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#17f7f7]/20 hover:bg-[#17f7f7] transition-colors duration-300 rounded-t-sm relative group" style={{ height: `${h}%` }}>
                     <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
                  </div>
               ))}
            </div>
         );
      case 3: // Convert
         return (
             <div className="w-full max-w-xs bg-[#090909] border border-white/10 rounded-lg p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-[10px] text-white/40 uppercase tracking-wider">Conversion Rate</span>
                   <span className="text-sm text-[#17f7f7] font-mono">+12.4%</span>
                </div>
                <div className="flex gap-2 items-center">
                   <Globe size={12} className="text-white/40" />
                   <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#17f7f7] w-[75%]"></div>
                   </div>
                </div>
             </div>
         );
      default:
         return null;
   }
}

export function AgencyWebsite() {
  const mainRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [activeCase, setActiveCase] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (footerRef.current) {
      let timeoutId: any;
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setFooterHeight(entry.contentRect.height);
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
             ScrollTrigger.refresh();
          }, 100);
        }
      });
      observer.observe(footerRef.current);
      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
      };
    }
  }, []);

  useLayoutEffect(() => {
    if (!mainRef.current) return;
    
    const ctx = gsap.context(() => {
      
      // --- Hero ---
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl.from(".hero-badge", {
        y: -15,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      })
      .from(".hero-title", {
        y: 100, // Increased distance for sliding effect
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.4")
      .from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.8");
      
      // Parallax Text
      gsap.to(".hero-title", {
         yPercent: -30,
         ease: "none",
         scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
         }
      });

      // --- General Fade Up ---
      const fadeUps = gsap.utils.toArray('.fade-up');
      fadeUps.forEach((elem: any) => {
        gsap.from(elem, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 90%"
          }
        });
      });

      // --- Iceberg Capabilities Stacking (Disabled for stability) ---
      // const cards = gsap.utils.toArray(".cap-card");
      // if (cards.length) {
      //    cards.forEach((card: any, i) => {
      //       const inner = card.querySelector('.iceberg-wrapper');
      //        gsap.to(inner, {
      //          scale: 1 - (cards.length - 1 - i) * 0.05, 
      //          filter: "brightness(0.5)",
      //          scrollTrigger: {
      //             trigger: card,
      //             start: "top top+=120",
      //             end: `bottom top+=120`, 
      //             scrub: true,
      //          }
      //       });
      //    });
      // }

      // --- Work Item Hover ---
      const workItems = gsap.utils.toArray('.work-item-row');
      workItems.forEach((item: any) => {
         const line = item.querySelector('.line');
         const arrow = item.querySelector('.arrow');
         
         item.addEventListener('mouseenter', () => {
            gsap.to(line, { width: '100%', duration: 0.4, ease: 'power2.out' });
            gsap.to(arrow, { x: 0, opacity: 1, duration: 0.3 });
         });
         
         item.addEventListener('mouseleave', () => {
            gsap.to(line, { width: '0%', duration: 0.4, ease: 'power2.out' });
            gsap.to(arrow, { x: -10, opacity: 0, duration: 0.3 });
         });
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-[#050505] text-white min-h-screen w-full selection:bg-[#17f7f7]/30 selection:text-white font-sans cursor-none">
      <GrainOverlay />
      <CustomCursor />
      <Nav />
      
      {/* --- MAIN CONTENT (Scrolls over footer) --- */}
      <main className="relative z-10 bg-[#050505] shadow-2xl" style={{ marginBottom: footerHeight }}>
        
        {/* --- HERO --- */}
        <section className={`hero-section relative min-h-screen flex flex-col justify-center items-center ${TOKENS.padding.container} overflow-hidden pt-20`}>
          <div className="absolute inset-0 z-0">
              <PrismScene />
          </div>
          
          <div className="relative z-10 w-full max-w-none flex flex-col items-center text-center">
              {/* Badges */}
              <div className="mb-12 flex justify-center items-center gap-4 flex-wrap">
                  {["Metric-Obsessed", "Zero Bloat", "100% IP Ownership"].map((text, i) => (
                      <span key={i} className="hero-badge px-4 py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur text-[10px] md:text-xs font-mono text-[#17f7f7] uppercase tracking-wider interactive">
                        {text}
                      </span>
                  ))}
              </div>

              {/* Billboard Typography */}
              <h1 className={`${TYPOGRAPHY.display} hero-title text-white mix-blend-difference mb-12 max-w-full`}>
                Your Extended Product Team.
              </h1>

              <div className="hero-sub max-w-2xl mx-auto text-center space-y-10">
                <p className={`${TYPOGRAPHY.bodyLarge} text-[#d5dada]`}>
                    Build for impact, not just for launch. We bridge the gap between "market ready" and "product maturity".
                </p>
                <div className="flex justify-center gap-6">
                    <SystemButton href="#work" variant="primary">See The Work</SystemButton>
                    <SystemButton href="#how-we-work" variant="secondary">How We Work</SystemButton>
                </div>
              </div>
          </div>
        </section>

        {/* --- ABOUT --- */}
        <section className={LAYOUT.sectionCurved} id="about">
          <div className={LAYOUT.container}>
              <div className={TOKENS.grid.main}>
                  <div className="fade-up space-y-6 lg:col-span-9">
                    <div className="mb-12">
                        <span className="font-serif text-2xl italic text-[#17f7f7] block mb-2">Internal Motto</span>
                        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Outcomes over Output.</h3>
                    </div>
                    <p className={`${TYPOGRAPHY.bodyLarge} text-white leading-relaxed`}>
                        We started Material Lab because we kept meeting founders who were great at their craft but stuck when it came to tech. So we became the team they can call.
                    </p>
                    <p className={`${TYPOGRAPHY.body} text-[#d5dada]/70 leading-relaxed`}>
                        We come from tech, design, and business. We know how to build things that look good, work well, and actually get used. And we care enough to treat your product like it's our own.
                    </p>
                  </div>
                  <div className="fade-up lg:col-span-11 flex flex-col justify-end">
                    <h2 className={`${TYPOGRAPHY.h1} text-white mb-8`}>
                        Good Partners,<br/>Good Software <span className="inline-block w-3 h-3 rounded-full bg-[#17f7f7] align-baseline ml-1"></span>
                    </h2>
                    <div className="flex flex-col gap-4">
                      <SystemButton href="#services" variant="primary" className="self-start">Our Capabilities</SystemButton>
                    </div>
                  </div>
              </div>
          </div>
        </section>

        {/* --- WORK (Editorial List) --- */}
        <section className={LAYOUT.section} id="work">
          <div className={LAYOUT.container}>
              <div className="flex justify-between items-end mb-24 fade-up">
                <div>
                    <span className={`${TYPOGRAPHY.label} text-[#17f7f7] mb-4 block`}>Selected Work</span>
                    <h2 className={TYPOGRAPHY.h1}>The Archive</h2>
                </div>
              </div>

              <div className="relative">
                {caseStudies.map((study, index) => (
                    <div 
                      key={index} 
                      className="work-item-row group relative border-t border-white/10 py-10 md:py-14 cursor-pointer transition-colors hover:bg-white/[0.02] interactive"
                      onMouseEnter={() => setActiveCase(index)}
                    >
                      {/* Hover Line */}
                      <div className="line absolute top-0 left-0 h-[1px] w-0 bg-[#17f7f7]" />
                      
                      <div className={`${TOKENS.grid.main} gap-y-4 items-center relative z-10 px-2 md:px-4`}>
                          <div className="lg:col-span-8">
                            <h3 className="font-serif text-3xl md:text-5xl text-[#d5dada] group-hover:text-white transition-colors">
                                {study.name}
                            </h3>
                          </div>
                          <div className="lg:col-span-6">
                            <p className="font-sans text-sm md:text-base text-[#d5dada]/50 group-hover:text-[#d5dada] transition-colors">
                                {study.description}
                            </p>
                          </div>
                          <div className="lg:col-span-6 flex justify-end items-center gap-6">
                            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#17f7f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {study.tag}
                            </span>
                            <ArrowRight className="arrow text-white opacity-0 -translate-x-4" size={24} />
                          </div>
                      </div>

                      {/* Floating Image Preview (Desktop Only) */}
                      <div 
                          className={`hidden lg:block absolute top-1/2 right-[10%] -translate-y-1/2 w-[450px] aspect-video pointer-events-none transition-all duration-500 z-20
                            ${activeCase === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                          `}
                      >
                          <div className={`w-full h-full overflow-hidden ${TOKENS.geometry.rounded} border border-white/10 bg-[#090909]`}>
                            <img src={study.image} alt={study.name} className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-700" />
                          </div>
                      </div>
                    </div>
                ))}
              </div>
          </div>
        </section>

        {/* --- CAPABILITIES (Vertical Parallax) --- */}
        <section className="relative bg-[#050505]" id="services">
            <div className={LAYOUT.container}>
               <div className="py-24 fade-up">
                 <span className={`${TYPOGRAPHY.label} text-[#17f7f7] mb-4 block`}>What We Do</span>
                 <h2 className={`${TYPOGRAPHY.h1} max-w-3xl`}>
                     Our Capabilities
                 </h2>
               </div>
            </div>
            <VerticalParallaxScroll items={capabilities} />
        </section>

        {/* --- CLIENTS (Logo Parallax) --- */}
        <ParallaxLogoCarousel logos={clientLogos} />

        {/* --- HOW WE WORK (Proof of Work) --- */}
        <section className={`${LAYOUT.section} bg-[#050505]`} id="how-we-work">
          <div className={LAYOUT.container}>
              <div className="mb-24 text-center fade-up">
                <span className={`${TYPOGRAPHY.label} text-white/50 mb-4 block`}>The Blueprint</span>
                <h2 className={`${TYPOGRAPHY.h1} text-white`}>How We Work</h2>
              </div>

              <div className={`${TOKENS.grid.main} gap-10`}>
                
                {/* Talk -> Touch */}
                <div className={`${LAYOUT.card} lg:col-span-10 fade-up interactive min-h-[400px] flex flex-col justify-between relative overflow-hidden`}>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-4 rounded-full bg-[#17f7f7]/10 text-[#17f7f7]">
                              <MessageSquare size={32} />
                          </div>
                          <h3 className={`${TYPOGRAPHY.h2} text-white`}>Talk → Touch</h3>
                        </div>
                        <p className={`${TYPOGRAPHY.bodyLarge} text-[#d5dada]/70 leading-relaxed mb-8`}>
                          You tell us the goal and how your team actually works today. We map the workflow, pick the core metric, and prototype in days. No decks.
                        </p>
                    </div>
                    
                    {/* Artifact: Figma/Slack */}
                    <div className="relative z-10 w-full h-64 md:h-auto mt-auto border border-white/10 rounded-xl overflow-hidden">
                       <div className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center p-8">
                           <FigmaCanvas />
                           <div className="absolute bottom-4 right-4 z-20">
                              <SlackNotification className="scale-75 origin-bottom-right" />
                           </div>
                       </div>
                    </div>
                </div>

                {/* Evidence -> Ship */}
                <div className={`${LAYOUT.card} lg:col-span-10 fade-up interactive min-h-[400px] flex flex-col justify-between relative overflow-hidden`}>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 rounded-full bg-[#17f7f7]/10 text-[#17f7f7]">
                              <LineChart size={32} />
                          </div>
                          <h3 className={`${TYPOGRAPHY.h2} text-white`}>Evidence → Ship</h3>
                        </div>
                        <p className={`${TYPOGRAPHY.bodyLarge} text-[#d5dada]/70 leading-relaxed mb-8`}>
                          We ship when the metric moves: revenue, hours saved, error rate. If we can't link a feature to an outcome, we don't build it.
                        </p>
                    </div>

                     {/* Artifact: Github */}
                     <div className="relative z-10 w-full h-64 md:h-auto mt-auto border border-white/10 rounded-xl overflow-hidden bg-[#0D1117] flex items-center justify-center p-6">
                        <GithubCommits />
                     </div>
                </div>

              </div>
          </div>
        </section>

        {/* --- WHY US --- */}
        <section className={`${LAYOUT.section} bg-[#050505]`}>
          <div className={LAYOUT.container}>
              <div className="mb-24 text-center fade-up">
                <span className={`${TYPOGRAPHY.label} text-[#17f7f7] mb-4 block`}>Why Us</span>
                <h2 className={`${TYPOGRAPHY.h1} text-white`}>Why Teams Choose Us</h2>
              </div>

              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {reasons.map((reason, index) => (
                    <div key={index} className={`fade-up text-center p-6 ${TOKENS.geometry.rounded} hover:bg-white/5 transition-colors group interactive`}>
                      <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#090909] border border-white/10 group-hover:border-[#17f7f7] group-hover:shadow-[0_0_30px_rgba(23,247,247,0.2)] transition-all">
                          <reason.icon className="text-white group-hover:text-[#17f7f7] transition-colors" size={32} />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-white mb-3 leading-tight">{reason.title}</h3>
                      <p className="text-xs text-[#d5dada]/60 leading-relaxed">{reason.description}</p>
                    </div>
                ))}
              </div>
          </div>
        </section>

        {/* --- FINE PRINT --- */}
        <section className={LAYOUT.sectionCurved}>
          <div className={LAYOUT.container}>
              <div className="mb-16 text-center fade-up">
                <span className={`${TYPOGRAPHY.label} text-white/50 mb-4 block`}>Details</span>
                <h2 className={`${TYPOGRAPHY.h1} text-white`}>The Fine Print</h2>
              </div>

              <div className={TOKENS.grid.thirds}>
                <div className="bg-transparent p-7 fade-up interactive">
                    <h3 className={`${TYPOGRAPHY.h2} text-white mb-4 text-xl`}>Pricing</h3>
                    <p className={`${TYPOGRAPHY.body} text-[#d5dada]/70 text-sm mb-4`}>
                      After our first chat, you get a fixed-price proposal. Clear investment, clear return.
                    </p>
                    <p className={`${TYPOGRAPHY.label} text-white/30 normal-case tracking-normal`}>
                      Includes complimentary bug support.
                    </p>
                </div>
                <div className="bg-transparent p-7 fade-up interactive">
                    <h3 className={`${TYPOGRAPHY.h2} text-white mb-4 text-xl`}>Timeline</h3>
                    <p className={`${TYPOGRAPHY.body} text-[#d5dada]/70 text-sm`}>
                      <strong className="text-white block mb-1">Small tools:</strong> 1–2 weeks<br />
                      <strong className="text-white block mt-2 mb-1">Larger platforms:</strong> up to 3 months
                    </p>
                </div>
                <div className="bg-transparent p-7 fade-up interactive">
                    <h3 className={`${TYPOGRAPHY.h2} text-white mb-4 text-xl`}>Ownership</h3>
                    <p className={`${TYPOGRAPHY.body} text-[#d5dada]/70 text-sm`}>
                      <strong className="text-white block mb-1">Who owns the code?</strong> You do. We're here as long as we're useful.
                    </p>
                </div>
              </div>
          </div>
        </section>
      
        {/* --- BOOK A SESSION (Horizontal Scroll) --- */}
        <section className="relative z-20 bg-[#050505]">
           <HorizontalScrollText text="Book a Whiteboard Session — Let's Build" />
        </section>
      
      </main>

      {/* --- FIXED FOOTER (Revealed on scroll) --- */}
      <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0">
        <footer className={`bg-[#fefefe] text-[#050505] pt-32 pb-12 ${TOKENS.padding.container} relative overflow-hidden`}>
          <div className={LAYOUT.container}>
              
              {/* Call to Action */}
              <div className="border-b border-black/10 pb-24 mb-24">
                <span className={`${TYPOGRAPHY.label} text-[#17f7f7] bg-black/5 px-3 py-2 mb-8 inline-block`}>Let's Talk</span>
                <h2 className={`${TYPOGRAPHY.display} text-black mb-12 tracking-tighter max-w-5xl text-[16vw] leading-[0.9]`}>
                    Got something<br/>you want to build?
                </h2>
                <p className={`${TYPOGRAPHY.bodyLarge} text-black/70 mb-12 max-w-2xl`}>
                    Let's talk. Bring a napkin sketch, a half-baked idea, or a full brief. We'll figure it out together.
                </p>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <SystemButton href="mailto:damini@materiallab.io" variant="white" className="text-base px-10 py-5 shadow-2xl">
                      Start a conversation
                    </SystemButton>
                </div>
              </div>

              {/* Footer Grid */}
              <div className={`${TOKENS.grid.main} gap-y-12 mb-24`}>
                {/* Founders */}
                <div className="lg:col-span-10">
                    <h4 className="font-serif text-3xl font-bold mb-10">Founders</h4>
                    <div className="space-y-8">
                      {founders.map((founder) => (
                          <a
                            key={founder.name}
                            href={founder.href}
                            className="flex items-center gap-6 group interactive"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-black/10 flex-shrink-0">
                                <img
                                  src={founder.image}
                                  alt={founder.name}
                                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <span className={`${TYPOGRAPHY.bodyLarge} text-black/60 group-hover:text-black transition-colors`}>{founder.name}</span>
                          </a>
                      ))}
                    </div>
                </div>
                
                {/* Links */}
                <div className="lg:col-span-5">
                    <h5 className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-8">Sitemap</h5>
                    <ul className="space-y-4">
                      {navLinks.map(item => (
                          <li key={item.href}><a href={item.href} className="font-sans text-lg text-black font-medium hover:text-[#17f7f7] transition-colors interactive">{item.label}</a></li>
                      ))}
                    </ul>
                </div>

                {/* Connect */}
                <div className="lg:col-span-5">
                    <h5 className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-8">Connect</h5>
                    <div className="flex flex-col gap-6">
                        <a href="mailto:damini@materiallab.io" className="font-sans text-lg text-black font-medium hover:text-[#17f7f7] transition-colors interactive">damini@materiallab.io</a>
                        <div className="flex gap-4 mt-2">
                          {socialLinks.map((link, i) => (
                            <a key={i} href={link.href} className="p-3 rounded-full bg-black/5 text-black hover:bg-black hover:text-white transition-colors interactive">
                                <link.icon size={20} />
                            </a>
                          ))}
                        </div>
                    </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-t border-black/5 pt-12">
                <h2 className="text-[14vw] font-serif leading-[0.75] text-black/5 select-none tracking-tighter -ml-4 md:-ml-8 pointer-events-none">
                    Material Lab
                </h2>
                <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 pb-2">
                    © 2025 Material Lab. Building delightful things for good people.
                </div>
              </div>

          </div>
        </footer>
      </div>

    </div>
  );
}
