import { LogIn } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";

const initialValues = {
  email: "",
  password: ""
};

export default function Login() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.email.trim()) nextErrors.email = "Email is required";
    if (!values.password) nextErrors.password = "Password is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await login(values);
      toast.success("Welcome back");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      subtitle="Sign in to continue managing projects, tasks, and delivery flow."
      title="Log in to TaskFlow"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
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
          autoComplete="current-password"
          error={errors.password}
          label="Password"
          name="password"
          onChange={handleChange}
          placeholder="Your password"
          type="password"
          value={values.password}
        />
        <Button
          className="w-full"
          icon={LogIn}
          isLoading={isSubmitting}
          type="submit"
        >
          Login
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-600">
        New to TaskFlow?{" "}
        <Link className="font-medium text-neutral-950 underline" to="/register">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
