import React from "react";
import { Search, Plus, MoreVertical, Tag } from "lucide-react";

const notes = [
  {
    id: 1,
    title: "React Context API",
    content:
      "Context API allows us to share data between components without passing props manually through every level.",
    tags: ["React", "Frontend"],
    createdAt: "Aug 28, 2026",
    updatedAt: "Aug 30, 2026",
  },
  {
    id: 2,
    title: "Things to learn in Backend",
    content:
      "Node.js, Express, MongoDB, authentication, REST APIs and middleware.",
    tags: ["Backend", "Learning"],
    createdAt: "Aug 27, 2026",
    updatedAt: "Aug 29, 2026",
  },
  {
    id: 3,
    title: "Project Ideas",
    content:
      "Build a full-stack notes app, expense tracker and an AI-powered productivity tool.",
    tags: ["Ideas"],
    createdAt: "Aug 25, 2026",
    updatedAt: "Aug 25, 2026",
  },
];

const Notes = ({setIsVisible}) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Notes</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Keep your thoughts organized.
            </p>
          </div>

          <button onClick={()=> setIsVisible(prev => !prev)} className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200">
            <Plus size={18} />
            New Note
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Search + filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <article
              key={note.id}
              className="group relative flex min-h-60 flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition duration-200 hover:-translate-y-1 hover:border-zinc-700"
            >
              {/* Top */}
              <div className="mb-4 flex items-start justify-between">
                <h2 className="pr-4 text-lg font-medium">{note.title}</h2>

                <button className="rounded-lg p-1.5 text-zinc-600 opacity-0 transition group-hover:opacity-100 hover:bg-zinc-800 hover:text-zinc-300">
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Content */}
              <p className="line-clamp-4 text-sm leading-6 text-zinc-400">
                {note.content}
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between border-t border-zinc-800 pt-4">
                <span className="text-xs text-zinc-600">
                  Updated {note.updatedAt}
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notes;
