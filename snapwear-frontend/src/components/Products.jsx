import React from "react";
import products from "../data/products";

const Products = ({ selectedProduct, onSelectProduct }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onSelectProduct(product)}
          className={`cursor-pointer w-[180px] h-[220px] rounded-[8px] border border-[#D6FFF6] flex flex-col  justify-between p-2 bg-[#1b1d25] ${
            selectedProduct?.id === product.id
              ? "border-[#D6FFF6]"
              : "border-transparent"
          } hover:border-[#D6FFF6] transition`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[120px] object-contain mb-2"
          />
          <p className="text-[16px] font-bold">{product.name}</p>
          <p className="text-[16px] font-medium">Price : {product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
