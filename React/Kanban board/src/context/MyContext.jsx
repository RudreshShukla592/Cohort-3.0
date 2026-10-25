import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("allTasks")) || [],
  );

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const deleteTasks = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("allTasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <MyContext.Provider
      value={{
        tasks,
        setTasks,
        filteredTasks,
        setFilteredTasks,
        handleStatusChange,
        deleteTasks
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
