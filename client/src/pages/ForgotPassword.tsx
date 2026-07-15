import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { FaArrowLeft } from "react-icons/fa6";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await api.post("/auth/forgot-password", {
        email,
      });

      toast.success(data.message);

      setResetLink(data.resetLink);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4">
     
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
        
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Forgot Password
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Enter your email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {resetLink && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg transition-colors">
            <p className="font-semibold mb-2 text-gray-900 dark:text-white">
              Development Reset Link
            </p>

            <a
              href={resetLink}
              className="text-blue-600 dark:text-blue-400 break-all underline"
            >
              {resetLink}
            </a>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
