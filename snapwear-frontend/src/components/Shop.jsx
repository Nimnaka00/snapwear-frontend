import React, { useState } from "react";
import products from "../data/products"; // ✅ updated relative path

const categories = ["View all", "Men", "Women", "Kids"];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("View all");

  const filteredProducts =
    selectedCategory === "View all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full min-h-screen bg-[#13151B] px-8 md:px-20 py-16 text-[#FBFBFB] font-poppins">
      {/* Title */}
      <h1 className="text-[40px] md:text-[57px] font-medium text-center mb-8">
        Collection
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center items-center gap-6 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-[16px] font-normal px-4 py-2 rounded-md transition whitespace-nowrap ${
              selectedCategory === cat
                ? "border border-[#D6FFF6] w-[88px] h-[40px]"
                : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-[365px] h-[470px] rounded-[8px] border border-[#D6FFF6] flex flex-col items-center justify-between p-6 bg-[#1b1d25]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-[252px] object-contain"
            />
            <div className="text-center mt-4 space-y-1">
              <h2 className="text-[16px] font-bold">{product.name}</h2>
              <p className="text-[16px] font-extralight">{product.category}</p>
              <p className="text-[16px] font-medium">Price : {product.price}</p>
            </div>
            <button className="mt-4 w-[110px] h-[44px] border border-[#D6FFF6] text-[#D6FFF6] text-[16px] font-medium rounded-md hover:bg-[#D6FFF6] hover:text-[#13151B] transition">
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
