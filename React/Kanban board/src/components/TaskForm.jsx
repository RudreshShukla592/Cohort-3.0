import { X } from "lucide-react";
import { useForm } from "react-hook-form";

const inputStyles =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

const labelStyles = "mb-1.5 block text-sm font-medium text-slate-700";

export default function TaskForm({ onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      dueDate: "",
    },
  });

  const submitTask = async (data) => {
    await onSubmit(data);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/45 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        className="my-auto w-full max-w-[515px] rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            id="task-form-title"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Add Task
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task form"
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitTask)} noValidate>
          {/* Title */}
          <div className="mb-5">
            <label htmlFor="title" className={labelStyles}>
              Title <span className="text-red-500">*</span>
            </label>

            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              autoFocus
              aria-invalid={!!errors.title}
              className={`${inputStyles} ${
                errors.title ? "border-red-400 focus:ring-red-100" : ""
              }`}
              {...register("title", {
                required: "Task title is required",
                validate: (value) =>
                  value.trim().length > 0 || "Title cannot contain only spaces",
                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters",
                },
              })}
            />

            {errors.title && (
              <p role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-5">
            <label htmlFor="description" className={labelStyles}>
              Description
            </label>

            <textarea
              id="description"
              rows={3}
              placeholder="Describe your task..."
              className={`${inputStyles} resize-y`}
              {...register("description", {
                maxLength: {
                  value: 500,
                  message: "Description cannot exceed 500 characters",
                },
              })}
            />

            {errors.description && (
              <p role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Priority and Status */}
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="priority" className={labelStyles}>
                Priority <span className="text-red-500">*</span>
              </label>

              <select
                id="priority"
                className={inputStyles}
                {...register("priority", {
                  required: "Select a priority",
                  validate: (value) =>
                    ["low", "medium", "high"].includes(value) ||
                    "Invalid priority",
                })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              {errors.priority && (
                <p role="alert" className="mt-1.5 text-xs text-red-600">
                  {errors.priority.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="status" className={labelStyles}>
                Status
              </label>

              <select
                id="status"
                className={inputStyles}
                {...register("status", {
                  required: "Select a status",
                  validate: (value) =>
                    ["todo", "inProgress", "completed"].includes(value) ||
                    "Invalid status",
                })}
              >
                <option value="todo">Todo</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Due date */}
          <div className="mb-5">
            <label htmlFor="dueDate" className={labelStyles}>
              Due date
            </label>

            <input
              id="dueDate"
              type="date"
              className={inputStyles}
              {...register("dueDate")}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
