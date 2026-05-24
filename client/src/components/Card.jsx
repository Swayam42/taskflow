import { cn } from "../utils/cn.js";

export default function Card({ children, className, as: Component = "div" }) {
  return (
    <Component
      className={cn(
        "rounded-xl border border-neutral-200 bg-white shadow-line",
        className
      )}
    >
      {children}
    </Component>
  );
}
