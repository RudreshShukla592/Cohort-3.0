import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

const ProductPage = () => {

    const [productsData, setProductsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    let getProductsData = async ()=>{
        try {
            let res = await axios.get("https://fakestoreapi.com/products")
            setProductsData(res.data)
           setIsLoading(false)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

     if (isLoading) return <h1 className='h-full text-4xl flex items-center justify-center'>Loading Products...</h1>

  return (
   <div className=' grid grid-cols-4 gap-4'>
        {productsData.map((product)=>{
           return <ProductCard product={product} key={product.id}/>
        })}
    </div>
  )
}

export default ProductPage