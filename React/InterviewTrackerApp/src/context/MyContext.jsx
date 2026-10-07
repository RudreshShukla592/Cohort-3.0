import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("allQuestions")) || [],
  );
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  const toggleQuestion = (id) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id
          ? {
              ...question,
              isCompleted: !question.isCompleted,
            }
          : question,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("allQuestions", JSON.stringify(questions));
  }, [questions]);

  return (
    <MyContext.Provider
      value={{
        questions,
        setQuestions,
        filteredQuestions,
        setFilteredQuestions,
        deleteQuestion,
        toggleQuestion,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
