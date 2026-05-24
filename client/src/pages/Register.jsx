import { UserPlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";

const initialValues = {
  name: "",
  email: "",
  password: ""
};

export default function Register() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (values.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters";
    }
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email";
    }
    if (values.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await register(values);
      toast.success("Workspace created");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Start organized"
      subtitle="Create a private workspace for focused project and task execution."
      title="Create your TaskFlow account"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          autoComplete="name"
          error={errors.name}
          label="Name"
          name="name"
          onChange={handleChange}
          placeholder="Alex Morgan"
          value={values.name}
        />
        <Input
          autoComplete="email"
          error={errors.email}
          label="Email"
          name="email"
          onChange={handleChange}
          placeholder="you@company.com"
          type="email"
          value={values.email}
        />
        <Input
          autoComplete="new-password"
          error={errors.password}
          label="Password"
          name="password"
          onChange={handleChange}
          placeholder="At least 6 characters"
          type="password"
          value={values.password}
        />
        <Button
          className="w-full"
          icon={UserPlus}
          isLoading={isSubmitting}
          type="submit"
        >
          Register
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-600">
        Already have an account?{" "}
        <Link className="font-medium text-neutral-950 underline" to="/login">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
