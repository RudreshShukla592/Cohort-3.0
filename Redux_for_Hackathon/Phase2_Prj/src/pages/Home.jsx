import Navbar from "../components/Navbar";
import StatsSection from "../components/StatsSection";
import StudentForm from "../components/StudentForm";

import StudentList from "../components/StudentList";

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <StatsSection />

        <StudentForm />

        <StudentList />
      </div>
    </main>
  );
};

export default Home;
