import { Check, Circle, Trash2 } from "lucide-react";
import { MyContext } from "../../context/MyContext";
import { useContext } from "react";

const QuestionCard = ({ question }) => {
  const { deleteQuestion, toggleQuestion } = useContext(MyContext);

  const isCompleted = question.isCompleted;

  const difficultyStyles = {
    Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Hard: "bg-red-50 text-red-700 border-red-200",
  };

  const categoryStyles = {
    DSA: "bg-indigo-50 text-indigo-700",
    Interview: "bg-purple-50 text-purple-700",
    "Machine Coding": "bg-blue-50 text-blue-700",
  };

  return (
    <div className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50">
      {/* Complete button */}
      <button
        type="button"
        onClick={() => toggleQuestion(question.id)}
        className="shrink-0 text-slate-300 transition hover:text-indigo-500"
        aria-label={isCompleted ? "Mark as pending" : "Mark as completed"}
      >
        {isCompleted ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
            <Check className="h-3.5 w-3.5" />
          </span>
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </button>

      {/* Question content */}
      <div className="min-w-0 flex-1">
        <h3
          className={`truncate text-sm font-medium ${
            isCompleted ? "text-slate-400 line-through" : "text-slate-900"
          }`}
        >
          {question.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {/* Category */}
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
              categoryStyles[question.category]
            }`}
          >
            {question.category}
          </span>

          {/* Difficulty */}
          <span
            className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
              difficultyStyles[question.difficulty]
            }`}
          >
            {question.difficulty}
          </span>

          {/* Status */}
          <span
            className={`text-[11px] font-medium ${
              isCompleted ? "text-emerald-600" : "text-slate-400"
            }`}
          >
            {isCompleted ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      {/* Delete */}
      <button
        type="button"
        className="shrink-0 rounded-md p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
        aria-label="Delete question"
        onClick={() => deleteQuestion(question.id)}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default QuestionCard;
