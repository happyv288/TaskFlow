import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/auth.service";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
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
      name: "",
      email: "",
      password: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.password) return;

    try {
      await registerUser(formData);

      toast.success("Registration successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Registration failed.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow-lg p-6 sm:p-8 transition-colors"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition mb-6"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full rounded-lg px-4 py-3 mb-2 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 ${
            errors.name
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
        />

        {errors.name && (
          <p className="text-red-500 text-sm mb-3">{errors.name}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-lg px-4 py-3 mb-2 border bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 ${
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
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 mb-2 rounded-lg p-3 pr-12"
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
          <p className="text-red-500 text-sm mb-5">{errors.password}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-semibold"
        >
          Register
        </button>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
