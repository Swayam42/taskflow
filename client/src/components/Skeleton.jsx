import { cn } from "../utils/cn.js";

export default function Skeleton({ className }) {
  return (
    <div className={cn("animate-pulse rounded-xl bg-neutral-100", className)} />
  );
}
