import React from "react";
import { useParams } from "react-router-dom";         // or next/router
import products from "../../data/products";
import Product from "../../components/Product";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  // handlers just stub for now:
  const handleTryOn    = () => alert("Try-On clicked!");
  const handleAddCart  = () => alert("Add to Cart!");
  const handleBuyNow   = () => alert("Buy Now!");

  return (
    <Product
      product={product}
      onTryOn={handleTryOn}
      onAddToCart={handleAddCart}
      onBuyNow={handleBuyNow}
    />
  );
}

export default ProductPage;
