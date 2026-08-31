import React, { useEffect, useState } from "react";
import { Search, Plus, MoreVertical, ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [updateNote, setUpdateNote] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // GET ALL NOTES
  const getAllNotes = async () => {
    try {
      const notes = await axios.get("http://localhost:3000/notes/allNotes");
      setAllNotes(notes.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  // DELETE NOTE
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      getAllNotes();
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE NOTE
  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        tags: data.tags
          ? data.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag !== "")
          : [],
      };

      if (updateNote) {
        await axios.put(
          `http://localhost:3000/notes/${updateNote}`,
          formattedData,
        );

        setUpdateNote(null);
      } else {
        await axios.post("http://localhost:3000/notes/create", formattedData);
      }

      reset({
        title: "",
        content: "",
        tags: "",
      });
      setIsVisible(false);

      getAllNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const noteForUpdate = async (note) => {
    setUpdateNote(note._id);
    setIsVisible(true);
    const newTags = note.tags.join(", ");
    reset({
      title: note.title,
      content: note.content,
      tags: newTags,
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ================= HEADER ================= */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Notes</h1>

            <p className="mt-1 text-sm text-zinc-500">
              Keep your thoughts organized.
            </p>
          </div>

          <button
            onClick={() => {
              setUpdateNote(null);
              reset({
                title: "",
                content: "",
                tags: "",
              });
              setIsVisible(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
          >
            <Plus size={18} />
            New Note
          </button>
        </div>
      </header>

      {/* ================= NOTES ================= */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Search */}
        <div className="mb-8">
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

        {/* Notes Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {allNotes.map((note) => (
            <article
              key={note._id}
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
                {note.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-end gap-2 border-t border-zinc-800 pt-4">
                <button
                  onClick={() => noteForUpdate(note)}
                  className="rounded-lg border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteNote(note._id)}
                  className="rounded-lg border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-red-900/50 hover:bg-red-950/30 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* ================= CREATE NOTE MODAL ================= */}
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-2xl">
            <div className="max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-950 px-6 py-8 text-zinc-100">
              {/* Form Header */}
              <div className="mb-8 flex items-center gap-4">
                <button
                  onClick={() => setIsVisible(false)}
                  className="rounded-xl border border-zinc-800 p-2.5 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
                >
                  <ArrowLeft size={19} />
                </button>

                <div>
                  <h1 className="text-2xl font-semibold">Create Note</h1>

                  <p className="mt-1 text-sm text-zinc-500">
                    Capture something worth remembering.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                {/* Title */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Title
                  </label>

                  <input
                    type="text"
                    placeholder="Enter note title..."
                    {...register("title", {
                      required: "Title is required",
                    })}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                  />

                  {errors.title && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Content */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Content
                  </label>

                  <textarea
                    rows="9"
                    placeholder="Write your note..."
                    {...register("content", {
                      required: "Content is required",
                    })}
                    className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm leading-6 outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                  />

                  {errors.content && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.content.message}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Tags
                  </label>

                  <input
                    type="text"
                    placeholder="react, backend, ideas..."
                    {...register("tags")}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                  />

                  <p className="mt-2 text-xs text-zinc-600">
                    Separate multiple tags with commas.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
                >
                  <Save size={18} />
                  {updateNote ? "Update Note +" : "Add Note +"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
