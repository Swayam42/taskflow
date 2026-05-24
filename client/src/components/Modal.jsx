import { X } from "lucide-react";
import { useEffect } from "react";
import Button from "./Button.jsx";
import { cn } from "../utils/cn.js";

const widths = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl"
};

export default function Modal({
  children,
  description,
  isOpen,
  onClose,
  title,
  width = "md"
}) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        aria-label="Close modal"
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative max-h-[92vh] w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-soft animate-fade-in",
          widths[width]
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200/80 px-6 py-5">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-neutral-950">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            aria-label="Close"
            icon={X}
            onClick={onClose}
            size="icon"
            variant="ghost"
          />
        </div>
        <div className="max-h-[calc(92vh-88px)] overflow-y-auto px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
