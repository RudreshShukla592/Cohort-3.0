import React from "react";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router";

import AppRoute from "./routes/AppRoute";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Nav />

      <AppRoute />
    </div>
  );
};

export default App;
