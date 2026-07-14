import Navbar from "../layouts/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../services/profile.service";

function Profile() {
  const [user, setUser] = useState<any>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
          {/* Header */}
          <div className="bg-blue-600 h-32"></div>

          {/* Profile */}
          <div className="px-8 pb-8">
            <div className="-mt-16 flex flex-col items-center">
              {user?.avatar ? (
                <img
                  src={`${API_URL}${user.avatar}`}
                  alt={user.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}

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

              <button
                onClick={() => navigate("/profile/edit")}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
