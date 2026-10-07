import Stats from "./Stats";
import ProgressBar from "./ProgressBar";
import QuestionForm from "../QuestionForm/QuestionForm";
import Filters from "../Filters/Filters";
import QuestionList from "../QuestionList/QuestionList";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Interview Practice Tracker
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track your DSA and interview preparation progress.
          </p>
        </div>

        <Stats />

        <div className="mt-4">
          <ProgressBar />
        </div>

        <div className="mt-4">
          <QuestionForm />
        </div>

        <div className="mt-4">
          <Filters />
        </div>

        <div className="mt-4">
          <QuestionList />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
