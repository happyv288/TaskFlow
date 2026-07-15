import Navbar from "../layouts/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../services/profile.service";
import { FaArrowLeft } from "react-icons/fa6";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setUser(data.user);

        // Keep Navbar updated
        if (localStorage.getItem("token")) {
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          sessionStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  const avatar =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User",
    )}&background=2563eb&color=fff`;

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
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
          {/* Header */}
          <div className="bg-blue-600 h-32"></div>

          {/* Profile */}
          <div className="px-8 pb-8">
            <div className="-mt-16 flex flex-col items-center">
              <img
                src={avatar}
                alt={user?.name || "Avatar"}
                className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />

              <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                {user?.name}
              </h1>

              <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Full Name
                </h2>

                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Email Address
                </h2>

                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {user?.email}
                </p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Account Status
                </h2>

                <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-full">
                  Active
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={() => navigate("/profile/edit")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
