import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[transform,background-color,color,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cream)] disabled:pointer-events-none disabled:opacity-45 active:translate-y-px",
  {
    variants: {
      variant: {
        primary: "bg-[var(--brass)] px-5 py-3 text-[var(--ink)] hover:bg-[var(--gold)]",
        outline: "border border-[var(--ink)]/35 bg-transparent px-5 py-3 text-[var(--ink)] hover:border-[var(--ink)] hover:bg-white/50",
        dark: "bg-[var(--ink)] px-5 py-3 text-[var(--cream)] hover:bg-[var(--slate)]",
        ghost: "px-3 py-2 text-current hover:bg-black/5",
      },
      size: {
        default: "text-sm",
        large: "min-h-12 px-6 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return <Component ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";
