import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.put(`/auth/reset-password/${token}`, {
        password,
      });

      toast.success(data.message);

      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md transition-colors">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Reset Password
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Enter your new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;