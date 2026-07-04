import React, { useState } from "react";
import ProductCard from "./ProductCard";

const App = () => {

  const [productData, setproductData] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      name: "Nike Air Max",
      category: "Footwear",
      price: 4999,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      name: "Smart Watch",
      category: "Accessories",
      price: 2999,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      name: "iPhone 15",
      category: "Electronics",
      price: 79999,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      name: "Oversized T-Shirt",
      category: "Clothing",
      price: 899,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      name: "Wireless Headphones",
      category: "Electronics",
      price: 3499,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
      name: "Fitness Band",
      category: "Accessories",
      price: 1999,
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500",
      name: "Denim Jacket",
      category: "Clothing",
      price: 2499,
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500",
      name: "Running Shoes",
      category: "Footwear",
      price: 3999,
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      name: "MacBook Air",
      category: "Electronics",
      price: 99999,
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 2499,
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
      name: "Leather Wallet",
      category: "Accessories",
      price: 1299,
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
      name: "Casual Hoodie",
      category: "Clothing",
      price: 1799,
    },
    {
      id: 13,
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
      name: "Gaming Mouse",
      category: "Electronics",
      price: 1599,
    },
    {
      id: 14,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      name: "Sports Sneakers",
      category: "Footwear",
      price: 4499,
    },
    {
      id: 15,
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
      name: "DSLR Camera",
      category: "Electronics",
      price: 54999,
    },
  ]);

  let delFunc = (id) => {
    let products = productData.filter((e)=> e.id !== id)
    setproductData(products)
  };
  return (
    <div>
      <h1>Data is rendering below</h1>

      <div className="flex flex-wrap gap-4 p-2">
        {productData.map((e) => (
          <ProductCard product={e} del={delFunc} />
        ))}
      </div>
    </div>
  );
};

export default App;
