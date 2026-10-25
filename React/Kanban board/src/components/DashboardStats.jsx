import { useContext } from "react";
import StatCard from "./StatCard";
import { MyContext } from "../context/MyContext";

export default function DashboardStats() {
  const { tasks } = useContext(MyContext);

  const total = tasks.length;
  const todo = tasks.filter((task) => task.status === "todo").length;
  const inProgress = tasks.filter(
    (task) => task.status === "inProgress",
  ).length;
  const completed = tasks.filter((task) => task.status === "completed").length;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const stats = [
    { label: "Total", value: total },
    { label: "Todo", value: todo },
    { label: "In Progress", value: inProgress },
    { label: "Completed", value: completed },
    { label: "Done", value: `${progress}%`, progress },
  ];

  return (
    <section
      aria-label="Task statistics"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
