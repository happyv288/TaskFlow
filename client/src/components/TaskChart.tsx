import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  todo: number;
  progress: number;
  done: number;
};

function TaskChart({ todo, progress, done }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const detect = () => {
      if (typeof document !== "undefined") {
        setTheme(
          document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
        );
      }
    };

    detect();
    const observer = new MutationObserver(detect);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  const data = [
    { name: "Todo", value: todo },
    { name: "In Progress", value: progress },
    { name: "Done", value: done },
  ];

  const COLORS = ["#3B82F6", "#F59E0B", "#22C55E"];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Task Overview
      </h2>

      <div className="w-full h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={90} label>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                border: "none",
                color: theme === "dark" ? "#ffffff" : "#000000",
              }}
            />

            <Legend
              wrapperStyle={{
                color: theme === "dark" ? "#ffffff" : "#000000",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TaskChart;
