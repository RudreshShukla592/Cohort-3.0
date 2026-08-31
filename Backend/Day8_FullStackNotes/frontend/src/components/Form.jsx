import React from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";

const Form = ({setIsVisible}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    reset()
    setIsVisible(prev => !prev)
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-8 text-zinc-100">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button  onClick={()=> setIsVisible(prev => !prev)} className="rounded-xl border border-zinc-800 p-2.5 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100">
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
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;