import { ArrowRight, Edit3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "./Card.jsx";
import Button from "./Button.jsx";
import { formatDate } from "../utils/formatters.js";

export default function ProjectCard({ onDelete, onEdit, project }) {
  const totalTasks = project.metrics?.totalTasks || 0;
  const completedTasks = project.metrics?.completedTasks || 0;
  const completion = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <Card className="group flex h-full flex-col p-5 transition duration-150 hover:border-neutral-300 hover:bg-neutral-50">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase text-neutral-500">
            Project
          </p>
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-neutral-950">
            {project.title}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            aria-label={`Edit ${project.title}`}
            icon={Edit3}
            onClick={() => onEdit(project)}
            size="icon"
            variant="ghost"
          />
          <Button
            aria-label={`Delete ${project.title}`}
            icon={Trash2}
            onClick={() => onDelete(project)}
            size="icon"
            variant="ghost"
          />
        </div>
      </div>

      <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-neutral-600">
        {project.description || "No description yet."}
      </p>

      <div className="mt-5 rounded-lg border border-neutral-200 bg-white p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-neutral-600">Completion</span>
          <span className="font-semibold text-neutral-950">{completion}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-neutral-950 transition-all duration-300"
            style={{ width: `${completion}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
          <span>{completedTasks} done</span>
          <span>{totalTasks} tasks</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-4">
        <span className="truncate text-sm text-neutral-500">
          Updated {formatDate(project.updatedAt)}
        </span>
        <Link
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-neutral-950 transition hover:bg-neutral-100"
          to={`/projects/${project._id}`}
        >
          Open
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
