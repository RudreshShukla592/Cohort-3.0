import StudentCard from "./StudentCard";
import { useSelector } from "react-redux";
import { Users } from "lucide-react";

const StudentList = () => {
  const students = useSelector((state) => state.students.students);

  return (
    <section className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Students</h2>

        <p className="text-sm text-slate-500">
          Showing {students.length} students
        </p>
      </div>

      <div className="space-y-4">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))
        ) : (
          <div className="flex h-52 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white">
            <div className="text-center">
                <Users className="mx-auto mb-3 h-12 w-12 text-slate-400" />
                
              <h3 className="text-lg font-semibold text-slate-700">
                No Students Found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Add your first student using the form above.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentList;
