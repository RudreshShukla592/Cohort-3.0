import { GraduationCap } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center">
        {/* Logo */}
        <div className="h-14 w-14 rounded-2xl bg-teal-700 flex items-center justify-center">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>

        {/* Title */}
        <div className="ml-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Student Management System
          </h1>

          <p className="text-slate-500 mt-1">
            A clean place to manage your students.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;