import React from 'react'

const ProductCard = ({product,del}) => {
  return (
    <div className='flex flex-col gap-4 p-2 border-2 rounded-2xl'>
        <div className='h-50 w-50'>
            <img className='rounded-xl' src={product.image} alt="" />
        </div>
        <div>
            <h3 className='font-semibold'>{product.name}</h3>
            <p className='text-xs'>{product.category}</p>
            <p className='text-red-400'>{product.price}</p>
        </div>
        <button onClick={()=> del(product.id)} className='px-4 py-2 cursor-pointer bg-red-400 rounded-2xl text-black'>Delete</button>
    </div>
  )
}

export default ProductCard