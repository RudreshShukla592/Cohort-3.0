import { Pencil, Trash2, CalendarDays } from "lucide-react";

const priorityStyles = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

export default function TaskCard({ task, onStatusChange, deleteTasks, onEdit }) {
  const isCompleted = task.status === "completed";

  return (
    <article
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="cursor-grab active:cursor-grabbing rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`min-w-0 break-words text-[15px] font-semibold leading-6 text-slate-900 ${
            isCompleted ? "text-slate-400 line-through" : ""
          }`}
        >
          {task.title}
        </h3>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${task.title}`}
            className="rounded p-1 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil size={15} />
          </button>

          <button
            onClick={() => deleteTasks(task.id)}
            type="button"
            aria-label={`Delete ${task.title}`}
            className="rounded p-1 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mt-1.5 break-words text-sm leading-5 text-slate-500">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            priorityStyles[task.priority] || priorityStyles.Medium
          }`}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
            <CalendarDays size={12} />
            {task.dueDate}
          </span>
        )}
      </div>

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
        aria-label={`Status of ${task.title}`}
        defaultValue={task.status}
        className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400"
      >
        <option value="todo">Todo</option>
        <option value="inProgress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </article>
  );
}
