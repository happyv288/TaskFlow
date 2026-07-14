import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/auth.service";
import { HiEye, HiEyeOff } from "react-icons/hi";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) return;

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(`Welcome back, ${data.user.name}!`);

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-lg p-6 sm:p-8 transition-colors duration-300"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Welcome Back
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-lg px-4 py-3 mb-2 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
        />

        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full rounded-lg px-4 py-3 pr-12 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
          >
            {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm mt-2 mb-2">{errors.password}</p>
        )}

        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="flex items-center justify-between mb-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Remember me
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-semibold"
        >
          Login
        </button>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
