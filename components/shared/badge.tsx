import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant =
  | "popular"
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "default";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  popular: "bg-primary text-primary-foreground",
  vegetarian: "bg-secondary text-secondary-foreground",
  vegan: "bg-secondary text-secondary-foreground",
  "gluten-free": "border border-accent text-accent bg-transparent",
  default: "bg-muted text-muted-foreground",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
