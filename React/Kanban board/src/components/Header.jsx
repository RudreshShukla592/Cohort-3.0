import { useContext, useState } from "react";
import { Plus } from "lucide-react";
import TaskForm from "./TaskForm";
import { MyContext } from "../context/MyContext";

export default function Header() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { setTasks, setFilteredTasks } = useContext(MyContext);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleAddTask = async (data) => {
    // Replace this with your task creation logic later.
    console.log("New task:", data);

    const newTask = {
      ...data,
      id: crypto.randomUUID(),
    };

    setTasks((prev) => [...prev, newTask]);

    setIsFormOpen(false);
  };

  return (
    <>
      <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
            K
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Kanban Board
            </h1>

            <p className="text-sm text-slate-500">
              Plan your work. Track your progress.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <span className="text-sm text-slate-500">{today}</span>

          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </header>

      {isFormOpen && (
        <TaskForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAddTask}
        />
      )}
    </>
  );
}
