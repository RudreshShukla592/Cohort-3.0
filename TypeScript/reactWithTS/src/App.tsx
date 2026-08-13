import  { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "./type";
import ProductCard from "./component/ProductCard";

const App = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);

  const getData = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      console.log(res);
      setProductsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData()
  }, []);

  return (
    <div>
      {productsData.map((val) => (
        <ProductCard product={val} key={val.id} />
      ))}
    </div>
  );
};

export default App;
