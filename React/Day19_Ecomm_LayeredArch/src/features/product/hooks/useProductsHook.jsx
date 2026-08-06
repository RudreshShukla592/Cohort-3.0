import { useQuery } from "@tanstack/react-query";
import { getAllProcuts, getProductCategories } from "../api/productAPI";

export const useAllProduct = () => {
  let { data, isPending, errors } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProcuts,
  });

  return {
    data,
    isPending,
    errors
  }
};


export const useAllCategories = ()=>{
    return useQuery({
        queryKey:["AllCegories"],
        queryFn: getProductCategories,
    })
}