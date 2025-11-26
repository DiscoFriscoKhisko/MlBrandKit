import React from "react";
import { ArrowRight } from "lucide-react";

interface SystemButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  className?: string;
}

export function SystemButton({ children, href, variant = 'primary', className = '' }: SystemButtonProps) {
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
