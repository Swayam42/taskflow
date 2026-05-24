import { cn } from "../utils/cn.js";

export default function Input({
  className,
  error,
  label,
  multiline = false,
  id,
  ...props
}) {
  const inputId = id || props.name;
  const Component = multiline ? "textarea" : "input";

  return (
    <label className="block" htmlFor={inputId}>
      {label ? (
        <span className="mb-2 block text-sm font-medium text-neutral-900">
          {label}
        </span>
      ) : null}
      <Component
        id={inputId}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10",
          error ? "border-neutral-950" : "border-neutral-200",
          multiline ? "min-h-28 resize-none leading-6" : "h-12",
          className
        )}
        {...props}
      />
      {error ? (
        <span className="mt-2 block text-sm text-neutral-700">{error}</span>
      ) : null}
    </label>
  );
}
