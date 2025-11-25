import React, { useRef, useState, useEffect } from 'react';

interface MagneticBadgeProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticBadge: React.FC<MagneticBadgeProps> = ({ 
  children, 
  strength = 0.5,
  className = ""
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 0, height: 0 };
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const dist = { x: clientX - centerX, y: clientY - centerY };
    
    setPosition({ x: dist.x * strength, y: dist.y * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};
