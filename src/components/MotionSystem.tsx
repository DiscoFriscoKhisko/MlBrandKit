import * as React from "react"
import { motion, useScroll, useTransform, useInView, MotionProps } from "motion/react"
import { cn } from "./ui/utils"

// --- 1. Section Shells ---

export function MotionSection({ 
  children, 
  className, 
  curved = false,
  ...props 
}: { curved?: boolean } & React.HTMLAttributes<HTMLElement>) {
  return (
    <section 
      className={cn(
        "section",
        curved && "section--curved my-4", // "Panel feel"
        className
      )}
      {...props}
    >
      <div className="section-inner relative z-10">
        {children}
      </div>
    </section>
  )
}

// --- 2. Cards ---

interface MotionCardProps extends MotionProps {
  className?: string
  children: React.ReactNode
  delay?: number
}

export function MotionCard({ className, children, delay = 0, ...props }: MotionCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }} // Power3.out feel
      className={cn(
        "card group bg-[#090909] border border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </motion.article>
  )
}

export function MotionCardMedia({ 
  src, 
  alt, 
  className 
}: { src?: string, alt?: string, className?: string }) {
  return (
    <div className="card-media relative">
      <motion.img 
        src={src} 
        alt={alt}
        className={cn("object-cover", className)}
        whileHover={{ scale: 1.03 }} // Subtle scale instead of parallax for simplicity
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  )
}

// --- 3. Text Reveal (Split Text Approximation) ---

export function MotionSplitText({ 
  children, 
  className,
  delay = 0
}: { children: string, className?: string, delay?: number }) {
  // Simple word split for now
  const words = children.split(" ")
  
  return (
    <motion.h2 
      className={cn("flex flex-wrap gap-[0.25em]", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
        hidden: {}
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%" },
              visible: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

export function MotionFadeText({ 
  children, 
  className,
  delay = 0.2
}: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// --- 4. Parallax/Floating ---

export function MotionFloat({ 
  children, 
  depth = 0.2, 
  className 
}: { children: React.ReactNode, depth?: number, className?: string }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, depth * 200]) // Parallax
  
  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
