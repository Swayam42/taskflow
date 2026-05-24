import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Edit3,
  FolderKanban,
  Plus,
  Trash2
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ProjectFormModal from "../components/ProjectFormModal.jsx";
import Skeleton from "../components/Skeleton.jsx";
import StatCard from "../components/StatCard.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskFormModal from "../components/TaskFormModal.jsx";
import { useApp } from "../context/AppContext.jsx";
import { useDisclosure } from "../hooks/useDisclosure.js";
import {
  deleteProjectRequest,
  getProjectRequest,
  updateProjectRequest
} from "../services/projectService.js";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
  updateTaskStatusRequest
} from "../services/taskService.js";
import { TASK_STATUSES, statusCopy } from "../utils/constants.js";
import { formatDate } from "../utils/formatters.js";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const taskModal = useDisclosure();
  const projectModal = useDisclosure();
  const taskDeleteModal = useDisclosure();
  const projectDeleteModal = useDisclosure();
  const { setGlobalLoading } = useApp();

  const fetchProject = useCallback(async () => {
    setIsLoading(true);
    setGlobalLoading(true);
    try {
      const [projectData, taskData] = await Promise.all([
        getProjectRequest(id),
        getTasksRequest(id)
      ]);
      setProject(projectData);
      setTasks(taskData);
    } catch (error) {
      toast.error(error.message);
      navigate("/dashboard", { replace: true });
    } finally {
      setIsLoading(false);
      setGlobalLoading(false);
    }
  }, [id, navigate, setGlobalLoading]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const groupedTasks = useMemo(
    () =>
      TASK_STATUSES.reduce((groups, status) => {
        groups[status] = tasks.filter((task) => task.status === status);
        return groups;
      }, {}),
    [tasks]
  );

  const stats = useMemo(() => {
    const completed = groupedTasks.Done?.length || 0;
    const pending = tasks.length - completed;

    return [
      { icon: FolderKanban, label: "Tasks", value: tasks.length },
      { icon: CheckCircle2, label: "Done", value: completed },
      { icon: Clock3, label: "Pending", value: pending }
    ];
  }, [groupedTasks, tasks.length]);

  const openCreateTask = () => {
    setTaskToEdit(null);
    taskModal.open();
  };

  const openEditTask = (task) => {
    setTaskToEdit(task);
    taskModal.open();
  };

  const openDeleteTask = (task) => {
    setTaskToDelete(task);
    taskDeleteModal.open();
  };

  const handleProjectSubmit = async (payload) => {
    setIsSaving(true);
    try {
      const updatedProject = await updateProjectRequest(id, payload);
      setProject(updatedProject);
      toast.success("Project updated");
      projectModal.close();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleProjectDelete = async () => {
    setIsSaving(true);
    try {
      await deleteProjectRequest(id);
      toast.success("Project deleted");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTaskSubmit = async (payload) => {
    setIsSaving(true);
    try {
      if (taskToEdit) {
        const updatedTask = await updateTaskRequest(taskToEdit._id, payload);
        setTasks((current) =>
          current.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
        toast.success("Task updated");
      } else {
        const createdTask = await createTaskRequest({ ...payload, projectId: id });
        setTasks((current) => [createdTask, ...current]);
        toast.success("Task created");
      }
      taskModal.close();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTaskDelete = async () => {
    if (!taskToDelete) return;

    setIsSaving(true);
    try {
      await deleteTaskRequest(taskToDelete._id);
      setTasks((current) =>
        current.filter((task) => task._id !== taskToDelete._id)
      );
      toast.success("Task deleted");
      taskDeleteModal.close();
      setTaskToDelete(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDragStart = (event, task) => {
    setDraggedTask(task);
    setActiveColumn(task.status);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", task._id);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setActiveColumn(null);
  };

  const handleDrop = async (status) => {
    if (!draggedTask || draggedTask.status === status) {
      setDraggedTask(null);
      setActiveColumn(null);
      return;
    }

    const previousTasks = tasks;
    const updatedTasks = tasks.map((task) =>
      task._id === draggedTask._id ? { ...task, status } : task
    );

    setTasks(updatedTasks);
    setDraggedTask(null);
    setActiveColumn(null);

    try {
      const updatedTask = await updateTaskStatusRequest(draggedTask._id, status);
      setTasks((current) =>
        current.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      setTasks(previousTasks);
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-44" />
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton className="h-32" key={index} />
          ))}
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton className="h-96" key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-fade-in">
      <section className="rounded-2xl border border-neutral-200/80 bg-white/90 p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <Link
              className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
              to="/dashboard"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to dashboard
            </Link>
            <h2 className="mt-5 break-words text-3xl font-semibold text-neutral-950 sm:text-4xl">
              {project?.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-neutral-600">
              {project?.description || "No description yet."}
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              Updated {formatDate(project?.updatedAt)}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Button icon={Plus} onClick={openCreateTask}>
              New task
            </Button>
            <Button
              icon={Edit3}
              onClick={projectModal.open}
              variant="secondary"
            >
              Edit
            </Button>
            <Button
              icon={Trash2}
              onClick={projectDeleteModal.open}
              variant="secondary"
            >
              Delete
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">Kanban</p>
            <h2 className="mt-1 text-2xl font-semibold text-neutral-950">
              Workflow board
            </h2>
          </div>
          <Button icon={Plus} onClick={openCreateTask} variant="secondary">
            Create task
          </Button>
        </div>

        {tasks.length ? (
          <div className="kanban-scroll grid gap-4 overflow-x-auto pb-2 xl:grid-cols-3">
            {TASK_STATUSES.map((status) => (
              <div
                className={`min-h-[26rem] min-w-[18rem] rounded-2xl border p-3 transition ${
                  activeColumn === status
                    ? "border-neutral-400 bg-white"
                    : "border-neutral-200/80 bg-white/70"
                }`}
                key={status}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                }}
                onDragEnter={() => {
                  if (draggedTask && draggedTask.status !== status) {
                    setActiveColumn(status);
                  }
                }}
                onDragLeave={(event) => {
                  if (event.currentTarget === event.target) {
                    setActiveColumn((current) =>
                      current === status ? null : current
                    );
                  }
                }}
                onDrop={() => handleDrop(status)}
              >
                <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-neutral-200/80 bg-white px-4 py-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-neutral-950">{status}</h3>
                    <p className="mt-1 text-xs text-neutral-500">
                      {statusCopy[status]}
                    </p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-950 text-sm font-semibold text-white">
                    {groupedTasks[status]?.length || 0}
                  </span>
                </div>
                <div className="space-y-3">
                  {groupedTasks[status]?.length ? (
                    groupedTasks[status].map((task) => (
                      <TaskCard
                        key={task._id}
                        onDelete={openDeleteTask}
                        onDragEnd={handleDragEnd}
                        onDragStart={handleDragStart}
                        onEdit={openEditTask}
                        task={task}
                      />
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-4 text-sm leading-6 text-neutral-500">
                      Drop tasks here or create a new one.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            action={
              <Button icon={Plus} onClick={openCreateTask}>
                Create task
              </Button>
            }
            description="Add the first task to start shaping this project into clear, movable work."
            title="No tasks yet"
          />
        )}
      </section>

      <TaskFormModal
        isLoading={isSaving}
        isOpen={taskModal.isOpen}
        onClose={taskModal.close}
        onSubmit={handleTaskSubmit}
        task={taskToEdit}
      />

      <ProjectFormModal
        isLoading={isSaving}
        isOpen={projectModal.isOpen}
        onClose={projectModal.close}
        onSubmit={handleProjectSubmit}
        project={project}
      />

      <ConfirmDialog
        confirmLabel="Delete task"
        description={`Delete "${taskToDelete?.title || "this task"}". This cannot be undone.`}
        isLoading={isSaving}
        isOpen={taskDeleteModal.isOpen}
        onClose={taskDeleteModal.close}
        onConfirm={handleTaskDelete}
        title="Delete task"
      />

      <ConfirmDialog
        confirmLabel="Delete project"
        description={`Delete "${project?.title || "this project"}" and all of its tasks. This cannot be undone.`}
        isLoading={isSaving}
        isOpen={projectDeleteModal.isOpen}
        onClose={projectDeleteModal.close}
        onConfirm={handleProjectDelete}
        title="Delete project"
      />
    </div>
  );
}
