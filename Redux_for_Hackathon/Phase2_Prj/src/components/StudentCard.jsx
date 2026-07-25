import { Mail, Phone, Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteStudent, setEditingStudent } from "../redux/feature/students/studentSlice";

const StudentCard = ({ student }) => {

   const dispatch = useDispatch();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="grid grid-cols-[1fr_auto] items-center gap-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="size-14 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-lg">
            {student.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()
            }
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold">{student.name}</h3>

            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <Mail size={16} />
              <span>{student.email}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <Phone size={16} />
              <span> {student.phone}</span>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-sm">
                Age: <strong>{student.age}</strong>
              </span>

              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                {student.course}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          
          <button onClick={() => dispatch(setEditingStudent(student))} className="rounded-lg bg-red-100 p-2 hover:bg-red-200">
            <Pencil size={18} className="text-orange-600" />
          </button>

          <button onClick={()=> dispatch(deleteStudent(student.id))} className="rounded-lg bg-red-100 p-2 hover:bg-red-200">
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
