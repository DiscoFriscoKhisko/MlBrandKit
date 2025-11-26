import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TOKENS, TYPOGRAPHY, COLORS, LAYOUT } from './design-system';
import { SystemButton } from './ui/SystemButton';
import { Card, ImageContainer } from '../ui/CardSystem';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    id: 'strategy',
    title: 'Product Strategy',
    subtitle: 'We Don’t Guess',
    description: 'Before we write a single line of code, we dissect your business model. We identify the bottlenecks, the opportunities, and the "Blue Ocean" features that will separate you from the herd. We don’t just build what you ask for; we build what your business needs to scale.',
    features: ['Market Analysis', 'User Research', 'Technical Architecture', 'Roadmap Planning'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    link: '/capabilities/strategy'
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    subtitle: 'People Over Pixels',
    description: 'We obsess over the feel of the software until it works effortlessly. Our design system isn’t just about pretty colors; it’s about reducing cognitive load, increasing conversion rates, and creating an emotional connection with your users.',
    features: ['Design Systems', 'High-Fidelity Prototyping', 'Interaction Design', 'User Testing'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80',
    link: '/capabilities/design'
  },
  {
    id: 'engineering',
    title: 'Full-Stack Engineering',
    subtitle: 'Code is a Liability',
    description: 'We fight to write less code that does more. We replace the Black Box of development with a Glass Box, using automation to handle the heavy lifting. The result? Robust, scalable applications that are easy to maintain and cheap to extend.',
    features: ['React & Next.js', 'Cloud Infrastructure', 'API Development', 'Database Architecture'],
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1200&q=80',
    link: '/capabilities/engineering'
  },
  {
    id: 'growth',
    title: 'Growth & Scale',
    subtitle: 'Outcomes, Not Outputs',
    description: 'Shipping is just Day 1. We build engines for revenue. We integrate analytics, set up conversion funnels, and optimize performance to ensure your product doesn’t just exist, but grows. We don’t leave you with a product; we leave you with a business.',
    features: ['Conversion Optimization', 'Performance Tuning', 'Analytics Integration', 'Growth Hacking'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    link: '/capabilities/growth'
  }
];

export function StackedCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Ensure we have items
    const items = itemsRef.current.filter(Boolean);
    const total = items.length;
    
    if (total === 0) return;

    const ctx = gsap.context(() => {
      // Create the main timeline tied to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${window.innerHeight * (total - 1)}`, 
          scrub: true,
          pin: false, // Sticky handles the pinning
          invalidateOnRefresh: true,
        }
      });

      // Animation Logic:
      // We move the *entire stack* up, but we do it by animating the items
      // based on the user's request logic: tl.to(items, { yPercent: -100 * i })
      // 
      // Wait, if we have a flex-col stack inside a sticky container:
      // Item 1 is at 0. Item 2 is at 100vh. Item 3 is at 200vh.
      // To show Item 2, we need to move EVERYTHING up by 100vh.
      // So Item 1 goes to -100vh, Item 2 goes to 0.
      // 
      // We can achieve this by animating the 'yPercent' of ALL items together.
      // But we need to do it sequentially?
      // Actually, a single tween on *all* items with a staggered functional value
      // might work, but Scrubbing a single tween 0 -> (N-1)*100% is easier.
      //
      // However, the user specifically requested: 
      // "tl.to(items, { yPercent: -100 * i })" inside a loop.
      // This implies that for step 1, we move everything -100%.
      // For step 2, we move everything *another* -100%? Or to absolute -200%?
      
      items.forEach((_, i) => {
        if (i === 0) return; // First item is already visible
        
        tl.to(items, {
          yPercent: -100 * i, 
          ease: 'none',
          duration: 1 
        });
      });

      // Optional: Heading animations
      items.forEach((item) => {
        const heading = item.querySelector('.js-heading');
        const content = item.querySelector('.js-content');
        
        // We can add a trigger for when this item comes into view
        // Since we are using a scrubbing timeline for position, 
        // we can use a separate ScrollTrigger for inner animations 
        // OR just rely on the CSS transition/sticky nature.
        // Given the user's prompt focused on the structural scroll, 
        // we will keep inner animations subtle or CSS based.
      });

    }, container);

    return () => ctx.revert();
  }, []);

  // Calculate total height for the scroll container
  // 100vh per item
  const wrapperHeight = `${CAPABILITIES.length * 100}vh`;

  return (
    <div 
      ref={containerRef} 
      className="w-full relative z-10"
      style={{ height: wrapperHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="flex flex-col items-start h-full w-full">
          {CAPABILITIES.map((cap, index) => (
            <div 
              key={cap.id}
              ref={el => itemsRef.current[index] = el!}
              className="w-full h-screen shrink-0 relative flex items-center bg-[#090909] border-b border-white/10 last:border-none"
            >
              {/* Background / Image Column (Right on Desktop, hidden on mobile?) */}
              {/* We'll do a split layout: Text Left, Image Right */}
              
              <div className="absolute inset-0 flex flex-col lg:flex-row">
                
                {/* Content Column */}
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-7 md:px-14 lg:pl-20 relative z-20 bg-[#090909]/90 lg:bg-[#090909]">
                    <div className="max-w-xl space-y-8 js-heading">
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-[#17f7f7] text-sm">0{index + 1}</span>
                            <div className="h-[1px] w-12 bg-white/20"></div>
                            <span className="font-mono text-white/60 text-xs uppercase tracking-widest">{cap.subtitle}</span>
                        </div>
                        
                        <h2 className={`${TYPOGRAPHY.h1} text-white`}>
                            {cap.title}
                        </h2>
                        
                        <p className={`${TYPOGRAPHY.bodyLarge} text-[#d5dada]/70`}>
                            {cap.description}
                        </p>

                        <div className="pt-8 flex flex-wrap gap-3">
                            {cap.features.map(f => (
                                <span key={f} className="px-3 py-1 border border-white/10 rounded-full text-[10px] uppercase tracking-wider text-white/60">
                                    {f}
                                </span>
                            ))}
                        </div>

                        <div className="pt-8">
                            <SystemButton href={cap.link} variant="outline">
                                Explore {cap.title}
                            </SystemButton>
                        </div>
                    </div>
                </div>

                {/* Image Column */}
                <div className="hidden lg:block w-1/2 h-full relative border-l border-white/10">
                    <ImageContainer src={cap.image} alt={cap.title} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#090909] to-transparent opacity-50"></div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
