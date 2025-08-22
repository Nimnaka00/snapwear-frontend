// src/components/Products.jsx
import React, { useEffect, useMemo, useState } from "react";
import API from "../utils/api";

const toArray = (v) => {
  if (Array.isArray(v)) return v;
  if (Array.isArray(v?.products)) return v.products;
  if (Array.isArray(v?.items)) return v.items;
  return [];
};

const Products = ({ selectedProduct, onSelectProduct, limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await API.get(
          import.meta.env.VITE_PRODUCTS_PATH || "/api/products"
        );
        const list = toArray(res?.data);
        if (alive) {
          setProducts(list);
          setErr(list.length ? "" : "No products found.");
        }
      } catch (e) {
        console.error("Error loading products:", e);
        if (alive)
          setErr(
            e?.response?.data?.message ||
              e?.message ||
              "Failed to load products."
          );
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const displayedProducts = useMemo(() => {
    const src = Array.isArray(products) ? products : [];
    const n = Number(limit);
    if (Number.isFinite(n) && n >= 0) return src.slice(0, n);
    return src;
  }, [products, limit]);

  if (loading)
    return (
      <div className="text-center text-sm opacity-80">Loading products…</div>
    );
  if (err)
    return (
      <div className="text-sm text-[#13151B] bg-[#D6FFF6] border border-[#D6FFF6] rounded-md px-4 py-2">
        {err}
      </div>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {displayedProducts.map((product) => (
        <div
          key={product._id || product.id}
          onClick={() => onSelectProduct?.(product)}
          className={`cursor-pointer w-[180px] h-[220px] rounded-[8px] border ${
            (selectedProduct?._id || selectedProduct?.id) ===
            (product._id || product.id)
              ? "border-[#D6FFF6]"
              : "border-transparent"
          } hover:border-[#D6FFF6] transition bg-cardBg p-2 flex flex-col justify-between`}
        >
          <img
            src={product.imageUrl || product.image || ""}
            alt={product.name || "Product"}
            className="w-full h-[120px] object-contain mb-2"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='160'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='14'>No Image</text></svg>";
            }}
          />
          <p className="text-[16px] font-bold line-clamp-1">
            {product.name || "Unnamed product"}
          </p>
          <p className="text-[16px] font-medium">
            Price: LKR{" "}
            {Number(product.price ?? 0).toLocaleString("en-LK", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Products;
