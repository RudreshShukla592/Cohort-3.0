import { api } from "../../../config/api";

export const getAllProcuts = async ()=>{
    try {
        let res = await api.get("/products")
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}

export const getProductCategories = async ()=>{
    try {
        let res = await api.get("/products/categories")
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}