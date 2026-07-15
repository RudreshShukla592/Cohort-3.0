import React, { useContext } from "react";
import { MyShop } from "../context/Mycontext";

const TodoItem = ({ task }) => {
  let { delBtn, setToggle, setUpdateTask, complteBtn } = useContext(MyShop);

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="w-5 h-5 accent-blue-600 cursor-pointer"
          onChange={() => complteBtn(task.id)}
          checked={task.completed}
        />

        <div>
          <h3
            className={`text-lg font-medium transition-all duration-300 ${
              task.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        { !task.completed  &&(<button
          onClick={() => {
            setUpdateTask(task);
            setToggle(true);
          }}
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          Edit
        </button>)}

        <button
          onClick={() => delBtn(task.id)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
