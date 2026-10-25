import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import Toolbar from "./components/Toolbar";
import KanbanBoard from "./components/KanbanBoard";
import { useContext, useState } from "react";
import { MyContext } from "./context/MyContext";
import TaskForm from "./components/TaskForm";

export default function App() {
  const { tasks, setTasks, filteredTasks, handleStatusChange } =
    useContext(MyContext);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddClick = () => {
    setSelectedTask(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (selectedTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id
            ? { ...task, ...data, id: task.id }
            : task,
        ),
      );
    } else {
      setTasks((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);
    }

    setIsFormOpen(false);
    setSelectedTask(null);
  };

  return (
    <>
      <Header onAddTask={handleAddClick} />

      <main className="mx-auto max-w-[1380px] space-y-4 px-4 py-5 sm:px-6 sm:py-6">
        <DashboardStats />
        <Toolbar />
        <KanbanBoard
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onEditTask={handleEditClick}  
        />
      </main>

      {isFormOpen && (
        <TaskForm
          task={selectedTask}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedTask(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}
