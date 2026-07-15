import { createContext, useState } from "react";

export const MyShop = createContext();

export const ContextProvider = ({ children }) => {
  const [toggle, setToggle] = useState(true);
  const [task, setTask] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [updateTask, setUpdateTask] = useState(null);

  let delBtn = (id) => {
    let filterTask = task.filter((val) => val.id !== id);
    setTask(filterTask);
    localStorage.setItem("tasks", JSON.stringify(filterTask));
  };

  let complteBtn = (id)=>{
      let completeTask = task.map((item)=>{
        return item.id === id ? {...item,completed: !item.completed} : item
      });
      setTask(completeTask);
      localStorage.setItem("tasks", JSON.stringify(completeTask));
  }

  return (
    <MyShop.Provider
      value={{
        toggle,
        setToggle,
        task,
        setTask,
        delBtn,
        updateTask,
        setUpdateTask,
         complteBtn
      }}
    >
      {children}
    </MyShop.Provider>
  );

};
