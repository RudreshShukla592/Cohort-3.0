import React, { useContext, useState } from "react";
import { MyShop } from "../context/Mycontext";

const TodoForm = () => {
  let { setTask, setToggle, updateTask, setUpdateTask, task } =
    useContext(MyShop);

  const [formData, setFormData] = useState({
    title: updateTask ? updateTask.title : "",
  });

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    if (updateTask) {
      let updateArr = task.map((item) => {
        return item.id === updateTask.id
          ? { ...item, title: formData.title }
          : item;
      });
      setTask(updateArr);
      setUpdateTask(null);
      localStorage.setItem("tasks", JSON.stringify(updateArr));
    } else {
      let arr = [...task, { ...formData, id: Date.now(), completed: false }];
      setTask(arr);
      localStorage.setItem("tasks", JSON.stringify(arr));
    }
    setFormData({
      title: "",
    });
    setToggle(false);
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Create a Task</h2>

      <p className="text-gray-500 mb-6">
        Add your next task and stay productive.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 rounded-xl border text-black border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
          + Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
