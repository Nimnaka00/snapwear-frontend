// src/components/Product.jsx
import React, { useState } from "react";

const sizes = ["M", "L", "XL"];

const Product = ({ product, onTryOn, onAddToCart, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return null;

  return (
    <div className="flex px-20 py-12 text-[#FBFBFB] font-poppins">
      {/* LEFT: product card */}
      <div className="w-[544px] h-[603px] bg-[#1e2028] rounded-[8px] flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-[470px] object-contain"
        />
      </div>

      {/* spacer */}
      <div className="w-[80px]" />

      {/* RIGHT: details */}
      <div className="flex-1">
        {/* Name */}
        <h1 className="text-[57px] font-medium mb-4">
          {product.name}
        </h1>

        {/* Reviews */}
        <p className="text-[14px] font-light mb-6">
          ★★★★☆ (3.5 stars) • 10 reviews
        </p>

        {/* Description */}
        <p className="text-[16px] font-regular mb-8 w-[428px]">
          {product.description}
        </p>

        {/* Quantity */}
        <div className="mb-6">
          <label className="block text-[16px] mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="w-[60px] h-[36px] text-[16px] text-black p-2 rounded-[4px]"
          />
        </div>

        {/* Size selector */}
        <div className="mb-8">
          <label className="block text-[16px] mb-2">
            Select your size
          </label>
          <div className="flex gap-[10px]">
            {sizes.map(sz => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`
                  w-[35px] h-[44px] rounded-[8px] text-[16px] font-regular
                  ${
                    selectedSize === sz
                      ? "bg-[#D6FFF6] text-[#13151B]"
                      : "bg-[#13151B] text-[#D6FFF6] border border-[#D6FFF6]"
                  }
                `}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Try-On + Add to Cart */}
        <div className="flex items-center gap-[24px] mb-6">
          <button
            disabled={!selectedSize}
            onClick={() => onTryOn(product, quantity, selectedSize)}
            className={`
              w-[200px] h-[48px] rounded-[19px] text-[16px] font-regular
              ${
                selectedSize
                  ? "text-[#D6FFF6] border border-[#D6FFF6] hover:bg-[#D6FFF6] hover:text-[#13151B]"
                  : "opacity-50 cursor-not-allowed border border-[#D6FFF6] text-[#D6FFF6]"
              }
            `}
          >
            Try on
          </button>

          <button
            onClick={() => onAddToCart(product, quantity, selectedSize)}
            className="
              w-[200px] h-[48px] rounded-[19px] text-[16px] font-regular
              text-[#FBFBFB] bg-[#000000]
            "
          >
            Add To Cart
          </button>
        </div>

        {/* Buy Now */}
        <button
          onClick={() => onBuyNow(product, quantity, selectedSize)}
          className="
            w-[427px] h-[48px] rounded-[19px] text-[16px] font-regular
            text-[#FBFBFB] border border-[#FBFBFB]
            hover:bg-[#FBFBFB] hover:text-[#13151B]
          "
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default Product;
