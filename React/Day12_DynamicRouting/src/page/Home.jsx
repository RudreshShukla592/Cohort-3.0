import React, { useContext, useEffect } from "react";
import axios from "axios";
import { MyStore } from "../context/MyContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  let { productsData, setProductsData } = useContext(MyStore);

  let getData = async () => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products");
      setProductsData(res.data);
      console.log(productsData);
    } catch (error) {
      console.error("erroe occured", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">{
     productsData.map((val)=>{
        return <ProductCard key={val.id} product={val}/>
     })
    }</div>;
};

export default Home;
