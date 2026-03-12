import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-bronze text-white hover:bg-bronze-600 rounded-full",
  secondary: "bg-white/[0.06] text-marble border border-white/[0.08] hover:bg-white/[0.1] rounded-full",
  ghost: "bg-transparent text-marble-400 hover:text-marble hover:bg-white/[0.04] rounded-lg",
  danger: "bg-red-500/15 text-red-400 hover:bg-red-500/20 rounded-full",
  gold: "bg-bronze text-white hover:bg-bronze-600 rounded-full",
  outline: "border border-white/[0.08] text-marble-400 hover:bg-white/[0.06] hover:text-marble rounded-full",
  link: "text-bronze hover:text-bronze-300 underline-offset-4 hover:underline",
};

const sizes = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/30 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap",
          variants[variant],
          variant !== "link" && sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
