import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn.js";

const variants = {
  primary:
    "border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800 hover:border-neutral-800",
  secondary:
    "border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100",
  ghost:
    "border-transparent bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
  subtle:
    "border-neutral-200 bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
  danger:
    "border-rose-500 bg-rose-500 text-white hover:bg-rose-600 hover:border-rose-600"
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
  icon: "h-9 w-9 p-0"
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
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 focus:ring-offset-2 disabled:opacity-60",
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
