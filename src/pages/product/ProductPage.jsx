import React from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products";
import Product from "../../components/Product";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  const handleTryOn = () => alert("Try-On clicked!");
  const handleAddCart = () => alert("Add to Cart!");
  const handleBuyNow = () => alert("Buy Now!");

  return (
    <div className="min-h-screen bg-bgColor px-4 md:px-20 py-12 text-[#FBFBFB] font-poppins">
      <Product
        product={product}
        onTryOn={handleTryOn}
        onAddToCart={handleAddCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default ProductPage;
