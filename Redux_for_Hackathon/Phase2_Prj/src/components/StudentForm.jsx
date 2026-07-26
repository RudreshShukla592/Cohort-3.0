import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addStudent,
  setEditingStudent,
  updateStudent,
} from "../redux/feature/students/studentSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const StudentForm = () => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
  const editingStudent = useSelector((state) => state.students.editingStudent);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  let formHandle = (data) => {
    if (editingStudent) {
      const updatedStudent = {
        // this contains all the data of old student with key-value pair
        ...editingStudent,
        // this only changes the values of the key which needs update 
        ...data,
      };
      dispatch(updateStudent(updatedStudent));
      dispatch(setEditingStudent(null));
    } else {
      let student = { id: crypto.randomUUID(), ...data };
      dispatch(addStudent(student));
    }
    reset();
  };

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (editingStudent) {
      reset(editingStudent);
    }
  }, [editingStudent, reset]);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="w-5 h-5 text-teal-700" />
        <h2 className="text-xl font-semibold text-slate-900">
          Add a New Student
        </h2>
      </div>

      <form autoComplete="off" onSubmit={handleSubmit(formHandle)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Full Name
          </label>

          <input
            type="text"
            autoComplete="off"
            placeholder="Enter student's full name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition"
            {...register("name", {
              required: "Name is required",
            })}
          />
        </div>

        {errors.name && (
          <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Email Address
          </label>

          <input
            type="email"
            autoComplete="new-email"
            placeholder="Enter email address"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition"
            {...register("email", {
              required: "Email is required",
            })}
          />
        </div>

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
        )}

        {/* Age + Course */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Age
            </label>

            <input
              type="number"
              autoComplete="off"
              placeholder="Age"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition"
              {...register("age", {
                required: "Age is required",
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Course
            </label>

            <select
              {...register("course", {
                required: "Select a course",
              })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition"
            >
              <option>Computer Science</option>
              <option>AI & ML</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Civil</option>
            </select>
          </div>
        </div>

        {errors.age && (
          <p className="mt-2 text-sm text-red-500">{errors.age.message}</p>
        )}

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Phone Number <span className="text-slate-400">(Optional)</span>
          </label>

          <input
            type="tel"
            autoComplete="add-number"
            placeholder="+91 XXXXX XXXXX"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition"
            {...register("phone")}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 rounded-xl transition duration-300"
        >
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </form>
    </section>
  );
};

export default StudentForm;
