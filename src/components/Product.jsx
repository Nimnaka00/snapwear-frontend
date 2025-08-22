import React, { useState } from "react";

const fallbackSizes = ["S", "M", "L", "XL"];

const Product = ({ product, onTryOn, onAddToCart, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);
  const sizes =
    Array.isArray(product?.size) && product.size.length > 0
      ? product.size
      : fallbackSizes;
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);

  if (!product) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-10 px-4 md:px-12 lg:px-20 py-10 text-[#FBFBFB] font-poppins">
      {/* LEFT: image — made ~50% smaller */}
      <div className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[360px] mx-auto bg-[#1e2028] rounded-2xl p-4">
        <div className="w-full aspect-[4/5]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
      </div>

      {/* RIGHT: details */}
      <div className="flex-1 max-w-[680px] mx-auto">
        <h1 className="text-[32px] md:text-[44px] lg:text-[52px] font-medium mb-3">
          {product.name}
        </h1>

        {product.brand && (
          <p className="text-[14px] font-light mb-2 opacity-80">
            Brand: {product.brand}
          </p>
        )}

        <p className="text-[16px] mb-4">
          {product.description || "No description provided."}
        </p>

        <p className="text-[20px] md:text-[22px] font-semibold mb-6">
          LKR {Number(product.price).toFixed(2)}
        </p>

        {/* Quantity */}
        <div className="mb-6">
          <label className="block text-[16px] mb-2">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-[90px] h-[40px] text-[16px] text-black p-2 rounded-[6px]"
          />
        </div>

        {/* Size selector */}
        <div className="mb-8">
          <label className="block text-[16px] mb-2">Select your size</label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`min-w-[44px] h-[40px] px-3 rounded-[8px] text-[16px] ${
                  selectedSize === sz
                    ? "bg-[#D6FFF6] text-[#13151B]"
                    : "bg-[#13151B] text-[#D6FFF6] border border-[#D6FFF6]"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 flex-wrap mb-6">
          <button
            disabled={!selectedSize}
            onClick={() => onTryOn(product, quantity, selectedSize)}
            className={`w-full sm:w-[200px] h-[44px] rounded-[10px] text-[16px] ${
              selectedSize
                ? "text-[#D6FFF6] border border-[#D6FFF6] hover:bg-[#D6FFF6] hover:text-[#13151B]"
                : "opacity-50 cursor-not-allowed border border-[#D6FFF6] text-[#D6FFF6]"
            }`}
          >
            Try on
          </button>
          <button
            onClick={() => onAddToCart(product, quantity, selectedSize)}
            className="w-full sm:w-[200px] h-[44px] rounded-[10px] text-[16px] text-[#FBFBFB] bg-[#000]"
          >
            Add To Cart
          </button>
        </div>

        <button
          onClick={() => onBuyNow(product, quantity, selectedSize)}
          className="w-full max-w-[380px] h-[44px] rounded-[10px] text-[16px] text-[#FBFBFB] border border-[#FBFBFB] hover:bg-[#FBFBFB] hover:text-[#13151B]"
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default Product;
