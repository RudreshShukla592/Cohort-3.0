import StudentCard from "./StudentCard";
import { useSelector } from "react-redux";

const StudentList = () => {
  const students = useSelector((state) => state.students.students);

  return (
    <section className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Students</h2>

        <p className="text-sm text-slate-500">Showing {students.length} students</p>
      </div>

      <div className="space-y-4">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </section>
  );
};

export default StudentList;
