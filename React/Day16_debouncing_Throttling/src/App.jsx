import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [productsData, setproductsData] = useState([]);
  const [searchData, setsearchData] = useState(null);

  let getProductData = async () => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products");
      setproductsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  let filteredData = ()=>{
    let res = productsData.filter((val)=>{
      return val.title.toLowerCase().includes(searchData.toLowerCase())
    })
    setproductsData(res)
  }

  useEffect(()=>{
    if(!searchData) return
    filteredData()
  },[searchData])

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div>
      <h1>Debouncing...</h1>

      <input
        type="text"
        value={searchData}
        onChange={(e) => setsearchData(e.target.value)}
        placeholder="search products..."
        style={{padding:"10px 30px"}}
      />

      {productsData.map((val) => {
        return <h1 key={val.id}>{val.title}</h1>;
      })}
    </div>
  );
};

export default App;
