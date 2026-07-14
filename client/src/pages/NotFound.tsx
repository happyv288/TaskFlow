import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 transition-colors">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <FaExclamationTriangle className="text-5xl text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-7xl font-extrabold text-blue-600 dark:text-blue-400">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
