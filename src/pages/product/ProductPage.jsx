// src/pages/product/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";
import Product from "../../components/Product";
import { addToCart } from "../../utils/cart";
import { toast } from "react-toastify";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load product by id from backend
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const { data } = await API.get(`/api/products/${id}`);
        if (!ignore) setProduct(data);
      } catch (e) {
        // fallback: try fetching all then find
        try {
          const { data } = await API.get("/api/products");
          const found = data.find((p) => p._id === id);
          if (!ignore) setProduct(found || null);
        } catch {}
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => (ignore = true);
  }, [id]);

  const handleTryOn = () => toast.info("Try-On coming soon.");
  const handleAddCart = (p, qty, size) => {
    addToCart(p, qty, size);
    toast.success("Added to cart.");
  };
  const handleBuyNow = (p, qty, size) => {
    addToCart(p, qty, size);
    window.location.href = "/cart";
  };

  if (loading)
    return (
      <div className="min-h-screen bg-bgColor text-white p-10">Loading…</div>
    );
  if (!product)
    return (
      <div className="min-h-screen bg-bgColor text-white p-10">
        Product not found.
      </div>
    );

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
