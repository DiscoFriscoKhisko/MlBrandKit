import * as React from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "./utils"

interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "outline" | "link"
  href?: string
}

export function ArrowButton({ 
  children, 
  className, 
  variant = "primary",
  href,
  ...props 
}: ArrowButtonProps) {
  
  const isLink = variant === "link"

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden transition-colors duration-300 no-underline",
    !isLink && "rounded-full px-5 py-2.5 text-sm font-medium", // Pill shape: 10px 20px padding
    isLink && "text-sm font-medium border-b border-current pb-0.5 gap-1.5 hover:opacity-80 px-0 rounded-none", // Line style: gap 6px, pb 2px
    variant === "primary" && "bg-[#17f7f7] text-black hover:bg-white border border-transparent", 
    variant === "outline" && "bg-transparent border border-white/20 text-white hover:border-[#17f7f7] hover:text-[#17f7f7]",
    variant === "link" && "bg-transparent text-current",
    className
  )

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className={cn("relative overflow-hidden", isLink ? "h-3 w-3" : "h-4 w-4")}>
        <div className="flex transition-transform duration-300 ease-out group-hover:-translate-x-1/2">
          <ArrowRight className={cn("shrink-0", isLink ? "h-3 w-3" : "h-4 w-4")} />
          <ArrowRight className={cn("shrink-0", isLink ? "h-3 w-3" : "h-4 w-4")} />
        </div>
      </div>
    </>
  )

  const animationProps = !isLink ? {
    whileHover: { y: -2 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  } : {}

  if (href) {
    return (
      <motion.a 
        href={href} 
        className={classes}
        {...animationProps}
        {...(props as any)}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button 
      className={classes}
      {...animationProps}
      {...(props as any)}
    >
      {content}
    </motion.button>
  )
}
