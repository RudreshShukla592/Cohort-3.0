import React from "react";

const NoteCard = ({ note, deleteNote, noteForUpdate }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-gray-900">{note.title}</h2>

      <p className="text-gray-600 mt-2 line-clamp-3">{note.des}</p>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => noteForUpdate(note)}
          className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Update
        </button>

        <button
          onClick={() => deleteNote(note._id)}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
