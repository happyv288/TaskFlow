import Navbar from "../layouts/Navbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../services/settings.service";
import { useTheme } from "../contexts/ThemeContext";
import { updateNotifications } from "../services/settings.service";
import { useEffect, useState } from "react";
import { getProfile } from "../services/profile.service";
import { FaArrowLeft } from "react-icons/fa6";

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setEmailNotifications(data.user.emailNotifications);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Delete Account?",
      text: "This will permanently delete your account and all your tasks.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAccount();

      localStorage.clear();

      toast.success("Account deleted successfully");

      navigate("/register");
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-10 px-4">
         <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition mb-6"
  >
    <FaArrowLeft />
    <span>Back</span>
  </button>
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            ⚙️ Settings
          </h1>

          {/* Account */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Account
            </h2>

            <div className="space-y-3">
              <Link
                to="/profile/edit"
                className="block border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition"
              >
                👤 Edit Profile
              </Link>

              <Link
                to="/change-password"
                className="block border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition"
              >
                🔒 Change Password
              </Link>
            </div>
          </section>

          {/* Appearance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Appearance
            </h2>

            <div className="flex justify-between items-center border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-700 transition">
              <span className="text-gray-900 dark:text-white">
                🌙 Dark Mode
              </span>

              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
                className="w-5 h-5 accent-blue-600"
              />
            </div>
          </section>

          {/* Notifications */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Notifications
            </h2>

            <div className="flex justify-between items-center border border-gray-300 dark:border-gray-700 rounded-lg p-4">
              <span className="text-gray-700 dark:text-gray-200">
                📧 Email Reminder Notifications
              </span>

              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={async () => {
                  const value = !emailNotifications;

                  setEmailNotifications(value);

                  try {
                    await updateNotifications(value);
                    toast.success("Notification settings updated");
                  } catch {
                    toast.error("Failed to update settings");
                  }
                }}
              />
            </div>
          </section>

          {/* Danger Zone */}
          <section>
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Danger Zone
            </h2>

            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg transition"
            >
              Delete Account
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default Settings;
