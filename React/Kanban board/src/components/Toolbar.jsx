import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/MyContext";

export default function Toolbar() {
  const { tasks, setFilteredTasks } = useContext(MyContext);

  const [searchInput, setSearchInput] = useState("");
  const [priority, setPriority] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch = (task.title || "")
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase());

      const matchesPriority = priority === "all" || task.priority === priority;

      const matchesStatus = status === "all" || task.status === status;

      return matchesSearch && matchesPriority && matchesStatus;
    });

    setFilteredTasks(filtered);
  }, [tasks, searchInput, priority, status, setFilteredTasks]);

  return (
    <section className="flex flex-col gap-3 lg:flex-row">
      <div className="relative min-w-0 flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="search"
          placeholder="Search by title..."
          aria-label="Search tasks by title"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Filter by priority"
          className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-indigo-400"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
          className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-indigo-400"
        >
          <option value="all">All Statuses</option>
          <option value="todo">Todo</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </section>
  );
}
