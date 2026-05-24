import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn.js";

export function Spinner({ className }) {
  return (
    <Loader2
      className={cn("h-5 w-5 animate-spin text-neutral-950", className)}
      aria-hidden="true"
    />
  );
}

export default function Loader({ label = "Loading workspace" }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-line">
        <Spinner />
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      </div>
    </div>
  );
}
