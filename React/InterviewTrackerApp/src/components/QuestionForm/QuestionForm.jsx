import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";

const QuestionForm = () => {
  const { questions, setQuestions } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const newQuestion = {
      ...data,
      isCompleted: false,
      id: Date.now(),
    };

    setQuestions((prev) => [...prev, newQuestion]);

    reset();
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-900">
          Add Practice Question
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add a question to track your interview preparation.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Question */}
        <div className="mb-4">
          <label
            htmlFor="question"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Question
          </label>

          <input
            id="question"
            type="text"
            placeholder="e.g. Two Sum"
            {...register("title", {
              required: "Question is required",
            })}
            className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.question
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
          />

          {errors.question && (
            <p className="mt-1 text-xs text-red-500">
              {errors.question.message}
            </p>
          )}
        </div>

        {/* Category + Difficulty */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Category
            </label>

            <select
              id="category"
              {...register("category", {
                required: "Category is required",
              })}
              className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                errors.category
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            >
              <option value="">Select category</option>
              <option value="DSA">DSA</option>
              <option value="Interview">Interview</option>
              <option value="Machine Coding">Machine Coding</option>
            </select>

            {errors.category && (
              <p className="mt-1 text-xs text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Difficulty */}
          <div>
            <label
              htmlFor="difficulty"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Difficulty
            </label>

            <select
              id="difficulty"
              {...register("difficulty", {
                required: "Difficulty is required",
              })}
              className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 ${
                errors.difficulty
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {errors.difficulty && (
              <p className="mt-1 text-xs text-red-500">
                {errors.difficulty.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Add Question
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
