import { FolderPlus } from "lucide-react";
import Card from "./Card.jsx";

export default function EmptyState({
  action,
  description,
  icon: Icon = FolderPlus,
  title
}) {
  return (
    <Card className="flex min-h-72 items-center justify-center p-8 text-center">
      <div className="mx-auto max-w-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
          <Icon className="h-6 w-6 text-neutral-950" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-neutral-950">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-neutral-600">{description}</p>
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </Card>
  );
}
