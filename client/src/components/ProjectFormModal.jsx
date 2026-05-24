import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

const initialValues = {
  title: "",
  description: ""
};

export default function ProjectFormModal({
  isLoading,
  isOpen,
  onClose,
  onSubmit,
  project
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setValues({
        title: project.title || "",
        description: project.description || ""
      });
    } else {
      setValues(initialValues);
    }
    setErrors({});
  }, [isOpen, project]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.title.trim()) {
      setErrors({ title: "Project title is required" });
      return;
    }

    await onSubmit({
      title: values.title.trim(),
      description: values.description.trim()
    });
  };

  return (
    <Modal
      description="Define the outcome, then keep the board moving."
      isOpen={isOpen}
      onClose={onClose}
      title={project ? "Edit project" : "Create project"}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          autoFocus
          error={errors.title}
          label="Project title"
          name="title"
          onChange={handleChange}
          placeholder="Website redesign"
          value={values.title}
        />
        <Input
          label="Description"
          multiline
          name="description"
          onChange={handleChange}
          placeholder="Scope, goals, and key notes"
          value={values.description}
        />
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button icon={Save} isLoading={isLoading} type="submit">
            {project ? "Save changes" : "Create project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
