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

  return <div>{
     productsData.map((val)=>{
        return <ProductCard key={val.id} product={val}/>
     })
    }</div>;
};

export default Home;
