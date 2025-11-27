import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface LazyRenderProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: ReactNode;
  className?: string;
  unmountOnHide?: boolean;
}

export function LazyRender({ 
  children, 
  threshold = 0.01, 
  rootMargin = '200px', 
  placeholder,
  className = "",
  unmountOnHide = false
}: LazyRenderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // If we don't want to unmount on hide, we can stop observing once visible
          if (!unmountOnHide) {
            observer.disconnect();
          }
        } else {
          if (unmountOnHide) {
            setIsVisible(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, unmountOnHide]);

  // Maintain height/width if possible, or just rely on parent
  return (
    <div ref={ref} className={`lazy-render-wrapper ${className}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isVisible ? children : (placeholder || <div className="w-full h-full" />)}
    </div>
  );
}
