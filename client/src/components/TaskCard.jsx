import { Edit3, GripVertical, Trash2 } from "lucide-react";
import Button from "./Button.jsx";
import Card from "./Card.jsx";
import { formatDate } from "../utils/formatters.js";

export default function TaskCard({ onDelete, onDragStart, onEdit, task }) {
  return (
    <Card
      as="article"
      className="cursor-grab p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft active:cursor-grabbing"
      draggable
      onDragStart={(event) => onDragStart(event, task)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-2">
          <GripVertical
            className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <h4 className="line-clamp-2 text-sm font-semibold leading-6 text-neutral-950">
              {task.title}
            </h4>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600">
              {task.description || "No description."}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            aria-label={`Edit ${task.title}`}
            icon={Edit3}
            onClick={() => onEdit(task)}
            size="icon"
            variant="ghost"
          />
          <Button
            aria-label={`Delete ${task.title}`}
            icon={Trash2}
            onClick={() => onDelete(task)}
            size="icon"
            variant="ghost"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
          {task.priority}
        </span>
        <span className="text-xs text-neutral-500">
          {formatDate(task.updatedAt)}
        </span>
      </div>
    </Card>
  );
}
