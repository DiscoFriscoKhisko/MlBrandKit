import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { cn } from "./utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-x-2 font-sans font-medium overflow-hidden cursor-pointer outline-none disabled:pointer-events-none disabled:opacity-50 transition-[transform,box-shadow,border-radius,background-color,border-color] duration-[var(--duration-normal)] ease-[var(--ease-out)] hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Primary: Black pill, white text, text-slide animation + glow on hover
        primary:
          "bg-black text-white rounded-full border border-transparent hover:rounded-xl hover:shadow-[var(--glow-subtle)] focus:ring-3 ring-black/5",

        // Outline: Transparent with white border (for dark backgrounds)
        outline:
          "bg-transparent text-white border border-white/20 rounded-full hover:rounded-xl hover:border-primary hover:shadow-[var(--glow-subtle)]",

        // Light: White pill for dark backgrounds
        light:
          "bg-white text-black rounded-full border border-transparent hover:rounded-xl hover:bg-primary hover:text-black hover:shadow-[var(--glow-primary)]",

        // White: Same as light (for backwards compatibility with AgencyWebsite)
        white:
          "bg-black text-white rounded-full border border-transparent hover:rounded-xl hover:bg-primary hover:text-black hover:shadow-[var(--glow-primary)]",

        // Ghost: Minimal, no background
        ghost:
          "bg-transparent text-current hover:bg-white/10 rounded-full hover:rounded-xl",

        // Link: Text only with underline (no scale effect)
        link: "bg-transparent text-current underline-offset-4 hover:underline px-0 py-0 hover:scale-100",

        // Secondary: Pill-outline style (matching Rise at Seven)
        secondary:
          "bg-transparent text-white border border-white/20 rounded-full hover:rounded-xl hover:border-primary hover:shadow-[var(--glow-subtle)]",

        // Destructive/Error: Red variant
        destructive:
          "bg-destructive text-white rounded-full border border-transparent hover:rounded-xl hover:bg-destructive/90 hover:shadow-[0_0_30px_rgba(255,42,109,0.2)]",

        // Default (shadcn compatibility)
        default:
          "bg-primary text-primary-foreground rounded-full hover:rounded-xl hover:bg-primary/90 hover:shadow-[var(--glow-primary)]",

        // Icon: Circle button for icons only (rotation handled in IconButton component)
        icon: "rounded-full bg-primary text-primary-foreground hover:bg-white hover:shadow-[var(--glow-primary)] transition-all duration-[var(--duration-normal)]",

        // Tag: Small chip/tag style
        tag: "rounded-full bg-white/10 text-current hover:rounded-xl backdrop-blur-sm hover:scale-100",
      },
      size: {
        sm: "text-sm px-6 py-3",
        default: "text-base px-8 py-4",
        lg: "text-lg px-10 py-5",
        // For non-pill variants (secondary, link)
        inline: "text-sm px-0 py-0",
        // Icon-only button
        icon: "size-12 p-0",
        "icon-lg": "size-14 p-0",
        // Tag size
        tag: "text-xs px-3 py-1.5",
      },
    },
    compoundVariants: [
      // Link variant should use inline size by default
      {
        variant: "link",
        size: "default",
        className: "text-sm px-0 py-0",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

// Animated text component with slide-up effect
function AnimatedText({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div className="transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out)] group-hover:-translate-y-full">
        <div className="flex items-center gap-x-2">{children}</div>
      </div>
      <div className="absolute top-0 left-0 translate-y-full transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out)] group-hover:translate-y-0">
        <div className="flex items-center gap-x-2">{children}</div>
      </div>
    </div>
  );
}

// Arrow icon component
function ArrowIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block align-middle text-xs transition-transform duration-[var(--duration-fast)]",
        className
      )}
    >
      <ArrowUpRight className="h-3.5 w-3.5" />
    </span>
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  withArrow?: boolean;
  withAnimation?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      href,
      withArrow = true,
      withAnimation = true,
      children,
      ...props
    },
    ref
  ) => {
    // Don't show arrow for icon, tag, link, ghost, or default variants
    const showArrow =
      withArrow &&
      variant !== "icon" &&
      variant !== "tag" &&
      variant !== "link" &&
      variant !== "ghost" &&
      variant !== "default" &&
      size !== "icon";

    // Use animation for pill-style buttons (primary, secondary, outline, light, white, destructive)
    const useSlideAnimation =
      withAnimation &&
      (variant === "primary" ||
        variant === "secondary" ||
        variant === "outline" ||
        variant === "light" ||
        variant === "white" ||
        variant === "destructive");

    const content = showArrow ? (
      <>
        <span>{children}</span>
        <ArrowIcon />
      </>
    ) : (
      children
    );

    const animatedContent = useSlideAnimation ? (
      <AnimatedText>{content}</AnimatedText>
    ) : (
      <span className="flex items-center gap-x-2">{content}</span>
    );

    // If href is provided, render as anchor
    if (href) {
      return (
        <a
          href={href}
          className={cn(
            buttonVariants({ variant, size, className }),
            "interactive"
          )}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {animatedContent}
        </a>
      );
    }

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size, className }),
          "interactive"
        )}
        ref={ref}
        {...props}
      >
        {animatedContent}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
