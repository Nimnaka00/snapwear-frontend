import React from "react";
import products from "../data/products";

const Products = ({ onSelectProduct, selectedProduct }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onSelectProduct(product)}
          className={`cursor-pointer border rounded-md p-2 text-sm text-center ${
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
          <p className="font-bold">{product.name}</p>
          <p>Price : {product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
