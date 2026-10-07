import { useContext } from "react";
import { MyContext } from "../../context/MyContext";

const ProgressBar = () => {
  const { questions } = useContext(MyContext);

  const completed = questions.filter((ques) => ques.isCompleted).length;
  const total = questions.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Overall Progress
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Keep going, you're doing great!
          </p>
        </div>

        <span className="text-sm font-semibold text-indigo-600">
          {percentage}%
        </span>
      </div>

      {/* Progress track */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Progress numbers */}
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{completed} completed</span>
        <span>{total} total</span>
      </div>
    </div>
  );
};

export default ProgressBar;
