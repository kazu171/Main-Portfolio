import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export interface MochiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const MochiCard = React.forwardRef<HTMLDivElement, MochiCardProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(
          "mochi-card p-6 md:p-8 text-card-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
MochiCard.displayName = "MochiCard";

export { MochiCard };
