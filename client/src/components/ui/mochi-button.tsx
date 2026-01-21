import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export interface MochiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

const MochiButton = React.forwardRef<HTMLButtonElement, MochiButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const variants = {
      primary: "mochi-button-primary hover:brightness-105 active:brightness-95",
      secondary: "bg-white text-foreground hover:bg-white/90 border border-white/80",
      ghost: "bg-transparent text-muted-foreground hover:bg-black/5 hover:text-foreground shadow-none active:shadow-none active:scale-95",
    };

    const sizes = {
      sm: "h-10 px-5 text-xs font-extrabold",
      md: "h-14 px-8 text-sm font-extrabold",
      lg: "h-16 px-10 text-base font-extrabold",
      icon: "h-14 w-14 flex items-center justify-center font-extrabold",
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          "mochi-button inline-flex items-center justify-center tracking-wider uppercase focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
MochiButton.displayName = "MochiButton";

export { MochiButton };
