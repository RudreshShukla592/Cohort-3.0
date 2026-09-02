import { useQuery } from "@tanstack/react-query";
import { getProdutsData } from "../api/productsAPI";
import { useEffect, useState } from "react";

export let useProductAPI = () => {
  const [filteredProducts, setFilteredProducts] = useState(null);

  let { data, isPending } = useQuery({
    queryKey: ["prodcuts"],
    queryFn: getProdutsData,
  });
  let filterData;

  let filterProducts = (searchParams) => {
    filterData = data.filter((product) => {
      return product.title.toLowerCase().includes(searchParams.toLowerCase());
    });
    if (filterData) setFilteredProducts(filterData);
  };

  useEffect(() => {
    setFilteredProducts(data);
  }, [data, filterData]);

  return {
    data,
    isPending,
    filterProducts,
    filteredProducts,
  };
};
