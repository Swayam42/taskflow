import {
  CheckCircle2,
  Clock3,
  FolderKanban,
  ListTodo,
  Plus
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/Button.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import ProjectFormModal from "../components/ProjectFormModal.jsx";
import Skeleton from "../components/Skeleton.jsx";
import StatCard from "../components/StatCard.jsx";
import { useApp } from "../context/AppContext.jsx";
import { useDisclosure } from "../hooks/useDisclosure.js";
import {
  createProjectRequest,
  deleteProjectRequest,
  getProjectsRequest,
  updateProjectRequest
} from "../services/projectService.js";
import { getTasksRequest } from "../services/taskService.js";
import { formatDate } from "../utils/formatters.js";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const { setGlobalLoading } = useApp();
  const projectModal = useDisclosure();
  const deleteModal = useDisclosure();

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setGlobalLoading(true);
    try {
      const [projectsData, tasksData] = await Promise.all([
        getProjectsRequest(),
        getTasksRequest()
      ]);
      setProjects(projectsData);
      setTasks(tasksData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setGlobalLoading(false);
    }
  }, [setGlobalLoading]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const stats = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.status === "Done").length;
    const pendingTasks = tasks.length - completedTasks;

    return [
      {
        icon: FolderKanban,
        label: "Total Projects",
        value: projects.length
      },
      {
        icon: ListTodo,
        label: "Total Tasks",
        value: tasks.length
      },
      {
        icon: CheckCircle2,
        label: "Completed Tasks",
        value: completedTasks
      },
      {
        icon: Clock3,
        label: "Pending Tasks",
        value: pendingTasks
      }
    ];
  }, [projects.length, tasks]);

  const recentTasks = useMemo(() => tasks.slice(0, 5), [tasks]);

  const openCreateProject = () => {
    setProjectToEdit(null);
    projectModal.open();
  };

  const openEditProject = (project) => {
    setProjectToEdit(project);
    projectModal.open();
  };

  const openDeleteProject = (project) => {
    setProjectToDelete(project);
    deleteModal.open();
  };

  const handleSubmitProject = async (payload) => {
    setIsSaving(true);
    try {
      if (projectToEdit) {
        const updatedProject = await updateProjectRequest(
          projectToEdit._id,
          payload
        );
        setProjects((current) =>
          current.map((project) =>
            project._id === updatedProject._id
              ? { ...project, ...updatedProject, metrics: project.metrics }
              : project
          )
        );
        toast.success("Project updated");
      } else {
        const createdProject = await createProjectRequest(payload);
        setProjects((current) => [
          { ...createdProject, metrics: { totalTasks: 0, completedTasks: 0 } },
          ...current
        ]);
        toast.success("Project created");
      }
      projectModal.close();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    setIsSaving(true);
    try {
      await deleteProjectRequest(projectToDelete._id);
      setProjects((current) =>
        current.filter((project) => project._id !== projectToDelete._id)
      );
      setTasks((current) =>
        current.filter((task) => task.projectId !== projectToDelete._id)
      );
      toast.success("Project deleted");
      deleteModal.close();
      setProjectToDelete(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-fade-in">
      <section className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-950 p-6 text-white shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-neutral-400">
              Delivery overview
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Run every project from one quiet, focused workspace.
            </h2>
            <p className="mt-4 text-sm leading-6 text-neutral-300">
              Track project health, task progress, and active work without the
              noise of a crowded tool.
            </p>
          </div>
          <Button
            className="border-white bg-white text-neutral-950 hover:bg-neutral-200 hover:border-neutral-200"
            icon={Plus}
            onClick={openCreateProject}
            size="lg"
          >
            New project
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton className="h-32" key={index} />
            ))
          : stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </section>

      <section
        className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]"
        id="projects"
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Portfolio</p>
              <h2 className="mt-1 text-2xl font-semibold text-neutral-950">
                Projects
              </h2>
            </div>
            <Button icon={Plus} onClick={openCreateProject} variant="secondary">
              Create project
            </Button>
          </div>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton className="h-80" key={index} />
              ))}
            </div>
          ) : projects.length ? (
            <div className="grid items-stretch gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  onDelete={openDeleteProject}
                  onEdit={openEditProject}
                  project={project}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              action={
                <Button icon={Plus} onClick={openCreateProject}>
                  Create project
                </Button>
              }
              description="Create your first project to unlock the board, tasks, and progress metrics."
              title="No projects yet"
            />
          )}
        </div>

        <aside className="space-y-4">
          <div>
            <p className="text-sm font-medium text-neutral-500">Activity</p>
            <h2 className="mt-1 text-2xl font-semibold text-neutral-950">
              Recent tasks
            </h2>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white shadow-line">
            {isLoading ? (
              <div className="space-y-3 p-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton className="h-16" key={index} />
                ))}
              </div>
            ) : recentTasks.length ? (
              <div className="divide-y divide-neutral-200">
                {recentTasks.map((task) => (
                  <div className="p-4" key={task._id}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-neutral-950">
                          {task.title}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {task.status} - {task.priority}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-neutral-500">
                        {formatDate(task.updatedAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-sm leading-6 text-neutral-600">
                Tasks will appear here as your boards start moving.
              </div>
            )}
          </div>
        </aside>
      </section>

      <ProjectFormModal
        isLoading={isSaving}
        isOpen={projectModal.isOpen}
        onClose={projectModal.close}
        onSubmit={handleSubmitProject}
        project={projectToEdit}
      />

      <ConfirmDialog
        confirmLabel="Delete project"
        description={`Delete "${projectToDelete?.title || "this project"}" and all of its tasks. This cannot be undone.`}
        isLoading={isSaving}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDeleteProject}
        title="Delete project"
      />
    </div>
  );
}
