type Task = {
  _id: string;
  status: string;
  priority: string;
};

type Props = {
  tasks: Task[];
};

function StatsCards({ tasks }: Props) {
  const total = tasks.length;

  const completed = tasks.filter((task) => task.status === "done").length;

  const pending = tasks.filter((task) => task.status !== "done").length;

  const highPriority = tasks.filter(
    (task) => task.priority.toLowerCase() === "high",
  ).length;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {/* Total */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-5">
        <p className="text-gray-500 dark:text-gray-400">📋 Total Tasks</p>

        <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
          {total}
        </h2>
      </div>

      {/* Completed */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-5">
        <p className="text-gray-500 dark:text-gray-400">✅ Completed</p>

        <h2 className="text-3xl font-bold mt-2 text-green-600">{completed}</h2>

        <p className="text-sm text-gray-500 mt-1">{progress}% Complete</p>
      </div>

      {/* Pending */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-5">
        <p className="text-gray-500 dark:text-gray-400">⏳ Pending</p>

        <h2 className="text-3xl font-bold mt-2 text-yellow-500">{pending}</h2>
      </div>

      {/* High Priority */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-5">
        <p className="text-gray-500 dark:text-gray-400">🔥 High Priority</p>

        <h2 className="text-3xl font-bold mt-2 text-red-600">{highPriority}</h2>
      </div>
    </div>
  );
}

export default StatsCards;
