import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import NoteCard from "./components/NoteCard";

const App = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    des: "",
  });

  const [updateNoteID, setupdateNoteID] = useState(null);

  const [allNotes, setAllNotes] = useState([]);

  const handleChange = (e) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateNoteID) {
        await axios.put(
          `http://localhost:3000/notes/${updateNoteID}`,
          formValue,
        );

        setupdateNoteID(null);
      } else {
        await axios.post("http://localhost:3000/notes/create", formValue);
      }

      getAllNotes();

      setFormValue({
        title: "",
        des: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllNotes = async () => {
    try {
      let res = await axios.get("http://localhost:3000/notes/allNotes");

      setAllNotes(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  let deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);

      getAllNotes();
    } catch (error) {
      console.log(error);
    }
  };

  let noteForUpdate = (note) => {
    setupdateNoteID(note._id);
    setFormValue({
      title: note.title,
      des: note.des,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">Notes App</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-4"
      >
        <input
          name="title"
          type="text"
          placeholder="Title..."
          className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black transition"
          onChange={handleChange}
          value={formValue.title}
        />

        <input
          name="des"
          type="text"
          placeholder="Description..."
          className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black transition"
          onChange={handleChange}
          value={formValue.des}
        />

        <button
          type="submit"
          className="bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition cursor-pointer"
        >
          {updateNoteID ? "Update Note +" : "Add Note +"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
        {allNotes.map((val) => (
          <NoteCard
            note={val}
            key={val.id}
            deleteNote={deleteNote}
            noteForUpdate={noteForUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
