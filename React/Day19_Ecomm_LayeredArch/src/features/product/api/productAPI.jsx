import { api } from "../../../config/api";

export const getAllProcuts = async (search) => {
  try {
    let url = search ? `/products/search?q=${search}` : "/products";

    let res = await api.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductCategories = async () => {
  try {
    let res = await api.get("/products/categories");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductBYCategory = async (category) => {
    console.log("Category:", category);

  try {
   
    let res = await api.get(`/products/category/${category}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
