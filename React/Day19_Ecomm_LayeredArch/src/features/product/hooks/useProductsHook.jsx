import { useQuery } from "@tanstack/react-query";
import { getAllProcuts, getProductBYCategory, getProductCategories } from "../api/productAPI";
import { useEffect, useState } from "react";

export const useAllProduct = () => {
  const [seacrh, setSeacrh] = useState(null);
  const [debounceSearch, setDebounceSearch] = useState(null);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebounceSearch(seacrh);
    }, 700);

    return () => clearTimeout(timeout);
  }, [seacrh]);

  let { data, isPending, errors } = useQuery({
    queryKey: ["products", debounceSearch],
    queryFn: () => getAllProcuts(debounceSearch),
  });

  return {
    data,
    isPending,
    errors, 
    seacrh,
    setSeacrh,
  };
};

export const useAllCategories = () => {
  return useQuery({
    queryKey: ["AllCegories"],
    queryFn: getProductCategories,
  });
};

export const useProductByCategory = ()=>{

    const [category, setCategory] = useState("")

    let {data} = useQuery({
        queryKey:["productsByCategory", category],
        queryFn: ()=> getProductBYCategory(category),
         enabled: !!category,
    })

    return{
        data,category,setCategory
    }
}