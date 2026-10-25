import { useContext, useState } from "react";
import TaskCard from "./TaskCard";
import { MyContext } from "../context/MyContext";

const columnStyles = {
  todo: {
    title: "Todo",
    border: "border-t-slate-400",
  },
  inProgress: {
    title: "In Progress",
    border: "border-t-orange-500",
  },
  completed: {
    title: "Completed",
    border: "border-t-emerald-500",
  },
};

export default function KanbanColumn({ status, tasks = [], onStatusChange,  onEditTask }) {
  const column = columnStyles[status];

  const { deleteTasks } = useContext(MyContext);

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const taskId = e.dataTransfer.getData("taskId");

    if (taskId) {
      onStatusChange(taskId, status);
    }
  };

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDraggingOver(false);
        }
      }}
      onDrop={handleDrop}
      className={`min-w-0 rounded-xl border-2 bg-slate-100/90 p-3 transition-all duration-200 ${
        isDraggingOver
          ? "border-indigo-500 bg-indigo-50/70 shadow-md"
          : `border-transparent border-t-2 ${column.border}`
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-0.5 py-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900">{column.title}</h2>

          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              deleteTasks={deleteTasks}
              onEdit={() => onEditTask(task)}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 px-3 py-8 text-center text-sm text-slate-400">
            No tasks yet
          </div>
        )}
      </div>
    </section>
  );
}
