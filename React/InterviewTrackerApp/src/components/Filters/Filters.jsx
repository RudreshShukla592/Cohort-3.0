import { Search, SlidersHorizontal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";

const Filters = () => {
  const { questions, setFilteredQuestions } = useContext(MyContext);

  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [status, setStatus] = useState("All");

  const filterQuestions = () => {
    const filtered = questions.filter((question) => {
      const matchesSearch = question.title
        .toLowerCase()
        .includes(searchInput.toLowerCase());

      const matchesCategory =
        category === "All" || question.category === category;

      const matchesDifficulty =
        difficulty === "All" || question.difficulty === difficulty;

      const matchesStatus =
        status === "All" || question.isCompleted === (status === "Completed");

      return (
        matchesSearch && matchesCategory && matchesDifficulty && matchesStatus
      );
    });

    setFilteredQuestions(filtered);
  };

  useEffect(() => {
    filterQuestions();
  }, [questions, searchInput, category, difficulty, status]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-md border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-500">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="All">All categories</option>
            <option value="DSA">DSA</option>
            <option value="Interview">Interview</option>
            <option value="Machine Coding">Machine Coding</option>
          </select>

          {/* Difficulty */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="All">All difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="All">All status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
