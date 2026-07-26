import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: JSON.parse(localStorage.getItem("students")) || [],
    editingStudent: null,
  },
  reducers: {
    addStudent: (state, actions) => {
      state.students.push(actions.payload);
    },
    deleteStudent: (state, actions) => {
      state.students = state.students.filter(
        (student) => student.id !== actions.payload,
      );
    },

    updateStudent: (state, action) => {
      state.students = state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student,
      );
    },

    setEditingStudent: (state, action) => {
      state.editingStudent = action.payload;
    },
  },
});

export const { addStudent, deleteStudent, updateStudent, setEditingStudent } =
  studentSlice.actions;
export default studentSlice.reducer;
