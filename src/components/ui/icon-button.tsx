import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const iconButtonVariants = cva(
  "group inline-flex items-center justify-center rounded-full transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] interactive hover:scale-110 active:scale-95",
  {
    variants: {
      variant: {
        // Default: Light background on dark context (footer on light bg)
        default: "bg-black/5 text-black hover:bg-black hover:text-white",
        // Primary: Cyan background with rotation + glow
        primary: "bg-primary text-primary-foreground hover:bg-white hover:shadow-[var(--glow-primary)]",
        // Ghost: Transparent with hover effect
        ghost: "bg-transparent hover:bg-white/10 text-current",
        // Outline: Border with hover highlight + glow
        outline: "border border-white/20 text-white hover:border-primary hover:text-primary hover:shadow-[var(--glow-subtle)]",
        // Dark: For light backgrounds
        dark: "bg-black text-white hover:bg-primary hover:text-black hover:shadow-[var(--glow-primary)]",
        // Light: For dark backgrounds + glow
        light: "bg-white/10 text-white hover:bg-white hover:text-black hover:shadow-[var(--glow-subtle)]",
      },
      size: {
        sm: "p-2",
        default: "p-3",
        lg: "p-4",
      },
      withRotation: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      withRotation: true,
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  href?: string;
  asChild?: boolean;
  withRotation?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, href, withRotation = true, children, ...props }, ref) => {
    const classes = cn(iconButtonVariants({ variant, size, withRotation }), className);

    // Wrap children with rotation container if withRotation is enabled
    const content = withRotation ? (
      <span className="transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out)] group-hover:rotate-90">
        {children}
      </span>
    ) : (
      children
    );

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {content}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
