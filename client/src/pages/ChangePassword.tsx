import { useState } from "react";
import Navbar from "../layouts/Navbar";
import toast from "react-hot-toast";
import api from "../api/axios";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const { data } = await api.put(
        "/auth/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex justify-center items-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-lg transition-colors duration-300">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Change Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 pr-12 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 pr-12 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3 pr-12 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
