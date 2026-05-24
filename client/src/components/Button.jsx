import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn.js";

const variants = {
  primary:
    "border-neutral-900/80 bg-gradient-to-b from-neutral-950 to-neutral-800 text-white shadow-[0_8px_20px_rgba(15,23,42,0.2)] hover:from-neutral-800 hover:to-neutral-900",
  secondary:
    "border-white/70 bg-white/70 text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur hover:bg-white",
  ghost:
    "border-transparent bg-transparent text-neutral-600 hover:bg-white/60 hover:text-neutral-900",
  subtle:
    "border-white/60 bg-white/60 text-neutral-900 hover:bg-white/80",
  danger:
    "border-rose-500 bg-rose-500 text-white shadow-[0_8px_20px_rgba(244,63,94,0.25)] hover:bg-rose-600 hover:border-rose-600"
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
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-sky-200/80 focus:ring-offset-2 disabled:opacity-60",
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
