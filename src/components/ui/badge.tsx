import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]",
  {
    variants: {
      variant: {
        // Default: Frosted glass effect (most common in Featured Work cards)
        default: "bg-white/20 backdrop-blur-md text-white hover:bg-white/25",
        // Solid: Primary color background
        solid: "bg-primary text-primary-foreground hover:shadow-[var(--glow-subtle)]",
        // Outline: Border only
        outline: "border border-white/20 text-white hover:border-white/40",
        // Muted: Lighter background without blur (used in hover states)
        muted: "bg-white/15 text-current hover:bg-white/20",
        // Glass: Frosted glass with subtle blur (alternative)
        glass: "bg-white/20 backdrop-blur-sm text-white hover:bg-white/25",
      },
      size: {
        sm: "text-xs px-2.5 py-1",
        default: "text-sm px-4 py-2.5",
        lg: "text-base px-4 py-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
