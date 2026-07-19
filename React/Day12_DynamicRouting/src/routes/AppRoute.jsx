import React from "react";
import { Routes, Route } from "react-router";
import Home from "../page/Home";
import About from "../page/About";
import Product from "../page/Product";


const AppRoute = () => {
  return (
    <main className="max-w-8xl mx-auto px-6 py-12 space-y-24">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product/>} />
      </Routes>
    </main>
  );
};

export default AppRoute;
