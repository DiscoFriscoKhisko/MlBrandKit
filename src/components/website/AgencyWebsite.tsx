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
  Shield,
  Check
} from "lucide-react";
import { PrismScene } from "./PrismScene";
import { CustomCursor } from "./CustomCursor";
import { GrainOverlay } from "./GrainOverlay";
import { VerticalParallaxScroll } from "./scroll/VerticalParallaxScroll";
import { HorizontalScrollText } from "./scroll/HorizontalScrollText";
import { ParallaxLogoCarousel } from "./scroll/ParallaxLogoCarousel";
import { Card, ImageContainer } from "../ui/CardSystem";
import { CapabilitiesPage } from "./pages/CapabilitiesPage";
import { TOKENS, LAYOUT, TYPOGRAPHY } from "./design-system";
import { SystemButton } from "./ui/SystemButton";

gsap.registerPlugin(ScrollTrigger);

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
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
  },
  {
    title: 'Build: Transparency & Quality',
    description: 'Quality You Feel. We don\'t throw specs over a wall. We join your Slack, attend your standups, and integrate with your workflow. We handle the complex engineering under the hood so your users get an experience that just works.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  },
  {
    title: 'Grow: The Outcome',
    description: 'Impact Outcomes, Not Outputs. We don\'t just ship code; we build engines for revenue. Under the hood, it’s complex, state-of-the-art tech. On the surface, it’s friction-free and built to scale.',
    image: 'https://images.unsplash.com/photo-1693216266103-3420af48c937?w=800&q=80',
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

const featuredWork = [
    {
        id: 1,
        name: 'Cargomen',
        headline: 'Taming the ERP Beast',
        tags: ['Enterprise', 'Logistics'],
        year: '[2024-2025]',
        color: '#cb7b3a',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
    },
    {
        id: 2,
        name: 'White Space',
        headline: 'Pricing Projects on Autopilot',
        tags: ['AI', 'Operations'],
        year: '[2024]',
        color: '#3a8ccb',
        image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=1200&q=80',
    },
    {
        id: 3,
        name: 'Birdsong',
        headline: '"Shazam" for Nature',
        tags: ['Consumer', 'App'],
        year: '[2025]',
        color: '#d2b59d',
        image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=1200&q=80',
    },
    {
        id: 4,
        name: 'Perhitsiksha',
        headline: 'Tailor-made CRM automation',
        tags: ['EdTech', 'CRM'],
        year: '[2024]',
        color: '#39b0bd',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80',
    },
    {
        id: 5,
        name: 'CargoSphere',
        headline: 'Global GTM technical strategy',
        tags: ['Logistics', 'Strategy'],
        year: '[2023]',
        color: '#d29dd0',
        image: 'https://images.unsplash.com/photo-1494412574643-35d324698420?w=1200&q=80',
    },
    {
        id: 6,
        name: 'Numbers',
        headline: 'Gamified mental math app',
        tags: ['EdTech', 'Mobile'],
        year: '[2024]',
        color: '#fecacc',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80',
    },
    {
        id: 7,
        name: 'Alamirap',
        headline: 'End-to-end funnel automation',
        tags: ['Health', 'Automation'],
        year: '[2023]',
        color: '#60dcfb',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    },
    {
        id: 8,
        name: 'JB Singh',
        headline: 'Corporate AI workflows',
        tags: ['Corporate', 'AI'],
        year: '[2024]',
        color: '#cb7b3a',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    },
    {
        id: 9,
        name: 'TMEN',
        headline: 'Sales enablement architecture',
        tags: ['Sales', 'Systems'],
        year: '[2023]',
        color: '#3a8ccb',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    },
    {
        id: 10,
        name: 'Troupex',
        headline: 'Social network for entertainment',
        tags: ['Social', 'Coming Soon'],
        year: '[2025]',
        color: '#d2b59d',
        image: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?w=1200&q=80',
    }
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
  { name: 'Damini Rathi', href: 'https://www.linkedin.com/in/daminirathi', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { name: 'Kaushik Naarayan', href: 'https://www.linkedin.com/in/kaushik-naarayan/', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' }
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-white/5 py-4' : 'bg-transparent border-transparent py-6 md:py-8'}`}>
        <div className={`w-full ${TOKENS.padding.container} flex justify-between items-center`}>
          <a href="#" className="relative z-50 mix-blend-difference text-white group interactive">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter">Material Lab</span>
          </a>

          <div className="hidden md:flex items-center gap-8 mix-blend-difference text-white">
            {navLinks.map((item) => (
               <a key={item.href} href={item.href} className="text-xs font-mono uppercase tracking-[0.2em] hover:text-[#17f7f7] transition-colors interactive">
                 {item.label}
               </a>
            ))}
          </div>

          <div className="hidden md:block">
            <SystemButton href="mailto:damini@materiallab.io" variant="outline" className="py-2 px-4 text-[10px]">
               Contact
            </SystemButton>
          </div>

          <button className="md:hidden text-white relative z-50 interactive" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

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

export function AgencyWebsite() {
  const [view, setView] = useState<'home' | 'capabilities'>('home');
  const mainRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLElement>(null);
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
      
      heroTl.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
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

      // --- Work Section Animation ---
      const projects = gsap.utils.toArray('.project-text');
      const images = gsap.utils.toArray('.project-image');
      
      // Set initial state
      if (images.length > 0) {
        gsap.set(images[0], { opacity: 1, scale: 1 });
        gsap.set(projects[0], { opacity: 1 });
      }

      projects.forEach((project, i) => {
         ScrollTrigger.create({
            trigger: project,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) {
                 // Active state
                 gsap.to(images, { opacity: 0, scale: 1.1, duration: 0.6, overwrite: true });
                 gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", overwrite: true });
                 
                 gsap.to(projects, { opacity: 0.2, x: 0, duration: 0.4, overwrite: true });
                 gsap.to(project, { opacity: 1, x: 20, duration: 0.4, ease: "power2.out", overwrite: true });
              }
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
    <div ref={mainRef} className="bg-[#050505] text-white min-h-screen w-full selection:bg-[#17f7f7]/30 selection:text-white font-sans cursor-none">
      <GrainOverlay />
      <CustomCursor />
      <Nav />
      
      {/* --- MAIN CONTENT (Scrolls over footer) --- */}
      <main className="relative z-10 bg-[#050505] shadow-2xl" style={{ marginBottom: footerHeight }}>
        
        {/* --- SECTION 1: HERO --- */}
        <section className={`hero-section relative min-h-screen flex flex-col justify-center items-center ${TOKENS.padding.container} overflow-hidden pt-20`}>
          <div className="absolute inset-0 z-0">
              <PrismScene />
          </div>
          
          <div className="relative z-10 w-full max-w-none flex flex-col items-center text-center">
              {/* Billboard Typography */}
              <h1 className={`${TYPOGRAPHY.display} hero-title text-white mix-blend-difference mb-12 max-w-full`}>
                Your Extended Product Team.
              </h1>

              <div className="hero-sub max-w-2xl mx-auto text-center space-y-10">
                <p className={`${TYPOGRAPHY.bodyLarge} text-[#d5dada]`}>
                    Material Lab turns raw ideas into digital products that feel right. We are the partners you call when you want to take a smart first stab at a new concept, or build a platform that actually moves the needle.
                </p>
                <div className="flex justify-center gap-6">
                    <SystemButton href="#contact" variant="primary">Book a Whiteboard Session</SystemButton>
                    <SystemButton href="#work" variant="secondary">See The Work</SystemButton>
                </div>
              </div>
          </div>
        </section>

        {/* --- SECTION 2: MARQUEE (Trust Bar) --- */}
        <section className="relative bg-[#050505] z-10 border-t border-white/5">
            <div className="pt-10 text-center">
                <span className={`${TYPOGRAPHY.label} text-white/40`}>Building alongside founders at:</span>
            </div>
           <ParallaxLogoCarousel logos={clientLogos} className="py-10" />
        </section>

        {/* --- SECTION 2.5: CAPABILITIES CTA (Redesigned) --- */}
        <section className="relative bg-[#050505] z-10 pb-32" id="capabilities">
           <div className={LAYOUT.container}>
              
              {/* Header Grid */}
              <div className="grid grid-cols-12 gap-y-8 mb-12 md:mb-24 pt-24 border-b border-white/10 pb-8">
                 <div className="col-span-12 md:col-span-9 flex items-end">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white flex flex-wrap items-center gap-x-4 md:gap-x-6">
                       <span>Our</span>
                       <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/10 rotate-3">
                          <img 
                             src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&q=80" 
                             alt="Services" 
                             className="w-full h-full object-cover"
                          />
                       </div>
                       <span>Services</span>
                    </h2>
                 </div>
                 <div className="col-span-12 md:col-span-3 flex items-end justify-start md:justify-end">
                    <div onClick={() => setView('capabilities')}>
                       <SystemButton variant="white" className="rounded-full px-6 py-3 flex flex-row-reverse gap-2 items-center group">
                          <span>View All Services</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                       </SystemButton>
                    </div>
                 </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-px bg-white/10 border-t border-white/10">
                 {capabilitiesData.map((cap, i) => (
                    <div 
                       key={i} 
                       className="group relative bg-[#050505] border-b border-white/10 overflow-hidden h-[300px] md:h-[400px] cursor-pointer"
                       onClick={() => setView('capabilities')}
                    >
                       {/* Default Content */}
                       <div className="relative z-20 h-full flex flex-col justify-between p-8 md:p-12 transition-colors duration-500 group-hover:text-white">
                          <div className="flex justify-between items-start">
                             <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden bg-white/5">
                                <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-xs">
                                   0{i + 1}
                                </div>
                             </div>
                             <ArrowUpRight className="w-8 h-8 text-white/30 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-white" />
                          </div>
                          
                          <div>
                             <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 translate-y-0 transition-transform duration-500 group-hover:-translate-y-2">
                                {cap.title}
                             </h3>
                             <p className="text-[#d5dada]/60 max-w-md opacity-100 transition-opacity duration-500 group-hover:opacity-0">
                                {cap.subhead}
                             </p>
                          </div>
                       </div>

                       {/* Hover Background Image Reveal */}
                       <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute inset-0 bg-black/40 z-10" />
                          <img 
                             src={[
                               "https://images.unsplash.com/photo-1680016661694-1cd3faf31c3a?w=800&q=80",
                               "https://images.unsplash.com/photo-1669023414180-4dcf35d943e1?w=800&q=80",
                               "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
                               "https://images.unsplash.com/photo-1646583288948-24548aedffd8?w=800&q=80",
                               "https://images.unsplash.com/photo-1733826544831-ad71d05c8423?w=800&q=80"
                             ][i] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"}
                             className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-100"
                             alt={cap.title}
                          />
                       </div>
                    </div>
                 ))}
              </div>

           </div>
        </section>

        {/* --- SECTION 3: THE MANIFESTO --- */}
        <section className={LAYOUT.sectionCurved} id="manifesto">
          <div className={LAYOUT.container}>
              <div className={TOKENS.grid.main}>
                  <div className="fade-up lg:col-span-8">
                    <h2 className={`${TYPOGRAPHY.h1} text-white sticky top-32`}>
                        Software should feel effortless.
                    </h2>
                  </div>
                  <div className="fade-up lg:col-span-12 space-y-12">
                    <div className="space-y-6">
                        <h3 className={`${TYPOGRAPHY.h2} text-[#17f7f7]`}>The craft of a studio. The heart of a team.</h3>
                        <p className={`${TYPOGRAPHY.bodyLarge} text-[#d5dada] leading-relaxed`}>
                            Too many great ideas fail because of messy execution. We built Material Lab to fix that. We aren't a run-of-the-mill agency. We are professional, accountable, and obsessively collaborative.
                        </p>
                        <p className={`${TYPOGRAPHY.bodyLarge} text-[#d5dada] leading-relaxed`}>
                            We don’t just deliver a service; we co-own the outcome. We integrate with your workflows, debate the strategy, and build software that simply feels better to use.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12 border-t border-white/10">
                        {coreValues.map((value, i) => (
                            <div key={i} className="space-y-3">
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
                <div className="max-w-4xl mx-auto text-center fade-up border border-white/10 rounded-3xl p-10 md:p-20 bg-white/[0.02]">
                    <span className={`${TYPOGRAPHY.label} text-[#17f7f7] mb-8 block`}>A Note from the Team</span>
                    <blockquote className="font-serif text-2xl md:text-4xl text-white leading-relaxed mb-8">
                        "We treat your budget like it’s our own money. If a feature doesn't add value, we’ll kill it before we bill for it. No lock-in contracts. You own the code from Day 1."
                    </blockquote>
                </div>
            </div>
        </section>

        {/* --- SECTION 5: HOW WE WORK (Methodology) --- */}
        <section className="relative bg-[#050505]" id="how-we-work">
            <div className={LAYOUT.container}>
               <div className="py-24 fade-up">
                 <span className={`${TYPOGRAPHY.label} text-[#17f7f7] mb-4 block`}>Methodology</span>
                 <h2 className={`${TYPOGRAPHY.h1} max-w-4xl mb-4`}>
                     Professional like a firm. Personal like a co-founder.
                 </h2>
                 <p className={`${TYPOGRAPHY.bodyLarge} text-white/60`}>You handle the vision. We handle the heavy lifting.</p>
               </div>
            </div>
            <VerticalParallaxScroll items={methodology} />
        </section>

        {/* --- SECTION 6: FEATURED WORK (Pinned Gallery) --- */}
        <section ref={workSectionRef} className="relative z-10 bg-[#050505] py-20 lg:py-32" id="work">
           <div className={LAYOUT.container}>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
                 
                 {/* Left Column: Scrolling Text */}
                 <div className="w-full lg:w-1/2 flex flex-col gap-[10vh] lg:py-[20vh] z-20">
                    <div className="mb-20">
                      <h2 className={`${TYPOGRAPHY.h1} text-white mb-6`}>Featured Work</h2>
                      <p className={`${TYPOGRAPHY.bodyLarge} text-white/50 max-w-md`}>
                        A selection of recent shipments, from enterprise ERPs to consumer apps.
                      </p>
                    </div>

                    {featuredWork.map((work) => (
                       <div key={work.id} className="project-text group flex flex-col justify-center min-h-[30vh] opacity-20 transition-all border-l-2 border-white/5 pl-8 hover:border-[#17f7f7]/50">
                          <div className="flex items-center gap-4 mb-4">
                             <span className="font-mono text-[#17f7f7] text-xs tracking-widest">{work.year}</span>
                             <div className="h-[1px] w-8 bg-white/10"></div>
                             <span className="font-mono text-white/40 text-xs tracking-widest uppercase">{work.tags[0]}</span>
                          </div>
                          <h3 className="text-4xl md:text-6xl font-serif text-white mb-4 group-hover:text-[#17f7f7] transition-colors w-fit cursor-pointer">
                             {work.name}
                          </h3>
                          <p className="text-xl text-[#d5dada]/80 max-w-md font-light leading-relaxed">
                             {work.headline}
                          </p>
                          <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[#17f7f7] text-sm font-medium uppercase tracking-wider">
                             View Case Study <ArrowRight className="w-4 h-4" />
                          </div>
                       </div>
                    ))}
                 </div>

                 {/* Right Column: Sticky Image Stage */}
                 <div className="hidden lg:block lg:w-1/2 relative">
                    <div className="sticky top-0 h-screen flex items-center justify-center py-20">
                       <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-[#090909]">
                          {/* Dynamic Images */}
                          {featuredWork.map((work, i) => (
                             <div key={work.id} className="project-image absolute inset-0 w-full h-full opacity-0">
                                <img 
                                   src={work.image} 
                                   alt={work.name}
                                   className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-60"></div>
                             </div>
                          ))}
                          
                          {/* Static Overlay Elements */}
                          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10 pointer-events-none">
                             <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#17f7f7] animate-pulse"></div>
                                <span className="text-[10px] uppercase tracking-widest text-white/60">Live Preview</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

              </div>
           </div>
        </section>


        {/* --- BOOK A SESSION (Horizontal Scroll) --- */}
        <section className="relative z-20 bg-[#050505]" id="contact">
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
