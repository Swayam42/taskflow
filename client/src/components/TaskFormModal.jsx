import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { TASK_PRIORITIES, TASK_STATUSES } from "../utils/constants.js";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

const initialValues = {
  title: "",
  description: "",
  status: "Todo",
  priority: "Medium"
};

export default function TaskFormModal({
  isLoading,
  isOpen,
  onClose,
  onSubmit,
  task
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setValues({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "Todo",
        priority: task.priority || "Medium"
      });
    } else {
      setValues(initialValues);
    }
    setErrors({});
  }, [isOpen, task]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.title.trim()) {
      setErrors({ title: "Task title is required" });
      return;
    }

    await onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description.trim()
    });
  };

  return (
    <Modal
      description="Add the next piece of work with enough context to act."
      isOpen={isOpen}
      onClose={onClose}
      title={task ? "Edit task" : "Create task"}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          autoFocus
          error={errors.title}
          label="Task title"
          name="title"
          onChange={handleChange}
          placeholder="Write acceptance criteria"
          value={values.title}
        />
        <Input
          label="Description"
          multiline
          name="description"
          onChange={handleChange}
          placeholder="Context, constraints, and expected outcome"
          value={values.description}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-900">
              Status
            </span>
            <select
              className="h-12 w-full rounded-xl border border-white/70 bg-white/80 px-4 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200/70"
              name="status"
              onChange={handleChange}
              value={values.status}
            >
              {TASK_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-900">
              Priority
            </span>
            <select
              className="h-12 w-full rounded-xl border border-white/70 bg-white/80 px-4 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200/70"
              name="priority"
              onChange={handleChange}
              value={values.priority}
            >
              {TASK_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button icon={Save} isLoading={isLoading} type="submit">
            {task ? "Save changes" : "Create task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
