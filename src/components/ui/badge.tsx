import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-white/[0.06] text-marble-400",
  primary: "bg-bronze/15 text-bronze-300",
  success: "bg-emerald-500/15 text-emerald-400",
  warning: "bg-amber-500/15 text-amber-400",
  danger: "bg-red-500/15 text-red-400",
  gold: "bg-bronze/15 text-bronze-300",
  teal: "bg-teal/15 text-teal-dark",
};

const sizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-0.5 text-[11px]",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function Badge({ className, variant = "default", size = "md", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium tracking-wide rounded-full whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

export function StatusDot({ status }: { status: "available" | "hold" | "booked" | "offline" }) {
  const colors = {
    available: "bg-emerald-500",
    hold: "bg-amber-500",
    booked: "bg-red-500",
    offline: "bg-navy-200",
  };

  return (
    <span className="relative flex h-2.5 w-2.5">
      {status === "available" && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      )}
      <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", colors[status])} />
    </span>
  );
}
