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
      primary: "bg-primary text-white hover:brightness-105 active:bg-primary/90 shadow-[0_4px_14px_rgba(255,191,168,0.4)]",
      secondary: "bg-white text-foreground hover:bg-white/80 border border-transparent hover:border-border/50 shadow-[0_4px_14px_rgba(0,0,0,0.03)]",
      ghost: "bg-transparent text-muted-foreground hover:bg-black/5 hover:text-foreground shadow-none active:shadow-none active:scale-100",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs rounded-xl",
      md: "h-12 px-6 text-sm rounded-2xl",
      lg: "h-14 px-8 text-base rounded-2xl",
      icon: "h-12 w-12 flex items-center justify-center rounded-2xl",
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          "mochi-button inline-flex items-center justify-center font-bold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
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
