import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import Toolbar from "./components/Toolbar";
import KanbanBoard from "./components/KanbanBoard";
import { useContext } from "react";
import { MyContext } from "./context/MyContext";

export default function App() {

  const {filteredTasks, handleStatusChange} = useContext(MyContext)
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-[1380px] space-y-4 px-4 py-5 sm:px-6 sm:py-6">
        <DashboardStats />

        <Toolbar />

        <KanbanBoard tasks={filteredTasks}  onStatusChange={handleStatusChange}/>
      </main>
    </div>
  );
}

/*
{
  id: crypto.randomUUID(),
  title: "Learn JavaScript",
  description: "Practice DOM manipulation",
  priority: "high",
  dueDate: "2026-10-30",
  status: "todo"
}
 */
