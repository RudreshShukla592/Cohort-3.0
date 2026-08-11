import axios from "axios"

export const getAllProducts = async (limit,pageParam=1)=>{
    try {
        console.log("pageparams ---> ",pageParam);
        
        let res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${pageParam}`)
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}