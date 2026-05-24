import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn.js";

const variants = {
  primary:
    "border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800 hover:border-neutral-800",
  secondary:
    "border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-50",
  ghost:
    "border-transparent bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950",
  subtle:
    "border-neutral-200 bg-neutral-100 text-neutral-950 hover:bg-neutral-200",
  danger:
    "border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800 hover:border-neutral-800"
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0"
};

export default function Button({
  children,
  className,
  disabled,
  icon: Icon,
  isLoading = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : Icon ? (
        <Icon className="h-4 w-4" aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
}
