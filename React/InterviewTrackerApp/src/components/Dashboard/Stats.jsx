import { CircleCheck, Code2, ListChecks, Terminal } from "lucide-react";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";

const Stats = () => {
  const { questions } = useContext(MyContext);

  const dsaQuestions = questions.filter(
    (ques) => ques.category === "DSA" && ques.isCompleted,
  ).length;

  const interviewQuestions = questions.filter(
    (ques) => ques.category === "Interview" && ques.isCompleted,
  ).length;

  const machineQuestions = questions.filter(
    (ques) => ques.category === "Machine Coding" && ques.isCompleted,
  ).length;

  const stats = [
    {
      title: "Total questions",
      value: questions.length,
      icon: ListChecks,
    },
    {
      title: "DSA completed",
      value: dsaQuestions,
      icon: CircleCheck,
    },
    {
      title: "Interview Qs completed",
      value: interviewQuestions,
      icon: Code2,
    },
    {
      title: "Machine coding",
      value: machineQuestions,
      icon: Terminal,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-lg border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>

              <Icon className="h-5 w-5 text-slate-400" />
            </div>

            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
