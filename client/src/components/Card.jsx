import { cn } from "../utils/cn.js";

export default function Card({
  children,
  className,
  as: Component = "div",
  ...props
}) {
  return (
    <Component
      {...props}
      className={cn(
        "rounded-2xl border border-white/70 bg-white/70 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </Component>
  );
}
