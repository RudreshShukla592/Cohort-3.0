import { useContext } from "react";
import QuestionCard from "./QuestionCard";
import { MyContext } from "../../context/MyContext";

const QuestionList = () => {
  const { filteredQuestions } = useContext(MyContext);

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Practice Questions
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Your interview preparation questions
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {filteredQuestions.length} questions
        </span>
      </div>

      {/* Questions */}
      <div className="divide-y divide-slate-100">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <div className="px-5 py-10 text-center">
            <p className="text-sm font-medium text-slate-600">
              No questions found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
