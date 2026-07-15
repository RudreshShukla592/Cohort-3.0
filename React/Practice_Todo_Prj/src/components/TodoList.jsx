import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import { MyShop } from "../context/Mycontext";

const TodoList = () => {
  const { task } = useContext(MyShop);

  return (
    <div className="mt-8 space-y-4">
      {task.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No tasks yet. Add your first task!
        </div>
      ) : (
        task.map((item) => <TodoItem key={item.id} task={item} />)
      )}
    </div>
  );
};

export default TodoList;
