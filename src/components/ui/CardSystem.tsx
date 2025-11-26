import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

export function Card({ children, className = '', padding = 'p-7 lg:p-12' }: CardProps) {
  return (
    <div 
      className={`
        w-full flex flex-col 
        bg-[#090909] border border-white/10 
        rounded-2xl lg:rounded-3xl 
        ${padding}
        transition-all duration-500
        hover:border-white/20
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface ImageContainerProps {
  src: string;
  alt: string;
  className?: string;
  active?: boolean;
}

export function ImageContainer({ src, alt, className = '', active = false }: ImageContainerProps) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Sharp Image */}
      <img 
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ transform: active ? 'scale(1.05)' : 'scale(1)' }}
      />
      
      {/* Blurred Overlay (Halo Effect) */}
      <div 
        className={`
          absolute inset-0 w-full h-full 
          bg-cover bg-center 
          transition-all duration-500 ease-out
          ${active ? 'opacity-40 blur-xl scale-110' : 'opacity-0 blur-0 scale-100'}
        `}
        style={{ backgroundImage: `url(${src})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-60" />
    </div>
  );
}
