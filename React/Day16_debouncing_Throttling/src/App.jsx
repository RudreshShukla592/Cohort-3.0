import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [productsData, setproductsData] = useState([]);
  const [searchData, setsearchData] = useState(null);
  const [scrollY, setScrollY] = useState(null);

  let throttle = false;

  let getProductData = async () => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products");
      setproductsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  let filteredData = () => {
    let res = productsData.filter((val) => {
      return val.title.toLowerCase().includes(searchData.toLowerCase());
    });
    setproductsData(res);
  };

  // Debouncing
  useEffect(() => {
    if (!searchData) return;

    let timeoutVar = setTimeout(() => {
      filteredData();
    }, 700);

    return () => clearTimeout(timeoutVar);
  }, [searchData]);

  // throttling
  useEffect(() => {
    let handleScroll = () => {
      if (throttle) return;

      throttle = true;
      console.log("scroll triggered...");
      setScrollY(window.scrollY);

      setTimeout(() => {
        throttle = false;
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div>
      <h1>Debouncing...</h1>

      <input
        type="text"
        onChange={(e) => setsearchData(e.target.value)}
        placeholder="search products..."
        style={{ padding: "10px 30px" }}
      />

      {productsData.map((val) => {
        return <h1 key={val.id}>{val.title}</h1>;
      })}
    </div>
  );
};

export default App;
