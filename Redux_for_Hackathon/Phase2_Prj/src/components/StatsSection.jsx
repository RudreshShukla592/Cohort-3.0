import { Users, Cpu, BrainCircuit, RadioTower } from "lucide-react";

import StatCard from "./StatCard";
import { useSelector } from "react-redux";

const StatsSection = () => {
  let students = useSelector((state) => state.students.students);

  const totalStudents = students.length;
  const csStudents = students.filter(
    (student) => student.course === "Computer Science",
  ).length;

  const aiStudents = students.filter(
    (student) => student.course === "AI & ML",
  ).length;
  
  const electronicsStudents = students.filter(
    (student) => student.course === "Electronics",
  ).length;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCard
        icon={<Users size={28} />}
        value={totalStudents}
        title="Total Students"
        bgColor="bg-slate-100"
        iconColor="text-slate-700"
      />

      <StatCard
        icon={<Cpu size={28} />}
        value={csStudents}
        title="Computer Science"
        bgColor="bg-blue-100"
        iconColor="text-blue-600"
      />

      <StatCard
        icon={<BrainCircuit size={28} />}
        value={aiStudents}
        title="AI & ML"
        bgColor="bg-violet-100"
        iconColor="text-violet-600"
      />

      <StatCard
        icon={<RadioTower size={28} />}
        value={electronicsStudents}
        title="Electronics"
        bgColor="bg-orange-100"
        iconColor="text-orange-600"
      />
    </section>
  );
};

export default StatsSection;
