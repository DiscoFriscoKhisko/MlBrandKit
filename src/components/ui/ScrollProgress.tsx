import React, { useEffect, useState } from 'react';

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5 ${className}`}>
      <div
        className="h-full bg-primary transition-[width] duration-[var(--duration-instant)] ease-linear"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect at the leading edge */}
      <div
        className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent to-primary/50 blur-sm transition-[left] duration-[var(--duration-instant)] ease-linear"
        style={{ left: `calc(${progress}% - 32px)` }}
      />
    </div>
  );
}
