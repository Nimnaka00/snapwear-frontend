import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = ({ selectedProduct, onSelectProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => onSelectProduct(product)}
          className={`cursor-pointer w-[180px] h-[220px] rounded-[8px] border border-[#D6FFF6] flex flex-col  justify-between p-2 bg-[#1b1d25] ${
            selectedProduct?._id === product._id
              ? "border-[#D6FFF6]"
              : "border-transparent"
          } hover:border-[#D6FFF6] transition`}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[120px] object-contain mb-2"
          />
          <p className="text-[16px] font-bold">{product.name}</p>
          <p className="text-[16px] font-medium">Price: LKR {product.price}.00</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
