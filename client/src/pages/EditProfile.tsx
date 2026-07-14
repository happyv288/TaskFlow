import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "../services/profile.service";
import toast from "react-hot-toast";

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setFormData({
          name: data.user.name,
          email: data.user.email,
        });

        setPreview(data.user.avatar || "");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    try {
      await updateProfile(formData);

      if (selectedFile) {
        await uploadAvatar(selectedFile);
      }

      const updatedProfile = await getProfile();

      localStorage.setItem("user", JSON.stringify(updatedProfile.user));

      toast.success("Profile updated successfully!");

      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[70vh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4 py-6 sm:py-10">
        <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-8 transition-colors duration-300">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left text-gray-900 dark:text-white">
            Edit Profile
          </h1>

          <div className="flex flex-col items-center mb-6">
            <img
              src={
                preview
                  ? preview.startsWith("http") ||
                    preview.startsWith("data:") ||
                    preview.startsWith("blob:")
                    ? preview
                    : `${API_URL}${preview}`
                  : "https://ui-avatars.com/api/?name=User&background=2563eb&color=fff"
              }
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-4 text-gray-900 dark:text-white file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-medium transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
