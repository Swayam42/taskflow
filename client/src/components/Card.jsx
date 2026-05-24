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
        "rounded-lg border border-neutral-200/80 bg-white",
        className
      )}
    >
      {children}
    </Component>
  );
}
